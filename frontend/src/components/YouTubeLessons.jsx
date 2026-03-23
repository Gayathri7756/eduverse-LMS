import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function YouTubeLessons({ courseTitle, courseId }) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get(`http://localhost:5000/api/youtube/course/${encodeURIComponent(courseTitle)}`)
        if (response.data.videos && response.data.videos.length > 0) {
          setVideos(response.data.videos)
          setSelectedVideo(response.data.videos[0])
        } else {
          setError('No videos found for this course')
        }
      } catch (err) {
        console.error('Error fetching YouTube videos:', err)
        setError('Failed to load YouTube videos')
      } finally {
        setLoading(false)
      }
    }

    if (courseTitle) {
      fetchYouTubeVideos()
    }
  }, [courseTitle])

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-96 bg-gray-300 rounded-lg"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-700">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
      {selectedVideo && (
        <div className="bg-black rounded-lg overflow-hidden">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?enablejsapi=1`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="bg-gray-900 text-white p-4">
            <h3 className="text-lg font-semibold mb-2">{selectedVideo.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span>{selectedVideo.channelTitle}</span>
              <span>{selectedVideo.duration}</span>
            </div>
          </div>
        </div>
      )}

      {/* Video List */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Related Learning Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video) => (
            <div
              key={video.videoId}
              onClick={() => setSelectedVideo(video)}
              className={`cursor-pointer rounded-lg overflow-hidden transition-all hover:shadow-lg ${
                selectedVideo?.videoId === video.videoId ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="relative bg-gray-200 aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <div className="text-white text-3xl opacity-0 hover:opacity-100 transition-opacity">
                    ▶
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white">
                <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="truncate">{video.channelTitle}</span>
                  <span className="ml-2 flex-shrink-0">{video.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
