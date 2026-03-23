import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

let db = null
let auth = null
let useFirebase = false

try {
  // Try to initialize with service account if available
  if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PROJECT_ID) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    db = admin.firestore()
    auth = admin.auth()
    useFirebase = true
    console.log('✅ Firebase initialized successfully')
  } else {
    console.warn('⚠️ Firebase credentials not found. Using in-memory database.')
  }
} catch (error) {
  console.warn('⚠️ Firebase initialization failed:', error.message)
  console.warn('Using in-memory database instead')
}

export { db, auth, useFirebase }