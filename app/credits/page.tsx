"use client"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'

const techStack = [
  'Next.js 14',
  'Tailwind CSS',
  'Framer Motion',
  'Leaflet.js',
  'Vercel',
  'Claude Code',
  'Recharts',
]

export default function CreditsPage() {
  const { t } = useLanguage()

  return (
    <div style={{ background: '#2C3B1F', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <div className="font-devanagari leading-none" style={{ fontSize: 'clamp(120px, 30vw, 400px)', color: 'rgba(253,246,236,0.025)' }}>
            प्यार
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(232,168,56,0.6)' }}>
              Dhanana · dhanana.in
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-8" style={{ color: '#E8A838', letterSpacing: '-0.02em' }}>
              {t('credits.headline')}
            </h1>
            <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(253,246,236,0.65)' }}>
              This website was built to give Dhanana village a permanent home on the internet — preserving its history, connecting its diaspora, and celebrating its people for generations to come.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to bottom, transparent, #2C3B1F)' }} />
      </section>

      {/* Creator card */}
      <section className="py-8 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div
              className="rounded-3xl p-10 md:p-14 text-center"
              style={{ background: 'rgba(232,168,56,0.08)', border: '1px solid rgba(232,168,56,0.25)' }}
            >
              <div
                className="mx-auto mb-6 flex-shrink-0"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  border: '3px solid #E8A838',
                  boxShadow: '0 0 0 6px rgba(232,168,56,0.12), 0 16px 40px -8px rgba(232,168,56,0.3)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Image
                  src="/images/allen-ghanghas.jpg"
                  alt="Allen Ghanghas"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  sizes="120px"
                  priority
                />
              </div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(232,168,56,0.6)' }}>
                {t('credits.creator_label')}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#E8A838', letterSpacing: '-0.02em' }}>
                Allen Ghanghas
              </h2>
              <p className="text-base mb-10" style={{ color: 'rgba(253,246,236,0.55)' }}>
                {t('credits.creator_origin')}
              </p>
              <a
                href="https://allendior.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ background: '#E8A838', color: '#2C3B1F' }}
              >
                Visit allendior.com
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Dedicated to */}
      <section className="py-8 pb-20">
        <div className="max-w-2xl mx-auto px-4">
          <AnimatedSection>
            <div
              className="rounded-3xl p-10 md:p-12 text-center"
              style={{ background: 'rgba(253,246,236,0.03)', border: '1px solid rgba(253,246,236,0.07)' }}
            >
              <div className="text-4xl mb-8 select-none">🙏</div>
              <p className="text-lg font-light leading-relaxed mb-8" style={{ color: 'rgba(253,246,236,0.8)' }}>
                {t('credits.dedicated_to')}
              </p>
              <div className="mx-auto mb-8" style={{ height: 1, background: 'rgba(253,246,236,0.08)', maxWidth: 200 }} />
              <p className="text-base italic font-light" style={{ color: 'rgba(253,246,236,0.45)' }}>
                {t('credits.father_line')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contribute */}
      <section className="py-8 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'rgba(253,246,236,0.9)' }}>
              {t('credits.contribute_title')}
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(253,246,236,0.5)' }}>
              {t('credits.contribute_body')}
            </p>
            <a
              href="mailto:allendhanana@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-saffron hover:scale-105"
              style={{
                border: '1.5px solid #E8A838',
                color: '#E8A838',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(232,168,56,0.1)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              }}
            >
              allendhanana@gmail.com
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-8 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="mb-6" style={{ height: 1, background: 'rgba(253,246,236,0.06)' }} />
            <p className="text-xs font-semibold tracking-widest uppercase mb-8" style={{ color: 'rgba(253,246,236,0.3)' }}>
              {t('credits.tech_title')}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {techStack.map(tech => (
                <span
                  key={tech}
                  className="px-4 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(253,246,236,0.05)',
                    color: 'rgba(253,246,236,0.45)',
                    border: '1px solid rgba(253,246,236,0.07)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: 'rgba(232,168,56,0.6)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Dhanana
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
