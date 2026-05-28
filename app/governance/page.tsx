"use client"
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'

const infrastructure = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 10V3h14v7"/><path d="M9 21v-5h6v5"/>
      </svg>
    ),
    title: 'Anaj Mandi',
    desc: 'Large wholesale grain market serving the region',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: '5 Water Reservoirs',
    desc: 'Water storage tanks ensuring year-round supply',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: '3 Primary Schools',
    desc: 'Including 1 girls-only school for female education',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: '1 Govt Higher Secondary',
    desc: '+ 6–7 private schools for higher education',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Government Hospital',
    desc: 'Serving 14 villages — dental, X-ray, maternity, veterinary',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Public Transport',
    desc: 'Public bus, private bus, and railway connectivity',
  },
]

const parties = ['HVP', 'BJP', 'INLD', 'INC']
const partyColors: Record<string, string> = { HVP: '#E8A838', BJP: '#FF6B00', INLD: '#2E7D32', INC: '#1565C0' }

export default function GovernancePage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative" style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3A3A3C 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(232,168,56,0.7)' }}>
              Administration
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('governance.title')}</h1>
            <p className="text-lg font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>{t('governance.subtitle')}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to bottom, transparent, #FDF6EC)' }} />
      </section>

      {/* Panchayat org chart */}
      <section className="py-20" style={{ background: '#FDF6EC' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1C1C1E' }}>Panchayat Structure</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="flex flex-col items-center gap-0">
              {/* Block level */}
              <div
                className="rounded-2xl px-8 py-5 text-center"
                style={{ background: '#1C1C1E', color: '#fff', minWidth: 240 }}
              >
                <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'rgba(232,168,56,0.7)' }}>{t('governance.block')}</div>
                <div className="text-lg font-bold">{t('governance.blockName')}</div>
              </div>

              {/* Connector */}
              <div className="w-px h-8" style={{ background: '#E8A838' }} />

              {/* Gram panchayat */}
              <div
                className="rounded-2xl px-8 py-5 text-center"
                style={{ background: '#E8A838', minWidth: 280 }}
              >
                <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'rgba(28,28,30,0.6)' }}>{t('governance.panchayat')}</div>
                <div className="text-xl font-bold" style={{ color: '#fff' }}>{t('governance.panchayatName')}</div>
              </div>

              {/* Connector + sub-villages */}
              <div className="w-px h-8" style={{ background: '#E8A838' }} />
              <div className="relative flex gap-6">
                <div className="absolute top-0 left-1/4 right-1/4 h-px" style={{ background: '#E8A838' }} />
                {['Dhanana I', 'Dhanana II', 'Dhanana III'].map((v, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-px h-4" style={{ background: '#E8A838' }} />
                    <div
                      className="rounded-xl px-5 py-3 text-center"
                      style={{ background: '#fff', border: '1px solid rgba(232,168,56,0.25)', minWidth: 100 }}
                    >
                      <div className="text-sm font-semibold" style={{ color: '#1C1C1E' }}>{v}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'rgba(28,28,30,0.45)' }}>Sub-village</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-8 text-center">
            <div
              className="inline-block px-5 py-2.5 rounded-full text-sm font-medium"
              style={{ background: 'rgba(28,28,30,0.06)', color: 'rgba(28,28,30,0.6)' }}
            >
              {t('governance.censusCode')}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Political representation */}
      <section className="py-20" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold" style={{ color: '#1C1C1E' }}>Political Representation</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Assembly */}
            <AnimatedSection>
              <div className="rounded-2xl p-8 h-full" style={{ background: '#FDF6EC', border: '1px solid rgba(232,168,56,0.2)' }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(28,28,30,0.45)' }}>
                  {t('governance.assembly')}
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#1C1C1E' }}>{t('governance.assemblyName')}</div>
                <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(232,168,56,0.15)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#E8A838' }}>
                    {t('governance.mlaName')[0]}
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: 'rgba(28,28,30,0.5)' }}>{t('governance.mla')}</div>
                    <div className="font-semibold" style={{ color: '#1C1C1E' }}>{t('governance.mlaName')}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Parliament */}
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl p-8 h-full" style={{ background: '#FDF6EC', border: '1px solid rgba(196,97,58,0.2)' }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(28,28,30,0.45)' }}>
                  {t('governance.parliament')}
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#1C1C1E' }}>{t('governance.parliamentName')}</div>
                <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(196,97,58,0.15)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#C4613A' }}>
                    {t('governance.mpName')[0]}
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: 'rgba(28,28,30,0.5)' }}>{t('governance.mp')}</div>
                    <div className="font-semibold" style={{ color: '#1C1C1E' }}>{t('governance.mpName')}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Parties */}
          <AnimatedSection>
            <div className="rounded-2xl p-6" style={{ background: '#FDF6EC', border: '1px solid rgba(232,168,56,0.15)' }}>
              <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(28,28,30,0.45)' }}>
                Major Political Parties
              </div>
              <div className="flex flex-wrap gap-3">
                {parties.map(p => (
                  <div
                    key={p}
                    className="px-4 py-2 rounded-full text-sm font-bold text-white"
                    style={{ background: partyColors[p] || '#4A6741' }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1C1C1E' }}>{t('governance.infrastructure')}</h2>
            <div className="divider-wheat max-w-xs mt-3" />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {infrastructure.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.07}>
                <div className="rounded-2xl p-6 h-full card-lift" style={{ background: '#fff', border: '1px solid rgba(232,168,56,0.15)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(232,168,56,0.1)', color: '#E8A838' }}>
                    {item.icon}
                  </div>
                  <div className="font-semibold mb-1.5" style={{ color: '#1C1C1E' }}>{item.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'rgba(28,28,30,0.6)' }}>{item.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
