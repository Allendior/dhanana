"use client"
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'

export default function ConnectPage() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', connection: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [memory, setMemory] = useState('')
  const [memoryShared, setMemoryShared] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:dhananavillage@gmail.com?subject=Message from ${form.name}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nConnection: ${form.connection}\n\n${form.message}`
    )}`
    setSubmitted(true)
  }

  const handleMemory = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const stored = JSON.parse(localStorage.getItem('dhanana-memories') || '[]')
      stored.push({ text: memory, date: new Date().toISOString() })
      localStorage.setItem('dhanana-memories', JSON.stringify(stored))
    } catch {}
    setMemoryShared(true)
    setMemory('')
  }

  const inputStyle = {
    background: '#FDF6EC',
    border: '1px solid rgba(232,168,56,0.25)',
    color: '#1C1C1E',
    outline: 'none',
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#E8A838'
    e.target.style.boxShadow = '0 0 0 3px rgba(232,168,56,0.12)'
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(232,168,56,0.25)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative" style={{ background: 'linear-gradient(135deg, #C4613A 0%, #E8A838 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="font-devanagari text-7xl text-white/20 leading-none mb-2 select-none">{t('hero.village_name')}</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('connect.title')}</h1>
            <p className="text-lg font-light text-white/75 max-w-xl">{t('connect.from_dhanana_sub')}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to bottom, transparent, #FDF6EC)' }} />
      </section>

      <section className="py-20" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <AnimatedSection direction="left">
              <div className="rounded-3xl p-8 md:p-10" style={{ background: '#fff', boxShadow: '0 20px 60px -20px rgba(28,28,30,0.1)' }}>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#1C1C1E' }}>{t('connect.from_dhanana')}</h2>
                <p className="text-sm mb-8" style={{ color: 'rgba(28,28,30,0.55)' }}>{t('connect.from_dhanana_sub')}</p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">🙏</div>
                    <h3 className="font-semibold text-xl mb-2" style={{ color: '#1C1C1E' }}>Message sent!</h3>
                    <p className="text-sm" style={{ color: 'rgba(28,28,30,0.55)' }}>We&apos;ll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                      { field: 'name',       label: t('connect.form_name'),       type: 'text',  placeholder: 'Your full name',   required: true },
                      { field: 'email',      label: t('connect.form_email'),      type: 'email', placeholder: 'your@email.com',   required: true },
                      { field: 'connection', label: t('connect.form_connection'), type: 'text',  placeholder: 'e.g. Born here, family roots, visiting…', required: false },
                    ].map(({ field, label, type, placeholder, required }) => (
                      <div key={field}>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1E' }}>{label}</label>
                        <input
                          type={type}
                          value={form[field as keyof typeof form]}
                          onChange={e => setForm(s => ({ ...s, [field]: e.target.value }))}
                          placeholder={placeholder}
                          required={required}
                          className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-150"
                          style={inputStyle}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1E' }}>{t('connect.form_message')}</label>
                      <textarea
                        value={form.message}
                        onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
                        rows={4}
                        placeholder="Tell us about yourself or anything you'd like to share…"
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-all duration-150"
                        style={inputStyle}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-sm font-semibold text-white cursor-pointer hover:opacity-90 hover:scale-[1.01] transition-all duration-200"
                      style={{ background: 'linear-gradient(135deg, #E8A838, #C4613A)' }}
                    >
                      {t('connect.form_submit')}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Right column */}
            <AnimatedSection direction="right" delay={0.1} className="space-y-6">
              {/* Memory */}
              <div className="rounded-3xl p-8 md:p-10" style={{ background: '#fff', boxShadow: '0 20px 60px -20px rgba(28,28,30,0.1)' }}>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#1C1C1E' }}>{t('connect.memory_title')}</h2>
                <p className="text-sm mb-6" style={{ color: 'rgba(28,28,30,0.55)' }}>
                  Tell us a story about Dhanana. A childhood memory, a festival, a face you remember.
                </p>

                {memoryShared ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">💛</div>
                    <p className="font-semibold" style={{ color: '#1C1C1E' }}>Your memory has been saved.</p>
                    <button onClick={() => setMemoryShared(false)} className="mt-3 text-sm cursor-pointer" style={{ color: '#E8A838' }}>
                      Share another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleMemory} className="space-y-4">
                    <textarea
                      value={memory}
                      onChange={e => setMemory(e.target.value)}
                      rows={5}
                      placeholder={t('connect.memory_placeholder')}
                      className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-all duration-150"
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                    <button
                      type="submit"
                      disabled={!memory.trim()}
                      className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
                      style={{
                        background: memory.trim() ? 'rgba(232,168,56,0.12)' : 'rgba(28,28,30,0.05)',
                        color: memory.trim() ? '#C8881A' : 'rgba(28,28,30,0.35)',
                        border: `1px solid ${memory.trim() ? 'rgba(232,168,56,0.3)' : 'transparent'}`,
                      }}
                    >
                      Share memory
                    </button>
                  </form>
                )}
              </div>

              {/* Community links */}
              <div className="rounded-3xl p-8" style={{ background: '#1C1C1E' }}>
                <h3 className="font-semibold text-white mb-2">Join the Community</h3>
                <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Connect with other Dhanana families on social media.
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'WhatsApp Community', letter: 'W', color: '#25D366' },
                    { label: 'Facebook Group',     letter: 'f', color: '#1877F2' },
                  ].map(link => (
                    <div
                      key={link.label}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: link.color }}>
                        {link.letter}
                      </div>
                      {link.label}
                      <span className="ml-auto text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Coming soon</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Emotional closing */}
      <section className="py-24" style={{ background: '#FDF6EC' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="font-devanagari text-5xl mb-6" style={{ color: '#E8A838' }}>घर वापसी</div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#1C1C1E' }}>
              Coming home — even from a distance
            </h2>
            <p className="leading-relaxed" style={{ color: 'rgba(28,28,30,0.6)' }}>
              No matter where life has taken you — Delhi, Dubai, Canada, or California — Dhanana remains in your blood. This website is built for you. By you. For the generations that will come after.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
