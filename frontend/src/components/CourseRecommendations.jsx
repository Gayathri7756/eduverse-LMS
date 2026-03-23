import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CourseRecommendations({ courseTitle, category, allCourses = [] }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!user) {
          // If not logged in, show random courses from same category
          const sameCategoryCourses = allCourses.filter(
            (c) => c.category === category && c.title !== courseTitle
          )
          setRecommendations(sameCategoryCourses.slice(0, 4))
          setLoading(false)
          return
        }

        const token = localStorage.getItem(`token_${user.uid}`)
        const response = await axios.post(
          'http://localhost:5000/api/ai-tutor/recommendations',
          {
            courseTitle,
            category,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        // Match recommendations with actual courses
        const recommendedTitles = response.data.recommendations || []
        const matchedCourses = allCourses.filter((course) =>
          recommendedTitles.some(
            (rec) =>
              course.title.toLowerCase().includes(rec.toLowerCase()) ||
              rec.toLowerCase().includes(course.title.toLowerCase())
          )
        )

        // If not enough matches, add courses from same category
        if (matchedCourses.length < 4) {
          const sameCategoryCourses = allCourses.filter(
            (c) => c.category === category && !matchedCourses.includes(c)
          )
          matchedCourses.push(...sameCategoryCourses)
        }

        setRecommendations(matchedCourses.slice(0, 4))
      } catch (err) {
        console.error('Error fetching recommendations:', err)
        // Fallback to same category courses
        const sameCategoryCourses = allCourses.filter(
          (c) => c.category === category && c.title !== courseTitle
        )
        setRecommendations(sameCategoryCourses.slice(0, 4))
      } finally {
        setLoading(false)
      }
    }

    if (courseTitle && category) {
      fetchRecommendations()
    }
  }, [courseTitle, category, user, allCourses])

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Recommended For You</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)}
            className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
          >
            <div className="aspect-video bg-gray-200 overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2">{course.title}</h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">₹{course.price}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {course.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
