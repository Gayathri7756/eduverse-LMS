import { GoogleGenerativeAI } from '@google/generative-ai'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
let genAI = null

if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
}

/**
 * Get AI tutor response for a question about a course
 * @param {string} courseTitle - Course title
 * @param {string} question - Student question
 * @returns {Promise<string>} AI response
 */
export const getAITutorResponse = async (courseTitle, question) => {
  try {
    if (!genAI) {
      return 'AI tutor is not configured. Please add GEMINI_API_KEY to environment variables.'
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `You are an expert instructor teaching "${courseTitle}".
A student asked: "${question}"

Provide a clear, concise explanation suitable for a beginner. Use simple language with examples if helpful.
Keep the response to 2-3 paragraphs maximum.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Gemini API error:', error.message)
    return 'Sorry, I could not generate a response. Please try again.'
  }
}

/**
 * Generate course recommendations based on current course
 * @param {string} courseTitle - Current course title
 * @param {string} category - Course category
 * @returns {Promise<Array>} Array of recommended course titles
 */
export const generateCourseRecommendations = async (courseTitle, category) => {
  try {
    if (!genAI) {
      return []
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `A student is learning "${courseTitle}" in the "${category}" category.
Suggest 5 related courses that would be good next steps for learning progression.
Return ONLY the course titles, one per line, without numbering or extra text.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const recommendations = response
      .text()
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .slice(0, 5)

    return recommendations
  } catch (error) {
    console.error('Gemini recommendations error:', error.message)
    return []
  }
}

/**
 * Generate a complete course structure from a topic
 * @param {string} topic - Course topic
 * @param {string} difficulty - Difficulty level (Beginner, Intermediate, Advanced)
 * @returns {Promise<Object>} Course structure with title, description, sections
 */
export const generateCourseStructure = async (topic, difficulty = 'Beginner') => {
  try {
    if (!genAI) {
      return null
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `Create a structured online course for the topic: "${topic}" at ${difficulty} level.

Return a JSON object with this exact structure:
{
  "title": "Course Title",
  "description": "Brief course description",
  "sections": [
    {
      "title": "Section Title",
      "lessons": ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"]
    }
  ]
}

Create 4 sections with 4 lessons each. Make it practical and comprehensive.
Return ONLY valid JSON, no markdown or extra text.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const jsonText = response.text()

    // Extract JSON from response
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not parse JSON response')
    }

    const courseData = JSON.parse(jsonMatch[0])
    return courseData
  } catch (error) {
    console.error('Gemini course generation error:', error.message)
    return null
  }
}

/**
 * Create fallback learning path module
 */
const createFallbackModule = (topic) => {
  return {
    topic: topic,
    courseTitle: `Complete ${topic} Mastery`,
    description: `Master ${topic} from basics to advanced`,
    modules: [
      {
        name: `Getting Started with ${topic}`,
        summary: `Learn what ${topic} is and why it matters`,
        keyPoints: [
          {
            title: `What is ${topic}`,
            tutorExplanation: `${topic} is an important technology. It's used widely in industry. Learning it will help your career.`,
            videoTitle: `Introduction to ${topic}`,
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' introduction')}`
          },
          {
            title: `Why ${topic} Matters`,
            tutorExplanation: `${topic} is important because many companies use it. It solves real problems. It's a valuable skill.`,
            videoTitle: `Why learn ${topic}`,
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('why learn ' + topic)}`
          },
          {
            title: `Prerequisites`,
            tutorExplanation: `You should have basic computer knowledge. Understanding programming helps. You need a computer with internet.`,
            videoTitle: `Getting started with ${topic}`,
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' getting started')}`
          }
        ],
        studyMaterial: `${topic} is an important skill. This module introduces you to the basics.`
      },
      {
        name: 'Basic Concepts',
        summary: 'Understand the fundamental concepts',
        keyPoints: [
          {
            title: 'Concept 1',
            tutorExplanation: 'This is the first fundamental concept. It forms the foundation. Understanding this is crucial.',
            videoTitle: 'Understanding the basics',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' basics')}`
          },
          {
            title: 'Concept 2',
            tutorExplanation: 'This is the second fundamental concept. It builds on the first. Together they form the core.',
            videoTitle: 'Fundamentals explained',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' fundamentals')}`
          },
          {
            title: 'Concept 3',
            tutorExplanation: 'This is the third fundamental concept. It shows how concepts work together. This completes the foundation.',
            videoTitle: 'Core principles',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' core concepts')}`
          }
        ],
        studyMaterial: 'Learn the core concepts that form the foundation.'
      },
      {
        name: 'Setup and Installation',
        summary: 'Set up your environment',
        keyPoints: [
          {
            title: 'System Requirements',
            tutorExplanation: 'You need a computer with 2GB RAM. Any modern OS works. Internet connection is required.',
            videoTitle: 'System requirements',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' system requirements')}`
          },
          {
            title: 'Installation',
            tutorExplanation: 'Download from the official website. Run the installer. Follow the setup wizard.',
            videoTitle: 'How to install',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('how to install ' + topic)}`
          },
          {
            title: 'Verification',
            tutorExplanation: 'Open terminal and run the verification command. You should see the version. If error, reinstall.',
            videoTitle: 'Verify installation',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' installation verification')}`
          }
        ],
        studyMaterial: 'Follow the setup guide to install.'
      },
      {
        name: 'Practical Examples',
        summary: 'Apply concepts with real examples',
        keyPoints: [
          {
            title: 'Example 1',
            tutorExplanation: 'Create a simple program. This shows the basics. Run it and see the output.',
            videoTitle: 'Practical example',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' example')}`
          },
          {
            title: 'Example 2',
            tutorExplanation: 'Build on the first example. Add more features. Experiment with different values.',
            videoTitle: 'Hands-on tutorial',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' tutorial')}`
          },
          {
            title: 'Best Practices',
            tutorExplanation: 'Write clean code. Use meaningful names. Add comments. Test frequently.',
            videoTitle: 'Best practices',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' best practices')}`
          }
        ],
        studyMaterial: 'Learn how to apply concepts in real scenarios.'
      },
      {
        name: 'Advanced Topics',
        summary: 'Master advanced concepts',
        keyPoints: [
          {
            title: 'Advanced Technique 1',
            tutorExplanation: 'This advanced technique is used by professionals. It solves complex problems. Learn when to use it.',
            videoTitle: 'Advanced techniques',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' advanced')}`
          },
          {
            title: 'Advanced Technique 2',
            tutorExplanation: 'Another advanced technique for optimization. It improves performance. Practice using it.',
            videoTitle: 'Design patterns',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' design patterns')}`
          },
          {
            title: 'Projects',
            tutorExplanation: 'Build a real project to master the skills. Start small. Gradually increase complexity.',
            videoTitle: 'Project ideas',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' projects')}`
          }
        ],
        studyMaterial: 'Dive deeper into advanced topics.'
      }
    ]
  }
}

/**
 * Generate learning path from syllabus
 * @param {string} syllabus - Syllabus text or topics
 * @returns {Promise<Array>} Array of learning paths, one for each topic
 */
export const generateLearningPath = async (syllabus) => {
  try {
    // Split topics by comma or newline
    const topics = syllabus.split(/[,\n]/).map(t => t.trim()).filter(t => t.length > 0)
    
    if (topics.length === 0) {
      return []
    }

    const learningPaths = []

    // If no API key, use fallback for all topics
    if (!genAI) {
      for (const topic of topics) {
        learningPaths.push(createFallbackModule(topic))
      }
      return learningPaths
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Generate a separate learning path for EACH topic
    for (const topic of topics) {
      try {
        const prompt = `Create a learning path for: "${topic}"
Return ONLY valid JSON with this structure (no markdown, no extra text):
{
  "topic": "${topic}",
  "courseTitle": "Complete ${topic} Mastery",
  "description": "Master ${topic}",
  "modules": [
    {
      "name": "Getting Started",
      "summary": "Learn what ${topic} is",
      "keyPoints": [
        {"title": "What is ${topic}", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Intro", "videoUrl": "https://www.youtube.com/results?search_query=${topic}"},
        {"title": "Why it matters", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Why", "videoUrl": "https://www.youtube.com/results?search_query=why+${topic}"},
        {"title": "Prerequisites", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Start", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+start"}
      ],
      "studyMaterial": "Overview"
    },
    {
      "name": "Basic Concepts",
      "summary": "Fundamentals",
      "keyPoints": [
        {"title": "Concept 1", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Basics", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+basics"},
        {"title": "Concept 2", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Fundamentals", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+fundamentals"},
        {"title": "Concept 3", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Core", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+core"}
      ],
      "studyMaterial": "Concepts"
    },
    {
      "name": "Setup",
      "summary": "Installation",
      "keyPoints": [
        {"title": "Requirements", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Requirements", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+requirements"},
        {"title": "Install", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Install", "videoUrl": "https://www.youtube.com/results?search_query=install+${topic}"},
        {"title": "Verify", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Verify", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+verify"}
      ],
      "studyMaterial": "Setup"
    },
    {
      "name": "Practice",
      "summary": "Examples",
      "keyPoints": [
        {"title": "Example 1", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Example", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+example"},
        {"title": "Example 2", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Tutorial", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+tutorial"},
        {"title": "Best Practices", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Best", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+best"}
      ],
      "studyMaterial": "Practice"
    },
    {
      "name": "Advanced",
      "summary": "Advanced topics",
      "keyPoints": [
        {"title": "Technique 1", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Advanced", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+advanced"},
        {"title": "Technique 2", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Patterns", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+patterns"},
        {"title": "Projects", "tutorExplanation": "Explain in 2 sentences", "videoTitle": "Projects", "videoUrl": "https://www.youtube.com/results?search_query=${topic}+projects"}
      ],
      "studyMaterial": "Advanced"
    }
  ]
}`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const jsonText = response.text().trim()

        try {
          const pathData = JSON.parse(jsonText)
          learningPaths.push(pathData)
        } catch (parseError) {
          console.error(`JSON parse error for ${topic}:`, parseError.message)
          learningPaths.push(createFallbackModule(topic))
        }
      } catch (err) {
        console.error(`Error generating path for ${topic}:`, err.message)
        learningPaths.push(createFallbackModule(topic))
      }
    }

    return learningPaths.length > 0 ? learningPaths : []
  } catch (error) {
    console.error('Gemini learning path error:', error.message)
    return []
  }
}

export default {
  getAITutorResponse,
  generateCourseRecommendations,
  generateCourseStructure,
  generateLearningPath,
}
