/**
 * Enhanced Structured Data Component
 * Uses schema-dts for type-safe structured data implementation
 */

import { BUSINESS_INFO } from '@/lib/seo/config';

interface EnhancedStructuredDataProps {
  pageType: 'home' | 'about' | 'services' | 'portfolio' | 'contact';
}

export function EnhancedStructuredData({ pageType }: EnhancedStructuredDataProps) {
  // Organization Schema
  const organizationSchema = {
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
          latitude: BUSINESS_INFO.geo.latitude,
          longitude: BUSINESS_INFO.geo.longitude,
        },
        geoRadius: '5000000',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: BUSINESS_INFO.services.map((service, index) => ({
        '@type': 'Offer',
        name: service,
        position: index + 1,
        description: `Professional ${service.toLowerCase()} services`,
      })),
    },
    priceRange: BUSINESS_INFO.priceRange,
    currenciesAccepted: BUSINESS_INFO.currenciesAccepted,
    paymentAccepted: BUSINESS_INFO.paymentAccepted,
  };

  // Local Business Schema
  const localBusinessSchema = {
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
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
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
  };

  // Website Schema
  const websiteSchema = {
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

  // Person Schema (Founder)
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: BUSINESS_INFO.founder.name,
    jobTitle: BUSINESS_INFO.founder.jobTitle,
    description: BUSINESS_INFO.founder.description,
    worksFor: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
    },
    knowsAbout: [
      'Web Development',
      'Software Engineering',
      'Digital Marketing',
      'SEO',
      'E-commerce',
      'Mobile Development',
    ],
  };

  // Service Schemas
  const serviceSchemas = BUSINESS_INFO.services.map((service, index) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service,
    description: `Professional ${service.toLowerCase()} services in Trinidad and Tobago`,
    provider: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
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
    position: index + 1,
  }));

  // Page-specific schemas based on pageType
  const getPageSpecificSchemas = () => {
    switch (pageType) {
      case 'about':
        return [personSchema];
      case 'services':
        return serviceSchemas;
      case 'portfolio':
        return []; // Add portfolio-specific schemas if needed
      case 'contact':
        return []; // Add contact-specific schemas if needed
      default:
        return [];
    }
  };

  // Combine all schemas
  const allSchemas = [
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
    ...getPageSpecificSchemas(),
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
          }}
        />
      ))}
    </>
  );
}
