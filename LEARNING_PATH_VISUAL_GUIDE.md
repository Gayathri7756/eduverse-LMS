# Learning Path Generator - Visual Guide 📚

## User Interface Overview

### 1. Initial Form Screen
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Learning Path Generator                               │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Enter Topics                                    │   │
│  │                                                 │   │
│  │ ┌───────────────────────────────────────────┐   │   │
│  │ │ Example: Python, Java, Web Development   │   │   │
│  │ │                                           │   │   │
│  │ │                                           │   │   │
│  │ └───────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │ Generate Learning Path                      │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2. Generated Learning Path - Collapsed Modules
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ← Generate Another                                     │
│                                                         │
│  Complete Java Mastery                                  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Getting Started with Java                   ▼  │   │
│  │ Learn what Java is and why it matters           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Basic Concepts                              ▼  │   │
│  │ Understand the fundamental concepts            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Setup and Installation                      ▼  │   │
│  │ Set up your environment                        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Practical Examples                          ▼  │   │
│  │ Apply concepts with real examples              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Advanced Topics                             ▼  │   │
│  │ Master advanced concepts                       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 3. Expanded Module - Showing Study Material & Concepts
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Getting Started with Java                   ▲  │   │
│  │ Learn what Java is and why it matters           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Java is an important skill. This module         │   │
│  │ introduces you to the basics.                   │   │
│  │                                                 │   │
│  │ Related Concepts:                               │   │
│  │                                                 │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │ ✓ What is Java                          ▼  │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  │                                                 │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │ ✓ Why Java Matters                      ▼  │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  │                                                 │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │ ✓ Prerequisites                         ▼  │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 4. Expanded Concept - Showing Tutor Explanation & Video
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ✓ What is Java                             ▲  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 📚 Tutor Explanation:                           │   │
│  │                                                 │   │
│  │ Java is an important technology. It's used      │   │
│  │ widely in industry. Learning it will help       │   │
│  │ your career.                                    │   │
│  │                                                 │   │
│  │ 🎥 Learn More:                                  │   │
│  │                                                 │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │ ▶ Introduction to Java                      │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Interaction Flow

### Flow 1: Generate Learning Path
```
User enters topic
        ↓
Clicks "Generate Learning Path"
        ↓
Backend generates path (5 modules)
        ↓
Frontend displays modules (collapsed)
        ↓
User sees list of modules
```

### Flow 2: Expand Module
```
User clicks module header
        ↓
Module expands
        ↓
Shows study material
        ↓
Shows "Related Concepts:" list
        ↓
Arrow changes from ▼ to ▲
```

### Flow 3: Expand Concept
```
User clicks concept
        ↓
Concept expands
        ↓
Shows "📚 Tutor Explanation:"
        ↓
Shows "🎥 Learn More:" button
        ↓
Arrow changes from ▼ to ▲
```

### Flow 4: Watch Video
```
User clicks video button
        ↓
YouTube search opens in new tab
        ↓
User watches video
        ↓
Returns to learning path
```

### Flow 5: Generate Another
```
User clicks "← Generate Another"
        ↓
Form clears
        ↓
User enters new topics
        ↓
Repeat from Flow 1
```

---

## Component Hierarchy

```
GenerateLearningPath
├── Form Section
│   ├── Textarea (topics input)
│   ├── Submit Button
│   └── Error Message (if any)
│
└── Learning Path Section
    ├── "Generate Another" Button
    │
    └── For each topic:
        ├── Course Title
        │
        └── For each module:
            ├── Module Header (clickable)
            │   ├── Module Name
            │   ├── Module Summary
            │   └── Expand/Collapse Arrow
            │
            └── Module Content (when expanded)
                ├── Study Material
                │
                └── Related Concepts:
                    └── For each concept:
                        ├── Concept Header (clickable)
                        │   ├── Concept Name
                        │   └── Expand/Collapse Arrow
                        │
                        └── Concept Details (when expanded)
                            ├── 📚 Tutor Explanation:
                            │   └── Explanation Text
                            │
                            └── 🎥 Learn More:
                                └── Video Button
```

---

## Data Flow

### Backend
```
User Input (topics)
        ↓
generateLearningPath(topics)
        ↓
For each topic:
  - Generate 5 modules
  - For each module:
    - Generate 3 concepts
    - For each concept:
      - Generate tutorExplanation
      - Generate videoUrl
        ↓
Return learningPath array
```

### Frontend
```
Receive learningPath array
        ↓
Display course titles
        ↓
Display modules (collapsed)
        ↓
User clicks module
        ↓
Set expandedModule state
        ↓
Display study material + concepts
        ↓
User clicks concept
        ↓
Set expandedConcept state
        ↓
Display tutor explanation + video button
```

---

## State Management

### Component States
```
syllabus: string (user input)
loading: boolean (generating?)
learningPath: array (generated paths)
error: string (error message)
expandedModule: string (which module is open)
expandedConcept: string (which concept is open)
```

### State Transitions
```
Initial: syllabus="", loading=false, learningPath=null

User types: syllabus="Java"

User clicks Generate:
  loading=true
  
API responds:
  loading=false
  learningPath=[...]
  
User clicks module:
  expandedModule="0-0"
  
User clicks concept:
  expandedConcept="0-0-0"
  
User clicks module again:
  expandedModule=null
  
User clicks "Generate Another":
  syllabus=""
  learningPath=null
  expandedModule=null
  expandedConcept=null
```

---

## Styling Details

### Colors
- **Background**: #f9fafb (light gray)
- **Card Background**: white
- **Module Header**: #f5f5f5 (light gray)
- **Module Border**: #007bff (blue)
- **Concept Header**: #e8f4f8 (light blue)
- **Concept Border**: #0066cc (dark blue)
- **Button**: #007bff (blue)
- **Video Button**: #dc3545 (red)
- **Text**: #111 (dark)
- **Secondary Text**: #666 (gray)

### Spacing
- **Page Padding**: 20px
- **Max Width**: 900px
- **Module Margin**: 10px bottom
- **Concept Margin**: 10px bottom
- **Padding**: 15px (modules), 12px (concepts)

### Typography
- **Title**: 32px, bold
- **Course Title**: 24px, bold
- **Module Name**: 18px, bold
- **Concept Name**: 14px, bold
- **Text**: 14px, regular

---

## Accessibility Features

- ✓ Semantic HTML structure
- ✓ Clear headings hierarchy
- ✓ Descriptive button text
- ✓ Color contrast (text on background)
- ✓ Keyboard navigation (click handlers)
- ✓ Visual feedback (arrows, colors)
- ✓ Error messages displayed
- ✓ Loading state indicated

---

## Responsive Design

### Desktop (900px max-width)
- Full width form
- Full width modules
- Full width concepts
- Proper spacing

### Tablet (768px)
- Adjusted padding
- Readable text
- Touch-friendly buttons

### Mobile (375px)
- Adjusted padding
- Readable text
- Touch-friendly buttons
- Vertical layout

---

## User Experience Flow

```
1. User navigates to Learning Path Generator
   ↓
2. Sees form with textarea
   ↓
3. Enters topic (e.g., "Java")
   ↓
4. Clicks "Generate Learning Path"
   ↓
5. Sees loading state
   ↓
6. Learning path appears with 5 modules
   ↓
7. Clicks first module to expand
   ↓
8. Sees study material and concepts
   ↓
9. Clicks first concept to expand
   ↓
10. Sees tutor explanation and video button
   ↓
11. Clicks video button
   ↓
12. YouTube opens in new tab
   ↓
13. Returns to learning path
   ↓
14. Explores other modules and concepts
   ↓
15. Clicks "Generate Another" to start over
```

---

## Example Interaction

### User Input
```
Topic: "Java"
```

### Generated Output
```
Complete Java Mastery
├── Getting Started with Java
│   ├── What is Java
│   │   ├── 📚 Tutor: "Java is an important technology..."
│   │   └── 🎥 Video: "Introduction to Java"
│   ├── Why Java Matters
│   │   ├── 📚 Tutor: "Java is important because..."
│   │   └── 🎥 Video: "Why learn Java"
│   └── Prerequisites
│       ├── 📚 Tutor: "You should have basic..."
│       └── 🎥 Video: "Getting started with Java"
├── Basic Concepts
│   ├── Concept 1
│   ├── Concept 2
│   └── Concept 3
├── Setup and Installation
│   ├── System Requirements
│   ├── Installation
│   └── Verification
├── Practical Examples
│   ├── Example 1
│   ├── Example 2
│   └── Best Practices
└── Advanced Topics
    ├── Advanced Technique 1
    ├── Advanced Technique 2
    └── Projects
```

---

**This visual guide helps understand the Learning Path Generator feature structure and user interactions.**
