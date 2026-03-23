# 🚀 Complete Setup Guide - Step by Step

## Prerequisites
- Node.js v16+ (you have v24.11.1 ✅)
- npm (comes with Node.js)
- Terminal/Command Prompt

## Step 1: Backend Setup (5 minutes)

### 1.1 Navigate to Backend
```bash
cd backend
```

### 1.2 Clean Install
```bash
# Remove old files
rm -rf node_modules package-lock.json

# Install fresh
npm install
```

### 1.3 Create .env File
```bash
# Create .env in backend directory
cat > .env << EOF
PORT=5000
FIREBASE_PROJECT_ID=demo
FIREBASE_PRIVATE_KEY=demo
FIREBASE_CLIENT_EMAIL=demo@demo.com
NODE_ENV=development
YOUTUBE_API_KEY=demo
GEMINI_API_KEY=demo
EOF
```

**Note:** Replace `demo` values with real API keys later:
- YouTube API Key: https://console.cloud.google.com/
- Gemini API Key: https://makersuite.google.com/app/apikey

### 1.4 Start Backend
```bash
npm run dev
```

**Expected Output:**
```
Server running on port 5000
Health check: http://localhost:5000/health
✅ In-memory database initialized with 35 courses
```

**If you see this, backend is working! ✅**

---

## Step 2: Frontend Setup (5 minutes)

### 2.1 Open New Terminal
Keep backend running, open a new terminal window

### 2.2 Navigate to Frontend
```bash
cd frontend
```

### 2.3 Clean Install
```bash
# Remove old files
rm -rf node_modules package-lock.json

# Install fresh
npm install
```

### 2.4 Start Frontend
```bash
npm run dev
```

**Expected Output:**
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

**If you see this, frontend is working! ✅**

---

## Step 3: Open in Browser

### 3.1 Open Browser
Go to: `http://localhost:5173`

### 3.2 You Should See
- EduVerse landing page
- Navigation bar with "Courses" link
- Login/Signup buttons

---

## Step 4: Test Features

### 4.1 Browse Courses
1. Click "Courses" in navbar
2. Should see 35 courses
3. Try filtering by category

### 4.2 Enroll in Course
1. Click any course
2. Click "Enroll Now"
3. Complete enrollment

### 4.3 Test YouTube Lessons
1. On course detail page (enrolled)
2. Scroll to "Learning Videos"
3. Videos should load

### 4.4 Test AI Tutor
1. On course detail page (enrolled)
2. Scroll to "AI Learning Assistant"
3. Ask: "What is React?"
4. AI should respond

### 4.5 Test My Learning
1. Enroll in 2-3 courses
2. Go to `/my-learning`
3. Should see all enrolled courses

---

## Troubleshooting

### Backend Won't Start

**Error: Port 5000 already in use**
```bash
# Find process
lsof -i :5000

# Kill it
kill -9 <PID>

# Try again
npm run dev
```

**Error: Cannot find module**
```bash
# Reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Error: .env not found**
```bash
# Create .env
cat > .env << EOF
PORT=5000
FIREBASE_PROJECT_ID=demo
FIREBASE_PRIVATE_KEY=demo
FIREBASE_CLIENT_EMAIL=demo@demo.com
NODE_ENV=development
YOUTUBE_API_KEY=demo
GEMINI_API_KEY=demo
EOF

npm run dev
```

### Frontend Won't Start

**Error: Port 5173 already in use**
```bash
# Kill process
lsof -i :5173
kill -9 <PID>

# Try again
npm run dev
```

**Error: Cannot find module**
```bash
# Reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Courses Not Showing

1. Check backend is running: `curl http://localhost:5000/health`
2. Check browser console: F12 → Console
3. Check network tab: F12 → Network
4. Clear cache: Ctrl+Shift+Delete

### YouTube Videos Not Loading

1. Check YOUTUBE_API_KEY in backend/.env
2. Verify API key is valid
3. Check browser console for errors

### AI Tutor Not Responding

1. Check GEMINI_API_KEY in backend/.env
2. Verify API key is valid
3. Ensure you're logged in

---

## Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can see landing page
- [ ] Can browse courses
- [ ] Can enroll in course
- [ ] Can see course detail
- [ ] YouTube videos load
- [ ] AI tutor responds
- [ ] My Learning shows courses
- [ ] No console errors

---

## Next Steps

### Get Real API Keys (Optional)

**YouTube API:**
1. Go to https://console.cloud.google.com/
2. Create project
3. Enable YouTube Data API v3
4. Create API key
5. Add to backend/.env

**Gemini API:**
1. Go to https://makersuite.google.com/app/apikey
2. Create API key
3. Add to backend/.env

### Deploy to Production

See `RUN_PROJECT.md` for deployment instructions

---

## File Structure

```
backend/
├── src/
│   ├── routes/          # API routes
│   ├── utils/           # Utilities
│   ├── middleware/      # Auth middleware
│   └── index.js         # Main server
├── .env                 # Environment variables
└── package.json         # Dependencies

frontend/
├── src/
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   ├── context/         # Auth context
│   └── App.jsx          # Main app
├── .env                 # Environment variables
└── package.json         # Dependencies
```

---

## Quick Commands

| Command | What it does |
|---------|------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

---

## Support

**Documentation Files:**
- `START_HERE_AI_LMS.md` - Quick reference
- `SETUP_AI_FEATURES.md` - Detailed setup
- `TROUBLESHOOTING_GUIDE.md` - Common issues
- `RUN_PROJECT.md` - How to run

**Check These First:**
1. Browser console (F12)
2. Backend logs (terminal)
3. Network tab (F12 → Network)
4. Documentation files

---

## Success Indicators

✅ Backend starts without errors
✅ Frontend starts without errors
✅ Can see landing page
✅ Can browse 35 courses
✅ Can enroll in courses
✅ YouTube videos load
✅ No console errors

**If all above are true, you're ready to go!** 🎉

---

**Version:** 1.0.0
**Last Updated:** March 2026
**Status:** ✅ Ready to Use
