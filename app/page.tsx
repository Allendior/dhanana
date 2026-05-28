"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'

const highlightCards = [
  {
    href: '/history',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    titleKey: 'sections.history',
    descKey:  'sections.history_sub',
    color: '#E8A838',
  },
  {
    href: '/demographics',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/>
      </svg>
    ),
    titleKey: 'sections.demographics',
    descKey:  'sections.demographics_sub',
    color: '#C4613A',
  },
  {
    href: '/culture',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    titleKey: 'sections.culture',
    descKey:  'sections.culture_sub',
    color: '#4A6741',
  },
  {
    href: '/culture#temples',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 10V6l7-3 7 3v4M9 21v-5a3 3 0 0 1 6 0v5"/>
      </svg>
    ),
    titleKey: 'culture.temples_title',
    descKey:  'culture.temples_note',
    color: '#E8A838',
  },
  {
    href: '/governance',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M4 21V8l8-5 8 5v13M9 21v-4a3 3 0 0 1 6 0v4"/>
      </svg>
    ),
    titleKey: 'sections.governance',
    descKey:  'sections.governance_sub',
    color: '#C4613A',
  },
  {
    href: '/connect',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    titleKey: 'sections.connect',
    descKey:  'sections.connect_sub',
    color: '#4A6741',
  },
]

export default function Home() {
  const { t } = useLanguage()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #1a2a0f 0%, #2C3B1F 40%, #1C2810 100%)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,28,30,0.55) 0%, rgba(28,28,30,0.35) 50%, rgba(28,28,30,0.75) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(232,168,56,0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            {/* Cinematic village name */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-devanagari leading-none mb-4"
              style={{
                fontSize: 'clamp(96px, 18vw, 200px)',
                color: '#E8A838',
                textShadow: '0 4px 60px rgba(232,168,56,0.25)',
                letterSpacing: '-0.02em',
              }}
            >
              {t('hero.village_name')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-xl sm:text-2xl md:text-3xl font-light mb-3"
              style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '0.04em' }}
            >
              {t('hero.tagline')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-lg font-light mb-6"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-sm tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.25em' }}
            >
              Bhiwani · Haryana · India
            </motion.p>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 w-full"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(28,28,30,0.6)', backdropFilter: 'blur(12px)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/10">
              <div className="text-center md:px-8">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#E8A838' }}>11,766</div>
                <div className="text-xs mt-1 tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>{t('stats.population')}</div>
              </div>
              <div className="text-center md:px-8">
                <div className="text-sm font-semibold" style={{ color: '#E8A838' }}>{t('stats.founder_name')}</div>
                <div className="text-xs mt-1 tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>{t('stats.founded')}</div>
              </div>
              <div className="text-center md:px-8">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#E8A838' }}>3,492</div>
                <div className="text-xs mt-1 tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>{t('stats.area')} (ha)</div>
              </div>
              <div className="text-center md:px-8">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#E8A838' }}>73%</div>
                <div className="text-xs mt-1 tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>{t('stats.literacy')}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="animate-bounce-slow flex flex-col items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <span className="text-[10px] tracking-widest uppercase" style={{ letterSpacing: '0.2em' }}>
              {t('hero.scroll')}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M4 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section className="py-20 md:py-32" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <AnimatedSection direction="left">
              <blockquote>
                <div style={{ color: '#E8A838', fontSize: 80, lineHeight: 0.7, fontFamily: 'Georgia, serif', marginBottom: 16 }}>&ldquo;</div>
                <p className="text-xl md:text-2xl font-light leading-relaxed" style={{ color: '#1C1C1E' }}>
                  A village is not just a place — it is a living memory, a shared heartbeat, a home that travels with you wherever you go.
                </p>
              </blockquote>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div
                className="rounded-2xl p-8 flex flex-col items-center justify-center gap-6"
                style={{ background: 'rgba(232,168,56,0.08)', border: '1px solid rgba(232,168,56,0.2)', minHeight: 240 }}
              >
                <div className="text-center space-y-3">
                  <div className="font-devanagari text-4xl" style={{ color: '#E8A838' }}>{t('hero.village_name')}</div>
                  <div className="text-sm font-medium" style={{ color: '#4A6741' }}>Dhanana Village</div>
                </div>
                <div className="divider-wheat w-full" />
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'rgba(28,28,30,0.7)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    3 km east of Bhiwani, Haryana
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(28,28,30,0.45)' }}>{t('location.elevation_value')} · {t('location.area_value') ?? '34.92 km²'}</div>
                </div>
                <Link
                  href="/location"
                  className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full cursor-pointer transition-all duration-200"
                  style={{ background: '#E8A838', color: '#fff', letterSpacing: '0.1em' }}
                >
                  View on Map
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-8"><div className="divider-wheat" /></div>

      {/* ── Highlight cards ── */}
      <section className="py-20 md:py-28" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3" style={{ color: '#1C1C1E' }}>Discover Dhanana</h2>
            <p className="text-base" style={{ color: 'rgba(28,28,30,0.55)' }}>Every section is a window into our village</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlightCards.map((card, i) => (
              <AnimatedSection key={card.href} delay={i * 0.07}>
                <Link href={card.href} className="block h-full cursor-pointer">
                  <div
                    className="card-lift h-full rounded-2xl p-7 flex flex-col gap-4 border"
                    style={{ background: '#fff', borderColor: 'rgba(232,168,56,0.15)' }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${card.color}18`, color: card.color }}>
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1.5" style={{ color: '#1C1C1E' }}>{t(card.titleKey)}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(28,28,30,0.6)' }}>{t(card.descKey)}</p>
                    </div>
                    <div className="mt-auto flex items-center gap-1.5 text-sm font-medium" style={{ color: card.color }}>
                      Explore
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Diaspora CTA ── */}
      <section className="py-20 md:py-28" style={{ background: '#1C1C1E' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <div className="font-devanagari text-6xl mb-6" style={{ color: '#E8A838' }}>{t('hero.village_name')}</div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">{t('connect.from_dhanana')}</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Whether you live in the village today, or your roots trace back to these fields from across the world — you belong here. Share your story, your memories, your pride.
            </p>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:scale-105"
              style={{ background: '#E8A838', color: '#fff' }}
            >
              {t('sections.connect')}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
