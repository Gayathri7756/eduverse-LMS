import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CourseCard({ course }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      to={`/course/${course.id}`}
      className="group glass rounded-2xl border border-white/8 overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-primary-500/40 hover:shadow-2xl hover:shadow-primary-900/30 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="h-44 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-surface-800 to-surface-900">
        {course.thumbnail && !imageError ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : null}

        {/* Fallback gradient */}
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800/60 via-surface-800 to-secondary-900/60 flex items-center justify-center">
            <span className="text-5xl opacity-60">📚</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="badge-indigo">
            {course.category || 'General'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-slate-100 mb-2 group-hover:text-primary-300 transition line-clamp-2 leading-snug">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 mb-4 line-clamp-2 text-xs flex-1 leading-relaxed">
          {course.description}
        </p>

        {/* Instructor */}
        <p className="text-xs text-slate-500 mb-3">
          By <span className="text-slate-300 font-semibold">{course.instructorName || 'Instructor'}</span>
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/8">
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-400 text-xs">⭐</span>
            <span className="text-xs text-slate-400">{course.studentCount || 0} students</span>
          </div>
          <span className="text-sm font-bold text-accent-400">
            {course.price ? `₹${course.price}` : 'Free'}
          </span>
        </div>

        {/* CTA Button */}
        <button className="mt-4 w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2.5 rounded-xl text-sm font-semibold hover:from-primary-500 hover:to-primary-600 transition shadow-lg shadow-primary-900/30 border border-primary-500/25">
          View Course
        </button>
      </div>
    </Link>
  )
}
