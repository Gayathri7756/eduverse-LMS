import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

export default function GetUserID() {
  const [uid, setUid] = useState(null)
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Get current user from Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid)
        setEmail(user.email)
      } else {
        // Not logged in, redirect to login
        navigate('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uid)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="glass rounded-2xl p-8 max-w-md w-full border border-white/8">
          <p className="text-center text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="glass rounded-2xl p-8 max-w-md w-full border border-white/8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2 text-center">🔑 Your User ID</h1>
        <p className="text-center text-slate-400 mb-6 text-sm">Use this ID to complete courses and generate certificates</p>

        <div className="glass-secondary rounded-lg p-4 mb-6 border border-white/8">
          <p className="text-sm text-slate-200">
            ℹ️ This is your unique Firebase User ID. Copy it and use it in the certificate tool.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-200 mb-2">Email</label>
          <div className="glass rounded-lg p-3 border border-white/8">
            <p className="text-slate-100 font-mono text-sm break-all">{email}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-200 mb-2">Your User ID</label>
          <div className="glass rounded-lg p-3 mb-3 border border-white/8">
            <p className="text-slate-100 font-mono text-sm break-all">{uid}</p>
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-2 rounded-xl hover:from-primary-500 hover:to-primary-600 transition shadow-lg hover:shadow-xl"
          >
            {copied ? '✅ Copied!' : '📋 Copy to Clipboard'}
          </button>
        </div>

        <div className="glass-secondary rounded-lg p-4 mb-6 border border-white/8">
          <p className="text-sm text-slate-200">
            <strong>Next Step:</strong> Open <code className="bg-white/20 px-2 py-1 rounded text-slate-100">simple-complete-course.html</code> and paste this ID to complete a course!
          </p>
        </div>

        <button
          onClick={() => navigate('/my-learning')}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-2 rounded-xl hover:from-primary-500 hover:to-primary-600 transition shadow-lg hover:shadow-xl"
        >
          Go to My Learning
        </button>
      </div>
    </div>
  )
}
