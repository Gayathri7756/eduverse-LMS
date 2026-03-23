import express from 'express'
import { db } from '../firebase.js'
import { verifyToken, requireRole } from '../middleware/auth.js'

const router = express.Router()

// Create section
router.post('/:courseId/sections', verifyToken, requireRole('instructor'), async (req, res) => {
  try {
    const { courseId } = req.params
    const { title, order } = req.body

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Section title is required' })
    }

    // Verify course belongs to instructor
    const courseDoc = await db.collection('courses').doc(courseId).get()
    if (!courseDoc.exists) {
      return res.status(404).json({ error: 'Course not found' })
    }

    if (courseDoc.data().instructorId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    // Create section
    const sectionRef = await db.collection('sections').add({
      courseId,
      title,
      order: order || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    res.status(201).json({
      id: sectionRef.id,
      courseId,
      title,
      order: order || 0,
      createdAt: new Date(),
    })
  } catch (error) {
    console.error('Section creation error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get sections for course
router.get('/:courseId/sections', async (req, res) => {
  try {
    const { courseId } = req.params

    const snapshot = await db
      .collection('sections')
      .where('courseId', '==', courseId)
      .orderBy('order', 'asc')
      .get()

    const sections = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    res.json(sections)
  } catch (error) {
    console.error('Get sections error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Update section
router.put('/:sectionId', verifyToken, requireRole('instructor'), async (req, res) => {
  try {
    const { sectionId } = req.params
    const { title, order } = req.body

    const sectionDoc = await db.collection('sections').doc(sectionId).get()
    if (!sectionDoc.exists) {
      return res.status(404).json({ error: 'Section not found' })
    }

    // Verify course belongs to instructor
    const courseDoc = await db.collection('courses').doc(sectionDoc.data().courseId).get()
    if (courseDoc.data().instructorId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    await db.collection('sections').doc(sectionId).update({
      title: title || sectionDoc.data().title,
      order: order !== undefined ? order : sectionDoc.data().order,
      updatedAt: new Date(),
    })

    res.json({ message: 'Section updated successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete section
router.delete('/:sectionId', verifyToken, requireRole('instructor'), async (req, res) => {
  try {
    const { sectionId } = req.params

    const sectionDoc = await db.collection('sections').doc(sectionId).get()
    if (!sectionDoc.exists) {
      return res.status(404).json({ error: 'Section not found' })
    }

    // Verify course belongs to instructor
    const courseDoc = await db.collection('courses').doc(sectionDoc.data().courseId).get()
    if (courseDoc.data().instructorId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    // Delete all lessons in section
    const lessonsSnapshot = await db
      .collection('lessons')
      .where('sectionId', '==', sectionId)
      .get()

    for (const doc of lessonsSnapshot.docs) {
      await doc.ref.delete()
    }

    // Delete section
    await db.collection('sections').doc(sectionId).delete()

    res.json({ message: 'Section deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
