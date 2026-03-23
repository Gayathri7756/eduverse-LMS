import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function CertificateDisplay({ courseId, courseName }) {
  const { user } = useAuth()
  const [certificate, setCertificate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchCertificate()
  }, [courseId])

  const fetchCertificate = async () => {
    if (!user) return
    try {
      setLoading(true)
      const token = localStorage.getItem(`token_${user.uid}`)
      const response = await axios.get(
        'http://localhost:5000/api/certificates/user',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // Find certificate for this course
      const courseCert = response.data.find(c => c.courseId === courseId)
      if (courseCert) {
        setCertificate(courseCert)
      }
    } catch (err) {
      console.error('Failed to fetch certificate:', err)
      setError('Failed to load certificate')
    } finally {
      setLoading(false)
    }
  }

  const downloadCertificate = async () => {
    if (!user) return
    try {
      const token = localStorage.getItem(`token_${user.uid}`)
      const response = await axios.get(
        `http://localhost:5000/api/certificates/${certificate.id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // In production, this would trigger a PDF download
      // For now, we'll show the certificate data
      console.log('Certificate ready for download:', response.data)
      alert('Certificate downloaded successfully!')
    } catch (err) {
      console.error('Failed to download certificate:', err)
      alert('Failed to download certificate')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Loading certificate...</p>
      </div>
    )
  }

  if (!certificate) {
    return null
  }

  return (
    <>
      {/* Certificate Badge */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏆</span>
            <div>
              <h3 className="font-bold text-gray-900">Certificate Earned!</h3>
              <p className="text-sm text-gray-600">
                Completed on {new Date(certificate.issueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            View Certificate
          </button>
        </div>
      </div>

      {/* Certificate Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Certificate Content */}
            <div className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-96 flex flex-col items-center justify-center relative border-8 border-indigo-600">
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-indigo-600"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-indigo-600"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-indigo-600"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-indigo-600"></div>

              {/* Certificate Body */}
              <div className="text-center z-10">
                <div className="text-5xl mb-4">🏆</div>
                <h1 className="text-4xl font-bold text-indigo-900 mb-2">Certificate of Completion</h1>
                <p className="text-indigo-600 text-lg mb-6">This is to certify that</p>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-600 pb-4">
                  {certificate.studentName}
                </h2>

                <p className="text-gray-700 mb-2">has successfully completed the course</p>
                <h3 className="text-2xl font-bold text-indigo-900 mb-6">{certificate.courseName}</h3>

                <div className="grid grid-cols-2 gap-8 mt-8 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Completion Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(certificate.completionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Certificate Number</p>
                    <p className="font-semibold text-gray-900">{certificate.certificateNumber}</p>
                  </div>
                </div>

                <p className="text-gray-600 mt-8 text-sm italic">
                  Issued by {certificate.instructorName}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 border-t flex gap-3">
              <button
                onClick={downloadCertificate}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                📥 Download Certificate
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
