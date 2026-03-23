# 📋 Commands Reference - EduVerse LMS

## Quick Start Commands

### Start Backend
```bash
cd backend
npm run dev
```
**Output**: Server running on port 5000

### Start Frontend
```bash
cd frontend
npm run dev
```
**Output**: Frontend running on http://localhost:5175

### Check Backend Health
```bash
curl http://localhost:5000/health
```

### Get All Courses
```bash
curl http://localhost:5000/api/courses
```

---

## Installation Commands

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Install Frontend Dependencies
```bash
cd frontend
npm install
```

---

## Build Commands

### Build Frontend
```bash
cd frontend
npm run build
```

### Preview Frontend Build
```bash
cd frontend
npm run preview
```

---

## Development Commands

### Run Backend with Watch
```bash
cd backend
npm run dev
```

### Run Frontend with Vite
```bash
cd frontend
npm run dev
```

### Run Frontend Build
```bash
cd frontend
npm run build
```

---

## Testing Commands

### Test Backend Health
```bash
curl http://localhost:5000/health
```

### Test Course API
```bash
curl http://localhost:5000/api/courses
```

### Test User API
```bash
curl http://localhost:5000/api/users
```

---

## Environment Setup

### Backend .env
```bash
PORT=5000
NODE_ENV=development
YOUTUBE_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

### Frontend .env
```bash
VITE_API_URL=http://localhost:5000
```

---

## Port Management

### Check if Port is in Use
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :5175

# Mac/Linux
lsof -i :5000
lsof -i :5175
```

### Kill Process on Port
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

---

## Git Commands

### Clone Repository
```bash
git clone <repository-url>
cd "full-stack Learning Management System (LMS)"
```

### Check Status
```bash
git status
```

### Add Changes
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Your message"
```

### Push Changes
```bash
git push origin main
```

---

## NPM Commands

### Install Package
```bash
npm install package-name
```

### Install Dev Package
```bash
npm install --save-dev package-name
```

### Update Packages
```bash
npm update
```

### Check Outdated Packages
```bash
npm outdated
```

---

## Useful Shortcuts

### Open Frontend in Browser
```bash
# Windows
start http://localhost:5175

# Mac
open http://localhost:5175

# Linux
xdg-open http://localhost:5175
```

### Open Backend Health Check
```bash
# Windows
start http://localhost:5000/health

# Mac
open http://localhost:5000/health

# Linux
xdg-open http://localhost:5000/health
```

---

## Debugging Commands

### Check Node Version
```bash
node --version
```

### Check NPM Version
```bash
npm --version
```

### Check Installed Packages
```bash
npm list
```

### Clear NPM Cache
```bash
npm cache clean --force
```

---

## File Management

### Create New File
```bash
# Windows
type nul > filename.js

# Mac/Linux
touch filename.js
```

### Create New Directory
```bash
# Windows
mkdir directory-name

# Mac/Linux
mkdir directory-name
```

### Remove File
```bash
# Windows
del filename.js

# Mac/Linux
rm filename.js
```

### Remove Directory
```bash
# Windows
rmdir /s /q directory-name

# Mac/Linux
rm -rf directory-name
```

---

## API Endpoints

### Courses
```
GET /api/courses - Get all courses
GET /api/courses/:id - Get course by ID
POST /api/courses - Create course
PUT /api/courses/:id - Update course
DELETE /api/courses/:id - Delete course
```

### Users
```
GET /api/users - Get all users
GET /api/users/:id - Get user by ID
POST /api/users - Create user
PUT /api/users/:id - Update user
DELETE /api/users/:id - Delete user
```

### Enrollments
```
GET /api/enrollments - Get all enrollments
POST /api/enrollments - Create enrollment
GET /api/enrollments/:userId - Get user enrollments
```

### Quizzes
```
GET /api/quizzes - Get all quizzes
GET /api/quizzes/:courseId - Get course quizzes
POST /api/quizzes - Create quiz
```

### Assignments
```
GET /api/assignments - Get all assignments
GET /api/assignments/:courseId - Get course assignments
POST /api/assignments - Create assignment
```

---

## Useful URLs

### Frontend
- Landing: http://localhost:5175
- Courses: http://localhost:5175/courses
- Login: http://localhost:5175/login
- Signup: http://localhost:5175/signup

### Backend
- Health: http://localhost:5000/health
- Courses API: http://localhost:5000/api/courses
- Users API: http://localhost:5000/api/users

---

## Troubleshooting Commands

### Clear Node Modules
```bash
# Windows
rmdir /s /q node_modules

# Mac/Linux
rm -rf node_modules
```

### Reinstall Dependencies
```bash
npm install
```

### Clear Cache and Reinstall
```bash
npm cache clean --force
npm install
```

### Check for Errors
```bash
npm run build
```

---

## Production Commands

### Build Frontend for Production
```bash
cd frontend
npm run build
```

### Start Backend for Production
```bash
cd backend
NODE_ENV=production npm start
```

---

## Docker Commands (Optional)

### Build Docker Image
```bash
docker build -t eduverse-lms .
```

### Run Docker Container
```bash
docker run -p 5000:5000 -p 5175:5175 eduverse-lms
```

---

## Deployment Commands

### Deploy to Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Deploy to Heroku (Backend)
```bash
npm install -g heroku
heroku login
heroku create app-name
git push heroku main
```

---

## Monitoring Commands

### Check Backend Logs
```bash
# Terminal where backend is running
# Logs appear automatically
```

### Check Frontend Logs
```bash
# Browser console (F12)
# Logs appear automatically
```

### Monitor Network Requests
```bash
# Browser DevTools (F12)
# Network tab
```

---

## Performance Commands

### Analyze Bundle Size
```bash
cd frontend
npm run build
npm install -g serve
serve -s dist
```

### Check Performance
```bash
# Browser DevTools (F12)
# Lighthouse tab
```

---

## Useful Aliases

### Create Alias for Backend Start
```bash
# Add to .bashrc or .zshrc
alias start-backend="cd backend && npm run dev"
```

### Create Alias for Frontend Start
```bash
# Add to .bashrc or .zshrc
alias start-frontend="cd frontend && npm run dev"
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm install` | Install dependencies |
| `npm update` | Update packages |
| `npm cache clean --force` | Clear cache |
| `curl http://localhost:5000/health` | Check backend |
| `git status` | Check git status |
| `git push` | Push changes |

---

## Status: ✅ READY TO USE

All commands are ready to use. Copy and paste as needed!

