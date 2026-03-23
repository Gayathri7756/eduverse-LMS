/**
 * Valid Quiz Questions for All Courses
 */

export const quizQuestionsBank = {
  'course-1': { // React for Beginners
    title: 'React for Beginners',
    quizzes: [
      {
        title: 'Fundamentals Quiz',
        questions: [
          {
            text: 'What is React?',
            options: [
              'A JavaScript library for building user interfaces',
              'A backend framework for server development',
              'A database management system',
              'A CSS styling framework'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is JSX?',
            options: [
              'A syntax extension that allows you to write HTML-like code in JavaScript',
              'A JavaScript framework for backend development',
              'A CSS preprocessor',
              'A database query language'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is a React component?',
            options: [
              'A reusable piece of UI that can be rendered independently',
              'A database table',
              'A server endpoint',
              'A CSS class definition'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the virtual DOM?',
            options: [
              'A lightweight JavaScript representation of the real DOM',
              'A physical server in the cloud',
              'A database backup system',
              'A CSS rendering engine'
            ],
            correctAnswer: 0
          },
          {
            text: 'How do you pass data to a React component?',
            options: [
              'Through props (properties)',
              'Through global variables',
              'Through local storage',
              'Through cookies'
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        title: 'Intermediate Concepts',
        questions: [
          {
            text: 'What is state in React?',
            options: [
              'Data that changes over time and triggers re-renders',
              'A permanent database record',
              'A CSS property',
              'A server configuration'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of useState hook?',
            options: [
              'To add state to functional components',
              'To fetch data from APIs',
              'To style components',
              'To handle routing'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the difference between props and state?',
            options: [
              'Props are passed from parent to child, state is managed within a component',
              'Props and state are the same thing',
              'Props are for styling, state is for data',
              'State is passed from parent to child, props are managed within a component'
            ],
            correctAnswer: 0
          },
          {
            text: 'What does the useEffect hook do?',
            options: [
              'Performs side effects in functional components',
              'Manages component styling',
              'Handles user input',
              'Manages component routing'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is a controlled component?',
            options: [
              'A component whose form data is controlled by React state',
              'A component that controls other components',
              'A component with CSS styling',
              'A component that handles routing'
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        title: 'Advanced Topics',
        questions: [
          {
            text: 'What is the purpose of useCallback?',
            options: [
              'To memoize a function and prevent unnecessary re-renders',
              'To fetch data from APIs',
              'To manage component state',
              'To handle error boundaries'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is Context API used for?',
            options: [
              'To manage global state without prop drilling',
              'To fetch data from external APIs',
              'To style components globally',
              'To handle component routing'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the dependency array in useEffect?',
            options: [
              'An array of values that determines when the effect runs',
              'An array of functions to execute',
              'An array of components to render',
              'An array of CSS styles'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is useMemo hook used for?',
            options: [
              'To memoize expensive computations and prevent recalculation',
              'To manage component memory',
              'To handle component styling',
              'To manage component routing'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is a custom hook?',
            options: [
              'A reusable function that uses React hooks',
              'A built-in React hook',
              'A CSS hook for styling',
              'A server-side hook'
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        title: 'Best Practices',
        questions: [
          {
            text: 'What is the key prop used for in lists?',
            options: [
              'To help React identify which items have changed',
              'To style list items',
              'To sort list items',
              'To filter list items'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of error boundaries?',
            options: [
              'To catch JavaScript errors in child components',
              'To style error messages',
              'To handle API errors',
              'To manage component routing'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is lazy loading in React?',
            options: [
              'Loading components only when they are needed',
              'Delaying component rendering',
              'Loading data from APIs',
              'Caching component data'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is code splitting?',
            options: [
              'Dividing code into smaller chunks that are loaded on demand',
              'Splitting code into multiple files',
              'Dividing code by functionality',
              'Splitting code for testing'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of React.memo?',
            options: [
              'To prevent unnecessary re-renders of functional components',
              'To manage component memory',
              'To handle component styling',
              'To manage component state'
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        title: 'Capstone Assessment',
        questions: [
          {
            text: 'What is the correct way to update state in React?',
            options: [
              'Using setState or hooks like useState',
              'Directly modifying the state object',
              'Using global variables',
              'Using local storage'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of the key prop in React?',
            options: [
              'To help React identify which items have changed, been added, or been removed',
              'To encrypt data',
              'To sort items',
              'To filter items'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is a fragment in React?',
            options: [
              'A way to group multiple elements without adding an extra DOM node',
              'A piece of code',
              'A CSS fragment',
              'A database fragment'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of useReducer hook?',
            options: [
              'To manage complex state logic with a reducer function',
              'To reduce component size',
              'To reduce rendering time',
              'To reduce memory usage'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the difference between controlled and uncontrolled components?',
            options: [
              'Controlled components have their state managed by React, uncontrolled components manage their own state',
              'Controlled components are faster than uncontrolled components',
              'Uncontrolled components are more secure',
              'There is no difference'
            ],
            correctAnswer: 0
          }
        ]
      }
    ]
  },
  'course-2': { // JavaScript Fundamentals
    title: 'JavaScript Fundamentals',
    quizzes: [
      {
        title: 'Fundamentals Quiz',
        questions: [
          {
            text: 'What is JavaScript?',
            options: [
              'A lightweight, interpreted programming language for web browsers',
              'A backend server framework',
              'A database language',
              'A CSS preprocessor'
            ],
            correctAnswer: 0
          },
          {
            text: 'What are the primitive data types in JavaScript?',
            options: [
              'String, Number, Boolean, Null, Undefined, Symbol',
              'Array, Object, Function',
              'Class, Interface, Module',
              'Variable, Constant, Parameter'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the difference between let and const?',
            options: [
              'let can be reassigned, const cannot be reassigned',
              'const is faster than let',
              'let is for functions, const is for objects',
              'There is no difference'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is hoisting in JavaScript?',
            options: [
              'Moving declarations to the top of their scope before code execution',
              'Lifting elements in the DOM',
              'Increasing variable values',
              'Removing unused code'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the difference between == and ===?',
            options: [
              '=== checks both value and type, == only checks value',
              '== is faster than ===',
              '=== is for strings, == is for numbers',
              'There is no difference'
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        title: 'Intermediate Concepts',
        questions: [
          {
            text: 'What is a closure in JavaScript?',
            options: [
              'A function that has access to variables from its outer scope',
              'A way to close a function',
              'A type of loop',
              'A way to end a program'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the this keyword in JavaScript?',
            options: [
              'A reference to the object that the function is called on',
              'A keyword to declare variables',
              'A way to reference the current file',
              'A keyword for conditional statements'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is a callback function?',
            options: [
              'A function passed as an argument to another function',
              'A function that calls itself',
              'A function that returns a value',
              'A function that handles errors'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is a promise in JavaScript?',
            options: [
              'An object representing the eventual completion of an asynchronous operation',
              'A guarantee that code will execute',
              'A way to declare variables',
              'A type of loop'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is async/await?',
            options: [
              'Syntactic sugar for working with promises in a more readable way',
              'A way to delay code execution',
              'A type of loop',
              'A way to handle errors'
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        title: 'Advanced Topics',
        questions: [
          {
            text: 'What is prototypal inheritance?',
            options: [
              'A mechanism where objects inherit properties from other objects',
              'A way to create classes',
              'A type of loop',
              'A way to handle errors'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the event loop in JavaScript?',
            options: [
              'A mechanism that handles asynchronous operations and callbacks',
              'A way to loop through events',
              'A type of loop',
              'A way to handle errors'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is destructuring in JavaScript?',
            options: [
              'A way to extract values from objects or arrays into separate variables',
              'A way to break down code',
              'A type of loop',
              'A way to handle errors'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the spread operator?',
            options: [
              'An operator that spreads elements of an array or object',
              'An operator for addition',
              'An operator for multiplication',
              'An operator for comparison'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is a higher-order function?',
            options: [
              'A function that takes another function as an argument or returns a function',
              'A function with multiple parameters',
              'A function that returns multiple values',
              'A function that handles errors'
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        title: 'Best Practices',
        questions: [
          {
            text: 'What is the purpose of strict mode?',
            options: [
              'To enforce stricter parsing and error handling in JavaScript code',
              'To make code run faster',
              'To reduce file size',
              'To improve styling'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the difference between null and undefined?',
            options: [
              'null is an assignment value, undefined means a variable has not been assigned',
              'They are the same',
              'null is for objects, undefined is for primitives',
              'undefined is for objects, null is for primitives'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of try-catch?',
            options: [
              'To handle errors gracefully without stopping code execution',
              'To catch variables',
              'To try different approaches',
              'To catch events'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the difference between var, let, and const?',
            options: [
              'var is function-scoped, let and const are block-scoped, const cannot be reassigned',
              'They are all the same',
              'var is faster than let and const',
              'const is for constants, let and var are for variables'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of Object.freeze()?',
            options: [
              'To prevent modifications to an object',
              'To reduce memory usage',
              'To improve performance',
              'To clear an object'
            ],
            correctAnswer: 0
          }
        ]
      }
    ]
  },
  'course-6': { // Node.js Backend Development
    title: 'Node.js Backend Development',
    quizzes: [
      {
        title: 'Fundamentals Quiz',
        questions: [
          {
            text: 'What is Node.js?',
            options: [
              'A JavaScript runtime built on Chrome\'s V8 engine for server-side development',
              'A frontend framework',
              'A database system',
              'A CSS framework'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is npm?',
            options: [
              'Node Package Manager - a package manager for JavaScript',
              'A programming language',
              'A database',
              'A web server'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is Express.js?',
            options: [
              'A minimal and flexible Node.js web application framework',
              'A database framework',
              'A frontend framework',
              'A CSS framework'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is middleware in Express?',
            options: [
              'Functions that have access to request and response objects',
              'A database layer',
              'A frontend component',
              'A CSS preprocessor'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of package.json?',
            options: [
              'To store project metadata and dependencies',
              'To store database configuration',
              'To store CSS styles',
              'To store HTML templates'
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        title: 'Intermediate Concepts',
        questions: [
          {
            text: 'What is a REST API?',
            options: [
              'An architectural style for designing networked applications using HTTP',
              'A database query language',
              'A frontend framework',
              'A CSS framework'
            ],
            correctAnswer: 0
          },
          {
            text: 'What are HTTP methods?',
            options: [
              'GET, POST, PUT, DELETE, PATCH - used to perform operations on resources',
              'Ways to style HTML',
              'Database operations',
              'CSS properties'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is routing in Express?',
            options: [
              'Defining how an application responds to client requests for specific endpoints',
              'A way to style components',
              'A database operation',
              'A CSS property'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of req and res objects?',
            options: [
              'req represents the HTTP request, res represents the HTTP response',
              'They are database objects',
              'They are CSS objects',
              'They are frontend objects'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is error handling in Express?',
            options: [
              'Using middleware to catch and handle errors gracefully',
              'Preventing all errors',
              'Ignoring errors',
              'Logging errors only'
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        title: 'Advanced Topics',
        questions: [
          {
            text: 'What is authentication?',
            options: [
              'The process of verifying the identity of a user',
              'A way to style components',
              'A database operation',
              'A CSS property'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is authorization?',
            options: [
              'The process of determining what an authenticated user can access',
              'A way to style components',
              'A database operation',
              'A CSS property'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is JWT (JSON Web Token)?',
            options: [
              'A compact, self-contained way to transmit information securely',
              'A database format',
              'A CSS framework',
              'A frontend library'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is CORS?',
            options: [
              'Cross-Origin Resource Sharing - a mechanism to allow restricted resources',
              'A database system',
              'A CSS framework',
              'A frontend library'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of environment variables?',
            options: [
              'To store sensitive configuration data outside of code',
              'To store CSS styles',
              'To store HTML templates',
              'To store database queries'
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        title: 'Best Practices',
        questions: [
          {
            text: 'What is the purpose of validation?',
            options: [
              'To ensure data meets required criteria before processing',
              'To style components',
              'To improve performance',
              'To reduce file size'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of logging?',
            options: [
              'To record application events for debugging and monitoring',
              'To store data in a database',
              'To style components',
              'To improve performance'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of testing?',
            options: [
              'To verify that code works as expected and catch bugs early',
              'To improve styling',
              'To reduce file size',
              'To improve performance'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of API documentation?',
            options: [
              'To provide clear information about how to use the API',
              'To store database queries',
              'To style components',
              'To improve performance'
            ],
            correctAnswer: 0
          },
          {
            text: 'What is the purpose of rate limiting?',
            options: [
              'To control the number of requests a client can make to prevent abuse',
              'To improve styling',
              'To reduce file size',
              'To improve performance'
            ],
            correctAnswer: 0
          }
        ]
      }
    ]
  }
}

// Generic questions for other courses
export const getGenericQuizQuestions = (courseTitle) => {
  return [
    {
      title: 'Fundamentals Quiz',
      questions: [
        {
          text: `What are the core concepts of ${courseTitle}?`,
          options: [
            'Understanding the fundamental principles and basics',
            'Advanced techniques and patterns',
            'Deployment and production',
            'Testing and debugging'
          ],
          correctAnswer: 0
        },
        {
          text: `Why is ${courseTitle} important?`,
          options: [
            'It provides essential skills for modern development',
            'It is only for beginners',
            'It is outdated',
            'It has no practical applications'
          ],
          correctAnswer: 0
        },
        {
          text: `What are the prerequisites for learning ${courseTitle}?`,
          options: [
            'Basic programming knowledge and understanding of fundamentals',
            'Advanced expertise in other areas',
            'No prerequisites needed',
            'Only for experienced developers'
          ],
          correctAnswer: 0
        },
        {
          text: `What is the main goal of ${courseTitle}?`,
          options: [
            'To provide comprehensive knowledge and practical skills',
            'To teach only theory',
            'To provide entertainment',
            'To waste time'
          ],
          correctAnswer: 0
        },
        {
          text: `How can you apply ${courseTitle} in real projects?`,
          options: [
            'By implementing concepts learned in practical applications',
            'By reading documentation only',
            'By watching videos without practice',
            'By memorizing concepts'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      title: 'Intermediate Concepts',
      questions: [
        {
          text: `What are intermediate concepts in ${courseTitle}?`,
          options: [
            'Building on fundamentals with more complex techniques',
            'Going back to basics',
            'Skipping important topics',
            'Learning unrelated concepts'
          ],
          correctAnswer: 0
        },
        {
          text: `How do you practice ${courseTitle} effectively?`,
          options: [
            'Through hands-on projects and consistent practice',
            'By reading only',
            'By watching videos passively',
            'By memorizing documentation'
          ],
          correctAnswer: 0
        },
        {
          text: `What common mistakes should you avoid in ${courseTitle}?`,
          options: [
            'Not practicing enough and skipping fundamentals',
            'Practicing too much',
            'Learning too fast',
            'Asking for help'
          ],
          correctAnswer: 0
        },
        {
          text: `How do you debug issues in ${courseTitle}?`,
          options: [
            'By using debugging tools and understanding error messages',
            'By guessing solutions',
            'By ignoring errors',
            'By restarting the application'
          ],
          correctAnswer: 0
        },
        {
          text: `What resources are available for learning ${courseTitle}?`,
          options: [
            'Documentation, tutorials, courses, and community forums',
            'Only paid courses',
            'Only books',
            'Only videos'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      title: 'Advanced Topics',
      questions: [
        {
          text: `What are advanced topics in ${courseTitle}?`,
          options: [
            'Complex patterns, optimization, and best practices',
            'Basic concepts',
            'Unrelated topics',
            'Deprecated features'
          ],
          correctAnswer: 0
        },
        {
          text: `How do you optimize performance in ${courseTitle}?`,
          options: [
            'By profiling code and implementing efficient algorithms',
            'By adding more features',
            'By ignoring performance',
            'By using random optimizations'
          ],
          correctAnswer: 0
        },
        {
          text: `What design patterns are used in ${courseTitle}?`,
          options: [
            'Proven solutions to common problems in software design',
            'Random code structures',
            'Deprecated patterns',
            'Unrelated patterns'
          ],
          correctAnswer: 0
        },
        {
          text: `How do you scale applications built with ${courseTitle}?`,
          options: [
            'By using architecture patterns and distributed systems',
            'By adding more servers randomly',
            'By ignoring scalability',
            'By rewriting everything'
          ],
          correctAnswer: 0
        },
        {
          text: `What is the future of ${courseTitle}?`,
          options: [
            'Continued evolution with new features and improvements',
            'Becoming obsolete',
            'No changes',
            'Replacement by unrelated technologies'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      title: 'Best Practices',
      questions: [
        {
          text: `What are best practices in ${courseTitle}?`,
          options: [
            'Following established conventions and standards for quality code',
            'Writing code without standards',
            'Ignoring documentation',
            'Using deprecated methods'
          ],
          correctAnswer: 0
        },
        {
          text: `How do you write maintainable code in ${courseTitle}?`,
          options: [
            'By using clear naming, documentation, and following standards',
            'By using cryptic variable names',
            'By avoiding comments',
            'By ignoring structure'
          ],
          correctAnswer: 0
        },
        {
          text: `What is the importance of testing in ${courseTitle}?`,
          options: [
            'To ensure code quality and catch bugs early',
            'Testing is unnecessary',
            'Testing slows down development',
            'Testing is only for large projects'
          ],
          correctAnswer: 0
        },
        {
          text: `How do you collaborate on ${courseTitle} projects?`,
          options: [
            'Using version control, code reviews, and clear communication',
            'Working in isolation',
            'Not sharing code',
            'Ignoring feedback'
          ],
          correctAnswer: 0
        },
        {
          text: `What is continuous improvement in ${courseTitle}?`,
          options: [
            'Regularly updating skills and staying current with trends',
            'Never learning new things',
            'Ignoring industry changes',
            'Using outdated methods'
          ],
          correctAnswer: 0
        }
      ]
    }
  ]
}
