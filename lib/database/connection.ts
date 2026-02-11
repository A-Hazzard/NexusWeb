import { Database } from './schema';

// Simple in-memory database for development
// In production, this would be replaced with a real database like PostgreSQL, MySQL, or MongoDB
class InMemoryDatabase {
  private data: Database = {
    users: [],
    blog_posts: [],
    categories: [],
    tags: [],
    post_categories: [],
    post_tags: [],
    media: [],
    analytics: [],
    portfolio_analytics: [],
    blog_analytics: [],
    portfolio_projects: [],
    portfolio_categories: [],
    portfolio_technologies: [],
    project_categories: [],
    project_technologies: [],
    project_images: [],
    sessions: [],
  };

  // Generic CRUD operations
  async create<T extends keyof Database>(table: T, data: Omit<Database[T][0], 'id' | 'created_at'>): Promise<Database[T][0]> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const newRecord = {
      ...data,
      id,
      created_at: now,
      ...(data.hasOwnProperty('updated_at') && { updated_at: now }),
    } as Database[T][0];

    this.data[table].push(newRecord);
    return newRecord;
  }

  async findById<T extends keyof Database>(table: T, id: string): Promise<Database[T][0] | null> {
    const record = this.data[table].find(item => (item as { id: string }).id === id);
    return record || null;
  }

  async findMany<T extends keyof Database>(
    table: T, 
    filter?: Partial<Database[T][0]>
  ): Promise<Database[T][0][]> {
    if (!filter) return [...this.data[table]];

    return this.data[table].filter(item => {
      return Object.entries(filter).every(([key, value]) => {
        if (value === undefined) return true;
        return (item as Record<string, unknown>)[key] === value;
      });
    });
  }

  async update<T extends keyof Database>(
    table: T, 
    id: string, 
    data: Partial<Omit<Database[T][0], 'id' | 'created_at'>>
  ): Promise<Database[T][0] | null> {
    const index = this.data[table].findIndex(item => (item as { id: string }).id === id);
    if (index === -1) return null;

    const updatedRecord = {
      ...this.data[table][index],
      ...data,
      ...(data.hasOwnProperty('updated_at') && { updated_at: new Date() }),
    } as Database[T][0];

    this.data[table][index] = updatedRecord;
    return updatedRecord;
  }

  async delete<T extends keyof Database>(table: T, id: string): Promise<boolean> {
    const index = this.data[table].findIndex(item => (item as { id: string }).id === id);
    if (index === -1) return false;

    this.data[table].splice(index, 1);
    return true;
  }

  async count<T extends keyof Database>(table: T, filter?: Partial<Database[T][0]>): Promise<number> {
    const records = await this.findMany(table, filter);
    return records.length;
  }

  // Specialized methods for common operations
  async findBlogPostsByStatus(status: 'draft' | 'published' | 'scheduled') {
    return this.findMany('blog_posts', { status });
  }

  async findPublishedBlogPosts() {
    return this.findMany('blog_posts', { status: 'published' });
  }

  async findFeaturedBlogPosts() {
    return this.findMany('blog_posts', { featured: true, status: 'published' });
  }

  async findBlogPostsByCategory(categoryId: string) {
    const postCategories = await this.findMany('post_categories', { category_id: categoryId });
    const postIds = postCategories.map(pc => pc.post_id);
    
    return this.data.blog_posts.filter(post => 
      postIds.includes(post.id) && post.status === 'published'
    );
  }

  async findBlogPostsByTag(tagId: string) {
    const postTags = await this.findMany('post_tags', { tag_id: tagId });
    const postIds = postTags.map(pt => pt.post_id);
    
    return this.data.blog_posts.filter(post => 
      postIds.includes(post.id) && post.status === 'published'
    );
  }

  async findPortfolioProjectsByStatus(status: 'in-progress' | 'completed' | 'on-hold') {
    return this.findMany('portfolio_projects', { status });
  }

  async findFeaturedPortfolioProjects() {
    return this.findMany('portfolio_projects', { featured: true });
  }

  async findPortfolioProjectsByCategory(categoryId: string) {
    // Get project IDs that belong to this category through the relationship table
    const projectCategories = await this.findMany('project_categories', { category_id: categoryId });
    const projectIds = projectCategories.map(pc => pc.project_id);
    
    // Return projects that match these IDs
    return this.data.portfolio_projects.filter(project => 
      projectIds.includes(project.id)
    );
  }

  async findUserByEmail(email: string) {
    return this.data.users.find(user => user.email === email) || null;
  }

  async findSessionByToken(token: string) {
    return this.data.sessions.find(session => session.token === token) || null;
  }

  // Analytics methods
  async trackPageView(entityType: 'blog_post' | 'portfolio_project' | 'page', entityId: string, analyticsData: {
    referrer?: string;
    userAgent?: string;
    ipAddress?: string;
    country?: string;
    city?: string;
  }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if analytics record exists for today
    const existingRecord = this.data.analytics.find(record => 
      record.entity_type === entityType &&
      record.entity_id === entityId &&
      record.date.getTime() === today.getTime()
    );

    if (existingRecord) {
      // Update existing record
      existingRecord.page_views += 1;
      existingRecord.unique_views += 1; // Simplified - in production you'd track unique users
      return existingRecord;
    } else {
      // Create new record
      return await this.create('analytics', {
        entity_type: entityType,
        entity_id: entityId,
        page_views: 1,
        unique_views: 1,
        time_on_page: 0,
        bounce_rate: 0,
        date: today,
        referrer: analyticsData.referrer || null,
        user_agent: analyticsData.userAgent || null,
        ip_address: analyticsData.ipAddress || null,
        country: analyticsData.country || null,
        city: analyticsData.city || null,
      });
    }
  }

  async getAnalyticsSummary(days: number = 30) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const analytics = this.data.analytics.filter(record => 
      record.date >= startDate && record.date <= endDate
    );

    const totalViews = analytics.reduce((sum, record) => sum + record.page_views, 0);
    const totalUniqueViews = analytics.reduce((sum, record) => sum + record.unique_views, 0);

    // Group by entity type
    const blogViews = analytics
      .filter(record => record.entity_type === 'blog_post')
      .reduce((sum, record) => sum + record.page_views, 0);

    const portfolioViews = analytics
      .filter(record => record.entity_type === 'portfolio_project')
      .reduce((sum, record) => sum + record.page_views, 0);

    return {
      totalViews,
      totalUniqueViews,
      blogViews,
      portfolioViews,
      period: `${days} days`,
      startDate,
      endDate,
    };
  }

  async getTopContent(entityType: 'blog_post' | 'portfolio_project' | 'page', limit: number = 10) {
    const analytics = this.data.analytics.filter(record => 
      record.entity_type === entityType
    );

    // Group by entity_id and sum views
    const contentViews = new Map<string, number>();
    analytics.forEach(record => {
      if (record.entity_id) {
        contentViews.set(record.entity_id, (contentViews.get(record.entity_id) || 0) + record.page_views);
      }
    });

    // Sort by views and return top content
    return Array.from(contentViews.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([entityId, views]) => ({ entityId, views }));
  }

  // Initialize with sample data
  async initialize() {
    // Create default admin user
    const adminUser = await this.create('users', {
      email: 'admin@nexusweb.tt',
      password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqKqKq', // admin123
      role: 'admin',
      first_name: 'Admin',
      last_name: 'User',
      last_login: null,
      is_active: true,
    });

    // Create default categories
    await this.create('categories', {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Articles about web development technologies and practices',
      color: '#3B82F6',
    });

    await this.create('categories', {
      name: 'SEO & Marketing',
      slug: 'seo-marketing',
      description: 'Search engine optimization and digital marketing insights',
      color: '#10B981',
    });

    await this.create('categories', {
      name: 'Design',
      slug: 'design',
      description: 'Web design principles and best practices',
      color: '#8B5CF6',
    });

    // Create default tags
    await this.create('tags', {
      name: 'React',
      slug: 'react',
    });

    await this.create('tags', {
      name: 'Next.js',
      slug: 'nextjs',
    });

    await this.create('tags', {
      name: 'SEO',
      slug: 'seo',
    });

    // Create sample blog post
    await this.create('blog_posts', {
      title: 'Getting Started with Next.js 15',
      slug: 'getting-started-with-nextjs-15',
      excerpt: 'Learn how to build modern web applications with Next.js 15 and its new features.',
      content: '# Getting Started with Next.js 15\n\nNext.js 15 brings exciting new features...',
      author_id: adminUser.id,
      status: 'published',
      published_at: new Date(),
      meta_title: 'Getting Started with Next.js 15 - Nexus Web',
      meta_description: 'Learn how to build modern web applications with Next.js 15 and its new features.',
      tags: ['Next.js', 'React', 'Web Development'],
      featured: true,
      updated_at: new Date(),
      featured_image: null,
      view_count: 0,
    });

    // Create portfolio categories
    const ecommerceCategory = await this.create('portfolio_categories', {
      name: 'E-Commerce',
      slug: 'ecommerce',
      description: 'Online store and marketplace projects',
      color: '#F59E0B',
    });

    await this.create('portfolio_categories', {
      name: 'Corporate',
      slug: 'corporate',
      description: 'Business and corporate website projects',
      color: '#EF4444',
    });

    const hospitalityCategory = await this.create('portfolio_categories', {
      name: 'Hospitality',
      slug: 'hospitality',
      description: 'Hotel, resort, and tourism projects',
      color: '#10B981',
    });

    const businessDirectoryCategory = await this.create('portfolio_categories', {
      name: 'Business Directory',
      slug: 'business-directory',
      description: 'Business listing and directory platforms',
      color: '#8B5CF6',
    });

    // Create portfolio technologies
    const reactTech = await this.create('portfolio_technologies', {
      name: 'React',
      slug: 'react',
      icon: '⚛️',
    });

    const nextjsTech = await this.create('portfolio_technologies', {
      name: 'Next.js',
      slug: 'nextjs',
      icon: '▲',
    });

    const tailwindTech = await this.create('portfolio_technologies', {
      name: 'Tailwind CSS',
      slug: 'tailwind-css',
      icon: '🎨',
    });

    // Create sample portfolio projects
    const sampleProject1 = await this.create('portfolio_projects', {
      title: 'Caribbean Resort & Spa',
      slug: 'caribbean-resort-spa',
      excerpt: 'Luxury resort website with booking system, virtual tours, and multilingual support for international guests.',
      description: 'A comprehensive website for a luxury Caribbean resort featuring advanced booking systems, virtual tours, and multilingual support. The platform handles international guest bookings with integrated payment processing and reservation management.',
      client_name: 'Caribbean Luxury Resorts Ltd.',
      project_url: 'https://caribbeanresort.example.com',
      status: 'completed',
      featured: true,
      start_date: '2023-03-15',
      end_date: '2023-08-30',
      author_id: adminUser.id,
      featured_image: 'https://picsum.photos/seed/resort/1200/800',
      gallery_images: [
        'https://picsum.photos/seed/resort1/800/600',
        'https://picsum.photos/seed/resort2/800/600',
      ],
      meta_title: 'Caribbean Resort & Spa - Nexus Web Portfolio',
      meta_description: 'Luxury resort website with advanced booking system and virtual tours.',
      view_count: 320,
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
      categories: ['Hospitality'],
      updated_at: new Date(),
    });

    const sampleProject2 = await this.create('portfolio_projects', {
      title: 'TT Local Business Directory',
      slug: 'tt-local-business-directory',
      excerpt: 'Comprehensive business directory for Trinidad & Tobago with advanced search, reviews, and location mapping.',
      description: 'A comprehensive business directory platform for Trinidad & Tobago featuring advanced search capabilities, business reviews, location mapping, and a user-friendly interface for both businesses and customers.',
      client_name: 'TT Business Association',
      project_url: 'https://ttbusiness.example.com',
      status: 'completed',
      featured: true,
      start_date: '2023-01-10',
      end_date: '2023-06-20',
      author_id: adminUser.id,
      featured_image: 'https://picsum.photos/seed/directory/1200/800',
      gallery_images: [
        'https://picsum.photos/seed/directory1/800/600',
        'https://picsum.photos/seed/directory2/800/600',
      ],
      meta_title: 'TT Local Business Directory - Nexus Web Portfolio',
      meta_description: 'Comprehensive business directory for Trinidad & Tobago with advanced search and mapping.',
      view_count: 450,
      technologies: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
      categories: ['Business Directory'],
      updated_at: new Date(),
    });

    const sampleProject3 = await this.create('portfolio_projects', {
      title: 'Caribbean E-Commerce Platform',
      slug: 'caribbean-ecommerce-platform',
      excerpt: 'Multi-vendor marketplace supporting TTD payments, local delivery, and Caribbean-wide shipping solutions.',
      description: 'A multi-vendor e-commerce marketplace designed specifically for the Caribbean market, supporting TTD payments, local delivery options, and Caribbean-wide shipping solutions with integrated inventory management.',
      client_name: 'Caribbean Market Hub',
      project_url: 'https://caribbeanmarket.example.com',
      status: 'completed',
      featured: true,
      start_date: '2023-05-01',
      end_date: '2023-10-15',
      author_id: adminUser.id,
      featured_image: 'https://picsum.photos/seed/ecommerce/1200/800',
      gallery_images: [
        'https://picsum.photos/seed/ecommerce1/800/600',
        'https://picsum.photos/seed/ecommerce2/800/600',
      ],
      meta_title: 'Caribbean E-Commerce Platform - Nexus Web Portfolio',
      meta_description: 'Multi-vendor marketplace for Caribbean businesses with TTD payments and local delivery.',
      view_count: 280,
      technologies: ['Next.js', 'Shopify API', 'PayPal', 'Tailwind CSS'],
      categories: ['E-Commerce'],
      updated_at: new Date(),
    });

    // Create project-category relationships
    await this.create('project_categories', { project_id: sampleProject1.id, category_id: hospitalityCategory.id });
    await this.create('project_categories', { project_id: sampleProject2.id, category_id: businessDirectoryCategory.id });
    await this.create('project_categories', { project_id: sampleProject3.id, category_id: ecommerceCategory.id });

    // Create project-technology relationships
    await this.create('project_technologies', { project_id: sampleProject1.id, technology_id: nextjsTech.id });
    await this.create('project_technologies', { project_id: sampleProject1.id, technology_id: reactTech.id });
    await this.create('project_technologies', { project_id: sampleProject2.id, technology_id: reactTech.id });
    await this.create('project_technologies', { project_id: sampleProject3.id, technology_id: nextjsTech.id });
    await this.create('project_technologies', { project_id: sampleProject3.id, technology_id: tailwindTech.id });

    // Create sample analytics data
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Sample analytics for blog post
    await this.create('analytics', {
      entity_type: 'blog_post',
      entity_id: 'sample-blog-id',
      page_views: 45,
      unique_views: 38,
      time_on_page: 180,
      bounce_rate: 0.15,
      date: today,
      referrer: 'google.com',
      user_agent: 'Mozilla/5.0...',
      ip_address: '192.168.1.1',
      country: 'Trinidad and Tobago',
      city: 'Port of Spain',
    });

    // Sample analytics for portfolio project
    await this.create('analytics', {
      entity_type: 'portfolio_project',
      entity_id: sampleProject1.id,
      page_views: 120,
      unique_views: 98,
      time_on_page: 240,
      bounce_rate: 0.08,
      date: today,
      referrer: 'linkedin.com',
      user_agent: 'Mozilla/5.0...',
      ip_address: '192.168.1.2',
      country: 'Trinidad and Tobago',
      city: 'San Fernando',
    });

    console.log('Database initialized with sample data');
  }
}

// Export singleton instance
export const db = new InMemoryDatabase();

// Initialize database on import
db.initialize().catch(console.error);
