/**
 * Dynamic Robots.txt Generation for Nexus Web
 * Controls search engine crawling behavior
 */

import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/private/',
        '*.json',
      ],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
