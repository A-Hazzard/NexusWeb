import { NextRequest } from 'next/server';
import { authenticateRequest, createErrorResponse, createSuccessResponse } from '@/lib/auth/utils';

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const user = await authenticateRequest(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    return createSuccessResponse({ user });

  } catch (error) {
    console.error('Verify auth error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
