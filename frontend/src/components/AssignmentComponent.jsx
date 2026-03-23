import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AssignmentComponent({ courseId, user }) {
  const [assignments, setAssignments] = useState([])
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [submissionText, setSubmissionText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submission, setSubmission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [assignmentSubmissions, setAssignmentSubmissions] = useState({}) // Store submissions for each assignment

  useEffect(() => {
    fetchAssignments()
  }, [courseId])

  const fetchAssignments = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5000/api/assignments/course/${courseId}`)
      setAssignments(response.data)
      
      // Fetch submissions for each assignment
      if (user?.uid) {
        const token = localStorage.getItem(`token_${user.uid}`)
        const submissionsMap = {}
        
        for (const assignment of response.data) {
          try {
            const submissionRes = await axios.get(
              `http://localhost:5000/api/assignments/${assignment.id}/submission`,
              { headers: { Authorization: `Bearer ${token}` } }
            )
            if (submissionRes.data.submitted) {
              submissionsMap[assignment.id] = submissionRes.data
            }
          } catch (err) {
            console.warn(`Failed to fetch submission for assignment ${assignment.id}`)
          }
        }
        
        setAssignmentSubmissions(submissionsMap)
      }
    } catch (err) {
      setError('Failed to load assignments')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitAssignment = async () => {
    if (!submissionText.trim()) {
      setError('Please enter your submission')
      return
    }

    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      const response = await axios.post(
        `http://localhost:5000/api/assignments/${selectedAssignment.id}/submit`,
        { submissionText },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSubmission(response.data.submission)
      setSubmitted(true)
      setSubmissionText('')
      // Update assignment submissions
      setAssignmentSubmissions(prev => ({
        ...prev,
        [selectedAssignment.id]: response.data.submission
      }))
    } catch (err) {
      setError('Failed to submit assignment')
      console.error(err)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading assignments...</div>
  }

  if (assignments.length === 0) {
    return <div className="text-center py-8 text-gray-400">No assignments available for this course</div>
  }

  if (!selectedAssignment) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-6">📋 Assignments</h3>
        <div className="grid gap-4">
          {assignments.map((assignment) => {
            const dueDate = new Date(assignment.dueDate)
            const isOverdue = dueDate < new Date()
            const isSubmitted = assignmentSubmissions[assignment.id]?.submitted
            
            return (
              <div
                key={assignment.id}
                className={`rounded-lg border p-6 transition cursor-pointer ${
                  isSubmitted
                    ? 'bg-green-900 bg-opacity-20 border-green-600'
                    : 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                }`}
                onClick={() => {
                  if (!isSubmitted) {
                    setSelectedAssignment(assignment)
                    setSubmitted(false)
                    setSubmission(null)
                    setSubmissionText('')
                  }
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white">{assignment.title}</h4>
                  {isOverdue && !isSubmitted && (
                    <span className="bg-red-900 bg-opacity-50 text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                      Overdue
                    </span>
                  )}
                  {isSubmitted && (
                    <span className="bg-green-900 bg-opacity-50 text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Submitted
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mb-3">{assignment.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Due: {dueDate.toLocaleDateString()}
                  </span>
                  {!isSubmitted && (
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                      View Assignment
                    </button>
                  )}
                  {isSubmitted && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-default">
                      ✓ Submitted
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (submitted && submission) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-700 rounded-lg border border-gray-600 p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-3xl font-bold text-white mb-2">Assignment Submitted!</h3>
          <p className="text-gray-300 mb-6">
            Your assignment has been submitted successfully. Your instructor will review it and provide feedback.
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6 text-left mb-6">
            <h4 className="font-semibold text-white mb-3">Submission Details</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-gray-300">Assignment:</span> <span className="text-gray-400">{selectedAssignment.title}</span></p>
              <p><span className="font-semibold text-gray-300">Submitted:</span> <span className="text-gray-400">{new Date(submission.submittedAt).toLocaleString()}</span></p>
              <p><span className="font-semibold text-gray-300">Status:</span> <span className="text-gray-400">{submission.status}</span></p>
            </div>
          </div>

          <div className="bg-indigo-900 bg-opacity-30 rounded-lg p-6 text-left mb-6">
            <h4 className="font-semibold text-white mb-3">Your Submission</h4>
            <p className="text-gray-300 whitespace-pre-wrap">{submission.submissionText}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedAssignment(null)
            setSubmitted(false)
            setSubmission(null)
          }}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Back to Assignments
        </button>
      </div>
    )
  }

  const dueDate = new Date(selectedAssignment.dueDate)
  const isOverdue = dueDate < new Date()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">{selectedAssignment.title}</h3>
        <button
          onClick={() => setSelectedAssignment(null)}
          className="text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="bg-red-900 bg-opacity-50 border border-red-600 text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-gray-700 rounded-lg border border-gray-600 p-6">
        <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
        <p className="text-gray-300 mb-6">{selectedAssignment.description}</p>

        <h4 className="text-lg font-semibold text-white mb-3">Instructions</h4>
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <p className="text-gray-300 whitespace-pre-wrap">{selectedAssignment.instructions}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-900 bg-opacity-30 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Due Date</p>
            <p className={`font-semibold ${isOverdue ? 'text-red-400' : 'text-white'}`}>
              {dueDate.toLocaleDateString()}
            </p>
          </div>
          <div className="bg-indigo-900 bg-opacity-30 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Max Score</p>
            <p className="font-semibold text-white">{selectedAssignment.maxScore} points</p>
          </div>
        </div>

        {isOverdue && (
          <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-4 mb-6">
            <p className="text-red-300 font-semibold">⚠️ This assignment is overdue</p>
          </div>
        )}
      </div>

      <div className="bg-gray-700 rounded-lg border border-gray-600 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Your Submission</h4>
        <textarea
          value={submissionText}
          onChange={(e) => setSubmissionText(e.target.value)}
          placeholder="Enter your assignment submission here..."
          className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
          rows="8"
        />
        <p className="text-sm text-gray-400 mt-2">
          {submissionText.length} characters
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setSelectedAssignment(null)}
          className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmitAssignment}
          disabled={!submissionText.trim()}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Assignment
        </button>
      </div>
    </div>
  )
}
