import { NextRequest } from 'next/server';
import { authenticateRequest, hasPermission, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';
import { db } from '@/lib/database/connection';
import { BlogPostSchema } from '@/lib/database/schema';
import { z } from 'zod';

const createPostSchema = BlogPostSchema.omit({ 
  id: true, 
  created_at: true, 
  updated_at: true,
  view_count: true,
  published_at: true,
}).extend({
  published_at: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let posts;

    if (status === 'published') {
      posts = await db.findPublishedBlogPosts();
    } else if (status === 'draft') {
      posts = await db.findBlogPostsByStatus('draft');
    } else if (status === 'scheduled') {
      posts = await db.findBlogPostsByStatus('scheduled');
    } else if (category) {
      posts = await db.findBlogPostsByCategory(category);
    } else if (tag) {
      posts = await db.findBlogPostsByTag(tag);
    } else if (featured === 'true') {
      posts = await db.findFeaturedBlogPosts();
    } else {
      posts = await db.findMany('blog_posts');
    }

    // Apply pagination
    const paginatedPosts = posts.slice(offset, offset + limit);
    const total = posts.length;
    const totalPages = Math.ceil(total / limit);

    return createSuccessResponse({
      posts: paginatedPosts,
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
    console.error('Get posts error:', error);
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
    if (!hasPermission(user, 'author')) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const body = await request.json();
    const postData = createPostSchema.parse(body);

    // Set author ID and required fields
    const post = await db.create('blog_posts', {
      ...postData,
      author_id: user.id,
      published_at: postData.published_at ? new Date(postData.published_at) : null,
      updated_at: new Date(),
      view_count: 0,
    });

    return createSuccessResponse(post, 201);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('Invalid request data', 400);
    }

    console.error('Create post error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
