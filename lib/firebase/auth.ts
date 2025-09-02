import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth'
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'
import { auth, db } from './config'
import { User, CreateUserData, LoginCredentials, UpdateUserData, UserRole, UserStatus } from '@/lib/types/user'
import { getPermissionsForRole } from '@/lib/types/user'

export class AuthService {
  // Check if any users exist in the system
  static async hasExistingUsers(): Promise<boolean> {
    try {
      if (!db) {
        throw new Error('Firestore not initialized')
      }
      const usersRef = collection(db, 'users')
      const snapshot = await getDocs(usersRef)
      return !snapshot.empty
    } catch (error) {
      console.error('Error checking existing users:', error)
      return false
    }
  }

  // Create new user (first user becomes admin, others are blocked)
  static async signUp(userData: CreateUserData): Promise<User> {
    try {
      // Check if users already exist
      const hasUsers = await this.hasExistingUsers()
      
      if (hasUsers) {
        throw new Error('Sign up is disabled. Only the first user can create an account.')
      }

      // Create Firebase Auth user
      if (!auth) {
        throw new Error('Firebase Auth not initialized')
      }
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      )

      // Determine role (first user = admin)
      const role: UserRole = hasUsers ? 'viewer' : 'admin'
      const status: UserStatus = 'active'

      // Create user profile
      const userProfile = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        displayName: userData.displayName || `${userData.firstName} ${userData.lastName}`,
      }

      // Create user document in Firestore
      const userDoc = {
        uid: firebaseUser.uid,
        email: userData.email,
        emailVerified: firebaseUser.emailVerified,
        role,
        status,
        profile: userProfile,
        permissions: getPermissionsForRole(role),
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
        lastLoginAt: serverTimestamp() as Timestamp,
        lastActiveAt: serverTimestamp() as Timestamp,
        loginAttempts: 0,
        twoFactorEnabled: false,
        preferences: {
          theme: 'system' as const,
          language: 'en' as const,
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
        },
      }

      // Save to Firestore
      if (!db) {
        throw new Error('Firestore not initialized')
      }
      await setDoc(doc(db, 'users', firebaseUser.uid), userDoc)

      // Update Firebase Auth display name
      await updateProfile(firebaseUser, {
        displayName: userProfile.displayName,
      })

      // Return user object
      return {
        ...userDoc,
        createdAt: userDoc.createdAt,
        updatedAt: userDoc.updatedAt,
        lastLoginAt: userDoc.lastLoginAt,
        lastActiveAt: userDoc.lastActiveAt,
      } as User
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  }

  // Sign in existing user
  static async signIn(credentials: LoginCredentials): Promise<User> {
    try {
      if (!auth) {
        throw new Error('Firebase Auth not initialized')
      }
      const { user: firebaseUser } = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )

      // Get user data from Firestore
      if (!db) {
        throw new Error('Firestore not initialized')
      }
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
      
      if (!userDoc.exists()) {
        throw new Error('User profile not found')
      }

      const userData = userDoc.data() as User

      // Check if user is active
      if (userData.status !== 'active') {
        throw new Error('Account is not active. Please contact an administrator.')
      }

      // Update last login and active time
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        lastLoginAt: serverTimestamp(),
        lastActiveAt: serverTimestamp(),
        loginAttempts: 0, // Reset login attempts on successful login
      })

      return {
        ...userData,
        lastLoginAt: Timestamp.now(),
        lastActiveAt: Timestamp.now(),
      }
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  // Sign out user
  static async signOut(): Promise<void> {
    try {
      if (!auth) {
        throw new Error('Firebase Auth not initialized')
      }
      await signOut(auth)
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  // Get current user data
  static async getCurrentUser(): Promise<User | null> {
    try {
      if (!auth) {
        throw new Error('Firebase Auth not initialized')
      }
      const firebaseUser = auth.currentUser
      if (!firebaseUser) return null

      if (!db) {
        throw new Error('Firestore not initialized')
      }
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
      if (!userDoc.exists()) return null

      return userDoc.data() as User
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  }

  // Update user data
  static async updateUser(uid: string, updateData: UpdateUserData): Promise<void> {
    try {
      if (!db) {
        throw new Error('Firestore not initialized')
      }
      const userRef = doc(db, 'users', uid)
      
      // If role is being updated, also update permissions
      if (updateData.role) {
        updateData.permissions = getPermissionsForRole(updateData.role)
      }

      await updateDoc(userRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
      })
    } catch (error) {
      console.error('Update user error:', error)
      throw error
    }
  }

  // Send password reset email
  static async sendPasswordReset(email: string): Promise<void> {
    try {
      if (!auth) {
        throw new Error('Firebase Auth not initialized')
      }
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error('Password reset error:', error)
      throw error
    }
  }

  // Get user by ID
  static async getUserById(uid: string): Promise<User | null> {
    try {
      if (!db) {
        throw new Error('Firestore not initialized')
      }
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (!userDoc.exists()) return null

      return userDoc.data() as User
    } catch (error) {
      console.error('Get user by ID error:', error)
      return null
    }
  }

  // Get all users (admin only)
  static async getAllUsers(): Promise<User[]> {
    try {
      if (!db) {
        throw new Error('Firestore not initialized')
      }
      const usersRef = collection(db, 'users')
      const snapshot = await getDocs(usersRef)
      
      return snapshot.docs.map(doc => doc.data() as User)
    } catch (error) {
      console.error('Get all users error:', error)
      throw error
    }
  }

  // Check if user can access admin area
  static async canAccessAdmin(uid: string): Promise<boolean> {
    try {
      const user = await this.getUserById(uid)
      if (!user) return false

      return ['admin', 'editor'].includes(user.role) && user.status === 'active'
    } catch (error) {
      console.error('Check admin access error:', error)
      return false
    }
  }

  // Auth state listener
  static onAuthStateChanged(callback: (user: User | null) => void) {
    if (!auth) {
      callback(null)
      return () => {}
    }
    
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const user = await this.getCurrentUser()
          callback(user)
        } catch (error) {
          console.error('Auth state change error:', error)
          callback(null)
        }
      } else {
        callback(null)
      }
    })
  }
}

export default AuthService
