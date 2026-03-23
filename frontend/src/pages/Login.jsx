import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword, auth } from '../firebase'
import { getIdToken } from 'firebase/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    if (!password) {
      setError('Please enter your password')
      setLoading(false)
      return
    }

    try {
      const userCredential = await signInWithEmailAndPassword(email, password)
      const user = userCredential.user
      const token = await getIdToken(user)
      localStorage.setItem(`token_${user.uid}`, token)
      navigate('/')
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email. Please sign up.')
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.')
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.')
      } else {
        setError(err.message || 'Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="glass rounded-2xl border border-white/10 p-8 shadow-2xl shadow-black/50">
          {/* Logo mark */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/30">
              <span className="text-white font-bold text-base">E</span>
            </div>
            <span className="text-lg font-bold text-slate-100">EduVerse</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-100 mb-1 tracking-tight">Welcome back</h2>
          <p className="text-slate-400 text-sm mb-6">Sign in to continue learning</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-3 rounded-xl mb-5 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 text-sm transition focus:border-primary-500/60 focus:bg-white/8"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 text-sm transition focus:border-primary-500/60 focus:bg-white/8"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-3 rounded-xl hover:from-primary-500 hover:to-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-900/40 border border-primary-500/30 text-sm"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-400 font-semibold hover:text-primary-300 transition">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
