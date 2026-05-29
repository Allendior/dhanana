"use client"
import dynamic from 'next/dynamic'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'

const DhananaMap = dynamic(() => import('@/components/DhananaMap'), { ssr: false })

export default function LocationPage() {
  const { t } = useLanguage()

  const locationDetails = [
    { label: t('location.coordinates'), value: '28.9353°N, 76.1635°E' },
    { label: t('location.pin'),         value: '127031' },
    { label: t('location.std'),         value: '01749' },
    { label: t('location.elevation'),   value: t('location.elevation_value') },
    { label: t('location.area'),        value: '3,492 ha / 34.92 km²' },
    { label: t('location.district'),    value: 'Bhiwani' },
    { label: t('location.division'),    value: 'Hisar' },
    { label: t('location.state'),       value: 'Haryana' },
  ]

  const howToReach = [
    { step: 1, type: 'Road', label: t('location.from_bhiwani'),    color: '#4A6741' },
    { step: 2, type: 'Road', label: t('location.from_jind_road'),  color: '#4A6741' },
    { step: 3, type: 'Rail', label: 'Bhiwani City Station — 3.7 km', color: '#C4613A' },
    { step: 4, type: 'Rail', label: 'Bhiwani Junction — 4.0 km',     color: '#C4613A' },
    { step: 5, type: 'Rail', label: 'Dhana Ladanpur — 6.6 km',       color: '#C4613A' },
    { step: 6, type: 'Air',  label: t('location.airport_value'),     color: '#E8A838' },
    { step: 7, type: 'Road', label: t('location.from_chandigarh'),   color: '#4A6741' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative" style={{ background: 'linear-gradient(135deg, #4A6741 0%, #2E4428 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(232,168,56,0.7)' }}>
              28.9353°N · 76.1635°E
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('sections.location')}</h1>
            <p className="text-lg font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>{t('sections.location_sub')}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to bottom, transparent, #FDF6EC)' }} />
      </section>

      {/* Map */}
      <section className="py-12" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden h-[300px] md:h-[520px]" style={{ boxShadow: '0 20px 60px -20px rgba(28,28,30,0.2)' }}>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {locationDetails.map((item, i) => (
              <AnimatedSection key={item.label} delay={i * 0.05}>
                <div className="rounded-2xl p-5 h-full" style={{ background: '#FDF6EC', border: '1px solid rgba(232,168,56,0.15)' }}>
                  <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(28,28,30,0.45)' }}>{item.label}</div>
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
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1C1C1E' }}>{t('location.how_to_reach')}</h2>
            <div className="divider-wheat max-w-xs mt-3" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {howToReach.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className="relative rounded-2xl p-6 h-full card-lift" style={{ background: '#fff', border: '1px solid rgba(232,168,56,0.15)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-4" style={{ background: step.color }}>
                    {step.step}
                  </div>
                  <div
                    className="text-xs font-semibold tracking-wider uppercase mb-2 px-2 py-0.5 rounded-full inline-block"
                    style={{ background: `${step.color}18`, color: step.color }}
                  >
                    {step.type}
                  </div>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: 'rgba(28,28,30,0.75)' }}>{step.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
