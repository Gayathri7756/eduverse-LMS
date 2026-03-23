import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function InstructorDashboard() {
  const { user, userRole } = useAuth()
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [showSectionForm, setShowSectionForm] = useState(false)
  const [showLessonForm, setShowLessonForm] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedSection, setSelectedSection] = useState(null)
  const [sections, setSections] = useState([])
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    description: '',
    category: '',
    content: '',
    duration: '',
    price: 0,
    thumbnail: '',
  })
  const [sectionFormData, setSectionFormData] = useState({
    title: '',
  })
  const [lessonFormData, setLessonFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
  })

  useEffect(() => {
    if (userRole !== 'instructor') {
      navigate('/')
      return
    }

    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem(`token_${user?.uid}`)
        const response = await axios.get('/api/courses/instructor', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setCourses(response.data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchCourses()
  }, [user, userRole, navigate])

  const handleCourseInputChange = (e) => {
    const { name, value } = e.target
    setCourseFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSectionInputChange = (e) => {
    const { name, value } = e.target
    setSectionFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLessonInputChange = (e) => {
    const { name, value } = e.target
    setLessonFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      await axios.post('/api/courses', courseFormData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCourseFormData({ title: '', description: '', category: '', content: '', duration: '', price: 0, thumbnail: '' })
      setShowCourseForm(false)
      const response = await axios.get('/api/courses/instructor', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCourses(response.data)
    } catch (error) {
      console.error('Error creating course:', error)
    }
  }

  const handleCreateSection = async (e) => {
    e.preventDefault()
    if (!selectedCourse) return

    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      await axios.post(
        `/api/sections/${selectedCourse.id}/sections`,
        sectionFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSectionFormData({ title: '' })
      setShowSectionForm(false)
      fetchSections(selectedCourse.id)
    } catch (error) {
      console.error('Error creating section:', error)
    }
  }

  const handleCreateLesson = async (e) => {
    e.preventDefault()
    if (!selectedSection) return

    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      await axios.post(
        `/api/lessons/${selectedSection.id}/lessons`,
        lessonFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setLessonFormData({ title: '', description: '', youtubeUrl: '' })
      setShowLessonForm(false)
      fetchLessons(selectedSection.id)
    } catch (error) {
      console.error('Error creating lesson:', error)
    }
  }

  const fetchSections = async (courseId) => {
    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      const response = await axios.get(`/api/sections/${courseId}/sections`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSections(response.data)
    } catch (error) {
      console.error('Error fetching sections:', error)
    }
  }

  const fetchLessons = async (sectionId) => {
    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      const response = await axios.get(`/api/lessons/${sectionId}/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setLessons(response.data)
    } catch (error) {
      console.error('Error fetching lessons:', error)
    }
  }

  const handleSelectCourse = (course) => {
    setSelectedCourse(course)
    setSelectedSection(null)
    setLessons([])
    fetchSections(course.id)
  }

  const handleSelectSection = (section) => {
    setSelectedSection(section)
    fetchLessons(section.id)
  }

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm('Delete this section?')) return
    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      await axios.delete(`/api/sections/${sectionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (selectedCourse) fetchSections(selectedCourse.id)
    } catch (error) {
      console.error('Error deleting section:', error)
    }
  }

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm('Delete this lesson?')) return
    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      await axios.delete(`/api/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (selectedSection) fetchLessons(selectedSection.id)
    } catch (error) {
      console.error('Error deleting lesson:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-100">Instructor Dashboard</h1>
            <p className="text-slate-400 mt-2">Manage your courses, sections, and lessons</p>
          </div>
          <button
            onClick={() => setShowCourseForm(!showCourseForm)}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition shadow-lg hover:shadow-xl"
          >
            {showCourseForm ? '✕ Cancel' : '+ Create Course'}
          </button>
        </div>

        {/* Create Course Form */}
        {showCourseForm && (
          <div className="glass rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">Create New Course</h2>
            <form onSubmit={handleCreateCourse} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Course Title</label>
                <input
                  type="text"
                  name="title"
                  value={courseFormData.title}
                  onChange={handleCourseInputChange}
                  className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 placeholder-slate-500 bg-white/5"
                  placeholder="Enter course title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Description</label>
                <textarea
                  name="description"
                  value={courseFormData.description}
                  onChange={handleCourseInputChange}
                  className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 placeholder-slate-500 bg-white/5"
                  rows="3"
                  placeholder="Describe your course"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={courseFormData.category}
                    onChange={handleCourseInputChange}
                    className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 placeholder-slate-500 bg-white/5"
                    placeholder="e.g., Web Development"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={courseFormData.duration}
                    onChange={handleCourseInputChange}
                    className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 placeholder-slate-500 bg-white/5"
                    placeholder="e.g., 8 weeks"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={courseFormData.price}
                    onChange={handleCourseInputChange}
                    className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 placeholder-slate-500 bg-white/5"
                    placeholder="e.g., 499"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={courseFormData.thumbnail}
                    onChange={handleCourseInputChange}
                    className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 placeholder-slate-500 bg-white/5"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Course Content</label>
                <textarea
                  name="content"
                  value={courseFormData.content}
                  onChange={handleCourseInputChange}
                  className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 placeholder-slate-500 bg-white/5"
                  rows="5"
                  placeholder="Describe the course content"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition shadow-lg hover:shadow-xl"
              >
                Create Course
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Your Courses</h2>
            {courses.length === 0 ? (
              <div className="glass rounded-2xl p-6 text-center">
                <p className="text-slate-400">No courses yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => handleSelectCourse(course)}
                    className={`w-full text-left p-4 rounded-xl transition ${
                      selectedCourse?.id === course.id
                        ? 'glass-dark text-slate-100 shadow-lg'
                        : 'glass text-slate-100 hover:shadow-md'
                    }`}
                  >
                    <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {course.category}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sections and Lessons */}
          <div className="lg:col-span-2">
            {selectedCourse ? (
              <div className="space-y-8">
                {/* Sections */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-slate-100">Sections</h2>
                    <button
                      onClick={() => setShowSectionForm(!showSectionForm)}
                      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600 transition text-sm"
                    >
                      {showSectionForm ? '✕' : '+ Add Section'}
                    </button>
                  </div>

                  {showSectionForm && (
                    <form onSubmit={handleCreateSection} className="glass rounded-2xl p-6 mb-6">
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-slate-200 mb-2">Section Title</label>
                        <input
                          type="text"
                          name="title"
                          value={sectionFormData.title}
                          onChange={handleSectionInputChange}
                          className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5"
                          placeholder="e.g., Introduction"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600 transition"
                      >
                        Create Section
                      </button>
                    </form>
                  )}

                  {sections.length === 0 ? (
                    <div className="glass rounded-2xl p-6 text-center">
                      <p className="text-slate-400">No sections yet. Create one to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sections.map((section) => (
                        <div
                          key={section.id}
                          className={`p-4 rounded-xl transition cursor-pointer ${
                            selectedSection?.id === section.id
                              ? 'glass-dark border border-primary-400/30'
                              : 'glass border border-white/8 hover:border-primary-400/50'
                          }`}
                          onClick={() => handleSelectSection(section)}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-slate-100">{section.title}</h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteSection(section.id)
                              }}
                              className="text-red-600 hover:text-red-700 text-sm font-semibold"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Lessons */}
                {selectedSection && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-slate-100">Lessons in {selectedSection.title}</h2>
                      <button
                        onClick={() => setShowLessonForm(!showLessonForm)}
                        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600 transition text-sm"
                      >
                        {showLessonForm ? '✕' : '+ Add Lesson'}
                      </button>
                    </div>

                    {showLessonForm && (
                      <form onSubmit={handleCreateLesson} className="glass rounded-2xl p-6 mb-6">
                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-slate-200 mb-2">Lesson Title</label>
                          <input
                            type="text"
                            name="title"
                            value={lessonFormData.title}
                            onChange={handleLessonInputChange}
                            className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5"
                            placeholder="Enter lesson title"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-slate-200 mb-2">Description</label>
                          <textarea
                            name="description"
                            value={lessonFormData.description}
                            onChange={handleLessonInputChange}
                            className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5"
                            rows="3"
                            placeholder="Describe the lesson"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-slate-200 mb-2">YouTube URL</label>
                          <input
                            type="url"
                            name="youtubeUrl"
                            value={lessonFormData.youtubeUrl}
                            onChange={handleLessonInputChange}
                            className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5"
                            placeholder="https://www.youtube.com/watch?v=..."
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600 transition"
                        >
                          Create Lesson
                        </button>
                      </form>
                    )}

                    {lessons.length === 0 ? (
                      <div className="glass rounded-2xl p-6 text-center">
                        <p className="text-slate-400">No lessons yet. Create one to get started.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {lessons.map((lesson) => (
                          <div key={lesson.id} className="glass rounded-xl p-4 hover:shadow-md transition">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-100">{lesson.title}</h4>
                                <p className="text-sm text-slate-400 mt-1">{lesson.description}</p>
                                <p className="text-xs text-primary-400 mt-2">🎥 {lesson.youtubeUrl}</p>
                              </div>
                              <button
                                onClick={() => handleDeleteLesson(lesson.id)}
                                className="text-red-600 hover:text-red-700 text-sm font-semibold ml-4"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <p className="text-slate-400 text-lg">Select a course to manage sections and lessons</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
