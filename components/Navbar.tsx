"use client"
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage, type Language } from '@/contexts/LanguageContext'

const navLinks = [
  { href: '/history',      key: 'nav.history' },
  { href: '/migrations',   key: 'migrations.nav' },
  { href: '/demographics', key: 'nav.demographics' },
  { href: '/location',     key: 'nav.location' },
  { href: '/governance',   key: 'nav.governance' },
  { href: '/culture',      key: 'nav.culture' },
  { href: '/gallery',      key: 'nav.gallery' },
  { href: '/memories',     key: 'memories.nav' },
  { href: '/connect',      key: 'nav.connect' },
  { href: '/credits',      key: 'credits.nav' },
]

const LANG_OPTIONS = [
  { code: 'en' as Language, emoji: '🌾', name: 'English',    tagline: 'The global tongue' },
  { code: 'hi' as Language, emoji: '🪔', name: 'हिन्दी',     tagline: 'Hindi · राष्ट्रभाषा' },
  { code: 'hy' as Language, emoji: '👳', name: 'हरियाणवी',   tagline: 'Haryanvi · घर की बोली' },
]

function PhulkariStrip() {
  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden flex items-center justify-center"
      style={{ height: '12px', flexShrink: 0 }}
    >
      <div className="flex items-center gap-px w-full justify-center" style={{ fontSize: '7px', lineHeight: 1, letterSpacing: '1px' }}>
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} style={{ color: i % 4 < 2 ? '#E8A838' : '#C4613A' }}>
            {i % 2 === 0 ? '◆' : '◇'}
          </span>
        ))}
      </div>
    </div>
  )
}

interface LangDropdownProps {
  solid: boolean
}

function LanguageDropdown({ solid }: LangDropdownProps) {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const current = optionRefs.current.findIndex(r => r === document.activeElement)
        const next = e.key === 'ArrowDown'
          ? Math.min(current + 1, LANG_OPTIONS.length - 1)
          : Math.max(current - 1, 0)
        optionRefs.current[next]?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const current = LANG_OPTIONS.find(o => o.code === lang) ?? LANG_OPTIONS[0]

  const panelBg     = isDark ? '#2C3B1F'  : '#FDF6EC'
  const panelBorder = isDark ? '#E8A838'  : '#C4613A'
  const rowHoverBg  = isDark ? '#3A4F2A'  : '#F5ECD8'
  const textColor   = isDark ? '#FDF6EC'  : '#1C1C1E'

  const panelStyle = isMobile
    ? {
        position: 'fixed' as const,
        left: 0,
        right: 0,
        top: 64,
        width: '100vw',
        borderRadius: '0 0 1rem 1rem',
        background: panelBg,
        border: `1.5px solid ${panelBorder}`,
        borderTop: 'none',
        zIndex: 60,
        boxShadow: '0 8px 32px -8px rgba(28,28,30,0.2)',
      }
    : {
        position: 'absolute' as const,
        right: 0,
        top: '100%',
        marginTop: 8,
        minWidth: '220px',
        borderRadius: '0.75rem',
        background: panelBg,
        border: `1.5px solid ${panelBorder}`,
        zIndex: 60,
        boxShadow: '0 20px 40px -8px rgba(28,28,30,0.2)',
      }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 select-none"
        style={{
          border: '1.5px solid #E8A838',
          color: '#FDF6EC',
          background: '#000000',
          boxShadow: open ? '0 0 0 3px rgba(232,168,56,0.18)' : 'none',
          minHeight: 44,
        }}
      >
        <span className="leading-none">{current.emoji}</span>
        <span>{current.name}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="leading-none"
          style={{ fontSize: '9px', opacity: 0.65 }}
        >
          ▾
        </motion.span>
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: isMobile ? 1 : 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{   opacity: 0, scale: isMobile ? 1 : 0.95, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            aria-label="Select language"
            className="overflow-hidden"
            style={panelStyle}
          >
            <PhulkariStrip />

            <div className="py-1.5">
              {LANG_OPTIONS.map((option, i) => {
                const isActive = lang === option.code
                return (
                  <button
                    key={option.code}
                    ref={el => { optionRefs.current[i] = el }}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => { setLang(option.code); setOpen(false) }}
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = rowHoverBg
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                    }}
                    className="w-full flex items-center gap-3 px-5 text-left cursor-pointer transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                    style={{
                      minHeight: 56,
                      paddingTop: 14,
                      paddingBottom: 14,
                      background: isActive
                        ? (isDark ? 'rgba(232,168,56,0.12)' : 'rgba(196,97,58,0.07)')
                        : 'transparent',
                      borderLeft: `3px solid ${isActive ? '#E8A838' : 'transparent'}`,
                    }}
                  >
                    <span className="text-xl leading-none flex-shrink-0">{option.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm font-semibold leading-tight"
                        style={{ color: isActive ? '#E8A838' : textColor }}
                      >
                        {option.name}
                      </div>
                      <div
                        className="text-xs mt-0.5 leading-tight"
                        style={{ color: textColor, opacity: 0.5 }}
                      >
                        {option.tagline}
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-sm font-bold flex-shrink-0" style={{ color: '#E8A838' }}>
                        ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isHome = pathname === '/'
  const solid  = scrolled || !isHome

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:     solid ? 'rgba(253,246,236,0.92)' : 'transparent',
          backdropFilter: solid ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom:   solid ? '1px solid rgba(232,168,56,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 min-h-[44px]">
              <span className="text-3xl leading-none font-devanagari" style={{ color: '#E8A838' }}>
                {t('hero.village_name')}
              </span>
              <span
                className="hidden sm:block text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-200"
                style={{ color: solid ? 'rgba(28,28,30,0.5)' : 'rgba(255,255,255,0.7)' }}
              >
                Dhanana
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer"
                  style={{
                    color: pathname === link.href
                      ? '#E8A838'
                      : solid ? 'rgba(28,28,30,0.75)' : 'rgba(255,255,255,0.88)',
                  }}
                >
                  {t(link.key)}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'rgba(232,168,56,0.12)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Cultural language dropdown */}
              <LanguageDropdown solid={solid} />

              {/* Mobile menu button */}
              <button
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg cursor-pointer"
                onClick={() => setMobileOpen(v => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                style={{ color: solid ? '#1C1C1E' : '#fff' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  {mobileOpen ? (
                    <path d="M4 4L16 16M4 16L16 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  ) : (
                    <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden"
            style={{
              background:     'rgba(253,246,236,0.97)',
              backdropFilter: 'blur(16px)',
              borderBottom:   '1px solid rgba(232,168,56,0.15)',
            }}
          >
            <div className="px-4 py-3 flex flex-col">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center px-4 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer"
                  style={{
                    minHeight: 52,
                    background: pathname === link.href ? 'rgba(232,168,56,0.1)' : 'transparent',
                    color:      pathname === link.href ? '#E8A838' : 'rgba(28,28,30,0.8)',
                  }}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
