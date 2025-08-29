/**
 * Dynamic Sitemap Generation for Nexus Web
 * Automatically generates sitemap.xml for better search engine indexing
 */

import { MetadataRoute } from 'next';
import { generateSitemapUrls } from '@/lib/seo/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = generateSitemapUrls();
  
  return urls.map(page => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: page.changefreq as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority: page.priority,
  }));
}
