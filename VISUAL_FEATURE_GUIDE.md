# 🎨 Visual Feature Guide - EduVerse LMS

## Navigation Map

```
http://localhost:5173/
│
├── / (Landing Page)
│   └── "Get Started" → /courses
│
├── /login (Login Page)
│   └── Email + Password
│
├── /signup (Signup Page)
│   └── Create Account
│
├── /courses (Course Catalog)
│   ├── Browse 35+ courses
│   ├── Filter by category
│   ├── Search courses
│   └── Click course → /course/:id
│
├── /course/:id (Course Detail)
│   ├── Course info
│   ├── "Enroll Now" button
│   ├── Learning Videos (YouTube)
│   ├── AI Learning Assistant (AI Tutor)
│   └── Course Recommendations
│
├── /course/:courseId/player (Video Player)
│   ├── Watch lessons
│   ├── Progress bar
│   ├── Mark as complete
│   └── Resume from last watched
│
├── /student-dashboard (Student Dashboard)
│   ├── Enrolled courses
│   ├── Progress overview
│   └── Quick links
│
├── /instructor-dashboard (Instructor Dashboard)
│   ├── Create courses
│   ├── Manage courses
│   └── View analytics
│
├── /generate-learning-path (Learning Path)
│   ├── Select subject
│   ├── Generate path
│   └── View structured learning
│
├── /study-planner (Study Planner)
│   ├── Select goal
│   ├── Select duration
│   ├── Generate plan
│   ├── Copy to text
│   ├── Download PDF
│   └── Save to dashboard
│
├── /saved-plans (Saved Plans)
│   ├── View all saved plans
│   ├── Edit plans
│   └── Delete plans
│
├── /playground (Code Playground)
│   ├── Select language
│   ├── Write code
│   ├── Execute code
│   └── See output/error
│
├── /resume-builder (Resume Builder)
│   ├── Personal info
│   ├── Add projects
│   ├── Add certificates
│   └── Download PDF
│
├── /my-learning (My Learning)
│   ├── Enrolled courses
│   ├── Progress tracking
│   └── Continue learning
│
└── /course/:id (Course Detail with AI)
    ├── Course content
    ├── YouTube lessons
    ├── AI tutor chat
    └── Recommendations
```

---

## Feature Workflows

### 1. Learning Path Generator

```
User clicks "Learning Path"
        ↓
Select Subject (Python, JavaScript, etc.)
        ↓
Click "Generate"
        ↓
AI generates structured path:
  - Modules
  - Topics
  - Subtopics
  - Resources
  - Time estimates
        ↓
View complete learning structure
```

**Example Output**:
```
Python Programming
├── Fundamentals (2 weeks)
│   ├── Variables & Data Types
│   │   ├── Strings
│   │   ├── Integers
│   │   └── Floats
│   ├── Operators
│   └── Resources: [link1, link2]
├── Control Flow (2 weeks)
│   ├── If/Else
│   ├── Loops
│   └── Resources: [link3, link4]
└── Functions (2 weeks)
    ├── Definition
    ├── Parameters
    └── Resources: [link5, link6]
```

---

### 2. Study Planner

```
User clicks "Study Planner"
        ↓
Select Learning Goal:
  - Machine Learning
  - Web Development
  - Python Programming
  - Data Science
  - React.js
        ↓
Select Study Hours/Day:
  - 1 hour
  - 2 hours
  - 3 hours
        ↓
Select Duration:
  - 1 month
  - 3 months
  - 6 months
        ↓
Click "Generate Plan"
        ↓
AI generates study plan with:
  - Week-by-week breakdown
  - Topics for each week
  - Practice tasks
  - YouTube recommendations
  - Summary
        ↓
User can:
  - 📋 Copy to Text
  - 📄 Download PDF
  - 💾 Save to Dashboard
  - New Plan (create another)
```

**Example Plan**:
```
Machine Learning Study Plan
Duration: 3 months, 2 hours/day

Week 1-2: Fundamentals
  - Topics: Python basics, NumPy, Pandas
  - Tasks: Install tools, learn arrays
  - Videos: [YouTube links]

Week 3-4: Statistics
  - Topics: Probability, distributions
  - Tasks: Calculate statistics
  - Videos: [YouTube links]

Week 5-8: Linear Regression
  - Topics: Regression models, evaluation
  - Tasks: Build models
  - Videos: [YouTube links]

Week 9-12: Advanced Topics
  - Topics: Classification, clustering
  - Tasks: Real projects
  - Videos: [YouTube links]

Summary: Complete ML foundation in 3 months
```

---

### 3. Code Playground

```
User clicks "Playground"
        ↓
Select Language:
  - JavaScript
  - Python
  - Java
  - C++
  - C
  - C#
  - Go
  - Rust
  - Ruby
  - PHP
  - Swift
  - Kotlin
  - TypeScript
  - R
  - Bash
  - SQL
        ↓
Write Code in Editor
        ↓
Click "Run Code"
        ↓
Code Executes
        ↓
See Output or Error
```

**Example - Python**:
```python
# Input
for i in range(5):
    print(f"Number: {i}")

# Output
Number: 0
Number: 1
Number: 2
Number: 3
Number: 4
```

**Example - JavaScript**:
```javascript
// Input
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log(`Sum: ${sum}`);

// Output
Sum: 15
```

---

### 4. Resume Builder

```
User clicks "Resume Builder"
        ↓
Fill Personal Info:
  - Name
  - Email
  - Phone
  - Location
        ↓
Add Projects (Manual):
  - Project title
  - Description
  - Technologies
  - Date
  - Add/Edit/Delete
        ↓
Add Certificates (Manual):
  - Certificate name
  - Issuer
  - Date
  - Certificate ID
  - Add/Edit/Delete
        ↓
Click "Download PDF"
        ↓
Resume downloaded as PDF
```

**Resume Structure**:
```
[Name]
[Email] | [Phone] | [Location]

PROJECTS
- Project 1: Description (Tech: Python, Django)
- Project 2: Description (Tech: React, Node.js)

CERTIFICATES
- Certificate 1: Issuer (Date)
- Certificate 2: Issuer (Date)
```

---

### 5. AI Tutor

```
User goes to Course Detail
        ↓
Scroll to "AI Learning Assistant"
        ↓
Type Question:
  "How do I use list comprehension?"
        ↓
Click "Ask"
        ↓
AI Tutor responds with:
  - Explanation
  - Code examples
  - Tips
        ↓
User can ask more questions
```

**Example**:
```
Q: How do I use list comprehension?

A: List comprehension is a concise way to create lists.
   Syntax: [expression for item in iterable]
   
   Example:
   squares = [x**2 for x in range(5)]
   # Result: [0, 1, 4, 9, 16]
   
   You can also add conditions:
   evens = [x for x in range(10) if x % 2 == 0]
   # Result: [0, 2, 4, 6, 8]
```

---

### 6. YouTube Lessons

```
User goes to Course Detail
        ↓
Scroll to "Learning Videos"
        ↓
See YouTube videos related to course
        ↓
Click video to watch
        ↓
Video plays in modal/new tab
```

**Example Videos**:
```
Course: Python Programming
Videos:
- Python Basics Tutorial (10 min)
- Variables and Data Types (15 min)
- Control Flow in Python (20 min)
- Functions Explained (18 min)
```

---

### 7. Course Enrollment

```
User browses courses
        ↓
Clicks on course
        ↓
Sees course details
        ↓
Clicks "Enroll Now"
        ↓
Enrollment confirmed
        ↓
Course added to "My Learning"
        ↓
Can now watch lessons
```

---

### 8. Progress Tracking

```
User watches lesson
        ↓
Clicks "Mark as Complete"
        ↓
Progress updated
        ↓
Progress bar increases
        ↓
Can resume from last watched
```

**Progress Display**:
```
Course: Python Programming
Progress: 45%

Lessons:
✅ Lesson 1: Variables (Completed)
✅ Lesson 2: Data Types (Completed)
⏳ Lesson 3: Operators (In Progress)
⭕ Lesson 4: Control Flow (Not Started)
⭕ Lesson 5: Functions (Not Started)
```

---

## UI Components

### Navbar
```
┌─────────────────────────────────────────────────────┐
│ EduVerse  Courses  Learning Path  Study Planner     │
│           Playground  Resume  My Learning  Profile  │
└─────────────────────────────────────────────────────┘
```

### Course Card
```
┌──────────────────────┐
│   [Thumbnail]        │
│                      │
│ Course Title         │
│ Category             │
│ ⭐ 4.5 (100 reviews) │
│ $49.99               │
│ [Enroll Now]         │
└──────────────────────┘
```

### Study Plan Card
```
┌──────────────────────────────┐
│ Goal: Machine Learning       │
│ Duration: 3 months           │
│ Hours/Day: 2                 │
│ Created: Mar 16, 2024        │
│                              │
│ [Edit] [Delete] [View]       │
└──────────────────────────────┘
```

### Code Editor
```
┌─────────────────────────────────┐
│ Language: [Python ▼]            │
├─────────────────────────────────┤
│ for i in range(5):              │
│     print(f"Number: {i}")       │
│                                 │
│ [Run Code]                      │
├─────────────────────────────────┤
│ Output:                         │
│ Number: 0                       │
│ Number: 1                       │
│ Number: 2                       │
│ Number: 3                       │
│ Number: 4                       │
└─────────────────────────────────┘
```

---

## Data Flow

### Learning Path Generation
```
User Input (Subject)
        ↓
Frontend sends to Backend
        ↓
Backend calls Gemini API
        ↓
AI generates structured path
        ↓
Backend returns JSON
        ↓
Frontend displays path
```

### Study Plan Save
```
User creates plan
        ↓
Clicks "Save Plan"
        ↓
Frontend sends to Backend
        ↓
Backend validates data
        ↓
Backend saves to database
        ↓
Frontend shows success
        ↓
Plan appears in "Saved Plans"
```

### Code Execution
```
User writes code
        ↓
Clicks "Run Code"
        ↓
Frontend sends to Backend
        ↓
Backend sends to Piston API
        ↓
Code executes
        ↓
Output returned
        ↓
Frontend displays result
```

---

## User Journeys

### Student Journey
```
1. Sign up / Login
2. Browse courses
3. Enroll in course
4. Watch lessons
5. Track progress
6. Use AI tutor for help
7. Generate learning path
8. Create study plan
9. Use code playground
10. Build resume
```

### Instructor Journey
```
1. Sign up / Login
2. Go to Instructor Dashboard
3. Create course
4. Add sections
5. Add lessons
6. Upload videos
7. Manage course
8. View analytics
```

### Learning Journey
```
1. Generate learning path
2. Create study plan
3. Follow plan
4. Use code playground
5. Ask AI tutor
6. Watch YouTube videos
7. Track progress
8. Build resume
```

---

## Feature Interactions

### Learning Path → Study Planner
```
Generate Learning Path
        ↓
See structured learning
        ↓
Create Study Plan based on path
        ↓
Follow plan
```

### Course → AI Tutor
```
Enroll in course
        ↓
Watch lessons
        ↓
Ask AI tutor questions
        ↓
Get help
```

### Study Plan → Code Playground
```
Study plan includes coding topics
        ↓
Go to code playground
        ↓
Practice code
        ↓
Execute and test
```

### Course → Resume
```
Complete course
        ↓
Add to resume as project
        ↓
Download resume
```

---

## Response Examples

### Learning Path Response
```json
{
  "success": true,
  "data": {
    "subject": "Python Programming",
    "modules": [
      {
        "title": "Fundamentals",
        "topics": [
          {
            "name": "Variables & Data Types",
            "subtopics": ["Strings", "Integers", "Floats"],
            "resources": ["https://...", "https://..."],
            "time": "2 days"
          }
        ]
      }
    ]
  }
}
```

### Study Plan Response
```json
{
  "success": true,
  "plan": {
    "id": "plan-123",
    "goal": "Machine Learning",
    "weeks": [
      {
        "week": 1,
        "topics": ["Python Basics", "NumPy"],
        "tasks": ["Install Python", "Learn arrays"]
      }
    ]
  }
}
```

### Code Execution Response
```json
{
  "success": true,
  "language": "python",
  "output": "Number: 0\nNumber: 1\nNumber: 2\n",
  "error": "",
  "exitCode": 0
}
```

---

## Error Handling

### Learning Path Error
```
Error: "Failed to generate learning path"
Solution: Check backend is running
```

### Study Plan Error
```
Error: "Failed to save study plan"
Solution: Login first, then try again
```

### Code Execution Error
```
Error: "SyntaxError: invalid syntax"
Solution: Check code syntax, try JavaScript
```

### Enrollment Error
```
Error: "Failed to enroll"
Solution: Login first, then try again
```

---

## Performance Indicators

### Fast (< 500ms)
- Course listing
- Study plan save
- Resume download
- Learning path display

### Medium (< 2s)
- Page load
- Course detail
- AI tutor response

### Slow (1-15s)
- Code execution
- Learning path generation
- PDF generation

---

## Mobile Responsiveness

### Desktop (1200px+)
- Full layout
- 3-column grid
- All features visible

### Tablet (768px-1199px)
- 2-column grid
- Responsive navbar
- Touch-friendly buttons

### Mobile (< 768px)
- 1-column layout
- Hamburger menu
- Large touch targets
- Optimized forms

---

## Summary

This visual guide shows:
✅ Navigation structure
✅ Feature workflows
✅ UI components
✅ Data flow
✅ User journeys
✅ Feature interactions
✅ Response examples
✅ Error handling
✅ Performance
✅ Mobile responsiveness

**Everything is visual and easy to understand.** 🎨

---

**Last Updated**: March 16, 2026

