import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { inMemoryDb } from '../utils/inMemoryDb.js'

const router = express.Router()

// Auto-enroll on payment method selection (skip actual payment) - NO AUTH VERSION FOR TESTING
router.post('/enroll-on-payment', async (req, res) => {
  try {
    const { courseId, paymentMethod, userId } = req.body
    
    console.log('=== ENROLL-ON-PAYMENT REQUEST ===')
    console.log('Body userId:', userId)
    console.log('Course ID:', courseId)
    console.log('Payment Method:', paymentMethod)
    
    // Get userId from auth header if available, otherwise use provided userId
    let finalUserId = userId
    
    // Try to get from auth if available
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (token) {
      console.log('Token found in header')
      try {
        const { auth } = await import('../firebase.js')
        if (auth) {
          const decodedToken = await auth.verifyIdToken(token)
          finalUserId = decodedToken.uid
          console.log('Token verified, userId from token:', finalUserId)
        }
      } catch (err) {
        console.warn('Token verification failed, using provided userId:', err.message)
      }
    }

    console.log('Final userId to use:', finalUserId)

    if (!finalUserId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' })
    }

    // Check if already enrolled
    const alreadyEnrolled = inMemoryDb.enrollments.find(
      e => e.userId === finalUserId && e.courseId === courseId
    )

    if (alreadyEnrolled) {
      console.log('User already enrolled in this course')
      return res.status(400).json({ error: 'Already enrolled in this course' })
    }

    // Get course
    const course = inMemoryDb.courses.find(c => c.id === courseId)
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }

    // Create enrollment (mark as paid immediately)
    const enrollment = {
      id: `enrollment_${Date.now()}`,
      userId: finalUserId,
      courseId,
      paymentMethod,
      status: 'active',
      purchased: true,
      enrollmentDate: new Date().toISOString(),
      progress: 0,
      certificateGenerated: false
    }

    inMemoryDb.enrollments.push(enrollment)
    console.log('✅ Enrollment created:', enrollment)
    console.log('Total enrollments now:', inMemoryDb.enrollments.length)
    console.log('All enrollments:', inMemoryDb.enrollments.map(e => ({ userId: e.userId, courseId: e.courseId })))

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully! Course added to My Learning',
      enrollment
    })
  } catch (error) {
    console.error('❌ Enrollment error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Auto-enroll on payment method selection (skip actual payment) - WITH AUTH
router.post('/enroll-on-payment-auth', verifyToken, async (req, res) => {
  try {
    const { courseId, paymentMethod } = req.body
    const userId = req.user.uid

    // Check if already enrolled
    const alreadyEnrolled = inMemoryDb.enrollments.find(
      e => e.userId === userId && e.courseId === courseId
    )

    if (alreadyEnrolled) {
      return res.status(400).json({ error: 'Already enrolled in this course' })
    }

    // Get course
    const course = inMemoryDb.courses.find(c => c.id === courseId)
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }

    // Create enrollment (mark as paid immediately)
    const enrollment = {
      id: `enrollment_${Date.now()}`,
      userId,
      courseId,
      paymentMethod,
      status: 'active',
      purchased: true,
      enrollmentDate: new Date().toISOString(),
      progress: 0,
      certificateGenerated: false
    }

    inMemoryDb.enrollments.push(enrollment)

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully! Course added to My Learning',
      enrollment
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Enroll in course (traditional)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.uid

    // Check if already enrolled
    const alreadyEnrolled = inMemoryDb.enrollments.find(
      e => e.userId === userId && e.courseId === courseId
    )

    if (alreadyEnrolled) {
      return res.status(400).json({ error: 'Already enrolled in this course' })
    }

    // Create enrollment
    const enrollment = {
      id: `enrollment_${Date.now()}`,
      userId,
      courseId,
      status: 'active',
      purchased: true,
      enrollmentDate: new Date().toISOString(),
      progress: 0,
      certificateGenerated: false
    }

    inMemoryDb.enrollments.push(enrollment)

    res.status(201).json({
      success: true,
      enrollment,
      message: 'Enrolled successfully'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Check enrollment (with auth)
router.get('/check/:courseId', verifyToken, async (req, res) => {
  try {
    console.log('=== CHECK ENROLLMENT REQUEST ===')
    console.log('User UID:', req.user.uid)
    console.log('Course ID:', req.params.courseId)
    console.log('Total enrollments in DB:', inMemoryDb.enrollments.length)
    console.log('All enrollments:', inMemoryDb.enrollments.map(e => ({ userId: e.userId, courseId: e.courseId })))
    
    const enrollment = inMemoryDb.enrollments.find(
      e => e.userId === req.user.uid && e.courseId === req.params.courseId
    )
    
    console.log('Enrollment found:', !!enrollment)
    console.log('Enrollment:', enrollment)
    
    res.json({ 
      enrolled: !!enrollment,
      enrollmentDate: enrollment?.enrollmentDate || null,
      progress: enrollment?.progress || 0
    })
  } catch (error) {
    console.error('Error in check enrollment:', error)
    res.status(500).json({ error: error.message })
  }
})

// Check enrollment (without auth - for testing)
router.get('/check-no-auth/:courseId/:userId', async (req, res) => {
  try {
    const { courseId, userId } = req.params
    const enrollment = inMemoryDb.enrollments.find(
      e => e.userId === userId && e.courseId === courseId
    )
    res.json({ 
      enrolled: !!enrollment,
      enrollmentDate: enrollment?.enrollmentDate || null,
      progress: enrollment?.progress || 0
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get student's enrolled courses
router.get('/my-courses', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid
    console.log('=== MY-COURSES REQUEST ===')
    console.log('User UID from token:', userId)
    console.log('Total enrollments in DB:', inMemoryDb.enrollments.length)
    console.log('All enrollments:', inMemoryDb.enrollments.map(e => ({ userId: e.userId, courseId: e.courseId })))
    
    const studentEnrollments = inMemoryDb.enrollments.filter(e => e.userId === userId)
    console.log('Student enrollments found:', studentEnrollments.length)
    console.log('Student enrollments:', studentEnrollments)
    
    const courseIds = studentEnrollments.map(e => e.courseId)
    console.log('Course IDs to fetch:', courseIds)

    // Get actual courses
    const enrolledCourses = inMemoryDb.courses.filter(c => courseIds.includes(c.id))
    console.log('Enrolled courses found:', enrolledCourses.length)

    // Add enrollment info
    const coursesWithEnrollment = enrolledCourses.map(course => {
      const enrollment = studentEnrollments.find(e => e.courseId === course.id)
      return {
        ...course,
        enrollmentDate: enrollment?.enrollmentDate,
        progress: enrollment?.progress || 0,
        certificateGenerated: enrollment?.certificateGenerated || false
      }
    })

    console.log('✅ Returning', coursesWithEnrollment.length, 'courses')
    res.json(coursesWithEnrollment)
  } catch (error) {
    console.error('❌ Error in my-courses:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get completed courses
router.get('/completed', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid
    const studentEnrollments = inMemoryDb.enrollments.filter(e => e.userId === userId)

    // Get completed enrollments (with certificates)
    const completedEnrollments = studentEnrollments.filter(e => e.certificateGenerated)
    const courseIds = completedEnrollments.map(e => e.courseId)

    const completedCourses = inMemoryDb.courses.filter(c => courseIds.includes(c.id))

    res.json({ courses: completedCourses })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
