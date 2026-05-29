"use client"
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'
import memoriesData from '@/data/memories.json'

type Memory = {
  id: string
  name: string
  anonymous: boolean
  connection: string
  era: string
  memory: string
  date_added: string
  photo: string | null
}

const memories: Memory[] = memoriesData as Memory[]

const CONNECTION_OPTIONS = [
  'Born and raised in Dhanana',
  'Family from Dhanana',
  'Visited Dhanana',
  'Heard stories about Dhanana',
  'Other',
]

const ERA_OPTIONS = [
  'Before 1970s',
  '1970s',
  '1980s',
  '1990s',
  '2000s',
  '2010s',
  'Recent / Present',
]

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'rgba(253,246,236,0.06)',
  border: '1px solid rgba(232,168,56,0.2)',
  borderRadius: 10,
  padding: '12px 16px',
  color: '#FDF6EC',
  fontSize: 15,
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
}

function MemoryCard({ m, i }: { m: Memory; i: number }) {
  const displayName = m.anonymous ? 'Anonymous' : m.name
  const era = m.era || ''

  return (
    <AnimatedSection delay={i * 0.07} className="break-inside-avoid mb-5">
      <div
        className="relative rounded-2xl p-7 overflow-hidden transition-all duration-300 cursor-default"
        style={{
          background: 'rgba(253,246,236,0.04)',
          border: '1px solid rgba(232,168,56,0.15)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.background = 'rgba(253,246,236,0.07)'
          ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,168,56,0.3)'
          ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.background = 'rgba(253,246,236,0.04)'
          ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,168,56,0.15)'
          ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
        }}
      >
        {/* Large quote mark watermark */}
        <div
          className="absolute -top-3 -left-1 font-serif select-none pointer-events-none"
          style={{ fontSize: 120, lineHeight: 1, color: '#E8A838', opacity: 0.07 }}
        >
          &ldquo;
        </div>

        {/* Memory text */}
        <p
          className="relative z-10 leading-relaxed"
          style={{
            fontSize: 15,
            color: 'rgba(253,246,236,0.88)',
            lineHeight: 1.8,
            fontFamily: 'Georgia, serif',
          }}
        >
          {m.memory}
        </p>

        {/* Bottom meta */}
        <div
          className="flex items-center justify-between mt-6 pt-5"
          style={{ borderTop: '1px solid rgba(232,168,56,0.1)' }}
        >
          <div>
            <div className="text-sm font-semibold" style={{ color: '#E8A838' }}>
              {displayName}
            </div>
            {era && (
              <div className="text-xs mt-0.5" style={{ color: 'rgba(253,246,236,0.4)' }}>
                {era}
              </div>
            )}
          </div>
          <div
            className="text-xs px-3 py-1 rounded-full"
            style={{ background: 'rgba(232,168,56,0.1)', color: 'rgba(253,246,236,0.55)' }}
          >
            {m.connection}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default function MemoriesPage() {
  const { t, lang } = useLanguage()

  const [form, setForm] = useState({
    name: '', connection: '', era: '', memory: '', email: '', anonymous: false,
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [charCount, setCharCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhoto = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { setError('Photo must be under 5MB'); return }
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
    setError('')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) { setError('Please enter your name'); return }
    if (!form.connection) { setError('Please select your connection to Dhanana'); return }
    if (form.memory.trim().length < 50) { setError('Your memory must be at least 50 characters'); return }

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('connection', form.connection)
      fd.append('era', form.era)
      fd.append('memory', form.memory)
      fd.append('email', form.email)
      fd.append('anonymous', String(form.anonymous))
      if (photoFile) fd.append('photo', photoFile)

      const res = await fetch('/api/submit-memory', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const heroTitle = t('memories.hero_devanagari')
  const heroSub   = t('memories.hero_sub')

  return (
    <div style={{ background: '#2C3B1F', minHeight: '100vh' }}>
      {/* ── Hero ── */}
      <section className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden pt-20">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(232,168,56,0.07) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 select-none pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="font-devanagari" style={{ fontSize: 'clamp(180px, 35vw, 420px)', color: 'rgba(253,246,236,0.018)', lineHeight: 1 }}>
            {heroTitle}
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: 'rgba(232,168,56,0.55)' }}>
              Dhanana · धनाना
            </p>
            <h1
              className="font-devanagari leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 12vw, 7rem)', color: '#E8A838' }}
            >
              {heroTitle}
            </h1>
            <p
              className="font-light max-w-2xl mx-auto"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(253,246,236,0.65)', lineHeight: 1.8 }}
            >
              {heroSub}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Memories Display ── */}
      <section className="py-16" style={{ borderTop: '1px solid rgba(232,168,56,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Count */}
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-12" style={{ background: 'rgba(232,168,56,0.3)' }} />
              <span style={{ color: 'rgba(253,246,236,0.5)', fontSize: 13, letterSpacing: '0.05em' }}>
                <span style={{ color: '#E8A838', fontWeight: 700, fontSize: 18 }}>{memories.length}</span>
                {' '}{t('memories.count')}
              </span>
              <div className="h-px w-12" style={{ background: 'rgba(232,168,56,0.3)' }} />
            </div>
          </AnimatedSection>

          {/* Masonry grid */}
          <div className="columns-1 md:columns-2 lg:columns-2 gap-5">
            {memories.map((m, i) => (
              <MemoryCard key={m.id} m={m} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Submission Form ── */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(232,168,56,0.08)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <h2
              className="font-bold mb-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FDF6EC', letterSpacing: '-0.02em' }}
            >
              Share Your Memory
            </h2>
            <p style={{ color: 'rgba(253,246,236,0.55)', lineHeight: 1.75, fontSize: 15 }}>
              A story, a moment, a person you remember.<br />
              These are what keep a village alive.
            </p>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl p-12 text-center"
                style={{ background: 'rgba(232,168,56,0.08)', border: '1px solid rgba(232,168,56,0.25)' }}
              >
                <div className="font-devanagari text-5xl mb-5" style={{ color: '#E8A838' }}>🙏</div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#FDF6EC' }}>
                  {t('memories.success_title')}
                </h3>
                <p style={{ color: 'rgba(253,246,236,0.65)', lineHeight: 1.75 }}>
                  {t('memories.success_body')}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: 'rgba(253,246,236,0.45)' }}>
                    {t('memories.form_name')} *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    style={inputBase}
                    onFocus={e => { e.target.style.borderColor = '#E8A838' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(232,168,56,0.2)' }}
                    required
                  />
                </div>

                {/* Email (optional) */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: 'rgba(253,246,236,0.45)' }}>
                    Email <span style={{ opacity: 0.5 }}>(optional — for a confirmation copy)</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    style={inputBase}
                    onFocus={e => { e.target.style.borderColor = '#E8A838' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(232,168,56,0.2)' }}
                  />
                </div>

                {/* Connection */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: 'rgba(253,246,236,0.45)' }}>
                    {t('memories.form_connection')} *
                  </label>
                  <select
                    value={form.connection}
                    onChange={e => setForm(f => ({ ...f, connection: e.target.value }))}
                    style={{ ...inputBase, cursor: 'pointer' }}
                    onFocus={e => { e.target.style.borderColor = '#E8A838' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(232,168,56,0.2)' }}
                    required
                  >
                    <option value="" disabled style={{ background: '#2C3B1F' }}>Select your connection…</option>
                    {CONNECTION_OPTIONS.map(o => (
                      <option key={o} value={o} style={{ background: '#2C3B1F' }}>{o}</option>
                    ))}
                  </select>
                </div>

                {/* Era */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: 'rgba(253,246,236,0.45)' }}>
                    {t('memories.form_era')} <span style={{ opacity: 0.5 }}>(optional)</span>
                  </label>
                  <select
                    value={form.era}
                    onChange={e => setForm(f => ({ ...f, era: e.target.value }))}
                    style={{ ...inputBase, cursor: 'pointer' }}
                    onFocus={e => { e.target.style.borderColor = '#E8A838' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(232,168,56,0.2)' }}
                  >
                    <option value="" style={{ background: '#2C3B1F' }}>Select a time period…</option>
                    {ERA_OPTIONS.map(o => (
                      <option key={o} value={o} style={{ background: '#2C3B1F' }}>{o}</option>
                    ))}
                  </select>
                </div>

                {/* Memory textarea */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: 'rgba(253,246,236,0.45)' }}>
                    {t('memories.form_memory')} *
                    <span className="ml-2 font-normal normal-case" style={{ opacity: 0.5 }}>
                      ({charCount}/50 min)
                    </span>
                  </label>
                  <textarea
                    value={form.memory}
                    onChange={e => { setForm(f => ({ ...f, memory: e.target.value })); setCharCount(e.target.value.length) }}
                    placeholder="Write anything — a festival you remember, a person who shaped you, a place that meant something, a tradition that's fading away..."
                    rows={6}
                    style={{ ...inputBase, resize: 'vertical', minHeight: 140 }}
                    onFocus={e => { e.target.style.borderColor = '#E8A838' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(232,168,56,0.2)' }}
                    required
                  />
                </div>

                {/* Photo upload */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: 'rgba(253,246,236,0.45)' }}>
                    {t('memories.form_photo')}
                  </label>
                  <div
                    className="rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors duration-200"
                    style={{ borderColor: 'rgba(232,168,56,0.2)' }}
                    onClick={() => fileRef.current?.click()}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,168,56,0.45)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,168,56,0.2)' }}
                  >
                    {photoPreview ? (
                      <div className="flex items-center gap-4">
                        <img src={photoPreview} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
                        <div className="text-left">
                          <div className="text-sm font-medium" style={{ color: '#E8A838' }}>{photoFile?.name}</div>
                          <div className="text-xs mt-0.5" style={{ color: 'rgba(253,246,236,0.4)' }}>
                            {photoFile ? `${(photoFile.size / 1024 / 1024).toFixed(1)} MB` : ''}
                          </div>
                          <button
                            type="button"
                            className="text-xs mt-1"
                            style={{ color: 'rgba(253,246,236,0.4)' }}
                            onClick={ev => { ev.stopPropagation(); setPhotoFile(null); setPhotoPreview(null) }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <svg className="mx-auto mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(232,168,56,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21,15 16,10 5,21"/>
                        </svg>
                        <p className="text-sm" style={{ color: 'rgba(253,246,236,0.4)' }}>
                          Click to add a photo · JPG, PNG, WebP · Max 5MB
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handlePhoto}
                  />
                </div>

                {/* Anonymous toggle */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
                    style={{ background: form.anonymous ? '#E8A838' : 'rgba(253,246,236,0.12)' }}
                    onClick={() => setForm(f => ({ ...f, anonymous: !f.anonymous }))}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-200"
                      style={{
                        left: form.anonymous ? '22px' : '2px',
                        background: form.anonymous ? '#2C3B1F' : 'rgba(253,246,236,0.6)',
                      }}
                    />
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(253,246,236,0.65)' }}>
                    {t('memories.form_anonymous')}
                    <span className="ml-1" style={{ color: 'rgba(253,246,236,0.35)' }}>
                      ({form.anonymous ? 'Will show as "Anonymous"' : `Will show as "${form.name || 'your name'}"`})
                    </span>
                  </span>
                </label>

                {/* Error */}
                {error && (
                  <div className="rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(196,97,58,0.15)', color: '#E8A838', border: '1px solid rgba(196,97,58,0.3)' }}>
                    {error}
                  </div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-4 rounded-2xl font-semibold text-base cursor-pointer transition-opacity duration-200"
                  style={{
                    background: '#E8A838',
                    color: '#2C3B1F',
                    opacity: loading ? 0.7 : 1,
                    letterSpacing: '0.02em',
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Sending…
                    </span>
                  ) : t('memories.form_submit')}
                </motion.button>

                <p className="text-center text-xs" style={{ color: 'rgba(253,246,236,0.3)' }}>
                  Memories are reviewed before appearing on the wall.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
