import { NextRequest } from 'next/server';
import { authenticateRequest, canEditPost, canDeletePost, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';
import { db } from '@/lib/database/connection';
// BlogPostSchema import removed as it's no longer used
import { z } from 'zod';

const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  status: z.enum(['draft', 'published', 'scheduled']).optional(),
  published_at: z.string().optional(),
  featured_image: z.string().nullable().optional(),
  meta_title: z.string().min(1).optional(),
  meta_description: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const post = await db.findById('blog_posts', id);
    
    if (!post) {
      return createErrorResponse('Post not found', 404);
    }

    // Increment view count for published posts
    if (post.status === 'published') {
      await db.update('blog_posts', id, { 
        view_count: post.view_count + 1 
      });
    }

    return createSuccessResponse(post);

  } catch (error) {
    console.error('Get post error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

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

    // Check if post exists
    const existingPost = await db.findById('blog_posts', id);
    if (!existingPost) {
      return createErrorResponse('Post not found', 404);
    }

    // Check permissions
    if (!canEditPost(user, existingPost.author_id)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const body = await request.json();
    const updateData = updatePostSchema.parse(body);

    // Create the update object with proper types
    const updateObject: Record<string, unknown> = { ...updateData };
    
    // Convert published_at string to Date if provided
    if (updateData.published_at) {
      updateObject.published_at = new Date(updateData.published_at);
    }

    const updatedPost = await db.update('blog_posts', id, updateObject);
    
    if (!updatedPost) {
      return createErrorResponse('Failed to update post', 500);
    }

    return createSuccessResponse(updatedPost);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('Invalid request data', 400);
    }

    console.error('Update post error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

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

    // Check if post exists
    const existingPost = await db.findById('blog_posts', id);
    if (!existingPost) {
      return createErrorResponse('Post not found', 404);
    }

    // Check permissions
    if (!canDeletePost(user, existingPost.author_id)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const deleted = await db.delete('blog_posts', id);
    
    if (!deleted) {
      return createErrorResponse('Failed to delete post', 500);
    }

    return createSuccessResponse({ message: 'Post deleted successfully' });

  } catch (error) {
    console.error('Delete post error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
