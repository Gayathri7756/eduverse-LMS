import { useState, useEffect } from 'react'
import axios from 'axios'

export default function EnrollmentModal({ course, user, onClose, onSuccess }) {
  const [step, setStep] = useState('check') // check, payment, processing, success, already-enrolled
  const [paymentMethod, setPaymentMethod] = useState('paytm')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)

  useEffect(() => {
    // Check if user is already enrolled
    checkEnrollment()
  }, [])

  const checkEnrollment = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem(`token_${user.uid}`)
      
      const response = await axios.get(
        `http://localhost:5000/api/enrollments/check/${course.id}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      )

      if (response.data.enrolled) {
        setIsAlreadyEnrolled(true)
        setStep('already-enrolled')
      } else {
        setStep('payment')
      }
    } catch (err) {
      console.error('Error checking enrollment:', err)
      // If check fails, allow enrollment attempt
      setStep('payment')
    } finally {
      setLoading(false)
    }
  }

  const validatePayment = () => {
    if (!paymentMethod) {
      setError('Please select a payment method')
      return false
    }
    return true
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!validatePayment()) {
      return
    }

    setLoading(true)
    setStep('processing')

    try {
      // Call auto-enrollment endpoint
      const token = localStorage.getItem(`token_${user.uid}`)
      
      console.log('Token:', token ? 'Found' : 'Not found')
      console.log('User UID:', user.uid)
      console.log('Course ID:', course.id)
      console.log('Payment Method:', paymentMethod)

      const response = await axios.post(
        'http://localhost:5000/api/enrollments/enroll-on-payment',
        {
          courseId: course.id,
          paymentMethod: paymentMethod,
          userId: user.uid
        },
        {
          headers: token ? {
            Authorization: `Bearer ${token}`
          } : {}
        }
      )

      console.log('Enrollment response:', response.data)

      if (response.data.success) {
        // Success - show success message
        setStep('success')
        setLoading(false)
        setTimeout(() => {
          onSuccess()
          onClose()
        }, 2000)
      } else {
        throw new Error(response.data.error || 'Enrollment failed')
      }
    } catch (err) {
      console.error('Enrollment error:', err)
      console.error('Error response:', err.response?.data)
      console.error('Error status:', err.response?.status)
      setError(err.response?.data?.error || err.message || 'Enrollment failed. Please try again.')
      setStep('payment')
      setLoading(false)
    }
  }

  const handleContinueLearning = () => {
    onSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-6 flex justify-between items-center sticky top-0">
          <h2 className="text-2xl font-bold">
            {step === 'check' && 'Checking Enrollment...'}
            {step === 'payment' && 'Select Payment Method'}
            {step === 'processing' && 'Processing Enrollment'}
            {step === 'already-enrolled' && 'Already Enrolled'}
          </h2>
          {step !== 'processing' && step !== 'check' && (
            <button
              onClick={onClose}
              className="text-2xl hover:opacity-80 transition"
            >
              ✕
            </button>
          )}
        </div>

        <div className="p-6">
          {/* Loading State */}
          {loading && step === 'check' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Checking your enrollment status...</p>
            </div>
          )}

          {/* Course Summary */}
          {step !== 'check' && (
            <div className="bg-indigo-50 rounded-lg p-4 mb-6 border border-indigo-200">
              <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Price:</span>
                <span className="text-2xl font-bold text-green-600">₹{course.price}</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}

          {/* Already Enrolled State */}
          {step === 'already-enrolled' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Already Enrolled!</h3>
              <p className="text-gray-600 mb-6">
                You're already enrolled in this course. Continue learning from where you left off.
              </p>
              <button
                onClick={handleContinueLearning}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Continue Learning
              </button>
            </div>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Select Payment Method *
                </label>
                <div className="space-y-3">
                  {[
                    { id: 'paytm', label: '🔵 Paytm', icon: '🔵' },
                    { id: 'phonepe', label: '🟣 PhonePe', icon: '🟣' },
                    { id: 'googlepay', label: '🔴 Google Pay', icon: '🔴' },
                    { id: 'creditcard', label: '💳 Credit Card', icon: '💳' }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition"
                      style={{
                        borderColor: paymentMethod === method.id ? '#4F46E5' : '#e5e7eb',
                        backgroundColor: paymentMethod === method.id ? '#EEF2FF' : 'white'
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-semibold text-gray-900">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mt-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Payment Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course Price:</span>
                    <span className="font-semibold">₹{course.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18%):</span>
                    <span className="font-semibold">₹{Math.round(course.price * 0.18)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 flex justify-between">
                    <span className="font-bold text-gray-900">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{Math.round(course.price * 1.18)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-indigo-50 rounded-lg p-3 text-xs text-gray-600 border border-indigo-200">
                <p>✓ Instant enrollment after payment</p>
                <p>✓ Access all course materials immediately</p>
                <p>✓ Money-back guarantee if not satisfied</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Pay ₹${Math.round(course.price * 1.18)}`}
              </button>
            </form>
          )}

          {/* Processing Step */}
          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold mb-2">Enrolling you in the course...</p>
              <p className="text-sm text-gray-500">Please wait, this may take a few moments</p>
              <p className="text-xs text-gray-400 mt-4">You'll be redirected to the course shortly</p>
            </div>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Successfully Enrolled!</h2>
              <p className="text-gray-600 mb-4">Course added to your learning dashboard</p>
              <p className="text-sm text-gray-500">Redirecting you to the course player...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
