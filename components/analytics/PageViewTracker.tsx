'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface PageViewTrackerProps {
  entityType: 'blog_post' | 'portfolio_project' | 'page'
  entityId?: string
}

export default function PageViewTracker({ entityType, entityId }: PageViewTrackerProps) {
  const pathname = usePathname()

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Get referrer from document
        const referrer = document.referrer || null
        const userAgent = navigator.userAgent || null
        
        // Get IP address (in production, this would come from your server)
        // For now, we'll use a placeholder
        const ipAddress = null
        const country = null
        const city = null

        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            entityType,
            entityId: entityId || pathname,
            referrer,
            userAgent,
            ipAddress,
            country,
            city,
          }),
        })
      } catch (error) {
        // Silently fail in production - analytics shouldn't break the user experience
        console.error('Failed to track page view:', error)
      }
    }

    // Track page view after a short delay to ensure the page is fully loaded
    const timer = setTimeout(trackPageView, 1000)

    return () => clearTimeout(timer)
  }, [entityType, entityId, pathname])

  // This component doesn't render anything
  return null
}
