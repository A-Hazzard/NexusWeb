/**
 * SEO Types for Nexus Web
 * Comprehensive type definitions for SEO metadata and structured data
 */

export type PageSEO = {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'service' | 'organization';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: Record<string, unknown>;
  alternateLanguages?: Array<{
    hreflang: string;
    href: string;
  }>;
};

export type BusinessInfo = {
  name: string;
  legalName: string;
  description: string;
  url: string;
  logo: string;
  image: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  foundingDate: string;
  founder: {
    name: string;
    jobTitle: string;
    description: string;
  };
  services: string[];
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  priceRange: string;
  currenciesAccepted: string[];
  paymentAccepted: string[];
};

export type ServiceSEO = {
  name: string;
  description: string;
  provider: string;
  areaServed: string[];
  serviceType: string;
  priceRange?: string;
  category: string;
  offers?: Array<{
    name: string;
    description: string;
    price?: string;
    priceCurrency?: string;
  }>;
};

export type ArticleSEO = {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  publisher: string;
  wordCount?: number;
  articleSection?: string;
  keywords?: string[];
};
