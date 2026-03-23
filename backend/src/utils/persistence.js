import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_FILE = path.join(__dirname, '../../data/db.json')

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(__dirname, '../../data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Load persisted data from file
export const loadPersistedData = () => {
  try {
    ensureDataDir()
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (err) {
    console.warn('Failed to load persisted data:', err.message)
  }
  return null
}

// Save data to file
export const savePersistedData = (data) => {
  try {
    ensureDataDir()
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Failed to save persisted data:', err.message)
  }
}

// Auto-save on interval
export const startAutoSave = (db, interval = 5000) => {
  setInterval(() => {
    savePersistedData({
      enrollments: db.enrollments,
      watchedLessons: db.watchedLessons,
      quizResults: db.quizResults,
      submissions: db.submissions,
      certificates: db.certificates
    })
  }, interval)
}
