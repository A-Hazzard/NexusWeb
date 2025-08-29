/**
 * SEO Utility Functions for Nexus Web
 * Helper functions for generating SEO metadata and structured data
 */

import { Metadata } from 'next';
import { PageSEO, ServiceSEO, ArticleSEO } from './types';
import { SITE_CONFIG, DEFAULT_SEO, BUSINESS_INFO, STRUCTURED_DATA_TEMPLATES } from './config';

/**
 * Generate Next.js metadata object from PageSEO configuration
 */
export function generateMetadata(seo: Partial<PageSEO>): Metadata {
  const title = seo.title || DEFAULT_SEO.title;
  const description = seo.description || DEFAULT_SEO.description;
  const ogTitle = seo.ogTitle || title;
  const ogDescription = seo.ogDescription || description;
  const ogImage = seo.ogImage || DEFAULT_SEO.ogImage;
  const canonical = seo.canonical || SITE_CONFIG.url;

  return {
    title,
    description,
    keywords: seo.keywords?.join(', ') || DEFAULT_SEO.keywords.join(', '),
    authors: [{ name: BUSINESS_INFO.founder.name }],
    creator: BUSINESS_INFO.name,
    publisher: BUSINESS_INFO.name,
    robots: {
      index: !seo.noindex,
      follow: !seo.nofollow,
      googleBot: {
        index: !seo.noindex,
        follow: !seo.nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical,
      languages: seo.alternateLanguages?.reduce((acc, lang) => {
        acc[lang.hreflang] = lang.href;
        return acc;
      }, {} as Record<string, string>),
    },
    openGraph: {
      type: (seo.ogType === 'service' || seo.ogType === 'organization') ? 'website' : (seo.ogType || 'website'),
      locale: SITE_CONFIG.locale,
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      siteName: BUSINESS_INFO.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: seo.twitterCard || 'summary_large_image',
      title: seo.twitterTitle || ogTitle,
      description: seo.twitterDescription || ogDescription,
      images: [seo.twitterImage || ogImage],
      creator: DEFAULT_SEO.twitterHandle,
      site: DEFAULT_SEO.twitterHandle,
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_SITE_VERIFICATION,
    },
  };
}

/**
 * Generate structured data for services
 */
export function generateServiceStructuredData(service: ServiceSEO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider,
      url: BUSINESS_INFO.url,
      telephone: BUSINESS_INFO.telephone,
      email: BUSINESS_INFO.email,
    },
    areaServed: service.areaServed.map(area => ({
      '@type': 'Place',
      name: area,
    })),
    serviceType: service.serviceType,
    category: service.category,
    priceRange: service.priceRange,
    hasOfferCatalog: service.offers ? {
      '@type': 'OfferCatalog',
      name: `${service.name} Packages`,
      itemListElement: service.offers.map((offer, index) => ({
        '@type': 'Offer',
        name: offer.name,
        description: offer.description,
        price: offer.price,
        priceCurrency: offer.priceCurrency || 'TTD',
        position: index + 1,
      })),
    } : undefined,
  };
}

/**
 * Generate structured data for articles/blog posts
 */
export function generateArticleStructuredData(article: ArticleSEO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher,
      logo: {
        '@type': 'ImageObject',
        url: BUSINESS_INFO.logo,
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    wordCount: article.wordCount,
    articleSection: article.articleSection,
    keywords: article.keywords?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE_CONFIG.url,
    },
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Generate review/rating structured data
 */
export function generateReviewStructuredData(reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS_INFO.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
    })),
  };
}

/**
 * Generate JSON-LD script tag
 */
export function generateJSONLD(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data, null, 0),
  };
}

/**
 * Get default structured data for all pages
 */
export function getDefaultStructuredData(): Record<string, unknown>[] {
  return [
    STRUCTURED_DATA_TEMPLATES.organization as Record<string, unknown>,
    STRUCTURED_DATA_TEMPLATES.website as Record<string, unknown>,
    STRUCTURED_DATA_TEMPLATES.localBusiness as Record<string, unknown>,
  ];
}

/**
 * Generate sitemap URLs
 */
export function generateSitemapUrls() {
  const baseUrl = SITE_CONFIG.url;
  const pages = [
    { url: baseUrl, priority: 1.0, changefreq: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.8, changefreq: 'monthly' },
    { url: `${baseUrl}/services`, priority: 0.9, changefreq: 'weekly' },
    { url: `${baseUrl}/portfolio`, priority: 0.8, changefreq: 'weekly' },
    { url: `${baseUrl}/contact`, priority: 0.7, changefreq: 'monthly' },
  ];

  return pages;
}

/**
 * Clean and optimize text for SEO
 */
export function optimizeTextForSEO(text: string, maxLength?: number): string {
  // Remove extra whitespace and clean up text
  let cleaned = text.replace(/\s+/g, ' ').trim();
  
  // Truncate if needed
  if (maxLength && cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength - 3) + '...';
  }
  
  return cleaned;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}
