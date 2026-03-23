import express from 'express'
import { db, auth } from '../firebase.js'
import { verifyToken } from '../middleware/auth.js'
import { encodePassword, isValidEmail, validatePassword } from '../utils/passwordUtils.js'

const router = express.Router()

// Create user profile
router.post('/', async (req, res) => {
  try {
    const { uid, email, name, role, password } = req.body

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Validate name
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required' })
    }

    // Validate password if provided
    if (password) {
      const decodedPassword = Buffer.from(password, 'base64').toString('utf-8')
      const passwordValidation = validatePassword(decodedPassword)
      if (!passwordValidation.isValid) {
        return res.status(400).json({ error: passwordValidation.message })
      }
    }

    if (!auth) {
      return res.status(500).json({ error: 'Firebase not configured' })
    }

    // Set custom claims for role
    await auth.setCustomUserClaims(uid, { role })

    // Create user document in Firestore
    await db.collection('users').doc(uid).set({
      email,
      name,
      role,
      password: password || null, // Store encoded password
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    res.status(201).json({ 
      message: 'User created successfully',
      user: { uid, email, name, role }
    })
  } catch (error) {
    console.error('User creation error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get()
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    const userData = userDoc.data()
    // Don't send password in response
    delete userData.password
    
    res.json(userData)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user by ID
router.get('/:uid', verifyToken, async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.params.uid).get()
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    const userData = userDoc.data()
    // Don't send password in response
    delete userData.password
    
    res.json(userData)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Debug endpoint - get current user's UID
router.get('/debug/current-uid', verifyToken, async (req, res) => {
  try {
    res.json({
      uid: req.user.uid,
      email: req.user.email,
      message: 'Your current user ID'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
