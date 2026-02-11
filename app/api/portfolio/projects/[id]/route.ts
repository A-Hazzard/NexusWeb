import { NextRequest } from 'next/server';
import { authenticateRequest, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';
import { db } from '@/lib/database/connection';
import { z } from 'zod';

const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  client_name: z.string().min(1).optional(),
  project_url: z.string().url().optional(),
  status: z.enum(['in-progress', 'completed', 'on-hold']).optional(),
  featured: z.boolean().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  featured_image: z.string().min(1).optional(),
  gallery_images: z.array(z.string()).optional(),
  meta_title: z.string().min(1).optional(),
  meta_description: z.string().min(1).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const project = await db.findById('portfolio_projects', id);
    
    if (!project) {
      return createErrorResponse('Project not found', 404);
    }

    // Increment view count
    await db.update('portfolio_projects', id, {
      view_count: (project.view_count || 0) + 1,
    });

    return createSuccessResponse({ project });
  } catch (error) {
    console.error('Failed to fetch portfolio project:', error);
    return createErrorResponse('Failed to fetch portfolio project', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    // Check if user has permission to edit projects
    if (!['admin', 'editor'].includes(user.role)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const body = await request.json();
    const updateData = updateProjectSchema.parse(body);
    const updateObject: Record<string, unknown> = { ...updateData };

    if (updateData.start_date) {
      updateObject.start_date = new Date(updateData.start_date);
    }

    if (updateData.end_date) {
      updateObject.end_date = new Date(updateData.end_date);
    }

    const updatedProject = await db.update('portfolio_projects', id, updateObject);
    
    if (!updatedProject) {
      return createErrorResponse('Project not found', 404);
    }

    return createSuccessResponse(updatedProject);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('Validation error: Invalid data provided', 400);
    }
    
    console.error('Failed to update portfolio project:', error);
    return createErrorResponse('Failed to update portfolio project', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    // Check if user has permission to delete projects
    if (!['admin', 'editor'].includes(user.role)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const deleted = await db.delete('portfolio_projects', id);
    
    if (!deleted) {
      return createErrorResponse('Project not found', 404);
    }

    return createSuccessResponse({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Failed to delete portfolio project:', error);
    return createErrorResponse('Failed to delete portfolio project', 500);
  }
}
