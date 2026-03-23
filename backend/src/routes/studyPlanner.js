import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { db } from '../utils/inMemoryDb.js'

const router = express.Router()

/**
 * Save a study plan with full validation
 * POST /api/study-planner/save
 * Body: { date, subject, topic, estimatedTime, details }
 */
router.post('/save', verifyToken, async (req, res) => {
  try {
    const { date, subject, topic, estimatedTime, details } = req.body

    // Validate all required fields
    if (!date || !subject || !topic || !estimatedTime) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: date, subject, topic, estimatedTime'
      })
    }

    // Validate date format
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format. Use YYYY-MM-DD'
      })
    }

    // Validate estimatedTime is a number
    const timeNum = parseInt(estimatedTime)
    if (isNaN(timeNum) || timeNum <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Estimated time must be a positive number (in hours)'
      })
    }

    // Initialize study plans if not exists
    if (!db.studyPlans) {
      db.studyPlans = []
    }

    // Create plan object
    const plan = {
      id: `plan-${Date.now()}`,
      userId: req.user.uid,
      date: date,
      subject: subject.trim(),
      topic: topic.trim(),
      estimatedTime: timeNum,
      details: details || '',
      createdAt: new Date().toISOString(),
      status: 'active'
    }

    // Save to database
    db.studyPlans.push(plan)

    console.log(`✅ Study plan saved for user ${req.user.uid}:`, plan.id)

    res.json({
      success: true,
      message: 'Study plan saved successfully',
      plan: plan
    })
  } catch (error) {
    console.error('Save plan error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * Get all saved plans for the user
 * GET /api/study-planner/plans
 */
router.get('/plans', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid

    // Initialize if not exists
    if (!db.studyPlans) {
      db.studyPlans = []
    }

    // Filter plans by user
    const userPlans = db.studyPlans.filter(p => p.userId === userId)

    // Sort by date (newest first)
    userPlans.sort((a, b) => new Date(b.date) - new Date(a.date))

    console.log(`📋 Retrieved ${userPlans.length} plans for user ${userId}`)

    res.json({
      success: true,
      count: userPlans.length,
      plans: userPlans
    })
  } catch (error) {
    console.error('Get plans error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * Get a specific plan by ID
 * GET /api/study-planner/plans/:planId
 */
router.get('/plans/:planId', verifyToken, async (req, res) => {
  try {
    const { planId } = req.params
    const userId = req.user.uid

    if (!db.studyPlans) {
      db.studyPlans = []
    }

    const plan = db.studyPlans.find(p => p.id === planId && p.userId === userId)

    if (!plan) {
      return res.status(404).json({
        success: false,
        error: 'Plan not found'
      })
    }

    res.json({
      success: true,
      plan: plan
    })
  } catch (error) {
    console.error('Get plan error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * Update a study plan
 * PUT /api/study-planner/plans/:planId
 * Body: { date, subject, topic, estimatedTime, details }
 */
router.put('/plans/:planId', verifyToken, async (req, res) => {
  try {
    const { planId } = req.params
    const { date, subject, topic, estimatedTime, details } = req.body
    const userId = req.user.uid

    if (!db.studyPlans) {
      db.studyPlans = []
    }

    const planIndex = db.studyPlans.findIndex(p => p.id === planId && p.userId === userId)

    if (planIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Plan not found'
      })
    }

    // Validate fields if provided
    if (date) {
      const dateObj = new Date(date)
      if (isNaN(dateObj.getTime())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid date format'
        })
      }
    }

    if (estimatedTime) {
      const timeNum = parseInt(estimatedTime)
      if (isNaN(timeNum) || timeNum <= 0) {
        return res.status(400).json({
          success: false,
          error: 'Estimated time must be a positive number'
        })
      }
    }

    // Update plan
    const updatedPlan = {
      ...db.studyPlans[planIndex],
      date: date || db.studyPlans[planIndex].date,
      subject: subject ? subject.trim() : db.studyPlans[planIndex].subject,
      topic: topic ? topic.trim() : db.studyPlans[planIndex].topic,
      estimatedTime: estimatedTime ? parseInt(estimatedTime) : db.studyPlans[planIndex].estimatedTime,
      details: details !== undefined ? details : db.studyPlans[planIndex].details,
      updatedAt: new Date().toISOString()
    }

    db.studyPlans[planIndex] = updatedPlan

    console.log(`✏️ Study plan updated: ${planId}`)

    res.json({
      success: true,
      message: 'Study plan updated successfully',
      plan: updatedPlan
    })
  } catch (error) {
    console.error('Update plan error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * Delete a study plan
 * DELETE /api/study-planner/plans/:planId
 */
router.delete('/plans/:planId', verifyToken, async (req, res) => {
  try {
    const { planId } = req.params
    const userId = req.user.uid

    if (!db.studyPlans) {
      db.studyPlans = []
    }

    const planIndex = db.studyPlans.findIndex(p => p.id === planId && p.userId === userId)

    if (planIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Plan not found'
      })
    }

    const deletedPlan = db.studyPlans.splice(planIndex, 1)[0]

    console.log(`🗑️ Study plan deleted: ${planId}`)

    res.json({
      success: true,
      message: 'Study plan deleted successfully',
      plan: deletedPlan
    })
  } catch (error) {
    console.error('Delete plan error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

export default router
