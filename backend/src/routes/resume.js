import express from 'express'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// In-memory storage for resumes
let resumes = []

// Get user's resume
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid
    let userResume = resumes.find(r => r.userId === userId)

    if (!userResume) {
      // Create default resume if doesn't exist
      userResume = {
        userId,
        name: req.user.displayName || 'Your Name',
        email: req.user.email || 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        location: 'Your City, Your Country',
        summary: 'Passionate learner with expertise in modern technologies.',
        education: [],
        experience: [],
        skills: [],
        projects: [],
        certificates: [],
        completedCourses: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      resumes.push(userResume)
    }

    res.json({ success: true, resume: userResume })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update resume
router.put('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid
    const { name, email, phone, location, summary, education, experience, skills, projects, certificates } = req.body

    let userResume = resumes.find(r => r.userId === userId)

    if (!userResume) {
      userResume = {
        userId,
        name,
        email,
        phone,
        location,
        summary,
        education: education || [],
        experience: experience || [],
        skills: skills || [],
        projects: projects || [],
        certificates: certificates || [],
        completedCourses: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      resumes.push(userResume)
    } else {
      userResume.name = name || userResume.name
      userResume.email = email || userResume.email
      userResume.phone = phone || userResume.phone
      userResume.location = location || userResume.location
      userResume.summary = summary || userResume.summary
      if (education) userResume.education = education
      if (experience) userResume.experience = experience
      if (skills) userResume.skills = skills
      if (projects) userResume.projects = projects
      if (certificates) userResume.certificates = certificates
      userResume.updatedAt = new Date()
    }

    res.json({ success: true, resume: userResume, message: 'Resume updated successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add course to resume
router.post('/add-course', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid
    const { course, skills } = req.body

    let userResume = resumes.find(r => r.userId === userId)

    if (!userResume) {
      userResume = {
        userId,
        name: req.user.displayName || 'Your Name',
        email: req.user.email || 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        location: 'Your City, Your Country',
        summary: 'Passionate learner with expertise in modern technologies.',
        education: [],
        experience: [],
        skills: skills || [],
        projects: [],
        certificates: [],
        completedCourses: [course],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      resumes.push(userResume)
    } else {
      // Add course if not already present
      if (!userResume.completedCourses.find(c => c.id === course.id)) {
        userResume.completedCourses.push(course)
      }

      // Add skills if not already present
      if (skills && Array.isArray(skills)) {
        skills.forEach(skill => {
          if (!userResume.skills.includes(skill)) {
            userResume.skills.push(skill)
          }
        })
      }

      // Add project entry
      const project = {
        title: `${course.title} Project`,
        description: `Completed comprehensive ${course.title} course with hands-on projects and real-world applications.`,
        technologies: skills || [],
        date: new Date().toLocaleDateString()
      }

      if (!userResume.projects.find(p => p.title === project.title)) {
        userResume.projects.push(project)
      }

      // Add certificate entry
      const certificate = {
        name: `${course.title} Certificate`,
        issuer: 'EduVerse',
        date: new Date().toLocaleDateString(),
        credentialUrl: '#'
      }

      if (!userResume.certificates.find(c => c.name === certificate.name)) {
        userResume.certificates.push(certificate)
      }

      userResume.updatedAt = new Date()
    }

    res.json({ success: true, resume: userResume, message: 'Course added to resume' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete course from resume
router.delete('/remove-course/:courseId', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid
    const courseId = req.params.courseId

    const userResume = resumes.find(r => r.userId === userId)

    if (!userResume) {
      return res.status(404).json({ error: 'Resume not found' })
    }

    // Remove course
    userResume.completedCourses = userResume.completedCourses.filter(c => c.id !== courseId)

    // Remove associated project and certificate
    const courseTitle = req.body.courseTitle
    if (courseTitle) {
      userResume.projects = userResume.projects.filter(p => p.title !== `${courseTitle} Project`)
      userResume.certificates = userResume.certificates.filter(c => c.name !== `${courseTitle} Certificate`)
    }

    userResume.updatedAt = new Date()

    res.json({ success: true, resume: userResume, message: 'Course removed from resume' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
