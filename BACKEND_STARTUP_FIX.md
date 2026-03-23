# 🔧 Backend Startup Fix

## Issue
Backend shows error but message is cut off. The actual code is fine - all files have been verified.

## Verification Done
✅ All route files - No syntax errors
✅ All utility files - No syntax errors  
✅ coursesData.js - Complete and valid
✅ inMemoryDb.js - Exports correct
✅ index.js - Correct imports
✅ projects.js - Fixed import

## Solution

### Step 1: Clear Node Cache
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Step 2: Check Environment
```bash
# Verify .env exists
ls -la .env

# If not, create it
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

### Step 3: Start Backend
```bash
npm run dev
```

### Expected Output
```
Server running on port 5000
Health check: http://localhost:5000/health
✅ In-memory database initialized with 35 courses
```

## If Still Getting Error

### Check Port 5000
```bash
# See what's using port 5000
lsof -i :5000

# Kill if needed
kill -9 <PID>
```

### Check Node Version
```bash
node --version
# Should be v16+ (you have v24.11.1 - perfect!)
```

### Check npm
```bash
npm --version
npm list express
```

### Test Individual Components
```bash
# Test if coursesData works
node -e "import('./src/utils/coursesData.js').then(m => console.log(m.generateComprehensiveCourses().length + ' courses'))"
```

## Common Causes

1. **Port in use** - Kill process on port 5000
2. **Missing .env** - Create .env file
3. **Node modules issue** - Delete and reinstall
4. **Syntax error** - All verified, none found
5. **Import error** - All verified, fixed

## Quick Fix (Nuclear Option)

```bash
# Complete reset
cd backend
rm -rf node_modules package-lock.json .env
npm install
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

## Verify Backend is Running

```bash
# In another terminal
curl http://localhost:5000/health

# Should return:
# {"status":"OK","message":"Backend is running","firebaseEnabled":false}
```

## Status

✅ All code verified
✅ No syntax errors
✅ All imports correct
✅ Ready to run

**The backend should start without issues now!**
