import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { db } from '../utils/inMemoryDb.js'
import { getAITutorResponse } from '../utils/geminiApi.js'

const router = express.Router()

// AI Chat endpoint for voice assistant
router.post('/chat', async (req, res) => {
  try {
    const { message, courseTitle } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    console.log('User message:', message)

    // If Gemini is configured, give a real helpful answer.
    // We reuse the AI tutor helper so answers are concise + beginner-friendly.
    const responseText = await getAITutorResponse(courseTitle || 'General Learning', message)

    res.json({
      success: true,
      response: responseText
    })
  } catch (error) {
    console.error('Chat error:', error)
    
    res.json({
      success: true,
      response: 'I\'m here to help. What would you like to know?'
    })
  }
})

// Generate AI Study Plan
router.post('/study-plan', async (req, res) => {
  try {
    const { goal, studyHoursPerDay, goalDurationMonths, userId } = req.body

    if (!goal || !studyHoursPerDay || !goalDurationMonths) {
      return res.status(400).json({ error: 'Missing required fields: goal, studyHoursPerDay, goalDurationMonths' })
    }

    console.log('Generating study plan for:', goal)

    // Generate study plan based on goal
    const plan = generateStudyPlan(goal, studyHoursPerDay, goalDurationMonths)

    res.json({
      success: true,
      plan,
      message: 'Study plan generated successfully'
    })
  } catch (error) {
    console.error('Study plan generation error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Generate study plan logic
function generateStudyPlan(goal, studyHoursPerDay, goalDurationMonths) {
  const plans = {
    'Machine Learning': {
      weeklyPlan: [
        {
          week: 'Week 1: Python Fundamentals',
          topics: [
            { title: 'Python Basics', description: 'Variables, data types, operators' },
            { title: 'Control Flow', description: 'If-else, loops, functions' }
          ],
          practiceTask: 'Write 5 Python programs covering loops and functions',
          youtubeTopics: [
            'Python for Beginners - Crash Course',
            'Python Functions and Loops Tutorial'
          ]
        },
        {
          week: 'Week 2: NumPy & Pandas',
          topics: [
            { title: 'NumPy Arrays', description: 'Array operations, indexing, slicing' },
            { title: 'Pandas DataFrames', description: 'Data manipulation and analysis' }
          ],
          practiceTask: 'Load a CSV file and perform data cleaning operations',
          youtubeTopics: [
            'NumPy Tutorial for Data Science',
            'Pandas Complete Tutorial'
          ]
        },
        {
          week: 'Week 3: Statistics & Probability',
          topics: [
            { title: 'Descriptive Statistics', description: 'Mean, median, standard deviation' },
            { title: 'Probability Distributions', description: 'Normal, binomial distributions' }
          ],
          practiceTask: 'Analyze a dataset and create statistical visualizations',
          youtubeTopics: [
            'Statistics for Data Science',
            'Probability Explained'
          ]
        },
        {
          week: 'Week 4: Linear Regression',
          topics: [
            { title: 'Linear Regression Basics', description: 'Theory and implementation' },
            { title: 'Model Evaluation', description: 'R-squared, MSE, RMSE' }
          ],
          practiceTask: 'Build a linear regression model on a real dataset',
          youtubeTopics: [
            'Linear Regression from Scratch',
            'Scikit-learn Linear Regression'
          ]
        }
      ],
      summary: 'This 4-week plan covers the fundamentals of Machine Learning. You\'ll learn Python, data manipulation, statistics, and build your first ML model. With 2 hours daily, you\'ll have a solid foundation to explore advanced ML topics.'
    },
    'Web Development': {
      weeklyPlan: [
        {
          week: 'Week 1: HTML & CSS Basics',
          topics: [
            { title: 'HTML Structure', description: 'Semantic HTML, forms, accessibility' },
            { title: 'CSS Styling', description: 'Selectors, flexbox, grid, responsive design' }
          ],
          practiceTask: 'Build a responsive portfolio website with HTML & CSS',
          youtubeTopics: [
            'HTML & CSS Complete Course',
            'Responsive Web Design Tutorial'
          ]
        },
        {
          week: 'Week 2: JavaScript Fundamentals',
          topics: [
            { title: 'JavaScript Basics', description: 'Variables, functions, objects, arrays' },
            { title: 'DOM Manipulation', description: 'Selecting, modifying, event handling' }
          ],
          practiceTask: 'Create interactive web pages with JavaScript',
          youtubeTopics: [
            'JavaScript for Beginners',
            'DOM Manipulation Tutorial'
          ]
        },
        {
          week: 'Week 3: React Basics',
          topics: [
            { title: 'React Components', description: 'Functional components, JSX, props' },
            { title: 'React Hooks', description: 'useState, useEffect, custom hooks' }
          ],
          practiceTask: 'Build a todo app with React',
          youtubeTopics: [
            'React for Beginners',
            'React Hooks Tutorial'
          ]
        },
        {
          week: 'Week 4: Backend Basics',
          topics: [
            { title: 'Node.js & Express', description: 'Server setup, routing, middleware' },
            { title: 'REST APIs', description: 'Creating and consuming APIs' }
          ],
          practiceTask: 'Build a simple REST API with Express',
          youtubeTopics: [
            'Node.js & Express Tutorial',
            'REST API Design'
          ]
        }
      ],
      summary: 'This 4-week web development plan takes you from HTML/CSS basics to building full-stack applications. You\'ll learn frontend technologies (HTML, CSS, JavaScript, React) and backend basics (Node.js, Express). Perfect for becoming a web developer.'
    },
    'Python Programming': {
      weeklyPlan: [
        {
          week: 'Week 1: Python Basics',
          topics: [
            { title: 'Syntax & Data Types', description: 'Variables, strings, numbers, booleans' },
            { title: 'Operators', description: 'Arithmetic, comparison, logical operators' }
          ],
          practiceTask: 'Write 10 Python programs using basic syntax',
          youtubeTopics: [
            'Python Basics for Beginners',
            'Python Data Types'
          ]
        },
        {
          week: 'Week 2: Control Flow',
          topics: [
            { title: 'Conditionals', description: 'If-else statements, nested conditions' },
            { title: 'Loops', description: 'For loops, while loops, loop control' }
          ],
          practiceTask: 'Solve 15 programming problems using loops and conditionals',
          youtubeTopics: [
            'Python If-Else Tutorial',
            'Python Loops Explained'
          ]
        },
        {
          week: 'Week 3: Functions & Modules',
          topics: [
            { title: 'Functions', description: 'Defining, calling, parameters, return values' },
            { title: 'Modules', description: 'Importing, creating custom modules' }
          ],
          practiceTask: 'Create a module with 5 reusable functions',
          youtubeTopics: [
            'Python Functions Tutorial',
            'Python Modules and Packages'
          ]
        },
        {
          week: 'Week 4: Object-Oriented Programming',
          topics: [
            { title: 'Classes & Objects', description: 'Defining classes, creating instances' },
            { title: 'Inheritance & Polymorphism', description: 'OOP concepts' }
          ],
          practiceTask: 'Build a class hierarchy for a real-world scenario',
          youtubeTopics: [
            'Python OOP Tutorial',
            'Classes and Objects in Python'
          ]
        }
      ],
      summary: 'This 4-week Python programming plan covers all fundamentals. You\'ll master syntax, control flow, functions, and OOP. By the end, you\'ll be able to write clean, professional Python code.'
    },
    'Data Science': {
      weeklyPlan: [
        {
          week: 'Week 1: Python & Data Tools',
          topics: [
            { title: 'Python Basics', description: 'Essential Python for data science' },
            { title: 'NumPy & Pandas', description: 'Data manipulation libraries' }
          ],
          practiceTask: 'Load and explore a real dataset',
          youtubeTopics: [
            'Python for Data Science',
            'NumPy and Pandas Basics'
          ]
        },
        {
          week: 'Week 2: Data Visualization',
          topics: [
            { title: 'Matplotlib', description: 'Creating plots and charts' },
            { title: 'Seaborn', description: 'Statistical data visualization' }
          ],
          practiceTask: 'Create 10 different visualizations from a dataset',
          youtubeTopics: [
            'Data Visualization with Matplotlib',
            'Seaborn Tutorial'
          ]
        },
        {
          week: 'Week 3: Statistical Analysis',
          topics: [
            { title: 'Descriptive Statistics', description: 'Summarizing data' },
            { title: 'Hypothesis Testing', description: 'Statistical inference' }
          ],
          practiceTask: 'Perform statistical analysis on a real dataset',
          youtubeTopics: [
            'Statistics for Data Science',
            'Hypothesis Testing Explained'
          ]
        },
        {
          week: 'Week 4: Machine Learning Intro',
          topics: [
            { title: 'Supervised Learning', description: 'Classification and regression' },
            { title: 'Model Evaluation', description: 'Metrics and validation' }
          ],
          practiceTask: 'Build and evaluate a machine learning model',
          youtubeTopics: [
            'Machine Learning Basics',
            'Scikit-learn Tutorial'
          ]
        }
      ],
      summary: 'This 4-week data science plan teaches you to work with data professionally. You\'ll learn data manipulation, visualization, statistical analysis, and machine learning basics. Essential skills for any data scientist.'
    },
    'React.js': {
      weeklyPlan: [
        {
          week: 'Week 1: React Fundamentals',
          topics: [
            { title: 'Components & JSX', description: 'Functional components, JSX syntax' },
            { title: 'Props & State', description: 'Passing data, managing component state' }
          ],
          practiceTask: 'Build 5 reusable React components',
          youtubeTopics: [
            'React for Beginners',
            'React Components and Props'
          ]
        },
        {
          week: 'Week 2: React Hooks',
          topics: [
            { title: 'useState Hook', description: 'Managing component state' },
            { title: 'useEffect Hook', description: 'Side effects and lifecycle' }
          ],
          practiceTask: 'Build a counter and todo app with hooks',
          youtubeTopics: [
            'React Hooks Complete Guide',
            'useState and useEffect Tutorial'
          ]
        },
        {
          week: 'Week 3: Advanced Hooks & Context',
          topics: [
            { title: 'useContext', description: 'Global state management' },
            { title: 'Custom Hooks', description: 'Creating reusable logic' }
          ],
          practiceTask: 'Build an app with context API',
          youtubeTopics: [
            'React Context API',
            'Custom Hooks Tutorial'
          ]
        },
        {
          week: 'Week 4: Routing & API Integration',
          topics: [
            { title: 'React Router', description: 'Multi-page applications' },
            { title: 'API Integration', description: 'Fetching data from APIs' }
          ],
          practiceTask: 'Build a multi-page app that fetches data from an API',
          youtubeTopics: [
            'React Router Tutorial',
            'Fetching Data in React'
          ]
        }
      ],
      summary: 'This 4-week React.js plan makes you proficient in modern React development. You\'ll master components, hooks, state management, and API integration. Perfect for building professional web applications.'
    }
  }

  return plans[goal] || plans['Machine Learning']
}

export default router
