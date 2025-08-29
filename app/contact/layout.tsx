/**
 * Contact Page Layout with SEO Metadata
 */

import { Metadata } from 'next';
import { contactPageSEO } from '@/app/metadata';
import { SITE_CONFIG, BUSINESS_INFO } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: contactPageSEO.title,
  description: contactPageSEO.description,
  keywords: contactPageSEO.keywords?.join(', ') || '',
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
    canonical: contactPageSEO.canonical,
  },
  openGraph: {
    type: (contactPageSEO.ogType === 'website' || contactPageSEO.ogType === 'article') ? contactPageSEO.ogType : 'website',
    locale: 'en_US',
    url: contactPageSEO.canonical,
    title: contactPageSEO.ogTitle,
    description: contactPageSEO.ogDescription,
    siteName: BUSINESS_INFO.name,
    images: [
      {
        url: contactPageSEO.ogImage || `${SITE_CONFIG.url}/logo.png`,
        width: 1200,
        height: 630,
        alt: contactPageSEO.ogTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: contactPageSEO.ogTitle,
    description: contactPageSEO.ogDescription,
    images: [contactPageSEO.ogImage || `${SITE_CONFIG.url}/logo.png`],
    creator: '@nexuswebtt',
    site: '@nexuswebtt',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
