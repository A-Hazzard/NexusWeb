// Business-specific types for enhanced landing page components

export type ClientTestimonial = {
  id: string
  name: string
  company: string
  position: string
  image: string
  quote: string
  results: string[]
  rating: number
  industry: string
  verified?: boolean
}

export type ServicePackage = {
  id: string
  title: string
  description: string
  features: string[]
  technologies: string[]
  price: string
  timeline: string
  image: string
  popular?: boolean
  category: 'web-development' | 'e-commerce' | 'seo' | 'maintenance'
}

export type CaseStudy = {
  id: string
  title: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    improvement: string
  }[]
  technologies: string[]
  image: string
  beforeImage?: string
  afterImage?: string
  testimonial?: string
  duration: string
  featured?: boolean
}

export type ProcessStep = {
  id: string
  title: string
  description: string
  duration: string
  deliverables: string[]
  icon: string
  color: string
}

export type PricingTier = {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  limitations?: string[]
  popular?: boolean
  ctaText: string
  ctaLink: string
  color: string
}

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  featured?: boolean
  slug: string
  content?: string
}

export type TrustIndicator = {
  id: string
  type: 'logo' | 'statistic' | 'certification' | 'award'
  title: string
  value?: string
  image?: string
  description?: string
}

export type NewsletterSignup = {
  title: string
  description: string
  benefits: string[]
  placeholder: string
  buttonText: string
  privacyText: string
}

export type ClientLogo = {
  id: string
  name: string
  image: string
  industry: string
  website?: string
}

export type ServiceFeature = {
  id: string
  title: string
  description: string
  icon: string
  benefits: string[]
}

export type IndustryExpertise = {
  id: string
  name: string
  description: string
  image: string
  services: string[]
  caseStudies: number
}

export type ContactFormData = {
  name: string
  email: string
  phone?: string
  company?: string
  industry?: string
  budget?: string
  services: string[]
  message: string
  timeline?: string
  source?: string
}

export type ContactSectionProps = {
  title?: string
  subtitle?: string
  description?: string
  showBudgetSelector?: boolean
  showServicesSelector?: boolean
  showTimelineSelector?: boolean
  className?: string
}

export type StatsSection = {
  title: string
  stats: Array<{
    number: string
    label: string
    description?: string
    icon?: string
  }>
}

export type FAQItem = {
  id: string
  question: string
  answer: string
  category: string
}

export type TeamMember = {
  id: string
  name: string
  position: string
  bio: string
  image: string
  skills: string[]
  social?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export type TechnologyStack = {
  category: string
  technologies: Array<{
    name: string
    icon: string
    description: string
  }>
}

export type ProjectTimeline = {
  phase: string
  duration: string
  description: string
  deliverables: string[]
  milestones: string[]
}

export type Guarantee = {
  title: string
  description: string
  icon: string
  terms: string[]
}

export type SocialProof = {
  type: 'testimonial' | 'case-study' | 'statistic' | 'award'
  content: string
  source?: string
  image?: string
  verified?: boolean
}
