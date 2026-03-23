import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { inMemoryDb } from '../utils/inMemoryDb.js'

const router = express.Router()

// Get all assignments for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params
    const assignments = inMemoryDb.assignments.filter(a => a.courseId === courseId)
    res.json(assignments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get a specific assignment
router.get('/:assignmentId', async (req, res) => {
  try {
    const { assignmentId } = req.params
    const assignment = inMemoryDb.assignments.find(a => a.id === assignmentId)
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' })
    }
    res.json(assignment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Submit assignment
router.post('/:assignmentId/submit', verifyToken, async (req, res) => {
  try {
    const { assignmentId } = req.params
    const { submissionText, submissionFile } = req.body
    const userId = req.user.uid

    const assignment = inMemoryDb.assignments.find(a => a.id === assignmentId)
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' })
    }

    // Store submission
    const submission = {
      id: `submission_${Date.now()}`,
      userId,
      assignmentId,
      courseId: assignment.courseId,
      submissionText,
      submissionFile,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      grade: null,
      feedback: null
    }

    if (!inMemoryDb.submissions) {
      inMemoryDb.submissions = []
    }
    inMemoryDb.submissions.push(submission)

    res.json({
      success: true,
      message: 'Assignment submitted successfully',
      submission
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user's assignment submissions
router.get('/user/:userId/submissions', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params
    const submissions = inMemoryDb.submissions?.filter(s => s.userId === userId) || []
    res.json(submissions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get submission for a specific assignment
router.get('/:assignmentId/submission', verifyToken, async (req, res) => {
  try {
    const { assignmentId } = req.params
    const userId = req.user.uid
    const submission = inMemoryDb.submissions?.find(s => s.assignmentId === assignmentId && s.userId === userId)
    
    if (!submission) {
      return res.json({ submitted: false })
    }
    
    res.json({ submitted: true, ...submission })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Grade assignment (instructor only)
router.post('/:submissionId/grade', verifyToken, async (req, res) => {
  try {
    const { submissionId } = req.params
    const { grade, feedback } = req.body

    const submission = inMemoryDb.submissions?.find(s => s.id === submissionId)
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }

    submission.grade = grade
    submission.feedback = feedback
    submission.status = 'graded'
    submission.gradedAt = new Date().toISOString()

    res.json({
      success: true,
      message: 'Assignment graded successfully',
      submission
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
