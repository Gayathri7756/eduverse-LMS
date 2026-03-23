/**
 * Test script to login, complete a course, and generate certificate
 * Run with: node test-certificate-login.js
 */

import axios from 'axios'

const API_URL = 'http://localhost:5000'
const EMAIL = 'hinata777@gmail.com'
const PASSWORD = '987654321'

async function testCertificate() {
  try {
    console.log('🚀 Starting certificate test...\n')

    // Step 1: Login
    console.log('1️⃣ Logging in...')
    const loginRes = await axios.post(`${API_URL}/api/users/login`, {
      email: EMAIL,
      password: PASSWORD
    })
    
    const token = loginRes.data.token
    const userId = loginRes.data.user.uid
    console.log(`✅ Logged in! User ID: ${userId}\n`)

    // Step 2: Get enrolled courses
    console.log('2️⃣ Getting enrolled courses...')
    const coursesRes = await axios.get(`${API_URL}/api/enrollments/my-courses`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    const enrolledCourses = Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data.courses || []
    console.log(`✅ Found ${enrolledCourses.length} enrolled courses`)
    
    if (enrolledCourses.length === 0) {
      console.log('❌ No enrolled courses found!')
      return
    }

    const courseId = enrolledCourses[0].id
    console.log(`📚 Using course: ${courseId}\n`)

    // Step 3: Quick complete the course
    console.log('3️⃣ Quick completing course...')
    const quickCompleteRes = await axios.post(
      `${API_URL}/api/progress/quick-complete/${courseId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    console.log(`✅ Course quick completed!`)
    console.log(`   - Videos marked: ${quickCompleteRes.data.completed.videosMarked}`)
    console.log(`   - Quizzes marked: ${quickCompleteRes.data.completed.quizzesMarked}`)
    console.log(`   - Assignments marked: ${quickCompleteRes.data.completed.assignmentsMarked}\n`)

    // Step 4: Get progress
    console.log('4️⃣ Checking progress...')
    const progressRes = await axios.get(
      `${API_URL}/api/progress/course/${courseId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    console.log(`✅ Progress:`)
    console.log(`   - Videos: ${progressRes.data.lessons.progress}%`)
    console.log(`   - Quizzes: ${progressRes.data.quizzes.progress}%`)
    console.log(`   - Assignments: ${progressRes.data.assignments.progress}%`)
    console.log(`   - Overall: ${progressRes.data.overallProgress}%\n`)

    // Step 5: Generate certificate
    console.log('5️⃣ Generating certificate...')
    const certRes = await axios.post(
      `${API_URL}/api/certificates/generate/${courseId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    console.log(`✅ Certificate generated!`)
    console.log(`   - Certificate ID: ${certRes.data.certificate.id}`)
    console.log(`   - Student: ${certRes.data.certificate.studentName}`)
    console.log(`   - Course: ${certRes.data.certificate.courseName}`)
    console.log(`   - Certificate #: ${certRes.data.certificate.certificateNumber}\n`)

    console.log('🎉 SUCCESS! Certificate is ready!')
    console.log(`\n📱 Now go to: http://localhost:5173/my-learning`)
    console.log(`   You should see the certificate button on the course card!`)

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message)
  }
}

testCertificate()
