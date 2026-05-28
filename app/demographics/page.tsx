"use client"
import dynamic from 'next/dynamic'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'
import { StatCounter } from '@/components/StatCounter'

const GenderDonut   = dynamic(() => import('@/components/DemographicsCharts').then(m => m.GenderDonut),   { ssr: false })
const LiteracyBar   = dynamic(() => import('@/components/DemographicsCharts').then(m => m.LiteracyBar),   { ssr: false })
const CompositionBar= dynamic(() => import('@/components/DemographicsCharts').then(m => m.CompositionBar),{ ssr: false })
const AgeDonut      = dynamic(() => import('@/components/DemographicsCharts').then(m => m.AgeDonut),      { ssr: false })

export default function DemographicsPage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative" style={{ background: 'linear-gradient(135deg, #C4613A 0%, #1C1C1E 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(232,168,56,0.7)' }}>Census 2011</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('demographics.title')}</h1>
            <p className="text-lg font-light max-w-xl" style={{ color: 'rgba(255,255,255,0.65)' }}>{t('demographics.subtitle')}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to bottom, transparent, #FDF6EC)' }} />
      </section>

      {/* Big stat counters */}
      <section className="py-20" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            <AnimatedSection><StatCounter end={11766} label={t('demographics.population')} /></AnimatedSection>
            <AnimatedSection delay={0.08}><StatCounter end={2349} label={t('demographics.households')} /></AnimatedSection>
            <AnimatedSection delay={0.16}><StatCounter end={6325} label={t('demographics.males')} /></AnimatedSection>
            <AnimatedSection delay={0.24}><StatCounter end={5441} label={t('demographics.females')} /></AnimatedSection>
            <AnimatedSection delay={0.32} className="col-span-2 md:col-span-1"><StatCounter end={1434} label={t('demographics.children')} /></AnimatedSection>
          </div>
        </div>
      </section>

      {/* Charts grid */}
      <section className="py-20" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#1C1C1E' }}>By the Numbers</h2>
            <p style={{ color: 'rgba(28,28,30,0.55)' }}>Census 2011 · Dhanana village, Bhiwani</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: t('demographics.charts.gender'), component: <GenderDonut /> },
              { title: t('demographics.charts.literacy'), component: <LiteracyBar /> },
              { title: t('demographics.charts.composition'), component: <CompositionBar /> },
              { title: t('demographics.charts.age'), component: <AgeDonut /> },
            ].map(({ title, component }) => (
              <AnimatedSection key={title}>
                <div className="rounded-2xl p-7" style={{ background: '#FDF6EC', border: '1px solid rgba(232,168,56,0.15)' }}>
                  <h3 className="font-semibold text-lg mb-6" style={{ color: '#1C1C1E' }}>{title}</h3>
                  {component}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Literacy detail */}
      <section className="py-20" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: t('demographics.overallLiteracy'), value: '73.37%', color: '#4A6741' },
              { label: t('demographics.maleLiteracy'),    value: '85.07%', color: '#E8A838' },
              { label: t('demographics.femaleLiteracy'),  value: '59.80%', color: '#C4613A' },
            ].map(({ label, value, color }) => (
              <AnimatedSection key={label}>
                <div className="rounded-2xl p-8 text-center card-lift" style={{ background: '#fff', border: '1px solid rgba(232,168,56,0.15)' }}>
                  <div className="text-5xl font-bold mb-3" style={{ color }}>{value}</div>
                  <div className="text-sm font-medium tracking-wide uppercase" style={{ color: 'rgba(28,28,30,0.55)' }}>{label}</div>
                  <div className="mt-4 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(28,28,30,0.08)' }}>
                    <div className="h-full rounded-full" style={{ width: value, background: color, transition: 'width 1.5s ease' }} />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sex ratio — honest framing */}
      <section className="py-20" style={{ background: '#1C1C1E' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sex ratio */}
              <div className="rounded-2xl p-8" style={{ background: 'rgba(232,168,56,0.1)', border: '1px solid rgba(232,168,56,0.2)' }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(232,168,56,0.7)' }}>
                  {t('demographics.sexRatio')}
                </div>
                <div className="text-5xl font-bold text-white mb-2">860</div>
                <div className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>{t('demographics.sexRatioValue')}</div>
                <div
                  className="rounded-xl p-4 text-sm leading-relaxed"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)' }}
                >
                  {t('demographics.sexRatioContext')}
                </div>
              </div>
              {/* Child sex ratio */}
              <div className="rounded-2xl p-8" style={{ background: 'rgba(196,97,58,0.1)', border: '1px solid rgba(196,97,58,0.2)' }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(196,97,58,0.7)' }}>
                  {t('demographics.childSexRatio')}
                </div>
                <div className="text-5xl font-bold text-white mb-2">853</div>
                <div className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>{t('demographics.childSexRatioValue')}</div>
                <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
                  This figure represents a shared social challenge across Haryana that communities are actively working to address through education and awareness.
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
