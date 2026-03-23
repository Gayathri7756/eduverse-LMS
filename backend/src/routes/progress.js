import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { inMemoryDb } from '../utils/inMemoryDb.js'

const router = express.Router()

// Get course progress for a user
router.get('/course/:courseId', verifyToken, async (req, res) => {
  try {
    const { courseId } = req.params
    const userId = req.user.uid

    // Get enrollment
    const enrollment = inMemoryDb.enrollments.find(
      e => e.userId === userId && e.courseId === courseId
    )

    if (!enrollment) {
      return res.status(404).json({ error: 'Not enrolled in this course' })
    }

    // Get course details
    const course = inMemoryDb.courses.find(c => c.id === courseId)
    const sections = inMemoryDb.sections.filter(s => s.courseId === courseId)
    const lessons = inMemoryDb.lessons.filter(l => l.courseId === courseId)
    const quizzes = inMemoryDb.quizzes.filter(q => q.courseId === courseId)
    const assignments = inMemoryDb.assignments.filter(a => a.courseId === courseId)

    // Get user's quiz results
    const quizResults = inMemoryDb.quizResults?.filter(
      r => r.userId === userId && r.courseId === courseId
    ) || []

    // Get user's assignment submissions
    const submissions = inMemoryDb.submissions?.filter(
      s => s.userId === userId && s.courseId === courseId
    ) || []

    // Get watched lessons
    const watchedLessons = inMemoryDb.watchedLessons?.filter(
      w => w.userId === userId && w.courseId === courseId
    ) || []

    // Calculate progress
    const totalLessons = lessons.length
    const watchedCount = watchedLessons.length
    const lessonsProgress = totalLessons > 0 ? (watchedCount / totalLessons) * 100 : 0

    const totalQuizzes = quizzes.length
    const completedQuizzes = quizResults.filter(r => r.passed).length
    const quizzesProgress = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 0

    const totalAssignments = assignments.length
    const completedAssignments = submissions.filter(s => s.status === 'submitted' || s.status === 'graded').length
    const assignmentsProgress = totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0

    // Overall progress: Each component is worth 33.33%
    // Videos: 33.33%, Quizzes: 33.33%, Assignments: 33.33%
    const overallProgress = (lessonsProgress + quizzesProgress + assignmentsProgress) / 3

    // Check if course is completed (all three at 100%)
    const isCompleted = lessonsProgress === 100 && quizzesProgress === 100 && assignmentsProgress === 100

    res.json({
      courseId,
      courseName: course?.title,
      enrollmentDate: enrollment.enrollmentDate,
      lessons: {
        total: totalLessons,
        watched: watchedCount,
        progress: Math.round(lessonsProgress)
      },
      quizzes: {
        total: totalQuizzes,
        completed: completedQuizzes,
        progress: Math.round(quizzesProgress),
        results: quizResults
      },
      assignments: {
        total: totalAssignments,
        completed: completedAssignments,
        progress: Math.round(assignmentsProgress),
        submissions: submissions
      },
      overallProgress: Math.round(overallProgress),
      isCompleted,
      certificateGenerated: enrollment.certificateGenerated || false
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Mark lesson as watched
router.post('/lesson-watched', verifyToken, async (req, res) => {
  try {
    const { courseId, lessonId } = req.body
    const userId = req.user.uid

    // Check if already watched
    const existing = inMemoryDb.watchedLessons?.find(
      w => w.userId === userId && w.lessonId === lessonId
    )

    if (!existing) {
      if (!inMemoryDb.watchedLessons) {
        inMemoryDb.watchedLessons = []
      }
      inMemoryDb.watchedLessons.push({
        id: `watched_${Date.now()}`,
        userId,
        courseId,
        lessonId,
        watchedAt: new Date().toISOString()
      })
    }

    res.json({ success: true, message: 'Lesson marked as watched' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get notifications for user
router.get('/notifications', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid
    const notifications = []

    // Get all enrollments
    const enrollments = inMemoryDb.enrollments.filter(e => e.userId === userId)

    for (const enrollment of enrollments) {
      const courseId = enrollment.courseId
      const course = inMemoryDb.courses.find(c => c.id === courseId)

      // Check unwatched videos
      const lessons = inMemoryDb.lessons.filter(l => l.courseId === courseId)
      const watchedLessons = inMemoryDb.watchedLessons?.filter(
        w => w.userId === userId && w.courseId === courseId
      ) || []
      const unwatchedCount = lessons.length - watchedLessons.length

      if (unwatchedCount > 0) {
        notifications.push({
          id: `notif_video_${courseId}`,
          type: 'video',
          courseId,
          courseName: course?.title,
          message: `You have ${unwatchedCount} video(s) to watch in ${course?.title}`,
          priority: 'medium',
          createdAt: new Date().toISOString()
        })
      }

      // Check incomplete quizzes
      const quizzes = inMemoryDb.quizzes.filter(q => q.courseId === courseId)
      const quizResults = inMemoryDb.quizResults?.filter(
        r => r.userId === userId && r.courseId === courseId
      ) || []
      const incompleteQuizzes = quizzes.filter(
        q => !quizResults.find(r => r.quizId === q.id && r.passed)
      )

      if (incompleteQuizzes.length > 0) {
        notifications.push({
          id: `notif_quiz_${courseId}`,
          type: 'quiz',
          courseId,
          courseName: course?.title,
          message: `You have ${incompleteQuizzes.length} quiz(zes) to complete in ${course?.title}`,
          priority: 'high',
          createdAt: new Date().toISOString()
        })
      }

      // Check pending assignments
      const assignments = inMemoryDb.assignments.filter(a => a.courseId === courseId)
      const submissions = inMemoryDb.submissions?.filter(
        s => s.userId === userId && s.courseId === courseId
      ) || []
      const pendingAssignments = assignments.filter(a => {
        const submission = submissions.find(s => s.assignmentId === a.id)
        return !submission || submission.status !== 'graded'
      })

      if (pendingAssignments.length > 0) {
        const overdueAssignments = pendingAssignments.filter(
          a => new Date(a.dueDate) < new Date()
        )

        if (overdueAssignments.length > 0) {
          notifications.push({
            id: `notif_assignment_overdue_${courseId}`,
            type: 'assignment_overdue',
            courseId,
            courseName: course?.title,
            message: `${overdueAssignments.length} assignment(s) overdue in ${course?.title}`,
            priority: 'critical',
            createdAt: new Date().toISOString()
          })
        } else {
          notifications.push({
            id: `notif_assignment_${courseId}`,
            type: 'assignment',
            courseId,
            courseName: course?.title,
            message: `You have ${pendingAssignments.length} assignment(s) to complete in ${course?.title}`,
            priority: 'high',
            createdAt: new Date().toISOString()
          })
        }
      }
    }

    // Sort by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    notifications.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

    res.json(notifications)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DEBUG - Get current user info
router.get('/debug/user-info', verifyToken, async (req, res) => {
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

// SPECIAL ENDPOINT - Complete course for a specific user (for testing/demo)
// Usage: POST /api/progress/complete-for-user/:userId/:courseId
router.post('/complete-for-user/:userId/:courseId', async (req, res) => {
  try {
    const { userId, courseId } = req.params

    // Get all lessons, quizzes, assignments for this course
    const lessons = inMemoryDb.lessons.filter(l => l.courseId === courseId)
    const quizzes = inMemoryDb.quizzes.filter(q => q.courseId === courseId)
    const assignments = inMemoryDb.assignments.filter(a => a.courseId === courseId)

    // Mark all lessons as watched
    lessons.forEach(lesson => {
      const existing = inMemoryDb.watchedLessons?.find(
        w => w.userId === userId && w.lessonId === lesson.id
      )
      if (!existing) {
        if (!inMemoryDb.watchedLessons) {
          inMemoryDb.watchedLessons = []
        }
        inMemoryDb.watchedLessons.push({
          id: `watched_${Date.now()}_${Math.random()}`,
          userId,
          courseId,
          lessonId: lesson.id,
          watchedAt: new Date().toISOString()
        })
      }
    })

    // Mark all quizzes as passed
    quizzes.forEach(quiz => {
      const existing = inMemoryDb.quizResults?.find(
        r => r.userId === userId && r.quizId === quiz.id
      )
      if (!existing) {
        if (!inMemoryDb.quizResults) {
          inMemoryDb.quizResults = []
        }
        inMemoryDb.quizResults.push({
          id: `result_${Date.now()}_${Math.random()}`,
          userId,
          courseId,
          quizId: quiz.id,
          score: 100,
          passed: true,
          correctAnswers: quiz.questions.length,
          totalQuestions: quiz.questions.length,
          attemptedAt: new Date().toISOString(),
          detailedResults: quiz.questions.map((q, idx) => ({
            question: q.text,
            userAnswer: 0,
            correctAnswer: 0,
            isCorrect: true
          }))
        })
      }
    })

    // Mark all assignments as submitted
    assignments.forEach(assignment => {
      const existing = inMemoryDb.submissions?.find(
        s => s.userId === userId && s.assignmentId === assignment.id
      )
      if (!existing) {
        if (!inMemoryDb.submissions) {
          inMemoryDb.submissions = []
        }
        inMemoryDb.submissions.push({
          id: `submission_${Date.now()}_${Math.random()}`,
          userId,
          courseId,
          assignmentId: assignment.id,
          content: 'Auto-completed for testing',
          status: 'submitted',
          submittedAt: new Date().toISOString(),
          score: 100
        })
      }
    })

    res.json({
      success: true,
      message: 'Course completed! All videos, quizzes, and assignments marked as done.',
      completed: {
        videosMarked: lessons.length,
        quizzesMarked: quizzes.length,
        assignmentsMarked: assignments.length
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// QUICK COMPLETE - Mark all videos, quizzes, and assignments as complete (for testing)
router.post('/quick-complete/:courseId', verifyToken, async (req, res) => {
  try {
    const { courseId } = req.params
    const userId = req.user.uid

    // Get all lessons, quizzes, assignments for this course
    const lessons = inMemoryDb.lessons.filter(l => l.courseId === courseId)
    const quizzes = inMemoryDb.quizzes.filter(q => q.courseId === courseId)
    const assignments = inMemoryDb.assignments.filter(a => a.courseId === courseId)

    // Mark all lessons as watched
    lessons.forEach(lesson => {
      const existing = inMemoryDb.watchedLessons?.find(
        w => w.userId === userId && w.lessonId === lesson.id
      )
      if (!existing) {
        if (!inMemoryDb.watchedLessons) {
          inMemoryDb.watchedLessons = []
        }
        inMemoryDb.watchedLessons.push({
          id: `watched_${Date.now()}_${Math.random()}`,
          userId,
          courseId,
          lessonId: lesson.id,
          watchedAt: new Date().toISOString()
        })
      }
    })

    // Mark all quizzes as passed
    quizzes.forEach(quiz => {
      const existing = inMemoryDb.quizResults?.find(
        r => r.userId === userId && r.quizId === quiz.id
      )
      if (!existing) {
        if (!inMemoryDb.quizResults) {
          inMemoryDb.quizResults = []
        }
        inMemoryDb.quizResults.push({
          id: `result_${Date.now()}_${Math.random()}`,
          userId,
          courseId,
          quizId: quiz.id,
          score: 100,
          passed: true,
          correctAnswers: quiz.questions.length,
          totalQuestions: quiz.questions.length,
          attemptedAt: new Date().toISOString(),
          detailedResults: quiz.questions.map((q, idx) => ({
            question: q.text,
            userAnswer: 0,
            correctAnswer: 0,
            isCorrect: true
          }))
        })
      }
    })

    // Mark all assignments as submitted
    assignments.forEach(assignment => {
      const existing = inMemoryDb.submissions?.find(
        s => s.userId === userId && s.assignmentId === assignment.id
      )
      if (!existing) {
        if (!inMemoryDb.submissions) {
          inMemoryDb.submissions = []
        }
        inMemoryDb.submissions.push({
          id: `submission_${Date.now()}_${Math.random()}`,
          userId,
          courseId,
          assignmentId: assignment.id,
          content: 'Auto-completed for testing',
          status: 'submitted',
          submittedAt: new Date().toISOString(),
          score: 100
        })
      }
    })

    res.json({
      success: true,
      message: 'Course completed! All videos, quizzes, and assignments marked as done.',
      completed: {
        videosMarked: lessons.length,
        quizzesMarked: quizzes.length,
        assignmentsMarked: assignments.length
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
