'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { signupSchema, loginSchema, SignupFormData, LoginFormData } from '@/lib/types/user'
import { Eye, EyeOff, Shield, User, Mail, Lock, UserPlus, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    displayName: '',
  })
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const { signUp, signIn, error } = useAuth()
  const router = useRouter()

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setLoginData(prev => ({ ...prev, [name]: checked }))
    } else if (isSignUp) {
      setFormData(prev => ({ ...prev, [name]: value }))
    } else {
      setLoginData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Validate form data
  const validateForm = (): boolean => {
    try {
      if (isSignUp) {
        signupSchema.parse(formData)
      } else {
        loginSchema.parse(loginData)
      }
      setValidationErrors({})
      return true
    } catch (error) {
      if (error && typeof error === 'object' && 'errors' in error) {
        const zodError = error as { errors: Array<{ path: string[]; message: string }> }
        const errors: Record<string, string> = {}
        zodError.errors.forEach((err) => {
          errors[err.path[0]] = err.message
        })
        setValidationErrors(errors)
      }
      return false
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }
    
    try {
      if (isSignUp) {
        await signUp({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          displayName: formData.displayName,
        })

        // Redirect to admin dashboard
        router.push('/admin')
      } else {
        await signIn(loginData)
        // Redirect to admin dashboard
        router.push('/admin')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      // Error is handled by the auth context
    }
  }

  // Toggle between signup and login
  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    // Clear form data and validation errors when switching modes
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      displayName: '',
    })
    setLoginData({
      email: '',
      password: '',
      rememberMe: false,
    })
    setValidationErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? 'Create Admin Account' : 'Admin Login'}
          </h1>
          <p className="text-slate-300">
            {isSignUp 
              ? 'Set up your first admin account for Nexus Web' 
              : 'Access your admin dashboard'
            }
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Toggle Buttons */}
          <div className="flex bg-slate-800/50 rounded-lg p-1 mb-6">
            <button
              onClick={() => !isSignUp && toggleMode()}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-200 ${
                isSignUp
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </button>
            <button
              onClick={() => isSignUp && toggleMode()}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-200 ${
                !isSignUp
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
              {error}
              {error.includes('Firebase not configured') && (
                <div className="mt-2 text-xs">
                  <p>To fix this:</p>
                  <ol className="list-decimal list-inside mt-1 space-y-1">
                    <li>Go to your Firebase Console</li>
                    <li>Get your actual App ID (not the placeholder)</li>
                    <li>Update your .env file with the real values</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* Firebase Not Configured Warning */}
          {error && error.includes('Firebase not configured') && (
            <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-200 text-sm">
              <p className="font-semibold">⚠️ Firebase Setup Required</p>
              <p className="mt-1">
                Your Firebase configuration is incomplete. You need to update your environment variables with the actual Firebase project details.
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-200 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your first name"
                    />
                  </div>
                  {validationErrors.firstName && (
                    <p className="text-red-200 text-xs mt-1">{validationErrors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-200 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your last name"
                    />
                  </div>
                  {validationErrors.lastName && (
                    <p className="text-red-200 text-xs mt-1">{validationErrors.lastName}</p>
                  )}
                </div>

                {/* Display Name */}
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-slate-200 mb-2">
                    Display Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter display name (optional)"
                    />
                  </div>
                  {validationErrors.displayName && (
                    <p className="text-red-200 text-xs mt-1">{validationErrors.displayName}</p>
                  )}
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={isSignUp ? formData.email : loginData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
              {validationErrors.email && (
                <p className="text-red-200 text-xs mt-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={isSignUp ? formData.password : loginData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-red-200 text-xs mt-1">{validationErrors.password}</p>
              )}
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-red-200 text-xs mt-1">{validationErrors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Remember Me (Login Only) */}
            {!isSignUp && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 bg-slate-800/50 border-slate-600/50 rounded focus:ring-purple-500 focus:ring-2"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-200">
                  Remember me
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSignUp ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Admin Account
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Additional Info */}
          {isSignUp && (
            <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-200 text-sm text-center">
                <strong>Important:</strong> Only the first user can create an admin account. 
                Subsequent sign-ups will be disabled for security.
              </p>
            </div>
          )}

          {/* Forgot Password Link */}
          {!isSignUp && (
            <div className="mt-6 text-center">
              <button className="text-slate-300 hover:text-purple-400 text-sm transition-colors duration-200">
                Forgot your password?
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            © 2024 Nexus Web. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
