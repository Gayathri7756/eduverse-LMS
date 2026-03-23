// Quick test to check if backend can start
import { generateComprehensiveCourses } from './src/utils/coursesData.js'
import { initializeInMemoryDb } from './src/utils/inMemoryDb.js'

console.log('Testing course generation...')
try {
  const courses = generateComprehensiveCourses()
  console.log(`✅ Generated ${courses.length} courses`)
} catch (err) {
  console.error('❌ Error generating courses:', err.message)
}

console.log('Testing in-memory DB initialization...')
try {
  initializeInMemoryDb()
  console.log('✅ In-memory DB initialized')
} catch (err) {
  console.error('❌ Error initializing DB:', err.message)
}

console.log('All tests passed!')
