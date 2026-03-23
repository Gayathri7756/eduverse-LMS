import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import usersRouter from './routes/users.js'
import coursesRouter from './routes/courses.js'
import sectionsRouter from './routes/sections.js'
import lessonsRouter from './routes/lessons.js'
import enrollmentsRouter from './routes/enrollments.js'
import paymentsRouter from './routes/payments.js'
import activityRouter from './routes/activity.js'
import aiRouter from './routes/ai.js'
import resumeRouter from './routes/resume.js'
import projectsRouter from './routes/projects.js'
import youtubeRouter from './routes/youtube.js'
import aiTutorRouter from './routes/aiTutor.js'
import learningPathRouter from './routes/learningPath.js'
import studyPlannerRouter from './routes/studyPlanner.js'
import codeExecutorRouter from './routes/codeExecutor.js'
import quizzesRouter from './routes/quizzes.js'
import assignmentsRouter from './routes/assignments.js'
import progressRouter from './routes/progress.js'
import certificatesRouter from './routes/certificates.js'
import { initializeSampleData } from './utils/sampleData.js'
import { initializeInMemoryDb } from './utils/inMemoryDb.js'
import { useFirebase } from './firebase.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/users', usersRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/sections', sectionsRouter)
app.use('/api/lessons', lessonsRouter)
app.use('/api/enrollments', enrollmentsRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/activity', activityRouter)
app.use('/api/ai', aiRouter)
app.use('/api/resume', resumeRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/youtube', youtubeRouter)
app.use('/api/ai-tutor', aiTutorRouter)
app.use('/api/learning-path', learningPathRouter)
app.use('/api/study-planner', studyPlannerRouter)
app.use('/api/code-executor', codeExecutorRouter)
app.use('/api/quizzes', quizzesRouter)
app.use('/api/assignments', assignmentsRouter)
app.use('/api/progress', progressRouter)
app.use('/api/certificates', certificatesRouter)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Backend is running', firebaseEnabled: useFirebase })
})

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
  
  if (useFirebase) {
    // Initialize Firebase sample data on startup
    await initializeSampleData()
  } else {
    // Initialize in-memory database
    initializeInMemoryDb()
  }
})
