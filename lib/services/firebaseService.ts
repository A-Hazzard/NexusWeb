import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Subscriber {
  id?: string;
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
  unsubscribedDate?: string;
  unsubscribeReason?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface NewsletterStats {
  totalSubscribers: number;
  activeSubscribers: number;
  recentSubscribers: Subscriber[];
  industryBreakdown: Record<string, number>;
  sourceBreakdown: Record<string, number>;
}

class FirebaseService {
  private readonly collectionName = 'newsletter_subscribers';

  // Add new subscriber
  async addSubscriber(subscriberData: Omit<Subscriber, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const subscriber = {
        ...subscriberData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, this.collectionName), subscriber);
      console.log('Subscriber added with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding subscriber:', error);
      throw new Error('Failed to add subscriber to database');
    }
  }

  // Get subscriber by email
  async getSubscriberByEmail(email: string): Promise<Subscriber | null> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('email', '==', email.toLowerCase()),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as Subscriber;
    } catch (error) {
      console.error('Error getting subscriber by email:', error);
      throw new Error('Failed to retrieve subscriber');
    }
  }

  // Update subscriber
  async updateSubscriber(id: string, updates: Partial<Subscriber>): Promise<void> {
    try {
      const subscriberRef = doc(db, this.collectionName, id);
      await updateDoc(subscriberRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      console.log('Subscriber updated:', id);
    } catch (error) {
      console.error('Error updating subscriber:', error);
      throw new Error('Failed to update subscriber');
    }
  }

  // Unsubscribe subscriber
  async unsubscribeSubscriber(email: string, reason?: string): Promise<void> {
    try {
      const subscriber = await this.getSubscriberByEmail(email);
      if (!subscriber) {
        throw new Error('Subscriber not found');
      }

      await this.updateSubscriber(subscriber.id!, {
        status: 'unsubscribed',
        unsubscribedDate: new Date().toISOString(),
        unsubscribeReason: reason || '',
      });

      console.log('Subscriber unsubscribed:', email);
    } catch (error) {
      console.error('Error unsubscribing subscriber:', error);
      throw new Error('Failed to unsubscribe subscriber');
    }
  }

  // Get all active subscribers
  async getActiveSubscribers(): Promise<Subscriber[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Subscriber[];
    } catch (error) {
      console.error('Error getting active subscribers:', error);
      throw new Error('Failed to retrieve active subscribers');
    }
  }

  // Get recent subscribers
  async getRecentSubscribers(limit: number = 10): Promise<Subscriber[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Subscriber[];
    } catch (error) {
      console.error('Error getting recent subscribers:', error);
      throw new Error('Failed to retrieve recent subscribers');
    }
  }

  // Get newsletter statistics
  async getNewsletterStats(): Promise<NewsletterStats> {
    try {
      const allSubscribers = await this.getActiveSubscribers();
      
      // Calculate industry breakdown
      const industryBreakdown: Record<string, number> = {};
      allSubscribers.forEach(sub => {
        if (sub.industry) {
          industryBreakdown[sub.industry] = (industryBreakdown[sub.industry] || 0) + 1;
        }
      });

      // Calculate source breakdown
      const sourceBreakdown: Record<string, number> = {};
      allSubscribers.forEach(sub => {
        sourceBreakdown[sub.source] = (sourceBreakdown[sub.source] || 0) + 1;
      });

      return {
        totalSubscribers: allSubscribers.length,
        activeSubscribers: allSubscribers.filter(sub => sub.status === 'active').length,
        recentSubscribers: allSubscribers.slice(0, 5),
        industryBreakdown,
        sourceBreakdown,
      };
    } catch (error) {
      console.error('Error getting newsletter stats:', error);
      throw new Error('Failed to retrieve newsletter statistics');
    }
  }

  // Search subscribers
  async searchSubscribers(searchTerm: string): Promise<Subscriber[]> {
    try {
      // Note: Firestore doesn't support full-text search out of the box
      // This is a basic implementation - consider using Algolia for advanced search
      const allSubscribers = await this.getActiveSubscribers();
      
      return allSubscribers.filter(sub => 
        sub.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.company && sub.company.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } catch (error) {
      console.error('Error searching subscribers:', error);
      throw new Error('Failed to search subscribers');
    }
  }

  // Delete subscriber (for GDPR compliance)
  async deleteSubscriber(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
      console.log('Subscriber deleted:', id);
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      throw new Error('Failed to delete subscriber');
    }
  }

  // Export subscribers (for GDPR compliance)
  async exportSubscriberData(email: string): Promise<Subscriber | null> {
    try {
      return await this.getSubscriberByEmail(email);
    } catch (error) {
      console.error('Error exporting subscriber data:', error);
      throw new Error('Failed to export subscriber data');
    }
  }
}

// Export singleton instance
export const firebaseService = new FirebaseService();
