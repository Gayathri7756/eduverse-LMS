# EduVerse - Advanced Features Roadmap

## Current Status ✅

Your LMS now has:
- ✅ 15 sample courses across multiple categories
- ✅ Course catalog with search and filter
- ✅ Course detail pages
- ✅ YouTube video lessons
- ✅ Responsive design
- ✅ User authentication
- ✅ Course enrollment

## Phase 1: YouTube Auto-Fetch (RECOMMENDED FIRST)

### What It Does
When a user opens a course, automatically fetch relevant YouTube videos related to the course topic.

### Implementation Steps

#### 1. Get YouTube API Key
1. Go to: https://console.cloud.google.com
2. Create a new project
3. Enable YouTube Data API v3
4. Create API key
5. Add to `.env`:
```
YOUTUBE_API_KEY=your_api_key_here
```

#### 2. Create Backend Endpoint
**File:** `backend/src/routes/youtube.js`

```javascript
import express from 'express'
import axios from 'axios'

const router = express.Router()

router.post('/search-videos', async (req, res) => {
  try {
    const { query } = req.body
    const apiKey = process.env.YOUTUBE_API_KEY
    
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: `${query} tutorial`,
        part: 'snippet',
        type: 'video',
        maxResults: 6,
        key: apiKey,
      },
    })

    const videos = response.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelName: item.snippet.channelTitle,
    }))

    res.json(videos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
```

#### 3. Update Backend Index
Add to `backend/src/index.js`:
```javascript
import youtubeRouter from './routes/youtube.js'
app.use('/api/youtube', youtubeRouter)
```

#### 4. Create Frontend Component
**File:** `frontend/src/components/YouTubeLessons.jsx`

```javascript
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function YouTubeLessons({ courseTitle }) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/youtube/search-videos', {
          query: courseTitle,
        })
        setVideos(response.data)
        if (response.data.length > 0) {
          setSelectedVideo(response.data[0])
        }
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [courseTitle])

  if (loading) {
    return <div className="text-center py-8">Loading lessons...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Player */}
      <div className="lg:col-span-2">
        {selectedVideo && (
          <div>
            <iframe
              className="w-full h-[500px] rounded-lg"
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
              allowFullScreen
            />
            <h3 className="text-xl font-bold mt-4">{selectedVideo.title}</h3>
            <p className="text-gray-600">{selectedVideo.channelName}</p>
          </div>
        )}
      </div>

      {/* Video List */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold">Course Lessons</h3>
        {videos.map((video) => (
          <button
            key={video.videoId}
            onClick={() => setSelectedVideo(video)}
            className={`w-full text-left p-3 rounded-lg transition ${
              selectedVideo?.videoId === video.videoId
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-24 object-cover rounded mb-2"
            />
            <p className="text-sm font-semibold line-clamp-2">{video.title}</p>
            <p className="text-xs text-gray-600">{video.channelName}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
```

#### 5. Update Course Detail Page
Add to `frontend/src/pages/CourseDetail.jsx`:
```javascript
import YouTubeLessons from '../components/YouTubeLessons'

// Inside the component, add:
<YouTubeLessons courseTitle={course.title} />
```

---

## Phase 2: AI Tutor (MEDIUM COMPLEXITY)

### What It Does
Add a chatbot that answers questions about the course using Google Gemini API.

### Implementation Steps

#### 1. Get Gemini API Key
1. Go to: https://ai.google.dev
2. Create API key
3. Add to `.env`:
```
GEMINI_API_KEY=your_api_key_here
```

#### 2. Create Backend Endpoint
**File:** `backend/src/routes/ai.js`

```javascript
import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'

const router = express.Router()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

router.post('/tutor', async (req, res) => {
  try {
    const { courseTitle, question } = req.body
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = `You are an expert instructor teaching ${courseTitle}.
    Student question: ${question}
    Provide a clear, simple explanation with examples.`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    res.json({ answer: text })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
```

#### 3. Create Frontend Chat Component
**File:** `frontend/src/components/AITutor.jsx`

```javascript
import React, { useState } from 'react'
import axios from 'axios'

export default function AITutor({ courseTitle }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', text: input }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:5000/api/ai/tutor', {
        courseTitle,
        question: input,
      })

      const aiMessage = { role: 'ai', text: response.data.answer }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold mb-4">AI Tutor</h3>
      
      <div className="h-96 overflow-y-auto mb-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white ml-auto max-w-xs'
                : 'bg-gray-200 text-gray-900 max-w-xs'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-600">AI is thinking...</div>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}
```

---

## Phase 3: Quiz System (MEDIUM COMPLEXITY)

### What It Does
Add quizzes at the end of each section to test student knowledge.

### Implementation Steps

#### 1. Create Quiz Component
**File:** `frontend/src/components/Quiz.jsx`

```javascript
import React, { useState } from 'react'

export default function Quiz({ questions, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-2xl mb-6">
            You scored {score} out of {questions.length}
          </p>
          <button
            onClick={() => onComplete(score)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Continue
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-4">
            Question {currentQuestion + 1}/{questions.length}
          </h3>
          <p className="text-lg mb-6">{questions[currentQuestion].question}</p>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerClick(option.isCorrect)}
                className="w-full text-left p-4 border-2 rounded-lg hover:bg-blue-50 transition"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## Phase 4: Progress Tracking (EASY)

### What It Does
Track student progress through courses and lessons.

### Implementation Steps

#### 1. Update Student Dashboard
Add progress bars and completion tracking to show:
- Courses completed
- Lessons watched
- Quizzes passed
- Overall progress percentage

---

## Phase 5: Admin Dashboard (MEDIUM)

### What It Does
Allow admins to manage courses, users, and view analytics.

### Features:
- View all courses
- View all users
- View enrollments
- View platform statistics
- Delete courses
- Manage instructors

---

## Recommended Implementation Order

1. **Phase 1: YouTube Auto-Fetch** ⭐ START HERE
   - Easiest to implement
   - Most impactful for users
   - Improves course quality immediately
   - Time: 2-3 hours

2. **Phase 4: Progress Tracking** ⭐ SECOND
   - Simple to implement
   - Improves user engagement
   - Time: 1-2 hours

3. **Phase 2: AI Tutor** ⭐ THIRD
   - Requires API key
   - Impressive feature
   - Time: 2-3 hours

4. **Phase 3: Quiz System** ⭐ FOURTH
   - Medium complexity
   - Improves learning outcomes
   - Time: 3-4 hours

5. **Phase 5: Admin Dashboard** ⭐ LAST
   - Most complex
   - Less critical for MVP
   - Time: 4-5 hours

---

## Quick Start: YouTube Auto-Fetch

### Step 1: Get YouTube API Key
```
1. Go to https://console.cloud.google.com
2. Create project
3. Enable YouTube Data API v3
4. Create API key
5. Copy key
```

### Step 2: Add to Backend
```
1. Create backend/src/routes/youtube.js
2. Add code from Phase 1 above
3. Update backend/src/index.js to import route
4. Add YOUTUBE_API_KEY to .env
```

### Step 3: Add to Frontend
```
1. Create frontend/src/components/YouTubeLessons.jsx
2. Add code from Phase 1 above
3. Import in CourseDetail.jsx
4. Add component to course page
```

### Step 4: Test
```
1. Restart backend: npm run dev
2. Restart frontend: npm run dev
3. Open course page
4. Should see YouTube videos
```

---

## Current Course Categories

✅ Frontend Development (3 courses)
✅ Backend Development (2 courses)
✅ Data Science (2 courses)
✅ UI/UX Design (1 course)
✅ Graphic Design (1 course)
✅ Cloud Computing (1 course)
✅ Digital Marketing (1 course)
✅ Business & Entrepreneurship (1 course)
✅ Mobile App Development (1 course)
✅ Cybersecurity (1 course)
✅ Public Speaking (1 course)

**Total: 15 courses**

---

## Next Steps

1. ✅ Restart backend to load 15 courses
2. ✅ Verify courses display on home page
3. ⏳ Implement YouTube Auto-Fetch (Phase 1)
4. ⏳ Add Progress Tracking (Phase 4)
5. ⏳ Add AI Tutor (Phase 2)
6. ⏳ Add Quizzes (Phase 3)
7. ⏳ Add Admin Dashboard (Phase 5)

---

## Summary

Your LMS now has:
- ✅ 15 sample courses
- ✅ Multiple categories
- ✅ Search and filter
- ✅ Course details
- ✅ User authentication
- ✅ Responsive design

**Next: Implement YouTube Auto-Fetch for maximum impact!**

---

**Last Updated:** March 2024
**Status:** Ready for Phase 1 ✅
