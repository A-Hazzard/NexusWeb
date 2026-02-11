'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag } from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateBreadcrumbStructuredData } from '@/lib/seo/utils'
import { SITE_CONFIG } from '@/lib/seo/config'

// Types for portfolio project
type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  description: string;
  client_name: string;
  project_url?: string;
  github_url?: string;
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

// Function to fetch portfolio project by slug
const fetchPortfolioProject = async (slug: string): Promise<PortfolioProject | null> => {
  try {
    const response = await fetch(`/api/portfolio/projects?slug=${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch project data');
    }
    
    const data = await response.json();
    if (data.success && data.data.projects && data.data.projects.length > 0) {
      return data.data.projects[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching portfolio project:', error);
    return null;
  }
}

export default function PortfolioProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const projectData = await fetchPortfolioProject(slug);
        if (projectData) {
          setProject(projectData);
        } else {
          setError('Project not found');
        }
      } catch (error) {
        console.error('Error loading project:', error);
        setError('Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF8A00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/portfolio"
            className="inline-flex items-center px-6 py-3 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF6B00] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Portfolio', url: `${SITE_CONFIG.url}/portfolio` },
    { name: project.title, url: `${SITE_CONFIG.url}/portfolio/${project.slug}` },
  ]);

  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
            <StructuredData
        pageType="portfolio"
        additionalData={[breadcrumbStructuredData]}
      />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={project.featured_image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center text-white/80 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Portfolio
                  </Link>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {project.title}
                </h1>
                
                <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                  {project.excerpt || project.description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-8 mb-8"
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                      <p className="text-lg leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Gallery */}
                  {project.gallery_images && project.gallery_images.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="bg-white rounded-2xl shadow-lg p-8"
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.gallery_images.map((image, index) => (
                          <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                            <Image
                              src={image}
                              alt={`${project.title} - Image ${index + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Project Info Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Project Details</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-600">Client</p>
                            <p className="font-medium text-gray-900">{project.client_name}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-600">Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        {project.start_date && (
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">Started</p>
                              <p className="font-medium text-gray-900">{formatDate(project.start_date)}</p>
                            </div>
                          </div>
                        )}

                        {project.end_date && (
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">Completed</p>
                              <p className="font-medium text-gray-900">{formatDate(project.end_date)}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <Tag className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-600">Views</p>
                            <p className="font-medium text-gray-900">{project.view_count.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Technologies Card */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-2 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white text-sm rounded-lg font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Categories Card */}
                    {project.categories && project.categories.length > 0 && (
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.categories.map((category, index) => (
                            <span
                              key={index}
                              className="px-3 py-2 bg-gray-100 text-gray-800 text-sm rounded-lg font-medium"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Project Links</h3>
                      <div className="space-y-3">
                        {project.project_url && (
                          <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF6B00] transition-colors font-medium"
                          >
                            <ExternalLink className="w-5 h-5" />
                            Visit Live Site
                          </a>
                        )}
                        
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                          >
                            <Github className="w-5 h-5" />
                            View Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss your project requirements and create something extraordinary together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF6B00] transition-colors font-medium text-lg"
                >
                  Get Started
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 hover:border-white/50 transition-colors font-medium text-lg"
                >
                  View More Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
