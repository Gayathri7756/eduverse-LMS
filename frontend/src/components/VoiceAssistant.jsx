import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function VoiceAssistant() {
  const { user } = useAuth()
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const recognitionRef = useRef(null)
  const synthRef = useRef(window.speechSynthesis)

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setTranscript('')
      }

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            setTranscript(transcript)
            handleUserInput(transcript)
          } else {
            interimTranscript += transcript
          }
        }
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  // Handle user input and get AI response
  const handleUserInput = async (userMessage) => {
    if (!userMessage.trim()) return

    // Add user message to chat
    setMessages((prev) => [...prev, { type: 'user', text: userMessage }])
    setIsThinking(true)

    try {
      // Get AI response from backend
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          courseTitle: 'EduVerse',
          userId: user?.uid || null,
        }),
      })

      const data = await res.json()
      const aiResponse = data.response || 'I did not understand that. Please try again.'

      // Add AI response to chat
      setMessages((prev) => [...prev, { type: 'assistant', text: aiResponse }])
      setResponse(aiResponse)

      // Speak the response
      speakResponse(aiResponse)
    } catch (error) {
      console.error('Error getting AI response:', error)
      const errorMsg = 'Sorry, I encountered an error. Please try again.'
      setMessages((prev) => [...prev, { type: 'assistant', text: errorMsg }])
      speakResponse(errorMsg)
    } finally {
      setIsThinking(false)
    }
  }

  // Text-to-Speech function
  const speakResponse = (text) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    synthRef.current.speak(utterance)
  }

  // Start listening
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
    }
  }

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  // Clear chat
  const clearChat = () => {
    setMessages([])
    setTranscript('')
    setResponse('')
    setInput('')
    stopSpeaking()
  }

  const onSubmitText = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')
    handleUserInput(text)
  }

  return (
    <div className="glass-panel p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🎤</div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">AI Voice Assistant</h2>
            <p className="text-sm text-primary-400">Speak to communicate with your AI tutor</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-primary-400 hover:text-slate-100 transition"
          title="Clear chat"
        >
          ✕
        </button>
      </div>

      {/* Chat Messages */}
      <div className="glass rounded-xl p-4 mb-4 h-64 overflow-y-auto border border-white/25 bg-white/10">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-primary-400 text-lg mb-2">👋 Hello! I'm your AI Assistant</p>
              <p className="text-primary-300 text-sm">Type a question or use the microphone</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none'
                      : 'glass-secondary text-slate-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-xs px-4 py-2 rounded-lg glass-secondary text-slate-100 rounded-bl-none">
                  <p className="text-sm">Thinking…</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Text Input */}
      <form onSubmit={onSubmitText} className="flex gap-3 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask: explain closures in JavaScript, quiz help, assignment guidance…"
          className="flex-1 px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition text-slate-100 placeholder-slate-500 bg-white/20 border border-white/25"
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Send
        </button>
      </form>

      {/* Status Display */}
      {(isListening || isSpeaking || transcript) && (
        <div className="glass rounded-lg p-4 mb-6 border border-white/25 bg-white/10">
          {isListening && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-slate-100 font-semibold">Listening...</p>
            </div>
          )}
          {isSpeaking && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-slate-100 font-semibold">Speaking...</p>
            </div>
          )}
          {transcript && (
            <div>
              <p className="text-sm text-primary-400 mb-1">You said:</p>
              <p className="text-slate-100 font-medium italic">"{transcript}"</p>
            </div>
          )}
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={startListening}
          disabled={isListening || isSpeaking}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <span>🎤</span>
          Start Listening
        </button>

        <button
          onClick={stopListening}
          disabled={!isListening}
          className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <span>⏹️</span>
          Stop Listening
        </button>

        <button
          onClick={stopSpeaking}
          disabled={!isSpeaking}
          className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <span>🔇</span>
          Stop Speaking
        </button>
      </div>

      {/* Browser Support Warning */}
      {!recognitionRef.current && (
        <div className="mt-6 bg-yellow-100 border border-yellow-300 rounded-lg p-4">
          <p className="text-yellow-900 text-sm">
            ⚠️ Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
          </p>
        </div>
      )}
    </div>
  )
}
