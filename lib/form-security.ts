/**
 * Shared validation / anti-abuse helpers for public form API routes.
 * Best-effort only on serverless (no durable store) — pair with provider limits.
 */

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

/** Origins allowed to call our public form APIs from browsers. */
export const ALLOWED_ORIGINS = new Set([
  'https://dhanana.in',
  'https://www.dhanana.in',
  'https://allendior.com',
  'https://www.allendior.com',
  // local dev
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:1313',
  'http://127.0.0.1:1313',
])

/** Very small in-memory rate limit (per isolate). Not a substitute for WAF. */
const hits = new Map<string, { count: number; resetAt: number }>()

export function clientIp(req: Request): string {
  const xf = req.headers.get('x-forwarded-for')
  if (xf) return xf.split(',')[0]?.trim() || 'unknown'
  const real = req.headers.get('x-real-ip')
  if (real) return real.trim()
  return 'unknown'
}

export function rateLimit(
  key: string,
  limit = 8,
  windowMs = 60 * 60 * 1000,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now()
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
  return EMAIL_RE.test(email)
}

export function clampText(value: unknown, max: number): string {
  const s = String(value ?? '').trim()
  if (s.length <= max) return s
  return s.slice(0, max)
}

export function honeypotTripped(value: unknown): boolean {
  // Bots fill hidden "website" / "company" fields
  return String(value ?? '').trim().length > 0
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
  // Sandbox: only reliably delivers to the Resend account owner until domain is verified.
  return `${label} <onboarding@resend.dev>`
}

export function adminInbox(kind: 'dhanana' | 'allendior' = 'dhanana'): string {
  if (kind === 'allendior') {
    return (
      process.env.ALLENDIOR_ADMIN_EMAIL?.trim() ||
      process.env.ADMIN_EMAIL?.trim() ||
      'allendior.ca@gmail.com'
    )
  }
  return process.env.ADMIN_EMAIL?.trim() || 'allendhanana@gmail.com'
}
