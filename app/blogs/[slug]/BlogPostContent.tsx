'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { initPageAnimations } from '@/lib/utils/animations'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ParallaxSection from '@/components/animations/ParallaxSection'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateBreadcrumbStructuredData, generateArticleStructuredData } from '@/lib/seo/utils'
import { SITE_CONFIG } from '@/lib/seo/config'

// Comprehensive recursive HTML decoder to handle double/triple-escaped data from Firestore
const decodeHTMLEntities = (text: string): string => {
  if (!text) return '';

  const entities: { [key: string]: string } = {
    '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ',
    '&ldquo;': '"', '&rdquo;': '"', '&lsquo;': "'", '&rsquo;': "'", '&ndash;': '-', '&mdash;': '—'
  };

  const decoded = text.replace(/&[a-z0-9#]+;/gi, (match) => entities[match.toLowerCase()] || match);

  // If we still see common entities after decoding, run it again (recursive check)
  if (decoded !== text && decoded.includes('&')) {
    return decodeHTMLEntities(decoded);
  }

  return decoded;
};

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  slug: string;
  readTime: string;
}

interface BlogPostContentProps {
  post: BlogPost | null;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanup = initPageAnimations(containerRef)
    return cleanup
  }, [])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog" className="text-[#FF8A00] hover:text-[#FF4D00] font-semibold">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  // Pre-process content to handle potential escaping
  const safeContent = decodeHTMLEntities(post.content);
  const safeTitle = decodeHTMLEntities(post.title);
  const safeExcerpt = decodeHTMLEntities(post.excerpt);

  // Generate structured data for the blog post
  const articleStructuredData = generateArticleStructuredData({
    headline: safeTitle,
    description: safeExcerpt,
    author: post.author,
    datePublished: post.date,
    dateModified: post.date,
    image: post.image,
    publisher: 'Nexus Web',
    articleSection: post.category,
    keywords: [post.category, 'Trinidad and Tobago', 'web development', 'business'],
  })

  // Breadcrumb structured data
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
    { name: post.title, url: `${SITE_CONFIG.url}/blog/${post.slug}` },
  ])

  return (
    <SmoothScroll>
      <main ref={containerRef} className="select-none touch-pan-y overscroll-none">
        <StructuredData pageType="blog" additionalData={[articleStructuredData, breadcrumbStructuredData]} />

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
          <ParallaxSection speed={0.5}>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
            </div>
          </ParallaxSection>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-500/30 mb-8"
              >
                <span className="text-green-400 font-semibold text-lg">📝 {post.category}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
              >
                {safeTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-300 mb-8 leading-relaxed"
              >
                {safeExcerpt}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap items-center gap-6 text-gray-300"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{post.author}</p>
                    <p className="text-sm text-gray-400">{post.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">{post.readTime} read</span>
                  <Link
                    href="/blog"
                    className="text-[#FF8A00] hover:text-[#FF4D00] font-semibold text-sm"
                  >
                    ← Back to Blog
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
                  <article
                    className="prose prose-lg md:prose-xl max-w-none nexus-blog-content prose-orange"
                    dangerouslySetInnerHTML={{ __html: safeContent }}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <style jsx global>{`
          .nexus-blog-content {
            color: #374151 !important;
          }
          .nexus-blog-content h1 {
            font-size: 2.25rem;
            font-weight: 800;
            margin: 2rem 0 1.5rem;
            color: #111827;
            line-height: 1.2;
          }
          .nexus-blog-content h2 {
            font-size: 1.875rem;
            font-weight: 700;
            margin: 2rem 0 1.25rem;
            color: #111827;
            line-height: 1.3;
          }
          .nexus-blog-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 1.75rem 0 1rem;
            color: #111827;
          }
          .nexus-blog-content p {
            margin-bottom: 1.5rem;
            line-height: 1.8;
          }
          .nexus-blog-content ul {
            list-style-type: disc !important;
            padding-left: 1.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          .nexus-blog-content ol {
            list-style-type: decimal !important;
            padding-left: 1.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          .nexus-blog-content li {
            margin-bottom: 0.5rem;
          }
          .nexus-blog-content strong {
            font-weight: 700;
            color: #111827;
          }
          .nexus-blog-content blockquote {
            border-left: 4px solid #FF8A00 !important;
            padding-left: 1.5rem !important;
            font-style: italic !important;
            color: #4b5563 !important;
            margin: 2rem 0 !important;
          }
          .nexus-blog-content img {
            max-width: 100% !important;
            height: auto !important;
            border-radius: 1rem !important;
            margin: 2.5rem auto !important;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
            display: block;
          }
          .nexus-blog-content iframe, 
          .nexus-blog-content video {
            width: 100% !important;
            aspect-ratio: 16 / 9;
            border-radius: 1rem;
            margin-top: 2.5rem;
            margin-bottom: 2.5rem;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            overflow: hidden;
            border: 1px solid rgba(0,0,0,0.05);
          }
        `}</style>

        {/* Author Bio */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">About {post.author}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Aaron Hazzard is the founder of Nexus Web, a leading web development agency in Trinidad & Tobago.
                        With over 5 years of experience in software engineering, Aaron specializes in creating digital
                        solutions that help Caribbean businesses thrive online.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center text-[#FF8A00] font-semibold hover:text-[#FF4D00] transition-colors"
                      >
                        Get in Touch
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Related Posts - TODO: Re-implement with Firestore query */}
        {/* <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
             ...
          </div>
        </section> */}
      </main>
    </SmoothScroll>
  )
}
