import express from 'express'
import { searchYouTubeVideos } from '../utils/youtubeApi.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/**
 * Search YouTube videos for a course
 * GET /api/youtube/search?query=React%20tutorial&maxResults=8
 */
router.get('/search', async (req, res) => {
  try {
    const { query, maxResults = 8 } = req.query

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' })
    }

    const videos = await searchYouTubeVideos(query, parseInt(maxResults))
    res.json({ videos, count: videos.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * Get YouTube videos for a specific course
 * GET /api/youtube/course/:courseTitle
 */
router.get('/course/:courseTitle', async (req, res) => {
  try {
    const { courseTitle } = req.params
    const videos = await searchYouTubeVideos(courseTitle, 8)
    res.json({ videos, count: videos.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
