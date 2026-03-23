import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { inMemoryDb } from '../utils/inMemoryDb.js'

const router = express.Router()

// Generate certificate for completed course
router.post('/generate/:courseId', verifyToken, async (req, res) => {
  try {
    const { courseId } = req.params
    // Try to get userId from token first, then from X-User-ID header
    let userId = req.user?.uid
    if (!userId) {
      userId = req.headers['x-user-id']
    }

    if (!userId) {
      return res.status(400).json({ error: 'User ID not found' })
    }

    // Get enrollment
    const enrollment = inMemoryDb.enrollments.find(
      e => e.userId === userId && e.courseId === courseId
    )

    if (!enrollment) {
      return res.status(404).json({ error: 'Not enrolled in this course' })
    }

    // Get course
    const course = inMemoryDb.courses.find(c => c.id === courseId)

    // Get progress
    const lessons = inMemoryDb.lessons.filter(l => l.courseId === courseId)
    const quizzes = inMemoryDb.quizzes.filter(q => q.courseId === courseId)
    const assignments = inMemoryDb.assignments.filter(a => a.courseId === courseId)

    const watchedLessons = inMemoryDb.watchedLessons?.filter(
      w => w.userId === userId && w.courseId === courseId
    ) || []

    const quizResults = inMemoryDb.quizResults?.filter(
      r => r.userId === userId && r.courseId === courseId && r.passed
    ) || []

    const submissions = inMemoryDb.submissions?.filter(
      s => s.userId === userId && s.courseId === courseId && (s.status === 'submitted' || s.status === 'graded')
    ) || []

    // Check if all requirements met
    const allVideosWatched = watchedLessons.length === lessons.length
    const allQuizzesCompleted = quizResults.length === quizzes.length
    const allAssignmentsCompleted = submissions.length === assignments.length

    if (!allVideosWatched || !allQuizzesCompleted || !allAssignmentsCompleted) {
      return res.status(400).json({
        error: 'Course not completed',
        details: {
          videosWatched: `${watchedLessons.length}/${lessons.length}`,
          quizzesCompleted: `${quizResults.length}/${quizzes.length}`,
          assignmentsCompleted: `${submissions.length}/${assignments.length}`
        }
      })
    }

    // Get user
    const user = inMemoryDb.users.find(u => u.uid === userId)

    // Generate certificate
    const certificate = {
      id: `cert_${Date.now()}`,
      userId,
      courseId,
      courseName: course.title,
      studentName: user?.name || 'Student',
      issueDate: new Date().toISOString(),
      certificateNumber: `CERT-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
      completionDate: new Date().toISOString(),
      instructorName: course.instructorName || 'EduVerse Instructor',
      certificateUrl: `/certificates/${courseId}/${userId}.pdf`
    }

    // Store certificate
    if (!inMemoryDb.certificates) {
      inMemoryDb.certificates = []
    }
    inMemoryDb.certificates.push(certificate)

    // Update enrollment
    enrollment.certificateGenerated = true
    enrollment.certificateId = certificate.id
    enrollment.completionDate = new Date().toISOString()

    res.json({
      success: true,
      message: 'Certificate generated successfully',
      certificate
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user's certificates
router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid
    const certificates = inMemoryDb.certificates?.filter(c => c.userId === userId) || []
    res.json(certificates)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get certificate details
router.get('/:certificateId', verifyToken, async (req, res) => {
  try {
    const { certificateId } = req.params
    const certificate = inMemoryDb.certificates?.find(c => c.id === certificateId)

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' })
    }

    res.json(certificate)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Download certificate (returns certificate data)
router.get('/:certificateId/download', verifyToken, async (req, res) => {
  try {
    const { certificateId } = req.params
    const userId = req.user.uid

    const certificate = inMemoryDb.certificates?.find(c => c.id === certificateId)

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' })
    }

    if (certificate.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    // Return certificate data (in production, generate PDF)
    res.json({
      success: true,
      certificate,
      message: 'Certificate ready for download'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Generate certificate without auth (for testing/demo - uses X-User-ID header)
router.post('/generate-demo/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params
    const userId = req.headers['x-user-id']

    if (!userId) {
      return res.status(400).json({ error: 'X-User-ID header required' })
    }

    // Get enrollment
    const enrollment = inMemoryDb.enrollments.find(
      e => e.userId === userId && e.courseId === courseId
    )

    if (!enrollment) {
      return res.status(404).json({ error: 'Not enrolled in this course' })
    }

    // Get course
    const course = inMemoryDb.courses.find(c => c.id === courseId)

    // Get progress
    const lessons = inMemoryDb.lessons.filter(l => l.courseId === courseId)
    const quizzes = inMemoryDb.quizzes.filter(q => q.courseId === courseId)
    const assignments = inMemoryDb.assignments.filter(a => a.courseId === courseId)

    const watchedLessons = inMemoryDb.watchedLessons?.filter(
      w => w.userId === userId && w.courseId === courseId
    ) || []

    const quizResults = inMemoryDb.quizResults?.filter(
      r => r.userId === userId && r.courseId === courseId && r.passed
    ) || []

    const submissions = inMemoryDb.submissions?.filter(
      s => s.userId === userId && s.courseId === courseId && (s.status === 'submitted' || s.status === 'graded')
    ) || []

    // Check if all requirements met
    const allVideosWatched = watchedLessons.length === lessons.length
    const allQuizzesCompleted = quizResults.length === quizzes.length
    const allAssignmentsCompleted = submissions.length === assignments.length

    if (!allVideosWatched || !allQuizzesCompleted || !allAssignmentsCompleted) {
      return res.status(400).json({
        error: 'Course not completed',
        details: {
          videosWatched: `${watchedLessons.length}/${lessons.length}`,
          quizzesCompleted: `${quizResults.length}/${quizzes.length}`,
          assignmentsCompleted: `${submissions.length}/${assignments.length}`
        }
      })
    }

    // Get user
    const user = inMemoryDb.users.find(u => u.uid === userId)

    // Generate certificate
    const certificate = {
      id: `cert_${Date.now()}`,
      userId,
      courseId,
      courseName: course.title,
      studentName: user?.name || 'Student',
      issueDate: new Date().toISOString(),
      certificateNumber: `CERT-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
      completionDate: new Date().toISOString(),
      instructorName: course.instructorName || 'EduVerse Instructor',
      certificateUrl: `/certificates/${courseId}/${userId}.pdf`
    }

    // Store certificate
    if (!inMemoryDb.certificates) {
      inMemoryDb.certificates = []
    }
    inMemoryDb.certificates.push(certificate)

    // Update enrollment
    enrollment.certificateGenerated = true
    enrollment.certificateId = certificate.id
    enrollment.completionDate = new Date().toISOString()

    res.json({
      success: true,
      message: 'Certificate generated successfully',
      certificate
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
