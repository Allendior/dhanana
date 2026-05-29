import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { GrainOverlay } from '@/components/GrainOverlay'
import { CustomCursor } from '@/components/CustomCursor'

export const metadata: Metadata = {
  metadataBase: new URL('https://dhanana.in'),
  title: 'Dhanana — धनाना | Bhiwani, Haryana',
  description: 'Official website of Dhanana village, Bhiwani, Haryana, India. Preserving history, connecting diaspora, celebrating culture.',
  keywords: 'Dhanana, धनाना, Bhiwani, Haryana, India, village, Ghanghas, Jat',
  authors: [{ name: 'Allen Ghanghas', url: 'https://allendior.com' }],
  openGraph: {
    title: 'Dhanana — धनाना | Bhiwani, Haryana',
    description: 'Official website of Dhanana village. Preserving history, connecting diaspora, celebrating culture.',
    url: 'https://dhanana.in',
    siteName: 'Dhanana',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Dhanana village — धनाना, Bhiwani, Haryana',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhanana — धनाना | Bhiwani, Haryana',
    description: 'Official website of Dhanana village, Bhiwani, Haryana.',
    images: ['/og'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
      </head>
      <body className="min-h-screen" style={{ background: '#FDF6EC', color: '#1C1C1E' }}>
        <LanguageProvider>
          <CustomCursor />
          <GrainOverlay />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
