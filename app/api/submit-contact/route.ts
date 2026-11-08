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

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) })
}

export async function POST(request: Request) {
  const ip = clientIp(request)
  const limited = rateLimit(`contact:${ip}`, 8, 60 * 60 * 1000)
  if (!limited.ok) {
    return json(
      { error: 'Too many messages. Please try again later.' },
      429,
      request,
      { 'Retry-After': String(limited.retryAfterSec) },
    )
  }

  const apiKey = requireResendKey()
  if (!apiKey) {
    console.error('RESEND_API_KEY missing')
    return json({ error: 'Form is temporarily unavailable.' }, 503, request)
  }

  try {
    const contentType = request.headers.get('content-type') || ''
    let name = ''
    let email = ''
    let connection = ''
    let message = ''
    let honey = ''

    if (contentType.includes('application/json')) {
      const body = await request.json()
      name = clampText(body.name, 120)
      email = clampText(body.email, 254)
      connection = clampText(body.connection, 200)
      message = clampText(body.message, 5000)
      honey = clampText(body.website || body.company, 200)
    } else {
      const formData = await request.formData()
      name = clampText(formData.get('name'), 120)
      email = clampText(formData.get('email'), 254)
      connection = clampText(formData.get('connection'), 200)
      message = clampText(formData.get('message'), 5000)
      honey = clampText(formData.get('website') || formData.get('company'), 200)
    }

    if (honeypotTripped(honey)) {
      return json({ success: true }, 200, request)
    }

    if (!name || !email || !message) {
      return json({ error: 'Name, email, and message are required.' }, 400, request)
    }
    if (!isValidEmail(email)) {
      return json({ error: 'Invalid email address' }, 400, request)
    }
    if (message.length < 10) {
      return json({ error: 'Message is too short.' }, 400, request)
    }

    const resend = new Resend(apiKey)
    const from = resendFrom('Dhanana Connect')
    const to = adminInbox('dhanana')

    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;background:#FDF6EC;color:#1C1C1E;padding:24px">
  <h1 style="color:#2C3B1F">New message via dhanana.in/connect</h1>
  <p><strong>Name:</strong> ${escHtml(name)}</p>
  <p><strong>Email:</strong> ${escHtml(email)}</p>
  <p><strong>Connection:</strong> ${escHtml(connection || '—')}</p>
  <hr style="border:none;border-top:1px solid rgba(28,28,30,0.12);margin:20px 0" />
  <div style="white-space:pre-wrap;line-height:1.6">${escHtml(message)}</div>
  <p style="margin-top:24px;font-size:12px;color:#666">Reply directly to this email to answer ${escHtml(name)}.</p>
</body></html>`

    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Connect — ${name}`.slice(0, 200),
      html,
    })

    if (result.error) {
      console.error('Contact email failed:', result.error)
      return json({ error: 'Failed to send. Please try again.' }, 500, request)
    }

    return json({ success: true }, 200, request)
  } catch (err) {
    console.error('Contact submission error:', err)
    return json({ error: 'Failed to send. Please try again.' }, 500, request)
  }
}
