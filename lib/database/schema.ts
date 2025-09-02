import { z } from 'zod';

// User Schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password_hash: z.string(),
  role: z.enum(['admin', 'editor', 'author', 'contributor']),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  created_at: z.date(),
  last_login: z.date().nullable(),
  is_active: z.boolean().default(true),
});

export type User = z.infer<typeof UserSchema>;

// Blog Post Schema
export const BlogPostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  author_id: z.string().uuid(),
  status: z.enum(['draft', 'published', 'scheduled']),
  published_at: z.date().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
  featured_image: z.string().nullable(),
  meta_title: z.string().min(1),
  meta_description: z.string().min(1),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  view_count: z.number().default(0),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

// Category Schema
export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
  created_at: z.date(),
});

export type Category = z.infer<typeof CategorySchema>;

// Tag Schema
export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  created_at: z.date(),
});

export type Tag = z.infer<typeof TagSchema>;

// Post-Category Relationship Schema
export const PostCategorySchema = z.object({
  post_id: z.string().uuid(),
  category_id: z.string().uuid(),
});

export type PostCategory = z.infer<typeof PostCategorySchema>;

// Post-Tag Relationship Schema
export const PostTagSchema = z.object({
  post_id: z.string().uuid(),
  tag_id: z.string().uuid(),
});

export type PostTag = z.infer<typeof PostTagSchema>;

// Media Schema
export const MediaSchema = z.object({
  id: z.string().uuid(),
  filename: z.string().min(1),
  original_name: z.string().min(1),
  file_path: z.string().min(1),
  file_size: z.number(),
  mime_type: z.string().min(1),
  alt_text: z.string().nullable(),
  uploaded_by: z.string().uuid(),
  created_at: z.date(),
});

export type Media = z.infer<typeof MediaSchema>;

// Enhanced Analytics Schema
export const AnalyticsSchema = z.object({
  id: z.string().uuid(),
  entity_type: z.enum(['blog_post', 'portfolio_project', 'page']),
  entity_id: z.string().uuid().nullable(),
  page_views: z.number().default(0),
  unique_views: z.number().default(0),
  time_on_page: z.number().default(0),
  bounce_rate: z.number().default(0),
  date: z.date(),
  referrer: z.string().nullable(),
  user_agent: z.string().nullable(),
  ip_address: z.string().nullable(),
  country: z.string().nullable(),
  city: z.string().nullable(),
});

export type Analytics = z.infer<typeof AnalyticsSchema>;

// Enhanced Analytics Schema for Portfolio Projects
export const PortfolioAnalyticsSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  views: z.number().default(0),
  unique_views: z.number().default(0),
  time_on_page: z.number().default(0),
  interactions: z.number().default(0), // Clicks on project links, etc.
  date: z.date(),
  referrer: z.string().nullable(),
  user_agent: z.string().nullable(),
});

export type PortfolioAnalytics = z.infer<typeof PortfolioAnalyticsSchema>;

// Enhanced Analytics Schema for Blog Posts
export const BlogAnalyticsSchema = z.object({
  id: z.string().uuid(),
  post_id: z.string().uuid(),
  views: z.number().default(0),
  unique_views: z.number().default(0),
  time_on_page: z.number().default(0),
  social_shares: z.number().default(0),
  comments: z.number().default(0),
  date: z.date(),
  referrer: z.string().nullable(),
  user_agent: z.string().nullable(),
});

export type BlogAnalytics = z.infer<typeof BlogAnalyticsSchema>;

// Portfolio Project Schema
export const PortfolioProjectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  description: z.string().min(1),
  client_name: z.string().min(1),
  project_url: z.string().url().optional(),
  status: z.enum(['in-progress', 'completed', 'on-hold']),
  featured: z.boolean().default(false),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  author_id: z.string().uuid(),
  featured_image: z.string().min(1),
  gallery_images: z.array(z.string()).default([]),
  meta_title: z.string().min(1),
  meta_description: z.string().min(1),
  view_count: z.number().default(0),
  created_at: z.date(),
  updated_at: z.date(),
  technologies: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
});

export type PortfolioProject = z.infer<typeof PortfolioProjectSchema>;

// Portfolio Category Schema
export const PortfolioCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
  created_at: z.date(),
});

export type PortfolioCategory = z.infer<typeof PortfolioCategorySchema>;

// Portfolio Technology Schema
export const PortfolioTechnologySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  icon: z.string().nullable(),
  created_at: z.date(),
});

export type PortfolioTechnology = z.infer<typeof PortfolioTechnologySchema>;

// Project-Technology Relationship Schema
export const ProjectTechnologySchema = z.object({
  project_id: z.string().uuid(),
  technology_id: z.string().uuid(),
});

export type ProjectTechnology = z.infer<typeof ProjectTechnologySchema>;

// Project-Category Relationship Schema
export const ProjectCategorySchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  category_id: z.string().uuid(),
  created_at: z.date(),
});

export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;

// Project Image Schema
export const ProjectImageSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  image_path: z.string().min(1),
  alt_text: z.string().nullable(),
  caption: z.string().nullable(),
  sort_order: z.number().default(0),
  created_at: z.date(),
});

export type ProjectImage = z.infer<typeof ProjectImageSchema>;

// Session Schema for authentication
export const SessionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  token: z.string().min(1),
  expires_at: z.date(),
  created_at: z.date(),
});

export type Session = z.infer<typeof SessionSchema>;

// Database Schema Export
export const DatabaseSchema = {
  users: UserSchema,
  blog_posts: BlogPostSchema,
  categories: CategorySchema,
  tags: TagSchema,
  post_categories: PostCategorySchema,
  post_tags: PostTagSchema,
  media: MediaSchema,
  analytics: AnalyticsSchema,
  portfolio_analytics: PortfolioAnalyticsSchema,
  blog_analytics: BlogAnalyticsSchema,
  portfolio_projects: PortfolioProjectSchema,
  portfolio_categories: PortfolioCategorySchema,
  portfolio_technologies: PortfolioTechnologySchema,
  project_technologies: ProjectTechnologySchema,
  project_categories: ProjectCategorySchema,
  project_images: ProjectImageSchema,
  sessions: SessionSchema,
};

export type Database = {
  [K in keyof typeof DatabaseSchema]: z.infer<typeof DatabaseSchema[K]>[];
};
