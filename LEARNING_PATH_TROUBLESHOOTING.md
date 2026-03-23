# 🔍 Learning Path Generator - Troubleshooting Guide

## Quick Diagnosis

### Step 1: Check Backend is Running
```bash
curl http://localhost:5000/health
```

**Expected Response**:
```json
{"status":"OK","message":"Backend is running","firebaseEnabled":false}
```

**If Error**: Backend is not running
- Solution: `cd backend && npm run dev`

---

### Step 2: Check You're Logged In
1. Open browser console: `F12`
2. Go to Application tab
3. Look for `token_` in localStorage
4. If not there: Log in first

**If No Token**: You're not logged in
- Solution: Click "Logout" then "Login" again

---

### Step 3: Check Network Request
1. Open browser console: `F12`
2. Go to Network tab
3. Click "Generate Learning Path"
4. Look for request to `/api/ai-tutor/learning-path`
5. Check response status and body

**If 401**: Authentication failed
- Solution: Log in again

**If 400**: Bad request
- Solution: Enter some topics

**If 500**: Server error
- Solution: Check backend logs

---

## Common Issues & Solutions

### Issue 1: "Failed to generate learning path. Please try again."

**Cause 1: Not Logged In**
```
Check: Browser console → Application → localStorage
Look for: token_[your-user-id]
Solution: Log in again
```

**Cause 2: Backend Not Running**
```
Check: Terminal where backend should be running
Solution: cd backend && npm run dev
```

**Cause 3: Empty Topics**
```
Check: Did you enter topics?
Solution: Enter topics like "python, javascript"
```

**Cause 4: API Key Missing**
```
Check: backend/.env file
Look for: GEMINI_API_KEY
Solution: Add API key or use fallback (should work anyway)
```

---

### Issue 2: "Authentication token not found"

**Solution**:
1. Click "Logout" button
2. Click "Login" button
3. Enter credentials
4. Try again

---

### Issue 3: "Invalid response format"

**Cause**: Backend returned unexpected data

**Solution**:
1. Check backend logs
2. Restart backend: `cd backend && npm run dev`
3. Try again

---

### Issue 4: "No learning path generated"

**Cause**: API returned empty response

**Solution**:
1. Try different topics: "python" or "javascript"
2. Check backend logs
3. Restart backend

---

## Step-by-Step Debugging

### Step 1: Verify Backend
```bash
# Terminal 1: Check if running
curl http://localhost:5000/health

# Should show: {"status":"OK",...}
```

### Step 2: Verify Frontend
```bash
# Terminal 2: Check if running
# Should see: Local: http://localhost:5173/
```

### Step 3: Check Browser Console
```
F12 → Console tab
Look for any red errors
```

### Step 4: Check Network Tab
```
F12 → Network tab
Click "Generate Learning Path"
Look for POST request to /api/ai-tutor/learning-path
Check response status and body
```

### Step 5: Check Backend Logs
```
Look at Terminal 1 where backend is running
Should show request details
Look for error messages
```

---

## Testing Different Scenarios

### Scenario 1: Valid Topics
```
Input: "python, javascript"
Expected: Learning path with courses
```

### Scenario 2: Single Topic
```
Input: "python"
Expected: Learning path for Python
```

### Scenario 3: Complex Topics
```
Input: "machine learning, deep learning, neural networks"
Expected: Learning path for ML
```

### Scenario 4: Unknown Topics
```
Input: "xyz, abc, def"
Expected: Generic learning path (fallback)
```

---

## Browser Console Debugging

### Check 1: Token Exists
```javascript
// In browser console (F12)
localStorage.getItem('token_' + JSON.parse(localStorage.getItem('user')).uid)
// Should show a long token string
```

### Check 2: API URL
```javascript
// Should be: http://localhost:5000
// Check in Network tab
```

### Check 3: Request Headers
```javascript
// Should include: Authorization: Bearer [token]
// Check in Network tab → Request Headers
```

### Check 4: Response Body
```javascript
// Should include: learningPath: [...]
// Check in Network tab → Response
```

---

## Backend Logs Debugging

### What to Look For

**Success**:
```
POST /api/ai-tutor/learning-path
Status: 200
Response: { learningPath: [...] }
```

**Error - Missing Token**:
```
POST /api/ai-tutor/learning-path
Status: 401
Error: No token provided
```

**Error - Invalid Syllabus**:
```
POST /api/ai-tutor/learning-path
Status: 400
Error: syllabus is required
```

**Error - API Failure**:
```
POST /api/ai-tutor/learning-path
Status: 500
Error: Gemini API error
```

---

## Quick Fixes

### Fix 1: Hard Refresh
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

### Fix 2: Clear Cache
```
F12 → Application → Clear Storage → Clear All
```

### Fix 3: Restart Backend
```bash
# Kill current process
Ctrl+C

# Restart
npm run dev
```

### Fix 4: Restart Frontend
```bash
# Kill current process
Ctrl+C

# Restart
npm run dev
```

### Fix 5: Log In Again
1. Click "Logout"
2. Click "Login"
3. Enter credentials
4. Try again

---

## Advanced Debugging

### Check API Endpoint Directly
```bash
# Get token first
TOKEN="your-token-here"

# Test endpoint
curl -X POST http://localhost:5000/api/ai-tutor/learning-path \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"syllabus":"python"}'
```

### Check Backend Route
```bash
# In backend terminal, look for:
# POST /api/ai-tutor/learning-path
# Should show request details
```

### Check Gemini API
```bash
# In backend/.env, check:
# GEMINI_API_KEY=your-key-here

# If missing, fallback will be used
```

---

## Checklist Before Asking for Help

- [ ] Backend is running (`npm run dev`)
- [ ] Frontend is running (`npm run dev`)
- [ ] You are logged in
- [ ] You entered topics
- [ ] You clicked "Generate Learning Path"
- [ ] You checked browser console (F12)
- [ ] You checked backend logs
- [ ] You tried hard refresh (Ctrl+Shift+R)
- [ ] You tried restarting backend
- [ ] You tried logging in again

---

## If Still Not Working

### Provide This Information

1. **Error message**: What exactly does it say?
2. **Browser console**: Any red errors? (F12 → Console)
3. **Network tab**: What's the response? (F12 → Network)
4. **Backend logs**: What does it show?
5. **Steps to reproduce**: What did you do?

### Example Report
```
Error: "Failed to generate learning path"
Browser: Chrome
Topics entered: "python, javascript"
Token: Present in localStorage
Backend: Running on port 5000
Network response: 500 error
Backend logs: "Gemini API error: API key not found"
```

---

## Summary

**Most Common Fixes**:
1. ✅ Log in again
2. ✅ Restart backend
3. ✅ Hard refresh browser
4. ✅ Check backend logs
5. ✅ Try different topics

**If None Work**:
1. Check all items in checklist
2. Provide error details
3. Share browser console errors
4. Share backend logs

---

**Status**: ✅ TROUBLESHOOTING GUIDE COMPLETE
**Date**: March 16, 2026

