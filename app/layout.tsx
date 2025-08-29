import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { StructuredData } from '@/components/seo/StructuredData'
import { SITE_CONFIG, BUSINESS_INFO } from '@/lib/seo/config'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Nexus Web - Premier Web Development Agency in Trinidad & Tobago',
  description: 'Transform your digital presence with cutting-edge web solutions. Professional web development, SEO, and digital marketing services in Trinidad and Tobago. Local web developer serving Port of Spain and the Caribbean.',
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
    'nexuswebtt',
    'website agency Trinidad',
    'web developer near me',
    'website design company',
    'web development services',
    'Trinidad website designer',
    'Tobago web design',
    'Caribbean web development',
    'local web developer',
    'website builder Trinidad',
    'professional web designer',
    'custom website development',
    'business website design',
    'e-commerce website Trinidad',
    'SEO optimization Trinidad',
    'digital marketing agency',
    'website maintenance Trinidad',
    'mobile responsive design',
    'web application development',
    'website hosting Trinidad',
    'domain registration Trinidad',
    'website consultation',
    'free website quote',
    'web development portfolio',
    'Trinidad tech company',
    'web development pricing',
    'affordable web design',
  ].join(', '),
  authors: [{ name: BUSINESS_INFO.founder.name }],
  creator: BUSINESS_INFO.name,
  publisher: BUSINESS_INFO.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: 'Nexus Web - Transform Your Digital Presence in Trinidad & Tobago',
    description: 'Premier web development agency crafting extraordinary digital experiences. Professional web solutions, SEO, and digital marketing for Caribbean businesses.',
    siteName: BUSINESS_INFO.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Nexus Web - Web Development Agency Trinidad & Tobago',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexus Web - Web Development Agency Trinidad & Tobago',
    description: 'Professional web development, SEO, and digital marketing services in Trinidad and Tobago.',
    images: [`${SITE_CONFIG.url}/logo.png`],
    creator: '@nexuswebtt',
    site: '@nexuswebtt',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

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
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData pageType="home" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="geo.region" content="TT" />
        <meta name="geo.placename" content="Trinidad and Tobago" />
        <meta name="geo.position" content="10.6918;-61.2225" />
        <meta name="ICBM" content="10.6918, -61.2225" />
        <meta name="business:contact_data:street_address" content={BUSINESS_INFO.address.streetAddress} />
        <meta name="business:contact_data:locality" content={BUSINESS_INFO.address.addressLocality} />
        <meta name="business:contact_data:region" content={BUSINESS_INFO.address.addressRegion} />
        <meta name="business:contact_data:postal_code" content={BUSINESS_INFO.address.postalCode} />
        <meta name="business:contact_data:country_name" content="Trinidad and Tobago" />
        <meta name="business:contact_data:phone_number" content={BUSINESS_INFO.telephone} />
        <meta name="business:contact_data:email" content={BUSINESS_INFO.email} />
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
