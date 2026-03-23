import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function MyLearning() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const quickCompleteCourse = async (courseId, e) => {
    e.stopPropagation()
    try {
      const token = localStorage.getItem(`token_${user.uid}`)
      await axios.post(
        `http://localhost:5000/api/progress/quick-complete/${courseId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // Refresh courses
      const response = await axios.get('http://localhost:5000/api/enrollments/my-courses', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const enrolledCourses = Array.isArray(response.data) ? response.data : response.data.courses || []
      
      const coursesWithProgress = await Promise.all(
        enrolledCourses.map(async (course) => {
          try {
            const progressRes = await axios.get(`http://localhost:5000/api/progress/course/${course.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            return {
              ...course,
              progress: progressRes.data.overallProgress || 0,
              progressDetails: progressRes.data
            }
          } catch (err) {
            return course
          }
        })
      )
      setCourses(coursesWithProgress)
    } catch (err) {
      console.error('Quick complete failed:', err)
      alert('Failed to complete course')
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchMyCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        const token = localStorage.getItem(`token_${user.uid}`)
        
        // Try to fetch from backend
        try {
          const response = await axios.get('http://localhost:5000/api/enrollments/my-courses', {
            headers: { Authorization: `Bearer ${token}` },
          })
          const enrolledCourses = Array.isArray(response.data) ? response.data : response.data.courses || []
          
          // Cache enrollments in localStorage
          localStorage.setItem(`enrollments_${user.uid}`, JSON.stringify(enrolledCourses))
          
          // Fetch progress for each course
          const coursesWithProgress = await Promise.all(
            enrolledCourses.map(async (course) => {
              try {
                const progressRes = await axios.get(`http://localhost:5000/api/progress/course/${course.id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                const courseData = {
                  ...course,
                  progress: progressRes.data.overallProgress || 0,
                  progressDetails: progressRes.data
                }
                // Cache progress in localStorage
                localStorage.setItem(`progress_${user.uid}_${course.id}`, JSON.stringify(courseData))
                return courseData
              } catch (err) {
                console.warn(`Failed to fetch progress for course ${course.id}:`, err)
                // Try to get from cache
                const cached = localStorage.getItem(`progress_${user.uid}_${course.id}`)
                return cached ? JSON.parse(cached) : course
              }
            })
          )
          
          setCourses(coursesWithProgress)
        } catch (err) {
          // If backend fails, try to load from localStorage cache
          console.warn('Backend fetch failed, trying cache:', err)
          const cachedEnrollments = localStorage.getItem(`enrollments_${user.uid}`)
          if (cachedEnrollments) {
            const enrolledCourses = JSON.parse(cachedEnrollments)
            const coursesWithProgress = enrolledCourses.map(course => {
              const cached = localStorage.getItem(`progress_${user.uid}_${course.id}`)
              return cached ? JSON.parse(cached) : course
            })
            setCourses(coursesWithProgress)
          } else {
            throw err
          }
        }
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError('Failed to load your courses')
      } finally {
        setLoading(false)
      }
    }

    fetchMyCourses()
  }, [user, navigate])

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative z-10">
      {/* Header */}
      <div className="glass-dark py-12 px-4 border-b border-white/8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">My Learning</h1>
          <p className="text-slate-400">Continue your learning journey</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {error && (
          <div className="glass-dark border-red-400/30 rounded-2xl p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {courses.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">No Courses Yet</h2>
            <p className="text-slate-400 mb-6">
              You haven't enrolled in any courses yet. Start learning today!
            </p>
            <button
              onClick={() => navigate('/courses')}
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition cursor-pointer group flex flex-col h-full"
                onClick={() => navigate(`/course/${course.id}/player`)}
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-primary-600 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
                    <div className="text-white text-4xl opacity-0 group-hover:opacity-100 transition">
                      ▶
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-xs bg-primary-600/30 text-slate-400 px-2 py-1 rounded-lg">
                      {course.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-100 line-clamp-2 mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4 flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-slate-400">Progress</span>
                      <span className="text-xs font-semibold text-slate-400">
                        {course.progress || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary-300/50 rounded-full h-2 mb-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>

                    {/* Three-Part Progress Breakdown */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="glass-secondary rounded-lg p-2">
                        <div className="font-bold text-slate-100">
                          {course.progressDetails?.lessons?.progress || 0}%
                        </div>
                        <div className="text-slate-400 text-xs">Videos</div>
                      </div>
                      <div className="glass-secondary rounded-lg p-2">
                        <div className="font-bold text-slate-100">
                          {course.progressDetails?.quizzes?.progress || 0}%
                        </div>
                        <div className="text-slate-400 text-xs">Quizzes</div>
                      </div>
                      <div className="glass-secondary rounded-lg p-2">
                        <div className="font-bold text-slate-100">
                          {course.progressDetails?.assignments?.progress || 0}%
                        </div>
                        <div className="text-slate-400 text-xs">Assignments</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  {course.progressDetails && 
                   course.progressDetails.lessons?.progress === 100 && 
                   course.progressDetails.quizzes?.progress === 100 && 
                   course.progressDetails.assignments?.progress === 100 ? (
                    <div className="space-y-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/course/${course.id}/certificate`)
                        }}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition flex items-center justify-center gap-2"
                      >
                        🎓 Generate Certificate
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/course/${course.id}/player`)
                        }}
                        className="w-full glass text-slate-100 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-white/10 transition"
                      >
                        Review Course
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-200">
                          {course.instructorName}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/course/${course.id}/player`)
                          }}
                          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:from-primary-500 hover:to-primary-600 transition"
                        >
                          Continue
                        </button>
                      </div>
                      <button
                        onClick={(e) => quickCompleteCourse(course.id, e)}
                        className="w-full bg-secondary-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-secondary-700 transition"
                        title="Quick complete for testing"
                      >
                        ⚡ Quick Complete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
