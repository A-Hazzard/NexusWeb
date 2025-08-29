/**
 * Portfolio Page Layout with SEO Metadata
 */

import { Metadata } from 'next';
import { portfolioPageSEO } from '@/app/metadata';
import { SITE_CONFIG, BUSINESS_INFO } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: portfolioPageSEO.title,
  description: portfolioPageSEO.description,
  keywords: portfolioPageSEO.keywords?.join(', ') || '',
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
    canonical: portfolioPageSEO.canonical,
  },
  openGraph: {
    type: (portfolioPageSEO.ogType === 'website' || portfolioPageSEO.ogType === 'article') ? portfolioPageSEO.ogType : 'website',
    locale: 'en_US',
    url: portfolioPageSEO.canonical,
    title: portfolioPageSEO.ogTitle,
    description: portfolioPageSEO.ogDescription,
    siteName: BUSINESS_INFO.name,
    images: [
      {
        url: portfolioPageSEO.ogImage || `${SITE_CONFIG.url}/logo.png`,
        width: 1200,
        height: 630,
        alt: portfolioPageSEO.ogTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioPageSEO.ogTitle,
    description: portfolioPageSEO.ogDescription,
    images: [portfolioPageSEO.ogImage || `${SITE_CONFIG.url}/logo.png`],
    creator: '@nexuswebtt',
    site: '@nexuswebtt',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
