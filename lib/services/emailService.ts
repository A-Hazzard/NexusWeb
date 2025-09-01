// Email Service Integration Helper
// This file handles integration with different email service providers

export interface Subscriber {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  industry?: string;
  interests: string[];
  source: string;
  subscriptionDate: string;
  status: 'active' | 'unsubscribed';
  gdprConsent: boolean;
}

export interface EmailServiceConfig {
  provider: 'mailchimp' | 'convertkit' | 'sendgrid';
  apiKey: string;
  listId?: string;
  formId?: string;
  serverPrefix?: string;
  fromEmail?: string;
}

class EmailService {
  private config: EmailServiceConfig | null = null;

  constructor(config?: EmailServiceConfig) {
    if (config) {
      this.config = config;
    }
  }

  // Initialize the email service
  async initialize(): Promise<boolean> {
    if (!this.config) {
      console.warn('Email service not configured');
      return false;
    }

    try {
      // Test the connection
      switch (this.config.provider) {
        case 'mailchimp':
          return await this.testMailchimpConnection();
        case 'convertkit':
          return await this.testConvertKitConnection();
        case 'sendgrid':
          return await this.testSendGridConnection();
        default:
          throw new Error(`Unsupported email provider: ${this.config.provider}`);
      }
    } catch (error) {
      console.error('Email service initialization failed:', error);
      return false;
    }
  }

  // Add subscriber to email service
  async addSubscriber(subscriber: Subscriber): Promise<boolean> {
    if (!this.config) {
      console.warn('Email service not configured');
      return false;
    }

    try {
      switch (this.config.provider) {
        case 'mailchimp':
          return await this.addToMailchimp(subscriber);
        case 'convertkit':
          return await this.addToConvertKit(subscriber);
        case 'sendgrid':
          return await this.addToSendGrid(subscriber);
        default:
          throw new Error(`Unsupported email provider: ${this.config.provider}`);
      }
    } catch (error) {
      console.error('Failed to add subscriber:', error);
      return false;
    }
  }

  // Remove subscriber from email service
  async removeSubscriber(email: string): Promise<boolean> {
    if (!this.config) {
      console.warn('Email service not configured');
      return false;
    }

    try {
      switch (this.config.provider) {
        case 'mailchimp':
          return await this.removeFromMailchimp(email);
        case 'convertkit':
          return await this.removeFromConvertKit(email);
        case 'sendgrid':
          return await this.removeFromSendGrid(email);
        default:
          throw new Error(`Unsupported email provider: ${this.config.provider}`);
      }
    } catch (error) {
      console.error('Failed to remove subscriber:', error);
      return false;
    }
  }

  // Send welcome email
  async sendWelcomeEmail(subscriber: Subscriber): Promise<boolean> {
    if (!this.config) {
      console.warn('Email service not configured');
      return false;
    }

    try {
      switch (this.config.provider) {
        case 'mailchimp':
          return await this.sendMailchimpWelcome(subscriber);
        case 'convertkit':
          return await this.sendConvertKitWelcome(subscriber);
        case 'sendgrid':
          return await this.sendSendGridWelcome(subscriber);
        default:
          throw new Error(`Unsupported email provider: ${this.config.provider}`);
      }
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      return false;
    }
  }

  // Mailchimp Integration
  private async testMailchimpConnection(): Promise<boolean> {
    if (!this.config?.apiKey || !this.config?.serverPrefix) {
      throw new Error('Mailchimp configuration incomplete');
    }

    const response = await fetch(
      `https://${this.config.serverPrefix}.api.mailchimp.com/3.0/ping`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.ok;
  }

  private async addToMailchimp(subscriber: Subscriber): Promise<boolean> {
    if (!this.config?.apiKey || !this.config?.listId || !this.config?.serverPrefix) {
      throw new Error('Mailchimp configuration incomplete');
    }

    const response = await fetch(
      `https://${this.config.serverPrefix}.api.mailchimp.com/3.0/lists/${this.config.listId}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: subscriber.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: subscriber.firstName,
            LNAME: subscriber.lastName,
            COMPANY: subscriber.company || '',
            INDUSTRY: subscriber.industry || '',
            INTERESTS: subscriber.interests.join(', '),
            SOURCE: subscriber.source,
          },
        }),
      }
    );

    return response.ok;
  }

  private async removeFromMailchimp(email: string): Promise<boolean> {
    if (!this.config?.apiKey || !this.config?.listId || !this.config?.serverPrefix) {
      throw new Error('Mailchimp configuration incomplete');
    }

    const emailHash = Buffer.from(email.toLowerCase()).toString('hex');
    const response = await fetch(
      `https://${this.config.serverPrefix}.api.mailchimp.com/3.0/lists/${this.config.listId}/members/${emailHash}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'unsubscribed',
        }),
      }
    );

    return response.ok;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async sendMailchimpWelcome(_subscriber: Subscriber): Promise<boolean> {
    // TODO: Implement Mailchimp welcome email sending
    // This would typically involve creating a campaign or using automation
    console.log('Mailchimp welcome email not yet implemented');
    return true;
  }

  // ConvertKit Integration
  private async testConvertKitConnection(): Promise<boolean> {
    if (!this.config?.apiKey) {
      throw new Error('ConvertKit configuration incomplete');
    }

    const response = await fetch('https://api.convertkit.com/v3/forms', {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  }

  private async addToConvertKit(subscriber: Subscriber): Promise<boolean> {
    if (!this.config?.apiKey || !this.config?.formId) {
      throw new Error('ConvertKit configuration incomplete');
    }

    const response = await fetch(`https://api.convertkit.com/v3/forms/${this.config.formId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.config.apiKey,
        email: subscriber.email,
        first_name: subscriber.firstName,
        fields: {
          company: subscriber.company || '',
          industry: subscriber.industry || '',
          interests: subscriber.interests.join(', '),
          source: subscriber.source,
        },
      }),
    });

    return response.ok;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async removeFromConvertKit(_email: string): Promise<boolean> {
    // TODO: Implement ConvertKit unsubscribe
    console.log('ConvertKit unsubscribe not yet implemented');
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async sendConvertKitWelcome(_subscriber: Subscriber): Promise<boolean> {
    // TODO: Implement ConvertKit welcome email
    console.log('ConvertKit welcome email not yet implemented');
    return true;
  }

  // SendGrid Integration
  private async testSendGridConnection(): Promise<boolean> {
    if (!this.config?.apiKey) {
      throw new Error('SendGrid configuration incomplete');
    }

    const response = await fetch('https://api.sendgrid.com/v3/user/profile', {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async addToSendGrid(_subscriber: Subscriber): Promise<boolean> {
    // TODO: Implement SendGrid contact addition
    console.log('SendGrid contact addition not yet implemented');
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async removeFromSendGrid(_email: string): Promise<boolean> {
    // TODO: Implement SendGrid contact removal
    console.log('SendGrid contact removal not yet implemented');
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async sendSendGridWelcome(_subscriber: Subscriber): Promise<boolean> {
    // TODO: Implement SendGrid welcome email
    console.log('SendGrid welcome email not yet implemented');
    return true;
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Export function to configure the service
export function configureEmailService(config: EmailServiceConfig) {
  emailService['config'] = config;
}
