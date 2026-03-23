import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function CertificatePage() {
  const { courseId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [certificate, setCertificate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchOrGenerateCertificate()
  }, [user, courseId])

  const fetchOrGenerateCertificate = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem(`token_${user.uid}`)

      // First, try to fetch existing certificate
      const certRes = await axios.get(
        'http://localhost:5000/api/certificates/user',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const existingCert = certRes.data.find(c => c.courseId === courseId)
      if (existingCert) {
        setCertificate(existingCert)
        setLoading(false)
        return
      }

      // If no certificate exists, generate one
      setGenerating(true)
      const generateRes = await axios.post(
        `http://localhost:5000/api/certificates/generate/${courseId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setCertificate(generateRes.data.certificate)
      setGenerating(false)
    } catch (err) {
      console.error('Error:', err)
      setError(err.response?.data?.error || 'Failed to generate certificate')
    } finally {
      setLoading(false)
    }
  }

  const downloadCertificate = async () => {
    try {
      const token = localStorage.getItem(`token_${user.uid}`)
      await axios.get(
        `http://localhost:5000/api/certificates/${certificate.id}/download`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Certificate downloaded successfully!')
    } catch (err) {
      console.error('Download error:', err)
      alert('Failed to download certificate')
    }
  }

  if (loading || generating) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-2 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-100 text-lg">
            {generating ? 'Generating your certificate...' : 'Loading certificate...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="glass rounded-lg p-8 max-w-md text-center border border-red-300/30">
          <p className="text-red-700 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate('/my-learning')}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-lg hover:from-primary-500 hover:to-primary-600 transition"
          >
            Back to My Learning
          </button>
        </div>
      </div>
    )
  }

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <p className="text-slate-100 text-lg">Certificate not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">🎓 Congratulations!</h1>
          <p className="text-slate-400 text-lg">You have successfully completed the course</p>
        </div>

        {/* Certificate Display */}
        <div className="glass rounded-2xl shadow-2xl p-12 border-8 border-primary-400/40 relative mb-8">
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary-600"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary-600"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary-600"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary-600"></div>

          {/* Certificate Content */}
          <div className="text-center">
            <div className="text-6xl mb-6">🏆</div>

            <h2 className="text-5xl font-bold text-slate-100 mb-4">
              Certificate of Completion
            </h2>

            <p className="text-slate-400 text-xl mb-8">This is to certify that</p>

            <div className="border-b-4 border-primary-600 pb-6 mb-8">
              <h3 className="text-4xl font-bold text-slate-100">
                {certificate.studentName}
              </h3>
            </div>

            <p className="text-slate-200 text-lg mb-2">
              has successfully completed the course
            </p>

            <h4 className="text-3xl font-bold text-slate-100 mb-12">
              {certificate.courseName}
            </h4>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div>
                <p className="text-slate-400 text-sm mb-2">Completion Date</p>
                <p className="text-lg font-semibold text-slate-100">
                  {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Certificate Number</p>
                <p className="text-lg font-semibold text-slate-100 font-mono">
                  {certificate.certificateNumber}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Issued By</p>
                <p className="text-lg font-semibold text-slate-100">
                  {certificate.instructorName}
                </p>
              </div>
            </div>

            <p className="text-slate-400 italic text-sm">
              EduVerse Learning Platform
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={downloadCertificate}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            📥 Download Certificate
          </button>
          <button
            onClick={() => navigate('/my-learning')}
            className="glass text-slate-100 px-6 py-3 rounded-xl font-semibold hover:shadow-md transition border border-white/8"
          >
            Back to My Learning
          </button>
          <button
            onClick={() => navigate('/courses')}
            className="glass text-slate-100 px-6 py-3 rounded-xl font-semibold hover:shadow-md transition border border-white/8"
          >
            Browse More Courses
          </button>
        </div>

        {/* Share Section */}
        <div className="mt-12 glass rounded-2xl p-6 text-center border border-white/8">
          <h3 className="text-slate-100 text-lg font-semibold mb-4">Share Your Achievement</h3>
          <p className="text-slate-400 mb-4">
            You've earned a certificate! Share it with your network.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="glass text-slate-100 px-4 py-2 rounded-lg hover:shadow-md transition border border-white/8 font-semibold">
              📘 Share on Facebook
            </button>
            <button className="glass text-slate-100 px-4 py-2 rounded-lg hover:shadow-md transition border border-white/8 font-semibold">
              𝕏 Share on Twitter
            </button>
            <button className="glass text-slate-100 px-4 py-2 rounded-lg hover:shadow-md transition border border-white/8 font-semibold">
              💼 Share on LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
