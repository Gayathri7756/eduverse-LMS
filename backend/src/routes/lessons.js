import express from 'express'
import { db } from '../firebase.js'
import { verifyToken, requireRole } from '../middleware/auth.js'
import { extractYoutubeId, isValidYoutubeUrl } from '../utils/youtubeUtils.js'

const router = express.Router()

// Create lesson
router.post('/:sectionId/lessons', verifyToken, requireRole('instructor'), async (req, res) => {
  try {
    const { sectionId } = req.params
    const { title, description, youtubeUrl, order } = req.body

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Lesson title is required' })
    }

    if (!youtubeUrl || !isValidYoutubeUrl(youtubeUrl)) {
      return res.status(400).json({ error: 'Valid YouTube URL is required' })
    }

    // Get section
    const sectionDoc = await db.collection('sections').doc(sectionId).get()
    if (!sectionDoc.exists) {
      return res.status(404).json({ error: 'Section not found' })
    }

    // Verify course belongs to instructor
    const courseDoc = await db.collection('courses').doc(sectionDoc.data().courseId).get()
    if (courseDoc.data().instructorId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    // Extract video ID
    const videoId = extractYoutubeId(youtubeUrl)

    // Create lesson
    const lessonRef = await db.collection('lessons').add({
      courseId: sectionDoc.data().courseId,
      sectionId,
      title,
      description: description || '',
      youtubeUrl,
      videoId,
      order: order || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    res.status(201).json({
      id: lessonRef.id,
      courseId: sectionDoc.data().courseId,
      sectionId,
      title,
      description: description || '',
      youtubeUrl,
      videoId,
      order: order || 0,
      createdAt: new Date(),
    })
  } catch (error) {
    console.error('Lesson creation error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get lessons for section
router.get('/:sectionId/lessons', async (req, res) => {
  try {
    const { sectionId } = req.params

    const snapshot = await db
      .collection('lessons')
      .where('sectionId', '==', sectionId)
      .orderBy('order', 'asc')
      .get()

    const lessons = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    res.json(lessons)
  } catch (error) {
    console.error('Get lessons error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get lesson by ID
router.get('/lesson/:lessonId', async (req, res) => {
  try {
    const { lessonId } = req.params

    const lessonDoc = await db.collection('lessons').doc(lessonId).get()
    if (!lessonDoc.exists) {
      return res.status(404).json({ error: 'Lesson not found' })
    }

    res.json({
      id: lessonDoc.id,
      ...lessonDoc.data(),
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update lesson
router.put('/:lessonId', verifyToken, requireRole('instructor'), async (req, res) => {
  try {
    const { lessonId } = req.params
    const { title, description, youtubeUrl, order } = req.body

    const lessonDoc = await db.collection('lessons').doc(lessonId).get()
    if (!lessonDoc.exists) {
      return res.status(404).json({ error: 'Lesson not found' })
    }

    // Verify course belongs to instructor
    const courseDoc = await db.collection('courses').doc(lessonDoc.data().courseId).get()
    if (courseDoc.data().instructorId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    const updateData = {
      updatedAt: new Date(),
    }

    if (title) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (youtubeUrl) {
      if (!isValidYoutubeUrl(youtubeUrl)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' })
      }
      updateData.youtubeUrl = youtubeUrl
      updateData.videoId = extractYoutubeId(youtubeUrl)
    }
    if (order !== undefined) updateData.order = order

    await db.collection('lessons').doc(lessonId).update(updateData)

    res.json({ message: 'Lesson updated successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete lesson
router.delete('/:lessonId', verifyToken, requireRole('instructor'), async (req, res) => {
  try {
    const { lessonId } = req.params

    const lessonDoc = await db.collection('lessons').doc(lessonId).get()
    if (!lessonDoc.exists) {
      return res.status(404).json({ error: 'Lesson not found' })
    }

    // Verify course belongs to instructor
    const courseDoc = await db.collection('courses').doc(lessonDoc.data().courseId).get()
    if (courseDoc.data().instructorId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    await db.collection('lessons').doc(lessonId).delete()

    res.json({ message: 'Lesson deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
