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

// Validation schema for newsletter subscription
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  company: z.string().optional(),
  industry: z.string().optional(),
  interests: z.array(z.string()).optional(),
  source: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, 'GDPR consent is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = subscribeSchema.parse(body);
    
    // Check if subscriber already exists
    const existingSubscriber = await firebaseService.getSubscriberByEmail(validatedData.email);
    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        );
      } else {
        // Reactivate unsubscribed user
        await firebaseService.updateSubscriber(existingSubscriber.id!, {
          status: 'active',
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          company: validatedData.company || '',
          industry: validatedData.industry || '',
          interests: validatedData.interests || [],
          source: validatedData.source || 'website',
          gdprConsent: validatedData.gdprConsent,
          unsubscribedDate: undefined,
          unsubscribeReason: undefined,
        });
        
        // Add to email service
        if (process.env.MAILCHIMP_API_KEY) {
          await emailService.addSubscriber({
            id: existingSubscriber.id!,
            email: validatedData.email,
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            company: validatedData.company || '',
            industry: validatedData.industry || '',
            interests: validatedData.interests || [],
            source: validatedData.source || 'website',
            subscriptionDate: new Date().toISOString(),
            status: 'active',
            gdprConsent: validatedData.gdprConsent,
          });
        }
        
        return NextResponse.json(
          { 
            success: true, 
            message: 'Successfully reactivated subscription',
            subscriberId: existingSubscriber.id
          },
          { status: 200 }
        );
      }
    }
    
    // Create new subscriber
    const subscriberData = {
      email: validatedData.email.toLowerCase(),
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      company: validatedData.company || '',
      industry: validatedData.industry || '',
      interests: validatedData.interests || [],
      source: validatedData.source || 'website',
      subscriptionDate: new Date().toISOString(),
      status: 'active' as const,
      gdprConsent: validatedData.gdprConsent,
    };
    
    // Store in Firebase
    const subscriberId = await firebaseService.addSubscriber(subscriberData);
    
    // Add to email service (Mailchimp)
    if (process.env.MAILCHIMP_API_KEY) {
      try {
        await emailService.addSubscriber({
          id: subscriberId,
          ...subscriberData,
        });
        
        // Send welcome email
        await emailService.sendWelcomeEmail({
          id: subscriberId,
          ...subscriberData,
        });
      } catch (emailError) {
        console.error('Email service error:', emailError);
        // Don't fail the subscription if email service fails
        // The subscriber is still stored in Firebase
      }
    }
    
    console.log('New subscriber added:', validatedData.email);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        subscriberId: subscriberId
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return subscriber count and basic stats from Firebase
    const stats = await firebaseService.getNewsletterStats();
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching newsletter stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
