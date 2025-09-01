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
    name: 'Maria Rodriguez',
    company: 'Caribbean Restaurant Group',
    position: 'Owner',
    image: 'https://picsum.photos/150/150?random=300',
    quote: 'Nexus Web increased our online orders by 340% in just 3 months. The new website is beautiful and our customers love the easy ordering system.',
    results: ['340% increase in online orders', '90% customer satisfaction', '50% reduction in support calls'],
    rating: 5,
    industry: 'Restaurant',
    verified: true
  },
  {
    id: 'testimonial-2',
    name: 'David Thompson',
    company: 'Thompson Medical Center',
    position: 'Practice Manager',
    image: 'https://picsum.photos/150/150?random=301',
    quote: 'Our new website has streamlined patient appointments and improved our online presence significantly. Nexus Web delivered exactly what we needed.',
    results: ['200% increase in online bookings', '60% reduction in phone calls', '95% patient satisfaction'],
    rating: 5,
    industry: 'Healthcare',
    verified: true
  },
  {
    id: 'testimonial-3',
    name: 'Sarah Johnson',
    company: 'Island Fashion Boutique',
    position: 'Store Manager',
    image: 'https://picsum.photos/150/150?random=302',
    quote: 'The e-commerce platform Nexus Web built for us has transformed our business. We now reach customers across the entire Caribbean.',
    results: ['500% increase in online sales', 'Expanded to 5 new markets', '40% increase in customer base'],
    rating: 5,
    industry: 'Retail',
    verified: true
  },

]

// Service Packages
export const services: ServicePackage[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom websites built with modern technologies for Trinidad & Tobago businesses',
    features: [
      'Responsive Design (Mobile-First)',
      'SEO Optimization',
      'Fast Loading (90+ PageSpeed)',
      'Content Management System',
      'SSL Certificate & Security',
      '3 Months Free Support',
      'Google Analytics Integration',
      'Social Media Integration'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    price: 'Starting from $2,500 TTD',
    timeline: '2-4 weeks',
    image: 'https://picsum.photos/600/400?random=200',
    popular: true,
    category: 'web-development'
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce Solutions',
    description: 'Complete online store solutions with secure payments and inventory management',
    features: [
      'Secure Payment Processing',
      'Inventory Management',
      'Order Tracking System',
      'Customer Accounts',
      'Mobile-Optimized Shopping',
      'Shipping Integration',
      'Tax Calculation',
      'Analytics Dashboard'
    ],
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal'],
    price: 'Starting from $3,500 TTD',
    timeline: '3-5 weeks',
    image: 'https://picsum.photos/600/400?random=201',
    category: 'e-commerce'
  },
  {
    id: 'seo-marketing',
    title: 'SEO & Digital Marketing',
    description: 'Dominate local search results and reach your target audience in the Caribbean',
    features: [
      'Local SEO Optimization',
      'Google My Business Setup',
      'Content Marketing Strategy',
      'Social Media Management',
      'PPC Campaign Management',
      'Analytics & Reporting',
      'Competitor Analysis',
      'Monthly Performance Reviews'
    ],
    technologies: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'SEMrush'],
    price: 'Starting from $1,200 TTD/month',
    timeline: 'Ongoing',
    image: 'https://picsum.photos/600/400?random=202',
    category: 'seo'
  },
  {
    id: 'maintenance',
    title: 'Website Maintenance',
    description: 'Keep your website secure, updated, and performing optimally with our maintenance plans',
    features: [
      'Regular Security Updates',
      'Performance Monitoring',
      'Backup & Recovery',
      'Content Updates',
      'Bug Fixes',
      'Plugin Updates',
      'Uptime Monitoring',
      'Priority Support'
    ],
    technologies: ['WordPress', 'React', 'Node.js', 'Cloudflare'],
    price: 'Starting from 300 TTD/month',
    timeline: 'Ongoing',
    image: 'https://picsum.photos/600/400?random=203',
    category: 'maintenance'
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
export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$2,500',
    period: 'TTD',
    description: 'Perfect for small businesses and startups looking to establish their online presence.',
    features: [
      '5-page responsive website',
      'Mobile-optimized design',
      'Basic SEO setup',
      'Contact form',
      'Google Analytics',
      '3 months free support',
      'SSL certificate',
      'Basic content management'
    ],
    limitations: [
      'Limited customization',
      'Basic support only'
    ],
    popular: false,
    ctaText: 'Get Started',
    ctaLink: '/contact',
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$4,500',
    period: 'TTD',
    description: 'Ideal for growing businesses that need advanced features and functionality.',
    features: [
      '10-page responsive website',
      'Custom design & branding',
      'Advanced SEO optimization',
      'E-commerce integration',
      'Customer portal',
      '6 months free support',
      'Performance optimization',
      'Advanced analytics',
      'Social media integration',
      'Email marketing setup'
    ],
    popular: true,
    ctaText: 'Most Popular',
    ctaLink: '/contact',
    color: 'from-[#FF8A00] to-[#FF4D00]'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$8,500',
    period: 'TTD',
    description: 'Complete solution for large businesses with complex requirements.',
    features: [
      'Unlimited pages',
      'Fully custom design',
      'Advanced e-commerce',
      'Multi-user management',
      'API integrations',
      '12 months free support',
      'Priority support',
      'Custom functionality',
      'Advanced security',
      'Performance monitoring',
      'Dedicated project manager',
      'Training & documentation'
    ],
    popular: false,
    ctaText: 'Contact Us',
    ctaLink: '/contact',
    color: 'from-purple-500 to-pink-500'
  }
]

// Blog Posts
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

The Caribbean e-commerce market is experiencing unprecedented growth, with Trinidad & Tobago leading the charge in digital transformation. As businesses across the region embrace online commerce, understanding the local landscape becomes crucial for success.

## Understanding the Trinidad & Tobago Market

Trinidad & Tobago presents unique opportunities and challenges for e-commerce businesses. With a population of approximately 1.4 million people and a growing middle class, the market offers significant potential for online retailers.

### Key Market Insights:
- **Digital Adoption**: 70% of the population has internet access
- **Mobile Usage**: 85% of online purchases are made via mobile devices
- **Payment Preferences**: Credit cards and mobile money are preferred
- **Shipping Expectations**: Fast local delivery is highly valued

## Setting Up Your E-Commerce Platform

### 1. Choose the Right Platform

For Trinidad & Tobago businesses, we recommend platforms that offer:
- **Local Payment Integration**: Support for TTD transactions
- **Mobile Optimization**: Essential for the mobile-first market
- **Multi-language Support**: English and Spanish capabilities
- **Local Shipping Options**: Integration with local couriers

### 2. Payment Processing Solutions

Local payment processing is crucial for success:

**Recommended Payment Gateways:**
- **PayPal**: Widely trusted and accepted
- **Stripe**: Excellent for international transactions
- **Local Banks**: Direct integration with Republic Bank, First Citizens
- **Mobile Money**: Digicel Money, Bmobile Money

### 3. Shipping and Logistics

**Local Shipping Partners:**
- **TTPost**: Government postal service
- **DHL Express**: International shipping
- **FedEx**: Reliable international delivery
- **Local Couriers**: Same-day delivery in major cities

## Legal and Regulatory Compliance

### Business Registration
- Register with the Companies Registry
- Obtain a Business License
- Register for VAT (15% rate)
- Comply with Consumer Protection Laws

### Data Protection
- Implement GDPR-compliant privacy policies
- Secure customer data storage
- Obtain consent for marketing communications
- Regular security audits

## Marketing Strategies for Success

### 1. Local SEO Optimization
- Target Trinidad & Tobago specific keywords
- Optimize for local search results
- Create location-specific content
- Build local business citations

### 2. Social Media Marketing
- **Facebook**: Most popular platform in T&T
- **Instagram**: Growing rapidly among younger demographics
- **WhatsApp Business**: Essential for customer service
- **TikTok**: Emerging platform for brand awareness

### 3. Content Marketing
- Create culturally relevant content
- Highlight local partnerships
- Share customer success stories
- Provide educational content about your products

## Customer Service Excellence

### Local Customer Expectations:
- **Response Time**: Within 2-4 hours
- **Communication**: WhatsApp and phone support
- **Returns**: Flexible return policies
- **Support Hours**: Extended hours including weekends

### Best Practices:
- Offer multiple contact channels
- Provide local phone numbers
- Train staff in local dialects
- Understand cultural nuances

## Technology Considerations

### Mobile-First Design
- Optimize for mobile devices
- Fast loading times (under 3 seconds)
- Touch-friendly navigation
- Mobile payment integration

### Security Measures
- SSL certificates on all pages
- PCI DSS compliance
- Regular security updates
- Fraud detection systems

## Success Metrics to Track

### Key Performance Indicators:
- **Conversion Rate**: Aim for 2-3%
- **Average Order Value**: Track and optimize
- **Customer Lifetime Value**: Focus on retention
- **Mobile vs Desktop Sales**: Monitor trends

### Analytics Tools:
- Google Analytics 4
- Facebook Pixel
- Hotjar for user behavior
- Local analytics platforms

## Case Study: Island Fashion Boutique

Our client, Island Fashion Boutique, successfully transitioned from a physical store to a thriving e-commerce business:

**Results Achieved:**
- 500% increase in sales within 6 months
- Expanded to 5 Caribbean countries
- 40% increase in customer base
- 95% customer satisfaction rating

**Key Success Factors:**
- Mobile-optimized website
- Local payment integration
- Excellent customer service
- Strategic social media presence

## Future Trends to Watch

### Emerging Technologies:
- **AI-Powered Chatbots**: 24/7 customer support
- **Voice Commerce**: Growing adoption of voice assistants
- **Augmented Reality**: Virtual try-on experiences
- **Blockchain**: Secure payment solutions

### Market Evolution:
- Increased mobile commerce adoption
- Growth in cross-border trade
- Rise of social commerce
- Integration of offline and online experiences

## Getting Started Checklist

### Pre-Launch:
- [ ] Business registration and licensing
- [ ] Website development and testing
- [ ] Payment gateway setup
- [ ] Shipping partner agreements
- [ ] Legal compliance review

### Launch Phase:
- [ ] Soft launch with limited products
- [ ] Customer feedback collection
- [ ] Performance optimization
- [ ] Marketing campaign initiation
- [ ] Customer service training

### Post-Launch:
- [ ] Regular performance monitoring
- [ ] Customer feedback integration
- [ ] Continuous optimization
- [ ] Expansion planning
- [ ] Technology updates

## Conclusion

E-commerce in Trinidad & Tobago offers tremendous opportunities for businesses willing to adapt to local market conditions. Success requires understanding local preferences, implementing the right technology, and providing excellent customer service.

The key to success lies in:
- **Local Market Understanding**: Know your customers
- **Technology Excellence**: Mobile-first, secure, fast
- **Customer Service**: Responsive and culturally aware
- **Continuous Improvement**: Adapt and evolve

Ready to start your e-commerce journey? Contact Nexus Web for expert guidance and custom e-commerce solutions tailored to the Trinidad & Tobago market.

---

*This guide is part of our commitment to helping Caribbean businesses succeed in the digital economy. For personalized e-commerce solutions, contact our team today.*
    `
  },
  {
    id: 'blog-2',
    title: 'Mobile-First Design: Why It Matters for Caribbean Businesses',
    excerpt: 'With 80% of Caribbean users browsing on mobile, discover why mobile-first design is crucial for your business success.',
    author: 'Michael Chen',
    date: '2024-01-10',
    readTime: '6 min',
    category: 'Web Design',
    image: 'https://picsum.photos/600/400?random=501',
    slug: 'mobile-first-design-caribbean-businesses',
    content: `
# Mobile-First Design: Why It Matters for Caribbean Businesses

In the Caribbean, mobile devices aren't just a trend—they're the primary way people access the internet. With 80% of Caribbean users browsing on mobile devices, businesses that don't prioritize mobile-first design are missing out on significant opportunities.

## The Caribbean Mobile Landscape

### Mobile Usage Statistics:
- **80%** of internet users access the web via mobile
- **65%** of online purchases are made on mobile devices
- **90%** of social media usage is mobile
- **70%** of search queries are mobile-based

### Why Mobile-First Matters in the Caribbean:
- Limited desktop computer access in many areas
- High smartphone penetration rates
- Mobile data plans are more affordable than home internet
- Cultural preference for mobile communication

## What is Mobile-First Design?

Mobile-first design is a design philosophy that prioritizes mobile devices in the design process. Instead of designing for desktop and then adapting for mobile, we start with mobile and enhance for larger screens.

### Core Principles:
1. **Content Priority**: Most important content first
2. **Touch-Friendly**: Large, accessible touch targets
3. **Fast Loading**: Optimized for slower connections
4. **Simplified Navigation**: Easy-to-use mobile menus
5. **Readable Text**: Appropriate font sizes for mobile screens

## Benefits of Mobile-First Design

### 1. Improved User Experience
- Faster loading times
- Better navigation
- Optimized content layout
- Enhanced readability

### 2. Better Search Rankings
- Google's mobile-first indexing
- Improved Core Web Vitals
- Better user engagement metrics
- Reduced bounce rates

### 3. Increased Conversions
- Easier checkout process
- Better form completion rates
- Improved call-to-action visibility
- Enhanced user trust

### 4. Cost Efficiency
- Single codebase for all devices
- Reduced maintenance costs
- Faster development cycles
- Better resource utilization

## Mobile-First Design Best Practices

### 1. Content Strategy
**Prioritize Content:**
- Most important information first
- Clear, concise messaging
- Scannable content structure
- Minimal text blocks

**Visual Hierarchy:**
- Clear headings and subheadings
- Proper spacing and typography
- High-contrast color schemes
- Meaningful images and icons

### 2. Navigation Design
**Hamburger Menus:**
- Standard mobile navigation pattern
- Easy to access and use
- Clear menu structure
- Smooth animations

**Breadcrumbs:**
- Help users understand location
- Easy navigation back
- Clear page hierarchy
- Touch-friendly design

### 3. Touch Interface
**Touch Targets:**
- Minimum 44px × 44px
- Adequate spacing between elements
- Clear visual feedback
- Accessible for all users

**Gestures:**
- Swipe navigation
- Pinch to zoom
- Pull to refresh
- Intuitive interactions

### 4. Performance Optimization
**Loading Speed:**
- Optimized images
- Minimal HTTP requests
- Efficient CSS and JavaScript
- CDN implementation

**Progressive Enhancement:**
- Core functionality works without JavaScript
- Enhanced features for capable devices
- Graceful degradation
- Accessibility compliance

## Technical Implementation

### 1. Responsive Design
- Mobile-first CSS approach
- Flexible container layouts
- Responsive breakpoints
- Fluid typography

### 2. Viewport Configuration
- Proper viewport meta tags
- Device width scaling
- Touch-friendly interactions

### 3. Touch-Friendly Forms
- Large input fields
- Clear labels
- Appropriate input types
- Validation feedback

### 4. Image Optimization
- Responsive images
- WebP format support
- Lazy loading
- Appropriate sizing

## Caribbean-Specific Considerations

### 1. Network Conditions
**Slow Connections:**
- Optimize for 3G networks
- Minimize data usage
- Implement offline capabilities
- Progressive loading

**Intermittent Connectivity:**
- Offline-first approach
- Data synchronization
- Error handling
- User feedback

### 2. Device Diversity
**Older Devices:**
- Support for older browsers
- Reduced JavaScript dependency
- Optimized performance
- Accessibility features

**Screen Sizes:**
- Various mobile screen sizes
- Different aspect ratios
- Orientation changes
- Safe area considerations

### 3. Cultural Preferences
**Communication Style:**
- Direct, clear messaging
- Visual communication
- Local language support
- Cultural imagery

**User Behavior:**
- Social media integration
- Sharing capabilities
- Community features
- Local content relevance

## Testing and Optimization

### 1. Device Testing
- Real device testing
- Multiple screen sizes
- Different operating systems
- Various browsers

### 2. Performance Testing
- Page load speed
- Core Web Vitals
- User experience metrics
- Conversion tracking

### 3. User Testing
- Local user feedback
- Usability testing
- A/B testing
- Analytics analysis

## Case Study: Caribbean Restaurant Group

Our client, Caribbean Restaurant Group, implemented mobile-first design for their online ordering system:

**Results:**
- 300% increase in mobile orders
- 45% reduction in cart abandonment
- 60% improvement in page load speed
- 90% customer satisfaction rating

**Key Improvements:**
- Simplified ordering process
- Mobile-optimized menu
- One-click reordering
- Real-time order tracking

## Future Trends

### 1. Progressive Web Apps (PWAs)
- Offline functionality
- App-like experience
- Push notifications
- Home screen installation

### 2. Voice Search Optimization
- Natural language processing
- Voice-friendly content
- Local search optimization
- Conversational interfaces

### 3. Augmented Reality
- Virtual try-on experiences
- Interactive product visualization
- Location-based services
- Enhanced user engagement

## Implementation Checklist

### Design Phase:
- [ ] Mobile wireframes
- [ ] Content prioritization
- [ ] Navigation structure
- [ ] Visual design

### Development Phase:
- [ ] Responsive framework
- [ ] Touch interface
- [ ] Performance optimization
- [ ] Cross-browser testing

### Testing Phase:
- [ ] Device testing
- [ ] Performance testing
- [ ] User testing
- [ ] Analytics setup

### Launch Phase:
- [ ] Performance monitoring
- [ ] User feedback collection
- [ ] Continuous optimization
- [ ] Regular updates

## Conclusion

Mobile-first design isn't just a trend—it's a necessity for Caribbean businesses. With the majority of users accessing the internet via mobile devices, prioritizing mobile experience is crucial for success.

Key takeaways:
- **Start with mobile**: Design for the smallest screen first
- **Optimize for performance**: Fast loading is essential
- **Consider local conditions**: Network and device diversity
- **Test thoroughly**: Real device testing is crucial
- **Monitor and improve**: Continuous optimization

At Nexus Web, we specialize in mobile-first design for Caribbean businesses. Our approach ensures your website works perfectly on all devices while providing an exceptional user experience.

Ready to transform your website with mobile-first design? Contact us today for a consultation.

---

*This article is part of our series on digital transformation for Caribbean businesses. Stay tuned for more insights and best practices.*
    `
  },
  {
    id: 'blog-3',
    title: 'SEO Strategies for Local Trinidad & Tobago Businesses',
    excerpt: 'Boost your local search rankings with these proven SEO strategies tailored for the Trinidad & Tobago market.',
    author: 'David Thompson',
    date: '2024-01-05',
    readTime: '10 min',
    category: 'SEO',
    image: 'https://picsum.photos/600/400?random=502',
    slug: 'seo-strategies-local-trinidad-tobago-businesses',
    content: `
# SEO Strategies for Local Trinidad & Tobago Businesses

Local SEO is crucial for businesses in Trinidad & Tobago looking to attract customers in their immediate area. With the right strategies, you can dominate local search results and drive more foot traffic to your business.

## Understanding Local SEO in Trinidad & Tobago

### Why Local SEO Matters:
- **80%** of local searches result in offline purchases
- **50%** of mobile searches are location-based
- **72%** of consumers visit stores within 5 miles of their search
- **Local businesses** appear in 64% of local search results

### Trinidad & Tobago Market Characteristics:
- **Population**: 1.4 million people
- **Major Cities**: Port of Spain, San Fernando, Arima, Point Fortin
- **Search Behavior**: Mobile-first, voice search growing
- **Competition**: Increasing digital adoption among local businesses

## Local SEO Fundamentals

### 1. Google My Business Optimization

**Complete Your Profile:**
- Business name, address, phone number (NAP)
- Business hours and special hours
- Business category and subcategories
- Business description with keywords
- High-quality photos and videos

**Regular Updates:**
- Post regular updates and offers
- Respond to customer reviews
- Add new photos regularly
- Update business information

### 2. Local Keyword Research

**Primary Keywords:**
- "web design Trinidad"
- "restaurant Port of Spain"
- "dentist San Fernando"
- "car repair Arima"

**Long-tail Keywords:**
- "best web designer near me"
- "affordable restaurant Port of Spain"
- "emergency dentist San Fernando"
- "24 hour car repair Arima"

**Local Modifiers:**
- "near me"
- "in Trinidad"
- "Port of Spain"
- "San Fernando"
- "local"

### 3. On-Page SEO Optimization

**Title Tags:**
- Web Design Services Trinidad & Tobago | Nexus Web
- Restaurant Port of Spain | Best Local Dining
- Dentist San Fernando | Emergency Dental Care

**Meta Descriptions:**
- Include location and primary service
- Clear call-to-action
- Under 160 characters
- Compelling value proposition

**Header Structure:**
- H1: Main keyword with location
- H2: Supporting keywords
- H3: Related topics
- Logical hierarchy

## Local Content Strategy

### 1. Location-Specific Content

**City Pages:**
- Dedicated pages for each service area
- Local landmarks and references
- Community involvement
- Local testimonials

**Service Area Pages:**
- Detailed service descriptions
- Local pricing information
- Area-specific benefits
- Local case studies

### 2. Local Business Blogging

**Content Ideas:**
- Local events and news
- Community involvement
- Local business spotlights
- Area-specific tips and advice

**Local Keywords Integration:**
- Natural keyword placement
- Local business mentions
- Area-specific content
- Local link building

### 3. Customer Reviews and Testimonials

**Review Management:**
- Encourage customer reviews
- Respond to all reviews
- Address negative feedback
- Showcase positive testimonials

**Review Platforms:**
- Google My Business
- Facebook Reviews
- TripAdvisor (for relevant businesses)
- Local business directories

## Technical SEO for Local Businesses

### 1. Local Schema Markup

**LocalBusiness Schema:**
- Structured data for local business information
- Address, phone, and location details
- Opening hours and business hours
- Geographic coordinates for mapping

### 2. Local Link Building

**Local Directory Listings:**
- Trinidad & Tobago business directories
- Industry-specific directories
- Local chamber of commerce
- Professional associations

**Local Partnerships:**
- Cross-linking with local businesses
- Community event sponsorships
- Local charity involvement
- Business networking groups

### 3. Mobile Optimization

**Mobile-First Design:**
- Fast loading times
- Touch-friendly navigation
- Local search optimization
- Voice search compatibility

**Local Search Features:**
- Click-to-call functionality
- Directions integration
- Local business hours
- Service area information

## Local SEO Tools and Resources

### 1. Google Tools
- **Google My Business**: Primary local SEO tool
- **Google Search Console**: Monitor local performance
- **Google Analytics**: Track local traffic
- **Google Trends**: Local keyword research

### 2. Local SEO Tools
- **Moz Local**: Local listing management
- **BrightLocal**: Local SEO tracking
- **Yext**: Multi-platform listing management
- **Whitespark**: Local citation building

### 3. Local Research Tools
- **Google Maps**: Local competition analysis
- **Facebook Local**: Local business discovery
- **Local business directories**: Citation opportunities
- **Local news sources**: Content and link opportunities

## Local SEO Best Practices

### 1. Consistency is Key
- **NAP Consistency**: Same name, address, phone across all platforms
- **Business Information**: Consistent hours, services, descriptions
- **Brand Messaging**: Unified voice and tone
- **Visual Identity**: Consistent logos and images

### 2. Regular Monitoring
- **Local Rankings**: Track position changes
- **Customer Reviews**: Monitor and respond
- **Competitor Analysis**: Watch local competition
- **Performance Metrics**: Track local traffic and conversions

### 3. Continuous Improvement
- **Content Updates**: Regular blog posts and updates
- **Technical Optimization**: Ongoing site improvements
- **User Experience**: Enhance local user journey
- **Local Engagement**: Community involvement

## Case Study: Local Restaurant Success

Our client, a local restaurant in Port of Spain, implemented comprehensive local SEO:

**Results:**
- 400% increase in local search traffic
- 250% increase in phone calls
- 180% increase in foot traffic
- Top 3 rankings for local keywords

**Key Strategies:**
- Complete Google My Business optimization
- Local content creation
- Customer review management
- Local link building

## Common Local SEO Mistakes

### 1. Inconsistent NAP Information
- Different phone numbers across platforms
- Inconsistent business names
- Outdated addresses
- Missing business hours

### 2. Ignoring Mobile Users
- Non-mobile-friendly websites
- Slow loading times
- Poor mobile navigation
- Missing local search features

### 3. Neglecting Customer Reviews
- Not encouraging reviews
- Ignoring negative feedback
- Not responding to reviews
- Not showcasing testimonials

### 4. Poor Local Content
- Generic content without local relevance
- Missing local keywords
- No local business mentions
- Lack of local community involvement

## Advanced Local SEO Strategies

### 1. Voice Search Optimization
- **Natural Language**: Conversational keywords
- **Local Questions**: "Where is the nearest..."
- **Long-tail Keywords**: "best restaurant near me"
- **Featured Snippets**: Optimize for voice answers

### 2. Local Video Content
- **Business Tours**: Show your location
- **Customer Testimonials**: Local customer stories
- **Service Demonstrations**: Show your expertise
- **Local Events**: Community involvement

### 3. Local Social Media
- **Facebook Local**: Local business discovery
- **Instagram Location Tags**: Local area tagging
- **Local Hashtags**: Area-specific hashtags
- **Community Groups**: Local business networking

## Measuring Local SEO Success

### 1. Key Performance Indicators
- **Local Search Rankings**: Position in local results
- **Local Traffic**: Visitors from local searches
- **Phone Calls**: Tracked phone inquiries
- **Foot Traffic**: Store visits from online searches

### 2. Local Analytics
- **Google My Business Insights**: Local performance data
- **Google Analytics**: Local traffic analysis
- **Call Tracking**: Phone call attribution
- **Conversion Tracking**: Local lead generation

### 3. Competitive Analysis
- **Local Competitor Rankings**: Monitor competition
- **Local Market Share**: Your position in local market
- **Local Opportunities**: Gaps in local market
- **Local Trends**: Local search behavior changes

## Local SEO Implementation Plan

### Phase 1: Foundation (Weeks 1-2)
- [ ] Google My Business optimization
- [ ] Local keyword research
- [ ] On-page SEO optimization
- [ ] Local schema markup

### Phase 2: Content Creation (Weeks 3-4)
- [ ] Local content development
- [ ] Customer review management
- [ ] Local link building
- [ ] Mobile optimization

### Phase 3: Monitoring (Weeks 5-6)
- [ ] Performance tracking
- [ ] Competitor analysis
- [ ] User feedback collection
- [ ] Strategy refinement

### Phase 4: Optimization (Ongoing)
- [ ] Continuous improvement
- [ ] Content updates
- [ ] Technical optimization
- [ ] Local engagement

## Conclusion

Local SEO is essential for Trinidad & Tobago businesses looking to attract local customers. By implementing comprehensive local SEO strategies, you can improve your visibility in local search results and drive more business to your location.

Key success factors:
- **Complete Google My Business optimization**
- **Local keyword research and optimization**
- **High-quality local content creation**
- **Customer review management**
- **Mobile-first design and optimization**
- **Regular monitoring and improvement**

At Nexus Web, we specialize in local SEO for Trinidad & Tobago businesses. Our comprehensive approach ensures your business ranks well in local search results and attracts more local customers.

Ready to dominate local search results? Contact us today for a local SEO consultation.

---

*This guide is part of our commitment to helping Trinidad & Tobago businesses succeed online. For personalized local SEO services, contact our team.*
    `
  },
  {
    id: 'blog-4',
    title: 'Website Security: Protecting Your Business Online',
    excerpt: 'Essential security measures every business website should implement to protect customer data and maintain trust.',
    author: 'Lisa Williams',
    date: '2024-01-01',
    readTime: '7 min',
    category: 'Security',
    image: 'https://picsum.photos/600/400?random=503',
    slug: 'website-security-protecting-business-online',
    content: `
# Website Security: Protecting Your Business Online

In today's digital landscape, website security is not optional—it's essential. With cyber threats becoming more sophisticated and frequent, businesses must implement comprehensive security measures to protect their data, customers, and reputation.

## The Importance of Website Security

### Why Security Matters:
- **Customer Trust**: Secure websites build customer confidence
- **Data Protection**: Protect sensitive customer information
- **Business Continuity**: Prevent downtime and data loss
- **Legal Compliance**: Meet regulatory requirements
- **Brand Reputation**: Avoid security breach damage

### Current Threat Landscape:
- **Ransomware Attacks**: Increased 150% in 2023
- **Data Breaches**: Average cost of $4.35 million
- **DDoS Attacks**: Growing in frequency and complexity
- **Phishing Scams**: More sophisticated targeting
- **Malware Infections**: Automated attack vectors

## Essential Security Measures

### 1. SSL/TLS Certificates

**What is SSL/TLS:**
- Secure Sockets Layer/Transport Layer Security
- Encrypts data between browser and server
- Prevents data interception
- Required for HTTPS protocol

**Implementation:**
- Install SSL certificate on all pages
- Force HTTPS redirects
- Mixed content warnings
- Certificate monitoring

### 2. Strong Authentication

**Password Policies:**
- Minimum 12 characters
- Mix of letters, numbers, symbols
- Regular password updates
- No common passwords

**Multi-Factor Authentication (MFA):**
- SMS verification codes
- Authenticator apps
- Hardware security keys
- Biometric authentication

### 3. Regular Security Updates

**Software Updates:**
- Content Management Systems (WordPress, etc.)
- Plugins and extensions
- Server software
- Security patches

**Update Schedule:**
- Weekly security checks
- Monthly major updates
- Quarterly security audits
- Annual comprehensive review

### 4. Firewall Protection

**Web Application Firewall (WAF):**
- Block malicious traffic
- Prevent common attacks
- Monitor traffic patterns
- Real-time threat detection

**Server Firewall:**
- Network-level protection
- Port filtering
- IP blocking
- Traffic monitoring

## Advanced Security Measures

### 1. Data Encryption

**At Rest Encryption:**
- Database encryption
- File system encryption
- Backup encryption
- Key management

**In Transit Encryption:**
- HTTPS everywhere
- API encryption
- Database connections
- File uploads

### 2. Access Control

**User Permissions:**
- Role-based access control
- Principle of least privilege
- Regular access reviews
- Account deactivation

**Admin Security:**
- Separate admin accounts
- IP whitelisting
- Session management
- Activity logging

### 3. Backup and Recovery

**Regular Backups:**
- Daily automated backups
- Multiple backup locations
- Encrypted backup storage
- Backup testing

**Disaster Recovery:**
- Recovery time objectives
- Recovery point objectives
- Incident response plan
- Business continuity plan

## Security Monitoring and Detection

### 1. Security Logging

**What to Log:**
- User authentication attempts
- File access and modifications
- Database queries
- System errors

**Log Management:**
- Centralized logging
- Log retention policies
- Log analysis tools
- Alert systems

### 2. Intrusion Detection

**Automated Monitoring:**
- Real-time threat detection
- Anomaly detection
- Behavioral analysis
- Threat intelligence

**Manual Monitoring:**
- Regular security reviews
- Vulnerability assessments
- Penetration testing
- Security audits

### 3. Incident Response

**Response Plan:**
- Incident classification
- Response procedures
- Communication protocols
- Recovery steps

**Team Preparation:**
- Security training
- Incident simulations
- Documentation
- Regular updates

## Common Security Vulnerabilities

### 1. SQL Injection

**What it is:**
- Malicious SQL code injection
- Database manipulation
- Data theft
- System compromise

**Prevention:**
- Parameterized queries
- Input validation
- Database permissions
- Regular testing

### 2. Cross-Site Scripting (XSS)

**What it is:**
- Malicious script injection
- User session hijacking
- Data theft
- Website defacement

**Prevention:**
- Input sanitization
- Output encoding
- Content Security Policy
- Regular testing

### 3. Cross-Site Request Forgery (CSRF)

**What it is:**
- Unauthorized actions
- User account compromise
- Data manipulation
- Financial fraud

**Prevention:**
- CSRF tokens
- SameSite cookies
- Referrer validation
- Regular testing

### 4. File Upload Vulnerabilities

**What it is:**
- Malicious file uploads
- Server compromise
- Data theft
- System damage

**Prevention:**
- File type validation
- File size limits
- Virus scanning
- Secure storage

## Security Best Practices

### 1. Content Security Policy (CSP)

**Implementation:**
- Content Security Policy meta tags
- Default source restrictions
- Script and style source controls
- Security policy enforcement

**Benefits:**
- Prevent XSS attacks
- Control resource loading
- Monitor policy violations
- Improve security posture

### 2. HTTP Security Headers

**Security Headers:**
- **X-Frame-Options**: Prevent clickjacking
- **X-Content-Type-Options**: Prevent MIME sniffing
- **X-XSS-Protection**: Enable XSS filtering
- **Strict-Transport-Security**: Force HTTPS

### 3. Regular Security Testing

**Testing Types:**
- Vulnerability scanning
- Penetration testing
- Security audits
- Code reviews

**Testing Schedule:**
- Monthly automated scans
- Quarterly penetration tests
- Annual security audits
- Continuous monitoring

## Compliance and Regulations

### 1. GDPR Compliance

**Requirements:**
- Data protection by design
- User consent management
- Data breach notification
- User rights management

**Implementation:**
- Privacy policy updates
- Cookie consent
- Data processing records
- Regular compliance audits

### 2. PCI DSS Compliance

**Requirements:**
- Secure payment processing
- Data encryption
- Access control
- Regular monitoring

**Implementation:**
- Payment gateway security
- Data encryption
- Access logging
- Regular assessments

### 3. Local Regulations

**Trinidad & Tobago:**
- Data Protection Act compliance
- Consumer protection laws
- Industry-specific regulations
- Regular legal reviews

## Security Tools and Services

### 1. Security Plugins

**WordPress Security:**
- Wordfence Security
- Sucuri Security
- iThemes Security
- All In One WP Security

**General Security:**
- Cloudflare Security
- AWS WAF
- Google Cloud Security
- Azure Security Center

### 2. Monitoring Services

**Security Monitoring:**
- Sucuri SiteCheck
- Google Safe Browsing
- VirusTotal
- Security headers analysis

**Performance Monitoring:**
- Google PageSpeed Insights
- GTmetrix
- Pingdom
- Uptime monitoring

### 3. Backup Services

**Automated Backups:**
- UpdraftPlus
- BackupBuddy
- VaultPress
- Cloud backup services

**Manual Backups:**
- Server backups
- Database exports
- File system backups
- Configuration backups

## Case Study: E-Commerce Security Success

Our client, a Trinidad-based e-commerce business, implemented comprehensive security measures:

**Results:**
- Zero security breaches in 2 years
- 100% customer data protection
- PCI DSS compliance achieved
- 99.9% uptime maintained

**Key Security Measures:**
- SSL/TLS encryption
- Multi-factor authentication
- Regular security updates
- Comprehensive monitoring

## Security Incident Response

### 1. Incident Detection

**Detection Methods:**
- Automated monitoring
- User reports
- Security scans
- Performance anomalies

**Response Time:**
- Immediate threat assessment
- 1-hour initial response
- 24-hour containment
- 72-hour resolution

### 2. Incident Containment

**Containment Steps:**
- Isolate affected systems
- Block malicious traffic
- Preserve evidence
- Notify stakeholders

**Communication:**
- Internal team notification
- Customer communication
- Regulatory reporting
- Public relations

### 3. Recovery and Lessons Learned

**Recovery Process:**
- System restoration
- Data recovery
- Security hardening
- Monitoring enhancement

**Post-Incident:**
- Incident documentation
- Root cause analysis
- Process improvement
- Training updates

## Security Budget Considerations

### 1. Essential Security Costs

**Basic Security:**
- SSL certificates: $50-200/year
- Security plugins: $100-500/year
- Backup services: $200-1000/year
- Monitoring tools: $100-500/year

**Advanced Security:**
- WAF services: $500-2000/year
- Penetration testing: $2000-10000/year
- Security consulting: $5000-20000/year
- Incident response: $10000-50000/incident

### 2. ROI of Security Investment

**Cost Avoidance:**
- Data breach prevention
- Downtime reduction
- Legal compliance
- Reputation protection

**Business Benefits:**
- Customer trust
- Competitive advantage
- Insurance benefits
- Regulatory compliance

## Security Implementation Checklist

### Phase 1: Foundation (Week 1)
- [ ] SSL certificate installation
- [ ] Security plugin setup
- [ ] Backup system configuration
- [ ] Basic monitoring setup

### Phase 2: Enhancement (Week 2-3)
- [ ] Multi-factor authentication
- [ ] Security headers implementation
- [ ] Access control setup
- [ ] Regular update schedule

### Phase 3: Advanced (Week 4-6)
- [ ] WAF implementation
- [ ] Security testing
- [ ] Incident response plan
- [ ] Team training

### Phase 4: Maintenance (Ongoing)
- [ ] Regular security updates
- [ ] Continuous monitoring
- [ ] Periodic testing
- [ ] Policy updates

## Conclusion

Website security is a critical investment for any business operating online. By implementing comprehensive security measures, you can protect your business, customers, and reputation from cyber threats.

Key security priorities:
- **SSL/TLS encryption for all data**
- **Strong authentication and access control**
- **Regular security updates and monitoring**
- **Comprehensive backup and recovery**
- **Incident response planning**
- **Ongoing security education**

At Nexus Web, we prioritize security in all our web development projects. Our security-first approach ensures your website is protected against current and emerging threats.

Ready to secure your website? Contact us today for a security assessment and implementation plan.

---

*This guide is part of our commitment to helping businesses protect their online presence. For comprehensive security solutions, contact our security team.*
    `
  }
]

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
    id: 'trust-3',
    type: 'award',
    title: 'Best Web Agency',
    value: '2023',
    description: 'Recognized by Trinidad Business Awards'
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
    name: 'Caribbean Restaurant Group',
    image: 'https://picsum.photos/120/80?random=600',
    industry: 'Restaurant'
  },
  {
    id: 'logo-2',
    name: 'Thompson Medical Center',
    image: 'https://picsum.photos/120/80?random=601',
    industry: 'Healthcare'
  },
  {
    id: 'logo-3',
    name: 'Island Fashion Boutique',
    image: 'https://picsum.photos/120/80?random=602',
    industry: 'Retail'
  },
  {
    id: 'logo-4',
    name: 'Trinidad Tech Solutions',
    image: 'https://picsum.photos/120/80?random=603',
    industry: 'Technology'
  },
  {
    id: 'logo-5',
    name: 'Caribbean Legal Services',
    image: 'https://picsum.photos/120/80?random=604',
    industry: 'Professional Services'
  },
  {
    id: 'logo-6',
    name: 'Singh Construction Ltd',
    image: 'https://picsum.photos/120/80?random=605',
    industry: 'Construction'
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
