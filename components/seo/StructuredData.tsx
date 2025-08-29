/**
 * Structured Data Component for Nexus Web
 * Renders JSON-LD structured data for SEO
 */

import { generateJSONLD } from '@/lib/seo/utils';

type StructuredDataProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function StructuredData({ data }: StructuredDataProps) {
  const structuredData = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {structuredData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJSONLD(item)}
        />
      ))}
    </>
  );
}

export default StructuredData;
