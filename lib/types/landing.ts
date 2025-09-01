// Centralized types for landing page components
import type { StaticImageData } from 'next/image'
import type { 
  ClientTestimonial, 
  ServicePackage, 
  CaseStudy, 
  ProcessStep, 
  PricingTier, 
  BlogPost, 
  TrustIndicator, 
  NewsletterSignup,
  ClientLogo,
  ServiceFeature,
  IndustryExpertise,
  ContactFormData,

  FAQItem,
  TeamMember,
  TechnologyStack,
  ProjectTimeline,
  Guarantee,
  SocialProof
} from './business'

export type ParticleFieldProps = {
  className?: string
  /** Number of particles to render. Defaults to 1500. */
  density?: number
  /** Hex color for particle material. Defaults to '#ffffff'. */
  color?: string
  /** Rotation speed factor. Defaults to 0.02. */
  speed?: number
}

export type GalleryImage = {
  src: StaticImageData | string
  alt: string
  colSpan?: number
  rowSpan?: number
}

export type ParallaxGalleryProps = {
  images?: GalleryImage[]
  className?: string
  showOverlay?: boolean
  interactive?: boolean
}

export type LogoMarqueeItem = {
  label: string
  iconPath?: string
}

export type LogoMarqueeProps = {
  items?: LogoMarqueeItem[]
  /** pixels per second */
  speed?: number
  className?: string
}

// Enhanced landing page section types
export type LandingPageSection = {
  id: string
  type: 'hero' | 'trust-indicators' | 'services' | 'testimonials' | 'case-studies' | 'process' | 'pricing' | 'blog' | 'newsletter' | 'contact' | 'stats'
  title?: string
  subtitle?: string
  description?: string
  data: unknown
  className?: string
  order: number
}

export type HeroSectionData = {
  title: string
  subtitle: string
  description: string
  primaryCta: {
    text: string
    link: string
  }
  secondaryCta?: {
    text: string
    link: string
  }
  stats: Array<{
    number: string
    label: string
  }>
  backgroundImage?: string
  videoUrl?: string
}

export type TrustIndicatorsData = {
  title: string
  subtitle: string
  indicators: TrustIndicator[]
  clientLogos: ClientLogo[]
  stats: Array<{
    number: string
    label: string
    description?: string
  }>
}

export type ServicesSectionData = {
  title: string
  subtitle: string
  description: string
  services: ServicePackage[]
  features: ServiceFeature[]
  technologies: TechnologyStack[]
}

export type TestimonialsSectionData = {
  title: string
  subtitle: string
  description: string
  testimonials: ClientTestimonial[]
  stats: Array<{
    number: string
    label: string
  }>
}

export type CaseStudiesSectionData = {
  title: string
  subtitle: string
  description: string
  caseStudies: CaseStudy[]
  industries: IndustryExpertise[]
}

export type ProcessSectionData = {
  title: string
  subtitle: string
  description: string
  steps: ProcessStep[]
  timeline: ProjectTimeline[]
  guarantees: Guarantee[]
}

export type PricingSectionData = {
  title: string
  subtitle: string
  description: string
  tiers: PricingTier[]
  features: ServiceFeature[]
  faqs: FAQItem[]
}

export type BlogSectionData = {
  title: string
  subtitle: string
  description: string
  posts: BlogPost[]
  categories: string[]
}

export type NewsletterSectionData = {
  title: string
  subtitle: string
  description: string
  signup: NewsletterSignup
  benefits: string[]
  socialProof: SocialProof[]
}

export type ContactSectionData = {
  title: string
  subtitle: string
  description: string
  form: ContactFormData
  contactInfo: {
    phone: string
    email: string
    address: string
    hours: string
  }
  team?: TeamMember[]
}

export type StatsSectionData = {
  title: string
  subtitle: string
  stats: Array<{
    number: string
    label: string
    description?: string
    icon?: string
  }>
}

// Component prop types
export type SectionWrapperProps = {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'dark' | 'gradient'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
}

export type ContentGridProps = {
  items: unknown[]
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export type CallToActionProps = {
  title: string
  description: string
  primaryButton: {
    text: string
    link: string
    variant?: 'primary' | 'secondary' | 'outline'
  }
  secondaryButton?: {
    text: string
    link: string
    variant?: 'primary' | 'secondary' | 'outline'
  }
  background?: 'white' | 'gray' | 'dark' | 'gradient'
  className?: string
}


