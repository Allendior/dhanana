"use client"
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'

const templeKeys = [
  'baba_bhramchari', 'goga', 'kuchpadiya', 'bhaiya',
  'bhudhi_mata', 'chauganan', 'khada', 'dadu', 'khatu',
]

const templeDescs = [
  'Ancient temple of the ascetic sage',
  "Dedicated to the folk deity Goga Pir",
  'Beloved village guardian deity',
  'Local protector spirit of the community',
  'Goddess of wisdom and the elderly',
  'The four-armed mother goddess',
  'The standing saint of Dhanana',
  "Bhakti saint Dadu Dayal's sacred shrine",
  'Shyam Baba — draws devotees from Nepal',
]

const templeIcons = ['🕉️', '🐍', '🙏', '🪔', '🌸', '✨', '🕯️', '📿', '🌺']

const crops = [
  { labelKey: 'Rice (Dhaan)',    pct: 50, color: '#4A6741' },
  { labelKey: 'Millet (Bajra)', pct: 25, color: '#E8A838' },
  { labelKey: 'Cotton (Kapas)', pct: 25, color: '#C4613A' },
]

export default function CulturePage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E8A838 0%, #C4613A 100%)' }}>
        <div className="absolute inset-0 opacity-10 select-none">
          <div className="font-devanagari text-[400px] leading-none text-white absolute -bottom-20 -right-10">ॐ</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-white/70">Haryana · India</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('sections.culture')}</h1>
            <p className="text-lg font-light max-w-xl text-white/75">{t('sections.culture_sub')}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to bottom, transparent, #FDF6EC)' }} />
      </section>

      {/* Language + Sport */}
      <section className="py-20" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Language */}
            <AnimatedSection direction="left">
              <div className="rounded-3xl p-10 h-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2E4428 0%, #4A6741 100%)' }}>
                <div className="absolute top-0 right-0 font-devanagari text-8xl text-white/5 leading-none p-4 select-none">हरि</div>
                <div className="relative z-10">
                  <div className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/50">{t('culture.language_title')}</div>
                  <div className="flex gap-4 mb-6">
                    <div className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-semibold">हिन्दी</div>
                    <div className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: '#E8A838', color: '#fff' }}>हरियाणवी</div>
                  </div>
                  <p className="text-xl font-light text-white/90 mb-3">{t('culture.languages')}</p>
                  <p className="text-white/65 leading-relaxed text-sm">
                    The Haryanvi dialect is not just a language — it is identity, warmth, and belonging. The people of Dhanana wear it with pride.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Sport */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="rounded-3xl p-10 h-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3A3A3C 100%)' }}>
                <div className="absolute top-4 right-6 text-white/5 text-9xl select-none" style={{ fontSize: 120 }}>🏐</div>
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: '#E8A838', color: '#fff' }}>
                    National Level
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{t('culture.sport')}</h3>
                  <div className="text-sm mb-3" style={{ color: 'rgba(232,168,56,0.8)' }}>{t('culture.sport_title')}</div>
                  <p className="text-white/65 leading-relaxed text-sm">{t('culture.sport_note')}</p>
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
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1C1C1E' }}>{t('culture.crops_title')}</h2>
            <p className="max-w-xl" style={{ color: 'rgba(28,28,30,0.6)' }}>{t('culture.crops')}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crops.map((crop, i) => (
              <AnimatedSection key={crop.labelKey} delay={i * 0.1}>
                <div className="rounded-2xl p-7 h-full card-lift" style={{ background: '#FDF6EC', border: `1px solid ${crop.color}25` }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg" style={{ color: '#1C1C1E' }}>{crop.labelKey}</h3>
                    <span className="text-2xl font-bold" style={{ color: crop.color }}>{crop.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'rgba(28,28,30,0.08)' }}>
                    <div className="h-full rounded-full" style={{ width: `${crop.pct}%`, background: crop.color }} />
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
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1C1C1E' }}>{t('culture.temples_title')}</h2>
            <p className="max-w-2xl mb-3" style={{ color: 'rgba(28,28,30,0.6)' }}>{t('culture.temples_note')}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {templeKeys.map((key, i) => (
              <AnimatedSection key={key} delay={i * 0.06}>
                <div
                  className="temple-glow rounded-2xl p-6 h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(232,168,56,0.06) 0%, rgba(196,97,58,0.04) 100%)',
                    border: '1px solid rgba(232,168,56,0.2)',
                  }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{ background: 'rgba(232,168,56,0.12)' }}>
                    {templeIcons[i]}
                  </div>
                  <h3 className="font-semibold mb-1.5" style={{ color: '#1C1C1E' }}>{t(`temples.${key}`)}</h3>
                  <p className="text-sm" style={{ color: 'rgba(28,28,30,0.6)' }}>{templeDescs[i]}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
