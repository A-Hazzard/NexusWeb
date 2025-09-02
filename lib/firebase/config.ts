import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'
import { getAnalytics, Analytics } from 'firebase/analytics'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'mock-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mock-domain',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mock-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mock-bucket',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'mock-app-id',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'mock-measurement',
}

// Initialize Firebase only if we have valid config
let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null
let analytics: Analytics | null = null

try {
  // Only initialize if we have a real API key and App ID (not mock values)
  if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'mock-key' &&
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID !== 'mock-app-id') {
    
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
    
    // Initialize Analytics only in browser
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app)
    }
  }
} catch (error) {
  console.error('Firebase initialization failed:', error)
}

export { auth, db, storage, analytics }
export default app
