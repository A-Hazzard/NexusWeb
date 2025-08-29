/**
 * Web Vitals Monitoring Component
 * Tracks Core Web Vitals and performance metrics
 */

'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';

interface WebVitalsProps {
  analyticsId?: string;
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
  }
}

export function WebVitals({ analyticsId }: WebVitalsProps) {
  useEffect(() => {
    // Function to send metrics to analytics
    const sendToAnalytics = ({ name, delta, id }: { name: string; delta: number; id: string }) => {
      // Send to Google Analytics if ID is provided
      if (analyticsId && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', name, {
          event_category: 'Web Vitals',
          event_label: id,
          value: Math.round(name === 'CLS' ? delta * 1000 : delta),
          non_interaction: true,
        });
      }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Web Vital: ${name}`, {
          value: Math.round(name === 'CLS' ? delta * 1000 : delta),
          delta,
          id,
        });
      }
    };

    // Track Core Web Vitals (FID is deprecated, using INP instead)
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, [analyticsId]);

  return null; // This component doesn't render anything
}

// Performance monitoring hook
export function useWebVitals() {
  useEffect(() => {
    // Monitor performance metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Performance Entry:', {
            name: entry.name,
            type: entry.entryType,
            startTime: entry.startTime,
            duration: entry.duration,
          });
        }
      }
    });

    // Observe navigation timing
    observer.observe({ entryTypes: ['navigation'] });

    return () => observer.disconnect();
  }, []);
}
