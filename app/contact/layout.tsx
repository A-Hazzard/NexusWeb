/**
 * Contact Page Layout with SEO Metadata
 */

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/utils';
import { contactPageSEO } from '@/app/metadata';

export const metadata: Metadata = generateMetadata(contactPageSEO);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
