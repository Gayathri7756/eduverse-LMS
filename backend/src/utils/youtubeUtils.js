/**
 * YouTube URL utilities
 */

/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null if invalid
 */
export const extractYoutubeId = (url) => {
  if (!url) return null

  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Get embed URL from YouTube video ID
 * @param {string} videoId - YouTube video ID
 * @returns {string} - Embed URL
 */
export const getEmbedUrl = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}`
}

/**
 * Validate YouTube URL
 * @param {string} url - YouTube URL to validate
 * @returns {boolean} - True if valid YouTube URL
 */
export const isValidYoutubeUrl = (url) => {
  return extractYoutubeId(url) !== null
}

/**
 * Get thumbnail URL from YouTube video ID
 * @param {string} videoId - YouTube video ID
 * @returns {string} - Thumbnail URL
 */
export const getThumbnailUrl = (videoId) => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}
