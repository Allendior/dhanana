/**
 * Shared validation / anti-abuse helpers for public form API routes.
 *
 * Limits are best-effort on serverless (per-isolate memory). Pair with
 * platform WAF / Resend account limits. Never treat CORS as auth.
 */

import { createHash } from 'crypto'

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

/** Origins allowed to call our public form APIs from browsers. */
export const ALLOWED_ORIGINS = new Set([
  'https://dhanana.in',
  'https://www.dhanana.in',
  'https://allendior.com',
  'https://www.allendior.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:1313',
  'http://127.0.0.1:1313',
])

/** Max JSON body we accept before parsing (bytes). Multipart photo route uses its own cap. */
export const MAX_JSON_BODY_BYTES = 32 * 1024

/** Very small in-memory rate limit (per isolate). Not a durable WAF. */
const hits = new Map<string, { count: number; resetAt: number }>()

/**
 * Prefer platform-provided client IP.
 * On Vercel, `x-forwarded-for` is set by the edge (leftmost = client).
 * We still combine with UA fingerprint in rateLimitKey — headers alone are not enough.
 */
export function clientIp(req: Request): string {
  const vercel = req.headers.get('x-vercel-forwarded-for')
  if (vercel) {
    const first = vercel.split(',')[0]?.trim()
    if (first) return first
  }
  const xf = req.headers.get('x-forwarded-for')
  if (xf) {
    const first = xf.split(',')[0]?.trim()
    if (first) return first
  }
  const real = req.headers.get('x-real-ip')
  if (real?.trim()) return real.trim()
  return 'unknown'
}

export function rateLimitKey(req: Request, bucket: string, extra = ''): string {
  const ip = clientIp(req)
  const ua = (req.headers.get('user-agent') || '').slice(0, 180)
  const uaHash = createHash('sha256').update(ua).digest('hex').slice(0, 12)
  const extraHash = extra
    ? createHash('sha256').update(extra.toLowerCase()).digest('hex').slice(0, 12)
    : ''
  return `${bucket}:${ip}:${uaHash}${extraHash ? ':' + extraHash : ''}`
}

export function rateLimit(
  key: string,
  limit = 8,
  windowMs = 60 * 60 * 1000,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now()
  // Bound map growth on long-lived isolates
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (now >= v.resetAt) hits.delete(k)
    }
  }
  const row = hits.get(key)
  if (!row || now >= row.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true }
  }
  if (row.count >= limit) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((row.resetAt - now) / 1000)) }
  }
  row.count += 1
  return { ok: true }
}

export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false
  if (email.includes('\n') || email.includes('\r') || email.includes('%0')) return false
  return EMAIL_RE.test(email)
}

export function clampText(value: unknown, max: number): string {
  const s = String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
  if (s.length <= max) return s
  return s.slice(0, max)
}

/** Strip control chars / newlines from email subjects (header injection). */
export function safeSubject(value: string, max = 180): string {
  return clampText(value, max).replace(/[\r\n]+/g, ' ')
}

export function honeypotTripped(value: unknown): boolean {
  return String(value ?? '').trim().length > 0
}

/**
 * Reject forms completed impossibly fast or with absurd timestamps.
 * Client may send `form_started_at` (epoch ms). Spoofable alone — defense in depth only.
 */
export function formTimingBad(startedAtRaw: unknown): boolean {
  if (startedAtRaw === undefined || startedAtRaw === null || startedAtRaw === '') return false
  const n = Number(startedAtRaw)
  if (!Number.isFinite(n)) return true
  const age = Date.now() - n
  if (age < 1500) return true // < 1.5s
  if (age > 6 * 60 * 60 * 1000) return true // > 6h
  return false
}

export function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br>')
}

export function corsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get('origin') || ''
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
  }
  return headers
}

export function json(
  body: unknown,
  status: number,
  req: Request,
  extraHeaders?: HeadersInit,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...corsHeaders(req),
      ...(extraHeaders || {}),
    },
  })
}

export function requireResendKey(): string | null {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) return null
  return key
}

/** Prefer verified domain sender when configured; else Resend onboarding sandbox. */
export function resendFrom(label: string): string {
  const configured = process.env.RESEND_FROM?.trim()
  if (configured) return configured
  return `${label} <onboarding@resend.dev>`
}

export function adminInbox(kind: 'dhanana' | 'allendior' = 'dhanana'): string {
  if (kind === 'allendior') {
    return (
      process.env.ALLENDIOR_ADMIN_EMAIL?.trim() ||
      process.env.ADMIN_EMAIL?.trim() ||
      'allendhanana@gmail.com'
    )
  }
  return process.env.ADMIN_EMAIL?.trim() || 'allendhanana@gmail.com'
}

/**
 * Visitor confirmation mail is OFF by default (open relay risk while rate limits
 * are only best-effort). Set SEND_VISITOR_CONFIRMATION=true after domain verify + WAF.
 */
export function visitorConfirmationEnabled(): boolean {
  return process.env.SEND_VISITOR_CONFIRMATION === 'true'
}

export function rejectOversizeJson(req: Request): Response | null {
  const cl = req.headers.get('content-length')
  if (!cl) return null
  const n = Number(cl)
  if (Number.isFinite(n) && n > MAX_JSON_BODY_BYTES) {
    return json({ error: 'Request too large' }, 413, req)
  }
  return null
}

/** Multipart upper bound including photo (bytes). */
export const MAX_MULTIPART_BYTES = 6 * 1024 * 1024

export function rejectOversizeMultipart(req: Request): Response | null {
  const cl = req.headers.get('content-length')
  if (!cl) return null
  const n = Number(cl)
  if (Number.isFinite(n) && n > MAX_MULTIPART_BYTES) {
    return json({ error: 'Request too large' }, 413, req)
  }
  return null
}

const IMAGE_MAGIC: { ext: string; check: (b: Buffer) => boolean }[] = [
  { ext: 'jpg', check: (b) => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    ext: 'png',
    check: (b) =>
      b.length >= 8 &&
      b[0] === 0x89 &&
      b[1] === 0x50 &&
      b[2] === 0x4e &&
      b[3] === 0x47 &&
      b[4] === 0x0d &&
      b[5] === 0x0a &&
      b[6] === 0x1a &&
      b[7] === 0x0a,
  },
  {
    ext: 'gif',
    check: (b) =>
      b.length >= 6 &&
      b[0] === 0x47 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x38 &&
      (b[4] === 0x39 || b[4] === 0x37) &&
      b[5] === 0x61,
  },
  {
    ext: 'webp',
    check: (b) =>
      b.length >= 12 &&
      b[0] === 0x52 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x46 &&
      b[8] === 0x57 &&
      b[9] === 0x45 &&
      b[10] === 0x42 &&
      b[11] === 0x50,
  },
]

export function detectImageExt(buf: Buffer): string | null {
  for (const row of IMAGE_MAGIC) {
    if (row.check(buf)) return row.ext
  }
  return null
}

export function safeAttachmentName(base: string, ext: string): string {
  const stem = base.replace(/\.[^.]+$/, '').replace(/[^\w.\-]+/g, '_').slice(0, 60) || 'photo'
  return `${stem}.${ext}`
}
