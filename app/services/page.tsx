'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { initPageAnimations } from '@/lib/utils/animations'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ParallaxSection from '@/components/animations/ParallaxSection'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateBreadcrumbStructuredData } from '@/lib/seo/utils'
import { SITE_CONFIG } from '@/lib/seo/config'
import { webDevelopmentStructuredData, seoServiceStructuredData } from '@/app/metadata'

// Breadcrumb structured data
const breadcrumbStructuredData = generateBreadcrumbStructuredData([
  { name: 'Home', url: SITE_CONFIG.url },
  { name: 'Services', url: `${SITE_CONFIG.url}/services` },
])

const services = [
  {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'Custom websites built with modern technologies, responsive design, and optimized performance.',
    features: [
      'Responsive Web Design',
      'Custom Web Applications',
      'E-Commerce Development',
      'Content Management Systems',
      'Progressive Web Apps (PWA)',
      'API Integration'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    price: 'Starting from $2,500 TTD',
    image: 'https://picsum.photos/600/400?random=30',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'seo',
    title: 'SEO & Digital Marketing',
    description: 'Boost your online visibility and drive targeted traffic to your website with our proven SEO strategies.',
    features: [
      'Search Engine Optimization',
      'Local SEO for Trinidad & Tobago',
      'Google Ads Management',
      'Social Media Marketing',
      'Content Marketing',
      'Analytics & Reporting'
    ],
    technologies: ['Google Analytics', 'Search Console', 'SEMrush', 'Facebook Ads', 'Google Ads'],
    price: 'Starting from $1,200 TTD/month',
    image: 'https://picsum.photos/600/400?random=31',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Solutions',
    description: 'Complete online store solutions with secure payment processing and inventory management.',
    features: [
      'Custom E-Commerce Development',
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Processing Systems',
      'Mobile-Optimized Shopping',
      'Multi-Currency Support'
    ],
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Square'],
    price: 'Starting from $4,000 TTD',
    image: 'https://picsum.photos/600/400?random=32',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'maintenance',
    title: 'Website Maintenance & Support',
    description: 'Keep your website secure, updated, and performing optimally with our maintenance services.',
    features: [
      'Regular Security Updates',
      'Performance Optimization',
      'Content Updates',
      'Backup & Recovery',
      '24/7 Technical Support',
      'Uptime Monitoring'
    ],
    technologies: ['cPanel', 'CloudFlare', 'SSL Certificates', 'Monitoring Tools'],
    price: 'Starting from $300 TTD/month',
    image: 'https://picsum.photos/600/400?random=33',
    color: 'from-orange-500 to-red-500'
  }
]

const process = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'We understand your business goals, target audience, and project requirements through detailed consultation.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    step: '02',
    title: 'Design & Prototyping',
    description: 'Create wireframes and mockups to visualize your project before development begins.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2z'
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'Build your project using modern technologies with rigorous testing for quality assurance.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'Deploy your project and provide ongoing support to ensure optimal performance.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  }
]

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanup = initPageAnimations(containerRef)
    return cleanup
  }, [])

  return (
    <SmoothScroll>
      <main ref={containerRef} className="select-none touch-pan-y overscroll-none">
        <StructuredData data={[breadcrumbStructuredData, webDevelopmentStructuredData, seoServiceStructuredData]} />
        {/* Hero Section */}
        <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] flex items-center">
          <ParallaxSection speed={0.5}>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
            </div>
          </ParallaxSection>

          <div className="container mx-auto px-4 relative z-10 py-32">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 mb-8"
              >
                <span className="text-[#FF8A00] font-semibold text-lg">🚀 Our Services</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              >
                Comprehensive
                <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  Digital Solutions
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                From web development to digital marketing, we provide end-to-end solutions to help your Trinidad &amp; Tobago business thrive online.
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
                  <span className="relative z-10">Get Free Quote</span>
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

        {/* Services Grid */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Core Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional web services tailored for businesses in Trinidad &amp; Tobago
              </p>
            </ScrollReveal>

            <div className="space-y-32">
              {services.map((service, index) => (
                <ScrollReveal key={service.id} delay={0.2 * index}>
                  <div id={service.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
                    <div className="flex-1">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`absolute -inset-4 bg-gradient-to-r ${service.color} opacity-20 blur-2xl rounded-3xl`} />
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={600}
                            height={400}
                            className="w-full h-80 object-cover"
                          />
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                          {service.title}
                        </h3>
                        <p className="text-xl text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">What&apos;s Included:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <div className={`w-6 h-6 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 bg-gradient-to-r ${service.color} text-white rounded-full text-sm font-medium`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-6">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{service.price}</div>
                          <div className="text-gray-600">Contact for custom quote</div>
                        </div>
                        <Link
                          href="/contact"
                          className={`bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From concept to launch, we follow a proven process to deliver exceptional results
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <ScrollReveal key={index} delay={0.1 * index}>
                  <motion.div
                    className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-6xl font-bold text-gray-200 mb-4">{step.step}</div>
                    <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Ready to Start Your
                <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  Digital Journey?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Let&apos;s discuss your project and create something amazing together. Get a free consultation today.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 inline-flex items-center justify-center overflow-hidden shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40"
                >
                  <span className="relative z-10">Get Free Consultation</span>
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
                
                <Link
                  href="/portfolio"
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-white/20 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center"
                >
                  View Our Work
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </SmoothScroll>
  )
}
