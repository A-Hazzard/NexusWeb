import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { firebaseService } from '@/lib/services/firebaseService';
import { emailService, configureEmailService } from '@/lib/services/emailService';

// Configure email service if environment variables are available
if (process.env.MAILCHIMP_API_KEY) {
  configureEmailService({
    provider: 'mailchimp',
    apiKey: process.env.MAILCHIMP_API_KEY,
    listId: process.env.MAILCHIMP_LIST_ID!,
    serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX!,
  });
}

// Validation schema for unsubscribe
const unsubscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  reason: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = unsubscribeSchema.parse(body);
    
    // Unsubscribe from Firebase
    await firebaseService.unsubscribeSubscriber(validatedData.email, validatedData.reason);
    
    // Remove from email service (Mailchimp)
    if (process.env.MAILCHIMP_API_KEY) {
      try {
        await emailService.removeSubscriber(validatedData.email);
      } catch (emailError) {
        console.error('Email service unsubscribe error:', emailError);
        // Don't fail the unsubscribe if email service fails
        // The subscriber is still unsubscribed in Firebase
      }
    }
    
    console.log('Subscriber unsubscribed:', validatedData.email);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully unsubscribed from newsletter'
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    if (error instanceof Error && error.message === 'Subscriber not found') {
      return NextResponse.json(
        { error: 'Email not found in subscribers list' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle unsubscribe via GET request (for email links)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    // const token = searchParams.get('token'); // TODO: Implement token validation
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }
    
    // TODO: Validate token for security
    // if (!validateUnsubscribeToken(email, token)) {
    //   return NextResponse.json(
    //     { error: 'Invalid or expired unsubscribe token' },
    //     { status: 400 }
    //   );
    // }
    
    // Unsubscribe from Firebase
    await firebaseService.unsubscribeSubscriber(email, 'Email link unsubscribe');
    
    // Remove from email service (Mailchimp)
    if (process.env.MAILCHIMP_API_KEY) {
      try {
        await emailService.removeSubscriber(email);
      } catch (emailError) {
        console.error('Email service unsubscribe error:', emailError);
      }
    }
    
    console.log('Subscriber unsubscribed via email link:', email);
    
    // Redirect to unsubscribe confirmation page
    return NextResponse.redirect(new URL('/newsletter/unsubscribed', request.url));
    
  } catch (error) {
    console.error('Newsletter unsubscribe via GET error:', error);
    
    if (error instanceof Error && error.message === 'Subscriber not found') {
      return NextResponse.json(
        { error: 'Email not found in subscribers list' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
