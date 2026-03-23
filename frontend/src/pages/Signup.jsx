import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, auth } from '../firebase'
import { getIdToken } from 'firebase/auth'
import axios from 'axios'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidPassword = (password) => password.length >= 8

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!name.trim()) { setError('Please enter your full name'); setLoading(false); return }
    if (!isValidEmail(email)) { setError('Please enter a valid email address'); setLoading(false); return }
    if (!isValidPassword(password)) { setError('Password must be at least 8 characters'); setLoading(false); return }
    if (password !== confirmPassword) { setError('Passwords do not match'); setLoading(false); return }

    try {
      const userCredential = await createUserWithEmailAndPassword(email, password)
      const user = userCredential.user
      const uid = user.uid
      const token = await getIdToken(user)
      localStorage.setItem(`token_${uid}`, token)
      localStorage.setItem(`role_${uid}`, role)

      try {
        await axios.post('/api/users', { uid, email, name, role, password: btoa(password) })
      } catch (err) {
        console.warn('Backend user creation failed:', err.message)
      }
      navigate('/')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please login.')
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.')
      } else {
        setError(err.message || 'Signup failed')
      }
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 text-sm transition focus:border-primary-500/60 focus:bg-white/8"

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl border border-white/10 p-8 shadow-2xl shadow-black/50">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/30">
              <span className="text-white font-bold text-base">E</span>
            </div>
            <span className="text-lg font-bold text-slate-100">EduVerse</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-100 mb-1 tracking-tight">Create your account</h2>
          <p className="text-slate-400 text-sm mb-6">Start learning for free today</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-3 rounded-xl mb-5 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className={inputClass} placeholder="John Doe" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className={inputClass} placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className={inputClass} placeholder="Minimum 8 characters" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass} placeholder="••••••••" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">I am a</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-800/80 border border-white/10 text-slate-200 text-sm transition focus:border-primary-500/60"
              >
                <option value="student" className="bg-slate-800">Student</option>
                <option value="instructor" className="bg-slate-800">Instructor</option>
              </select>
            </div>

            {/* Role toggle pills */}
            <div className="flex gap-3 pt-1">
              {['student', 'instructor'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition border ${
                    role === r
                      ? 'bg-primary-600/30 border-primary-500/50 text-primary-300'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  {r === 'student' ? '🎓 Student' : '👨‍🏫 Instructor'}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-3 rounded-xl hover:from-primary-500 hover:to-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-900/40 border border-primary-500/30 text-sm mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account →'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 font-semibold hover:text-primary-300 transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
