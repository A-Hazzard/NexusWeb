import { NextRequest } from 'next/server';
import { authenticateRequest, hasPermission, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';
import { db } from '@/lib/database/connection';
import { CategorySchema } from '@/lib/database/schema';
import { z } from 'zod';

const createCategorySchema = CategorySchema.omit({ 
  id: true, 
  created_at: true 
});

export async function GET() {
  try {
    const categories = await db.findMany('categories');
    return createSuccessResponse(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await authenticateRequest(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    // Check permissions
    if (!hasPermission(user, 'editor')) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const body = await request.json();
    const categoryData = createCategorySchema.parse(body);

    const category = await db.create('categories', categoryData);
    return createSuccessResponse(category, 201);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('Invalid request data', 400);
    }

    console.error('Create category error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
