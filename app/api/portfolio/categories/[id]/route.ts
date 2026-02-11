import { NextRequest } from 'next/server';
import { z } from 'zod';
import { authenticateRequest, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';
import { db } from '@/lib/database/connection';

const updateCategorySchema = z.object({
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
    const category = await db.findById('portfolio_categories', id);
    
    if (!category) {
      return createErrorResponse('Category not found', 404);
    }

    // Get project count
    const projectCategories = await db.findMany('project_categories', { category_id: id });
    const postCount = projectCategories.length;
    
    return createSuccessResponse({
      ...category,
      post_count: postCount,
    });
  } catch (error) {
    console.error('Failed to fetch portfolio category:', error);
    return createErrorResponse('Failed to fetch portfolio category', 500);
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

    // Check if user has permission to edit categories
    if (!['admin', 'editor'].includes(user.role)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const body = await request.json();
    const updateData = updateCategorySchema.parse(body);

    // Check if slug already exists (if being updated)
    if (updateData.slug) {
      const existingCategory = await db.findMany('portfolio_categories', { slug: updateData.slug });
      const conflictingCategory = existingCategory.find(cat => cat.id !== id);
      if (conflictingCategory) {
        return createErrorResponse('A category with this slug already exists', 400);
      }
    }

    const updatedCategory = await db.update('portfolio_categories', id, updateData);
    
    if (!updatedCategory) {
      return createErrorResponse('Category not found', 404);
    }

    return createSuccessResponse(updatedCategory);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('Validation error: Invalid data provided', 400);
    }
    
    console.error('Failed to update portfolio category:', error);
    return createErrorResponse('Failed to update portfolio category', 500);
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

    // Check if user has permission to delete categories
    if (!['admin', 'editor'].includes(user.role)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    // Check if category has projects assigned to it
    const projectCategories = await db.findMany('project_categories', { category_id: id });
    if (projectCategories.length > 0) {
      return createErrorResponse(
        `Cannot delete category. It has ${projectCategories.length} project(s) assigned to it. Please reassign or delete the projects first.`,
        400
      );
    }

    const deleted = await db.delete('portfolio_categories', id);
    
    if (!deleted) {
      return createErrorResponse('Category not found', 404);
    }

    return createSuccessResponse({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Failed to delete portfolio category:', error);
    return createErrorResponse('Failed to delete portfolio category', 500);
  }
}
