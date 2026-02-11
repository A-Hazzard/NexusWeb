import { NextRequest } from 'next/server';
import { authenticateUser, createSession, createAuthResponse, createErrorResponse } from '@/lib/auth/utils';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Authenticate user
    const user = await authenticateUser(email, password);
    if (!user) {
      return createErrorResponse('Invalid email or password', 401);
    }

    // Create session
    const session = await createSession(user.id);

    // Return success response
    return new Response(JSON.stringify(createAuthResponse(user, session)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('Invalid request data', 400);
    }

    console.error('Login error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
