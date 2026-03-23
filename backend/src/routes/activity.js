import express from 'express'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// Store activity logs in memory
let activityLogs = []

// Track user activity
router.post('/track', verifyToken, async (req, res) => {
  try {
    const { courseId, lessonId, action, duration, timestamp } = req.body
    const userId = req.user.uid

    if (!courseId || !action) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const activity = {
      id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      courseId,
      lessonId: lessonId || null,
      action, // 'video_play', 'video_pause', 'video_complete', 'lesson_view', 'course_view'
      duration: duration || 0, // in seconds
      timestamp: timestamp || new Date(),
      createdAt: new Date(),
    }

    activityLogs.push(activity)

    res.json({
      success: true,
      activity,
      message: 'Activity tracked successfully',
    })
  } catch (error) {
    console.error('Activity tracking error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get user activity logs
router.get('/logs/:userId', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params
    const { courseId, limit = 100 } = req.query

    let logs = activityLogs.filter(log => log.userId === userId)

    if (courseId) {
      logs = logs.filter(log => log.courseId === courseId)
    }

    // Sort by timestamp descending and limit
    logs = logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, parseInt(limit))

    res.json({
      success: true,
      logs,
      total: logs.length,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get course activity summary
router.get('/summary/:courseId', verifyToken, async (req, res) => {
  try {
    const { courseId } = req.params
    const userId = req.user.uid

    const courseLogs = activityLogs.filter(
      log => log.userId === userId && log.courseId === courseId
    )

    // Calculate statistics
    const totalDuration = courseLogs.reduce((sum, log) => sum + (log.duration || 0), 0)
    const videoPlayCount = courseLogs.filter(log => log.action === 'video_play').length
    const videoCompleteCount = courseLogs.filter(log => log.action === 'video_complete').length
    const lessonsViewed = new Set(courseLogs.map(log => log.lessonId)).size

    res.json({
      success: true,
      summary: {
        totalDuration, // in seconds
        totalDurationMinutes: Math.round(totalDuration / 60),
        videoPlayCount,
        videoCompleteCount,
        lessonsViewed,
        lastActivity: courseLogs[0]?.timestamp || null,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all activity logs (admin)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const { limit = 500 } = req.query

    const logs = activityLogs
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, parseInt(limit))

    res.json({
      success: true,
      logs,
      total: logs.length,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
