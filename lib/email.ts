import nodemailer from "nodemailer";

// Email configuration
// You'll need to set these environment variables in your .env file
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS, // Your email password or app password
    },
});

// Send welcome email to new subscriber
export async function sendWelcomeEmail(email: string, name?: string) {
    try {
        const mailOptions = {
            from: `"Nexus Web" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Welcome to Nexus Web Newsletter! 🎉",
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF8A00 0%, #FF4D00 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FF8A00 0%, #FF4D00 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Nexus Web! 🚀</h1>
            </div>
            <div class="content">
              <p>Hi ${name || "there"}!</p>
              
              <p>Thank you for subscribing to the Nexus Web newsletter! We're excited to have you join our community of forward-thinking businesses in Trinidad & Tobago.</p>
              
              <p><strong>What to expect:</strong></p>
              <ul>
                <li>📝 Latest blog posts and web development insights</li>
                <li>💡 Tips to grow your online presence</li>
                <li>🎯 Exclusive offers and promotions</li>
                <li>🚀 Industry news and trends</li>
              </ul>
              
              <p>We respect your inbox and will only send valuable content. You can unsubscribe at any time.</p>
              
              <a href="https://nexuswebtt.com/blogs" class="button">
                Read Our Latest Posts
              </a>
              
              <p>If you have any questions, feel free to reply to this email!</p>
              
              <p>Best regards,<br><strong>The Nexus Web Team</strong></p>
            </div>
            <div class="footer">
              <p>Nexus Web - Building Digital Solutions for Caribbean Businesses</p>
              <p>
                <a href="https://nexuswebtt.com/unsubscribe?email=${email}" style="color: #666;">
                  Unsubscribe
                </a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Error sending welcome email:", error);
        return { success: false, error };
    }
}

// Send admin notification about new subscriber
export async function sendAdminNotification(subscriberEmail: string, subscriberName?: string) {
    try {
        const mailOptions = {
            from: `"Nexus Web Newsletter" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
            subject: "🎉 New Newsletter Subscriber!",
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 15px; border-left: 4px solid #FF8A00; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Newsletter Subscriber!</h2>
            </div>
            <div class="content">
              <p>Great news! You have a new newsletter subscriber.</p>
              
              <div class="info-box">
                <p><strong>Email:</strong> ${subscriberEmail}</p>
                ${subscriberName ? `<p><strong>Name:</strong> ${subscriberName}</p>` : ""}
                <p><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <p>
                <a href="https://nexuswebtt.com/admin/newsletter" 
                   style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FF8A00 0%, #FF4D00 100%); color: white; text-decoration: none; border-radius: 5px;">
                  View in Dashboard
                </a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Error sending admin notification:", error);
        return { success: false, error };
    }
}

// Send newsletter campaign to subscribers
export async function sendCampaign(
    subscribers: { email: string; name?: string }[],
    subject: string,
    htmlContent: string
) {
    const results = {
        sent: 0,
        failed: 0,
        errors: [] as string[],
    };

    for (const subscriber of subscribers) {
        try {
            // Personalize content
            const personalizedContent = htmlContent
                .replace(/{{name}}/g, subscriber.name || "there")
                .replace(/{{email}}/g, subscriber.email);

            const mailOptions = {
                from: `"Nexus Web" <${process.env.SMTP_USER}>`,
                to: subscriber.email,
                subject,
                html: personalizedContent,
            };

            await transporter.sendMail(mailOptions);
            results.sent++;

            // Add small delay to avoid rate limiting
            await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
            results.failed++;
            results.errors.push(`${subscriber.email}: ${error}`);
            console.error(`Error sending to ${subscriber.email}:`, error);
        }
    }

    return results;
}

// Send unsubscribe confirmation email
export async function sendUnsubscribeConfirmation(email: string, name?: string, reason?: string) {
    try {
        const mailOptions = {
            from: `"Nexus Web" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "You've Been Unsubscribed - We're Sorry to See You Go",
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #6B7280; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FF8A00 0%, #FF4D00 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>You've Been Unsubscribed</h1>
            </div>
            <div class="content">
              <p>Hi ${name || "there"},</p>
              
              <p>We're sorry to see you go! You have been successfully unsubscribed from the Nexus Web newsletter.</p>
              
              ${reason ? `<p><strong>You told us:</strong> "${reason}"</p>` : ""}
              
              <p>We appreciate your feedback and will use it to improve our content for others.</p>
              
              <p><strong>What this means:</strong></p>
              <ul>
                <li>You will no longer receive our newsletter emails</li>
                <li>Your email has been removed from our mailing list</li>
                <li>You can resubscribe at any time if you change your mind</li>
              </ul>
              
              <p>Changed your mind? You can resubscribe anytime:</p>
              
              <a href="https://nexuswebtt.com/#newsletter" class="button">
                Resubscribe to Newsletter
              </a>
              
              <p>Thank you for being part of our community, even if just for a while. We wish you all the best!</p>
              
              <p>Best regards,<br><strong>The Nexus Web Team</strong></p>
            </div>
            <div class="footer">
              <p>Nexus Web - Building Digital Solutions for Caribbean Businesses</p>
              <p>Trinidad & Tobago</p>
            </div>
          </div>
        </body>
        </html>
      `,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Error sending unsubscribe confirmation:", error);
        return { success: false, error };
    }
}

// Send admin notification about unsubscribe
export async function sendUnsubscribeNotification(subscriberEmail: string, subscriberName?: string, reason?: string) {
    try {
        const mailOptions = {
            from: `"Nexus Web Newsletter" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
            subject: "📉 Newsletter Unsubscribe",
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #EF4444; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 15px; border-left: 4px solid #EF4444; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Someone Unsubscribed</h2>
            </div>
            <div class="content">
              <p>A subscriber has unsubscribed from your newsletter.</p>
              
              <div class="info-box">
                <p><strong>Email:</strong> ${subscriberEmail}</p>
                ${subscriberName ? `<p><strong>Name:</strong> ${subscriberName}</p>` : ""}
                <p><strong>Unsubscribed:</strong> ${new Date().toLocaleString()}</p>
                ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
              </div>
              
              <p>
                <a href="https://nexuswebtt.com/admin/newsletter" 
                   style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FF8A00 0%, #FF4D00 100%); color: white; text-decoration: none; border-radius: 5px;">
                  View Dashboard
                </a>
              </p>
              
              <p style="margin-top: 20px; padding: 15px; background: #FEF3C7; border-left: 4px solid #F59E0B; font-size: 14px;">
                <strong>💡 Tip:</strong> Review unsubscribe reasons regularly to improve your content and reduce future unsubscribes.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Error sending unsubscribe notification:", error);
        return { success: false, error };
    }
}

// Verify SMTP connection
export async function verifyEmailConfig() {
    try {
        await transporter.verify();
        return { success: true, message: "Email configuration is valid" };
    } catch (error) {
        console.error("Email configuration error:", error);
        return { success: false, error };
    }
}
