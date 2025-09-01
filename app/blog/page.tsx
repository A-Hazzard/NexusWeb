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
import { generateBreadcrumbStructuredData } from '@/lib/seo/utils'
import { SITE_CONFIG } from '@/lib/seo/config'

// Breadcrumb structured data
const breadcrumbStructuredData = generateBreadcrumbStructuredData([
  { name: 'Home', url: SITE_CONFIG.url },
  { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
])

const blogPosts = [
  {
    id: 'blog-1',
    title: 'The Complete Guide to E-Commerce in Trinidad & Tobago',
    excerpt: 'Learn how to set up a successful online store in the Caribbean market, including payment processing, shipping, and local regulations.',
    author: 'Aaron Hazzard',
    date: '2024-01-15',
    readTime: '8 min',
    category: 'E-Commerce',
    image: 'https://picsum.photos/600/400?random=500',
    featured: true,
    slug: 'complete-guide-ecommerce-trinidad-tobago'
  },
  {
    id: 'blog-2',
    title: 'Mobile-First Design: Why It Matters for Caribbean Businesses',
    excerpt: 'With 80% of Caribbean users browsing on mobile, discover why mobile-first design is crucial for your business success.',
    author: 'Aaron Hazzard',
    date: '2024-01-10',
    readTime: '6 min',
    category: 'Web Design',
    image: 'https://picsum.photos/600/400?random=501',
    slug: 'mobile-first-design-caribbean-businesses'
  },
  {
    id: 'blog-3',
    title: 'SEO Strategies for Local Trinidad & Tobago Businesses',
    excerpt: 'Boost your local search rankings with these proven SEO strategies tailored for the Trinidad & Tobago market.',
    author: 'Aaron Hazzard',
    date: '2024-01-05',
    readTime: '10 min',
    category: 'SEO',
    image: 'https://picsum.photos/600/400?random=502',
    slug: 'seo-strategies-local-trinidad-tobago-businesses'
  },
  {
    id: 'blog-4',
    title: 'Website Security: Protecting Your Business Online',
    excerpt: 'Essential security measures every business website should implement to protect customer data and maintain trust.',
    author: 'Aaron Hazzard',
    date: '2024-01-01',
    readTime: '7 min',
    category: 'Security',
    image: 'https://picsum.photos/600/400?random=503',
    slug: 'website-security-protecting-business-online'
  },
  {
    id: 'blog-5',
    title: 'Building Trust Online: The Psychology of Web Design',
    excerpt: 'Understanding how design elements influence user trust and conversion rates in the Caribbean market.',
    author: 'Aaron Hazzard',
    date: '2023-12-28',
    readTime: '9 min',
    category: 'Web Design',
    image: 'https://picsum.photos/600/400?random=504',
    slug: 'building-trust-online-psychology-web-design'
  },
  {
    id: 'blog-6',
    title: 'Payment Processing in the Caribbean: A Complete Guide',
    excerpt: 'Everything you need to know about accepting payments online in Trinidad & Tobago and the wider Caribbean region.',
    author: 'Aaron Hazzard',
    date: '2023-12-20',
    readTime: '12 min',
    category: 'E-Commerce',
    image: 'https://picsum.photos/600/400?random=505',
    slug: 'payment-processing-caribbean-complete-guide'
  }
]

const categories = [
  'All Posts',
  'E-Commerce',
  'Web Design',
  'SEO',
  'Security',
  'Business Tips'
]

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanup = initPageAnimations(containerRef)
    return cleanup
  }, [])

  return (
    <SmoothScroll>
      <main ref={containerRef} className="select-none touch-pan-y overscroll-none">
        <StructuredData pageType="blog" additionalData={[breadcrumbStructuredData]} />
        
        {/* Hero Section */}
        <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] flex items-center">
          <ParallaxSection speed={0.5}>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
            </div>
          </ParallaxSection>

          <div className="container mx-auto px-4 relative z-10 py-32">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-500/30 mb-8"
              >
                <span className="text-green-400 font-semibold text-lg">📝 Blog & Insights</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              >
                Web Development
                <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  Insights & Tips
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Stay updated with the latest web development trends, business tips, and digital marketing insights tailored for Caribbean businesses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <Link
                  href="/contact"
                  className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center overflow-hidden"
                >
                  <span className="relative z-10">Subscribe to Updates</span>
                  <motion.svg
                    className="w-6 h-6 ml-3 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-16 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category, index) => (
                  <motion.button
                    key={index}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      index === 0 
                        ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Article
              </h2>
              <p className="text-lg text-gray-600">
                Our most popular and comprehensive guide
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <motion.div
                className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden max-w-6xl mx-auto"
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="relative">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={blogPosts[0].image}
                        alt={blogPosts[0].title}
                        width={600}
                        height={375}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-3 py-1 rounded-full text-sm font-bold">
                      Featured
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-[#FF8A00]/10 to-[#FF4D00]/10 text-[#FF8A00] rounded-full text-sm font-medium">
                        {blogPosts[0].category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {blogPosts[0].readTime} read
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {blogPosts[0].title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {blogPosts[0].author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{blogPosts[0].author}</p>
                          <p className="text-gray-500 text-sm">{blogPosts[0].date}</p>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${blogPosts[0].slug}`}
                        className="inline-flex items-center text-[#FF8A00] font-semibold hover:text-[#FF4D00] transition-colors"
                      >
                        Read More
                        <svg
                          className="w-5 h-5 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-600">
                Stay informed with our latest insights and tips
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogPosts.slice(1).map((post, index) => (
                <ScrollReveal key={post.id} delay={0.1 * index}>
                  <motion.div
                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00]/5 to-[#FF4D00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      {/* Post Image */}
                      <div className="relative mb-4">
                        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={400}
                            height={250}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Post Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                        {post.excerpt}
                      </p>

                      {/* Post Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                            {post.author.charAt(0)}
                          </div>
                          <span>{post.author}</span>
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our newsletter for weekly web development tips, business insights, and exclusive content.
              </p>

              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-[#FF8A00] focus:border-[#FF8A00] transition-all duration-300"
                  />
                  <button className="bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    Subscribe
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </SmoothScroll>
  )
}
