"use client"
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedSection } from '@/components/AnimatedSection'

type Category = 'all' | 'village' | 'agriculture' | 'temples' | 'festivals' | 'people'

const photos = [
  { category: 'village',      w: 800, h: 600,  label: 'Village Square' },
  { category: 'agriculture',  w: 1200, h: 800, label: 'Rice Fields at Dawn' },
  { category: 'temples',      w: 800, h: 1000, label: 'Khatu Syam Mandir' },
  { category: 'village',      w: 1000, h: 700, label: 'Village Street' },
  { category: 'festivals',    w: 1200, h: 800, label: 'Harvest Festival' },
  { category: 'people',       w: 800, h: 1000, label: 'Elder of the Village' },
  { category: 'agriculture',  w: 1000, h: 700, label: 'Cotton Harvest' },
  { category: 'temples',      w: 800, h: 600,  label: 'Goga Mandir' },
  { category: 'people',       w: 800, h: 800,  label: 'Village Youth' },
  { category: 'festivals',    w: 1200, h: 700, label: 'Cultural Performance' },
  { category: 'village',      w: 800, h: 600,  label: 'Evening Light' },
  { category: 'agriculture',  w: 1000, h: 600, label: 'Millet Fields' },
]

const catColors: Record<Category, string> = {
  all: '#E8A838', village: '#4A6741', agriculture: '#E8A838',
  temples: '#C4613A', festivals: '#4A6741', people: '#C4613A',
}

export default function GalleryPage() {
  const { t } = useLanguage()
  const [active, setActive] = useState<Category>('all')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const categories: Category[] = ['all', 'village', 'agriculture', 'temples', 'festivals', 'people']
  const filtered = active === 'all' ? photos : photos.filter(p => p.category === active)

  const slides = filtered.map(p => ({
    src: `https://placehold.co/${p.w}x${p.h}/4A6741/E8A838?text=${encodeURIComponent(p.label)}`,
    alt: p.label,
  }))

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative" style={{ background: 'linear-gradient(135deg, #4A6741 0%, #E8A838 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-white/70">Visual Archive</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('gallery.title')}</h1>
            <p className="text-lg font-light text-white/75">{t('gallery.subtitle')}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to bottom, transparent, #FDF6EC)' }} />
      </section>

      {/* Category filters */}
      <section className="py-10 sticky top-16 z-30" style={{ background: 'rgba(253,246,236,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(232,168,56,0.12)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: active === cat ? catColors[cat] : 'rgba(28,28,30,0.06)',
                  color: active === cat ? '#fff' : 'rgba(28,28,30,0.65)',
                }}
              >
                {t(`gallery.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="py-12" style={{ background: '#FDF6EC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((photo, i) => (
              <AnimatedSection key={`${photo.label}-${i}`} delay={i * 0.04} className="break-inside-avoid">
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="w-full block rounded-2xl overflow-hidden cursor-pointer group relative"
                  style={{ boxShadow: '0 4px 20px rgba(28,28,30,0.08)' }}
                >
                  <img
                    src={`https://placehold.co/${photo.w}x${photo.h}/4A6741/FDF6EC?text=${encodeURIComponent(photo.label)}`}
                    alt={photo.label}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ aspectRatio: `${photo.w}/${photo.h}` }}
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(28,28,30,0.7) 0%, transparent 60%)' }}
                  >
                    <div className="text-white font-medium text-sm">{photo.label}</div>
                    <div
                      className="text-xs mt-0.5 capitalize"
                      style={{ color: catColors[photo.category as Category] }}
                    >
                      {photo.category}
                    </div>
                    <div className="text-white/50 text-xs">{t('gallery.placeholder')}</div>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>

          {/* Contribute CTA */}
          <AnimatedSection className="mt-16 text-center">
            <div
              className="rounded-3xl p-10 max-w-2xl mx-auto"
              style={{ background: 'rgba(232,168,56,0.08)', border: '1px solid rgba(232,168,56,0.2)' }}
            >
              <div className="text-4xl mb-4">📸</div>
              <h3 className="font-semibold text-xl mb-3" style={{ color: '#1C1C1E' }}>
                {t('gallery.contribute')}
              </h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(28,28,30,0.6)' }}>
                Add your photos to <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(28,28,30,0.06)' }}>/public/images/</code> to make them appear here.
              </p>
              <a
                href="/connect"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white cursor-pointer"
                style={{ background: '#E8A838' }}
              >
                Contact us to contribute
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </>
  )
}
