import { NextRequest } from 'next/server';
import { z } from 'zod';
import { authenticateRequest, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';
import { db } from '@/lib/database/connection';

const createCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
});

export async function GET() {
  try {
    const categories = await db.findMany('portfolio_categories');
    
    // Add project count for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const projectCategories = await db.findMany('project_categories', { category_id: category.id });
        return {
          ...category,
          project_count: projectCategories.length,
        };
      })
    );

    return createSuccessResponse({ categories: categoriesWithCounts });
  } catch (error) {
    console.error('Failed to fetch portfolio categories:', error);
    return createErrorResponse('Failed to fetch portfolio categories', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    // Check if user has permission to create categories
    if (!['admin', 'editor'].includes(user.role)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const body = await request.json();
    const categoryData = createCategorySchema.parse(body);

    // Check if slug already exists
    const existingCategory = await db.findMany('portfolio_categories', { slug: categoryData.slug });
    if (existingCategory.length > 0) {
      return createErrorResponse('A category with this slug already exists', 400);
    }

    const category = await db.create('portfolio_categories', {
      ...categoryData,
      description: null,
    });

    return createSuccessResponse(category, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('Validation error: Invalid data provided', 400);
    }
    
    console.error('Failed to create portfolio category:', error);
    return createErrorResponse('Failed to create portfolio category', 500);
  }
}
