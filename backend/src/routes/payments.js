import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { addEnrollment } from '../utils/inMemoryDb.js'

const router = express.Router()

// Initiate payment
router.post('/initiate', verifyToken, async (req, res) => {
  try {
    const { courseId, amount, paymentMethod, userDetails, userId } = req.body

    if (!courseId || !amount || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Generate transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Store transaction details (in real app, save to database)
    const transaction = {
      transactionId,
      courseId,
      userId,
      amount,
      paymentMethod,
      userDetails,
      status: 'initiated',
      createdAt: new Date(),
    }

    // In a real scenario, you would:
    // 1. Call Paytm API to initiate payment
    // 2. Get payment URL from Paytm
    // 3. Return payment URL to frontend

    // For demo, we'll return a mock payment URL
    const paymentUrl = `https://payment-gateway.example.com/pay?txn=${transactionId}`

    res.json({
      success: true,
      transactionId,
      paymentUrl,
      message: 'Payment initiated successfully',
    })
  } catch (error) {
    console.error('Payment initiation error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Confirm payment
router.post('/confirm', verifyToken, async (req, res) => {
  try {
    const { transactionId, status, courseId, userId } = req.body

    if (!transactionId || !status || !courseId || !userId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (status === 'success') {
      // Create enrollment
      const enrollment = addEnrollment({
        userId,
        courseId,
        purchased: true,
        progress: 0,
        enrolledAt: new Date(),
        transactionId,
      })

      res.json({
        success: true,
        enrollment,
        message: 'Payment confirmed and course enrolled successfully',
      })
    } else {
      res.status(400).json({
        success: false,
        error: 'Payment failed',
      })
    }
  } catch (error) {
    console.error('Payment confirmation error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get payment status
router.get('/status/:transactionId', verifyToken, async (req, res) => {
  try {
    const { transactionId } = req.params

    // In a real app, fetch from database
    res.json({
      transactionId,
      status: 'completed',
      message: 'Payment status retrieved',
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
