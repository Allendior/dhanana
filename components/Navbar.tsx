"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage, type Language } from '@/contexts/LanguageContext'

const navLinks = [
  { href: '/history',      key: 'nav.history' },
  { href: '/demographics', key: 'nav.demographics' },
  { href: '/location',     key: 'nav.location' },
  { href: '/governance',   key: 'nav.governance' },
  { href: '/culture',      key: 'nav.culture' },
  { href: '/gallery',      key: 'nav.gallery' },
  { href: '/connect',      key: 'nav.connect' },
]

const langLabels: Record<Language, string> = { en: 'EN', hi: 'हिं', hy: 'ह' }

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isHome = pathname === '/'
  const solid = scrolled || !isHome

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: solid ? 'rgba(253,246,236,0.92)' : 'transparent',
          backdropFilter: solid ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: solid ? '1px solid rgba(232,168,56,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
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

            {/* Desktop nav */}
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
              {/* Language toggle */}
              <div
                className="flex items-center gap-0.5 rounded-full p-0.5"
                style={{ background: solid ? 'rgba(28,28,30,0.08)' : 'rgba(255,255,255,0.2)' }}
              >
                {(['en', 'hi', 'hy'] as Language[]).map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer"
                    style={{
                      background: lang === l ? '#E8A838' : 'transparent',
                      color: lang === l
                        ? '#fff'
                        : solid ? 'rgba(28,28,30,0.65)' : 'rgba(255,255,255,0.8)',
                    }}
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 rounded-lg cursor-pointer"
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
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden"
            style={{
              background: 'rgba(253,246,236,0.97)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(232,168,56,0.15)',
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer"
                  style={{
                    background: pathname === link.href ? 'rgba(232,168,56,0.1)' : 'transparent',
                    color: pathname === link.href ? '#E8A838' : 'rgba(28,28,30,0.8)',
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
