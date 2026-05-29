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

// SVG icons — no emojis, intentional sacred imagery
const templeIcons = [
  // Baba Bhramchari — meditate / om circle
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 12a4 4 0 0 1 8 0c0 2-1 3-4 4"/>
    <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>
  </svg>,
  // Goga — serpent wave
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12c0-3 2.5-5 5-3s5 3 8 0"/>
    <path d="M3 17c0-3 2.5-5 5-3s5 3 8 0"/>
    <path d="M17 7c1.5-1 3-0.5 3 1.5"/>
    <circle cx="20" cy="10" r="1.5" fill="currentColor" stroke="none"/>
  </svg>,
  // Kuchpadiya — shield / guardian
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>,
  // Bhaiya — flame / diya
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c0 1.5-1 2.5-2.5 2.5"/>
    <path d="M12 2c0 0-4 5-4 9a4 4 0 0 0 8 0c0-1-.5-2-1-3"/>
    <path d="M12 2s2 3 2 6"/>
  </svg>,
  // Bhudhi Mata — lotus / flower
  <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V12"/>
    <path d="M12 12C12 8 8 5 5 7c0 4 3 7 7 5z"/>
    <path d="M12 12C12 8 16 5 19 7c0 4-3 7-7 5z"/>
    <path d="M12 12C8 12 5 8 7 5c4 0 7 3 5 7z"/>
    <path d="M12 12c4 0 7-4 5-7-4 0-7 3-5 7z"/>
  </svg>,
  // Chauganan — four-pointed star / mandala
  <svg key="5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>,
  // Khada — pillar / standing form
  <svg key="6" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22"/>
    <path d="M8 6h8M9 10h6M10 14h4M8 18h8"/>
    <path d="M7 2h10"/>
    <path d="M7 22h10"/>
  </svg>,
  // Dadu — book / scripture
  <svg key="7" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>,
  // Khatu Shyam — crown / radiance
  <svg key="8" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>,
]

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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>{t('sections.culture')}</h1>
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
                  <p className="text-white/65 leading-relaxed text-sm" style={{ lineHeight: 1.75 }}>
                    The Haryanvi dialect is not just a language — it is identity, warmth, and belonging. The people of Dhanana wear it with pride.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Sport */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="rounded-3xl p-10 h-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3A3A3C 100%)' }}>
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: '#E8A838', color: '#fff' }}>
                    National Level
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ letterSpacing: '-0.01em' }}>{t('culture.sport')}</h3>
                  <div className="text-sm mb-3" style={{ color: 'rgba(232,168,56,0.8)' }}>{t('culture.sport_title')}</div>
                  <p className="text-white/65 leading-relaxed text-sm" style={{ lineHeight: 1.75 }}>{t('culture.sport_note')}</p>
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
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1C1C1E', letterSpacing: '-0.02em' }}>{t('culture.crops_title')}</h2>
            <p className="max-w-xl" style={{ color: 'rgba(28,28,30,0.6)', lineHeight: 1.7 }}>{t('culture.crops')}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crops.map((crop, i) => (
              <AnimatedSection key={crop.labelKey} delay={i * 0.1}>
                <div className="rounded-2xl p-7 h-full card-lift" style={{ background: '#FDF6EC', border: `1px solid ${crop.color}25` }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg" style={{ color: '#1C1C1E' }}>{crop.labelKey}</h3>
                    <span className="text-2xl font-bold" style={{ color: crop.color }}>{crop.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(28,28,30,0.08)' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${crop.pct}%`, background: crop.color }} />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Temples — sacred cards, proper SVG icons ── */}
      <section id="temples" className="py-24" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-4">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(28,28,30,0.35)' }}>
              Sacred sites of Dhanana
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: '#1C1C1E', letterSpacing: '-0.02em' }}
            >
              {t('culture.temples_title')}
            </h2>
            <p className="max-w-2xl" style={{ color: 'rgba(28,28,30,0.6)', lineHeight: 1.75 }}>
              {t('culture.temples_note')}
            </p>
          </AnimatedSection>

          {/* Divider */}
          <div className="my-10 divider-wheat max-w-sm" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {templeKeys.map((key, i) => (
              <AnimatedSection key={key} delay={i * 0.06}>
                <div
                  className="group rounded-2xl p-6 h-full cursor-default transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(232,168,56,0.05) 0%, rgba(196,97,58,0.03) 100%)',
                    border: '1px solid rgba(232,168,56,0.18)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'linear-gradient(135deg, rgba(232,168,56,0.1) 0%, rgba(196,97,58,0.06) 100%)'
                    ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,168,56,0.4)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px -8px rgba(232,168,56,0.2)'
                    ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'linear-gradient(135deg, rgba(232,168,56,0.05) 0%, rgba(196,97,58,0.03) 100%)'
                    ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,168,56,0.18)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                    ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                  }}
                >
                  {/* Icon — proper SVG, not emoji */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200"
                    style={{ background: 'rgba(232,168,56,0.12)', color: '#C4613A' }}
                  >
                    {templeIcons[i]}
                  </div>

                  {/* Thin saffron accent line */}
                  <div
                    className="h-px mb-4 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(90deg, #E8A838, transparent)', opacity: 0.4 }}
                  />

                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: '#1C1C1E', lineHeight: 1.3 }}
                  >
                    {t(`temples.${key}`)}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: 'rgba(28,28,30,0.58)', lineHeight: 1.7 }}
                  >
                    {templeDescs[i]}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
