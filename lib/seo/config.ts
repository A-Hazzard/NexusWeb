/**
 * SEO Configuration for Nexus Web
 * Centralized SEO settings and business information
 */

import { BusinessInfo } from './types';

export const SITE_CONFIG = {
  name: 'Nexus Web',
  url: 'https://nexuswebtt.com', // Update with your actual domain
  domain: 'nexuswebtt.com',
  locale: 'en_US',
  defaultLanguage: 'en',
  supportedLanguages: ['en'],
  timezone: 'America/Port_of_Spain',
};

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Nexus Web',
  legalName: 'Nexus Web Digital Solutions',
  description: 'Premier web development agency in Trinidad and Tobago, specializing in cutting-edge web solutions, SEO, and digital marketing services for Caribbean businesses. Professional web design, e-commerce development, and local SEO services.',
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
  image: `${SITE_CONFIG.url}/logo.png`,
  telephone: '+1-868-352-1435',
  email: 'nexuswebtt@gmail.com',
  address: {
    streetAddress: 'Remote Operations',
    addressLocality: 'Trinidad and Tobago',
    addressRegion: 'Trinidad and Tobago',
    postalCode: '100001',
    addressCountry: 'TT',
  },
  geo: {
    latitude: 10.692480,
    longitude: -61.554927,
  },
  foundingDate: '2025-08-01',
  founder: {
    name: 'Aaron Hazzard',
    jobTitle: 'Senior Software Engineer & Founder',
    description: 'Senior Software Engineer with 5+ years of experience in web development, specializing in modern web technologies and digital solutions.',
  },
  services: [
    'Web Development',
    'Web Design',
    'SEO Services',
    'Digital Marketing',
    'E-Commerce Solutions',
    'Website Maintenance',
    'Mobile-Responsive Design',
    'Custom Web Applications',
    'Local SEO',
    'Google My Business Management',
    'Social Media Marketing',
    'Content Marketing',
  ],
  socialMedia: {
    instagram: 'https://www.instagram.com/nexuswebtt/',
  },
  priceRange: 'TTD 2000 - TTD 25000',
  currenciesAccepted: ['TTD', 'USD'],
  paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'PayPal', 'Wise'],
};

export const DEFAULT_SEO = {
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
  ],
  ogImage: `${SITE_CONFIG.url}/logo.png`,
  twitterHandle: '@nexuswebtt', // Update when available
};

export const STRUCTURED_DATA_TEMPLATES = {
  organization: {
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
      ...BUSINESS_INFO.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...BUSINESS_INFO.geo,
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
      {
        '@type': 'Place',
        name: 'International',
      },
    ],
    serviceArea: [
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          ...BUSINESS_INFO.geo,
        },
        geoRadius: '5000000', // 5000km radius for international reach
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: BUSINESS_INFO.services.map((service, index) => ({
        '@type': 'OfferCatalog',
        name: service,
        position: index + 1,
      })),
    },
    priceRange: BUSINESS_INFO.priceRange,
    currenciesAccepted: BUSINESS_INFO.currenciesAccepted,
    paymentAccepted: BUSINESS_INFO.paymentAccepted,
  },
  
  website: {
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
  },

  localBusiness: {
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
      ...BUSINESS_INFO.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...BUSINESS_INFO.geo,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
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
      {
        '@type': 'Place',
        name: 'International',
      },
    ],
  },
};
