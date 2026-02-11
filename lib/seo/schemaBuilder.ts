import { SITE_CONFIG } from './config'

// Base schema types
export interface BaseSchema {
  '@context': string
  '@type': string
}

export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  contactPoint: {
    '@type': 'ContactPoint'
    telephone: string
    contactType: string
    areaServed: string
  }
  sameAs: string[]
}

export interface WebsiteSchema extends BaseSchema {
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  potentialAction: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

export interface LocalBusinessSchema extends BaseSchema {
  '@type': 'LocalBusiness'
  name: string
  description: string
  url: string
  telephone: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string[]
    opens: string
    closes: string
  }[]
  priceRange: string
  areaServed: string[]
  serviceArea: {
    '@type': 'GeoCircle'
    geoMidpoint: {
      '@type': 'GeoCoordinates'
      latitude: number
      longitude: number
    }
    geoRadius: string
  }
}

export interface ArticleSchema extends BaseSchema {
  '@type': 'Article'
  headline: string
  description: string
  image: string
  author: {
    '@type': 'Person'
    name: string
    url?: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: string
    }
  }
  datePublished: string
  dateModified: string
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
  articleSection?: string
  keywords?: string[]
  wordCount?: number
  timeRequired?: string
}

export interface BreadcrumbSchema extends BaseSchema {
  '@type': 'BreadcrumbList'
  itemListElement: {
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }[]
}

export interface FAQSchema extends BaseSchema {
  '@type': 'FAQPage'
  mainEntity: {
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }[]
}

export interface PortfolioProjectSchema extends BaseSchema {
  '@type': 'CreativeWork'
  name: string
  description: string
  image: string
  url: string
  author: {
    '@type': 'Organization'
    name: string
  }
  dateCreated: string
  dateModified: string
  genre: string[]
  keywords: string[]
  about: {
    '@type': 'Thing'
    name: string
    description: string
  }[]
  offers?: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
    availability: string
  }
}

export interface ServiceSchema extends BaseSchema {
  '@type': 'Service'
  name: string
  description: string
  provider: {
    '@type': 'Organization'
    name: string
    url: string
  }
  areaServed: string[]
  serviceType: string
  offers: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
    availability: string
  }[]
}

// Schema builder functions
export class SchemaBuilder {
  static organization(): OrganizationSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Nexus Web',
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/logo.png`,
      description: 'Leading web development company in Trinidad & Tobago, specializing in modern web solutions for Caribbean businesses.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Business Street',
        addressLocality: 'Port of Spain',
        addressRegion: 'Trinidad',
        postalCode: '10001',
        addressCountry: 'TT'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-868-123-4567',
        contactType: 'customer service',
        areaServed: 'TT'
      },
      sameAs: [
        'https://www.instagram.com/nexuswebtt',
        'https://www.linkedin.com/company/nexusweb',
        'https://www.facebook.com/nexuswebtt'
      ]
    }
  }

  static website(): WebsiteSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Nexus Web',
      url: SITE_CONFIG.url,
      description: 'Professional web development services in Trinidad & Tobago. We create modern, responsive websites that drive business growth.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  }

  static localBusiness(): LocalBusinessSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Nexus Web',
      description: 'Professional web development and digital solutions company serving Trinidad & Tobago and the Caribbean.',
      url: SITE_CONFIG.url,
      telephone: '+1-868-123-4567',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Business Street',
        addressLocality: 'Port of Spain',
        addressRegion: 'Trinidad',
        postalCode: '10001',
        addressCountry: 'TT'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 10.6598,
        longitude: -61.5190
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00'
        }
      ],
      priceRange: '$$',
      areaServed: ['TT', 'Caribbean'],
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 10.6598,
          longitude: -61.5190
        },
        geoRadius: '5000'
      }
    }
  }

  static article(data: {
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
  }): ArticleSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.headline,
      description: data.description,
      image: data.image,
      author: {
        '@type': 'Person',
        name: data.authorName,
        url: data.authorUrl
      },
      publisher: {
        '@type': 'Organization',
        name: 'Nexus Web',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_CONFIG.url}/logo.png`
        }
      },
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': data.url
      },
      articleSection: data.articleSection,
      keywords: data.keywords,
      wordCount: data.wordCount,
      timeRequired: data.timeRequired
    }
  }

  static breadcrumb(items: { name: string; url: string }[]): BreadcrumbSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  }

  static faq(questions: { question: string; answer: string }[]): FAQSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map(q => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    }
  }

  static portfolioProject(data: {
    name: string
    description: string
    image: string
    url: string
    dateCreated: string
    dateModified: string
    genre: string[]
    keywords: string[]
    about: { name: string; description: string }[]
    offers?: { price: string; priceCurrency: string; availability: string }
  }): PortfolioProjectSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: data.name,
      description: data.description,
      image: data.image,
      url: data.url,
      author: {
        '@type': 'Organization',
        name: 'Nexus Web'
      },
      dateCreated: data.dateCreated,
      dateModified: data.dateModified,
      genre: data.genre,
      keywords: data.keywords,
      about: data.about.map(item => ({
        '@type': 'Thing',
        name: item.name,
        description: item.description
      })),
      offers: data.offers ? {
        '@type': 'Offer',
        price: data.offers.price,
        priceCurrency: data.offers.priceCurrency,
        availability: data.offers.availability
      } : undefined
    }
  }

  static service(data: {
    name: string
    description: string
    areaServed: string[]
    serviceType: string
    price: string
    priceCurrency: string
    availability: string
  }): ServiceSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: data.name,
      description: data.description,
      provider: {
        '@type': 'Organization',
        name: 'Nexus Web',
        url: SITE_CONFIG.url
      },
      areaServed: data.areaServed,
      serviceType: data.serviceType,
      offers: [{
        '@type': 'Offer',
        price: data.price,
        priceCurrency: data.priceCurrency,
        availability: data.availability
      }]
    }
  }

  // Generate multiple schemas for a page
  static generatePageSchemas(options: {
    organization?: boolean
    website?: boolean
    localBusiness?: boolean
    article?: Parameters<typeof SchemaBuilder.article>[0]
    breadcrumb?: { name: string; url: string }[]
    faq?: { question: string; answer: string }[]
    portfolioProject?: Parameters<typeof SchemaBuilder.portfolioProject>[0]
    service?: Parameters<typeof SchemaBuilder.service>[0]
  }): (OrganizationSchema | WebsiteSchema | LocalBusinessSchema | ArticleSchema | BreadcrumbSchema | FAQSchema | PortfolioProjectSchema | ServiceSchema)[] {
    const schemas: (OrganizationSchema | WebsiteSchema | LocalBusinessSchema | ArticleSchema | BreadcrumbSchema | FAQSchema | PortfolioProjectSchema | ServiceSchema)[] = []

    if (options.organization) {
      schemas.push(this.organization())
    }

    if (options.website) {
      schemas.push(this.website())
    }

    if (options.localBusiness) {
      schemas.push(this.localBusiness())
    }

    if (options.article) {
      schemas.push(this.article(options.article))
    }

    if (options.breadcrumb) {
      schemas.push(this.breadcrumb(options.breadcrumb))
    }

    if (options.faq) {
      schemas.push(this.faq(options.faq))
    }

    if (options.portfolioProject) {
      schemas.push(this.portfolioProject(options.portfolioProject))
    }

    if (options.service) {
      schemas.push(this.service(options.service))
    }

    return schemas
  }
}
