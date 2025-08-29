import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateMetadata as generateSEOMetadata, getDefaultStructuredData } from '@/lib/seo/utils'
import { SITE_CONFIG } from '@/lib/seo/config'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = generateSEOMetadata({
  title: 'Nexus Web - Premier Web Development Agency in Trinidad & Tobago',
  description: 'Transform your digital presence with cutting-edge web solutions. Professional web development, SEO, and digital marketing services in Trinidad and Tobago.',
  keywords: [
    'web development Trinidad',
    'web design Tobago',
    'SEO services Caribbean',
    'digital marketing Trinidad',
    'website development',
    'responsive web design',
    'e-commerce solutions',
    'Trinidad web agency',
    'Tobago web developer',
    'Caribbean web services',
    'professional web development',
    'custom websites Trinidad',
  ],
  canonical: SITE_CONFIG.url,
  ogType: 'website',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FF8A00' },
    { media: '(prefers-color-scheme: dark)', color: '#FF8A00' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = getDefaultStructuredData();
  
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData data={structuredData} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="geo.region" content="TT" />
        <meta name="geo.placename" content="Trinidad and Tobago" />
        <meta name="geo.position" content="10.6918;-61.2225" />
        <meta name="ICBM" content="10.6918, -61.2225" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <Navigation />
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
