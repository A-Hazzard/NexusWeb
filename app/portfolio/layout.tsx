/**
 * Portfolio Page Layout with SEO Metadata
 */

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/utils';
import { portfolioPageSEO } from '@/app/metadata';

export const metadata: Metadata = generateMetadata(portfolioPageSEO);

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
