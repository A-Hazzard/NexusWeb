'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { TimelineItemProps } from '@/lib/types/pageTypes'
import { initPageAnimations } from '@/lib/utils/animations'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateArticleStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/utils'
import { SITE_CONFIG } from '@/lib/seo/config'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ParallaxSection from '@/components/animations/ParallaxSection'
import MouseFollower3D from '@/components/animations/MouseFollower3D'
import SmoothScroll from '@/components/ui/SmoothScroll'

// Import Aaron images for pre-rendering
import aaronImage from '../../public/aaron.jpeg'
import aaron2Image from '../../public/aaron2.jpg'

// Generate structured data for the About page
const aboutStructuredData = generateArticleStructuredData({
  headline: 'About Nexus Web - Expert Web Development Team in Trinidad & Tobago',
  description: 'Meet Aaron Hazzard, Senior Software Engineer and founder of Nexus Web. 5+ years of experience delivering exceptional web solutions.',
  author: 'Aaron Hazzard',
  datePublished: '2025-08-01',
  dateModified: new Date().toISOString(),
  image: aaronImage.src,
  publisher: 'Nexus Web',
  articleSection: 'About Us',
  keywords: ['Aaron Hazzard', 'web development', 'Trinidad and Tobago', 'software engineer'],
})

// Breadcrumb structured data
const breadcrumbStructuredData = generateBreadcrumbStructuredData([
  { name: 'Home', url: SITE_CONFIG.url },
  { name: 'About', url: `${SITE_CONFIG.url}/about` },
])

const timelineItems: TimelineItemProps[] = [
  {
    date: 'August 2025',
    title: 'Nexus Web Founded',
    description: 'Aaron Hazzard establishes Nexus Web as a premier web development agency in Trinidad & Tobago, bringing 5+ years of software engineering expertise to the Caribbean market.'
  },
  {
    date: 'September 2025',
    title: 'First Caribbean Clients',
    description: 'Successfully launched websites for local Trinidad businesses, focusing on responsive design and SEO optimization for the Caribbean market.'
  },
  {
    date: 'October 2025',
    title: 'E-Commerce Expansion',
    description: 'Introduced comprehensive e-commerce solutions with TTD payment integration, helping local businesses establish strong online presence.'
  },
  {
    date: 'November 2025',
    title: 'SEO & Digital Marketing',
    description: 'Expanded services to include advanced SEO and digital marketing, helping Caribbean businesses rank higher in local search results.'
  },
  {
    date: 'Present',
    title: 'Growing Caribbean Presence',
    description: 'Continuing to serve businesses across Trinidad & Tobago and the wider Caribbean region with cutting-edge web solutions and digital marketing.'
  }
]

const stats = [
  { id: 1, number: 5, label: 'Years of Experience', icon: 'calendar' },
  { id: 2, number: 15, label: 'Happy Clients', icon: 'users' },
  { id: 3, number: 25, label: 'Projects Completed', icon: 'project-diagram' },
  { id: 4, number: 100, label: 'Websites Optimized', icon: 'chart-line' }
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanup = initPageAnimations(containerRef)
    return cleanup
  }, [])

  return (
    <SmoothScroll>
      <main ref={containerRef} className="select-none touch-pan-y overscroll-none">
        <StructuredData pageType="about" additionalData={[aboutStructuredData, breadcrumbStructuredData]} />
        
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] flex items-center">
          <ParallaxSection speed={0.5}>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-2xl"></div>
            </div>
          </ParallaxSection>

          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center lg:text-left"
              >
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Meet <span className="bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] bg-clip-text text-transparent">Aaron Hazzard</span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Senior Software Engineer & Founder of Nexus Web
                </motion.p>
                
                <motion.p 
                  className="text-lg text-gray-400 mb-8 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  With 5+ years of software engineering expertise, I founded Nexus Web in August 2025 to bring world-class web development services to Trinidad & Tobago and the Caribbean region.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Link
                    href="/contact"
                    className="group relative px-8 py-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                  >
                    <span className="relative z-10">Get In Touch</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] to-[#FF8A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  
                  <Link
                    href="/portfolio"
                    className="group px-8 py-4 border-2 border-[#FF8A00] text-[#FF8A00] font-semibold rounded-full transition-all duration-300 hover:bg-[#FF8A00] hover:text-white hover:scale-105"
                  >
                    View My Work
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <MouseFollower3D>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                      <Image
                        src={aaronImage}
                        alt="Aaron Hazzard - Founder of Nexus Web"
                        width={400}
                        height={500}
                        className="w-full h-auto rounded-xl"
                      />
                      
                      {/* Floating Achievement Badges */}
                      <motion.div
                        className="absolute -top-4 -right-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        5+ Years Experience
                      </motion.div>
                      
                      <motion.div
                        className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      >
                        Trinidad & Tobago
                      </motion.div>
                    </div>
                  </div>
                </MouseFollower3D>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#FF8A00]/20 to-[#FF4D00]/20 rounded-2xl blur-2xl"></div>
                    <MouseFollower3D>
                      <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-2xl border border-gray-100">
                        <Image
                          src={aaron2Image}
                          alt="Aaron Hazzard - Nexus Web Mission and Web Development Excellence"
                          width={600}
                          height={400}
                          className="w-full h-auto rounded-xl"
                        />
                      </div>
                    </MouseFollower3D>
                  </motion.div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <motion.span 
                    className="inline-block px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Our Mission
                  </motion.span>
                  
                  <motion.h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Empowering Caribbean <span className="text-[#FF8A00]">Businesses</span> Online
                  </motion.h2>
                  
                  <motion.p 
                    className="text-lg text-gray-600 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    My mission is simple: to help Trinidad & Tobago businesses thrive in the digital world. 
                    With deep technical expertise and understanding of the local market, I create web solutions 
                    that drive real results and connect Caribbean businesses with their customers.
                  </motion.p>

                  <div className="space-y-4">
                    {[
                      { icon: '🎯', title: 'Local Market Focus', desc: 'Understanding Trinidad & Tobago business needs' },
                      { icon: '⚡', title: 'Modern Technology', desc: 'Latest web technologies and best practices' },
                      { icon: '🤝', title: 'Personal Service', desc: 'Direct communication with the founder' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <motion.span 
                  className="inline-block px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  My Journey
                </motion.span>
                
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  From Vision to <span className="text-[#FF8A00]">Reality</span>
                </motion.h2>
                
                <motion.p 
                  className="text-xl text-gray-600 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  The story of how Nexus Web came to life and our growth in the Caribbean market
                </motion.p>
              </div>
            </ScrollReveal>
            
            {/* Timeline items */}
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#FF8A00] to-[#FF4D00]" />
              
              {timelineItems.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <motion.div 
                    className="timeline-item relative mb-12 md:mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Timeline Dot */}
                    <motion.div 
                      className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -mt-2"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-start md:items-center pl-16 md:pl-0`}>
                      <div className="w-full md:w-1/2" />
                      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                        <motion.div 
                          className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
                          whileHover={{ y: -5, scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-[#FF8A00] font-bold text-lg">{item.date}</span>
                          <h3 className="text-xl md:text-2xl font-bold mt-3 mb-4 text-gray-900">{item.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <motion.span 
                  className="inline-block px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  By The Numbers
                </motion.span>
                
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Proven <span className="text-[#FF8A00]">Results</span>
                </motion.h2>
                
                <motion.p 
                  className="text-xl text-gray-600 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  The impact of dedication, expertise, and a passion for helping Caribbean businesses succeed
                </motion.p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <ScrollReveal key={stat.id} delay={index * 0.1}>
                  <motion.div 
                    className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300"
                    whileHover={{ y: -10, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={`fas fa-${stat.icon} text-2xl text-white`} />
                    </motion.div>
                    
                    <motion.div 
                      className="text-4xl md:text-5xl font-bold text-[#FF8A00] mb-3"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    >
                      {stat.number}+
                    </motion.div>
                    
                    <p className="text-gray-600 font-semibold">{stat.label}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
          <ParallaxSection speed={0.3}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#FF8A00]/30 to-[#FF4D00]/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
            </div>
          </ParallaxSection>

          <div className="container relative z-10 mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-4xl mx-auto">
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Ready to Transform Your <span className="text-[#FF8A00]">Business</span>?
                </motion.h2>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Let&apos;s discuss how we can elevate your digital presence and drive real results for your Trinidad & Tobago business.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                  <Link
                    href="/contact"
                    className="group relative px-8 py-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                  >
                    <span className="relative z-10">Start Your Project</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] to-[#FF8A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  
                  <Link
                    href="/services"
                    className="group px-8 py-4 border-2 border-[#FF8A00] text-[#FF8A00] font-bold rounded-full transition-all duration-300 hover:bg-[#FF8A00] hover:text-white hover:scale-105"
                  >
                    View Services
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-300"
                >
                  <div className="flex items-center gap-3">
                    <i className="fas fa-envelope text-[#FF8A00]"></i>
                    <span>nexuswebtt@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-phone text-[#FF8A00]"></i>
                    <span>+1 (868) 352-1435</span>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </SmoothScroll>
  )
} 