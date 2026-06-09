"use client"
import dynamic from 'next/dynamic'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'

const MigrationsMap = dynamic(() => import('@/components/MigrationsMap'), { ssr: false })

export default function MigrationsPage() {
  const { t } = useLanguage()

  const legend = [
    {
      key: 'migrations.legend_route',
      swatch: <span className="inline-block w-6 rounded-full" style={{ height: 2.5, background: '#E8A838', boxShadow: '0 0 6px rgba(232,168,56,0.6)' }} />,
    },
    {
      key: 'migrations.legend_site',
      swatch: <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#E8A838', boxShadow: '0 0 0 3px rgba(232,168,56,0.25)' }} />,
    },
    {
      key: 'migrations.legend_dot',
      swatch: <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: '#F5C96A', boxShadow: '0 0 8px 2px rgba(232,168,56,0.7)' }} />,
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-14 relative" style={{ background: 'linear-gradient(160deg, #14120C 0%, #1C1C1E 55%, #0B0E0C 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(232,168,56,0.7)' }}>
              52.49°N 60.19°E → 28.93°N 76.16°E
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('migrations.title')}</h1>
            <p className="text-lg md:text-xl font-light max-w-2xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {t('migrations.subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Map console */}
      <section className="pb-12" style={{ background: '#0B0E0C' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <MigrationsMap />
          </AnimatedSection>

          {/* Legend */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-6">
              {legend.map(item => (
                <div key={item.key} className="flex items-center gap-2.5">
                  {item.swatch}
                  <span className="text-xs tracking-wider uppercase" style={{ color: 'rgba(245,232,208,0.5)', letterSpacing: '0.12em' }}>
                    {t(item.key)}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Scholarship disclaimer */}
      <section className="py-12" style={{ background: '#0B0E0C', borderTop: '1px solid rgba(232,168,56,0.15)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(245,232,208,0.45)', lineHeight: 1.8, fontStyle: 'italic' }}>
              {t('migrations.disclaimer')}
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
