# ⚡ Quick Start - AI Features Testing

## 5-Minute Setup

### Step 1: Get API Keys (2 minutes)

**YouTube API Key:**
1. Visit: https://console.cloud.google.com/
2. Create project → Enable YouTube Data API v3 → Create API Key
3. Copy the key

**Gemini API Key:**
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### Step 2: Update Environment (1 minute)

**Backend `.env`:**
```env
YOUTUBE_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

### Step 3: Install & Run (2 minutes)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Testing Checklist

### ✅ YouTube Lessons
- [ ] Go to `/courses`
- [ ] Click any course
- [ ] Click "Enroll Now"
- [ ] Scroll to "Learning Videos"
- [ ] Videos should appear with thumbnails
- [ ] Click a video to play

### ✅ AI Tutor
- [ ] On course detail (enrolled)
- [ ] Scroll to "AI Learning Assistant"
- [ ] Type: "What is React?"
- [ ] Click Send
- [ ] AI should respond with explanation

### ✅ Course Recommendations
- [ ] On course detail page
- [ ] Scroll to "Recommended For You"
- [ ] Should show 4 related courses
- [ ] Click to view details

### ✅ My Learning
- [ ] Enroll in 2-3 courses
- [ ] Go to `/my-learning`
- [ ] Should see all enrolled courses
- [ ] Progress bars should display
- [ ] Click "Continue" button

### ✅ Learning Path Generator
- [ ] Go to `/generate-learning-path`
- [ ] Paste: "Python, Data Science, Machine Learning"
- [ ] Click "Generate Learning Path"
- [ ] Should show 3-5 courses with modules
- [ ] Checkboxes should work

## Sample Test Data

### Test Courses (Already Loaded)
1. React for Beginners - ₹499
2. JavaScript Fundamentals - ₹399
3. Python for Data Science - ₹699
4. Machine Learning Fundamentals - ₹749
5. AWS Cloud Fundamentals - ₹799

### Test Questions for AI Tutor
- "What is React state?"
- "Explain Python loops"
- "What is machine learning?"
- "How do I use hooks in React?"
- "Explain data structures"

### Test Syllabus for Learning Path
```
Python basics
Data structures
Algorithms
Machine learning
Deep learning
```

## Expected Results

### YouTube Videos
- 8 videos per course
- Thumbnails load
- Duration displays
- Player is responsive

### AI Tutor
- Responses in 2-5 seconds
- Clear explanations
- Related to course topic
- Chat history preserved

### Recommendations
- 4 courses shown
- Same category or related
- Clickable cards
- Proper styling

### My Learning
- All enrolled courses visible
- Progress bars accurate
- Continue buttons work
- Responsive design

### Learning Path
- 3-5 courses generated
- 3-4 modules per course
- Checkboxes functional
- Professional layout

## Troubleshooting

### Videos Not Loading
```
Error: YouTube API key not found
Solution: Add YOUTUBE_API_KEY to backend/.env
```

### AI Not Responding
```
Error: Gemini API error
Solution: Check GEMINI_API_KEY in backend/.env
```

### Courses Not Showing
```
Error: Failed to fetch courses
Solution: Ensure backend is running on port 5000
```

### CORS Error
```
Error: Access to XMLHttpRequest blocked
Solution: Backend CORS is enabled by default
```

## Performance Metrics

- Page load: < 2 seconds
- YouTube fetch: < 3 seconds
- AI response: < 5 seconds
- Recommendations: < 2 seconds

## Browser Compatibility

✅ Chrome/Edge (Latest)
✅ Firefox (Latest)
✅ Safari (Latest)
✅ Mobile browsers

## Next Steps After Testing

1. ✅ Verify all features work
2. ✅ Test on different browsers
3. ✅ Check mobile responsiveness
4. ✅ Deploy to production
5. ✅ Monitor API usage

## Feature Highlights

### 🎥 YouTube Integration
- Automatic video fetching
- Responsive player
- Video metadata display

### 🤖 AI Tutor
- Real-time responses
- Context-aware answers
- Chat interface

### 📚 Recommendations
- Intelligent suggestions
- Category-based fallback
- Clickable cards

### 📊 My Learning
- Progress tracking
- Course management
- Quick access

### 🎯 Learning Path
- AI-generated paths
- Module tracking
- Structured learning

---

**Ready to test?** Start with Step 1 above! 🚀
