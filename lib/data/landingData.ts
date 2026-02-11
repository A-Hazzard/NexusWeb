// Landing page data configuration
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
  SocialProof
} from '@/lib/types/business'

// Client Testimonials
export const testimonials: ClientTestimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Rishi Kowlessar',
    company: 'Uptech Incorporated Limited (Ourlime)',
    position: 'Founder',
    image: '/port3.png',
    quote: 'Nexus Web helped refine Ourlime\'s vision for a safe, private community network. Their understanding of our goals for user safety and data security was exceptional.',
    results: ['Platform launched successfully', 'Robust security implementation', 'Seamless user experience'],
    rating: 5,
    industry: 'Technology',
    verified: true
  },
  {
    id: 'testimonial-2',
    name: 'Kareem Paynee',
    company: 'Noblis Talent Solution',
    position: 'Director',
    image: '/nobilis.png',
    quote: 'Our work blends strategic insight with human behavior. Nexus Web perfectly aligned our digital presence with our vision of helping organizations thrive.',
    results: ['Aligned culture with vision', 'Enhanced digital presence', 'Sustainable results'],
    rating: 5,
    industry: 'Consulting',
    verified: true
  },
  {
    id: 'testimonial-3',
    name: 'Rueben Hewitt',
    company: 'CelebFit Life',
    position: 'Management',
    image: '/celeb.png',
    quote: 'Nexus Web captured the exclusivity and energy of our live celebrity training experience. They helped us fill our limited spots with a high-converting platform.',
    results: ['Sold out specialized cohorts', 'High conversion rate', 'Premium brand experience'],
    rating: 5,
    industry: 'Fitness',
    verified: true
  },
  {
    id: 'testimonial-4',
    name: 'Listwa',
    company: 'Listwa Collective',
    position: 'Creative Director',
    image: '/listwa.png',
    quote: 'Nexus Web understood our mission to blend Caribbean culture with compelling narratives. They built a platform that beautifully showcases our documentary and content work.',
    results: ['Showcased portfolio effectively', 'Connected with audience', 'Cultural alignment'],
    rating: 5,
    industry: 'Media',
    verified: true
  },
  {
    id: 'testimonial-5',
    name: 'Khaleel Reid-Devonish',
    company: 'Digital Utopia',
    position: 'Management',
    image: '/port1.png',
    quote: 'Nexus Web provided a secure and scalable platform for Digital Utopia, our copy trading solution. Their expertise in real-time data and user security was invaluable for our launch.',
    results: ['Secure trading platform', 'Real-time data integration', 'Scalable architecture'],
    rating: 5,
    industry: 'Finance',
    verified: true
  }
]

// Service Packages
export const services: ServicePackage[] = [
  {
    id: 'web-development',
    title: 'Web Design & Development',
    description: 'Custom websites built with modern technologies, responsive design, and optimized performance.',
    features: [
      'Responsive Web Design',
      'Custom Web Applications',
      'Content Management Systems',
      'Progressive Web Apps (PWA)',
      'API Integration',
      'Fast Loading (90+ PageSpeed)',
      'SSL Certificate & Security',
      '3 Months Free Support'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    price: 'Contact for Consultation',
    timeline: '3-5 weeks',
    image: 'https://picsum.photos/600/400?random=200',
    popular: true,
    category: 'web-development'
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce Solutions',
    description: 'Complete online store solutions with secure payment processing and inventory management.',
    features: [
      'Custom E-Commerce Development',
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Processing Systems',
      'Mobile-Optimized Shopping',
      'Multi-Currency Support',
      'Shipping Integration',
      'Analytics Dashboard'
    ],
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Square'],
    price: 'Contact for Consultation',
    timeline: '4-6 weeks',
    image: 'https://picsum.photos/600/400?random=201',
    category: 'e-commerce'
  },
  {
    id: 'seo-marketing',
    title: 'SEO & Digital Marketing',
    description: 'Boost your online visibility and drive targeted traffic to your website with our proven SEO strategies.',
    features: [
      'Search Engine Optimization',
      'Local SEO for Trinidad & Tobago',
      'Google Ads Management',
      'Social Media Marketing',
      'Content Marketing',
      'Analytics & Reporting',
      'Competitor Analysis',
      'Monthly Performance Reviews'
    ],
    technologies: ['Google Analytics', 'Search Console', 'SEMrush', 'Facebook Ads', 'Google Ads'],
    price: 'Contact for Consultation',
    timeline: 'Ongoing',
    image: 'https://picsum.photos/600/400?random=202',
    category: 'seo'
  }
]

// Case Studies
export const caseStudies: CaseStudy[] = [
  {
    id: 'case-study-1',
    title: 'Caribbean Restaurant Group Digital Transformation',
    client: 'Caribbean Restaurant Group',
    industry: 'Restaurant',
    challenge: 'The restaurant group needed a modern online ordering system to compete with food delivery apps and increase direct orders.',
    solution: 'We developed a custom e-commerce platform with online ordering, table reservations, and integrated payment processing.',
    results: [
      { metric: 'Online Orders', value: '340%', improvement: 'increase in 3 months' },
      { metric: 'Customer Satisfaction', value: '90%', improvement: 'rating improvement' },
      { metric: 'Support Calls', value: '50%', improvement: 'reduction in calls' }
    ],
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    image: 'https://picsum.photos/600/400?random=400',
    duration: '6 weeks',
    featured: true,
    testimonial: 'Nexus Web transformed our business with their innovative approach to online ordering.'
  },
  {
    id: 'case-study-2',
    title: 'Thompson Medical Center Patient Portal',
    client: 'Thompson Medical Center',
    industry: 'Healthcare',
    challenge: 'The medical center needed a secure patient portal for appointments, medical records, and communication.',
    solution: 'We built a HIPAA-compliant patient portal with appointment scheduling, secure messaging, and medical record access.',
    results: [
      { metric: 'Online Bookings', value: '200%', improvement: 'increase in bookings' },
      { metric: 'Phone Calls', value: '60%', improvement: 'reduction in calls' },
      { metric: 'Patient Satisfaction', value: '95%', improvement: 'satisfaction rating' }
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    image: 'https://picsum.photos/600/400?random=401',
    duration: '8 weeks',
    featured: true
  },
  {
    id: 'case-study-3',
    title: 'Island Fashion Boutique E-Commerce Platform',
    client: 'Island Fashion Boutique',
    industry: 'Retail',
    challenge: 'The boutique wanted to expand beyond their physical store and reach customers across the Caribbean.',
    solution: 'We created a comprehensive e-commerce platform with inventory management, multi-currency support, and regional shipping.',
    results: [
      { metric: 'Online Sales', value: '500%', improvement: 'increase in sales' },
      { metric: 'New Markets', value: '5', improvement: 'Caribbean countries' },
      { metric: 'Customer Base', value: '40%', improvement: 'increase in customers' }
    ],
    technologies: ['Shopify', 'Stripe', 'ShipStation', 'Google Analytics'],
    image: 'https://picsum.photos/600/400?random=402',
    duration: '4 weeks'
  }
]

// Process Steps
export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    title: 'Discovery & Planning',
    description: 'We start by understanding your business goals, target audience, and requirements to create a comprehensive project plan.',
    duration: '1-2 weeks',
    deliverables: [
      'Business requirements analysis',
      'Target audience research',
      'Competitor analysis',
      'Project timeline & milestones',
      'Technology recommendations'
    ],
    icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'design',
    title: 'Design & Prototyping',
    description: 'Our design team creates wireframes, mockups, and prototypes that align with your brand and user experience goals.',
    duration: '2-3 weeks',
    deliverables: [
      'Wireframes & user flows',
      'Visual design mockups',
      'Interactive prototypes',
      'Mobile-responsive designs',
      'Brand guideline compliance'
    ],
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'development',
    title: 'Development & Testing',
    description: 'Our developers build your website using modern technologies, with rigorous testing to ensure quality and performance.',
    duration: '3-4 weeks',
    deliverables: [
      'Frontend development',
      'Backend development',
      'Database setup',
      'API integration',
      'Quality assurance testing'
    ],
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'deployment',
    title: 'Deployment & Launch',
    description: 'We deploy your website to production, configure hosting, and ensure everything is working perfectly before launch.',
    duration: '1 week',
    deliverables: [
      'Production deployment',
      'Domain & hosting setup',
      'SSL certificate installation',
      'Performance optimization',
      'Launch checklist completion'
    ],
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'support',
    title: 'Ongoing Support',
    description: 'We provide continuous support, maintenance, and updates to keep your website secure and performing optimally.',
    duration: 'Ongoing',
    deliverables: [
      '24/7 technical support',
      'Regular security updates',
      'Performance monitoring',
      'Content updates',
      'Feature enhancements'
    ],
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364',
    color: 'from-teal-500 to-cyan-500'
  }
]

// Pricing Tiers
// Pricing Tiers - Removed as requested
export const pricingTiers: PricingTier[] = []


/* 
export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Complete Guide to E-Commerce in Trinidad & Tobago',
    excerpt: 'Learn how to set up a successful online store in the Caribbean market, including payment processing, shipping, and local regulations.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '8 min',
    category: 'E-Commerce',
    image: 'https://picsum.photos/600/400?random=500',
    featured: true,
    slug: 'complete-guide-ecommerce-trinidad-tobago',
    content: `
# The Complete Guide to E-Commerce in Trinidad & Tobago
... (content skipped for brevity)
...
    `
  }
]
*/
export const blogPosts: BlogPost[] = [];

// Trust Indicators
export const trustIndicators: TrustIndicator[] = [
  {
    id: 'trust-1',
    type: 'certification',
    title: 'SSL Secured',
    value: '100%',
    description: 'All websites protected with SSL certificates'
  },
  {
    id: 'trust-2',
    type: 'statistic',
    title: 'Client Satisfaction',
    value: '100%',
    description: 'Satisfied customers across Trinidad & Tobago'
  },
  {
    id: 'trust-4',
    type: 'certification',
    title: 'GDPR Compliant',
    value: '100%',
    description: 'Full compliance with data protection regulations'
  }
]

// Client Logos
export const clientLogos: ClientLogo[] = [
  {
    id: 'logo-1',
    name: 'Uptech Incorporated (Ourlime)',
    image: '/port3.png',
    industry: 'Technology'
  },
  {
    id: 'logo-2',
    name: 'Noblis Talent Solution',
    image: '/nobilis.png',
    industry: 'Consulting'
  },
  {
    id: 'logo-3',
    name: 'CelebFit Life',
    image: '/celeb.png',
    industry: 'Fitness'
  },
  {
    id: 'logo-4',
    name: 'Listwa',
    image: '/listwa.png',
    industry: 'Media'
  },
  {
    id: 'logo-5',
    name: 'Digital Utopia',
    image: '/port1.png',
    industry: 'Finance'
  }
]

// Newsletter Signup
export const newsletterSignup: NewsletterSignup = {
  title: 'Stay Updated',
  description: 'Join thousands of business owners who receive our weekly insights, tips, and exclusive offers.',
  benefits: [
    'Weekly web development tips',
    'Exclusive business insights',
    'Special offers & discounts',
    'Industry news & updates'
  ],
  placeholder: 'Enter your email address',
  buttonText: 'Subscribe Now',
  privacyText: 'We respect your privacy. Unsubscribe at any time.'
}

// Social Proof for Newsletter
export const newsletterSocialProof: SocialProof[] = [
  {
    type: 'statistic',
    content: '2,500+ subscribers',
    verified: true
  },
  {
    type: 'testimonial',
    content: 'Best web development newsletter in the Caribbean',
    source: 'Tech Caribbean Magazine',
    verified: true
  }
]

// Service Features
export const serviceFeatures: ServiceFeature[] = [
  {
    id: 'feature-1',
    title: 'Mobile-First Design',
    description: 'Every website we build is optimized for mobile devices first, ensuring perfect performance across all screen sizes.',
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    benefits: [
      'Responsive design',
      'Touch-friendly interface',
      'Fast mobile loading',
      'Mobile SEO optimization'
    ]
  },
  {
    id: 'feature-2',
    title: 'SEO Optimization',
    description: 'We implement comprehensive SEO strategies to help your website rank higher in search results.',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    benefits: [
      'Local SEO optimization',
      'Technical SEO',
      'Content optimization',
      'Performance optimization'
    ]
  },
  {
    id: 'feature-3',
    title: 'Security & Performance',
    description: 'Your website will be secure, fast, and reliable with our comprehensive security and performance measures.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    benefits: [
      'SSL certificates',
      'Regular security updates',
      'Performance monitoring',
      'Backup & recovery'
    ]
  }
]

// Industry Expertise
export const industryExpertise: IndustryExpertise[] = [
  {
    id: 'industry-1',
    name: 'Restaurants & Food Service',
    description: 'Specialized solutions for restaurants, cafes, and food delivery businesses.',
    image: 'https://picsum.photos/300/200?random=700',
    services: ['Online ordering', 'Table reservations', 'Menu management', 'Delivery integration'],
    caseStudies: 12
  },
  {
    id: 'industry-2',
    name: 'Healthcare & Medical',
    description: 'HIPAA-compliant solutions for medical practices, clinics, and healthcare providers.',
    image: 'https://picsum.photos/300/200?random=701',
    services: ['Patient portals', 'Appointment scheduling', 'Medical records', 'Telemedicine'],
    caseStudies: 8
  },
  {
    id: 'industry-3',
    name: 'Retail & E-Commerce',
    description: 'Complete e-commerce solutions for retail businesses and online stores.',
    image: 'https://picsum.photos/300/200?random=702',
    services: ['Online stores', 'Inventory management', 'Payment processing', 'Shipping integration'],
    caseStudies: 15
  },
  {
    id: 'industry-4',
    name: 'Professional Services',
    description: 'Professional websites for law firms, accounting, consulting, and other service businesses.',
    image: 'https://picsum.photos/300/200?random=703',
    services: ['Client portals', 'Case management', 'Document sharing', 'Billing integration'],
    caseStudies: 10
  }
]
