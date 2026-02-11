import { StaticImageData } from 'next/image';

export type ServiceCard = {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  image?: string
  color: string
  gradient: string
}

export type FlipCardProps = {
  card: ServiceCard
  className?: string
  delay?: number
  index?: number
}

export type CreativeHeroProps = {
  title: string
  subtitle: string
  description: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundVideo?: string
  stats?: Array<{
    number: string
    label: string
  }>
}

export type AgencySection = {
  id: string
  title: string
  subtitle?: string
  description: string
  layout: 'hero' | 'services' | 'portfolio' | 'contact' | 'about'
}

export type InteractiveCardProps = {
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
  className?: string
  category?: string
  colSpan?: number
  rowSpan?: number
}

export type PortfolioItem = {
  id: string
  title: string
  description: string
  image: string | StaticImageData
  category: string
  tags: string[]
  link?: string
  featured?: boolean
  colSpan?: number
  rowSpan?: number
}

export type PortfolioGridProps = {
  items: PortfolioItem[]
  className?: string
  showFilters?: boolean
  categories?: Array<{
    id: string
    label: string
  }>
}

export type ServicesShowcaseProps = {
  services: ServiceCard[]
  className?: string
  title?: string
  subtitle?: string
  description?: string
}

export type GsapTimelineConfig = {
  duration?: number
  delay?: number
  ease?: string
  repeat?: number
  yoyo?: boolean
}

export type ScrollTriggerConfig = {
  trigger: string
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  snap?: boolean | number[]
  onUpdate?: (self: unknown) => void
}

export type ParticleConfig = {
  count: number
  color: string
  size: number
  speed: number
  opacity: number
  interactive?: boolean
  responsive?: boolean
}

export type SpatialElement = {
  id: string
  type: 'sphere' | 'box' | 'torus' | 'plane'
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  color?: string
  material?: 'basic' | 'standard' | 'phong' | 'physical'
  animated?: boolean
}

export type GlassCardProps = {
  children: React.ReactNode
  className?: string
  blur?: number
  opacity?: number
  borderRadius?: string
  padding?: string
}

export type HoverCardProps = {
  children: React.ReactNode
  className?: string
  strength?: number
  perspective?: number
  scale?: number
  shadow?: boolean
}

export type ContactFormData = {
  name: string
  email: string
  company?: string
  budget?: string
  message: string
  services?: string[]
}

export type ContactSectionProps = {
  title?: string
  subtitle?: string
  description?: string
  className?: string
  showBudgetSelector?: boolean
  showServicesSelector?: boolean
}
