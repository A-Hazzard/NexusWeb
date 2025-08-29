/**
 * Page-Specific SEO Component
 * Allows individual pages to set custom SEO metadata
 */

import { NextSeo } from 'next-seo';
import { pageSEOConfigs } from '@/lib/seo/next-seo-config';

interface PageSEOProps {
  pageType: keyof typeof pageSEOConfigs;
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter?: {
    title?: string;
    description?: string;
    images?: string[];
  };
  noindex?: boolean;
  nofollow?: boolean;
}

export function PageSEO({
  pageType,
  title,
  description,
  canonical,
  openGraph,
  twitter,
  noindex = false,
  nofollow = false,
}: PageSEOProps) {
  const defaultConfig = pageSEOConfigs[pageType];

  return (
    <NextSeo
      title={title || defaultConfig.title}
      description={description || defaultConfig.description}
      canonical={canonical}
      openGraph={{
        ...defaultConfig.openGraph,
        ...openGraph,
      }}
      twitter={twitter ? {
        cardType: 'summary_large_image',
        ...twitter,
      } : undefined}
      noindex={noindex}
      nofollow={nofollow}
      additionalMetaTags={[
        {
          name: 'page-type',
          content: pageType,
        },
      ]}
    />
  );
}
