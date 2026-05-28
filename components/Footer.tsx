"use client"
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const navLinks = [
  { href: '/history',      key: 'nav.history' },
  { href: '/demographics', key: 'nav.demographics' },
  { href: '/location',     key: 'nav.location' },
  { href: '/governance',   key: 'nav.governance' },
  { href: '/culture',      key: 'nav.culture' },
  { href: '/gallery',      key: 'nav.gallery' },
  { href: '/connect',      key: 'nav.connect' },
]

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer style={{ background: '#C4613A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-devanagari text-5xl leading-none" style={{ color: '#E8A838' }}>
              धाणा
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(253,246,236,0.75)' }}>
              Dhanana village, Bhiwani, Haryana, India
            </p>
            <div className="space-y-1">
              <p className="text-xs" style={{ color: 'rgba(253,246,236,0.6)' }}>28.9353°N, 76.1635°E</p>
              <p className="text-xs" style={{ color: 'rgba(253,246,236,0.6)' }}>Census Code: 061137</p>
              <p className="text-xs" style={{ color: 'rgba(253,246,236,0.6)' }}>PIN 127031 · Bhiwani District</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-widest uppercase" style={{ color: 'rgba(253,246,236,0.5)' }}>
              Explore
            </h3>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-150 hover:text-saffron cursor-pointer"
                  style={{ color: 'rgba(253,246,236,0.8)' }}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-widest uppercase" style={{ color: 'rgba(253,246,236,0.5)' }}>
              About
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(253,246,236,0.75)' }}>
              This website is a community effort to preserve and celebrate the history, culture, and people of Dhanana village.
            </p>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150 cursor-pointer"
              style={{ color: '#E8A838' }}
            >
              Contribute your story
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(253,246,236,0.15)' }}>
          <p className="text-sm" style={{ color: 'rgba(253,246,236,0.6)' }}>
            {t('footer.tagline')}
          </p>
          <p className="text-xs" style={{ color: 'rgba(253,246,236,0.4)' }}>
            © {new Date().getFullYear()} Dhanana Village
          </p>
        </div>
      </div>
    </footer>
  )
}
