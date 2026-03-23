import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import CertificateDisplay from '../components/CertificateDisplay'
import VoiceAssistant from '../components/VoiceAssistant'

export default function StudentDashboard() {
  const { user, userRole } = useAuth()
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [courseProgress, setCourseProgress] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userRole !== 'student') {
      navigate('/')
      return
    }

    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem(`token_${user?.uid}`)
        
        // Fetch enrollments to check which courses user is enrolled in
        if (token) {
          try {
            const enrollmentsResponse = await axios.get('http://localhost:5000/api/enrollments/my-courses', {
              headers: { Authorization: `Bearer ${token}` },
            })
            setEnrolledCourses(enrollmentsResponse.data)

            // Fetch progress for each course
            const progressMap = {}
            for (const course of enrollmentsResponse.data) {
              try {
                const progressResponse = await axios.get(
                  `http://localhost:5000/api/progress/course/${course.id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` }
                  }
                )
                progressMap[course.id] = progressResponse.data
              } catch (err) {
                console.warn(`Failed to fetch progress for course ${course.id}:`, err)
              }
            }
            setCourseProgress(progressMap)
          } catch (error) {
            console.warn('Could not fetch enrollments:', error.message)
            setEnrolledCourses([])
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchCourses()
  }, [user, userRole, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* AI Voice Assistant */}
        <div className="mb-12">
          <VoiceAssistant />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 tracking-tight">My Learning</h1>
            <p className="text-slate-400 mt-2">Continue your learning journey</p>
          </div>
          <Link
            to="/courses"
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition shadow-lg shadow-primary-900/40 border border-primary-500/30"
          >
            Browse More Courses
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center border border-white/8">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">No courses yet</h2>
            <p className="text-slate-400 mb-6">You haven't enrolled in any courses. Start learning today!</p>
            <Link
              to="/courses"
              className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition shadow-lg shadow-primary-900/40 border border-primary-500/30"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((course) => {
              const progress = courseProgress[course.id]
              return (
                <div
                  key={course.id}
                  className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:border-primary-500/30 transition border border-white/8"
                >
                  {progress?.isCompleted && (
                    <div className="mb-4">
                      <CertificateDisplay courseId={course.id} courseName={course.title} />
                    </div>
                  )}
                  <Link
                    to={`/course/${course.id}/player`}
                    className="block"
                  >
                    <div className="h-40 bg-gradient-to-br from-primary-900 via-surface-800 to-secondary-900/60 relative overflow-hidden">
                      {course.thumbnail && (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-indigo">{course.category}</span>
                    </div>
                    <Link
                      to={`/course/${course.id}/player`}
                      className="block"
                    >
                      <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-primary-300 transition line-clamp-2">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-slate-500 mb-4 line-clamp-2 text-xs leading-relaxed">{course.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                        <span>Progress</span>
                        <span className="text-primary-400 font-semibold">{progress?.overallProgress || 0}%</span>
                      </div>
                      <div className="w-full bg-white/8 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-1.5 rounded-full transition-all duration-500" 
                          style={{ width: `${progress?.overallProgress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    {progress && (
                      <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                        <div className="glass-secondary rounded-lg p-2 text-center border border-primary-500/15">
                          <p className="text-slate-400">Videos</p>
                          <p className="font-bold text-primary-300">{progress.lessons.progress}%</p>
                        </div>
                        <div className="glass-secondary rounded-lg p-2 text-center border border-primary-500/15">
                          <p className="text-slate-400">Quizzes</p>
                          <p className="font-bold text-primary-300">{progress.quizzes.progress}%</p>
                        </div>
                        <div className="glass-secondary rounded-lg p-2 text-center border border-primary-500/15">
                          <p className="text-slate-400">Assignments</p>
                          <p className="font-bold text-primary-300">{progress.assignments.progress}%</p>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-slate-500">By <span className="text-slate-300">{course.instructorName}</span></p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
