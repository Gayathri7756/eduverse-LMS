import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import { getCourses } from '../api/apiService'

function CourseCatalog() {
  const [searchParams] = useSearchParams()
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getCourses()
        console.log('Courses fetched:', data)
        setCourses(data)
        setFilteredCourses(data)
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError('Failed to load courses. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  useEffect(() => {
    let filtered = courses

    if (search) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(search.toLowerCase()) ||
          course.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category) {
      filtered = filtered.filter((course) => course.category === category)
    }

    setFilteredCourses(filtered)
  }, [search, category, courses])

  const categories = [...new Set(courses.map((c) => c.category))].sort()

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Explore Courses</h1>
          <p className="text-xl text-slate-400">Find the perfect course to advance your skills</p>
        </div>

        {/* Filters */}
        <div className="glass-panel p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">Search Courses</label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 placeholder-slate-500 bg-white/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 bg-white/40"
              >
                <option value="" className="bg-neutral-100 text-slate-100">All Categories ({courses.length})</option>
                {categories.map((cat) => {
                  const count = courses.filter(c => c.category === cat).length
                  return (
                    <option key={cat} value={cat} className="bg-neutral-100 text-slate-100">
                      {cat} ({count})
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          {(search || category) && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
              <button
                onClick={() => {
                  setSearch('')
                  setCategory('')
                }}
                className="text-sm text-primary-400 hover:text-slate-400 font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p className="text-slate-400 mt-4">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="glass-dark rounded-2xl p-6 text-center">
            <p className="text-red-700 font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-lg hover:from-primary-500 hover:to-primary-600 transition"
            >
              Try Again
            </button>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No courses found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseCatalog

