/**
 * Next-SEO Configuration for Advanced SEO Management
 * Provides comprehensive SEO configuration using next-seo package
 */

import { DefaultSeoProps } from 'next-seo';
import { SITE_CONFIG, BUSINESS_INFO, DEFAULT_SEO } from './config';

export const defaultSEOConfig: DefaultSeoProps = {
  titleTemplate: `%s | ${SITE_CONFIG.name}`,
  defaultTitle: DEFAULT_SEO.title,
  description: DEFAULT_SEO.description,
  canonical: SITE_CONFIG.url,
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    images: [
      {
        url: DEFAULT_SEO.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - ${DEFAULT_SEO.description}`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: DEFAULT_SEO.twitterHandle,
    site: DEFAULT_SEO.twitterHandle,
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: DEFAULT_SEO.keywords.join(', '),
    },
    {
      name: 'author',
      content: BUSINESS_INFO.founder.name,
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    // Geographic meta tags
    {
      name: 'geo.region',
      content: 'TT',
    },
    {
      name: 'geo.placename',
      content: BUSINESS_INFO.address.addressLocality,
    },
    {
      name: 'geo.position',
      content: `${BUSINESS_INFO.geo.latitude};${BUSINESS_INFO.geo.longitude}`,
    },
    {
      name: 'ICBM',
      content: `${BUSINESS_INFO.geo.latitude}, ${BUSINESS_INFO.geo.longitude}`,
    },
    // Business contact data
    {
      name: 'business:contact_data:street_address',
      content: BUSINESS_INFO.address.streetAddress,
    },
    {
      name: 'business:contact_data:locality',
      content: BUSINESS_INFO.address.addressLocality,
    },
    {
      name: 'business:contact_data:region',
      content: BUSINESS_INFO.address.addressRegion,
    },
    {
      name: 'business:contact_data:postal_code',
      content: BUSINESS_INFO.address.postalCode,
    },
    {
      name: 'business:contact_data:country_name',
      content: 'Trinidad and Tobago',
    },
    {
      name: 'business:contact_data:phone_number',
      content: BUSINESS_INFO.telephone,
    },
    {
      name: 'business:contact_data:email',
      content: BUSINESS_INFO.email,
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/logo.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};

// Page-specific SEO configurations
export const pageSEOConfigs = {
  home: {
    title: 'Premier Web Development Agency in Trinidad & Tobago',
    description: 'Transform your digital presence with cutting-edge web solutions. Professional web development, SEO, and digital marketing services in Trinidad and Tobago.',
    openGraph: {
      title: 'Nexus Web - Transform Your Digital Presence in Trinidad & Tobago',
      description: 'Premier web development agency crafting extraordinary digital experiences. Professional web solutions, SEO, and digital marketing for Caribbean businesses.',
    },
  },
  about: {
    title: 'About Us - Professional Web Development Team',
    description: 'Meet the team behind Nexus Web. Senior software engineers with 5+ years of experience delivering exceptional web solutions in Trinidad and Tobago.',
    openGraph: {
      title: 'About Nexus Web - Professional Web Development Team',
      description: 'Meet our experienced team of web developers and digital strategists serving Trinidad and Tobago and the Caribbean.',
    },
  },
  services: {
    title: 'Web Development Services - Trinidad & Tobago',
    description: 'Comprehensive web development services including custom websites, e-commerce solutions, SEO, and digital marketing. Serving Trinidad and Tobago.',
    openGraph: {
      title: 'Web Development Services - Trinidad & Tobago',
      description: 'Professional web development, design, and digital marketing services tailored for Caribbean businesses.',
    },
  },
  portfolio: {
    title: 'Portfolio - Web Development Projects',
    description: 'Explore our portfolio of successful web development projects. Custom websites, e-commerce platforms, and digital solutions for Caribbean businesses.',
    openGraph: {
      title: 'Portfolio - Web Development Projects',
      description: 'Showcase of our best web development work and digital solutions for businesses in Trinidad and Tobago.',
    },
  },
  contact: {
    title: 'Contact Us - Web Development Agency Trinidad',
    description: 'Get in touch with Nexus Web for professional web development services. Free consultation and quote for your digital project in Trinidad and Tobago.',
    openGraph: {
      title: 'Contact Nexus Web - Web Development Agency Trinidad',
      description: 'Contact our web development team for a free consultation and quote. Professional web services in Trinidad and Tobago.',
    },
  },
};
