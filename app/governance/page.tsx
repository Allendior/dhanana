"use client"
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'

const parties = ['HVP', 'BJP', 'INLD', 'INC']
const partyColors: Record<string, string> = { HVP: '#E8A838', BJP: '#FF6B00', INLD: '#2E7D32', INC: '#1565C0' }

export default function GovernancePage() {
  const { t } = useLanguage()

  const infrastructure = [
    { title: t('governance.infra_mandi'),    desc: 'Large wholesale grain market serving the region' },
    { title: t('governance.infra_water'),    desc: 'Water storage tanks ensuring year-round supply' },
    { title: t('governance.infra_schools'),  desc: '3 primary + 1 girls-only + 1 govt higher secondary + 6–7 private' },
    { title: t('governance.infra_hospital'), desc: t('governance.infra_hospital_note') },
    { title: t('governance.infra_transport'),desc: 'Bus routes and rail connectivity to Bhiwani and beyond' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative" style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3A3A3C 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(232,168,56,0.7)' }}>Administration</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('sections.governance')}</h1>
            <p className="text-lg font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>{t('sections.governance_sub')}</p>
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
              <div className="rounded-2xl px-8 py-5 text-center" style={{ background: '#1C1C1E', color: '#fff', minWidth: 240 }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'rgba(232,168,56,0.7)' }}>{t('governance.block')}</div>
                <div className="text-lg font-bold">{t('governance.block_name')}</div>
              </div>
              <div className="w-px h-8" style={{ background: '#E8A838' }} />

              {/* Gram panchayat */}
              <div className="rounded-2xl px-8 py-5 text-center" style={{ background: '#E8A838', minWidth: 300 }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'rgba(28,28,30,0.6)' }}>{t('governance.panchayat')}</div>
                <div className="text-xl font-bold text-white">{t('governance.panchayat_name')}</div>
                <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{t('governance.panchayat_note')}</div>
              </div>
              <div className="w-px h-8" style={{ background: '#E8A838' }} />

              {/* Sub-villages */}
              <div className="flex gap-6">
                {['Dhanana I', 'Dhanana II', 'Dhanana III'].map((v, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-px h-4" style={{ background: '#E8A838' }} />
                    <div className="rounded-xl px-5 py-3 text-center" style={{ background: '#fff', border: '1px solid rgba(232,168,56,0.25)', minWidth: 100 }}>
                      <div className="text-sm font-semibold" style={{ color: '#1C1C1E' }}>{v}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'rgba(28,28,30,0.45)' }}>Sub-village</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-8 text-center">
            <div className="inline-block px-5 py-2.5 rounded-full text-sm font-medium" style={{ background: 'rgba(28,28,30,0.06)', color: 'rgba(28,28,30,0.6)' }}>
              {t('governance.census_code')}: 061137
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Assembly */}
            <AnimatedSection>
              <div className="rounded-2xl p-8 h-full" style={{ background: '#FDF6EC', border: '1px solid rgba(232,168,56,0.2)' }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(28,28,30,0.45)' }}>{t('governance.assembly')}</div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#1C1C1E' }}>{t('governance.assembly_name')}</div>
                <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(232,168,56,0.15)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#E8A838' }}>
                    {t('governance.mla_name')[0]}
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: 'rgba(28,28,30,0.5)' }}>{t('governance.mla')}</div>
                    <div className="font-semibold" style={{ color: '#1C1C1E' }}>{t('governance.mla_name')}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Parliament */}
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl p-8 h-full" style={{ background: '#FDF6EC', border: '1px solid rgba(196,97,58,0.2)' }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(28,28,30,0.45)' }}>{t('governance.parliament')}</div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#1C1C1E' }}>{t('governance.parliament_name')}</div>
                <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(196,97,58,0.15)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#C4613A' }}>
                    {t('governance.mp_name')[0]}
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: 'rgba(28,28,30,0.5)' }}>{t('governance.mp')}</div>
                    <div className="font-semibold" style={{ color: '#1C1C1E' }}>{t('governance.mp_name')}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Parties */}
          <AnimatedSection>
            <div className="rounded-2xl p-6" style={{ background: '#FDF6EC', border: '1px solid rgba(232,168,56,0.15)' }}>
              <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(28,28,30,0.45)' }}>{t('governance.parties')}</div>
              <div className="flex flex-wrap gap-3">
                {parties.map(p => (
                  <div key={p} className="px-4 py-2 rounded-full text-sm font-bold text-white" style={{ background: partyColors[p] || '#4A6741' }}>
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
                  <div className="w-2 h-8 rounded-full mb-4" style={{ background: '#E8A838' }} />
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
