"use client"
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'

const temples = [
  { name: 'Baba Bhramchari Mandir', desc: 'Ancient temple of the ascetic sage', icon: '🕉️' },
  { name: 'Goga Mandir',            desc: 'Dedicated to the folk deity Goga Pir', icon: '🐍' },
  { name: 'Baba Kuchpadiya Mandir', desc: 'Beloved village guardian deity', icon: '🙏' },
  { name: 'Bhaiya Baba',            desc: 'Local protector spirit of the community', icon: '🪔' },
  { name: 'Bhudhi Mata',            desc: 'Goddess of wisdom and the elderly', icon: '🌸' },
  { name: 'Chauganan Mata',         desc: 'The four-armed mother goddess', icon: '✨' },
  { name: 'Khada Baba',             desc: 'The standing saint of Dhanana', icon: '🕯️' },
  { name: 'Dadu Dyal Mandir',       desc: "Bhakti saint Dadu Dayal's sacred shrine", icon: '📿' },
  { name: 'Khatu Syam Mandir',      desc: 'Shyam Baba temple drawing devotees from Nepal', icon: '🌺' },
]

const crops = [
  { name: 'Rice (Dhaan)', coverage: '50%', color: '#4A6741', desc: 'The primary crop — grown across half the cultivated land' },
  { name: 'Millet (Bajra)', coverage: '25%', color: '#E8A838', desc: 'Drought-hardy grain, staple of Haryanvi cuisine' },
  { name: 'Cotton (Kapas)', coverage: '25%', color: '#C4613A', desc: 'Cash crop linking Dhanana to regional textile economy' },
]

export default function CulturePage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E8A838 0%, #C4613A 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="font-devanagari text-[400px] leading-none text-white select-none absolute -bottom-20 -right-10">
            ॐ
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-white/70">Haryana · India</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('culture.title')}</h1>
            <p className="text-lg font-light max-w-xl text-white/75">{t('culture.subtitle')}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to bottom, transparent, #FDF6EC)' }} />
      </section>

      {/* Language + Sport — hero cards */}
      <section className="py-20" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Language card */}
            <AnimatedSection direction="left">
              <div
                className="rounded-3xl p-10 h-full relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #2E4428 0%, #4A6741 100%)' }}
              >
                <div className="absolute top-0 right-0 font-devanagari text-8xl text-white/5 leading-none p-4 select-none">
                  हरि
                </div>
                <div className="relative z-10">
                  <div className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/50">
                    {t('culture.languages.heading')}
                  </div>
                  <div className="flex gap-4 mb-6">
                    <div className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-semibold">हिन्दी</div>
                    <div className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: '#E8A838', color: '#fff' }}>हरियाणवी</div>
                  </div>
                  <p className="text-white/75 leading-relaxed text-sm">{t('culture.languages.desc')}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Handball card */}
            <AnimatedSection direction="right" delay={0.1}>
              <div
                className="rounded-3xl p-10 h-full relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3A3A3C 100%)' }}
              >
                <div className="absolute top-4 right-6 text-white/5 text-9xl select-none">🤾</div>
                <div className="relative z-10">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                    style={{ background: '#E8A838', color: '#fff' }}
                  >
                    National Level
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{t('culture.sport.heading')}</h3>
                  <p className="text-white/65 leading-relaxed text-sm">{t('culture.sport.desc')}</p>
                  <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#E8A838' }} />
                    <span className="text-xs text-white/45">Handball · National-level players from Dhanana</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Crops */}
      <section className="py-20" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1C1C1E' }}>{t('culture.crops.heading')}</h2>
            <p className="max-w-xl" style={{ color: 'rgba(28,28,30,0.6)' }}>{t('culture.crops.desc')}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crops.map((crop, i) => (
              <AnimatedSection key={crop.name} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-7 h-full card-lift"
                  style={{ background: '#FDF6EC', border: `1px solid ${crop.color}25` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg" style={{ color: '#1C1C1E' }}>{crop.name}</h3>
                    <span className="text-2xl font-bold" style={{ color: crop.color }}>{crop.coverage}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(28,28,30,0.65)' }}>{crop.desc}</p>
                  {/* Coverage bar */}
                  <div className="h-2 rounded-full" style={{ background: 'rgba(28,28,30,0.08)' }}>
                    <div className="h-full rounded-full" style={{ width: crop.coverage, background: crop.color }} />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Temples */}
      <section id="temples" className="py-20" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1C1C1E' }}>
              {t('culture.temples.heading')}
            </h2>
            <p className="max-w-xl mb-2" style={{ color: 'rgba(28,28,30,0.6)' }}>{t('culture.temples.desc')}</p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ background: 'rgba(232,168,56,0.12)', color: '#C8881A' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              {t('culture.temples.devotees')}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {temples.map((temple, i) => (
              <AnimatedSection key={temple.name} delay={i * 0.06}>
                <div
                  className="temple-glow rounded-2xl p-6 h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(232,168,56,0.06) 0%, rgba(196,97,58,0.04) 100%)',
                    border: '1px solid rgba(232,168,56,0.2)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: 'rgba(232,168,56,0.12)' }}
                  >
                    {temple.icon}
                  </div>
                  <h3 className="font-semibold mb-1.5" style={{ color: '#1C1C1E' }}>{temple.name}</h3>
                  <p className="text-sm" style={{ color: 'rgba(28,28,30,0.6)' }}>{temple.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
