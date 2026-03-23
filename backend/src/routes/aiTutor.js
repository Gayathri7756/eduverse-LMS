import express from 'express'
import {
  getAITutorResponse,
  generateCourseRecommendations,
  generateCourseStructure,
  generateLearningPath,
} from '../utils/geminiApi.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/**
 * Get AI tutor response for a question
 * POST /api/ai-tutor/ask
 * Body: { courseTitle, question }
 */
router.post('/ask', verifyToken, async (req, res) => {
  try {
    const { courseTitle, question } = req.body

    if (!courseTitle || !question) {
      return res.status(400).json({ error: 'courseTitle and question are required' })
    }

    const response = await getAITutorResponse(courseTitle, question)
    res.json({ response })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * Get course recommendations
 * POST /api/ai-tutor/recommendations
 * Body: { courseTitle, category }
 */
router.post('/recommendations', verifyToken, async (req, res) => {
  try {
    const { courseTitle, category } = req.body

    if (!courseTitle || !category) {
      return res.status(400).json({ error: 'courseTitle and category are required' })
    }

    const recommendations = await generateCourseRecommendations(courseTitle, category)
    res.json({ recommendations })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * Generate course structure from topic
 * POST /api/ai-tutor/generate-course
 * Body: { topic, difficulty }
 */
router.post('/generate-course', verifyToken, async (req, res) => {
  try {
    const { topic, difficulty = 'Beginner' } = req.body

    if (!topic) {
      return res.status(400).json({ error: 'topic is required' })
    }

    const courseStructure = await generateCourseStructure(topic, difficulty)

    if (!courseStructure) {
      return res.status(500).json({ error: 'Failed to generate course structure' })
    }

    res.json(courseStructure)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * Generate learning path from syllabus
 * POST /api/ai-tutor/learning-path
 * Body: { syllabus }
 * NO AUTHENTICATION REQUIRED
 */
router.post('/learning-path', async (req, res) => {
  try {
    const { syllabus } = req.body

    if (!syllabus || syllabus.trim().length === 0) {
      return res.status(400).json({ error: 'syllabus is required and cannot be empty' })
    }

    const learningPath = await generateLearningPath(syllabus)
    
    if (!learningPath || !Array.isArray(learningPath) || learningPath.length === 0) {
      return res.status(500).json({ error: 'Failed to generate learning path. Please try again with different topics.' })
    }

    res.json({ learningPath })
  } catch (error) {
    console.error('Learning path generation error:', error)
    res.status(500).json({ error: error.message || 'Failed to generate learning path' })
  }
})

export default router
