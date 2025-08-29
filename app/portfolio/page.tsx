'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { initPageAnimations } from '@/lib/utils/animations'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ParallaxSection from '@/components/animations/ParallaxSection'
import MouseFollower3D from '@/components/animations/MouseFollower3D'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateBreadcrumbStructuredData } from '@/lib/seo/utils'
import { SITE_CONFIG } from '@/lib/seo/config'

// Breadcrumb structured data
const breadcrumbStructuredData = generateBreadcrumbStructuredData([
  { name: 'Home', url: SITE_CONFIG.url },
  { name: 'Portfolio', url: `${SITE_CONFIG.url}/portfolio` },
])

const portfolioItems = [
  {
    title: 'Caribbean Resort & Spa',
    description: 'Luxury resort website with booking system, virtual tours, and multilingual support for international guests.',
    imageUrl: "/port1.png",
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
    category: 'Hospitality',
    link: '#',
    stats: { visitors: '250K+', conversion: '12.5%', performance: '98/100' }
  },
  {
    title: 'TT Local Business Directory',
    description: 'Comprehensive business directory for Trinidad & Tobago with advanced search, reviews, and location mapping.',
    imageUrl: "/port2.png",
    technologies: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
    category: 'Business Directory',
    link: '#',
    stats: { businesses: '1,500+', users: '50K+', reviews: '10K+' }
  },
  {
    title: 'Caribbean E-Commerce Platform',
    description: 'Multi-vendor marketplace supporting TTD payments, local delivery, and Caribbean-wide shipping solutions.',
    imageUrl: "/port3.png",
    technologies: ['Next.js', 'Shopify API', 'PayPal', 'Tailwind CSS'],
    category: 'E-Commerce',
    link: '#',
    stats: { sales: '$500K+', vendors: '200+', orders: '15K+' }
  },
  {
    title: 'Trinidad Medical Center',
    description: 'Healthcare management system with appointment booking, patient records, and telemedicine capabilities.',
    imageUrl: "https://picsum.photos/800/600?random=40",
    technologies: ['React', 'Express.js', 'PostgreSQL', 'Socket.io'],
    category: 'Healthcare',
    link: '#',
    stats: { patients: '5K+', appointments: '20K+', satisfaction: '96%' }
  },
  {
    title: 'TT Real Estate Portal',
    description: 'Property listing platform with virtual tours, mortgage calculators, and agent management system.',
    imageUrl: "https://picsum.photos/800/600?random=41",
    technologies: ['Next.js', 'Sanity CMS', 'Mapbox', 'Framer Motion'],
    category: 'Real Estate',
    link: '#',
    stats: { properties: '2K+', agents: '150+', inquiries: '8K+' }
  },
  {
    title: 'Caribbean Food Delivery',
    description: 'Food delivery platform connecting local restaurants with customers across Trinidad & Tobago.',
    imageUrl: "https://picsum.photos/800/600?random=42",
    technologies: ['React Native', 'Firebase', 'Stripe', 'Google Maps'],
    category: 'Food & Delivery',
    link: '#',
    stats: { restaurants: '300+', orders: '25K+', rating: '4.8/5' }
  }
]



export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanup = initPageAnimations(containerRef)
    return cleanup
  }, [])

  return (
    <SmoothScroll>
      <main ref={containerRef} className="select-none touch-pan-y overscroll-none">
        <StructuredData data={[breadcrumbStructuredData]} />
        {/* Hero Section */}
        <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] flex items-center">
          <ParallaxSection speed={0.5}>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"></div>
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
                <span className="text-[#FF8A00] font-semibold text-lg">🚀 Our Portfolio</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              >
                Transforming Ideas Into
                <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  Digital Success
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Explore our portfolio of successful projects across Trinidad &amp; Tobago and the Caribbean, showcasing cutting-edge web solutions that drive real business results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
              >
                {[
                  { number: "50+", label: "Projects" },
                  { number: "30+", label: "Happy Clients" },
                  { number: "6", label: "Industries" },
                  { number: "100%", label: "Success Rate" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + 0.1 * index }}
                  >
                    <div className="text-3xl font-bold text-[#FF8A00] mb-2">{stat.number}</div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each project represents a unique challenge solved with innovative technology and creative design, delivering measurable results for our Caribbean clients.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {portfolioItems.map((project, index) => (
                <ScrollReveal key={index} delay={0.1 * index}>
                  <motion.div
                    className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MouseFollower3D className="cursor-pointer" strength={8}>
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                          <span className="text-sm font-semibold text-gray-800">{project.category}</span>
                        </div>

                        {/* Tech Stack */}
                        <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </MouseFollower3D>

                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF8A00] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                        {Object.entries(project.stats).map(([key, value], statIndex) => (
                          <div key={statIndex} className="text-center">
                            <div className="text-lg font-bold text-[#FF8A00]">{value}</div>
                            <div className="text-xs text-gray-600 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 2).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white text-xs px-3 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={project.link}
                          className="inline-flex items-center text-[#FF8A00] font-semibold hover:text-[#FF4D00] transition-colors group"
                        >
                          View Case Study
                          <motion.svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </motion.svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Ready to Create Your
                <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  Success Story?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join our portfolio of successful Caribbean businesses. Let&apos;s discuss your project and create something extraordinary together.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 inline-flex items-center justify-center overflow-hidden shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40"
                >
                  <span className="relative z-10">Start Your Project</span>
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
                  href="/services"
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-white/20 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center"
                >
                  View Our Services
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </SmoothScroll>
  )
} 