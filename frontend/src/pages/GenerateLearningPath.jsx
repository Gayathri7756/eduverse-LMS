import { useState } from 'react'
import axios from 'axios'

export default function GenerateLearningPath() {
  const [syllabus, setSyllabus] = useState('')
  const [loading, setLoading] = useState(false)
  const [learningPath, setLearningPath] = useState(null)
  const [error, setError] = useState(null)
  const [expandedModule, setExpandedModule] = useState(null)
  const [expandedConcept, setExpandedConcept] = useState(null)

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!syllabus.trim()) return

    try {
      setLoading(true)
      setError(null)

      const response = await axios.post(
        'http://localhost:5000/api/ai-tutor/learning-path',
        { syllabus: syllabus.trim() }
      )
      
      console.log('Response:', response.data)
      const path = response.data.learningPath || []
      setLearningPath(path)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-100 mb-2">Learning Path Generator</h1>
        <p className="text-slate-400 mb-8">Create a personalized learning path based on your topics</p>

        {!learningPath ? (
          <div className="glass rounded-2xl p-8">
            <form onSubmit={handleGenerate}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  Enter Topics
                </label>
                <textarea
                  value={syllabus}
                  onChange={(e) => setSyllabus(e.target.value)}
                  placeholder="Example: Python, Java, Web Development"
                  className="w-full h-40 px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 placeholder-slate-500 bg-white/40 resize-none"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-100/40 backdrop-blur border border-red-300/30 text-red-800 px-4 py-3 rounded-xl mb-6 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !syllabus.trim()}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-3 rounded-xl hover:from-primary-500 hover:to-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? 'Generating...' : 'Generate Learning Path'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                setLearningPath(null)
                setSyllabus('')
                setExpandedModule(null)
                setExpandedConcept(null)
              }}
              className="mb-8 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition"
            >
              ← Generate Another
            </button>

            {learningPath.map((item, idx) => (
              <div key={idx} className="mb-8">
                <h2 className="text-3xl font-bold text-slate-100 mb-6">{item.courseTitle}</h2>

                {item.modules && item.modules.map((mod, modIdx) => (
                  <div key={modIdx} className="mb-4">
                    {/* Module Header */}
                    <div
                      onClick={() => setExpandedModule(expandedModule === `${idx}-${modIdx}` ? null : `${idx}-${modIdx}`)}
                      className="glass rounded-xl p-4 cursor-pointer hover:shadow-lg transition border-l-4 border-primary-500 flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-100 mb-1">{mod.name}</h3>
                        <p className="text-slate-400 text-sm">{mod.summary}</p>
                      </div>
                      <span className="text-2xl text-primary-400 ml-4">
                        {expandedModule === `${idx}-${modIdx}` ? '▲' : '▼'}
                      </span>
                    </div>

                    {/* Expanded Content */}
                    {expandedModule === `${idx}-${modIdx}` && (
                      <div className="glass-secondary rounded-xl p-6 mt-3">
                        <p className="text-slate-400 mb-6 leading-relaxed">{mod.studyMaterial}</p>

                        {/* Concepts */}
                        {mod.keyPoints && mod.keyPoints.length > 0 && (
                          <div>
                            <h4 className="text-lg font-bold text-slate-100 mb-4">Related Concepts:</h4>

                            {mod.keyPoints.map((concept, conceptIdx) => {
                              const conceptKey = `${idx}-${modIdx}-${conceptIdx}`
                              const isExpanded = expandedConcept === conceptKey
                              const conceptTitle = typeof concept === 'string' ? concept : concept.title
                              const conceptData = typeof concept === 'object' ? concept : null

                              return (
                                <div key={conceptIdx} className="mb-3">
                                  {/* Concept Header */}
                                  <div
                                    onClick={() => setExpandedConcept(isExpanded ? null : conceptKey)}
                                    className="glass rounded-lg p-3 cursor-pointer hover:bg-white/5 transition border-l-4 border-secondary-500 flex justify-between items-center"
                                  >
                                    <span className="font-semibold text-slate-100">✓ {conceptTitle}</span>
                                    <span className="text-secondary-600">{isExpanded ? '▲' : '▼'}</span>
                                  </div>

                                  {/* Concept Details */}
                                  {isExpanded && conceptData && (
                                    <div className="glass rounded-lg p-4 mt-2">
                                      <div className="mb-4">
                                        <h5 className="text-sm font-bold text-slate-100 mb-2">📚 Tutor Explanation:</h5>
                                        <p className="text-slate-400 text-sm leading-relaxed">{conceptData.tutorExplanation}</p>
                                      </div>

                                      {conceptData.videoUrl && (
                                        <div>
                                          <h5 className="text-sm font-bold text-slate-100 mb-2">🎥 Learn More:</h5>
                                          <a
                                            href={conceptData.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-primary-500 hover:to-primary-600 transition"
                                          >
                                            ▶ {conceptData.videoTitle}
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
