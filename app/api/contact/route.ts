import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message, phone, service } = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (name, email, message)' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Create transporter using SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to business owner
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'nexuswebtt@gmail.com',
      subject: `🚀 New Contact Form Submission from ${name}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="background: linear-gradient(135deg, #FF8A00 0%, #FF4D00 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Nexus Web - Trinidad & Tobago</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #FF8A00;">
              <h3 style="color: #FF8A00; margin: 0 0 15px 0;">Contact Details</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #FF8A00;">${email}</a></p>
              ${phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #FF8A00;">${phone}</a></p>` : ''}
              ${service ? `<p style="margin: 8px 0;"><strong>Service Interest:</strong> ${service}</p>` : ''}
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 8px; border-left: 4px solid #FF4D00;">
              <h3 style="color: #FF4D00; margin: 0 0 15px 0;">Message</h3>
              <p style="margin: 0; white-space: pre-wrap; background: #f8f9fa; padding: 15px; border-radius: 5px; border: 1px solid #e9ecef;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                📅 Received: ${new Date().toLocaleString('en-TT', { timeZone: 'America/Port_of_Spain' })} (Trinidad Time)
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Auto-reply to the client
    const autoReplyOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: '🙏 Thank you for contacting Nexus Web!',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="background: linear-gradient(135deg, #FF8A00 0%, #FF4D00 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Reaching Out!</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">We've received your message</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #FF8A00; margin: 0 0 15px 0;">Hi ${name}!</h3>
              <p style="margin: 0 0 15px 0;">Thank you for contacting <strong>Nexus Web</strong>. We've received your message and will get back to you within 24 hours.</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FF8A00; margin: 20px 0;">
                <h4 style="color: #FF4D00; margin: 0 0 10px 0;">What happens next?</h4>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>We'll review your message and requirements</li>
                  <li>Aaron Hazzard will personally respond to your inquiry</li>
                  <li>We'll schedule a free consultation if needed</li>
                  <li>You'll receive a custom quote within 48 hours</li>
                </ul>
              </div>
              
              <p style="margin: 20px 0 0 0;">In the meantime, feel free to check out our <a href="https://nexusweb.com/portfolio" style="color: #FF8A00;">portfolio</a> or learn more about our <a href="https://nexusweb.com/services" style="color: #FF8A00;">services</a>.</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
              <h4 style="color: #FF4D00; margin: 0 0 15px 0;">Contact Information</h4>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:nexuswebtt@gmail.com" style="color: #FF8A00;">nexuswebtt@gmail.com</a></p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:+18683521435" style="color: #FF8A00;">+1 (868) 352-1435</a></p>
              <p style="margin: 5px 0;"><strong>Location:</strong> Trinidad & Tobago</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                Best regards,<br>
                <strong style="color: #FF8A00;">Aaron Hazzard</strong><br>
                Founder & Senior Software Engineer<br>
                Nexus Web - Trinidad & Tobago
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Sorry, there was an issue sending your message. Please try again or contact us directly at nexuswebtt@gmail.com',
        success: false 
      },
      { status: 500 }
    );
  }
} 