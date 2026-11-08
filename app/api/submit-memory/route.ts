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
  const limited = rateLimit(`memory:${ip}`, 6, 60 * 60 * 1000)
  if (!limited.ok) {
    return json(
      { error: 'Too many submissions. Please try again later.' },
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
    const formData = await request.formData()

    if (honeypotTripped(formData.get('website') || formData.get('company'))) {
      return json({ success: true }, 200, request)
    }

    const name = clampText(formData.get('name'), 120)
    const connection = clampText(formData.get('connection'), 120)
    const era = clampText(formData.get('era'), 40)
    const memory = clampText(formData.get('memory'), 8000)
    const emailRaw = clampText(formData.get('email'), 254)
    const anonymous = formData.get('anonymous') === 'true'
    const photo = formData.get('photo') as File | null

    if (!name || !connection || !memory) {
      return json({ error: 'Missing required fields' }, 400, request)
    }
    if (memory.length < 50) {
      return json({ error: 'Memory must be at least 50 characters' }, 400, request)
    }
    if (emailRaw && !isValidEmail(emailRaw)) {
      return json({ error: 'Invalid email address' }, 400, request)
    }

    const attachments: { filename: string; content: Buffer }[] = []
    let hasPhoto = false
    if (photo && typeof photo === 'object' && 'size' in photo && photo.size > 0) {
      if (photo.size > 5 * 1024 * 1024) {
        return json({ error: 'Photo must be under 5MB' }, 400, request)
      }
      const type = (photo.type || '').toLowerCase()
      if (type && !['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(type)) {
        return json({ error: 'Photo must be JPG, PNG, WebP, or GIF' }, 400, request)
      }
      const safeName = (photo.name || 'photo.jpg').replace(/[^\w.\-]+/g, '_').slice(0, 80)
      attachments.push({
        filename: safeName || 'photo.jpg',
        content: Buffer.from(await photo.arrayBuffer()),
      })
      hasPhoto = true
    }

    const resend = new Resend(apiKey)
    const from = resendFrom('Dhanana Memory Wall')
    const to = adminInbox('dhanana')

    const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: 'Georgia', serif; background: #FDF6EC; color: #1C1C1E; margin: 0; padding: 0; }
  .wrap { max-width: 600px; margin: 0 auto; }
  .header { background: #2C3B1F; color: #FDF6EC; padding: 32px 40px; border-bottom: 4px solid #E8A838; }
  .header h1 { font-size: 22px; margin: 0 0 4px; color: #E8A838; }
  .header p { font-size: 13px; margin: 0; opacity: 0.65; letter-spacing: 0.05em; }
  .body { padding: 32px 40px; }
  .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(28,28,30,0.08); gap: 16px; }
  .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(28,28,30,0.45); }
  .value { font-size: 14px; font-weight: 600; color: #1C1C1E; text-align: right; max-width: 300px; word-break: break-word; }
  .memory-block { background: rgba(232,168,56,0.06); border-left: 3px solid #E8A838; padding: 20px 24px; margin: 24px 0; border-radius: 0 8px 8px 0; font-size: 15px; line-height: 1.75; color: #1C1C1E; word-break: break-word; }
  .action { background: #2C3B1F; color: #FDF6EC; padding: 20px 40px; font-size: 13px; line-height: 1.7; }
  .action code { background: rgba(232,168,56,0.2); padding: 2px 6px; border-radius: 4px; color: #E8A838; font-size: 12px; }
  .footer { padding: 16px 40px; text-align: center; font-size: 11px; color: rgba(28,28,30,0.4); }
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>New Memory for dhanana.in</h1>
    <p>Submitted via the Memory Wall</p>
  </div>
  <div class="body">
    <div class="row"><span class="label">From</span><span class="value">${escHtml(name)}</span></div>
    <div class="row"><span class="label">Connection</span><span class="value">${escHtml(connection)}</span></div>
    <div class="row"><span class="label">Era</span><span class="value">${escHtml(era || 'Not specified')}</span></div>
    <div class="row"><span class="label">Email</span><span class="value">${emailRaw ? escHtml(emailRaw) : 'Not provided'}</span></div>
    <div class="row"><span class="label">Display as</span><span class="value">${anonymous ? 'Anonymous' : 'Their real name'}</span></div>
    <div class="row"><span class="label">Photo attached</span><span class="value">${hasPhoto ? 'Yes' : 'No'}</span></div>
    <div class="memory-block">${escHtml(memory)}</div>
  </div>
  <div class="action">
    <strong>To approve and publish this memory:</strong><br>
    Open <code>/data/memories.json</code> and add a new entry, then redeploy.
  </div>
  <div class="footer">dhanana.in · Memory Wall</div>
</div>
</body>
</html>`

    const adminResult = await resend.emails.send({
      from,
      to,
      subject: `New Memory — Dhanana | ${name}`.slice(0, 200),
      html: adminHtml,
      attachments,
      ...(emailRaw ? { replyTo: emailRaw } : {}),
    })

    if (adminResult.error) {
      console.error('Memory admin email failed:', adminResult.error)
      return json({ error: 'Failed to send. Please try again.' }, 500, request)
    }

    if (emailRaw) {
      const confirmHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: 'Georgia', serif; background: #FDF6EC; color: #1C1C1E; margin: 0; padding: 0; }
  .wrap { max-width: 560px; margin: 0 auto; }
  .header { background: #2C3B1F; padding: 40px; text-align: center; border-bottom: 3px solid #E8A838; }
  .title { color: #E8A838; font-size: 28px; margin: 0 0 6px; }
  .subtitle { color: rgba(253,246,236,0.6); font-size: 13px; letter-spacing: 0.1em; }
  .body { padding: 36px 40px; text-align: center; }
  .body p { font-size: 15px; line-height: 1.8; color: rgba(28,28,30,0.75); }
  .memory-preview { background: rgba(232,168,56,0.06); border: 1px solid rgba(232,168,56,0.2); border-radius: 12px; padding: 20px 24px; margin: 24px 0; font-style: italic; font-size: 14px; line-height: 1.75; color: #1C1C1E; text-align: left; word-break: break-word; }
  .link { display: inline-block; margin-top: 8px; padding: 12px 28px; background: #E8A838; color: #fff; text-decoration: none; border-radius: 32px; font-size: 13px; font-weight: 600; }
  .footer { padding: 20px 40px; text-align: center; font-size: 11px; color: rgba(28,28,30,0.4); border-top: 1px solid rgba(28,28,30,0.06); }
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <div class="title">यादें</div>
    <div class="subtitle">DHANANA MEMORY WALL</div>
  </div>
  <div class="body">
    <p>Thank you, <strong>${escHtml(name)}</strong>.<br>
    Your memory of Dhanana has been received.</p>
    <div class="memory-preview">${escHtml(memory.length > 200 ? memory.slice(0, 200) + '…' : memory)}</div>
    <p style="font-size:13px">It will appear on the Memory Wall after a brief review.<br>
    We're grateful you shared a piece of Dhanana with us.</p>
    <a href="https://dhanana.in/memories" class="link">Visit the Memory Wall →</a>
  </div>
  <div class="footer">dhanana.in · Built with love for the people of Dhanana</div>
</div>
</body>
</html>`

      try {
        const conf = await resend.emails.send({
          from,
          to: emailRaw,
          subject: 'Your memory of Dhanana has been received',
          html: confirmHtml,
        })
        if (conf.error) {
          console.warn('Memory confirmation email skipped/failed:', conf.error)
        }
      } catch (confirmErr) {
        console.warn('Memory confirmation email exception:', confirmErr)
      }
    }

    return json({ success: true }, 200, request)
  } catch (err) {
    console.error('Memory submission error:', err)
    return json({ error: 'Failed to send. Please try again.' }, 500, request)
  }
}
