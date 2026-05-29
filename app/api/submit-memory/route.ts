import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br>')
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name       = (formData.get('name')       as string || '').trim()
    const connection = (formData.get('connection') as string || '').trim()
    const era        = (formData.get('era')        as string || '').trim()
    const memory     = (formData.get('memory')     as string || '').trim()
    const email      = (formData.get('email')      as string || '').trim()
    const anonymous  = formData.get('anonymous') === 'true'
    const photo      = formData.get('photo') as File | null

    if (!name || !connection || !memory) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (memory.length < 50) {
      return NextResponse.json({ error: 'Memory must be at least 50 characters' }, { status: 400 })
    }

    const attachments: { filename: string; content: Buffer }[] = []
    let hasPhoto = false
    if (photo && photo.size > 0) {
      if (photo.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'Photo must be under 5MB' }, { status: 400 })
      }
      attachments.push({
        filename: photo.name || 'photo.jpg',
        content: Buffer.from(await photo.arrayBuffer()),
      })
      hasPhoto = true
    }

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
  .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(28,28,30,0.08); }
  .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(28,28,30,0.45); }
  .value { font-size: 14px; font-weight: 600; color: #1C1C1E; text-align: right; max-width: 300px; }
  .memory-block { background: rgba(232,168,56,0.06); border-left: 3px solid #E8A838; padding: 20px 24px; margin: 24px 0; border-radius: 0 8px 8px 0; font-size: 15px; line-height: 1.75; color: #1C1C1E; }
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
    <div class="row"><span class="label">Email</span><span class="value">${email ? escHtml(email) : 'Not provided'}</span></div>
    <div class="row"><span class="label">Display as</span><span class="value">${anonymous ? 'Anonymous' : 'Their real name'}</span></div>
    <div class="row"><span class="label">Photo attached</span><span class="value">${hasPhoto ? 'Yes ✓' : 'No'}</span></div>
    <div class="memory-block">${escHtml(memory)}</div>
  </div>
  <div class="action">
    <strong>To approve and publish this memory:</strong><br>
    Open <code>/data/memories.json</code> and add a new entry, then redeploy.
    <br><br>
    Format:<br>
    <code>{ "id": "XXX", "name": "${escHtml(anonymous ? 'Anonymous' : name)}", "anonymous": ${anonymous}, "connection": "${escHtml(connection)}", "era": "${escHtml(era || '')}", "memory": "...", "date_added": "${new Date().toISOString().split('T')[0]}", "photo": null }</code>
  </div>
  <div class="footer">dhanana.in · Memory Wall</div>
</div>
</body>
</html>`

    await resend.emails.send({
      // Use your verified domain once set up at resend.com/domains
      // Replace with: 'Memory Wall <memories@dhanana.in>'
      from: 'Dhanana Memory Wall <onboarding@resend.dev>',
      to: 'allendhanana@gmail.com',
      subject: `New Memory — Dhanana | ${name}`,
      html: adminHtml,
      attachments,
      ...(email ? { reply_to: email } : {}),
    })

    // Confirmation email to submitter
    if (email) {
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
  .memory-preview { background: rgba(232,168,56,0.06); border: 1px solid rgba(232,168,56,0.2); border-radius: 12px; padding: 20px 24px; margin: 24px 0; font-style: italic; font-size: 14px; line-height: 1.75; color: #1C1C1E; text-align: left; }
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

      await resend.emails.send({
        from: 'Dhanana Memory Wall <onboarding@resend.dev>',
        to: email,
        subject: 'Your memory of Dhanana has been received',
        html: confirmHtml,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Memory submission error:', err)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}
