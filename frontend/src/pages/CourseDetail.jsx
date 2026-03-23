import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import EnrollmentModal from '../components/EnrollmentModal'
import YouTubeLessons from '../components/YouTubeLessons'
import AITutor from '../components/AITutor'
import CourseRecommendations from '../components/CourseRecommendations'

export default function CourseDetail() {
  const { id } = useParams()
  const { user, userRole } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [enrolled, setEnrolled] = useState(false)
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)
  const [allCourses, setAllCourses] = useState([])

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch all courses for recommendations
        const allCoursesResponse = await axios.get('http://localhost:5000/api/courses')
        setAllCourses(allCoursesResponse.data)

        // Fetch course details
        const courseResponse = await axios.get(`http://localhost:5000/api/courses/${id}`)
        setCourse(courseResponse.data)

        // Fetch course content (sections and lessons)
        try {
          const contentResponse = await axios.get(`http://localhost:5000/api/courses/${id}/content`)
          setSections(contentResponse.data.sections || [])
        } catch (err) {
          console.warn('Could not fetch course content:', err.message)
          setSections([])
        }

        // Check enrollment status
        if (user) {
          const token = localStorage.getItem(`token_${user.uid}`)
          try {
            const enrollResponse = await axios.get(`http://localhost:5000/api/enrollments/check/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            setEnrolled(enrollResponse.data.enrolled)
            // Cache enrollment status
            localStorage.setItem(`enrolled_${user.uid}_${id}`, enrollResponse.data.enrolled)
          } catch (err) {
            console.warn('Enrollment check failed:', err.message)
            // Try to get from cache
            const cached = localStorage.getItem(`enrolled_${user.uid}_${id}`)
            if (cached !== null) {
              setEnrolled(cached === 'true')
            }
          }
        }
      } catch (error) {
        console.error('Error fetching course:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [id, user])

  const handleEnroll = () => {
    if (!user) {
      navigate('/login')
      return
    }
    setShowEnrollmentModal(true)
  }

  const handleEnrollmentSuccess = () => {
    setEnrolled(true)
    setShowEnrollmentModal(false)
    // Refresh the page to show updated enrollment status
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading course...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-100 mb-4">Course not found</p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-lg hover:from-primary-500 hover:to-primary-600 transition"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative z-10">
      {/* Hero Section */}
      <div className="glass-dark py-16 px-4 border-b border-primary-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block glass-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4 text-slate-100 border border-white/25">
            {course.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-100">{course.title}</h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl">{course.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <p className="text-slate-400 text-sm">Instructor</p>
              <p className="font-semibold text-lg text-slate-100">{course.instructorName}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Duration</p>
              <p className="font-semibold text-lg text-slate-100">{course.duration || 'Self-paced'}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Students</p>
              <p className="font-semibold text-lg text-slate-100">{course.studentCount || 0}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Price</p>
              <p className="font-semibold text-lg text-slate-100">₹{course.price || 'Free'}</p>
            </div>
          </div>

          {userRole !== 'instructor' && (
            <div className="flex gap-4">
              {!enrolled ? (
                <button
                  onClick={handleEnroll}
                  className="px-8 py-3 rounded-lg font-semibold text-lg transition bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-500 hover:to-primary-600"
                >
                  Enroll Now
                </button>
              ) : (
                <>
                  <button
                    disabled
                    className="px-8 py-3 rounded-lg font-semibold text-lg bg-green-600 text-white cursor-default"
                  >
                    ✓ Already Enrolled
                  </button>
                  <button
                    onClick={() => navigate(`/course/${id}/player`)}
                    className="px-8 py-3 rounded-lg font-semibold text-lg bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    ▶ Start Learning
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Info */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <div className="glass rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-slate-100 mb-6">About This Course</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                {course.content || 'No content available yet'}
              </p>

              {/* Course Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📚</div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1">Comprehensive</h3>
                    <p className="text-slate-400 text-sm">Complete curriculum covering all topics</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">👨‍🏫</div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1">Expert Instructor</h3>
                    <p className="text-slate-400 text-sm">Learn from industry professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎓</div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-1">Certificate</h3>
                    <p className="text-slate-400 text-sm">Earn certificate on completion</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content - Only show if enrolled */}
            {enrolled && sections.length > 0 && (
              <div className="glass rounded-lg p-8">
                <h2 className="text-3xl font-bold text-slate-100 mb-6">Course Content</h2>
                <div className="space-y-4">
                  {sections.map((section, sectionIndex) => (
                    <div key={section.id} className="glass-secondary rounded-lg overflow-hidden">
                      <div className="px-6 py-4 border-b border-secondary-500/20">
                        <h3 className="text-lg font-semibold text-slate-100">
                          Section {sectionIndex + 1}: {section.title}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">
                          {section.lessons?.length || 0} lessons
                        </p>
                      </div>
                      <div className="divide-y divide-secondary-500/20">
                        {section.lessons && section.lessons.length > 0 ? (
                          section.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="px-6 py-4 hover:bg-secondary-500/10 transition">
                              <div className="flex items-start gap-4">
                                <div className="text-2xl">🎥</div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-slate-100">
                                    Lesson {lessonIndex + 1}: {lesson.title}
                                  </h4>
                                  <p className="text-slate-400 text-sm mt-1">{lesson.description}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-6 py-4 text-slate-400 text-sm">
                            No lessons in this section yet
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* YouTube Lessons Section */}
            {enrolled && course && (
              <div className="glass rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-slate-100 mb-6">📺 Learning Videos</h2>
                <YouTubeLessons courseTitle={course.title} courseId={id} />
              </div>
            )}

            {/* AI Tutor Section */}
            {enrolled && course && (
              <div className="glass rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-slate-100 mb-6">🤖 AI Learning Assistant</h2>
                <AITutor courseTitle={course.title} />
              </div>
            )}

            {/* Not Enrolled Message */}
            {!enrolled && userRole !== 'instructor' && (
              <div className="glass-dark border-2 border-primary-500/30 rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">Course Content Locked</h3>
                <p className="text-slate-400 mb-6">
                  Enroll in this course to access all lessons and videos
                </p>
                <button
                  onClick={handleEnroll}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600 transition"
                >
                  Enroll Now to Unlock
                </button>
              </div>
            )}

            {/* Course Recommendations */}
            {course && (
              <div className="glass rounded-lg p-8 mt-8">
                <CourseRecommendations
                  courseTitle={course.title}
                  category={course.category}
                  allCourses={allCourses}
                />
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* Course Thumbnail */}
            <div className="glass rounded-lg overflow-hidden mb-6 sticky top-4">
              <div className="h-48 bg-primary-600 flex items-center justify-center">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="text-6xl">📚</div>
                )}
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-slate-400 mb-4">₹{course.price || 'Free'}</div>
                {userRole !== 'instructor' && (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolled}
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      enrolled
                        ? 'bg-green-600 text-white cursor-default'
                        : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-500 hover:to-primary-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {enrolled ? '✓ Enrolled' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>

            {/* Course Stats */}
            <div className="glass rounded-lg p-6">
              <h3 className="font-semibold text-slate-100 mb-4">Course Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Students Enrolled</span>
                  <span className="font-semibold text-slate-100">{course.studentCount || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Course Duration</span>
                  <span className="font-semibold text-slate-100">{course.duration || 'Self-paced'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Sections</span>
                  <span className="font-semibold text-slate-100">{sections.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Lessons</span>
                  <span className="font-semibold text-slate-100">
                    {sections.reduce((total, section) => total + (section.lessons?.length || 0), 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Enrollment Info */}
            {enrolled && (
              <div className="glass-dark border-2 border-green-500/30 rounded-lg p-6 mt-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">✓</div>
                  <h3 className="font-bold text-emerald-800 mb-2">You're Enrolled!</h3>
                  <p className="text-emerald-700 text-sm mb-4">
                    You can now access all course content and videos
                  </p>
                  <button
                    onClick={() => navigate(`/course/${id}/player`)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {showEnrollmentModal && course && (
        <EnrollmentModal
          course={course}
          user={user}
          onClose={() => setShowEnrollmentModal(false)}
          onSuccess={handleEnrollmentSuccess}
        />
      )}
    </div>
  )
}
