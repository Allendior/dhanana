"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'

const highlightCards = [
  {
    href: '/history',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    titleKey: 'sections.history',
    descKey:  'sections.history_sub',
    color: '#E8A838',
    num: '01',
  },
  {
    href: '/demographics',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/>
      </svg>
    ),
    titleKey: 'sections.demographics',
    descKey:  'sections.demographics_sub',
    color: '#C4613A',
    num: '02',
  },
  {
    href: '/culture',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    titleKey: 'sections.culture',
    descKey:  'sections.culture_sub',
    color: '#4A6741',
    num: '03',
  },
  {
    href: '/culture#temples',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 10V6l7-3 7 3v4M9 21v-5a3 3 0 0 1 6 0v5"/>
      </svg>
    ),
    titleKey: 'culture.temples_title',
    descKey:  'culture.temples_note',
    color: '#E8A838',
    num: '04',
  },
  {
    href: '/governance',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M4 21V8l8-5 8 5v13M9 21v-4a3 3 0 0 1 6 0v4"/>
      </svg>
    ),
    titleKey: 'sections.governance',
    descKey:  'sections.governance_sub',
    color: '#C4613A',
    num: '05',
  },
  {
    href: '/connect',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    titleKey: 'sections.connect',
    descKey:  'sections.connect_sub',
    color: '#4A6741',
    num: '06',
  },
]

const statItems = [
  {
    value: '11,766',
    labelKey: 'stats.population',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    isText: false,
  },
  {
    valueKey: 'stats.founder_name',
    labelKey: 'stats.founded',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    isText: true,
  },
  {
    value: '3,492',
    labelKey: 'stats.area',
    unit: 'ha',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
        <line x1="8" y1="2" x2="8" y2="18"/>
        <line x1="16" y1="6" x2="16" y2="22"/>
      </svg>
    ),
    isText: false,
  },
  {
    value: '73%',
    labelKey: 'stats.literacy',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    isText: false,
  },
]

export default function Home() {
  const { t } = useLanguage()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-center" style={{ overflowX: 'hidden' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #1a2a0f 0%, #2C3B1F 40%, #1C2810 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,28,30,0.55) 0%, rgba(28,28,30,0.35) 50%, rgba(28,28,30,0.75) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(232,168,56,0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pt-24 pb-32 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-devanagari leading-none mb-4"
              style={{ fontSize: 'clamp(3.5rem, 18vw, 12rem)', color: '#E8A838', letterSpacing: '-0.02em' }}
            >
              {t('hero.village_name')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-lg sm:text-2xl md:text-3xl font-light mb-3"
              style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '0.04em' }}
            >
              {t('hero.tagline')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm md:text-lg font-light mb-6"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xs sm:text-sm tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.25em' }}
            >
              Bhiwani · Haryana · India
            </motion.p>
          </motion.div>
        </div>

        {/* ── Stats bar — village pride, not cold data ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 w-full"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(18,18,20,0.7)', backdropFilter: 'blur(16px)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {statItems.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center text-center py-4 px-4 md:px-6"
                  style={{
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <div className="mb-2 opacity-40" style={{ color: '#E8A838' }}>
                    {stat.icon}
                  </div>
                  {stat.isText ? (
                    <div className="font-semibold leading-tight mb-1" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)', color: '#E8A838' }}>
                      {t(stat.valueKey!)}
                    </div>
                  ) : (
                    <div className="font-bold leading-tight mb-1" style={{ fontSize: 'clamp(1.4rem, 5vw, 2.2rem)', color: '#E8A838' }}>
                      {stat.value}{stat.unit ? <span className="text-xs ml-0.5 opacity-70">{stat.unit}</span> : null}
                    </div>
                  )}
                  <div className="text-xs tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em' }}>
                    {t(stat.labelKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator — finite animation, not infinite */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, delay: 1.5, times: [0, 0.2, 0.8, 1] }}
        >
          <span className="text-[10px] tracking-widest uppercase" style={{ letterSpacing: '0.2em' }}>
            {t('hero.scroll')}
          </span>
          <motion.svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: 3, ease: 'easeInOut' }}
          >
            <path d="M8 2v12M4 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </motion.div>
      </section>

      {/* ── About teaser — cinematic quote ── */}
      <section className="py-24 md:py-36" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

            {/* Editorial blockquote */}
            <AnimatedSection direction="left">
              <blockquote className="relative">
                {/* Oversized decorative quote mark */}
                <div
                  className="absolute select-none pointer-events-none"
                  style={{
                    top: -20,
                    left: -8,
                    fontSize: 'clamp(100px, 18vw, 180px)',
                    lineHeight: 1,
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#E8A838',
                    opacity: 0.15,
                  }}
                >
                  &ldquo;
                </div>
                <div className="relative z-10 pt-8">
                  <p
                    className="font-light leading-relaxed"
                    style={{
                      fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
                      color: '#1C1C1E',
                      lineHeight: 1.75,
                      letterSpacing: '0.01em',
                    }}
                  >
                    A village is not just a place — it is a living memory, a shared heartbeat, a home that travels with you wherever you go.
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #E8A838, transparent)' }} />
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: 'rgba(28,28,30,0.4)' }}>
                      Dhanana · धनाना
                    </span>
                  </div>
                </div>
              </blockquote>
            </AnimatedSection>

            {/* Village identity card — poetic, not utilitarian */}
            <AnimatedSection direction="right" delay={0.15}>
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #2C3B1F 0%, #1a2a0f 100%)', minHeight: 280 }}
              >
                {/* Background Devanagari watermark */}
                <div
                  className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
                  style={{ opacity: 0.04 }}
                >
                  <span className="font-devanagari" style={{ fontSize: 260, color: '#E8A838', lineHeight: 1 }}>
                    ध
                  </span>
                </div>

                <div className="relative z-10 p-8 md:p-10 flex flex-col gap-6">
                  {/* Village name */}
                  <div>
                    <div className="font-devanagari text-5xl leading-none mb-1" style={{ color: '#E8A838' }}>
                      {t('hero.village_name')}
                    </div>
                    <div className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: 'rgba(253,246,236,0.45)' }}>
                      Dhanana Village · Est. Ancient
                    </div>
                  </div>

                  <div className="h-px" style={{ background: 'rgba(232,168,56,0.2)' }} />

                  {/* Key facts */}
                  <div className="space-y-3">
                    {[
                      { label: 'Location', value: '3 km east of Bhiwani' },
                      { label: 'Founded by', value: 'Dhanna Jaat' },
                      { label: 'Population', value: '11,766 people' },
                    ].map(item => (
                      <div key={item.label} className="flex items-baseline justify-between gap-3">
                        <span className="text-xs tracking-widest uppercase flex-shrink-0" style={{ color: 'rgba(253,246,236,0.35)' }}>
                          {item.label}
                        </span>
                        <div className="h-px flex-1" style={{ background: 'rgba(253,246,236,0.08)' }} />
                        <span className="text-sm font-medium flex-shrink-0" style={{ color: 'rgba(253,246,236,0.85)' }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/location"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase cursor-pointer transition-opacity duration-200 hover:opacity-70 group w-fit"
                    style={{ color: '#E8A838' }}
                  >
                    View on Map
                    <svg
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      width="12" height="12" viewBox="0 0 14 14" fill="none"
                    >
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-8"><div className="divider-wheat" /></div>

      {/* ── Discover Dhanana — editorial journey cards ── */}
      <section className="py-20 md:py-28" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(28,28,30,0.35)' }}>Explore the village</p>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: '#1C1C1E', letterSpacing: '-0.02em' }}>Discover Dhanana</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlightCards.map((card, i) => (
              <AnimatedSection key={card.href} delay={i * 0.06}>
                <Link href={card.href} className="block h-full cursor-pointer group">
                  <div
                    className="relative h-full rounded-2xl p-7 flex flex-col overflow-hidden border transition-all duration-300"
                    style={{
                      background: '#fff',
                      borderColor: 'rgba(28,28,30,0.07)',
                      boxShadow: '0 2px 8px rgba(28,28,30,0.04)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px -8px ${card.color}22, 0 4px 16px rgba(28,28,30,0.06)`
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = `${card.color}30`
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(28,28,30,0.04)'
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(28,28,30,0.07)'
                    }}
                  >
                    {/* Chapter number watermark */}
                    <div
                      className="absolute top-4 right-5 font-bold select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.07]"
                      style={{ fontSize: 88, lineHeight: 1, color: card.color, opacity: 0.05 }}
                    >
                      {card.num}
                    </div>

                    {/* Top accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 rounded-t-2xl transition-all duration-300"
                      style={{
                        height: 3,
                        background: `linear-gradient(90deg, ${card.color}, ${card.color}55)`,
                        opacity: 0,
                      }}
                      ref={el => {
                        if (!el) return
                        const parent = el.parentElement
                        if (!parent) return
                        parent.addEventListener('mouseenter', () => { el.style.opacity = '1' })
                        parent.addEventListener('mouseleave', () => { el.style.opacity = '0' })
                      }}
                    />

                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: `${card.color}12`, color: card.color }}
                    >
                      {card.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className="font-semibold text-xl mb-2.5 leading-tight"
                        style={{ color: '#1C1C1E', letterSpacing: '-0.015em' }}
                      >
                        {t(card.titleKey)}
                      </h3>
                      <p className="text-sm" style={{ color: 'rgba(28,28,30,0.55)', lineHeight: 1.7 }}>
                        {t(card.descKey)}
                      </p>
                    </div>

                    {/* Explore link */}
                    <div className="flex items-center gap-1.5 mt-6 text-sm font-semibold" style={{ color: card.color }}>
                      Explore
                      <svg
                        className="transition-transform duration-200 group-hover:translate-x-1.5"
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                      >
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
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
              Whether you live in the village today, or your roots trace back to these fields from across the world — you belong here. Share your story, your memories, your pride.
            </p>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:scale-105 group"
              style={{ background: '#E8A838', color: '#fff' }}
            >
              {t('sections.connect')}
              <svg
                className="transition-transform duration-200 group-hover:translate-x-1"
                width="16" height="16" viewBox="0 0 16 16" fill="none"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
