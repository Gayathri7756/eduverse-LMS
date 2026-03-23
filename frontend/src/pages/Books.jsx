import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function Books() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  useEffect(() => {
    const fetch = async () => {
      if (!user?.uid) return
      try {
        setLoading(true)
        setError(null)
        const token = localStorage.getItem(`token_${user.uid}`)

        const enrollRes = await axios.get('http://localhost:5000/api/enrollments/my-courses', {
          headers: { Authorization: `Bearer ${token}` },
        })

        const enrolledCourses = Array.isArray(enrollRes.data) ? enrollRes.data : enrollRes.data.courses || []
        setCourses(enrolledCourses)
        setSelectedCourseId((prev) => prev || enrolledCourses[0]?.id || '')
      } catch (err) {
        console.error('Failed to load courses:', err)
        setError('Failed to load your courses')
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [user?.uid])

  useEffect(() => {
    const fetchCourse = async () => {
      if (!selectedCourseId) {
        setSelectedCourse(null)
        setSections([])
        return
      }
      try {
        setError(null)
        const courseRes = await axios.get(`http://localhost:5000/api/courses/${selectedCourseId}`)
        setSelectedCourse(courseRes.data)

        try {
          const contentRes = await axios.get(`http://localhost:5000/api/courses/${selectedCourseId}/content`)
          setSections(contentRes.data.sections || [])
        } catch (err) {
          console.warn('Failed to load course content:', err)
          setSections([])
        }
      } catch (err) {
        console.error('Failed to load course:', err)
        setError('Failed to load course materials')
      }
    }

    fetchCourse()
  }, [selectedCourseId])

  const notes = useMemo(() => {
    if (!selectedCourse) return ''

    const title = selectedCourse.title || 'Course'
    const summary = (selectedCourse.content || selectedCourse.description || '').trim()

    const lines = []
    lines.push(`# ${title} — Study Notes`)
    lines.push('')
    if (summary) {
      lines.push('## Overview')
      lines.push(summary)
      lines.push('')
    }

    if (sections.length > 0) {
      lines.push('## Contents')
      sections.forEach((s, idx) => {
        lines.push(`### ${idx + 1}. ${s.title || 'Section'}`)
        if (Array.isArray(s.lessons) && s.lessons.length > 0) {
          s.lessons.forEach((l, lidx) => {
            const t = l.title || `Lesson ${lidx + 1}`
            const d = (l.description || '').trim()
            lines.push(`- **${t}**${d ? `: ${d}` : ''}`)
          })
        } else {
          lines.push('- No lessons added yet.')
        }
        lines.push('')
      })

      lines.push('## Quick Revision')
      lines.push('- Review section summaries.')
      lines.push('- Rewatch key videos for difficult topics.')
      lines.push('- Practice with quizzes/assignments for retention.')
      lines.push('')
    }

    return lines.join('\n')
  }, [selectedCourse, sections])

  const downloadNotes = () => {
    const blob = new Blob([notes || ''], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(selectedCourse?.title || 'course').replace(/\s+/g, '_')}_notes.txt`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  if (!user) return null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your books...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-100">📚 Books</h1>
            <p className="text-slate-400 mt-2">Study materials and notes for your courses</p>
          </div>
          <button
            onClick={() => navigate('/my-learning')}
            className="glass px-5 py-2 rounded-xl font-semibold text-slate-100 hover:bg-white/20 transition border border-white/25"
          >
            Back to My Learning
          </button>
        </div>

        {error && (
          <div className="glass-panel p-4 mb-6 border border-red-300/30">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="glass-panel p-5">
              <label className="block text-sm font-semibold text-slate-200 mb-3">Select Course</label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 bg-white/20 border border-white/25"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id} className="bg-neutral-100 text-slate-100">
                    {c.title}
                  </option>
                ))}
              </select>

              <div className="mt-5 glass rounded-xl p-4 border border-white/25 bg-white/10">
                <p className="text-sm text-slate-400">
                  Open tasks from notifications:
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => selectedCourseId && navigate(`/course/${selectedCourseId}/player?focus=videos`)}
                    className="glass px-3 py-2 rounded-lg text-sm font-semibold text-slate-100 hover:bg-white/15 transition border border-white/25"
                  >
                    🎥 Videos
                  </button>
                  <button
                    onClick={() => selectedCourseId && navigate(`/course/${selectedCourseId}/player?focus=quizzes`)}
                    className="glass px-3 py-2 rounded-lg text-sm font-semibold text-slate-100 hover:bg-white/15 transition border border-white/25"
                  >
                    📝 Quizzes
                  </button>
                  <button
                    onClick={() => selectedCourseId && navigate(`/course/${selectedCourseId}/player?focus=assignments`)}
                    className="glass px-3 py-2 rounded-lg text-sm font-semibold text-slate-100 hover:bg-white/15 transition border border-white/25"
                  >
                    📋 Tasks
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-panel p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">{selectedCourse?.title || 'Notes'}</h2>
                  <p className="text-sm text-slate-400">Auto-generated from course content (you can download)</p>
                </div>
                <button
                  onClick={downloadNotes}
                  disabled={!notes}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  ⬇ Download Notes
                </button>
              </div>

              <div className="glass rounded-xl p-5 border border-white/25 bg-white/10">
                <pre className="whitespace-pre-wrap break-words text-sm text-slate-200 font-mono leading-relaxed">
                  {notes || 'No notes available.'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

