"use client"
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useLanguage } from '@/contexts/LanguageContext'

type LatLng = [number, number]

interface Era {
  key: string
  anchor: LatLng
  route: LatLng[] | null // waypoints arriving at anchor; null for the origin chapter
  zoom: number
}

const DHANANA: LatLng = [28.9353, 76.1635]

const ERAS: Era[] = [
  { key: 'era1', anchor: [52.49, 60.19], route: null, zoom: 5 },
  { key: 'era2', anchor: [38.2, 62.03], zoom: 5,
    route: [[52.49, 60.19], [47.2, 63.5], [42.4, 61.2], [38.2, 62.03]] },
  { key: 'era3', anchor: [29.29, 76.11], zoom: 6,
    route: [[38.2, 62.03], [36.7, 66.9], [34.5, 69.2], [34.0, 71.5], [31.6, 74.3], [29.29, 76.11]] },
  { key: 'era4', anchor: [28.961, 76.123], zoom: 10,
    route: [[29.29, 76.11], [29.12, 76.0], [28.961, 76.123]] },
  { key: 'era5', anchor: [29.969, 76.878], zoom: 9,
    route: [[28.961, 76.123], [29.45, 76.45], [29.969, 76.878]] },
  { key: 'era6', anchor: [29.16, 78.02], zoom: 9,
    route: [[29.969, 76.878], [29.55, 77.45], [29.16, 78.02]] },
  { key: 'era7', anchor: DHANANA, zoom: 9,
    route: [[29.16, 78.02], [28.92, 77.05], DHANANA] },
]

const N = ERAS.length
const ERA_SECONDS = 7

function catmullRom(pts: LatLng[], segments = 28): LatLng[] {
  if (pts.length < 3) return pts
  const out: LatLng[] = []
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    for (let j = 0; j < segments; j++) {
      const t = j / segments
      const t2 = t * t
      const t3 = t2 * t
      out.push([
        0.5 * (2 * p1[0] + (p2[0] - p0[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (3 * p1[0] - p0[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (p2[1] - p0[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (3 * p1[1] - p0[1] - 3 * p2[1] + p3[1]) * t3),
      ])
    }
  }
  out.push(pts[pts.length - 1])
  return out
}

const SMOOTH: (LatLng[] | null)[] = ERAS.map(e => (e.route ? catmullRom(e.route) : null))

function eraIndex(progress: number) {
  return Math.max(0, Math.min(N - 1, Math.floor(progress)))
}

/** Imperative layer manager — routes, pulsing site markers, travelling glow dot, flyTo. */
function MapFX({ progress, reduced, siteNames }: { progress: number; reduced: boolean; siteNames: string[] }) {
  const map = useMap()
  const linesRef = useRef<({ glow: L.Polyline; line: L.Polyline } | null)[]>([])
  const markersRef = useRef<L.Marker[]>([])
  const dotRef = useRef<L.Marker | null>(null)
  const flownRef = useRef(-1)
  const finaleRef = useRef(false)

  useEffect(() => {
    const lines = SMOOTH.map(pts => {
      if (!pts) return null
      return {
        glow: L.polyline([], { color: '#E8A838', weight: 9, opacity: 0.15, interactive: false }).addTo(map),
        line: L.polyline([], { color: '#E8A838', weight: 2.5, opacity: 0.9, interactive: false }).addTo(map),
      }
    })
    linesRef.current = lines
    const markers = ERAS.map((e, i) =>
      L.marker(e.anchor, {
        icon: L.divIcon({
          className: '',
          html: '<span class="mig-site"><span class="mig-site-ring"></span><span class="mig-site-dot"></span></span>',
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        }),
        keyboard: false,
      }).bindTooltip(siteNames[i], { direction: 'top', offset: [0, -8], className: 'mig-tooltip' })
    )
    markersRef.current = markers
    dotRef.current = L.marker([0, 0], {
      icon: L.divIcon({ className: '', html: '<span class="mig-glow-dot"></span>', iconSize: [14, 14], iconAnchor: [7, 7] }),
      interactive: false,
      keyboard: false,
    })
    flownRef.current = -1
    return () => {
      lines.forEach(l => { l?.glow.remove(); l?.line.remove() })
      markers.forEach(m => m.remove())
      dotRef.current?.remove()
    }
  }, [map, siteNames])

  useEffect(() => {
    const idx = eraIndex(progress)
    const frac = Math.min(1, progress - idx)

    ERAS.forEach((_, i) => {
      const pair = linesRef.current[i]
      const pts = SMOOTH[i]
      if (pair && pts) {
        let shown: LatLng[] = []
        if (progress >= i + 1) shown = pts
        else if (idx === i && frac > 0) shown = pts.slice(0, Math.max(2, Math.ceil(frac * pts.length)))
        pair.glow.setLatLngs(shown)
        pair.line.setLatLngs(shown)
      }
      const marker = markersRef.current[i]
      if (marker) {
        if (idx >= i) {
          if (!map.hasLayer(marker)) marker.addTo(map)
          marker.getElement()?.querySelector('.mig-site')?.classList.toggle('mig-site--active', idx === i)
        } else if (map.hasLayer(marker)) {
          marker.remove()
        }
      }
    })

    // Travelling glow dot rides the head of the route being drawn
    const dot = dotRef.current
    const activePts = SMOOTH[idx]
    if (dot) {
      if (!reduced && activePts && frac > 0 && frac < 1) {
        const head = activePts[Math.min(activePts.length - 1, Math.max(1, Math.ceil(frac * activePts.length) - 1))]
        dot.setLatLng(head)
        if (!map.hasLayer(dot)) dot.addTo(map)
      } else if (map.hasLayer(dot)) {
        dot.remove()
      }
    }

    if (flownRef.current !== idx) {
      flownRef.current = idx
      if (idx < N - 1) finaleRef.current = false
      if (activePts) {
        const bounds = L.latLngBounds(activePts).pad(0.3)
        if (reduced) map.fitBounds(bounds, { animate: false })
        else map.flyToBounds(bounds, { duration: 2 })
      } else {
        const era = ERAS[idx]
        if (reduced) map.setView(era.anchor, era.zoom, { animate: false })
        else map.flyTo(era.anchor, era.zoom, { duration: 2 })
      }
    }

    // Final chapter settles on Dhanana itself
    if (idx === N - 1 && frac >= 0.999 && !finaleRef.current) {
      finaleRef.current = true
      if (reduced) map.setView(DHANANA, 12, { animate: false })
      else map.flyTo(DHANANA, 12, { duration: 2.4 })
    }
  }, [map, progress, reduced, siteNames])

  return null
}

function Corners({ inset = 0 }: { inset?: number }) {
  const corners = [
    { top: inset, left: inset, borderTop: '2px solid #E8A838', borderLeft: '2px solid #E8A838' },
    { top: inset, right: inset, borderTop: '2px solid #E8A838', borderRight: '2px solid #E8A838' },
    { bottom: inset, left: inset, borderBottom: '2px solid #E8A838', borderLeft: '2px solid #E8A838' },
    { bottom: inset, right: inset, borderBottom: '2px solid #E8A838', borderRight: '2px solid #E8A838' },
  ]
  return (
    <>
      {corners.map((style, i) => (
        <span key={i} aria-hidden="true" className="pointer-events-none absolute w-4 h-4" style={{ ...style, opacity: 0.8 }} />
      ))}
    </>
  )
}

export default function MigrationsMap() {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const progRef = useRef(0)
  const rafRef = useRef(0)

  const siteNames = useMemo(() => ERAS.map(e => t(`migrations.${e.key}_site`)), [t])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!playing || reduced) return
    // the first rAF timestamp can predate performance.now() captured here,
    // so baseline on the first frame instead of the effect body
    let last: number | null = null
    const tick = (now: number) => {
      const dt = last === null ? 0 : (now - last) / 1000
      last = now
      const next = Math.max(0, Math.min(N, progRef.current + dt / ERA_SECONDS))
      progRef.current = next
      setProgress(next)
      if (next >= N) {
        setPlaying(false)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, reduced])

  const jumpTo = (value: number) => {
    progRef.current = value
    setProgress(value)
  }
  const stepTo = (chapter: number) => {
    setPlaying(false)
    // land just before the chapter boundary so its route shows fully drawn
    jumpTo(Math.max(0, Math.min(N - 1, chapter)) + 0.999)
  }

  const idx = eraIndex(progress)
  const era = ERAS[idx]
  const atEnd = progress >= N
  const chapterNo = String(idx + 1).padStart(2, '0')

  const onPlay = () => {
    if (atEnd) jumpTo(0)
    setPlaying(p => !p)
  }

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ background: '#0B0E0C', border: '1px solid rgba(232,168,56,0.25)' }}>
      {/* ── Screen ── */}
      <div className="relative">
        <MapContainer
          center={ERAS[0].anchor}
          zoom={4}
          zoomControl={false}
          scrollWheelZoom={false}
          attributionControl
          className="mig-map w-full"
          style={{ height: 'min(62vh, 540px)', minHeight: 340, background: '#0B0E0C', borderRadius: 0 }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom={19}
          />
          <MapFX progress={progress} reduced={reduced} siteNames={siteNames} />
        </MapContainer>

        {/* HUD frame + status readout */}
        <div className="pointer-events-none absolute inset-3" style={{ zIndex: 800 }}>
          <Corners />
          <div
            className="absolute top-1.5 left-6 text-[10px] font-semibold tracking-[0.25em] uppercase px-2 py-1 rounded"
            style={{ color: '#E8A838', background: 'rgba(11,14,12,0.65)', backdropFilter: 'blur(4px)' }}
          >
            {t('migrations.chapter')} {chapterNo} / {String(N).padStart(2, '0')} · {era.anchor[0].toFixed(2)}°N {era.anchor[1].toFixed(2)}°E
          </div>
        </div>
      </div>

      {/* ── Chapter readout ── */}
      <div className="relative px-5 py-5 md:px-8 md:py-6" style={{ borderTop: '1px solid rgba(232,168,56,0.2)' }}>
        <Corners inset={8} />
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: 'rgba(232,168,56,0.6)' }}>
            {t('migrations.chapter')} {chapterNo}
          </span>
          <span className="text-xs tracking-wider" style={{ color: 'rgba(245,232,208,0.5)' }}>
            {t(`migrations.${era.key}_date`)} · {t(`migrations.${era.key}_place`)}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-semibold mb-2" style={{ color: '#E8A838', letterSpacing: '-0.01em' }}>
          {t(`migrations.${era.key}_title`)}
        </h2>
        <p className="text-sm md:text-[15px] leading-relaxed max-w-3xl" style={{ color: 'rgba(245,232,208,0.75)', lineHeight: 1.7 }}>
          {t(`migrations.${era.key}_body`)}
        </p>
        {idx === N - 1 && (
          <Link
            href="/history"
            className="inline-flex items-center gap-2 mt-4 text-xs font-semibold tracking-[0.15em] uppercase transition-opacity hover:opacity-75"
            style={{ color: '#E8A838' }}
          >
            {t('migrations.era7_cta')}
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </div>

      {/* ── Timeline controls ── */}
      <div className="px-5 pb-5 md:px-8 md:pb-6">
        <div className="flex items-center gap-3">
          {!reduced && (
            <button
              onClick={onPlay}
              aria-label={playing ? t('migrations.pause') : atEnd ? t('migrations.replay') : t('migrations.play')}
              className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
              style={{ border: '1.5px solid #E8A838', color: '#E8A838', background: 'rgba(232,168,56,0.08)' }}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3.5" height="12" rx="1" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" /></svg>
              ) : atEnd ? (
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M13.5 8a5.5 5.5 0 1 1-2-4.25M13.5 1.5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.5v11l9-5.5z" /></svg>
              )}
            </button>
          )}
          <button
            onClick={() => stepTo(idx - 1)}
            disabled={idx === 0}
            aria-label={t('migrations.prev')}
            className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-default"
            style={{ border: '1px solid rgba(232,168,56,0.4)', color: '#E8A838' }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            onClick={() => stepTo(idx + 1)}
            disabled={idx === N - 1}
            aria-label={t('migrations.next')}
            className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-default"
            style={{ border: '1px solid rgba(232,168,56,0.4)', color: '#E8A838' }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round((progress / N) * 1000)}
            onChange={e => { setPlaying(false); jumpTo((Number(e.target.value) / 1000) * N) }}
            aria-label={t('migrations.timeline')}
            className="mig-range flex-1 min-w-0 cursor-pointer"
          />
        </div>
        {/* Chapter ticks */}
        <div className="flex justify-between mt-2">
          {ERAS.map((e, i) => (
            <button
              key={e.key}
              onClick={() => stepTo(i)}
              aria-label={`${t('migrations.chapter')} ${i + 1}: ${t(`migrations.${e.key}_title`)}`}
              className="w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded cursor-pointer transition-colors"
              style={{ color: i <= idx ? '#E8A838' : 'rgba(245,232,208,0.3)' }}
            >
              {i === idx ? '◆' : '◇'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
