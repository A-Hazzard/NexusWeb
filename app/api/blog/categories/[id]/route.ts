import { NextRequest } from 'next/server';
import { z } from 'zod';
import { authenticateRequest, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';
import { db } from '@/lib/database/connection';

// Schema for updating categories
const UpdateCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  slug: z.string().min(1, 'Category slug is required'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
});

// GET /api/blog/categories/[id] - Get a specific category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const category = await db.findById('categories', id);
    
    if (!category) {
      return createErrorResponse('Category not found', 404);
    }

    // Get post count for this category through the relationship table
    const postCategories = await db.findMany('post_categories', { category_id: id });
    const postCount = postCategories.length;

    return createSuccessResponse({
      ...category,
      post_count: postCount,
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// PUT /api/blog/categories/[id] - Update a category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Authenticate user
    const user = await authenticateRequest(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    // Check if user has permission to manage categories
    if (user.role !== 'admin' && user.role !== 'editor') {
      return createErrorResponse('Insufficient permissions', 403);
    }

    // Validate request body
    const body = await request.json();
    const validatedData = UpdateCategorySchema.parse(body);

    // Check if category exists
    const existingCategory = await db.findById('categories', id);
    if (!existingCategory) {
      return createErrorResponse('Category not found', 404);
    }

    // Check if slug is already taken by another category
    const existingSlug = await db.findMany('categories', { slug: validatedData.slug });
    if (existingSlug.length > 0 && existingSlug[0].id !== id) {
      return createErrorResponse('Category slug already exists', 400);
    }

    // Update the category
    const updatedCategory = await db.update('categories', id, {
      name: validatedData.name,
      slug: validatedData.slug,
      color: validatedData.color,
    });

    if (!updatedCategory) {
      return createErrorResponse('Failed to update category', 500);
    }

    return createSuccessResponse(updatedCategory);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('Validation error: Invalid data provided', 400);
    }
    
    console.error('Error updating category:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// DELETE /api/blog/categories/[id] - Delete a category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Authenticate user
    const user = await authenticateRequest(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    // Check if user has permission to manage categories
    if (user.role !== 'admin' && user.role !== 'editor') {
      return createErrorResponse('Insufficient permissions', 403);
    }

    // Check if category exists
    const existingCategory = await db.findById('categories', id);
    if (!existingCategory) {
      return createErrorResponse('Category not found', 404);
    }

    // Check if category has posts
    const postCategories = await db.findMany('post_categories', { category_id: id });
    if (postCategories.length > 0) {
      return createErrorResponse(
        `Cannot delete category. It has ${postCategories.length} post(s) assigned to it. Please reassign or delete the posts first.`,
        400
      );
    }

    // Delete the category
    const deleted = await db.delete('categories', id);
    
    if (!deleted) {
      return createErrorResponse('Failed to delete category', 500);
    }

    return createSuccessResponse({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
