import { NextRequest } from 'next/server';
import { authenticateRequest, deleteSession, createSuccessResponse, createErrorResponse } from '@/lib/auth/utils';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await authenticateRequest(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    // Get token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createErrorResponse('Invalid token', 400);
    }

    const token = authHeader.substring(7);

    // Delete session
    const deleted = await deleteSession(token);
    if (!deleted) {
      return createErrorResponse('Session not found', 404);
    }

    return createSuccessResponse({ message: 'Logged out successfully' });

  } catch (error) {
    console.error('Logout error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
