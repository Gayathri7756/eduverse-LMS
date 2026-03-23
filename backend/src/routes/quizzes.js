import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { inMemoryDb } from '../utils/inMemoryDb.js'

const router = express.Router()

// Get all quizzes for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params
    const quizzes = inMemoryDb.quizzes.filter(q => q.courseId === courseId)
    res.json(quizzes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get a specific quiz
router.get('/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params
    const quiz = inMemoryDb.quizzes.find(q => q.id === quizId)
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }
    res.json(quiz)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Submit quiz answers
router.post('/:quizId/submit', verifyToken, async (req, res) => {
  try {
    const { quizId } = req.params
    const { answers } = req.body
    const userId = req.user.uid

    const quiz = inMemoryDb.quizzes.find(q => q.id === quizId)
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }

    // Calculate score
    let correctAnswers = 0
    const detailedResults = quiz.questions.map((question, index) => {
      const userAnswer = answers[index]
      const isCorrect = userAnswer === question.correctAnswer
      if (isCorrect) correctAnswers++
      return {
        questionId: question.id,
        question: question.text,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect
      }
    })

    const score = Math.round((correctAnswers / quiz.questions.length) * 100)
    const passed = score >= 70 // 70% passing score

    // Store quiz result
    const result = {
      id: `result_${Date.now()}`,
      userId,
      quizId,
      courseId: quiz.courseId,
      score,
      passed,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      detailedResults,
      submittedAt: new Date().toISOString()
    }

    if (!inMemoryDb.quizResults) {
      inMemoryDb.quizResults = []
    }
    inMemoryDb.quizResults.push(result)

    res.json({
      success: true,
      score,
      passed,
      message: passed ? 'Quiz passed!' : 'Quiz failed. Please try again.',
      detailedResults
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get quiz results for a user
router.get('/user/:userId/results', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params
    const results = inMemoryDb.quizResults?.filter(r => r.userId === userId) || []
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get quiz result for a specific quiz
router.get('/:quizId/result', verifyToken, async (req, res) => {
  try {
    const { quizId } = req.params
    const userId = req.user.uid
    const result = inMemoryDb.quizResults?.find(r => r.quizId === quizId && r.userId === userId)
    
    if (!result) {
      return res.json({ attempted: false })
    }
    
    res.json({ attempted: true, ...result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
