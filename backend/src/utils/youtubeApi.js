import axios from 'axios'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3'

/**
 * Search YouTube for educational videos
 * @param {string} query - Search query
 * @param {number} maxResults - Number of results to fetch (default: 8)
 * @returns {Promise<Array>} Array of video objects with id, title, thumbnail, channelTitle, duration
 */
export const searchYouTubeVideos = async (query, maxResults = 8) => {
  try {
    if (!YOUTUBE_API_KEY) {
      console.warn('YouTube API key not configured')
      return []
    }

    // Search for videos
    const searchResponse = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        q: `${query} tutorial`,
        part: 'snippet',
        type: 'video',
        maxResults,
        key: YOUTUBE_API_KEY,
        order: 'relevance',
        videoCategoryId: '27', // Education category
      },
    })

    const videoIds = searchResponse.data.items.map((item) => item.id.videoId).join(',')

    // Get video details including duration
    const detailsResponse = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        id: videoIds,
        part: 'snippet,contentDetails',
        key: YOUTUBE_API_KEY,
      },
    })

    // Format videos
    const videos = detailsResponse.data.items.map((item) => ({
      videoId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      duration: formatDuration(item.contentDetails.duration),
      publishedAt: item.snippet.publishedAt,
    }))

    return videos
  } catch (error) {
    console.error('YouTube search error:', error.message)
    return []
  }
}

/**
 * Convert ISO 8601 duration to readable format
 * @param {string} duration - ISO 8601 duration (e.g., PT1H30M45S)
 * @returns {string} Formatted duration (e.g., 1:30:45)
 */
const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return '0:00'

  const hours = (match[1] || '').replace('H', '')
  const minutes = (match[2] || '').replace('M', '')
  const seconds = (match[3] || '').replace('S', '')

  const h = hours ? parseInt(hours) : 0
  const m = minutes ? parseInt(minutes) : 0
  const s = seconds ? parseInt(seconds) : 0

  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}

export default { searchYouTubeVideos }
