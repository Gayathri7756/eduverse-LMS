import { useState, useEffect } from 'react'
import axios from 'axios'

export default function QuizComponent({ courseId, user }) {
  const [quizzes, setQuizzes] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizResults, setQuizResults] = useState({}) // Store results for each quiz

  useEffect(() => {
    fetchQuizzes()
  }, [courseId])

  // Timer effect
  useEffect(() => {
    if (!quizStarted || !selectedQuiz || submitted) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up - auto submit
          handleSubmitQuiz()
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizStarted, selectedQuiz, submitted])

  const fetchQuizzes = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5000/api/quizzes/course/${courseId}`)
      setQuizzes(response.data)
      
      // Fetch results for each quiz
      if (user?.uid) {
        const token = localStorage.getItem(`token_${user.uid}`)
        const resultsMap = {}
        
        for (const quiz of response.data) {
          try {
            const resultRes = await axios.get(
              `http://localhost:5000/api/quizzes/${quiz.id}/result`,
              { headers: { Authorization: `Bearer ${token}` } }
            )
            if (resultRes.data.attempted) {
              resultsMap[quiz.id] = resultRes.data
            }
          } catch (err) {
            console.warn(`Failed to fetch result for quiz ${quiz.id}`)
          }
        }
        
        setQuizResults(resultsMap)
      }
    } catch (err) {
      setError('Failed to load quizzes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }))
  }

  const handleSubmitQuiz = async () => {
    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      const response = await axios.post(
        `http://localhost:5000/api/quizzes/${selectedQuiz.id}/submit`,
        { answers: Object.values(answers) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setResult(response.data)
      setSubmitted(true)
      // Update quiz results
      setQuizResults(prev => ({
        ...prev,
        [selectedQuiz.id]: response.data
      }))
    } catch (err) {
      setError('Failed to submit quiz')
      console.error(err)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading quizzes...</div>
  }

  if (quizzes.length === 0) {
    return <div className="text-center py-8 text-gray-400">No quizzes available for this course</div>
  }

  if (!selectedQuiz) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-6">📝 Quizzes</h3>
        <div className="grid gap-4">
          {quizzes.map((quiz) => {
            const isCompleted = quizResults[quiz.id]?.attempted
            const quizResult = quizResults[quiz.id]
            
            return (
              <div
                key={quiz.id}
                className={`rounded-lg border p-6 transition cursor-pointer ${
                  isCompleted
                    ? 'bg-green-900 bg-opacity-20 border-green-600'
                    : 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                }`}
                onClick={() => {
                  if (!isCompleted) {
                    setSelectedQuiz(quiz)
                    setAnswers({})
                    setSubmitted(false)
                    setResult(null)
                    setTimeRemaining(quiz.timeLimit * 60)
                    setQuizStarted(true)
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">{quiz.title}</h4>
                    <p className="text-gray-300 mb-3">{quiz.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{quiz.questions.length} questions</span>
                      {isCompleted && (
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${quizResult.passed ? 'text-green-400' : 'text-red-400'}`}>
                            {quizResult.passed ? '✓ Passed' : '✕ Failed'}
                          </span>
                          <span className="text-sm font-bold text-gray-300">{quizResult.score}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {!isCompleted && (
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition ml-4">
                      Start Quiz
                    </button>
                  )}
                  {isCompleted && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-default ml-4">
                      ✓ Completed
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

  if (submitted && result) {
    return (
      <div className="space-y-6">
        {/* Score Summary */}
        <div className="bg-gray-700 rounded-lg border border-gray-600 p-8 text-center">
          <div className={`text-6xl mb-4 ${result.passed ? '✅' : '❌'}`}></div>
          <h3 className="text-3xl font-bold text-white mb-2">
            {result.passed ? 'Quiz Passed!' : 'Quiz Failed'}
          </h3>
          <p className="text-5xl font-bold text-indigo-400 mb-4">{result.score}%</p>
          <p className="text-gray-300 mb-2">
            You got {result.correctAnswers} out of {result.totalQuestions} questions correct
          </p>
          <p className="text-sm text-gray-400">
            Score: {result.correctAnswers}/{result.totalQuestions}
          </p>
        </div>
        
        {/* Detailed Results */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-white">Review Your Answers</h4>
          {result.detailedResults.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border-2 transition ${
                item.isCorrect 
                  ? 'border-green-500 bg-green-900 bg-opacity-20' 
                  : 'border-red-500 bg-red-900 bg-opacity-20'
              }`}
            >
              {/* Question Header with Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="font-semibold text-white mb-1">
                    Question {index + 1}
                  </p>
                  <p className="text-gray-200">
                    {item.question}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {item.isCorrect ? (
                    <div className="flex items-center gap-2">
                      <span className="text-3xl text-green-400">✓</span>
                      <span className="text-sm font-bold text-green-400">Correct</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-3xl text-red-400">✕</span>
                      <span className="text-sm font-bold text-red-400">Wrong</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Your Answer */}
              <div className={`p-3 rounded-lg mb-3 border-l-4 ${
                item.isCorrect
                  ? 'bg-green-900 bg-opacity-30 border-green-500'
                  : 'bg-red-900 bg-opacity-30 border-red-500'
              }`}>
                <p className="text-xs font-semibold text-gray-300 mb-1">YOUR ANSWER:</p>
                <div className="flex items-center gap-2">
                  <span className={item.isCorrect ? 'text-green-400 text-lg' : 'text-red-400 text-lg'}>
                    {item.isCorrect ? '✓' : '✕'}
                  </span>
                  <p className={item.isCorrect ? 'text-green-300' : 'text-red-300'}>
                    {selectedQuiz.questions[index].options[item.userAnswer]}
                  </p>
                </div>
              </div>

              {/* Correct Answer (if wrong) */}
              {!item.isCorrect && (
                <div className="p-3 rounded-lg border-l-4 bg-green-900 bg-opacity-30 border-green-500">
                  <p className="text-xs font-semibold text-gray-300 mb-1">CORRECT ANSWER:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-lg">✓</span>
                    <p className="text-green-300">
                      {selectedQuiz.questions[index].options[item.correctAnswer]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setSelectedQuiz(null)
            setAnswers({})
            setSubmitted(false)
            setResult(null)
          }}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Back to Quizzes
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">{selectedQuiz.title}</h3>
        <div className="flex items-center gap-4">
          {/* Timer Display */}
          <div className={`px-4 py-2 rounded-lg font-bold text-lg ${
            timeRemaining <= 60 ? 'bg-red-900 text-red-300' : 'bg-indigo-900 text-indigo-300'
          }`}>
            ⏱️ {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
          </div>
          <button
            onClick={() => {
              setSelectedQuiz(null)
              setQuizStarted(false)
              setTimeRemaining(null)
            }}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {selectedQuiz.questions.map((question, qIndex) => (
          <div key={question.id} className="bg-gray-700 rounded-lg border border-gray-600 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              {qIndex + 1}. {question.text}
            </h4>
            <div className="space-y-3">
              {question.options.map((option, oIndex) => (
                <label
                  key={oIndex}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition ${
                    answers[qIndex] === oIndex 
                      ? 'border-blue-500 bg-blue-900 bg-opacity-20' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={oIndex}
                    checked={answers[qIndex] === oIndex}
                    onChange={() => handleAnswerChange(qIndex, oIndex)}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 text-gray-200">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            setSelectedQuiz(null)
            setQuizStarted(false)
            setTimeRemaining(null)
          }}
          className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmitQuiz}
          disabled={Object.keys(answers).length !== selectedQuiz.questions.length}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  )
}
