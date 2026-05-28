"use client"
import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const dhananaPos: [number, number] = [28.9353, 76.1635]
const bhiwaniPos: [number, number] = [28.7929, 76.1394]
const jindPos: [number, number] = [29.3162, 76.3146]

const neighbors = [
  { name: 'Talu', pos: [28.945, 76.150] as [number, number] },
  { name: 'Jatai', pos: [28.925, 76.175] as [number, number] },
  { name: 'Sukhpura', pos: [28.930, 76.185] as [number, number] },
  { name: 'Mitathal', pos: [28.960, 76.120] as [number, number] },
  { name: 'Tigdana', pos: [28.955, 76.200] as [number, number] },
]

function createSaffronIcon() {
  return L.divIcon({
    html: `<svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 10.64 14 28 16 28S32 26.64 32 16C32 7.163 24.837 0 16 0z" fill="#E8A838"/>
      <circle cx="16" cy="16" r="6.5" fill="#FDF6EC"/>
      <circle cx="16" cy="16" r="3" fill="#C8881A"/>
    </svg>`,
    className: '',
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -46],
  })
}

function createSmallIcon(color = '#C4613A') {
  return L.divIcon({
    html: `<svg width="18" height="25" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 0C4.029 0 0 4.029 0 9c0 6.75 9 16 9 16S18 15.75 18 9C18 4.029 13.971 0 9 0z" fill="${color}"/>
      <circle cx="9" cy="9" r="3.5" fill="rgba(255,255,255,0.8)"/>
    </svg>`,
    className: '',
    iconSize: [18, 25],
    iconAnchor: [9, 25],
    popupAnchor: [0, -27],
  })
}

export default function DhananaMap() {
  useEffect(() => {
    // Fix default icon paths in Next.js
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  return (
    <MapContainer
      center={dhananaPos}
      zoom={12}
      className="w-full h-full"
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />

      {/* Main Dhanana marker */}
      <Marker position={dhananaPos} icon={createSaffronIcon()}>
        <Popup>
          <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 160 }}>
            <strong style={{ color: '#E8A838', fontSize: 15 }}>धाणा — Dhanana</strong>
            <p style={{ margin: '4px 0 0', color: '#666', fontSize: 12 }}>28.9353°N, 76.1635°E</p>
            <p style={{ margin: '2px 0 0', color: '#666', fontSize: 12 }}>PIN: 127031</p>
          </div>
        </Popup>
      </Marker>

      {/* Bhiwani */}
      <Marker position={bhiwaniPos} icon={createSmallIcon('#4A6741')}>
        <Popup>
          <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <strong style={{ color: '#4A6741' }}>Bhiwani</strong>
            <p style={{ margin: '4px 0 0', color: '#666', fontSize: 12 }}>District Headquarters</p>
          </div>
        </Popup>
      </Marker>

      {/* Jind */}
      <Marker position={jindPos} icon={createSmallIcon('#4A6741')}>
        <Popup>
          <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <strong style={{ color: '#4A6741' }}>Jind</strong>
          </div>
        </Popup>
      </Marker>

      {/* Neighbors */}
      {neighbors.map(n => (
        <Marker key={n.name} position={n.pos} icon={createSmallIcon('#C4613A')}>
          <Popup>
            <span style={{ fontFamily: 'Inter, sans-serif', color: '#C4613A', fontWeight: 600 }}>
              {n.name}
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
