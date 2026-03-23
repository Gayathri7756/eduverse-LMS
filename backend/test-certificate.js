/**
 * Test script to populate database with completed course for certificate testing
 * Run this after backend starts to populate test data
 */

import axios from 'axios'

const API_URL = 'http://localhost:5000'
const USER_ID = 'LNWKwxM5Zxcm6OWNagqzotP4vvp1'
const COURSE_ID = 'course-1'

// Get a valid token (you'll need to provide this)
const TOKEN = process.env.TEST_TOKEN || 'test-token'

async function populateTestData() {
  try {
    console.log('🚀 Starting certificate test data population...')
    console.log(`User ID: ${USER_ID}`)
    console.log(`Course ID: ${COURSE_ID}`)

    // Quick complete the course
    console.log('\n📝 Quick completing course...')
    const quickCompleteRes = await axios.post(
      `${API_URL}/api/progress/quick-complete/${COURSE_ID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('✅ Course quick completed:', quickCompleteRes.data)

    // Get progress
    console.log('\n📊 Fetching progress...')
    const progressRes = await axios.get(
      `${API_URL}/api/progress/course/${COURSE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    )
    console.log('✅ Progress:', {
      videos: progressRes.data.lessons.progress,
      quizzes: progressRes.data.quizzes.progress,
      assignments: progressRes.data.assignments.progress,
      overall: progressRes.data.overallProgress
    })

    // Generate certificate
    console.log('\n🎓 Generating certificate...')
    const certRes = await axios.post(
      `${API_URL}/api/certificates/generate/${COURSE_ID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('✅ Certificate generated:', {
      id: certRes.data.certificate.id,
      studentName: certRes.data.certificate.studentName,
      courseName: certRes.data.certificate.courseName,
      certificateNumber: certRes.data.certificate.certificateNumber
    })

    console.log('\n🎉 Test data population complete!')
    console.log('\nNow you can:')
    console.log('1. Go to http://localhost:5174')
    console.log('2. Login with your account')
    console.log('3. Click "My Learning"')
    console.log('4. Click "🎓 Generate Certificate"')
    console.log('5. View your certificate!')

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message)
    console.log('\nMake sure:')
    console.log('1. Backend is running on port 5000')
    console.log('2. You have a valid token')
    console.log('3. You are enrolled in course-1')
  }
}

populateTestData()
