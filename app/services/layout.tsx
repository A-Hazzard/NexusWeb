/**
 * Services Page Layout with SEO Metadata
 */

import { Metadata } from 'next';
import { servicesPageSEO } from '@/app/metadata';
import { SITE_CONFIG, BUSINESS_INFO } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: servicesPageSEO.title,
  description: servicesPageSEO.description,
  keywords: servicesPageSEO.keywords?.join(', ') || '',
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
    canonical: servicesPageSEO.canonical,
  },
  openGraph: {
    type: (servicesPageSEO.ogType === 'website' || servicesPageSEO.ogType === 'article') ? servicesPageSEO.ogType : 'website',
    locale: 'en_US',
    url: servicesPageSEO.canonical,
    title: servicesPageSEO.ogTitle,
    description: servicesPageSEO.ogDescription,
    siteName: BUSINESS_INFO.name,
    images: [
      {
        url: servicesPageSEO.ogImage || `${SITE_CONFIG.url}/logo.png`,
        width: 1200,
        height: 630,
        alt: servicesPageSEO.ogTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: servicesPageSEO.ogTitle,
    description: servicesPageSEO.ogDescription,
    images: [servicesPageSEO.ogImage || `${SITE_CONFIG.url}/logo.png`],
    creator: '@nexuswebtt',
    site: '@nexuswebtt',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
