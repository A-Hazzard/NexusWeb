import { Timestamp } from 'firebase/firestore'

// User roles and permissions
export type UserRole = 'admin' | 'editor' | 'viewer'
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'

// User permissions for different features
export interface UserPermissions {
  // Blog management
  canCreateBlog: boolean
  canEditBlog: boolean
  canDeleteBlog: boolean
  canPublishBlog: boolean
  
  // Portfolio management
  canCreatePortfolio: boolean
  canEditPortfolio: boolean
  canDeletePortfolio: boolean
  canPublishPortfolio: boolean
  
  // User management
  canManageUsers: boolean
  canAssignRoles: boolean
  
  // Analytics and SEO
  canViewAnalytics: boolean
  canManageSEO: boolean
  
  // Media management
  canUploadMedia: boolean
  canDeleteMedia: boolean
  
  // Site settings
  canManageSettings: boolean
  canManageContent: boolean
}

// User profile information
export interface UserProfile {
  firstName: string
  lastName: string
  displayName?: string
  bio?: string
  avatar?: string
  phone?: string
  location?: string
  website?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

// Main user interface
export interface User {
  // Firebase Auth fields
  uid: string
  email: string
  emailVerified: boolean
  
  // Custom fields
  role: UserRole
  status: UserStatus
  profile: UserProfile
  
  // Permissions (computed from role)
  permissions: UserPermissions
  
  // Metadata
  createdAt: Timestamp
  updatedAt: Timestamp
  lastLoginAt?: Timestamp
  lastActiveAt?: Timestamp
  
  // Security
  loginAttempts: number
  lockedUntil?: Timestamp
  twoFactorEnabled: boolean
  
  // Preferences
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: 'en' | 'es' | 'fr'
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
  }
}

// User creation data (for signup)
export interface CreateUserData {
  email: string
  password: string
  firstName: string
  lastName: string
  displayName?: string
}

// User update data
export interface UpdateUserData {
  profile?: Partial<UserProfile>
  status?: UserStatus
  role?: UserRole
  preferences?: Partial<User['preferences']>
  permissions?: UserPermissions
}

// Authentication state
export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

// Login credentials
export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

// Password reset
export interface PasswordResetData {
  email: string
}

// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  admin: {
    canCreateBlog: true,
    canEditBlog: true,
    canDeleteBlog: true,
    canPublishBlog: true,
    canCreatePortfolio: true,
    canEditPortfolio: true,
    canDeletePortfolio: true,
    canPublishPortfolio: true,
    canManageUsers: true,
    canAssignRoles: true,
    canViewAnalytics: true,
    canManageSEO: true,
    canUploadMedia: true,
    canDeleteMedia: true,
    canManageSettings: true,
    canManageContent: true,
  },
  editor: {
    canCreateBlog: true,
    canEditBlog: true,
    canDeleteBlog: false,
    canPublishBlog: true,
    canCreatePortfolio: true,
    canEditPortfolio: true,
    canDeletePortfolio: false,
    canPublishPortfolio: true,
    canManageUsers: false,
    canAssignRoles: false,
    canViewAnalytics: true,
    canManageSEO: false,
    canUploadMedia: true,
    canDeleteMedia: false,
    canManageSettings: false,
    canManageContent: true,
  },
  viewer: {
    canCreateBlog: false,
    canEditBlog: false,
    canDeleteBlog: false,
    canPublishBlog: false,
    canCreatePortfolio: false,
    canEditPortfolio: false,
    canDeletePortfolio: false,
    canPublishPortfolio: false,
    canManageUsers: false,
    canAssignRoles: false,
    canViewAnalytics: true,
    canManageSEO: false,
    canUploadMedia: false,
    canDeleteMedia: false,
    canManageSettings: false,
    canManageContent: false,
  },
}

// Helper function to get permissions for a role
export function getPermissionsForRole(role: UserRole): UserPermissions {
  return ROLE_PERMISSIONS[role]
}

// Helper function to check if user has permission
export function hasPermission(user: User, permission: keyof UserPermissions): boolean {
  return user.permissions[permission] && user.status === 'active'
}

// Helper function to check if user can access admin area
export function canAccessAdmin(user: User): boolean {
  return ['admin', 'editor'].includes(user.role) && user.status === 'active'
}

// Zod schemas for validation
import { z } from 'zod'

// Signup validation schema
export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  confirmPassword: z.string(),
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name must be less than 50 characters'),
  displayName: z.string()
    .min(2, 'Display name must be at least 2 characters long')
    .max(100, 'Display name must be less than 100 characters')
    .optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

// Type inference from schemas
export type SignupFormData = z.infer<typeof signupSchema>
export type LoginFormData = z.infer<typeof loginSchema>
