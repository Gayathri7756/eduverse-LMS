import express from 'express'
import { db, useFirebase } from '../firebase.js'
import { verifyToken, requireRole } from '../middleware/auth.js'
import { getCourses, getCourseById, addCourse, getSectionsByCourseId, getLessonsBySectionId } from '../utils/inMemoryDb.js'

const router = express.Router()

// Get featured courses
router.get('/featured', async (req, res) => {
  try {
    if (useFirebase && db) {
      const snapshot = await db.collection('courses').limit(6).get()
      const courses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      res.json(courses)
    } else {
      // Use in-memory database
      const courses = getCourses().slice(0, 6)
      res.json(courses)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get instructor's courses
router.get('/instructor', verifyToken, requireRole('instructor'), async (req, res) => {
  try {
    if (useFirebase && db) {
      const snapshot = await db
        .collection('courses')
        .where('instructorId', '==', req.user.uid)
        .get()
      const courses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      res.json(courses)
    } else {
      // Use in-memory database
      const courses = getCourses().filter(c => c.instructorId === req.user.uid)
      res.json(courses)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all courses
router.get('/', async (req, res) => {
  try {
    if (useFirebase && db) {
      const snapshot = await db.collection('courses').get()
      const courses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      res.json(courses)
    } else {
      // Use in-memory database
      const courses = getCourses()
      res.json(courses)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    if (useFirebase && db) {
      const courseDoc = await db.collection('courses').doc(req.params.id).get()
      if (!courseDoc.exists) {
        return res.status(404).json({ error: 'Course not found' })
      }
      res.json({
        id: courseDoc.id,
        ...courseDoc.data(),
      })
    } else {
      // Use in-memory database
      const course = getCourseById(req.params.id)
      if (!course) {
        return res.status(404).json({ error: 'Course not found' })
      }
      res.json(course)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get course content (sections and lessons)
router.get('/:id/content', async (req, res) => {
  try {
    const { id } = req.params

    if (useFirebase && db) {
      // Get sections
      const sectionsSnapshot = await db
        .collection('sections')
        .where('courseId', '==', id)
        .orderBy('order', 'asc')
        .get()

      const sections = []
      for (const sectionDoc of sectionsSnapshot.docs) {
        const section = {
          id: sectionDoc.id,
          ...sectionDoc.data(),
        }

        // Get lessons for this section
        const lessonsSnapshot = await db
          .collection('lessons')
          .where('sectionId', '==', section.id)
          .orderBy('order', 'asc')
          .get()

        section.lessons = lessonsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        sections.push(section)
      }

      res.json({ sections })
    } else {
      // Use in-memory database
      const sections = getSectionsByCourseId(id).map(section => ({
        ...section,
        lessons: getLessonsBySectionId(section.id)
      }))
      res.json({ sections })
    }
  } catch (error) {
    console.error('Get course content error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Create course
router.post('/', verifyToken, requireRole('instructor'), async (req, res) => {
  try {
    const { title, description, category, content, duration, price, thumbnail } = req.body

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Course title is required' })
    }

    if (useFirebase && db) {
      const courseRef = await db.collection('courses').add({
        title,
        description: description || '',
        category: category || 'General',
        content: content || '',
        duration: duration || 'Self-paced',
        price: price || 0,
        thumbnail: thumbnail || '',
        instructorId: req.user.uid,
        instructorName: req.user.name || 'Instructor',
        studentCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      res.status(201).json({
        id: courseRef.id,
        message: 'Course created successfully',
      })
    } else {
      // Use in-memory database
      const newCourse = addCourse({
        title,
        description: description || '',
        category: category || 'General',
        content: content || '',
        duration: duration || 'Self-paced',
        price: price || 0,
        thumbnail: thumbnail || '',
        instructorId: req.user.uid,
        instructorName: req.user.name || 'Instructor',
        studentCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      res.status(201).json({
        id: newCourse.id,
        message: 'Course created successfully',
      })
    }
  } catch (error) {
    console.error('Course creation error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
