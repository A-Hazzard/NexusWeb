// SEO Analysis Tool
export interface SEOAnalysis {
  score: number
  recommendations: SEORecommendation[]
  metrics: SEOMetrics
}

export interface SEORecommendation {
  type: 'error' | 'warning' | 'info'
  category: 'title' | 'description' | 'content' | 'images' | 'links' | 'technical'
  message: string
  priority: 'high' | 'medium' | 'low'
  fix?: string
}

export interface SEOMetrics {
  title: {
    length: number
    hasKeyword: boolean
    hasBrand: boolean
    score: number
  }
  description: {
    length: number
    hasKeyword: boolean
    hasCallToAction: boolean
    score: number
  }
  content: {
    wordCount: number
    keywordDensity: number
    headingStructure: boolean
    hasImages: boolean
    hasInternalLinks: boolean
    score: number
  }
  images: {
    count: number
    withAltText: number
    optimizedCount: number
    score: number
  }
  links: {
    internal: number
    external: number
    broken: number
    score: number
  }
  technical: {
    hasSchema: boolean
    hasCanonical: boolean
    hasSitemap: boolean
    score: number
  }
}

export class SEOAnalyzer {
  private keywords: string[]
  private brandName: string

  constructor(keywords: string[] = [], brandName: string = 'Nexus Web') {
    this.keywords = keywords.map(k => k.toLowerCase())
    this.brandName = brandName.toLowerCase()
  }

  analyzePage(data: {
    title: string
    description: string
    content: string
    images: { alt?: string; src: string }[]
    links: { href: string; text: string; isInternal: boolean }[]
    hasSchema: boolean
    hasCanonical: boolean
    hasSitemap: boolean
  }): SEOAnalysis {
    const recommendations: SEORecommendation[] = []
    
    // Analyze title
    const titleMetrics = this.analyzeTitle(data.title)
    recommendations.push(...this.getTitleRecommendations(titleMetrics))
    
    // Analyze description
    const descriptionMetrics = this.analyzeDescription(data.description)
    recommendations.push(...this.getDescriptionRecommendations(descriptionMetrics))
    
    // Analyze content
    const contentMetrics = this.analyzeContent(data.content)
    recommendations.push(...this.getContentRecommendations(contentMetrics))
    
    // Analyze images
    const imageMetrics = this.analyzeImages(data.images)
    recommendations.push(...this.getImageRecommendations(imageMetrics))
    
    // Analyze links
    const linkMetrics = this.analyzeLinks(data.links)
    recommendations.push(...this.getLinkRecommendations(linkMetrics))
    
    // Analyze technical aspects
    const technicalMetrics = this.analyzeTechnical(data)
    recommendations.push(...this.getTechnicalRecommendations(technicalMetrics))
    
    // Calculate overall score
    const overallScore = this.calculateOverallScore([
      titleMetrics.score,
      descriptionMetrics.score,
      contentMetrics.score,
      imageMetrics.score,
      linkMetrics.score,
      technicalMetrics.score
    ])
    
    return {
      score: overallScore,
      recommendations: recommendations.sort((a, b) => this.getPriorityWeight(b.priority) - this.getPriorityWeight(a.priority)),
      metrics: {
        title: titleMetrics,
        description: descriptionMetrics,
        content: contentMetrics,
        images: imageMetrics,
        links: linkMetrics,
        technical: technicalMetrics
      }
    }
  }

  private analyzeTitle(title: string): SEOMetrics['title'] {
    const length = title.length
    const hasKeyword = this.keywords.some(keyword => title.toLowerCase().includes(keyword))
    const hasBrand = title.toLowerCase().includes(this.brandName)
    
    let score = 100
    
    if (length < 30) score -= 20
    else if (length > 60) score -= 15
    else if (length >= 30 && length <= 60) score += 10
    
    if (!hasKeyword) score -= 25
    if (!hasBrand) score -= 15
    
    return { length, hasKeyword, hasBrand, score: Math.max(0, score) }
  }

  private analyzeDescription(description: string): SEOMetrics['description'] {
    const length = description.length
    const hasKeyword = this.keywords.some(keyword => description.toLowerCase().includes(keyword))
    const hasCallToAction = /(learn more|get started|contact us|call now|visit|click|download)/i.test(description)
    
    let score = 100
    
    if (length < 120) score -= 20
    else if (length > 160) score -= 15
    else if (length >= 120 && length <= 160) score += 10
    
    if (!hasKeyword) score -= 25
    if (!hasCallToAction) score -= 10
    
    return { length, hasKeyword, hasCallToAction, score: Math.max(0, score) }
  }

  private analyzeContent(content: string): SEOMetrics['content'] {
    const wordCount = content.split(/\s+/).length
    const keywordDensity = this.calculateKeywordDensity(content)
    const headingStructure = /<h[1-6][^>]*>.*?<\/h[1-6]>/i.test(content)
    const hasImages = /<img[^>]*>/i.test(content)
    const hasInternalLinks = /href=["']\/(?!\/)/.test(content)
    
    let score = 100
    
    if (wordCount < 300) score -= 30
    else if (wordCount < 600) score -= 15
    else if (wordCount >= 600) score += 10
    
    if (keywordDensity < 0.5) score -= 20
    else if (keywordDensity > 3) score -= 15
    else if (keywordDensity >= 0.5 && keywordDensity <= 3) score += 10
    
    if (!headingStructure) score -= 15
    if (!hasImages) score -= 10
    if (!hasInternalLinks) score -= 10
    
    return { wordCount, keywordDensity, headingStructure, hasImages, hasInternalLinks, score: Math.max(0, score) }
  }

  private analyzeImages(images: { alt?: string; src: string }[]): SEOMetrics['images'] {
    const count = images.length
    const withAltText = images.filter(img => img.alt && img.alt.trim().length > 0).length
    const optimizedCount = images.filter(img => {
      const src = img.src.toLowerCase()
      return src.includes('.webp') || src.includes('.jpg') || src.includes('.png')
    }).length
    
    let score = 100
    
    if (count === 0) score -= 30
    else if (count < 3) score -= 10
    
    if (withAltText < count) score -= 20
    if (optimizedCount < count) score -= 15
    
    return { count, withAltText, optimizedCount, score: Math.max(0, score) }
  }

  private analyzeLinks(links: { href: string; text: string; isInternal: boolean }[]): SEOMetrics['links'] {
    const internal = links.filter(link => link.isInternal).length
    const external = links.filter(link => !link.isInternal).length
    const broken = 0 // Would need to check actual link validity
    
    let score = 100
    
    if (internal === 0) score -= 20
    else if (internal < 3) score -= 10
    
    if (external === 0) score -= 10
    else if (external > 10) score -= 15
    
    if (broken > 0) score -= 25
    
    return { internal, external, broken, score: Math.max(0, score) }
  }

  private analyzeTechnical(data: {
    hasSchema: boolean
    hasCanonical: boolean
    hasSitemap: boolean
  }): SEOMetrics['technical'] {
    const { hasSchema, hasCanonical, hasSitemap } = data
    
    let score = 100
    
    if (!hasSchema) score -= 20
    if (!hasCanonical) score -= 15
    if (!hasSitemap) score -= 10
    
    return { hasSchema, hasCanonical, hasSitemap, score: Math.max(0, score) }
  }

  private calculateKeywordDensity(content: string): number {
    const words = content.toLowerCase().split(/\s+/)
    const totalWords = words.length
    
    if (totalWords === 0) return 0
    
    let keywordCount = 0
    this.keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      const matches = content.match(regex)
      if (matches) keywordCount += matches.length
    })
    
    return (keywordCount / totalWords) * 100
  }

  private calculateOverallScore(scores: number[]): number {
    const total = scores.reduce((sum, score) => sum + score, 0)
    return Math.round(total / scores.length)
  }

  private getPriorityWeight(priority: 'high' | 'medium' | 'low'): number {
    switch (priority) {
      case 'high': return 3
      case 'medium': return 2
      case 'low': return 1
      default: return 0
    }
  }

  private getTitleRecommendations(metrics: SEOMetrics['title']): SEORecommendation[] {
    const recommendations: SEORecommendation[] = []
    
    if (metrics.length < 30) {
      recommendations.push({
        type: 'error',
        category: 'title',
        message: 'Title is too short. Aim for 30-60 characters.',
        priority: 'high',
        fix: 'Add more descriptive words to your title'
      })
    }
    
    if (metrics.length > 60) {
      recommendations.push({
        type: 'warning',
        category: 'title',
        message: 'Title is too long. Keep it under 60 characters.',
        priority: 'medium',
        fix: 'Shorten your title while keeping it descriptive'
      })
    }
    
    if (!metrics.hasKeyword) {
      recommendations.push({
        type: 'error',
        category: 'title',
        message: 'Title should include your target keyword.',
        priority: 'high',
        fix: 'Include your main keyword naturally in the title'
      })
    }
    
    if (!metrics.hasBrand) {
      recommendations.push({
        type: 'warning',
        category: 'title',
        message: 'Consider including your brand name in the title.',
        priority: 'medium',
        fix: 'Add your brand name to increase recognition'
      })
    }
    
    return recommendations
  }

  private getDescriptionRecommendations(metrics: SEOMetrics['description']): SEORecommendation[] {
    const recommendations: SEORecommendation[] = []
    
    if (metrics.length < 120) {
      recommendations.push({
        type: 'error',
        category: 'description',
        message: 'Description is too short. Aim for 120-160 characters.',
        priority: 'high',
        fix: 'Expand your description to be more compelling'
      })
    }
    
    if (metrics.length > 160) {
      recommendations.push({
        type: 'warning',
        category: 'description',
        message: 'Description is too long. Keep it under 160 characters.',
        priority: 'medium',
        fix: 'Shorten your description while keeping it engaging'
      })
    }
    
    if (!metrics.hasKeyword) {
      recommendations.push({
        type: 'error',
        category: 'description',
        message: 'Description should include your target keyword.',
        priority: 'high',
        fix: 'Include your main keyword naturally in the description'
      })
    }
    
    if (!metrics.hasCallToAction) {
      recommendations.push({
        type: 'info',
        category: 'description',
        message: 'Consider adding a call-to-action to your description.',
        priority: 'low',
        fix: 'Add phrases like "Learn more" or "Get started"'
      })
    }
    
    return recommendations
  }

  private getContentRecommendations(metrics: SEOMetrics['content']): SEORecommendation[] {
    const recommendations: SEORecommendation[] = []
    
    if (metrics.wordCount < 300) {
      recommendations.push({
        type: 'error',
        category: 'content',
        message: 'Content is too short. Aim for at least 300 words.',
        priority: 'high',
        fix: 'Expand your content with more valuable information'
      })
    }
    
    if (metrics.keywordDensity < 0.5) {
      recommendations.push({
        type: 'warning',
        category: 'content',
        message: 'Keyword density is too low. Aim for 0.5-3%.',
        priority: 'medium',
        fix: 'Include your keywords more naturally throughout the content'
      })
    }
    
    if (metrics.keywordDensity > 3) {
      recommendations.push({
        type: 'error',
        category: 'content',
        message: 'Keyword density is too high. Keep it under 3%.',
        priority: 'high',
        fix: 'Reduce keyword stuffing and write more naturally'
      })
    }
    
    if (!metrics.headingStructure) {
      recommendations.push({
        type: 'warning',
        category: 'content',
        message: 'Use proper heading structure (H1, H2, H3) for better readability.',
        priority: 'medium',
        fix: 'Add headings to organize your content'
      })
    }
    
    if (!metrics.hasImages) {
      recommendations.push({
        type: 'info',
        category: 'content',
        message: 'Consider adding images to make content more engaging.',
        priority: 'low',
        fix: 'Add relevant images with proper alt text'
      })
    }
    
    return recommendations
  }

  private getImageRecommendations(metrics: SEOMetrics['images']): SEORecommendation[] {
    const recommendations: SEORecommendation[] = []
    
    if (metrics.count === 0) {
      recommendations.push({
        type: 'warning',
        category: 'images',
        message: 'No images found. Images can improve user engagement.',
        priority: 'medium',
        fix: 'Add relevant images to your content'
      })
    }
    
    if (metrics.withAltText < metrics.count) {
      recommendations.push({
        type: 'error',
        category: 'images',
        message: 'Some images are missing alt text. This is important for accessibility and SEO.',
        priority: 'high',
        fix: 'Add descriptive alt text to all images'
      })
    }
    
    if (metrics.optimizedCount < metrics.count) {
      recommendations.push({
        type: 'warning',
        category: 'images',
        message: 'Some images could be optimized for better performance.',
        priority: 'medium',
        fix: 'Convert images to WebP format and optimize file sizes'
      })
    }
    
    return recommendations
  }

  private getLinkRecommendations(metrics: SEOMetrics['links']): SEORecommendation[] {
    const recommendations: SEORecommendation[] = []
    
    if (metrics.internal === 0) {
      recommendations.push({
        type: 'error',
        category: 'links',
        message: 'No internal links found. Internal linking helps with site structure and SEO.',
        priority: 'high',
        fix: 'Add relevant internal links to other pages on your site'
      })
    }
    
    if (metrics.external === 0) {
      recommendations.push({
        type: 'info',
        category: 'links',
        message: 'Consider adding external links to authoritative sources.',
        priority: 'low',
        fix: 'Link to relevant external resources when appropriate'
      })
    }
    
    if (metrics.external > 10) {
      recommendations.push({
        type: 'warning',
        category: 'links',
        message: 'Too many external links. Focus on quality over quantity.',
        priority: 'medium',
        fix: 'Reduce external links to only the most relevant ones'
      })
    }
    
    return recommendations
  }

  private getTechnicalRecommendations(metrics: SEOMetrics['technical']): SEORecommendation[] {
    const recommendations: SEORecommendation[] = []
    
    if (!metrics.hasSchema) {
      recommendations.push({
        type: 'error',
        category: 'technical',
        message: 'Missing structured data (schema markup). This helps search engines understand your content.',
        priority: 'high',
        fix: 'Add appropriate schema markup to your page'
      })
    }
    
    if (!metrics.hasCanonical) {
      recommendations.push({
        type: 'warning',
        category: 'technical',
        message: 'Missing canonical URL. This prevents duplicate content issues.',
        priority: 'medium',
        fix: 'Add a canonical tag to your page'
      })
    }
    
    if (!metrics.hasSitemap) {
      recommendations.push({
        type: 'info',
        category: 'technical',
        message: 'Consider adding a sitemap for better search engine crawling.',
        priority: 'low',
        fix: 'Create and submit a sitemap to search engines'
      })
    }
    
    return recommendations
  }
}
