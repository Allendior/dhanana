import { Resend } from 'resend'
import {
  adminInbox,
  clampText,
  clientIp,
  corsHeaders,
  escHtml,
  formTimingBad,
  honeypotTripped,
  isValidEmail,
  json,
  rateLimit,
  rateLimitKey,
  rejectOversizeJson,
  requireResendKey,
  resendFrom,
  safeSubject,
} from '@/lib/form-security'

export const runtime = 'nodejs'

const SOURCES = new Set(['allendior', 'dhanana'])

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) })
}

/**
 * Notify-only email capture (not a full ESP list).
 * Does NOT email the visitor. Does NOT mark them as confirmed subscribers.
 * Allen must verify ownership before any outbound marketing list add.
 */
export async function POST(request: Request) {
  const oversized = rejectOversizeJson(request)
  if (oversized) return oversized

  const limited = rateLimit(rateLimitKey(request, 'subscribe'), 4, 60 * 60 * 1000)
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
    let startedAt: unknown = ''

    if (contentType.includes('application/json')) {
      const body = await request.json()
      email = clampText(body.email, 254).toLowerCase()
      source = clampText(body.source || 'allendior', 40).toLowerCase()
      name = clampText(body.name, 120)
      honey = clampText(body.website || body.company, 200)
      startedAt = body.form_started_at
    } else {
      const formData = await request.formData()
      email = clampText(formData.get('email'), 254).toLowerCase()
      source = clampText(formData.get('source') || 'allendior', 40).toLowerCase()
      name = clampText(formData.get('name'), 120)
      honey = clampText(formData.get('website') || formData.get('company'), 200)
      startedAt = formData.get('form_started_at')
    }

    if (honeypotTripped(honey)) {
      return json({ success: true }, 200, request)
    }
    if (formTimingBad(startedAt)) {
      return json({ error: 'Please try again.' }, 400, request)
    }

    if (!SOURCES.has(source)) {
      return json({ error: 'Unknown source' }, 400, request)
    }
    if (!email || !isValidEmail(email)) {
      return json({ error: 'Please enter a valid email.' }, 400, request)
    }

    const emailLimited = rateLimit(rateLimitKey(request, 'subscribe-email', email), 2, 24 * 60 * 60 * 1000)
    if (!emailLimited.ok) {
      return json(
        { error: 'Too many attempts for this email. Please try again later.' },
        429,
        request,
        { 'Retry-After': String(emailLimited.retryAfterSec) },
      )
    }

    const resend = new Resend(apiKey)
    const kind = source === 'allendior' ? 'allendior' : 'dhanana'
    // Prefer single admin inbox that Resend sandbox can deliver to
    const to = adminInbox(kind === 'allendior' ? 'allendior' : 'dhanana')
    const from = resendFrom(source === 'allendior' ? 'Allen Dior Updates' : 'Dhanana Updates')
    const label = source === 'allendior' ? 'allendior.com' : 'dhanana.in'
    const ip = clientIp(request)

    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;padding:24px;color:#111">
  <h2 style="margin:0 0 12px">Email interest notify — ${escHtml(label)}</h2>
  <p><strong>Email:</strong> ${escHtml(email)}</p>
  ${name ? `<p><strong>Name:</strong> ${escHtml(name)}</p>` : ''}
  <p><strong>Source:</strong> ${escHtml(source)}</p>
  <p><strong>IP (platform-reported):</strong> ${escHtml(ip)}</p>
  <p style="margin-top:20px;font-size:13px;color:#555;line-height:1.5">
    <strong>Not a confirmed subscription.</strong> This is notify-only.
    Do not add this address to a marketing list until the person confirms
    (double opt-in / reply). No visitor-facing email was sent by the API.
  </p>
</body></html>`

    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: safeSubject(`[interest/${source}] ${email}`),
      html,
    })

    if (result.error) {
      console.error('Subscribe notify failed:', result.error)
      if (kind === 'allendior' && to !== adminInbox('dhanana')) {
        const fallback = await resend.emails.send({
          from,
          to: adminInbox('dhanana'),
          replyTo: email,
          subject: safeSubject(`[interest/${source} fallback] ${email}`),
          html:
            html +
            `<p style="color:#a00"><strong>Note:</strong> primary inbox send failed; via dhanana admin fallback.</p>`,
        })
        if (fallback.error) {
          console.error('Subscribe fallback failed:', fallback.error)
          return json({ error: 'Could not save signup. Please try again.' }, 500, request)
        }
      } else {
        return json({ error: 'Could not save signup. Please try again.' }, 500, request)
      }
    }

    // success = admin was notified. Not "you are on a mailing list".
    return json({ success: true, mode: 'notify-only' }, 200, request)
  } catch (err) {
    console.error('Subscribe error:', err)
    return json({ error: 'Could not save signup. Please try again.' }, 500, request)
  }
}
