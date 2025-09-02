'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Code, 
  Image as ImageIcon, 
  Download,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react'
import { SchemaBuilder } from '@/lib/seo/schemaBuilder'
import { SEOAnalyzer, SEOAnalysis, SEORecommendation } from '@/lib/seo/seoAnalyzer'
import { ImageOptimizer } from '@/lib/performance/imageOptimizer'

// Types
interface SEOTab {
  id: string
  label: string
  icon: React.ReactNode
  description: string
}

interface SchemaFormData {
  type: 'organization' | 'website' | 'localBusiness' | 'article' | 'breadcrumb' | 'faq' | 'portfolioProject' | 'service'
  enabled: boolean
  customData?: Record<string, unknown>
}

interface OptimizedImage {
  format: string
  originalSize: number
  fileSize: number
}

interface ArticleData {
  headline: string
  description: string
  image: string
  authorName: string
  authorUrl?: string
  datePublished: string
  dateModified: string
  url: string
  articleSection?: string
  keywords?: string[]
  wordCount?: number
  timeRequired?: string
}

interface ImageOptimizationReport {
  totalImages: number
  averageCompressionRatio: number
  recommendations: string[]
}

interface ImageOptimizationData {
  images: OptimizedImage[]
  report: ImageOptimizationReport
}

export default function SEOToolsPage() {
  const [activeTab, setActiveTab] = useState('schema')
  const [schemaForms, setSchemaForms] = useState<SchemaFormData[]>([
    { type: 'organization', enabled: true },
    { type: 'website', enabled: true },
    { type: 'localBusiness', enabled: true },
    { type: 'article', enabled: false },
    { type: 'breadcrumb', enabled: false },
    { type: 'faq', enabled: false },
    { type: 'portfolioProject', enabled: false },
    { type: 'service', enabled: false }
  ])
  const [generatedSchema, setGeneratedSchema] = useState<string>('')
  const [seoAnalysis, setSeoAnalysis] = useState<SEOAnalysis | null>(null)
  const [imageOptimization, setImageOptimization] = useState<ImageOptimizationData | null>(null)

  const tabs: SEOTab[] = [
    {
      id: 'schema',
      label: 'Schema Builder',
      icon: <Code className="w-5 h-5" />,
      description: 'Generate structured data markup for better search engine understanding'
    },
    {
      id: 'analyzer',
      label: 'SEO Analyzer',
      icon: <Search className="w-5 h-5" />,
      description: 'Analyze your content for SEO optimization opportunities'
    },
    {
      id: 'performance',
      label: 'Performance Tools',
      icon: <Zap className="w-5 h-5" />,
      description: 'Optimize images and improve page loading speed'
    }
  ]

  // Schema Builder Functions
  const generateSchema = () => {
    const enabledSchemas = schemaForms.filter(form => form.enabled)
    const schemas: unknown[] = []

    enabledSchemas.forEach(form => {
      switch (form.type) {
        case 'organization':
          schemas.push(SchemaBuilder.organization())
          break
        case 'website':
          schemas.push(SchemaBuilder.website())
          break
        case 'localBusiness':
          schemas.push(SchemaBuilder.localBusiness())
          break
        case 'article':
          if (form.customData) {
            const customData = form.customData as Record<string, unknown>
            if (customData.headline && customData.description && customData.image && customData.authorName && customData.datePublished && customData.dateModified && customData.url) {
              const articleData: ArticleData = {
                headline: customData.headline as string,
                description: customData.description as string,
                image: customData.image as string,
                authorName: customData.authorName as string,
                authorUrl: customData.authorUrl as string | undefined,
                datePublished: customData.datePublished as string,
                dateModified: customData.dateModified as string,
                url: customData.url as string,
                articleSection: customData.articleSection as string | undefined,
                keywords: customData.keywords as string[] | undefined,
                wordCount: customData.wordCount as number | undefined,
                timeRequired: customData.timeRequired as string | undefined
              }
              schemas.push(SchemaBuilder.article(articleData))
            }
          }
          break
        case 'breadcrumb':
          if (form.customData?.items) {
            const items = form.customData.items as Array<{ name: string; url: string }>
            if (Array.isArray(items) && items.every(item => item.name && item.url)) {
              schemas.push(SchemaBuilder.breadcrumb(items))
            }
          }
          break
        case 'faq':
          if (form.customData?.questions) {
            const questions = form.customData.questions as Array<{ question: string; answer: string }>
            if (Array.isArray(questions) && questions.every(q => q.question && q.answer)) {
              schemas.push(SchemaBuilder.faq(questions))
            }
          }
          break
        case 'portfolioProject':
          if (form.customData) {
            const projectData = form.customData as Record<string, unknown>
            if (projectData.name && projectData.description && projectData.image && projectData.url && projectData.dateCreated && projectData.dateModified && projectData.genre && projectData.keywords && projectData.about) {
              const portfolioData = {
                name: projectData.name as string,
                description: projectData.description as string,
                image: projectData.image as string,
                url: projectData.url as string,
                dateCreated: projectData.dateCreated as string,
                dateModified: projectData.dateModified as string,
                genre: projectData.genre as string[],
                keywords: projectData.keywords as string[],
                about: projectData.about as Array<{ name: string; description: string }>,
                offers: projectData.offers as { price: string; priceCurrency: string; availability: string } | undefined
              }
              schemas.push(SchemaBuilder.portfolioProject(portfolioData))
            }
          }
          break
        case 'service':
          if (form.customData) {
            const serviceData = form.customData as Record<string, unknown>
            if (serviceData.name && serviceData.description && serviceData.areaServed && serviceData.serviceType && serviceData.price && serviceData.priceCurrency && serviceData.availability) {
              const service = {
                name: serviceData.name as string,
                description: serviceData.description as string,
                areaServed: serviceData.areaServed as string[],
                serviceType: serviceData.serviceType as string,
                price: serviceData.price as string,
                priceCurrency: serviceData.priceCurrency as string,
                availability: serviceData.availability as string
              }
              schemas.push(SchemaBuilder.service(service))
            }
          }
          break
      }
    })

    setGeneratedSchema(JSON.stringify(schemas, null, 2))
  }

  const copySchema = () => {
    navigator.clipboard.writeText(generatedSchema)
    // Show success message
  }

  // SEO Analyzer Functions
  const analyzeContent = async (content: string) => {
    const analyzer = new SEOAnalyzer(['web development', 'trinidad', 'caribbean'], 'Nexus Web')
    
    // Mock data for analysis
    const analysisData = {
      title: 'Web Development Services in Trinidad & Tobago',
      description: 'Professional web development services for Caribbean businesses. Get started with modern web solutions.',
      content: content,
      images: [
        { alt: 'Web development', src: '/image1.jpg' },
        { alt: 'Mobile app development', src: '/image2.jpg' }
      ],
      links: [
        { href: '/services', text: 'Our Services', isInternal: true },
        { href: '/portfolio', text: 'Portfolio', isInternal: true },
        { href: 'https://google.com', text: 'Google', isInternal: false }
      ],
      hasSchema: true,
      hasCanonical: true,
      hasSitemap: true
    }

    const analysis = analyzer.analyzePage(analysisData)
    setSeoAnalysis(analysis)
  }

  // Performance Tools Functions
  const optimizeImages = async (imageUrls: string[]) => {
    const optimizedImages = await ImageOptimizer.optimizeImages(imageUrls, {
      quality: 85,
      format: 'webp',
      lazy: true,
      placeholder: true
    })

    const report = ImageOptimizer.generateReport(optimizedImages)
    setImageOptimization({ images: optimizedImages, report })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SEO & Performance Tools</h1>
            <p className="text-gray-600 mt-2">
              Optimize your website for search engines and improve performance
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#FF8A00] text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Schema Builder Tab */}
          {activeTab === 'schema' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Schema Markup Builder</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Schema Configuration */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Configure Schemas</h3>
                  
                  <div className="space-y-4">
                    {schemaForms.map((form, index) => (
                      <div key={form.type} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={form.type}
                            checked={form.enabled}
                            onChange={(e) => {
                              const newForms = [...schemaForms]
                              newForms[index].enabled = e.target.checked
                              setSchemaForms(newForms)
                            }}
                            className="w-4 h-4 text-[#FF8A00] border-gray-300 rounded focus:ring-[#FF8A00]"
                          />
                          <label htmlFor={form.type} className="font-medium text-gray-900 capitalize">
                            {form.type.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                        </div>
                        
                        {form.enabled && ['article', 'breadcrumb', 'faq', 'portfolioProject', 'service'].includes(form.type) && (
                          <button
                            onClick={() => {/* Open custom data form */}}
                            className="text-sm text-[#FF8A00] hover:text-[#FF6B00]"
                          >
                            Configure
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={generateSchema}
                    className="mt-6 w-full bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors font-medium"
                  >
                    Generate Schema Markup
                  </button>
                </div>

                {/* Generated Schema */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Generated Schema</h3>
                    {generatedSchema && (
                      <button
                        onClick={copySchema}
                        className="text-sm text-[#FF8A00] hover:text-[#FF6B00] flex items-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>Copy</span>
                      </button>
                    )}
                  </div>
                  
                  {generatedSchema ? (
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                      {generatedSchema}
                    </pre>
                  ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Schema markup will appear here after generation</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* SEO Analyzer Tab */}
          {activeTab === 'analyzer' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">SEO Content Analyzer</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Content Input */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyze Content</h3>
                  
                  <textarea
                    placeholder="Paste your content here to analyze..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent resize-none"
                    onChange={(e) => analyzeContent(e.target.value)}
                  />
                  
                  <button
                    onClick={() => analyzeContent('Sample content for analysis...')}
                    className="mt-4 bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors font-medium"
                  >
                    Analyze Content
                  </button>
                </div>

                {/* Analysis Results */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
                  
                  {seoAnalysis ? (
                    <div className="space-y-4">
                      {/* Overall Score */}
                      <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                        <div className="text-4xl font-bold mb-2">{seoAnalysis.score}/100</div>
                        <div className="text-lg">SEO Score</div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-[#FF8A00]">{seoAnalysis.metrics.title.score}</div>
                          <div className="text-sm text-gray-600">Title</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-[#FF8A00]">{seoAnalysis.metrics.description.score}</div>
                          <div className="text-sm text-gray-600">Description</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-[#FF8A00]">{seoAnalysis.metrics.content.score}</div>
                          <div className="text-sm text-gray-600">Content</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-[#FF8A00]">{seoAnalysis.metrics.images.score}</div>
                          <div className="text-sm text-gray-600">Images</div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                        <div className="space-y-2">
                          {seoAnalysis.recommendations.slice(0, 5).map((rec: SEORecommendation, index: number) => (
                            <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                              {rec.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />}
                              {rec.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />}
                              {rec.type === 'info' && <Info className="w-5 h-5 text-blue-500 mt-0.5" />}
                              <div>
                                <div className="font-medium text-gray-900">{rec.message}</div>
                                {rec.fix && <div className="text-sm text-gray-600">{rec.fix}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Analysis results will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Performance Tools Tab */}
          {activeTab === 'performance' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Optimization Tools</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Optimization */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Optimization</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URLs (one per line)
                      </label>
                      <textarea
                        placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent resize-none"
                        onChange={(e) => {
                          const urls = e.target.value.split('\n').filter(url => url.trim())
                          if (urls.length > 0) {
                            optimizeImages(urls)
                          }
                        }}
                      />
                    </div>
                    
                    <button
                      onClick={() => optimizeImages([
                        'https://picsum.photos/800/600?random=1',
                        'https://picsum.photos/800/600?random=2',
                        'https://picsum.photos/800/600?random=3'
                      ])}
                      className="w-full bg-[#FF8A00] text-white px-6 py-3 rounded-lg hover:bg-[#FF6B00] transition-colors font-medium"
                    >
                      Optimize Images
                    </button>
                  </div>
                </div>

                {/* Optimization Results */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Results</h3>
                  
                  {imageOptimization ? (
                    <div className="space-y-4">
                      {/* Report Summary */}
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Optimization Report</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-blue-600">Total Images</div>
                            <div className="font-semibold">{imageOptimization.report.totalImages}</div>
                          </div>
                          <div>
                            <div className="text-blue-600">Avg. Compression</div>
                            <div className="font-semibold">{Math.round((1 - imageOptimization.report.averageCompressionRatio) * 100)}%</div>
                          </div>
                        </div>
                      </div>

                      {/* Individual Images */}
                      <div className="space-y-2">
                        {imageOptimization.images.slice(0, 3).map((img: OptimizedImage, index: number) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">Image {index + 1}</span>
                              <span className="text-[#FF8A00]">{img.format.toUpperCase()}</span>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {Math.round(img.originalSize / 1024)}KB → {Math.round(img.fileSize / 1024)}KB
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Recommendations */}
                      {imageOptimization.report.recommendations && imageOptimization.report.recommendations.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                          <div className="space-y-2">
                            {imageOptimization.report.recommendations.map((rec: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Optimization results will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
