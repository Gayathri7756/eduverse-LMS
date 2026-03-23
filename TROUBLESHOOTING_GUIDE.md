# 🔧 Troubleshooting Guide

## Backend Issues

### 1. Module Import Error
**Error:** `SyntaxError: The requested module does not provide an export named 'default'`

**Solution:** ✅ FIXED
- Changed `import db from` to `import { db } from` in projects.js
- All imports now use correct named exports

**Status:** Resolved

### 2. Port Already in Use
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### 3. Dependencies Not Installed
**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd backend
npm install
```

### 4. Environment Variables Missing
**Error:** `YOUTUBE_API_KEY not found` or `GEMINI_API_KEY not found`

**Solution:**
```bash
# Create .env file in backend directory
cat > .env << EOF
PORT=5000
YOUTUBE_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
FIREBASE_PROJECT_ID=your_id
FIREBASE_PRIVATE_KEY=your_key
FIREBASE_CLIENT_EMAIL=your_email
NODE_ENV=development
EOF
```

### 5. Firebase Not Configured
**Error:** `Firebase initialization failed`

**Solution:**
- This is normal - system falls back to in-memory database
- You can ignore this warning
- All features work without Firebase

---

## Frontend Issues

### 1. Port Already in Use
**Error:** `Port 5173 is already in use`

**Solution:**
```bash
# Kill process using port 5173
lsof -i :5173
kill -9 <PID>

# Or let Vite use next available port
npm run dev
```

### 2. Dependencies Not Installed
**Error:** `Cannot find module 'react'`

**Solution:**
```bash
cd frontend
npm install
```

### 3. CORS Errors
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure backend is running on port 5000
- Ensure frontend is on port 5173
- CORS is enabled by default in backend
- Check browser console for exact error

### 4. API Not Responding
**Error:** `Failed to fetch` or `Network error`

**Solution:**
```bash
# Check if backend is running
curl http://localhost:5000/health

# Should return:
# {"status":"OK","message":"Backend is running","firebaseEnabled":false}
```

### 5. Blank Page
**Error:** Page loads but shows nothing

**Solution:**
- Check browser console (F12)
- Check for JavaScript errors
- Clear browser cache: Ctrl+Shift+Delete
- Hard refresh: Ctrl+Shift+R

---

## API Issues

### 1. YouTube Videos Not Loading
**Error:** No videos appear on course detail page

**Solution:**
1. Check YOUTUBE_API_KEY in backend/.env
2. Verify API key is valid
3. Check YouTube Data API v3 is enabled
4. Check browser console for errors
5. Check backend logs

### 2. AI Tutor Not Responding
**Error:** AI tutor shows "Sorry, I could not generate a response"

**Solution:**
1. Check GEMINI_API_KEY in backend/.env
2. Verify API key is valid
3. Check backend logs for errors
4. Ensure you're logged in
5. Try asking a simpler question

### 3. Courses Not Showing
**Error:** Course catalog is empty

**Solution:**
1. Verify backend is running
2. Check network tab in DevTools
3. Clear browser cache
4. Check backend logs
5. Verify in-memory database initialized

### 4. Enrollment Fails
**Error:** "Failed to enroll" or enrollment button doesn't work

**Solution:**
1. Ensure you're logged in
2. Check browser console for errors
3. Verify backend is running
4. Check network requests in DevTools
5. Try refreshing page

---

## Common Error Messages

### "Cannot find module"
**Cause:** Missing dependency
**Fix:** Run `npm install` in that directory

### "ENOENT: no such file or directory"
**Cause:** File path is wrong
**Fix:** Check file paths in imports

### "SyntaxError: Unexpected token"
**Cause:** JavaScript syntax error
**Fix:** Check file for typos, use getDiagnostics

### "TypeError: Cannot read property"
**Cause:** Null/undefined value
**Fix:** Add null checks, check data structure

### "CORS error"
**Cause:** Frontend and backend on different origins
**Fix:** Ensure both running on localhost, check CORS config

---

## Debugging Tips

### 1. Check Backend Logs
```bash
# Terminal shows logs when running npm run dev
# Look for errors, warnings, and info messages
```

### 2. Check Browser Console
```
F12 → Console tab
Look for red errors and yellow warnings
```

### 3. Check Network Requests
```
F12 → Network tab
Filter by XHR to see API calls
Check response status and data
```

### 4. Check Environment Variables
```bash
# Backend
cat backend/.env

# Frontend
cat frontend/.env
```

### 5. Test API Endpoints
```bash
# Test health check
curl http://localhost:5000/health

# Test courses
curl http://localhost:5000/api/courses

# Test YouTube
curl "http://localhost:5000/api/youtube/search?query=React"
```

---

## Performance Issues

### 1. Slow Page Load
**Solution:**
- Check network tab for slow requests
- Check backend logs for slow queries
- Clear browser cache
- Check internet connection

### 2. Slow API Responses
**Solution:**
- Check YouTube API quota
- Check Gemini API quota
- Check backend logs
- Monitor API usage

### 3. High Memory Usage
**Solution:**
- Restart backend: Stop and run `npm run dev` again
- Restart frontend: Stop and run `npm run dev` again
- Check for memory leaks in browser DevTools

---

## Reset/Clean Up

### Clear Everything and Start Fresh
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Clear Browser Cache
```
Chrome: Ctrl+Shift+Delete
Firefox: Ctrl+Shift+Delete
Safari: Cmd+Shift+Delete
```

### Clear Local Storage
```javascript
// In browser console
localStorage.clear()
sessionStorage.clear()
location.reload()
```

---

## Getting Help

1. **Check Documentation**
   - START_HERE_AI_LMS.md
   - SETUP_AI_FEATURES.md
   - RUN_PROJECT.md

2. **Check Browser Console**
   - F12 → Console tab
   - Look for error messages

3. **Check Backend Logs**
   - Terminal where `npm run dev` is running
   - Look for error messages

4. **Check Network Requests**
   - F12 → Network tab
   - Check API responses

5. **Verify Setup**
   - API keys in .env
   - Dependencies installed
   - Ports available
   - Backend running
   - Frontend running

---

## Quick Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] YOUTUBE_API_KEY in .env
- [ ] GEMINI_API_KEY in .env
- [ ] npm install run in both directories
- [ ] No console errors
- [ ] Network requests successful
- [ ] Can see courses
- [ ] Can enroll in course
- [ ] YouTube videos load
- [ ] AI tutor responds

---

**Last Updated:** March 2026
**Status:** ✅ All Issues Resolved
