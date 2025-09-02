import { NextRequest } from 'next/server';
import { z } from 'zod';
import { authenticateRequest, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';
import { db } from '@/lib/database/connection';

const updateTechnologySchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const technology = await db.findById('portfolio_technologies', id);
    
    if (!technology) {
      return createErrorResponse('Technology not found', 404);
    }

    // Get project count
    const projectTechnologies = await db.findMany('project_technologies', { technology_id: id });
    const postCount = projectTechnologies.length;
    
    return createSuccessResponse({
      ...technology,
      post_count: postCount,
    });
  } catch (error) {
    console.error('Failed to fetch portfolio technology:', error);
    return createErrorResponse('Failed to fetch portfolio technology', 500);
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

    // Check if user has permission to edit technologies
    if (!['admin', 'editor'].includes(user.role)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const body = await request.json();
    const updateData = updateTechnologySchema.parse(body);

    // Check if slug already exists (if being updated)
    if (updateData.slug) {
      const existingTechnology = await db.findMany('portfolio_technologies', { slug: updateData.slug });
      const conflictingTechnology = existingTechnology.find(tech => tech.id !== id);
      if (conflictingTechnology) {
        return createErrorResponse('A technology with this slug already exists', 400);
      }
    }

    const updatedTechnology = await db.update('portfolio_technologies', id, updateData);
    
    if (!updatedTechnology) {
      return createErrorResponse('Technology not found', 404);
    }

    return createSuccessResponse(updatedTechnology);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('Validation error: Invalid data provided', 400);
    }
    
    console.error('Failed to update portfolio technology:', error);
    return createErrorResponse('Failed to update portfolio technology', 500);
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

    // Check if user has permission to delete technologies
    if (!['admin', 'editor'].includes(user.role)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    // Check if technology has projects assigned to it
    const projectTechnologies = await db.findMany('project_technologies', { technology_id: id });
    if (projectTechnologies.length > 0) {
      return createErrorResponse(
        `Cannot delete technology. It has ${projectTechnologies.length} project(s) assigned to it. Please reassign or delete the projects first.`,
        400
      );
    }

    const deleted = await db.delete('portfolio_technologies', id);
    
    if (!deleted) {
      return createErrorResponse('Technology not found', 404);
    }

    return createSuccessResponse({ message: 'Technology deleted successfully' });
  } catch (error) {
    console.error('Failed to delete portfolio technology:', error);
    return createErrorResponse('Failed to delete portfolio technology', 500);
  }
}
