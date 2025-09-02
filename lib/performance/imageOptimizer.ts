// Image Optimization System
export interface ImageOptimizationOptions {
  quality?: number
  format?: 'webp' | 'jpg' | 'png' | 'auto'
  width?: number
  height?: number
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  lazy?: boolean
  placeholder?: boolean
}

export interface OptimizedImage {
  src: string
  srcSet?: string
  sizes?: string
  placeholder?: string
  width: number
  height: number
  format: string
  fileSize: number
  originalSize: number
  compressionRatio: number
}

export interface ImageMetadata {
  width: number
  height: number
  format: string
  fileSize: number
  aspectRatio: number
  dominantColor?: string
}

export class ImageOptimizer {
  private static readonly SUPPORTED_FORMATS = ['webp', 'jpg', 'png', 'jpeg']
  private static readonly DEFAULT_QUALITY = 85
  private static readonly MAX_WIDTH = 1920
  private static readonly MAX_HEIGHT = 1080

  /**
   * Optimize image with various options
   */
  static async optimizeImage(
    imageUrl: string,
    options: ImageOptimizationOptions = {}
  ): Promise<OptimizedImage> {
    const {
      quality = this.DEFAULT_QUALITY,
      format = 'auto',
      width,
      height,
      fit = 'cover',

      placeholder = true
    } = options

    try {
      // Get image metadata
      const metadata = await this.getImageMetadata()
      
      // Determine optimal format
      const optimalFormat = format === 'auto' ? this.getOptimalFormat(metadata.format) : format
      
      // Calculate optimal dimensions
      const optimalDimensions = this.calculateOptimalDimensions(
        metadata.width,
        metadata.height,
        width,
        height,
        fit
      )

      // Generate optimized image URL (in production, this would use a CDN or image service)
      const optimizedSrc = this.generateOptimizedUrl(
        imageUrl,
        optimalDimensions.width,
        optimalDimensions.height,
        optimalFormat,
        quality
      )

      // Generate srcSet for responsive images
      const srcSet = this.generateSrcSet(
        imageUrl,
        optimalDimensions.width,
        optimalDimensions.height,
        optimalFormat,
        quality
      )

      // Generate placeholder if requested
      const placeholderData = placeholder ? await this.generatePlaceholder() : undefined

      // Calculate compression ratio
      const compressionRatio = this.calculateCompressionRatio(metadata.fileSize, metadata.fileSize * 0.8) // Mock compression

      return {
        src: optimizedSrc,
        srcSet,
        sizes: this.generateSizes(optimalDimensions.width),
        placeholder: placeholderData,
        width: optimalDimensions.width,
        height: optimalDimensions.height,
        format: optimalFormat,
        fileSize: Math.round(metadata.fileSize * 0.8), // Mock compressed size
        originalSize: metadata.fileSize,
        compressionRatio
      }
    } catch (error) {
      console.error('Image optimization failed:', error)
      // Return original image if optimization fails
      return {
        src: imageUrl,
        width: 800,
        height: 600,
        format: 'jpg',
        fileSize: 0,
        originalSize: 0,
        compressionRatio: 1
      }
    }
  }

  /**
   * Get image metadata
   */
  private static async getImageMetadata(): Promise<ImageMetadata> {
    // In production, this would analyze the actual image
    // For now, return mock data
    return {
      width: 1200,
      height: 800,
      format: 'jpg',
      fileSize: 250000, // 250KB
      aspectRatio: 1.5,
      dominantColor: '#4A5568'
    }
  }

  /**
   * Determine optimal format based on browser support and image type
   */
  private static getOptimalFormat(originalFormat: string): string {
    // WebP is optimal for most cases, fallback to original format
    if (this.isWebPSupported()) {
      return 'webp'
    }
    
    // Convert JPEG to JPG for consistency
    if (originalFormat === 'jpeg') {
      return 'jpg'
    }
    
    return originalFormat
  }

  /**
   * Check if WebP is supported (simplified check)
   */
  private static isWebPSupported(): boolean {
    // In production, this would check actual browser support
    return true
  }

  /**
   * Calculate optimal dimensions maintaining aspect ratio
   */
  private static calculateOptimalDimensions(
    originalWidth: number,
    originalHeight: number,
    targetWidth?: number,
    targetHeight?: number,
    fit: string = 'cover'
  ): { width: number; height: number } {
    let width = targetWidth || originalWidth
    let height = targetHeight || originalHeight

    // Ensure dimensions don't exceed maximums
    if (width > this.MAX_WIDTH) {
      width = this.MAX_WIDTH
      height = (originalHeight * width) / originalWidth
    }

    if (height > this.MAX_HEIGHT) {
      height = this.MAX_HEIGHT
      width = (originalWidth * height) / originalHeight
    }

    // Apply fit strategy
    switch (fit) {
      case 'contain':
        const scale = Math.min(width / originalWidth, height / originalHeight)
        width = Math.round(originalWidth * scale)
        height = Math.round(originalHeight * scale)
        break
      
      case 'fill':
        // Use target dimensions as-is
        break
      
      case 'inside':
        const insideScale = Math.min(1, Math.min(width / originalWidth, height / originalHeight))
        width = Math.round(originalWidth * insideScale)
        height = Math.round(originalHeight * insideScale)
        break
      
      case 'outside':
        const outsideScale = Math.max(1, Math.max(width / originalWidth, height / originalHeight))
        width = Math.round(originalWidth * outsideScale)
        height = Math.round(originalHeight * outsideScale)
        break
      
      case 'cover':
      default:
        // Maintain aspect ratio, crop if necessary
        const aspectRatio = originalWidth / originalHeight
        if (width / height > aspectRatio) {
          width = Math.round(height * aspectRatio)
        } else {
          height = Math.round(width / aspectRatio)
        }
        break
    }

    return { width: Math.round(width), height: Math.round(height) }
  }

  /**
   * Generate optimized image URL
   */
  private static generateOptimizedUrl(
    originalUrl: string,
    width: number,
    height: number,
    format: string,
    quality: number
  ): string {
    // In production, this would use a CDN or image service
    // For now, return the original URL with query parameters
    const url = new URL(originalUrl, 'https://example.com')
    url.searchParams.set('w', width.toString())
    url.searchParams.set('h', height.toString())
    url.searchParams.set('f', format)
    url.searchParams.set('q', quality.toString())
    
    return url.toString()
  }

  /**
   * Generate srcSet for responsive images
   */
  private static generateSrcSet(
    originalUrl: string,
    baseWidth: number,
    baseHeight: number,
    format: string,
    quality: number
  ): string {
    const breakpoints = [1, 1.5, 2, 3]
    
    return breakpoints
      .map(scale => {
        const width = Math.round(baseWidth * scale)
        const height = Math.round(baseHeight * scale)
        const url = this.generateOptimizedUrl(originalUrl, width, height, format, quality)
        return `${url} ${width}w`
      })
      .join(', ')
  }

  /**
   * Generate sizes attribute for responsive images
   */
  private static generateSizes(baseWidth: number): string {
    return `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${baseWidth}px`
  }

  /**
   * Generate low-quality placeholder
   */
  private static async generatePlaceholder(): Promise<string> {
    // In production, this would generate a tiny, blurred version of the image
    // For now, return a data URL of a simple colored rectangle
    const canvas = document.createElement('canvas')
    canvas.width = 20
    canvas.height = 20
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      ctx.fillStyle = '#E2E8F0'
      ctx.fillRect(0, 0, 20, 20)
    }
    
    return canvas.toDataURL('image/jpeg', 0.1)
  }

  /**
   * Calculate compression ratio
   */
  private static calculateCompressionRatio(originalSize: number, compressedSize: number): number {
    return Math.round((compressedSize / originalSize) * 100) / 100
  }

  /**
   * Batch optimize multiple images
   */
  static async optimizeImages(
    images: string[],
    options: ImageOptimizationOptions = {}
  ): Promise<OptimizedImage[]> {
    const promises = images.map(imageUrl => this.optimizeImage(imageUrl, options))
    return Promise.all(promises)
  }

  /**
   * Generate image optimization report
   */
  static generateReport(images: OptimizedImage[]): {
    totalImages: number
    totalOriginalSize: number
    totalOptimizedSize: number
    averageCompressionRatio: number
    formatDistribution: Record<string, number>
    recommendations: string[]
  } {
    const totalImages = images.length
    const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0)
    const totalOptimizedSize = images.reduce((sum, img) => sum + img.fileSize, 0)
    const averageCompressionRatio = images.reduce((sum, img) => sum + img.compressionRatio, 0) / totalImages

    const formatDistribution = images.reduce((acc, img) => {
      acc[img.format] = (acc[img.format] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const recommendations: string[] = []
    
    if (averageCompressionRatio > 0.8) {
      recommendations.push('Consider increasing compression for better file size reduction')
    }
    
    if (!formatDistribution.webp) {
      recommendations.push('Consider converting images to WebP format for better compression')
    }
    
    if (totalImages > 10) {
      recommendations.push('Consider implementing lazy loading for better performance')
    }

    return {
      totalImages,
      totalOriginalSize,
      totalOptimizedSize,
      averageCompressionRatio,
      formatDistribution,
      recommendations
    }
  }
}

// Lazy Loading Component
export class LazyLoader {
  private static observer: IntersectionObserver | null = null
  private static callbacks = new Map<Element, () => void>()

  /**
   * Initialize lazy loading
   */
  static init(options: IntersectionObserverInit = {}) {
    if (this.observer) {
      this.observer.disconnect()
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const callback = this.callbacks.get(entry.target)
          if (callback) {
            callback()
            this.observer?.unobserve(entry.target)
            this.callbacks.delete(entry.target)
          }
        }
      })
    }, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    })
  }

  /**
   * Add element to lazy loading
   */
  static observe(element: Element, callback: () => void) {
    if (!this.observer) {
      this.init()
    }
    
    this.callbacks.set(element, callback)
    this.observer?.observe(element)
  }

  /**
   * Stop observing element
   */
  static unobserve(element: Element) {
    this.observer?.unobserve(element)
    this.callbacks.delete(element)
  }

  /**
   * Cleanup
   */
  static destroy() {
    this.observer?.disconnect()
    this.observer = null
    this.callbacks.clear()
  }
}
