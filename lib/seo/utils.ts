/**
 * SEO Utilities for Nexus Web
 * Comprehensive SEO tools and structured data generation
 */

import { SITE_CONFIG, BUSINESS_INFO } from './config';
import type { ServiceSEO } from './types';

// Enhanced sitemap URL generation with local SEO focus
export function generateSitemapUrls() {
  const baseUrl = SITE_CONFIG.url;
  
  return [
    {
      url: baseUrl,
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changefreq: 'monthly',
      priority: 0.7,
    },
    // Local SEO focused URLs
    {
      url: `${baseUrl}/services/web-development-trinidad`,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/seo-services-trinidad`,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/ecommerce-development-trinidad`,
      changefreq: 'weekly',
      priority: 0.8,
    },
  ];
}

// Generate comprehensive structured data for services
export function generateServiceStructuredData(service: ServiceSEO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider,
      url: SITE_CONFIG.url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Port of Spain',
        addressRegion: 'Trinidad and Tobago',
        addressCountry: 'TT',
      },
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
    offers: service.offers?.map(offer => ({
      '@type': 'Offer',
      name: offer.name,
      description: offer.description,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: service.provider,
      },
    })),
  };
}

// Generate local business structured data
export function generateLocalBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: BUSINESS_INFO.name,
    image: BUSINESS_INFO.image,
    '@id': BUSINESS_INFO.url,
    url: BUSINESS_INFO.url,
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
    priceRange: BUSINESS_INFO.priceRange,
    areaServed: [
      {
        '@type': 'Country',
        name: 'Trinidad and Tobago',
      },
      {
        '@type': 'Place',
        name: 'Caribbean',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: BUSINESS_INFO.services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
        },
        position: index + 1,
      })),
    },
    sameAs: [
      BUSINESS_INFO.socialMedia.instagram,
    ],
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a website cost in Trinidad and Tobago?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our website development services start from TTD 2,000 for basic websites and go up to TTD 25,000 for complex e-commerce solutions. We offer competitive pricing tailored to Caribbean businesses.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide SEO services in Trinidad and Tobago?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer comprehensive SEO services including local SEO optimization, Google My Business management, and digital marketing to help your business rank higher in local search results.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to build a website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Basic websites typically take 2-3 weeks, while complex e-commerce sites may take 4-6 weeks. We provide regular updates throughout the development process.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide website maintenance services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer ongoing website maintenance, security updates, content updates, and technical support to keep your website running smoothly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you help with e-commerce website development?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! We specialize in e-commerce development with payment integration, inventory management, and mobile-optimized shopping experiences for Trinidad and Tobago businesses.',
        },
      },
    ],
  };
}

// Generate breadcrumb structured data
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

// Generate article structured data
export function generateArticleStructuredData(data: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  publisher: string;
  articleSection: string;
  keywords: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    image: data.image,
    publisher: {
      '@type': 'Organization',
      name: data.publisher,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    articleSection: data.articleSection,
    keywords: data.keywords.join(', '),
  };
}

// Generate organization structured data
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    image: BUSINESS_INFO.image,
    description: BUSINESS_INFO.description,
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    foundingDate: BUSINESS_INFO.foundingDate,
    founder: {
      '@type': 'Person',
      name: BUSINESS_INFO.founder.name,
      jobTitle: BUSINESS_INFO.founder.jobTitle,
      description: BUSINESS_INFO.founder.description,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Trinidad and Tobago',
      },
      {
        '@type': 'Place',
        name: 'Caribbean',
      },
    ],
    serviceArea: [
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: BUSINESS_INFO.geo.latitude,
          longitude: BUSINESS_INFO.geo.longitude,
        },
        geoRadius: '500000', // 500km radius
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: BUSINESS_INFO.services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
        },
        position: index + 1,
      })),
    },
    priceRange: BUSINESS_INFO.priceRange,
    currenciesAccepted: BUSINESS_INFO.currenciesAccepted,
    paymentAccepted: BUSINESS_INFO.paymentAccepted,
    sameAs: [
      BUSINESS_INFO.socialMedia.instagram,
    ],
  };
}

// Generate website structured data
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    description: BUSINESS_INFO.description,
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BUSINESS_INFO.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
