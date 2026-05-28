"use client"
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'

const timeline = [
  { key: 'founding',   year: 'Ancient',  color: '#E8A838' },
  { key: 'ghanghas',   year: 'Early Era', color: '#C4613A' },
  { key: 'agriculture',year: 'Medieval',  color: '#4A6741' },
  { key: 'expansion',  year: '18th–19th c.', color: '#C4613A' },
  { key: 'modern',     year: '20th–21st c.', color: '#E8A838' },
]

const neighbors = [
  'Talu', 'Jatai', 'Sukhpura', 'Bhaini Bharro', 'Badesara',
  'Mitathal', 'Ghuskani', 'Tigdana', 'Mandhana', 'Pur', 'Siwara',
]

const satellites = [
  { name: 'Jatai', note: 'Formed when farmers settled distant fields' },
  { name: 'Sukhpura', note: 'Agricultural satellite settlement' },
  { name: 'Kuchpad', note: 'Named for the founders of the settlement' },
]

export default function HistoryPage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative" style={{ background: 'linear-gradient(135deg, #2E4428 0%, #1C1C1E 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(232,168,56,0.7)' }}>
              Dhanana Village
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {t('history.title')}
            </h1>
            <p className="text-lg md:text-xl font-light max-w-2xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {t('history.subtitle')}
            </p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to bottom, transparent, #FDF6EC)' }} />
      </section>

      {/* Origin story — parchment card */}
      <section className="py-20" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div
              className="relative rounded-3xl p-8 md:p-14 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #F5E8D0 0%, #EDD9B0 100%)',
                border: '1px solid rgba(196,97,58,0.25)',
                boxShadow: '0 20px 60px -20px rgba(196,97,58,0.2)',
              }}
            >
              {/* Decorative calligraphy mark */}
              <div
                className="absolute top-4 right-6 font-devanagari opacity-5 select-none"
                style={{ fontSize: 200, lineHeight: 1, color: '#C4613A' }}
              >
                ॐ
              </div>

              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px" style={{ background: '#C4613A' }} />
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: '#C4613A' }}>
                    {t('history.origin.heading')}
                  </span>
                </div>
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#2E1810', fontFamily: 'Georgia, serif' }}>
                  {t('history.origin.text')}
                </p>
                <div
                  className="rounded-xl p-5"
                  style={{ background: 'rgba(196,97,58,0.1)', border: '1px solid rgba(196,97,58,0.2)' }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: '#6B3020', fontStyle: 'italic' }}>
                    {t('history.origin.clan')}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ background: '#fff' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1C1C1E' }}>
              A Village Through Time
            </h2>
            <div className="divider-wheat mt-4 max-w-xs mx-auto" />
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
              style={{ background: 'linear-gradient(to bottom, #E8A838, #C4613A, #4A6741)' }}
            />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.key} delay={i * 0.1}>
                  <div className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center gap-8 pl-12 md:pl-0`}>
                    {/* Dot */}
                    <div
                      className="absolute left-0 md:left-1/2 w-9 h-9 rounded-full border-2 border-white flex items-center justify-center md:-translate-x-1/2 z-10 shrink-0"
                      style={{ background: item.color, boxShadow: `0 0 0 4px ${item.color}22` }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>

                    {/* Year badge (desktop) */}
                    <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-12">
                      {i % 2 === 0 && (
                        <span className="text-xs font-bold tracking-wider px-3 py-1 rounded-full" style={{ background: `${item.color}18`, color: item.color }}>
                          {item.year}
                        </span>
                      )}
                      {i % 2 !== 0 && (
                        <div
                          className="max-w-sm rounded-2xl p-6"
                          style={{ background: '#FDF6EC', border: '1px solid rgba(232,168,56,0.15)' }}
                        >
                          <h3 className="font-semibold text-lg mb-2" style={{ color: '#1C1C1E' }}>
                            {t(`history.timeline.${item.key}`)}
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(28,28,30,0.65)' }}>
                            {t(`history.timeline.${item.key}Desc`)}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="md:w-1/2 md:pl-12">
                      {/* Mobile: always show content */}
                      <div className="md:hidden">
                        <span className="text-xs font-bold tracking-wider px-2.5 py-0.5 rounded-full mb-3 inline-block" style={{ background: `${item.color}18`, color: item.color }}>
                          {item.year}
                        </span>
                        <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid rgba(232,168,56,0.15)' }}>
                          <h3 className="font-semibold mb-2" style={{ color: '#1C1C1E' }}>{t(`history.timeline.${item.key}`)}</h3>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(28,28,30,0.65)' }}>{t(`history.timeline.${item.key}Desc`)}</p>
                        </div>
                      </div>
                      {/* Desktop: alternating */}
                      {i % 2 === 0 && (
                        <div className="hidden md:block max-w-sm rounded-2xl p-6" style={{ background: '#FDF6EC', border: '1px solid rgba(232,168,56,0.15)' }}>
                          <h3 className="font-semibold text-lg mb-2" style={{ color: '#1C1C1E' }}>{t(`history.timeline.${item.key}`)}</h3>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(28,28,30,0.65)' }}>{t(`history.timeline.${item.key}Desc`)}</p>
                        </div>
                      )}
                      {i % 2 !== 0 && (
                        <span className="hidden md:inline-block text-xs font-bold tracking-wider px-3 py-1 rounded-full" style={{ background: `${item.color}18`, color: item.color }}>
                          {item.year}
                        </span>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Neighboring villages */}
      <section className="py-20" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1C1C1E' }}>
              {t('history.neighbors.heading')}
            </h2>
            <p className="max-w-xl" style={{ color: 'rgba(28,28,30,0.6)' }}>
              {t('history.neighbors.desc')}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Village cluster */}
            <AnimatedSection direction="left">
              <div
                className="rounded-2xl p-8 h-full"
                style={{ background: '#fff', border: '1px solid rgba(232,168,56,0.15)' }}
              >
                <h3 className="font-semibold mb-6 text-lg" style={{ color: '#1C1C1E' }}>Surrounding Villages</h3>
                <div className="flex flex-wrap gap-2.5">
                  {neighbors.map(n => (
                    <span
                      key={n}
                      className="px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ background: 'rgba(74,103,65,0.1)', color: '#4A6741' }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(232,168,56,0.12)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#E8A838' }} />
                    <span className="text-sm font-medium" style={{ color: '#1C1C1E' }}>Dhanana</span>
                  </div>
                  <p className="text-xs pl-5" style={{ color: 'rgba(28,28,30,0.5)' }}>Core village — Bhiwani district, Haryana</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Satellite settlements */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg" style={{ color: '#1C1C1E' }}>Satellite Settlements</h3>
                <p className="text-sm" style={{ color: 'rgba(28,28,30,0.6)' }}>
                  As Dhanana&apos;s farmlands spread outward, farmers began living near their distant fields — giving birth to new hamlets.
                </p>
                {satellites.map(s => (
                  <div
                    key={s.name}
                    className="rounded-xl p-5 card-lift"
                    style={{ background: '#fff', border: '1px solid rgba(196,97,58,0.15)' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: '#C4613A' }} />
                      <div>
                        <div className="font-semibold" style={{ color: '#1C1C1E' }}>{s.name}</div>
                        <div className="text-sm mt-0.5" style={{ color: 'rgba(28,28,30,0.6)' }}>{s.note}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
