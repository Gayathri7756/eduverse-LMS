import express from 'express'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/**
 * Comprehensive learning path generator
 * Returns structured JSON with modules, topics, subtopics, resources, and time estimates
 * POST /api/learning-path/generate
 * Body: { subject }
 */
router.post('/generate', verifyToken, async (req, res) => {
  try {
    const { subject } = req.body

    if (!subject || subject.trim().length === 0) {
      return res.status(400).json({ error: 'Subject is required' })
    }

    const learningPath = generateComprehensivePath(subject.trim())

    if (!learningPath || !learningPath.modules || learningPath.modules.length === 0) {
      return res.status(500).json({ error: 'Failed to generate learning path' })
    }

    res.json({
      success: true,
      data: learningPath
    })
  } catch (error) {
    console.error('Learning path generation error:', error)
    res.status(500).json({ error: error.message })
  }
})

/**
 * Generate comprehensive learning path with all required fields
 */
function generateComprehensivePath(subject) {
  const paths = {
    'python': {
      subject: 'Python Programming',
      modules: [
        {
          title: 'Fundamentals',
          topics: [
            {
              name: 'Variables & Data Types',
              subtopics: ['Strings', 'Integers', 'Floats', 'Booleans', 'Lists', 'Tuples', 'Dictionaries'],
              resources: [
                'https://docs.python.org/3/tutorial/introduction.html',
                'https://www.w3schools.com/python/python_datatypes.asp',
                'https://realpython.com/python-data-types/'
              ],
              time: '2 days'
            },
            {
              name: 'Operators & Expressions',
              subtopics: ['Arithmetic', 'Comparison', 'Logical', 'Bitwise', 'Assignment'],
              resources: [
                'https://docs.python.org/3/reference/lexical_analysis.html#operators',
                'https://www.w3schools.com/python/python_operators.asp'
              ],
              time: '1 day'
            },
            {
              name: 'Input & Output',
              subtopics: ['print()', 'input()', 'String Formatting', 'File I/O'],
              resources: [
                'https://docs.python.org/3/tutorial/inputoutput.html',
                'https://www.w3schools.com/python/python_input.asp'
              ],
              time: '1 day'
            }
          ]
        },
        {
          title: 'Control Flow',
          topics: [
            {
              name: 'Conditionals',
              subtopics: ['if statements', 'elif', 'else', 'Nested conditions', 'Ternary operator'],
              resources: [
                'https://docs.python.org/3/tutorial/controlflow.html',
                'https://www.w3schools.com/python/python_conditions.asp'
              ],
              time: '1.5 days'
            },
            {
              name: 'Loops',
              subtopics: ['for loops', 'while loops', 'break', 'continue', 'List comprehension'],
              resources: [
                'https://docs.python.org/3/tutorial/controlflow.html#for-statements',
                'https://www.w3schools.com/python/python_for_loops.asp'
              ],
              time: '2 days'
            }
          ]
        },
        {
          title: 'Functions & Modules',
          topics: [
            {
              name: 'Function Basics',
              subtopics: ['Defining functions', 'Parameters', 'Return values', 'Default arguments', 'Keyword arguments'],
              resources: [
                'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
                'https://www.w3schools.com/python/python_functions.asp'
              ],
              time: '2 days'
            },
            {
              name: 'Advanced Functions',
              subtopics: ['*args', '**kwargs', 'Lambda', 'Decorators', 'Closures'],
              resources: [
                'https://realpython.com/args-and-kwargs-in-python/',
                'https://realpython.com/primer-on-python-decorators/'
              ],
              time: '2.5 days'
            },
            {
              name: 'Modules & Packages',
              subtopics: ['Importing modules', 'Creating modules', 'Package structure', 'pip'],
              resources: [
                'https://docs.python.org/3/tutorial/modules.html',
                'https://www.w3schools.com/python/python_modules.asp'
              ],
              time: '1.5 days'
            }
          ]
        },
        {
          title: 'Object-Oriented Programming',
          topics: [
            {
              name: 'Classes & Objects',
              subtopics: ['Class definition', 'Constructors', 'Instance variables', 'Methods', 'self'],
              resources: [
                'https://docs.python.org/3/tutorial/classes.html',
                'https://www.w3schools.com/python/python_classes.asp'
              ],
              time: '2 days'
            },
            {
              name: 'Inheritance & Polymorphism',
              subtopics: ['Inheritance', 'Method overriding', 'super()', 'Multiple inheritance', 'Polymorphism'],
              resources: [
                'https://realpython.com/inheritance-composition-python/',
                'https://www.w3schools.com/python/python_inheritance.asp'
              ],
              time: '2.5 days'
            }
          ]
        }
      ]
    },
    'javascript': {
      subject: 'JavaScript Programming',
      modules: [
        {
          title: 'Fundamentals',
          topics: [
            {
              name: 'Variables & Data Types',
              subtopics: ['var, let, const', 'Strings', 'Numbers', 'Booleans', 'Arrays', 'Objects', 'null, undefined'],
              resources: [
                'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types',
                'https://www.w3schools.com/js/js_datatypes.asp'
              ],
              time: '2 days'
            },
            {
              name: 'Operators & Expressions',
              subtopics: ['Arithmetic', 'Comparison', 'Logical', 'Assignment', 'Ternary'],
              resources: [
                'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators',
                'https://www.w3schools.com/js/js_operators.asp'
              ],
              time: '1 day'
            }
          ]
        },
        {
          title: 'Control Flow',
          topics: [
            {
              name: 'Conditionals & Loops',
              subtopics: ['if/else', 'switch', 'for', 'while', 'do-while', 'break', 'continue'],
              resources: [
                'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling',
                'https://www.w3schools.com/js/js_if_else.asp'
              ],
              time: '2 days'
            }
          ]
        },
        {
          title: 'Functions & Scope',
          topics: [
            {
              name: 'Functions',
              subtopics: ['Function declaration', 'Arrow functions', 'Parameters', 'Return', 'Scope', 'Hoisting'],
              resources: [
                'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
                'https://www.w3schools.com/js/js_functions.asp'
              ],
              time: '2.5 days'
            },
            {
              name: 'Closures & Callbacks',
              subtopics: ['Closures', 'Callbacks', 'Higher-order functions', 'Function composition'],
              resources: [
                'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
                'https://realpython.com/inner-functions-what-and-why/'
              ],
              time: '2 days'
            }
          ]
        },
        {
          title: 'Asynchronous JavaScript',
          topics: [
            {
              name: 'Promises & Async/Await',
              subtopics: ['Promises', 'async/await', 'Error handling', 'Promise.all', 'Promise.race'],
              resources: [
                'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
                'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises'
              ],
              time: '2.5 days'
            }
          ]
        }
      ]
    },
    'web development': {
      subject: 'Web Development',
      modules: [
        {
          title: 'HTML & CSS Basics',
          topics: [
            {
              name: 'HTML Fundamentals',
              subtopics: ['HTML structure', 'Semantic HTML', 'Forms', 'Accessibility', 'Meta tags'],
              resources: [
                'https://developer.mozilla.org/en-US/docs/Learn/HTML',
                'https://www.w3schools.com/html/'
              ],
              time: '2 days'
            },
            {
              name: 'CSS Styling',
              subtopics: ['Selectors', 'Box model', 'Flexbox', 'Grid', 'Responsive design', 'Animations'],
              resources: [
                'https://developer.mozilla.org/en-US/docs/Learn/CSS',
                'https://www.w3schools.com/css/'
              ],
              time: '3 days'
            }
          ]
        },
        {
          title: 'JavaScript for Web',
          topics: [
            {
              name: 'DOM Manipulation',
              subtopics: ['Selecting elements', 'Modifying content', 'Event handling', 'Event delegation'],
              resources: [
                'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model',
                'https://www.w3schools.com/js/js_htmldom.asp'
              ],
              time: '2 days'
            },
            {
              name: 'Fetch & APIs',
              subtopics: ['Fetch API', 'HTTP requests', 'JSON', 'Error handling', 'CORS'],
              resources: [
                'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
                'https://www.w3schools.com/js/js_api_fetch.asp'
              ],
              time: '2 days'
            }
          ]
        },
        {
          title: 'Frontend Frameworks',
          topics: [
            {
              name: 'React Basics',
              subtopics: ['Components', 'JSX', 'Props', 'State', 'Hooks', 'Lifecycle'],
              resources: [
                'https://react.dev/learn',
                'https://www.w3schools.com/react/'
              ],
              time: '3 days'
            }
          ]
        },
        {
          title: 'Backend Basics',
          topics: [
            {
              name: 'Node.js & Express',
              subtopics: ['Node.js basics', 'Express setup', 'Routing', 'Middleware', 'Error handling'],
              resources: [
                'https://nodejs.org/en/docs/',
                'https://expressjs.com/'
              ],
              time: '2.5 days'
            }
          ]
        }
      ]
    },
    'data science': {
      subject: 'Data Science',
      modules: [
        {
          title: 'Python Fundamentals',
          topics: [
            {
              name: 'Python Basics',
              subtopics: ['Variables', 'Data types', 'Control flow', 'Functions', 'File I/O'],
              resources: [
                'https://docs.python.org/3/tutorial/',
                'https://www.w3schools.com/python/'
              ],
              time: '2 days'
            }
          ]
        },
        {
          title: 'Data Manipulation',
          topics: [
            {
              name: 'NumPy & Pandas',
              subtopics: ['NumPy arrays', 'Pandas DataFrames', 'Data cleaning', 'Data transformation', 'Merging data'],
              resources: [
                'https://numpy.org/doc/stable/user/basics.html',
                'https://pandas.pydata.org/docs/user_guide/index.html'
              ],
              time: '3 days'
            }
          ]
        },
        {
          title: 'Data Visualization',
          topics: [
            {
              name: 'Visualization Libraries',
              subtopics: ['Matplotlib', 'Seaborn', 'Plotly', 'Interactive plots', 'Dashboards'],
              resources: [
                'https://matplotlib.org/stable/tutorials/index.html',
                'https://seaborn.pydata.org/tutorial.html'
              ],
              time: '2.5 days'
            }
          ]
        },
        {
          title: 'Statistical Analysis',
          topics: [
            {
              name: 'Statistics & Probability',
              subtopics: ['Descriptive statistics', 'Probability distributions', 'Hypothesis testing', 'Correlation'],
              resources: [
                'https://www.scipy.org/doc/scipy/reference/stats.html',
                'https://en.wikipedia.org/wiki/Statistics'
              ],
              time: '3 days'
            }
          ]
        },
        {
          title: 'Machine Learning',
          topics: [
            {
              name: 'ML Algorithms',
              subtopics: ['Supervised learning', 'Unsupervised learning', 'Model evaluation', 'Feature engineering'],
              resources: [
                'https://scikit-learn.org/stable/user_guide.html',
                'https://www.coursera.org/learn/machine-learning'
              ],
              time: '4 days'
            }
          ]
        }
      ]
    },
    'machine learning': {
      subject: 'Machine Learning',
      modules: [
        {
          title: 'ML Fundamentals',
          topics: [
            {
              name: 'Core Concepts',
              subtopics: ['Supervised vs Unsupervised', 'Training/Testing', 'Overfitting', 'Regularization', 'Cross-validation'],
              resources: [
                'https://developers.google.com/machine-learning/crash-course',
                'https://www.coursera.org/learn/machine-learning'
              ],
              time: '2 days'
            }
          ]
        },
        {
          title: 'Supervised Learning',
          topics: [
            {
              name: 'Regression & Classification',
              subtopics: ['Linear regression', 'Logistic regression', 'Decision trees', 'Random forests', 'SVM'],
              resources: [
                'https://scikit-learn.org/stable/supervised_learning.html',
                'https://www.coursera.org/learn/machine-learning'
              ],
              time: '3 days'
            }
          ]
        },
        {
          title: 'Unsupervised Learning',
          topics: [
            {
              name: 'Clustering & Dimensionality',
              subtopics: ['K-means', 'Hierarchical clustering', 'PCA', 't-SNE', 'Anomaly detection'],
              resources: [
                'https://scikit-learn.org/stable/unsupervised_learning.html',
                'https://www.coursera.org/learn/machine-learning'
              ],
              time: '2.5 days'
            }
          ]
        },
        {
          title: 'Deep Learning',
          topics: [
            {
              name: 'Neural Networks',
              subtopics: ['Perceptrons', 'Backpropagation', 'CNNs', 'RNNs', 'Transformers'],
              resources: [
                'https://www.tensorflow.org/learn',
                'https://pytorch.org/tutorials/'
              ],
              time: '4 days'
            }
          ]
        }
      ]
    }
  }

  // Find matching path (case-insensitive)
  const lowerSubject = subject.toLowerCase()
  for (const [key, path] of Object.entries(paths)) {
    if (lowerSubject.includes(key) || key.includes(lowerSubject)) {
      return path
    }
  }

  // Generic fallback
  return {
    subject: subject,
    modules: [
      {
        title: 'Fundamentals',
        topics: [
          {
            name: 'Introduction',
            subtopics: ['Core concepts', 'History', 'Applications', 'Best practices'],
            resources: [
              'https://en.wikipedia.org/wiki/' + subject.replace(/\s+/g, '_'),
              'https://www.coursera.org/'
            ],
            time: '2 days'
          }
        ]
      },
      {
        title: 'Intermediate',
        topics: [
          {
            name: 'Advanced Topics',
            subtopics: ['Practical applications', 'Real-world projects', 'Industry standards'],
            resources: [
              'https://www.udemy.com/',
              'https://www.coursera.org/'
            ],
            time: '3 days'
          }
        ]
      },
      {
        title: 'Advanced',
        topics: [
          {
            name: 'Specialization',
            subtopics: ['Expert techniques', 'Research', 'Innovation'],
            resources: [
              'https://scholar.google.com/',
              'https://arxiv.org/'
            ],
            time: '4 days'
          }
        ]
      }
    ]
  }
}

export default router
