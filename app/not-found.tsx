'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { initPageAnimations } from '@/lib/utils/animations'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ParallaxSection from '@/components/animations/ParallaxSection'
import SmoothScroll from '@/components/ui/SmoothScroll'

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanup = initPageAnimations(containerRef)
    return cleanup
  }, [])

  return (
    <SmoothScroll>
      <main ref={containerRef} className="select-none touch-pan-y overscroll-none">
        {/* Hero Section */}
        <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] flex items-center">
          <ParallaxSection speed={0.5}>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
            </div>
          </ParallaxSection>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 mb-8"
              >
                <span className="text-red-400 font-semibold text-lg">🚫 Page Not Found</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-white mb-8 leading-none"
              >
                404
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
              >
                Oops! This page seems to have
                <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  disappeared
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Don&apos;t worry, even the best websites have a few missing pages. Let&apos;s get you back on track to finding what you&apos;re looking for.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              >
                <Link
                  href="/"
                  className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center overflow-hidden shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40"
                >
                  <span className="relative z-10">Go Home</span>
                  <motion.svg
                    className="w-6 h-6 ml-3 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </motion.svg>
                </Link>
                
                <Link
                  href="/contact"
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center"
                >
                  Contact Support
                  <motion.svg
                    className="w-6 h-6 ml-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </motion.svg>
                </Link>
              </motion.div>

              {/* Popular Pages */}
              <ScrollReveal>
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-8">Popular Pages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: 'Our Services', description: 'Web development, SEO, and more', href: '/services', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                      { title: 'About Us', description: 'Meet the team behind Nexus Web', href: '/about', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                      { title: 'Contact', description: 'Get in touch with our team', href: '/contact', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
                    ].map((page, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                      >
                        <Link
                          href={page.href}
                          className="group block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-xl flex items-center justify-center mr-4">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={page.icon} />
                              </svg>
                            </div>
                            <h4 className="text-xl font-bold text-white group-hover:text-[#FF8A00] transition-colors">
                              {page.title}
                            </h4>
                          </div>
                          <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                            {page.description}
                          </p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Fun Facts Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Did You Know?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                While you&apos;re here, here are some interesting facts about web development and our services
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                  title: 'Fast Loading',
                  description: 'Our websites load in under 2 seconds, improving user experience and SEO rankings.'
                },
                {
                  icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
                  title: 'Mobile First',
                  description: '80% of Caribbean users browse on mobile, so we design mobile-first for better results.'
                },
                {
                  icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                  title: 'Secure & Reliable',
                  description: 'All our websites come with SSL certificates and 99.9% uptime guarantee.'
                }
              ].map((fact, index) => (
                <ScrollReveal key={index} delay={0.1 * index}>
                  <motion.div
                    className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={fact.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{fact.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{fact.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SmoothScroll>
  )
}
