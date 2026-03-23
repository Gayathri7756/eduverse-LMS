import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import QuizComponent from '../components/QuizComponent'
import AssignmentComponent from '../components/AssignmentComponent'

export default function CoursePlayer() {
  const { courseId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('videos')
  const [videos, setVideos] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [assignments, setAssignments] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [watchedLessons, setWatchedLessons] = useState([])

  // Mark lesson as watched when video is selected
  const markLessonAsWatched = async (lessonId) => {
    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      if (!token) return

      await axios.post(
        'http://localhost:5000/api/progress/lesson-watched',
        { courseId, lessonId },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Update local state
      if (!watchedLessons.includes(lessonId)) {
        setWatchedLessons([...watchedLessons, lessonId])
      }
    } catch (err) {
      console.error('Failed to mark lesson as watched:', err)
    }
  }

  // Fetch watched lessons on mount
  const fetchWatchedLessons = async () => {
    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      if (!token) return

      const res = await axios.get(
        `http://localhost:5000/api/progress/course/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Extract watched lesson IDs from the response
      const watched = res.data.lessons?.watched || 0
      // We'll need to fetch the actual watched lesson IDs
      // For now, we'll track them as we mark them
    } catch (err) {
      console.warn('Failed to fetch watched lessons:', err)
    }
  }

  useEffect(() => {
    if (user?.uid) {
      fetchWatchedLessons()
    }
  }, [user?.uid, courseId])

  // Support deep-linking from notifications: ?focus=videos|quizzes|assignments
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const focus = params.get('focus')
    if (focus === 'videos' || focus === 'quizzes' || focus === 'assignments') {
      setActiveTab(focus)
    }
  }, [location.search])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch course
        const courseRes = await axios.get(`http://localhost:5000/api/courses/${courseId}`)
        setCourse(courseRes.data)

        // Fetch videos (lessons)
        try {
          const contentRes = await axios.get(`http://localhost:5000/api/courses/${courseId}/content`)
          const allLessons = []
          if (contentRes.data.sections) {
            contentRes.data.sections.forEach(section => {
              if (section.lessons) {
                allLessons.push(...section.lessons)
              }
            })
          }
          setVideos(allLessons)
          if (allLessons.length > 0) {
            setSelectedVideo(allLessons[0])
          }
        } catch (err) {
          console.warn('Failed to fetch videos:', err)
          setVideos([])
        }

        // Fetch quizzes
        try {
          const quizzesRes = await axios.get(`http://localhost:5000/api/quizzes/course/${courseId}`)
          setQuizzes(quizzesRes.data || [])
        } catch (err) {
          console.warn('Failed to fetch quizzes:', err)
          setQuizzes([])
        }

        // Fetch assignments
        try {
          const assignmentsRes = await axios.get(`http://localhost:5000/api/assignments/course/${courseId}`)
          setAssignments(assignmentsRes.data || [])
        } catch (err) {
          console.warn('Failed to fetch assignments:', err)
          setAssignments([])
        }

        setLoading(false)
      } catch (err) {
        console.error('Error fetching course data:', err)
        setError('Failed to load course. Please try again.')
        setLoading(false)
      }
    }

    if (courseId) {
      fetchData()
    }
  }, [courseId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading course...</p>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-2xl font-bold mb-4">{error || 'Course not found'}</p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  // Calculate course deadline
  const enrollmentDate = new Date()
  const courseDeadline = new Date(enrollmentDate.getTime() + (course.durationDays || 28) * 24 * 60 * 60 * 1000)
  const daysRemaining = Math.ceil((courseDeadline - new Date()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-gray-400 mt-2">Duration: {course.duration} ({course.durationDays} days)</p>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition"
            >
              ← Back to Courses
            </button>
          </div>
          
          {/* Course Deadline Banner */}
          <div className="bg-indigo-900 bg-opacity-50 border border-indigo-600 rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-300 font-semibold">📅 Course Deadline</p>
                <p className="text-white mt-1">{courseDeadline.toLocaleDateString()} ({daysRemaining} days remaining)</p>
              </div>
              <div className="text-right">
                <p className="text-indigo-300 font-semibold">⏱️ Complete all requirements to earn certificate</p>
                <p className="text-gray-300 text-sm mt-1">Videos → Quizzes → Assignments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Learning Flow Info */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">📚 Learning Flow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">🎥</span>
                <h3 className="font-bold text-white">Step 1: Watch Videos</h3>
              </div>
              <p className="text-gray-300 text-sm">Complete all {videos.length} course videos</p>
              <p className="text-indigo-400 text-xs mt-2">Required to unlock quizzes</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">📝</span>
                <h3 className="font-bold text-white">Step 2: Take Quizzes</h3>
              </div>
              <p className="text-gray-300 text-sm">{quizzes.length} quizzes with time limits</p>
              <p className="text-indigo-400 text-xs mt-2">Pass 70% to proceed</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">📋</span>
                <h3 className="font-bold text-white">Step 3: Submit Assignments</h3>
              </div>
              <p className="text-gray-300 text-sm">{assignments.length} assignments to complete</p>
              <p className="text-indigo-400 text-xs mt-2">Earn certificate on completion</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 bg-gray-800 rounded-lg p-2">
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
              activeTab === 'videos'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            🎥 Videos ({videos.length})
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
              activeTab === 'quizzes'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            📝 Quizzes ({quizzes.length})
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
              activeTab === 'assignments'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            📋 Assignments ({assignments.length})
          </button>
        </div>

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              {selectedVideo ? (
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  {/* YouTube Player */}
                  <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                    <p className="text-gray-400">{selectedVideo.description}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-12 text-center">
                  <p className="text-gray-400 text-lg">No videos available</p>
                </div>
              )}
            </div>

            {/* Videos List */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg overflow-hidden sticky top-4">
                <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
                  <h3 className="font-bold text-lg">Videos</h3>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  {videos.length > 0 ? (
                    videos.map((video, idx) => (
                      <button
                        key={video.id}
                        onClick={() => {
                          setSelectedVideo(video)
                          markLessonAsWatched(video.id)
                        }}
                        className={`w-full text-left px-6 py-4 border-b border-gray-700 transition ${
                          selectedVideo?.id === video.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-750'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg">{watchedLessons.includes(video.id) ? '✓' : '🎥'}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{idx + 1}. {video.title}</p>
                            <p className="text-xs text-gray-400 truncate mt-1">{video.description}</p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-gray-400 text-sm">
                      No videos available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div className="bg-gray-800 rounded-lg p-8">
            {quizzes.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold mb-6">📝 Quizzes</h2>
                <div className="space-y-4">
                  {quizzes.map((quiz, idx) => {
                    const quizDeadline = new Date(quiz.dueDate)
                    const isOverdue = quizDeadline < new Date()
                    return (
                      <div key={quiz.id} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">{idx + 1}. {quiz.title}</h3>
                            <p className="text-gray-300 mt-1">{quiz.description}</p>
                          </div>
                          {isOverdue && (
                            <span className="bg-red-900 bg-opacity-50 text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                              ⏰ Overdue
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="bg-gray-800 rounded p-3">
                            <p className="text-gray-400 text-sm">Questions</p>
                            <p className="text-white font-bold">{quiz.questions.length}</p>
                          </div>
                          <div className="bg-gray-800 rounded p-3">
                            <p className="text-gray-400 text-sm">Time Limit</p>
                            <p className="text-white font-bold">{quiz.timeLimit} min</p>
                          </div>
                          <div className="bg-gray-800 rounded p-3">
                            <p className="text-gray-400 text-sm">Due Date</p>
                            <p className="text-white font-bold">{quizDeadline.toLocaleDateString()}</p>
                          </div>
                        </div>
                        <QuizComponent courseId={courseId} user={user} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No quizzes available</p>
              </div>
            )}
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="bg-gray-800 rounded-lg p-8">
            {assignments.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold mb-6">📋 Assignments</h2>
                <div className="space-y-4">
                  {assignments.map((assignment, idx) => {
                    const assignmentDeadline = new Date(assignment.dueDate)
                    const isOverdue = assignmentDeadline < new Date()
                    return (
                      <div key={assignment.id} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">{idx + 1}. {assignment.title}</h3>
                            <p className="text-gray-300 mt-1">{assignment.description}</p>
                          </div>
                          {isOverdue && (
                            <span className="bg-red-900 bg-opacity-50 text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                              ⏰ Overdue
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="bg-gray-800 rounded p-3">
                            <p className="text-gray-400 text-sm">Max Score</p>
                            <p className="text-white font-bold">{assignment.maxScore} pts</p>
                          </div>
                          <div className="bg-gray-800 rounded p-3">
                            <p className="text-gray-400 text-sm">Time Limit</p>
                            <p className="text-white font-bold">{assignment.timeLimit}</p>
                          </div>
                          <div className="bg-gray-800 rounded p-3">
                            <p className="text-gray-400 text-sm">Due Date</p>
                            <p className="text-white font-bold">{assignmentDeadline.toLocaleDateString()}</p>
                          </div>
                        </div>
                        <AssignmentComponent courseId={courseId} user={user} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No assignments available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
