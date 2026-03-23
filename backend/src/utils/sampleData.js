import { db } from '../firebase.js'

/**
 * Initialize sample data for demo purposes
 */
export const initializeSampleData = async () => {
  try {
    // Check if demo course already exists
    const coursesSnapshot = await db.collection('courses').limit(1).get()
    if (!coursesSnapshot.empty) {
      console.log('Sample data already exists')
      return
    }

    console.log('Initializing sample data...')

    // Create demo course
    const courseRef = await db.collection('courses').add({
      title: 'React for Beginners',
      description: 'Learn React from scratch with practical examples and projects',
      category: 'Frontend Development',
      content: 'Complete guide to React fundamentals including components, hooks, and state management',
      duration: '4 weeks',
      price: 499,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      instructorId: 'demo-instructor',
      instructorName: 'React Master',
      studentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const courseId = courseRef.id

    // Create sections
    const section1Ref = await db.collection('sections').add({
      courseId,
      title: 'Getting Started',
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const section2Ref = await db.collection('sections').add({
      courseId,
      title: 'Core Concepts',
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Create lessons for section 1
    await db.collection('lessons').add({
      courseId,
      sectionId: section1Ref.id,
      title: 'Intro to React',
      description: 'Introduction to React and why you should learn it',
      youtubeUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
      videoId: 'bMknfKXIFA8',
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await db.collection('lessons').add({
      courseId,
      sectionId: section1Ref.id,
      title: 'React Components',
      description: 'Understanding React components and JSX',
      youtubeUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
      videoId: 'SqcY0GlETPk',
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Create lessons for section 2
    await db.collection('lessons').add({
      courseId,
      sectionId: section2Ref.id,
      title: 'React Hooks',
      description: 'Deep dive into React Hooks - useState, useEffect, and more',
      youtubeUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
      videoId: 'O6P86uwfdR0',
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await db.collection('lessons').add({
      courseId,
      sectionId: section2Ref.id,
      title: 'State Management',
      description: 'Managing state in React applications',
      youtubeUrl: 'https://www.youtube.com/watch?v=35lXWvCuM8o',
      videoId: '35lXWvCuM8o',
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log('Sample data initialized successfully!')
    console.log(`Course ID: ${courseId}`)
  } catch (error) {
    console.error('Error initializing sample data:', error)
  }
}
