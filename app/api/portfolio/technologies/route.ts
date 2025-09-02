import { NextRequest } from 'next/server';
import { z } from 'zod';
import { authenticateRequest, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';
import { db } from '@/lib/database/connection';

const createTechnologySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
});

export async function GET() {
  try {
    const technologies = await db.findMany('portfolio_technologies');
    
    // Add project count for each technology
    const technologiesWithCounts = await Promise.all(
      technologies.map(async (technology) => {
        const projectTechnologies = await db.findMany('project_technologies', { technology_id: technology.id });
        return {
          ...technology,
          project_count: projectTechnologies.length,
        };
      })
    );

    return createSuccessResponse({ technologies: technologiesWithCounts });
  } catch (error) {
    console.error('Failed to fetch portfolio technologies:', error);
    return createErrorResponse('Failed to fetch portfolio technologies', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    // Check if user has permission to create technologies
    if (!['admin', 'editor'].includes(user.role)) {
      return createErrorResponse('Insufficient permissions', 403);
    }

    const body = await request.json();
    const technologyData = createTechnologySchema.parse(body);

    // Check if slug already exists
    const existingTechnology = await db.findMany('portfolio_technologies', { slug: technologyData.slug });
    if (existingTechnology.length > 0) {
      return createErrorResponse('A technology with this slug already exists', 400);
    }

    const technology = await db.create('portfolio_technologies', {
      ...technologyData,
      icon: null,
    });

    return createSuccessResponse(technology, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('Validation error: Invalid data provided', 400);
    }
    
    console.error('Failed to create portfolio technology:', error);
    return createErrorResponse('Failed to create portfolio technology', 500);
  }
}
