import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { GrainOverlay } from '@/components/GrainOverlay'

export const metadata: Metadata = {
  title: 'Dhanana — धाणा | Bhiwani, Haryana',
  description: 'Official website of Dhanana village, Bhiwani district, Haryana, India. Population 11,766 · Founded by Dhanna Jaat · 3,492 hectares.',
  keywords: ['Dhanana', 'धाणा', 'Bhiwani', 'Haryana', 'village', 'India'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌾</text></svg>" />
      </head>
      <body className="min-h-screen" style={{ background: '#FDF6EC', color: '#1C1C1E' }}>
        <LanguageProvider>
          <GrainOverlay />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
