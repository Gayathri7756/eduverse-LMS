import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword as fbCreateUser, signInWithEmailAndPassword as fbSignIn, signOut as fbSignOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBxFMwLOQrT5U54J8duRb_k__djfuFd4B4',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'full-stack-lms-ca23d.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'full-stack-lms-ca23d',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'full-stack-lms-ca23d.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '254929296528',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:254929296528:web:327b9334a44377d3770c15',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const createUserWithEmailAndPassword = (email, password) => fbCreateUser(auth, email, password)
export const signInWithEmailAndPassword = (email, password) => fbSignIn(auth, email, password)
export const signOut = () => fbSignOut(auth)

export default app
