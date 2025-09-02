'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthState, CreateUserData, LoginCredentials, UpdateUserData } from '@/lib/types/user'
import AuthService from '@/lib/firebase/auth'

interface AuthContextType extends AuthState {
  signUp: (userData: CreateUserData) => Promise<void>
  signIn: (credentials: LoginCredentials) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (uid: string, data: UpdateUserData) => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: false,
    error: null,
  })

  // Initialize auth state
  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    try {
      // Check if Firebase is properly initialized
      unsubscribe = AuthService.onAuthStateChanged((user) => {
        setState(prev => ({
          ...prev,
          user,
          error: null,
        }))
      })
    } catch {
      console.warn('Firebase auth not initialized')
      setState(prev => ({
        ...prev,
        error: 'Firebase authentication failed to initialize.',
      }))
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  // Sign up function
  const signUp = async (userData: CreateUserData) => {
    try {
      setState(prev => ({ ...prev, error: null }))
      const user = await AuthService.signUp(userData)
      setState(prev => ({ ...prev, user, error: null }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Sign up failed',
      }))
      throw error
    }
  }

  // Sign in function
  const signIn = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, error: null }))
      const user = await AuthService.signIn(credentials)
      setState(prev => ({ ...prev, user, error: null }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Sign in failed',
      }))
      throw error
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, error: null }))
      await AuthService.signOut()
      setState(prev => ({ ...prev, user: null, error: null }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Sign out failed',
      }))
      throw error
    }
  }

  // Update user function
  const updateUser = async (uid: string, data: UpdateUserData) => {
    try {
      await AuthService.updateUser(uid, data)
      // Refresh user data
      await refreshUser()
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Update failed',
      }))
      throw error
    }
  }

  // Refresh user data
  const refreshUser = async () => {
    try {
      const user = await AuthService.getCurrentUser()
      setState(prev => ({ ...prev, user }))
    } catch (error) {
      console.error('Refresh user error:', error)
    }
  }

  const value: AuthContextType = {
    ...state,
    signUp,
    signIn,
    signOut,
    updateUser,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
