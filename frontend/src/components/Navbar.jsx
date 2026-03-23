import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuth } from '../context/AuthContext'
import NotificationCenter from './NotificationCenter'

export default function Navbar() {
  const { user, userRole } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="glass-dark sticky top-0 z-50 border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition">
              <span className="text-white font-bold text-base">E</span>
            </div>
            <span className="text-xl font-bold text-slate-100 tracking-tight">EduVerse</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-slate-400 hover:text-slate-100 font-medium transition text-sm">
              Courses
            </Link>
            <Link to="/generate-learning-path" className="text-slate-400 hover:text-slate-100 font-medium transition text-sm">
              🎯 Learning Path
            </Link>
            <Link to="/study-planner" className="text-slate-400 hover:text-slate-100 font-medium transition text-sm">
              📊 Study Planner
            </Link>
            <Link to="/playground" className="text-slate-400 hover:text-slate-100 font-medium transition text-sm">
              💻 Playground
            </Link>
            <Link to="/resume-builder" className="text-slate-400 hover:text-slate-100 font-medium transition text-sm">
              📄 Resume
            </Link>
            <Link to="/books" className="text-slate-400 hover:text-slate-100 font-medium transition text-sm">
              📚 Books
            </Link>

            {user ? (
              <>
                <NotificationCenter />
                {userRole === 'instructor' && (
                  <Link to="/instructor-dashboard" className="text-slate-400 hover:text-slate-100 font-medium transition text-sm">
                    Dashboard
                  </Link>
                )}
                {userRole === 'student' && (
                  <Link to="/student-dashboard" className="text-slate-400 hover:text-slate-100 font-medium transition text-sm">
                    📚 My Learning
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2 rounded-lg hover:from-primary-500 hover:to-primary-600 font-medium transition text-sm shadow-lg shadow-primary-900/40 border border-primary-500/30"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-400 hover:text-slate-100 font-medium transition text-sm">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2 rounded-lg hover:from-primary-500 hover:to-primary-600 font-medium transition text-sm shadow-lg shadow-primary-900/40 border border-primary-500/30"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-slate-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1 glass rounded-xl p-4 mt-2 mb-2">
            <Link to="/courses" className="block text-slate-400 hover:text-slate-100 py-2 px-3 rounded-lg hover:bg-white/5 transition text-sm">Courses</Link>
            <Link to="/generate-learning-path" className="block text-slate-400 hover:text-slate-100 py-2 px-3 rounded-lg hover:bg-white/5 transition text-sm">🎯 Learning Path</Link>
            <Link to="/study-planner" className="block text-slate-400 hover:text-slate-100 py-2 px-3 rounded-lg hover:bg-white/5 transition text-sm">📊 Study Planner</Link>
            <Link to="/playground" className="block text-slate-400 hover:text-slate-100 py-2 px-3 rounded-lg hover:bg-white/5 transition text-sm">💻 Playground</Link>
            <Link to="/resume-builder" className="block text-slate-400 hover:text-slate-100 py-2 px-3 rounded-lg hover:bg-white/5 transition text-sm">📄 Resume</Link>
            <Link to="/books" className="block text-slate-400 hover:text-slate-100 py-2 px-3 rounded-lg hover:bg-white/5 transition text-sm">📚 Books</Link>
            {user ? (
              <>
                {userRole === 'instructor' && (
                  <Link to="/instructor-dashboard" className="block text-slate-400 hover:text-slate-100 py-2 px-3 rounded-lg hover:bg-white/5 transition text-sm">Dashboard</Link>
                )}
                {userRole === 'student' && (
                  <Link to="/student-dashboard" className="block text-slate-400 hover:text-slate-100 py-2 px-3 rounded-lg hover:bg-white/5 transition text-sm">📚 My Learning</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg hover:from-primary-500 hover:to-primary-600 transition text-sm font-medium mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-slate-400 hover:text-slate-100 py-2 px-3 rounded-lg hover:bg-white/5 transition text-sm">Login</Link>
                <Link
                  to="/signup"
                  className="block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg hover:from-primary-500 hover:to-primary-600 transition text-sm font-medium mt-2"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
