import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const fontData = await fetch(
    new URL('/fonts/TiroDevanagariHindi-Regular.ttf', request.url)
  ).then(r => r.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#2C3B1F',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial depth glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(232,168,56,0.13) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Corner accents */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'rgba(196,97,58,0.07)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'rgba(232,168,56,0.05)',
            display: 'flex',
          }}
        />

        {/* Main text block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            paddingBottom: 60,
            paddingTop: 40,
            gap: 0,
            zIndex: 1,
          }}
        >
          {/* Devanagari village name */}
          <div
            style={{
              fontFamily: 'TiroDevanagari',
              fontSize: 172,
              color: '#E8A838',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              marginBottom: 14,
              display: 'flex',
            }}
          >
            धनाना
          </div>

          {/* Decorative divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div style={{ width: 60, height: 1, background: 'rgba(232,168,56,0.35)', display: 'flex' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8A838', opacity: 0.5, display: 'flex' }} />
            <div style={{ width: 60, height: 1, background: 'rgba(232,168,56,0.35)', display: 'flex' }} />
          </div>

          {/* Latin romanization */}
          <div
            style={{
              fontSize: 54,
              color: '#FDF6EC',
              letterSpacing: '0.18em',
              fontWeight: 300,
              marginBottom: 22,
              display: 'flex',
            }}
          >
            DHANANA
          </div>

          {/* Location */}
          <div
            style={{
              fontSize: 22,
              color: 'rgba(253,246,236,0.45)',
              letterSpacing: '0.32em',
              display: 'flex',
            }}
          >
            BHIWANI · HARYANA · INDIA
          </div>
        </div>

        {/* Bottom terracotta strip */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 58,
            background: '#C4613A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 19,
              color: 'rgba(253,246,236,0.88)',
              letterSpacing: '0.25em',
              display: 'flex',
            }}
          >
            dhanana.in
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'TiroDevanagari',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
