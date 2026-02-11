'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Loader2, Shield, AlertTriangle } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  fallback?: React.ReactNode
}

export function ProtectedRoute({ 
  children, 
  requireAdmin = false, 
  fallback 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // User not authenticated, redirect to login
        router.push('/admin/login')
        return
      }

      if (requireAdmin && user.role !== 'admin') {
        // User not admin, redirect to unauthorized page or dashboard
        router.push('/admin')
        return
      }

      setIsChecking(false)
    }
  }, [user, loading, requireAdmin, router])

  // Show loading state
  if (loading || isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 text-white">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  // Show unauthorized message if user doesn't have required role
  if (requireAdmin && user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-slate-300 mb-6">
            You don&apos;t have permission to access this page. Only administrators can view this content.
          </p>
          <button
            onClick={() => router.push('/admin')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // Show custom fallback if provided
  if (fallback) {
    return <>{fallback}</>
  }

  // Render children if all checks pass
  return <>{children}</>
}

export default ProtectedRoute
