import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function AITutor({ courseTitle }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleAsk = async (e) => {
    e.preventDefault()
    if (!input.trim() || !user) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const token = localStorage.getItem(`token_${user.uid}`)
      const response = await axios.post(
        'http://localhost:5000/api/ai-tutor/ask',
        {
          courseTitle,
          question: userMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response.data.response },
      ])
    } catch (error) {
      console.error('Error getting AI response:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I could not generate a response. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-700">Please log in to use the AI Tutor</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">AI Tutor</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p className="text-sm">Ask me anything about {courseTitle}</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleAsk} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={loading}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
