# 🚀 How to Run the Project

## Prerequisites

- Node.js (v16+)
- npm or yarn
- YouTube API Key
- Gemini API Key

## Step 1: Get API Keys

### YouTube API Key
1. Go to https://console.cloud.google.com/
2. Create a new project
3. Search for "YouTube Data API v3"
4. Click "Enable"
5. Go to Credentials → Create Credentials → API Key
6. Copy the API key

### Gemini API Key
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the API key

## Step 2: Setup Backend

### 2.1 Navigate to backend
```bash
cd backend
```

### 2.2 Install dependencies
```bash
npm install
```

### 2.3 Create/Update `.env` file
```bash
# Create .env file in backend directory
cat > .env << EOF
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
NODE_ENV=development
YOUTUBE_API_KEY=your_youtube_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
EOF
```

Replace the values with your actual keys.

### 2.4 Start backend server
```bash
npm run dev
```

You should see:
```
Server running on port 5000
Health check: http://localhost:5000/health
✅ In-memory database initialized with 35 courses
```

## Step 3: Setup Frontend

### 3.1 Open new terminal and navigate to frontend
```bash
cd frontend
```

### 3.2 Install dependencies
```bash
npm install
```

### 3.3 Start frontend development server
```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:5173/
```

## Step 4: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

## Testing the Features

### Test 1: Browse Courses
1. Click "Courses" in navbar
2. Should see 35 courses
3. Filter by category
4. Search for courses

### Test 2: Enroll in Course
1. Click any course
2. Click "Enroll Now"
3. Complete enrollment
4. Click "Start Learning"

### Test 3: YouTube Lessons
1. On course detail page (enrolled)
2. Scroll to "Learning Videos"
3. Videos should load
4. Click a video to play

### Test 4: AI Tutor
1. On course detail page (enrolled)
2. Scroll to "AI Learning Assistant"
3. Ask: "What is React?"
4. AI should respond

### Test 5: Recommendations
1. On course detail page
2. Scroll to "Recommended For You"
3. Should show 4 related courses

### Test 6: My Learning
1. Enroll in 2-3 courses
2. Go to `/my-learning`
3. Should see all enrolled courses
4. Progress bars should display

### Test 7: Learning Path Generator
1. Go to `/generate-learning-path`
2. Enter: "Python, Data Science, Machine Learning"
3. Click "Generate Learning Path"
4. Should show structured path

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process using port 5000
kill -9 <PID>

# Try again
npm run dev
```

### Frontend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### YouTube videos not loading
- Check YOUTUBE_API_KEY in backend/.env
- Verify API key is valid
- Check browser console for errors

### AI Tutor not responding
- Check GEMINI_API_KEY in backend/.env
- Verify API key is valid
- Check backend logs

### CORS errors
- Backend CORS is enabled by default
- Check frontend is on port 5173
- Check backend is on port 5000

### Courses not showing
- Verify backend is running
- Check network tab in browser DevTools
- Clear browser cache

## Project Structure

```
eduverse-lms/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── middleware/
│   │   ├── firebase.js
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## Available Commands

### Backend
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### Frontend
```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
NODE_ENV=development
YOUTUBE_API_KEY=your_youtube_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## API Endpoints

### Health Check
```
GET http://localhost:5000/health
```

### Courses
```
GET http://localhost:5000/api/courses
GET http://localhost:5000/api/courses/:id
GET http://localhost:5000/api/courses/featured
```

### YouTube
```
GET http://localhost:5000/api/youtube/search?query=React
GET http://localhost:5000/api/youtube/course/React%20for%20Beginners
```

### AI Tutor
```
POST http://localhost:5000/api/ai-tutor/ask
POST http://localhost:5000/api/ai-tutor/recommendations
POST http://localhost:5000/api/ai-tutor/generate-course
POST http://localhost:5000/api/ai-tutor/learning-path
```

## Performance Tips

1. **Clear Cache**: Ctrl+Shift+Delete (Chrome)
2. **Check Network**: DevTools → Network tab
3. **Monitor API**: Check backend logs
4. **Test Locally**: Use localhost, not IP

## Debugging

### Backend Logs
```bash
# Watch logs in real-time
npm run dev
```

### Frontend Logs
```bash
# Open browser DevTools
F12 or Cmd+Option+I
```

### Network Requests
```bash
# DevTools → Network tab
# Filter by XHR to see API calls
```

## Production Deployment

### Backend
```bash
# Build
npm run build

# Deploy to Heroku/Railway/Vercel
# Set environment variables on platform
# Deploy
```

### Frontend
```bash
# Build
npm run build

# Deploy to Vercel/Netlify
# Connect GitHub repo
# Deploy
```

## Support

For issues:
1. Check browser console (F12)
2. Check backend logs
3. Verify API keys
4. Check network requests
5. Read error messages carefully

## Quick Reference

| Task | Command |
|------|---------|
| Start backend | `cd backend && npm run dev` |
| Start frontend | `cd frontend && npm run dev` |
| Install deps | `npm install` |
| View app | `http://localhost:5173` |
| API health | `http://localhost:5000/health` |
| Stop server | `Ctrl+C` |

---

**Ready to run?** Follow the steps above! 🎉
