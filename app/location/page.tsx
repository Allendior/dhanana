"use client"
import dynamic from 'next/dynamic'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'

const DhananaMap = dynamic(() => import('@/components/DhananaMap'), { ssr: false })

const locationDetails = [
  { labelKey: 'location.details.pin',       value: '127031' },
  { labelKey: 'location.details.std',       value: '01749' },
  { labelKey: 'location.details.elevation', value: '216m' },
  { labelKey: 'location.details.area',      value: '3,492 ha / 34.92 km²' },
  { labelKey: 'location.details.district',  value: 'Bhiwani' },
  { labelKey: 'location.details.division',  value: 'Hisar' },
  { labelKey: 'location.details.state',     value: 'Haryana' },
]

const howToReach = [
  { icon: '🛣️', labelKey: 'location.reach.bhiwani',    step: 1, type: 'Road' },
  { icon: '🛣️', labelKey: 'location.reach.road',       step: 2, type: 'Road' },
  { icon: '🚂', labelKey: 'location.reach.railway1',   step: 3, type: 'Rail' },
  { icon: '🚂', labelKey: 'location.reach.railway2',   step: 4, type: 'Rail' },
  { icon: '🚂', labelKey: 'location.reach.railway3',   step: 5, type: 'Rail' },
  { icon: '✈️', labelKey: 'location.reach.airport',    step: 6, type: 'Air' },
  { icon: '🏛️', labelKey: 'location.reach.chandigarh', step: 7, type: 'Road' },
]

const typeColors: Record<string, string> = { Road: '#4A6741', Rail: '#C4613A', Air: '#E8A838' }

export default function LocationPage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative" style={{ background: 'linear-gradient(135deg, #4A6741 0%, #2E4428 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(232,168,56,0.7)' }}>
              28.9353°N · 76.1635°E
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('location.title')}</h1>
            <p className="text-lg font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>{t('location.subtitle')}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to bottom, transparent, #FDF6EC)' }} />
      </section>

      {/* Full-width map */}
      <section className="py-12" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden" style={{ height: 520, boxShadow: '0 20px 60px -20px rgba(28,28,30,0.2)' }}>
              <DhananaMap />
            </div>
            <p className="text-xs text-center mt-3" style={{ color: 'rgba(28,28,30,0.4)' }}>
              © OpenStreetMap contributors · © CARTO · Scroll or pinch to zoom
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Location details grid */}
      <section className="py-20" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl font-bold" style={{ color: '#1C1C1E' }}>Location Details</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {locationDetails.map((item, i) => (
              <AnimatedSection key={item.labelKey} delay={i * 0.05}>
                <div
                  className="rounded-2xl p-5 h-full"
                  style={{ background: '#FDF6EC', border: '1px solid rgba(232,168,56,0.15)' }}
                >
                  <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(28,28,30,0.45)' }}>
                    {t(item.labelKey)}
                  </div>
                  <div className="font-bold text-lg" style={{ color: '#1C1C1E' }}>{item.value}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How to reach */}
      <section className="py-20" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1C1C1E' }}>{t('location.reach.heading')}</h2>
            <div className="divider-wheat max-w-xs mt-3" />
          </AnimatedSection>

          <div className="relative">
            {/* Horizontal connector (desktop) */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #E8A838 10%, #C4613A 90%, transparent)' }} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {howToReach.map((step, i) => (
                <AnimatedSection key={i} delay={i * 0.07}>
                  <div
                    className="relative rounded-2xl p-6 h-full card-lift"
                    style={{ background: '#fff', border: '1px solid rgba(232,168,56,0.15)' }}
                  >
                    {/* Step number */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-4"
                      style={{ background: typeColors[step.type] }}
                    >
                      {step.step}
                    </div>
                    <div
                      className="text-xs font-semibold tracking-wider uppercase mb-2 px-2 py-0.5 rounded-full inline-block"
                      style={{ background: `${typeColors[step.type]}18`, color: typeColors[step.type] }}
                    >
                      {step.type}
                    </div>
                    <p className="text-sm leading-relaxed mt-2" style={{ color: 'rgba(28,28,30,0.75)' }}>
                      {t(step.labelKey)}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
