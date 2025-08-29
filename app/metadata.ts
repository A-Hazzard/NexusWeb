/**
 * Page-specific SEO metadata for Nexus Web
 * Centralized metadata configurations for all pages
 */

import { generateServiceStructuredData } from '@/lib/seo/utils';
import { SITE_CONFIG } from '@/lib/seo/config';
import { PageSEO, ServiceSEO } from '@/lib/seo/types';

// Homepage SEO
export const homePageSEO: PageSEO = {
  title: 'Nexus Web - Premier Web Development Agency in Trinidad & Tobago',
  description: 'Transform your digital presence with cutting-edge web solutions. Professional web development, SEO, and digital marketing services in Trinidad and Tobago since 2025.',
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
    'professional web development',
    'custom websites Trinidad',
    'modern web design',
    'business websites',
    'Aaron Hazzard',
    'nexuswebtt',
    'website agency Trinidad',
    'web developer near me',
    'website design company',
    'web development services',
    'Trinidad website designer',
    'Tobago web design',
    'Caribbean web development',
    'local web developer',
    'website builder Trinidad',
    'professional web designer',
    'custom website development',
    'business website design',
    'e-commerce website Trinidad',
    'SEO optimization Trinidad',
    'digital marketing agency',
    'website maintenance Trinidad',
    'mobile responsive design',
    'web application development',
    'website hosting Trinidad',
    'domain registration Trinidad',
    'website consultation',
    'free website quote',
    'web development portfolio',
    'Trinidad tech company',
    'web development pricing',
    'affordable web design',
  ],
  canonical: SITE_CONFIG.url,
  ogType: 'website',
  ogTitle: 'Nexus Web - Transform Your Digital Presence in Trinidad & Tobago',
  ogDescription: 'Premier web development agency crafting extraordinary digital experiences. Professional web solutions, SEO, and digital marketing for Caribbean businesses.',
  ogImage: `${SITE_CONFIG.url}/logo.png`,
};

// About Page SEO
export const aboutPageSEO: PageSEO = {
  title: 'About Nexus Web - Expert Web Development Team in Trinidad & Tobago',
  description: 'Meet Aaron Hazzard, Senior Software Engineer and founder of Nexus Web. 5+ years of experience delivering exceptional web solutions across Trinidad and Tobago.',
  keywords: [
    'Aaron Hazzard',
    'web developer Trinidad',
    'software engineer Tobago',
    'web development team',
    'Trinidad tech company',
    'Caribbean web agency',
    'about Nexus Web',
    'web development expertise',
    'senior software engineer',
    'founded 2025',
  ],
  canonical: `${SITE_CONFIG.url}/about`,
  ogType: 'website',
  ogTitle: 'About Nexus Web - Your Trusted Web Development Partner',
  ogDescription: 'Founded by Aaron Hazzard, a Senior Software Engineer with 5+ years of experience. Dedicated to delivering exceptional web solutions in Trinidad & Tobago.',
  ogImage: `${SITE_CONFIG.url}/og-about.jpg`,
};

// Services Page SEO
export const servicesPageSEO: PageSEO = {
  title: 'Web Development Services - SEO, Design & Digital Marketing | Nexus Web',
  description: 'Comprehensive web development services in Trinidad & Tobago. Web design, SEO, e-commerce, digital marketing, and maintenance. Starting from TTD 2,000.',
  keywords: [
    'web development services Trinidad',
    'SEO services Tobago',
    'digital marketing Caribbean',
    'e-commerce development',
    'website maintenance',
    'web design services',
    'responsive design',
    'custom web applications',
    'TTD pricing',
    'affordable web development',
    'professional web services',
  ],
  canonical: `${SITE_CONFIG.url}/services`,
  ogType: 'website',
  ogTitle: 'Professional Web Development Services in Trinidad & Tobago',
  ogDescription: 'From web design to SEO and digital marketing. Comprehensive web solutions starting from TTD 2,000. Transform your business online.',
  ogImage: `${SITE_CONFIG.url}/og-services.jpg`,
};

// Portfolio Page SEO
export const portfolioPageSEO: PageSEO = {
  title: 'Our Portfolio - Successful Web Projects in Trinidad & Tobago | Nexus Web',
  description: 'Explore our portfolio of successful web development projects across Trinidad and Tobago. From e-commerce to corporate websites, see our work in action.',
  keywords: [
    'web development portfolio',
    'Trinidad websites',
    'Tobago web projects',
    'Caribbean web design',
    'successful projects',
    'client websites',
    'web development examples',
    'portfolio showcase',
    'case studies',
    'before and after',
  ],
  canonical: `${SITE_CONFIG.url}/portfolio`,
  ogType: 'website',
  ogTitle: 'Portfolio - Exceptional Web Projects by Nexus Web',
  ogDescription: 'Discover our portfolio of successful web development projects in Trinidad & Tobago. See how we transform businesses online.',
  ogImage: `${SITE_CONFIG.url}/og-portfolio.jpg`,
};

// Contact Page SEO
export const contactPageSEO: PageSEO = {
  title: 'Contact Nexus Web - Get Your Free Web Development Quote Today',
  description: 'Ready to transform your digital presence? Contact Nexus Web for a free consultation. Call +1 (868) 352-1435 or email nexuswebtt@gmail.com.',
  keywords: [
    'contact Nexus Web',
    'web development quote',
    'free consultation',
    'Trinidad web developer',
    'nexuswebtt@gmail.com',
    '+1 868 352 1435',
    'get started',
    'web development inquiry',
    'project consultation',
    'Caribbean web services',
  ],
  canonical: `${SITE_CONFIG.url}/contact`,
  ogType: 'website',
  ogTitle: 'Contact Nexus Web - Start Your Web Project Today',
  ogDescription: 'Get your free web development consultation. Professional web solutions in Trinidad & Tobago. Call or email us today.',
  ogImage: `${SITE_CONFIG.url}/og-contact.jpg`,
};

// Service-specific structured data
export const webDevelopmentService: ServiceSEO = {
  name: 'Web Development Services',
  description: 'Professional web development services including custom websites, web applications, and responsive design for businesses in Trinidad and Tobago.',
  provider: 'Nexus Web',
  areaServed: ['Trinidad and Tobago', 'Caribbean', 'Remote'],
  serviceType: 'Web Development',
  category: 'Technology Services',
  priceRange: 'TTD 3000 - TTD 15000',
  offers: [
    {
      name: 'Basic Website Package',
      description: 'Professional 5-page website with responsive design and basic SEO',
      price: '3000',
      priceCurrency: 'TTD',
    },
    {
      name: 'Business Website Package',
      description: 'Advanced business website with CMS, contact forms, and enhanced SEO',
      price: '6000',
      priceCurrency: 'TTD',
    },
    {
      name: 'E-Commerce Package',
      description: 'Full e-commerce solution with payment integration and inventory management',
      price: '15000',
      priceCurrency: 'TTD',
    },
  ],
};

export const seoService: ServiceSEO = {
  name: 'SEO & Digital Marketing Services',
  description: 'Comprehensive SEO and digital marketing services to boost your online visibility and drive more customers to your business.',
  provider: 'Nexus Web',
  areaServed: ['Trinidad and Tobago', 'Caribbean', 'Remote'],
  serviceType: 'SEO & Digital Marketing',
  category: 'Marketing Services',
  priceRange: 'TTD 2000 - TTD 8000',
  offers: [
    {
      name: 'Local SEO Package',
      description: 'Local search optimization for Trinidad & Tobago businesses',
      price: '2000',
      priceCurrency: 'TTD',
    },
    {
      name: 'Complete SEO Package',
      description: 'Comprehensive SEO with content marketing and social media management',
      price: '5000',
      priceCurrency: 'TTD',
    },
    {
      name: 'Enterprise Marketing Package',
      description: 'Full digital marketing suite with advertising and analytics',
      price: '8000',
      priceCurrency: 'TTD',
    },
  ],
};

// Generate structured data for services
export const webDevelopmentStructuredData = generateServiceStructuredData(webDevelopmentService);
export const seoServiceStructuredData = generateServiceStructuredData(seoService);