/**
 * Comprehensive SEO Structured Data Component
 * Includes all necessary structured data for maximum search engine visibility
 */

import Script from 'next/script';
import {
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
  generateLocalBusinessStructuredData,
  generateFAQStructuredData,
} from '@/lib/seo/utils';

interface StructuredDataProps {
  pageType?: 'home' | 'about' | 'services' | 'portfolio' | 'contact' | 'blog';
  additionalData?: Record<string, unknown>[];
}

export function StructuredData({ pageType = 'home', additionalData = [] }: StructuredDataProps) {
  // Base structured data that should be on every page
  const baseStructuredData = [
    generateOrganizationStructuredData(),
    generateWebsiteStructuredData(),
    generateLocalBusinessStructuredData(),
  ];

  // Page-specific structured data
  const pageSpecificData = additionalData;

  // FAQ data for relevant pages
  const faqData = ['home', 'services', 'contact'].includes(pageType) 
    ? [generateFAQStructuredData()] 
    : [];

  // Combine all structured data
  const allStructuredData = [...baseStructuredData, ...pageSpecificData, ...faqData];

  return (
    <>
      {allStructuredData.map((data, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}
    </>
  );
}
