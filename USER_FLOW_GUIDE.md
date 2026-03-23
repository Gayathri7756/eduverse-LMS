# EduVerse - User Flow Guide

## Complete User Journey

### 1. NEW USER FLOW

```
Landing Page (Home)
    ↓
[Featured Courses Section]
    ↓
Click "Explore Courses" or Course Card
    ↓
Course Catalog Page
    ↓
[All Courses Displayed]
    ↓
Search/Filter by Category
    ↓
Click Course Card
    ↓
Course Detail Page
    ↓
Click "Enroll Now"
    ↓
Redirected to Login
    ↓
Sign Up Page
    ↓
Create Account (Student Role)
    ↓
Logged In
    ↓
Back to Course Detail
    ↓
Click "Enroll Now" Again
    ↓
Click "Start Learning"
    ↓
Course Player Page
    ↓
Watch Videos
```

---

### 2. EXISTING STUDENT FLOW

```
Landing Page
    ↓
Click "My Learning" (Navbar)
    ↓
Student Dashboard
    ↓
[Enrolled Courses with Progress]
    ↓
Click Course Card
    ↓
Course Player Page
    ↓
Watch Videos & Navigate Lessons
    ↓
OR
    ↓
Click "Browse More Courses"
    ↓
Course Catalog
    ↓
Search/Filter Courses
    ↓
Enroll in New Course
    ↓
Back to Dashboard
```

---

### 3. INSTRUCTOR FLOW

```
Landing Page
    ↓
Sign Up (Instructor Role)
    ↓
Click "Instructor Dashboard" (Navbar)
    ↓
Instructor Dashboard
    ↓
Click "+ Create Course"
    ↓
Fill Course Details
    ↓
Click "Create Course"
    ↓
Select Course from Sidebar
    ↓
Click "+ Add Section"
    ↓
Enter Section Title
    ↓
Click "Create Section"
    ↓
Select Section
    ↓
Click "+ Add Lesson"
    ↓
Fill Lesson Details + YouTube URL
    ↓
Click "Create Lesson"
    ↓
Course appears in Catalog
    ↓
Students can enroll
```

---

## Page-by-Page Breakdown

### HOME PAGE (Landing)
```
┌─────────────────────────────────────┐
│         HERO SECTION                │
│  Welcome to EduVerse                │
│  [Explore Courses] [Get Started]    │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│         STATS SECTION               │
│  10K+ Students | 500+ Instructors   │
│  1000+ Courses                      │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│    FEATURED COURSES (6 courses)     │
│  [Course 1] [Course 2] [Course 3]   │
│  [Course 4] [Course 5] [Course 6]   │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│         CTA SECTION                 │
│  Ready to start learning?           │
│  [Sign Up Now]                      │
└─────────────────────────────────────┘
```

### COURSE CATALOG PAGE
```
┌─────────────────────────────────────┐
│    SEARCH & FILTER SECTION          │
│  [Search Box]  [Category Dropdown]  │
│  Showing 12 of 50 courses           │
│  [Clear Filters]                    │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│      COURSES GRID (3 columns)       │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │Course│ │Course│ │Course│        │
│  │  1   │ │  2   │ │  3   │        │
│  └──────┘ └──────┘ └──────┘        │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │Course│ │Course│ │Course│        │
│  │  4   │ │  5   │ │  6   │        │
│  └──────┘ └──────┘ └──────┘        │
└─────────────────────────────────────┘
```

### STUDENT DASHBOARD (My Learning)
```
┌─────────────────────────────────────┐
│    MY LEARNING HEADER               │
│  [Browse More Courses]              │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│   ENROLLED COURSES (3 columns)      │
│  ┌──────────────────────────────┐   │
│  │ Course 1                     │   │
│  │ Progress: ████░░░░░░ 45%    │   │
│  │ By Instructor Name           │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ Course 2                     │   │
│  │ Progress: ██████░░░░░░ 60%  │   │
│  │ By Instructor Name           │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

### COURSE DETAIL PAGE
```
┌─────────────────────────────────────┐
│    HERO SECTION                     │
│  Course Title                       │
│  Description                        │
│  Instructor | Duration | Price      │
│  [Enroll Now] [Start Learning]      │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│    ABOUT SECTION                    │
│  Full course content...             │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│    INFO CARDS                       │
│  [Comprehensive] [Expert] [Cert]    │
└─────────────────────────────────────┘
```

### COURSE PLAYER PAGE
```
┌──────────────────────────────────────────┐
│  HEADER: Course Title | Lesson Title     │
├──────────────────────────────────────────┤
│                                          │
│  ┌────────────────────┐ ┌────────────┐  │
│  │                    │ │ Section 1  │  │
│  │                    │ │ • Lesson 1 │  │
│  │  VIDEO PLAYER      │ │ • Lesson 2 │  │
│  │  (YouTube Embed)   │ │            │  │
│  │                    │ │ Section 2  │  │
│  │                    │ │ • Lesson 3 │  │
│  │                    │ │ • Lesson 4 │  │
│  └────────────────────┘ └────────────┘  │
│                                          │
├──────────────────────────────────────────┤
│  Lesson Title                            │
│  Lesson Description                      │
│  [Next Lesson →]                         │
├──────────────────────────────────────────┤
│  Progress: ████░░░░░░ 40%               │
└──────────────────────────────────────────┘
```

### INSTRUCTOR DASHBOARD
```
┌─────────────────────────────────────┐
│    YOUR COURSES (Sidebar)           │
│  [+ Create Course]                  │
│  ┌─────────────────────────────┐    │
│  │ Course 1 (Selected)         │    │
│  │ Frontend Development        │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ Course 2                    │    │
│  │ Backend Development         │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│    SECTIONS & LESSONS (Main)        │
│  [+ Add Section]                    │
│  ┌─────────────────────────────┐    │
│  │ Section 1: Getting Started  │    │
│  │ [+ Add Lesson]              │    │
│  │ • Lesson 1: Intro           │    │
│  │ • Lesson 2: Setup           │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ Section 2: Core Concepts    │    │
│  │ [+ Add Lesson]              │    │
│  │ • Lesson 3: Components      │    │
│  │ • Lesson 4: Hooks           │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

---

## Feature Workflows

### SEARCH WORKFLOW
```
User Types in Search Box
    ↓
Real-time Filtering
    ↓
Courses matching title/description shown
    ↓
Can combine with category filter
    ↓
Click "Clear Filters" to reset
```

### CATEGORY FILTER WORKFLOW
```
User Opens Category Dropdown
    ↓
Sees all categories with course count
    ↓
Example: "Frontend Development (5)"
    ↓
Selects a category
    ↓
Courses filtered to that category
    ↓
Can combine with search
    ↓
Click "Clear Filters" to reset
```

### ENROLLMENT WORKFLOW
```
User on Course Detail Page
    ↓
Clicks "Enroll Now"
    ↓
If not logged in → Redirect to Login
    ↓
If logged in → Create enrollment
    ↓
"Start Learning" button appears
    ↓
Click "Start Learning"
    ↓
Go to Course Player
    ↓
Watch videos
```

### COURSE CREATION WORKFLOW
```
Instructor on Dashboard
    ↓
Click "+ Create Course"
    ↓
Fill in course details:
  - Title
  - Description
  - Category
  - Duration
  - Price
  - Thumbnail URL
    ↓
Click "Create Course"
    ↓
Course appears in sidebar
    ↓
Select course
    ↓
Click "+ Add Section"
    ↓
Enter section title
    ↓
Click "Create Section"
    ↓
Section appears in list
    ↓
Select section
    ↓
Click "+ Add Lesson"
    ↓
Fill in lesson details:
  - Title
  - Description
  - YouTube URL
    ↓
Click "Create Lesson"
    ↓
Lesson appears in list
    ↓
Course ready for students
```

---

## Navigation Map

```
                    Landing Page
                         |
        ┌────────────────┼────────────────┐
        |                |                |
    [Explore]        [Sign Up]        [My Learning]
        |                |                |
        ↓                ↓                ↓
   Course Catalog    Sign Up Page   Student Dashboard
        |                |                |
        ├────────────────┤                |
        |                |                |
        ↓                ↓                ↓
   Course Detail    Login Page      Course Player
        |                |                |
        ├────────────────┤                |
        |                |                |
        ↓                ↓                ↓
   [Enroll Now]    [Instructor]    [Continue Learning]
        |           Dashboard            |
        |                |                |
        └────────────────┴────────────────┘
                         |
                    Course Player
```

---

## Key Features by Page

| Page | Features |
|------|----------|
| Landing | Featured courses, Hero section, Stats, CTA |
| Catalog | Search, Category filter, Course grid, Responsive |
| Detail | Course info, Enroll button, About section, Info cards |
| Player | Video player, Lesson sidebar, Progress, Next lesson |
| Dashboard | Enrolled courses, Progress bars, Browse more |
| Instructor | Create course, Add sections, Add lessons, Manage content |

---

## User Roles & Access

### Student
- ✅ View landing page
- ✅ Browse course catalog
- ✅ Search and filter courses
- ✅ View course details
- ✅ Enroll in courses
- ✅ Watch videos
- ✅ View my learning dashboard
- ❌ Create courses
- ❌ Manage courses

### Instructor
- ✅ View landing page
- ✅ Browse course catalog
- ✅ Create courses
- ✅ Add sections
- ✅ Add lessons
- ✅ Manage content
- ✅ View instructor dashboard
- ❌ Enroll in own courses
- ❌ View student dashboard

### Guest (Not Logged In)
- ✅ View landing page
- ✅ Browse course catalog
- ✅ View course details
- ❌ Enroll in courses
- ❌ Watch videos
- ❌ Access dashboards

---

**Last Updated:** March 2024
**Status:** Complete ✅
