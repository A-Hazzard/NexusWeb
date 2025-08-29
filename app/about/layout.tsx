/**
 * About Page Layout with SEO Metadata
 */

import { Metadata } from 'next';
import { aboutPageSEO } from '@/app/metadata';
import { SITE_CONFIG, BUSINESS_INFO } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: aboutPageSEO.title,
  description: aboutPageSEO.description,
  keywords: aboutPageSEO.keywords?.join(', ') || '',
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
    canonical: aboutPageSEO.canonical,
  },
  openGraph: {
    type: (aboutPageSEO.ogType === 'website' || aboutPageSEO.ogType === 'article') ? aboutPageSEO.ogType : 'website',
    locale: 'en_US',
    url: aboutPageSEO.canonical,
    title: aboutPageSEO.ogTitle,
    description: aboutPageSEO.ogDescription,
    siteName: BUSINESS_INFO.name,
    images: [
      {
        url: aboutPageSEO.ogImage || `${SITE_CONFIG.url}/logo.png`,
        width: 1200,
        height: 630,
        alt: aboutPageSEO.ogTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: aboutPageSEO.ogTitle,
    description: aboutPageSEO.ogDescription,
    images: [aboutPageSEO.ogImage || `${SITE_CONFIG.url}/logo.png`],
    creator: '@nexuswebtt',
    site: '@nexuswebtt',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
