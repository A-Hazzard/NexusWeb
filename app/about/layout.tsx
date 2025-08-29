/**
 * About Page Layout with SEO Metadata
 */

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/utils';
import { aboutPageSEO } from '@/app/metadata';

export const metadata: Metadata = generateMetadata(aboutPageSEO);

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
