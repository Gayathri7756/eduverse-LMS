import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function StudyPlanner() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState('goal') // goal, time, duration, generating, result
  const [selectedGoal, setSelectedGoal] = useState('')
  const [studyTime, setStudyTime] = useState('2')
  const [goalDuration, setGoalDuration] = useState('3')
  const [studyPlan, setStudyPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const goals = [
    'Machine Learning',
    'Web Development',
    'Python Programming',
    'Data Science',
    'React.js',
    'Node.js',
    'Cloud Computing',
    'Mobile Development',
    'UI/UX Design',
    'Digital Marketing'
  ]

  const handleGeneratePlan = async () => {
    if (!selectedGoal) {
      setError('Please select a learning goal')
      return
    }

    setLoading(true)
    setError(null)
    setStep('generating')

    try {
      console.log('Generating plan with:', {
        goal: selectedGoal,
        studyHoursPerDay: parseInt(studyTime),
        goalDurationMonths: parseInt(goalDuration),
        userId: user?.uid
      })

      const response = await axios.post(
        'http://localhost:5000/api/ai/study-plan',
        {
          goal: selectedGoal,
          studyHoursPerDay: parseInt(studyTime),
          goalDurationMonths: parseInt(goalDuration),
          userId: user?.uid
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem(`token_${user?.uid}`)}`
          }
        }
      )

      console.log('Plan generated:', response.data)
      console.log('Weekly plan:', response.data.plan.weeklyPlan)
      console.log('First week topics:', response.data.plan.weeklyPlan[0].topics)
      setStudyPlan(response.data.plan)
      setStep('result')
    } catch (err) {
      console.error('Error generating plan:', err)
      setError(err.response?.data?.error || err.message || 'Failed to generate study plan')
      setStep('duration')
    } finally {
      setLoading(false)
    }
  }



  const handleCopyToText = () => {
    if (!studyPlan) return

    let text = `STUDY PLAN: ${selectedGoal}\n`
    text += `Study Time: ${studyTime} hours/day\n`
    text += `Duration: ${goalDuration} months\n`
    text += `\n${'='.repeat(60)}\n\n`

    studyPlan.weeklyPlan.forEach((week) => {
      text += `${week.week}\n`
      text += `${'-'.repeat(40)}\n`
      
      if (week.topics) {
        text += `Topics:\n`
        week.topics.forEach((topic) => {
          text += `  • ${topic.title}\n`
          text += `    ${topic.description}\n`
        })
      }

      if (week.practiceTask) {
        text += `\nPractice Task:\n  ${week.practiceTask}\n`
      }

      if (week.youtubeTopics) {
        text += `\nRecommended Videos:\n`
        week.youtubeTopics.forEach((yt) => {
          text += `  • ${yt}\n`
        })
      }

      text += `\n`
    })

    if (studyPlan.summary) {
      text += `\nSummary:\n${studyPlan.summary}\n`
    }

    navigator.clipboard.writeText(text)
    alert('Study plan copied to clipboard!')
  }

  const handleDownloadPDF = async () => {
    try {
      // Dynamically import jspdf and html2canvas
      const { jsPDF } = await import('jspdf')
      const html2canvas = (await import('html2canvas')).default

      const element = document.getElementById('study-plan-content')
      const canvas = await html2canvas(element, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= 297

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= 297
      }

      pdf.save(`study-plan-${selectedGoal.replace(/\s+/g, '-').toLowerCase()}.pdf`)
    } catch (err) {
      console.error('Error downloading PDF:', err)
      setError('Failed to download PDF. Please install required packages.')
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 relative z-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">🎯 AI Study Planner</h1>
          <p className="text-xl text-slate-400">Create a personalized learning roadmap powered by AI</p>
        </div>

        {/* Step 1: Select Goal */}
        {step === 'goal' && (
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">What do you want to learn?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setSelectedGoal(goal)}
                  className={`p-4 rounded-xl font-semibold transition transform hover:scale-105 ${
                    selectedGoal === goal
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'glass text-slate-100 hover:bg-white/10'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('time')}
              disabled={!selectedGoal}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Study Time */}
        {step === 'time' && (
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">How much time can you study daily?</h2>
            <div className="space-y-4 mb-8">
              {['1', '2', '3'].map((hours) => (
                <button
                  key={hours}
                  onClick={() => setStudyTime(hours)}
                  className={`w-full p-4 rounded-xl font-semibold transition ${
                    studyTime === hours
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'glass text-slate-100 hover:bg-white/10'
                  }`}
                >
                  {hours} hour{hours !== '1' ? 's' : ''} per day
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep('goal')}
                className="flex-1 glass text-slate-100 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep('duration')}
                className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Goal Duration */}
        {step === 'duration' && (
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">What's your goal duration?</h2>
            <div className="space-y-4 mb-8">
              {['1', '3', '6'].map((months) => (
                <button
                  key={months}
                  onClick={() => setGoalDuration(months)}
                  className={`w-full p-4 rounded-xl font-semibold transition ${
                    goalDuration === months
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'glass text-slate-100 hover:bg-white/10'
                  }`}
                >
                  {months} month{months !== '1' ? 's' : ''}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep('time')}
                className="flex-1 glass text-slate-100 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
              >
                Back
              </button>
              <button
                onClick={handleGeneratePlan}
                className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition"
              >
                Generate Plan
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Generating */}
        {step === 'generating' && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-6"></div>
            <p className="text-xl text-slate-100 font-semibold">Creating your personalized study plan...</p>
            <p className="text-sm text-slate-400 mt-2">This may take a few seconds</p>
          </div>
        )}

        {/* Step 5: Result */}
        {step === 'result' && studyPlan && (
          <div className="glass rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-slate-100 mb-2">Your Study Plan</h2>
            <p className="text-slate-400 mb-8">
              {selectedGoal} • {studyTime} hours/day • {goalDuration} months
            </p>

            {error && (
              <div className="glass-dark border-red-400/30 rounded-xl p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Timeline */}
            <div id="study-plan-content" className="space-y-6 mb-8">
              {studyPlan.weeklyPlan && studyPlan.weeklyPlan.map((week, idx) => (
                <div key={idx} className="glass-secondary rounded-xl p-6 border-l-4 border-primary-500">
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{week.week}</h3>
                  <div className="space-y-2">
                    {week.topics && week.topics.map((topic, topicIdx) => (
                      <div key={topicIdx} className="flex items-start gap-3">
                        <span className="text-primary-400 font-bold mt-1">•</span>
                        <div>
                          <p className="font-semibold text-slate-100">{topic.title}</p>
                          <p className="text-sm text-slate-400">{topic.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {week.practiceTask && (
                    <div className="mt-4 glass rounded-lg p-4">
                      <p className="text-sm font-semibold text-slate-100">📝 Practice Task:</p>
                      <p className="text-sm text-slate-400">{week.practiceTask}</p>
                    </div>
                  )}
                  {week.youtubeTopics && (
                    <div className="mt-4 glass rounded-lg p-4">
                      <p className="text-sm font-semibold text-slate-100">🎥 Recommended Videos:</p>
                      <ul className="text-sm text-slate-400 mt-2 space-y-1">
                        {week.youtubeTopics.map((yt, ytIdx) => (
                          <li key={ytIdx}>• {yt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary */}
            {studyPlan.summary && (
              <div className="glass rounded-xl p-6 mb-8 border-l-4 border-secondary-500">
                <h3 className="font-bold text-slate-100 mb-3">📊 Plan Summary</h3>
                <p className="text-slate-400">{studyPlan.summary}</p>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => setStep('duration')}
                className="glass text-slate-100 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
              >
                New Plan
              </button>
              <button
                onClick={handleCopyToText}
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition"
              >
                📋 Copy Text
              </button>
              <button
                onClick={handleDownloadPDF}
                className="bg-secondary-600 text-white py-3 rounded-xl font-semibold hover:bg-secondary-700 transition"
              >
                📄 Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
