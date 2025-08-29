/**
 * Services Page Layout with SEO Metadata
 */

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/utils';
import { servicesPageSEO } from '@/app/metadata';

export const metadata: Metadata = generateMetadata(servicesPageSEO);

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
