import { NextRequest } from 'next/server';
import { z } from 'zod';
import { authenticateRequest, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';
import { db } from '@/lib/database/connection';

const createProjectSchema = z.object({
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
  technologies: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  featured_image: z.string().min(1),
  gallery_images: z.array(z.string()).default([]),
  meta_title: z.string().min(1),
  meta_description: z.string().min(1),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const technology = searchParams.get('technology');
    const featured = searchParams.get('featured');
    const slug = searchParams.get('slug');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const filter: Record<string, unknown> = {};
    
    if (status) filter.status = status;
    if (featured) filter.featured = featured === 'true';
    if (slug) filter.slug = slug;

    const projects = await db.findMany('portfolio_projects', filter);
    
    // Filter by category if specified
    let filteredProjects = projects;
    if (category && !slug) {
      const projectCategories = await db.findMany('project_categories', { category_id: category });
      const projectIds = projectCategories.map(pc => pc.project_id);
      filteredProjects = projects.filter(project => projectIds.includes(project.id));
    }

    // Filter by technology if specified
    if (technology && !slug) {
      const projectTechnologies = await db.findMany('project_technologies', { technology_id: technology });
      const projectIds = projectTechnologies.map(pt => pt.project_id);
      filteredProjects = filteredProjects.filter(project => projectIds.includes(project.id));
    }

    // Enrich projects with categories and technologies
    const enrichedProjects = await Promise.all(
      filteredProjects.map(async (project) => {
        // Get project categories
        const projectCategories = await db.findMany('project_categories', { project_id: project.id });
        const categoryIds = projectCategories.map(pc => pc.category_id);
        const categories = await Promise.all(
          categoryIds.map(async (catId) => {
            const category = await db.findById('portfolio_categories', catId);
            return category ? category.name : null;
          })
        );

        // Get project technologies
        const projectTechnologies = await db.findMany('project_technologies', { project_id: project.id });
        const technologyIds = projectTechnologies.map(pt => pt.technology_id);
        const technologies = await Promise.all(
          technologyIds.map(async (techId) => {
            const technology = await db.findById('portfolio_technologies', techId);
            return technology ? technology.name : null;
          })
        );

        return {
          ...project,
          categories: categories.filter(Boolean),
          technologies: technologies.filter(Boolean),
        };
      })
    );
    
    // If slug is specified, return the first project (should be only one)
    if (slug) {
      return createSuccessResponse({
        projects: enrichedProjects,
        pagination: {
          page: 1,
          limit: 1,
          total: enrichedProjects.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      });
    }
    
    // Apply pagination for list requests
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = enrichedProjects.slice(startIndex, endIndex);
    
    const total = enrichedProjects.length;
    const totalPages = Math.ceil(total / limit);

    return createSuccessResponse({
      projects: paginatedProjects,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Failed to fetch portfolio projects:', error);
    return createErrorResponse('Failed to fetch portfolio projects', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    // Check if user has permission to create projects
    if (!['admin', 'editor'].includes(user.role)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const body = await request.json();
    const projectData = createProjectSchema.parse(body);

    // Check if slug already exists
    const existingProject = await db.findMany('portfolio_projects', { slug: projectData.slug });
    if (existingProject.length > 0) {
      return createErrorResponse('A project with this slug already exists', 400);
    }

    // Set author ID and required fields
    const project = await db.create('portfolio_projects', {
            ...projectData,
      author_id: user.id,
      start_date: projectData.start_date || undefined,
      end_date: projectData.end_date || undefined,
      updated_at: new Date(),
      view_count: 0,
    });

    return createSuccessResponse(project, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('Validation error: Invalid data provided', 400);
    }
    
    console.error('Failed to create portfolio project:', error);
    return createErrorResponse('Failed to create portfolio project', 500);
  }
}
