/**
 * In-memory database for development/testing
 * Used when Firebase is not configured
 */

import { generateComprehensiveCourses } from './coursesData.js'
import { quizQuestionsBank, getGenericQuizQuestions } from './quizQuestions.js'
import { loadPersistedData, savePersistedData, startAutoSave } from './persistence.js'

// Main database object
export const db = {
  courses: [],
  sections: [],
  lessons: [],
  enrollments: [],
  users: [],
  projects: [],
  studyPlans: [],
  quizzes: [],
  assignments: [],
  quizResults: [],
  submissions: [],
  watchedLessons: [],
  certificates: []
}

// Initialize with sample data
export const initializeInMemoryDb = () => {
  db.courses = generateComprehensiveCourses()

  // Try to load persisted data first
  const persistedData = loadPersistedData()
  if (persistedData) {
    console.log('✅ Loading persisted data from file')
    db.enrollments = persistedData.enrollments || []
    db.watchedLessons = persistedData.watchedLessons || []
    db.quizResults = persistedData.quizResults || []
    db.submissions = persistedData.submissions || []
    db.certificates = persistedData.certificates || []
  }

  // Create sections and lessons for ALL courses
  const courseIds = db.courses.map(c => c.id)
  
  courseIds.forEach((courseId, courseIndex) => {
    // Create 2 sections per course
    const section1Id = `section-${courseId}-1`
    const section2Id = `section-${courseId}-2`
    
    db.sections.push(
      {
        id: section1Id,
        courseId,
        title: 'Getting Started',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: section2Id,
        courseId,
        title: 'Core Concepts',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    )
    
    // Create 5 lessons per course (videos)
    const videoIds = [
      'bMknfKXIFA8', 'SqcY0GlETPk', 'O6P86uwfdR0', '35lXWvCuM8o', 'W6NZfCO5SIk'
    ]
    const videoTitles = [
      'Introduction & Fundamentals',
      'Core Concepts & Basics',
      'Advanced Techniques',
      'Best Practices & Patterns',
      'Real-World Projects'
    ]
    const videoDescriptions = [
      'Learn the fundamentals and get started',
      'Understand core concepts and principles',
      'Master advanced techniques and features',
      'Follow best practices and design patterns',
      'Build real-world projects and applications'
    ]
    
    for (let i = 0; i < 5; i++) {
      db.lessons.push({
        id: `lesson-${courseId}-${i + 1}`,
        courseId,
        sectionId: i < 3 ? section1Id : section2Id,
        title: `${i + 1}. ${videoTitles[i]}`,
        description: videoDescriptions[i],
        youtubeUrl: `https://www.youtube.com/watch?v=${videoIds[i]}`,
        videoId: videoIds[i],
        order: i < 3 ? i + 1 : i - 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  })

  // Initialize quizzes for ALL courses (4-5 quizzes per course)
  db.quizzes = []
  courseIds.forEach((courseId, idx) => {
    const course = db.courses.find(c => c.id === courseId)
    const quizCount = idx % 2 === 0 ? 5 : 4 // Alternate between 5 and 4 quizzes
    
    // Get questions for this course
    let courseQuestions = quizQuestionsBank[courseId]
    if (!courseQuestions) {
      courseQuestions = {
        title: course.title,
        quizzes: getGenericQuizQuestions(course.title)
      }
    }
    
    // Create quizzes with valid questions
    for (let q = 0; q < quizCount && q < courseQuestions.quizzes.length; q++) {
      const quizData = courseQuestions.quizzes[q]
      
      db.quizzes.push({
        id: `quiz-${courseId}-${q + 1}`,
        courseId,
        title: quizData.title,
        description: `Test your knowledge on ${quizData.title.toLowerCase()}`,
        order: q + 1,
        timeLimit: 30 + (q * 5), // 30, 35, 40, 45, 50 minutes
        dueDate: new Date(Date.now() + (7 * (q + 1)) * 24 * 60 * 60 * 1000).toISOString(),
        questions: quizData.questions.map((q, idx) => ({
          id: `q${idx + 1}`,
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer
        }))
      })
    }
  })

  // Initialize assignments for ALL courses (4-5 assignments per course)
  db.assignments = []
  courseIds.forEach((courseId, idx) => {
    const assignmentCount = idx % 2 === 0 ? 5 : 4 // Alternate between 5 and 4 assignments
    
    for (let a = 0; a < assignmentCount; a++) {
      const assignmentTitles = [
        'Practical Project 1',
        'Practical Project 2',
        'Practical Project 3',
        'Capstone Project',
        'Advanced Challenge'
      ]
      
      db.assignments.push({
        id: `assignment-${courseId}-${a + 1}`,
        courseId,
        title: `${a + 1}. ${assignmentTitles[a]}`,
        description: `Complete ${assignmentTitles[a].toLowerCase()} to demonstrate your understanding`,
        instructions: `
          1. Understand the requirements
          2. Plan your approach
          3. Implement the solution
          4. Test thoroughly
          5. Submit your work
          6. Prepare for feedback
        `,
        dueDate: new Date(Date.now() + (7 * (a + 1)) * 24 * 60 * 60 * 1000).toISOString(),
        order: a + 1,
        maxScore: 100,
        timeLimit: 'No time limit - Complete by due date'
      })
    }
  })

  console.log(`✅ In-memory database initialized with ${db.courses.length} courses, ${db.quizzes.length} quizzes, and ${db.assignments.length} assignments`)
  
  // Start auto-save every 5 seconds
  startAutoSave(db, 5000)
}

// Export inMemoryDb for direct access
export const inMemoryDb = db

// Course operations
export const getCourses = () => db.courses
export const getCourseById = (id) => db.courses.find((c) => c.id === id)
export const addCourse = (course) => {
  const newCourse = { ...course, id: `course-${Date.now()}` }
  db.courses.push(newCourse)
  return newCourse
}

// Section operations
export const getSectionsByCourseId = (courseId) => db.sections.filter((s) => s.courseId === courseId)
export const addSection = (section) => {
  const newSection = { ...section, id: `section-${Date.now()}` }
  db.sections.push(newSection)
  return newSection
}

// Lesson operations
export const getLessonsBySectionId = (sectionId) => db.lessons.filter((l) => l.sectionId === sectionId)
export const addLesson = (lesson) => {
  const newLesson = { ...lesson, id: `lesson-${Date.now()}` }
  db.lessons.push(newLesson)
  return newLesson
}

// Enrollment operations
export const getEnrollments = () => db.enrollments
export const addEnrollment = (enrollment) => {
  const newEnrollment = { ...enrollment, id: `enrollment-${Date.now()}` }
  db.enrollments.push(newEnrollment)
  return newEnrollment
}

// User operations
export const getUsers = () => db.users
export const addUser = (user) => {
  const newUser = { ...user, id: `user-${Date.now()}` }
  db.users.push(newUser)
  return newUser
}

// Project operations
export const getProjects = () => db.projects
export const addProject = (project) => {
  const newProject = { ...project, id: `project-${Date.now()}` }
  db.projects.push(newProject)
  return newProject
}
