import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CourseCard from '../components/CourseCard'

export default function Landing() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get('http://localhost:5000/api/courses')
        setCourses(response.data.slice(0, 8))
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError('Failed to load courses. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-64 right-16 w-64 h-64 bg-secondary-600/15 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-96 h-56 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1500" />
      </div>

      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative z-10 pt-28 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 border border-primary-500/25 text-primary-400 text-sm font-medium">
            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
            World-class learning platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-slate-100">
            Learn Without{' '}
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Limits
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Access expert-led courses, AI-powered learning paths, and a live coding playground — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition shadow-xl shadow-primary-900/40 border border-primary-500/30 text-base"
            >
              Explore Courses →
            </Link>
            <Link
              to="/signup"
              className="glass text-slate-200 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition border border-white/12 text-base"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <section className="relative z-10 px-4 mb-16">
        <div className="max-w-4xl mx-auto glass rounded-2xl border border-white/8 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/8">
            <div className="pt-6 md:pt-0">
              <div className="text-4xl font-extrabold text-primary-400 mb-1">10K+</div>
              <p className="text-slate-400 text-sm font-medium">Active Students</p>
            </div>
            <div className="pt-6 md:pt-0">
              <div className="text-4xl font-extrabold text-secondary-400 mb-1">500+</div>
              <p className="text-slate-400 text-sm font-medium">Expert Instructors</p>
            </div>
            <div className="pt-6 md:pt-0">
              <div className="text-4xl font-extrabold text-accent-400 mb-1">1000+</div>
              <p className="text-slate-400 text-sm font-medium">Courses Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Courses ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3 tracking-tight">Featured Courses</h2>
          <p className="text-slate-400 text-lg">Start learning from our most popular courses</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-primary-500 border-t-transparent" />
            <p className="text-slate-400 mt-4 font-medium">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="glass rounded-2xl p-10 text-center border border-red-500/20">
            <p className="text-red-400 font-semibold text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl hover:from-primary-500 hover:to-primary-600 transition font-semibold shadow-lg"
            >
              Try Again
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center border border-white/8">
            <p className="text-slate-400 text-lg font-medium">No courses available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="relative z-10 px-4 py-16 mb-8">
        <div className="max-w-3xl mx-auto glass rounded-2xl border border-primary-500/20 p-12 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(244,63,94,0.07) 100%)' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100 tracking-tight">
            Ready to level up?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join thousands of students already learning on EduVerse.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 py-4 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition shadow-xl shadow-primary-900/40 border border-primary-500/30 text-base"
          >
            Sign Up — It's Free
          </Link>
        </div>
      </section>
    </div>
  )
}
