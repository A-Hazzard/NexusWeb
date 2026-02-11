'use client'

import { useEffect, useRef, useState } from 'react'
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
import PageViewTracker from '@/components/analytics/PageViewTracker'

// Types for portfolio data
type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  description: string;
  client_name: string;
  project_url?: string;
  status: 'in-progress' | 'completed' | 'on-hold';
  featured: boolean;
  start_date?: string;
  end_date?: string;
  featured_image: string;
  gallery_images?: string[];
  meta_title: string;
  meta_description: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  technologies?: string[];
  categories?: string[];
}

type PortfolioItem = {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  link: string;
  stats: Record<string, string>;
}

// Breadcrumb structured data
const breadcrumbStructuredData = generateBreadcrumbStructuredData([
  { name: 'Home', url: SITE_CONFIG.url },
  { name: 'Portfolio', url: `${SITE_CONFIG.url}/portfolio` },
])

// Static fallback data
const staticPortfolioItems: PortfolioItem[] = [
  {
    title: 'Digital Utopia',
    description: 'A secure and scalable copy trading platform with real-time data integration and advanced user security for modern finance.',
    imageUrl: "/port1.png",
    technologies: ['Next.js', 'Firebase', 'Real-time Data', 'Tailwind CSS'],
    category: 'Finance',
    link: '#',
    stats: {}
  },
  {
    title: 'OurLime',
    description: 'A revolutionary community networking platform blending social interaction with project management and secure marketplaces.',
    imageUrl: "/port3.png",
    technologies: ['Next.js', 'Firebase', 'AI Integration', '3D UI'],
    category: 'Social Media',
    link: '#',
    stats: {}
  },
  {
    title: 'Uptech Incorp',
    description: 'Corporate digital presence and innovation hub for Uptech Incorporated, showcasing technological excellence in the Caribbean.',
    imageUrl: "/uptech.png",
    technologies: ['Next.js', 'Firebase', 'Framer Motion', 'GSAP'],
    category: 'Business',
    link: '#',
    stats: {}
  },
  {
    title: 'Noblis Talent Solution',
    description: 'A strategic platform for talent management and organizational growth, aligning corporate culture with digital innovation.',
    imageUrl: "/nobilis.png",
    technologies: ['Next.js', 'Firebase', 'TypeScript', 'Tailwind CSS'],
    category: 'Business',
    link: '#',
    stats: {}
  },
  {
    title: 'CelebFit Life',
    description: 'Premium fitness platform for elite celebrity training programs, featuring high-conversion booking and specialized cohorts.',
    imageUrl: "/celeb.png",
    technologies: ['Next.js', 'Firebase', 'Stripe', 'Real-time'],
    category: 'Entertainment',
    link: '#',
    stats: {}
  },
  {
    title: 'Listwa Collective',
    description: 'Dynamic media portfolio and content showcase for Caribbean documentary work, blending culture with high-end digital narratives.',
    imageUrl: "/listwa.png",
    technologies: ['Next.js', 'Firebase', 'Video API', 'Framer Motion'],
    category: 'Digital Media',
    link: '#',
    stats: {}
  }
]

// Function to transform API data to portfolio items
const transformPortfolioData = (projects: PortfolioProject[]): PortfolioItem[] => {
  return projects.map(project => {
    // Generate stats based on project data
    const stats: Record<string, string> = {
      status: project.status.charAt(0).toUpperCase() + project.status.slice(1),
      views: `${project.view_count}+`,
      client: project.client_name
    };

    // Add completion date if available
    if (project.end_date) {
      const endDate = new Date(project.end_date);
      const year = endDate.getFullYear();
      stats.year = year.toString();
    }

    return {
      title: project.title,
      description: project.excerpt || project.description,
      imageUrl: project.featured_image || "https://picsum.photos/800/600?random=1",
      technologies: project.technologies || ['Next.js', 'Firebase'],
      category: project.categories?.[0] || 'Web Development',
      link: `/portfolio/${project.slug}`,
      stats
    };
  });
};

// Function to fetch portfolio data from API
const fetchPortfolioData = async (): Promise<PortfolioItem[] | null> => {
  try {
    const response = await fetch('/api/portfolio/projects?featured=true&limit=10');
    if (!response.ok) {
      throw new Error('Failed to fetch portfolio data');
    }

    const data = await response.json();
    if (data.success && data.data.projects && data.data.projects.length > 0) {
      return transformPortfolioData(data.data.projects);
    }

    return null;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return null;
  }
}

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(staticPortfolioItems)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const cleanup = initPageAnimations(containerRef)

    // Fetch portfolio data
    const loadPortfolioData = async () => {
      setIsLoading(true)
      try {
        const dynamicData = await fetchPortfolioData()
        if (dynamicData && dynamicData.length > 0) {
          setPortfolioItems(dynamicData)
        } else {
          // Use static data as fallback
          setPortfolioItems(staticPortfolioItems)
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error)
        // Use static data as fallback
        setPortfolioItems(staticPortfolioItems)
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolioData()

    return cleanup
  }, [])

  return (
    <SmoothScroll>
      <main ref={containerRef} className="select-none touch-pan-y overscroll-none">
        <StructuredData pageType="portfolio" additionalData={[breadcrumbStructuredData]} />
        <PageViewTracker entityType="page" entityId="/portfolio" />

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
                className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-3xl mx-auto mt-12"
              >
                {[
                  { number: "100+", label: "Projects Delivered" },
                  { number: "5+", label: "Years Experience" },
                  { number: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + 0.1 * index }}
                  >
                    <div className="text-4xl md:text-5xl font-bold text-[#FF8A00] mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide uppercase italic">
                      {stat.label}
                    </p>
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
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <ScrollReveal key={`loading-${index}`} delay={0.1 * index}>
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">
                      <div className="aspect-[4/3] bg-gray-200"></div>
                      <div className="p-8">
                        <div className="h-8 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="h-12 bg-gray-200 rounded"></div>
                          <div className="h-12 bg-gray-200 rounded"></div>
                          <div className="h-12 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))
              ) : portfolioItems.length === 0 ? (
                // No results
                <div className="md:col-span-2 text-center py-16">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
                </div>
              ) : (
                portfolioItems.map((project, index) => (
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

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white text-xs px-3 py-1 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))
              )}
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
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-white/20 hover:border-white/50 transition-colors duration-300 inline-flex items-center justify-center"
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