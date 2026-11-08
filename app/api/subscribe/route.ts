import { Resend } from 'resend'
import {
  adminInbox,
  clampText,
  clientIp,
  escHtml,
  honeypotTripped,
  isValidEmail,
  json,
  rateLimit,
  requireResendKey,
  resendFrom,
  corsHeaders,
} from '@/lib/form-security'

export const runtime = 'nodejs'

const SOURCES = new Set(['allendior', 'dhanana'])

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) })
}

/**
 * Lightweight email-capture endpoint.
 * Does not maintain a full ESP list yet — notifies Allen so he can add the person
 * (or later pipe into Buttondown/Beehiiv). Works today with existing Resend key.
 */
export async function POST(request: Request) {
  const ip = clientIp(request)
  const limited = rateLimit(`subscribe:${ip}`, 5, 60 * 60 * 1000)
  if (!limited.ok) {
    return json(
      { error: 'Too many attempts. Please try again later.' },
      429,
      request,
      { 'Retry-After': String(limited.retryAfterSec) },
    )
  }

  const apiKey = requireResendKey()
  if (!apiKey) {
    console.error('RESEND_API_KEY missing')
    return json({ error: 'Subscribe is temporarily unavailable.' }, 503, request)
  }

  try {
    const contentType = request.headers.get('content-type') || ''
    let email = ''
    let source = 'allendior'
    let name = ''
    let honey = ''

    if (contentType.includes('application/json')) {
      const body = await request.json()
      email = clampText(body.email, 254).toLowerCase()
      source = clampText(body.source || 'allendior', 40).toLowerCase()
      name = clampText(body.name, 120)
      honey = clampText(body.website || body.company, 200)
    } else {
      const formData = await request.formData()
      email = clampText(formData.get('email'), 254).toLowerCase()
      source = clampText(formData.get('source') || 'allendior', 40).toLowerCase()
      name = clampText(formData.get('name'), 120)
      honey = clampText(formData.get('website') || formData.get('company'), 200)
    }

    if (honeypotTripped(honey)) {
      return json({ success: true }, 200, request)
    }

    if (!SOURCES.has(source)) {
      return json({ error: 'Unknown source' }, 400, request)
    }
    if (!email || !isValidEmail(email)) {
      return json({ error: 'Please enter a valid email.' }, 400, request)
    }

    const resend = new Resend(apiKey)
    const kind = source === 'allendior' ? 'allendior' : 'dhanana'
    const to = adminInbox(kind)
    const from = resendFrom(source === 'allendior' ? 'Allen Dior Updates' : 'Dhanana Updates')
    const label = source === 'allendior' ? 'allendior.com' : 'dhanana.in'

    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;padding:24px;color:#111">
  <h2 style="margin:0 0 12px">New email signup — ${escHtml(label)}</h2>
  <p><strong>Email:</strong> ${escHtml(email)}</p>
  ${name ? `<p><strong>Name:</strong> ${escHtml(name)}</p>` : ''}
  <p><strong>Source:</strong> ${escHtml(source)}</p>
  <p><strong>IP (coarse):</strong> ${escHtml(ip)}</p>
  <p style="margin-top:20px;font-size:13px;color:#555">
    This is a notify-only capture until a full ESP (Buttondown/Beehiiv) is connected.
    Add this address to your list, then reply from your usual writing workflow.
  </p>
</body></html>`

    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[signup/${source}] ${email}`.slice(0, 200),
      html,
    })

    if (result.error) {
      console.error('Subscribe notify failed:', result.error)
      // If allendior inbox is not allowed on sandbox, fall back to dhanana admin once.
      if (kind === 'allendior') {
        const fallback = await resend.emails.send({
          from,
          to: adminInbox('dhanana'),
          replyTo: email,
          subject: `[signup/${source} fallback] ${email}`.slice(0, 200),
          html:
            html +
            `<p style="color:#a00"><strong>Note:</strong> primary allendior inbox send failed; delivered via dhanana admin fallback.</p>`,
        })
        if (fallback.error) {
          console.error('Subscribe fallback failed:', fallback.error)
          return json({ error: 'Could not save signup. Please try again.' }, 500, request)
        }
      } else {
        return json({ error: 'Could not save signup. Please try again.' }, 500, request)
      }
    }

    return json({ success: true }, 200, request)
  } catch (err) {
    console.error('Subscribe error:', err)
    return json({ error: 'Could not save signup. Please try again.' }, 500, request)
  }
}
