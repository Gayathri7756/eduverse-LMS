# 🚀 AI-Powered LMS Setup Guide

## Overview
Your EduVerse LMS now includes:
- ✅ 35+ courses across IT and Non-IT categories
- ✅ Automatic YouTube lesson fetching
- ✅ AI Tutor chatbot with Gemini API
- ✅ AI course recommendations
- ✅ AI learning path generator
- ✅ My Learning dashboard
- ✅ Premium UI with TailwindCSS

## Prerequisites

### 1. YouTube Data API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create an API key (Credentials → Create Credentials → API Key)
5. Copy the API key

### 2. Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key

### 3. Node.js Dependencies
Already added to `backend/package.json`:
- `axios` - HTTP requests
- `@google/generative-ai` - Gemini API

## Installation Steps

### Backend Setup

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Update `.env` file:**
```env
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
NODE_ENV=development
YOUTUBE_API_KEY=your_youtube_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

3. **Start backend:**
```bash
npm run dev
```

### Frontend Setup

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Start frontend:**
```bash
npm run dev
```

## New Features

### 1. YouTube Lessons
**Location:** Course Detail Page (when enrolled)
- Automatically fetches 8 relevant YouTube videos
- Displays video thumbnails, titles, channels, duration
- Embedded YouTube player
- Click to play any video

**API Endpoint:**
```
GET /api/youtube/course/:courseTitle
```

### 2. AI Tutor
**Location:** Course Detail Page (when enrolled)
- Ask questions about the course
- Get AI-powered explanations
- Chat history during session
- Expandable/collapsible interface

**API Endpoint:**
```
POST /api/ai-tutor/ask
Body: { courseTitle, question }
```

### 3. Course Recommendations
**Location:** Course Detail Page
- AI-generated recommendations based on current course
- Fallback to same-category courses
- Click to view recommended course details

**API Endpoint:**
```
POST /api/ai-tutor/recommendations
Body: { courseTitle, category }
```

### 4. My Learning Dashboard
**Location:** `/my-learning`
- View all enrolled courses
- Progress tracking with progress bars
- Continue learning button
- Course stats and instructor info

### 5. Learning Path Generator
**Location:** `/generate-learning-path`
- Paste syllabus or topics
- AI generates structured learning path
- Shows courses with modules
- Checkbox tracking for modules

**API Endpoint:**
```
POST /api/ai-tutor/learning-path
Body: { syllabus }
```

## Course Categories

### IT Categories (18 courses)
- Frontend Development (4 courses)
- Backend Development (3 courses)
- Full Stack Development (2 courses)
- Data Science (1 course)
- Machine Learning (1 course)
- Artificial Intelligence (2 courses)
- Cybersecurity (2 courses)
- Cloud Computing (1 course)
- DevOps (2 courses)
- Mobile App Development (2 courses)
- UI/UX Design (1 course)
- Game Development (1 course)
- Blockchain Development (1 course)

### Non-IT Categories (17 courses)
- Graphic Design (1 course)
- Photography (1 course)
- Video Editing (1 course)
- Digital Marketing (1 course)
- Business & Entrepreneurship (1 course)
- Finance & Accounting (1 course)
- Project Management (1 course)
- Public Speaking (1 course)
- Communication Skills (1 course)
- Personal Development (1 course)
- Language Learning (1 course)

## API Routes

### YouTube Routes
```
GET /api/youtube/search?query=React&maxResults=8
GET /api/youtube/course/:courseTitle
```

### AI Tutor Routes
```
POST /api/ai-tutor/ask
POST /api/ai-tutor/recommendations
POST /api/ai-tutor/generate-course
POST /api/ai-tutor/learning-path
```

## Frontend Components

### New Components
1. **YouTubeLessons.jsx** - YouTube video player and list
2. **AITutor.jsx** - Chat interface for AI tutor
3. **CourseRecommendations.jsx** - Recommended courses display

### Updated Components
1. **CourseDetail.jsx** - Added YouTube, AI tutor, recommendations
2. **Navbar.jsx** - Added My Learning and Learning Path links
3. **App.jsx** - Added new routes

### New Pages
1. **MyLearning.jsx** - Dashboard for enrolled courses
2. **GenerateLearningPath.jsx** - AI learning path generator

## Testing

### Test YouTube Integration
1. Go to any course detail page
2. Enroll in the course
3. Scroll to "Learning Videos" section
4. Videos should load automatically

### Test AI Tutor
1. On course detail page (enrolled)
2. Scroll to "AI Learning Assistant"
3. Ask a question about the course
4. AI should respond with explanation

### Test Recommendations
1. On course detail page
2. Scroll to "Recommended For You"
3. Should show 4 related courses

### Test My Learning
1. Enroll in a course
2. Go to `/my-learning`
3. Should see enrolled course with progress bar

### Test Learning Path Generator
1. Go to `/generate-learning-path`
2. Enter topics (e.g., "Python, Data Science, Machine Learning")
3. Click "Generate Learning Path"
4. Should show structured learning path

## Troubleshooting

### YouTube Videos Not Loading
- Check YOUTUBE_API_KEY in .env
- Verify API key has YouTube Data API v3 enabled
- Check browser console for errors

### AI Tutor Not Responding
- Check GEMINI_API_KEY in .env
- Verify API key is valid
- Check backend logs for errors

### Courses Not Showing
- Verify backend is running on port 5000
- Check if in-memory database initialized
- Clear browser cache and reload

### CORS Errors
- Verify backend CORS middleware is enabled
- Check frontend API URLs match backend port

## Performance Tips

1. **Lazy Load Videos** - Videos load on demand
2. **Cache Recommendations** - Store in localStorage
3. **Pagination** - Implement for large course lists
4. **Image Optimization** - Use thumbnails from YouTube

## Security Notes

1. **API Keys** - Never commit .env to git
2. **Authentication** - All AI endpoints require login
3. **Rate Limiting** - Consider adding for production
4. **Input Validation** - Sanitize user inputs

## Next Steps

1. Deploy to production
2. Set up Firebase Firestore (optional)
3. Add payment gateway integration
4. Implement certificate generation
5. Add admin dashboard
6. Set up email notifications

## Support

For issues or questions:
1. Check browser console for errors
2. Check backend logs
3. Verify API keys are correct
4. Ensure all dependencies are installed

---

**Version:** 1.0.0
**Last Updated:** March 2026
