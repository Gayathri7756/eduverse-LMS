# EduVerse - Complete Course & Lesson System Guide

## Overview
EduVerse is a full-stack Learning Management System (LMS) with complete course creation, lesson management, and video playback capabilities.

## Tech Stack
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Videos**: YouTube Integration

## Database Structure

### Collections

#### 1. `courses`
```
{
  id: string (auto-generated)
  title: string
  description: string
  category: string
  content: string
  duration: string
  price: number
  thumbnail: string (URL)
  instructorId: string (Firebase UID)
  instructorName: string
  studentCount: number
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 2. `sections`
```
{
  id: string (auto-generated)
  courseId: string (reference to courses)
  title: string
  order: number
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 3. `lessons`
```
{
  id: string (auto-generated)
  courseId: string (reference to courses)
  sectionId: string (reference to sections)
  title: string
  description: string
  youtubeUrl: string
  videoId: string (extracted from URL)
  order: number
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 4. `enrollments`
```
{
  id: string (auto-generated)
  userId: string (Firebase UID)
  courseId: string (reference to courses)
  purchased: boolean
  progress: number (0-100)
  enrolledAt: timestamp
}
```

## Backend API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/:id/content` - Get course sections and lessons
- `POST /api/courses` - Create new course (instructor only)

### Sections
- `GET /api/sections/:courseId/sections` - Get sections for a course
- `POST /api/sections/:courseId/sections` - Create section (instructor only)
- `PUT /api/sections/:sectionId` - Update section (instructor only)
- `DELETE /api/sections/:sectionId` - Delete section (instructor only)

### Lessons
- `GET /api/lessons/:sectionId/lessons` - Get lessons for a section
- `GET /api/lessons/lesson/:lessonId` - Get single lesson
- `POST /api/lessons/:sectionId/lessons` - Create lesson (instructor only)
- `PUT /api/lessons/:lessonId` - Update lesson (instructor only)
- `DELETE /api/lessons/:lessonId` - Delete lesson (instructor only)

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/check/:courseId` - Check enrollment status

## Frontend Pages

### 1. Landing Page (`/`)
- Hero section with featured courses
- Call-to-action buttons
- Course highlights

### 2. Course Catalog (`/courses`)
- Display all courses
- Search functionality
- Category filtering
- Course cards with:
  - Thumbnail image
  - Title and description
  - Price
  - Instructor name
  - Rating placeholder
  - Duration

### 3. Course Detail (`/course/:id`)
- Full course information
- Enroll button
- Start Learning button (after enrollment)
- Course info cards
- About section

### 4. Course Player (`/course/:courseId/player`)
- Left sidebar with course content
  - Sections and lessons
  - Lesson highlighting
  - Navigation
- Right side with video player
  - Responsive YouTube embed
  - Lesson title and description
  - Next lesson button
  - Progress indicator

### 5. Instructor Dashboard (`/instructor-dashboard`)
- Course management
- Section creation
- Lesson creation with YouTube URL
- Edit/delete functionality
- Real-time updates

### 6. Student Dashboard (`/student-dashboard`)
- Enrolled courses
- Progress tracking
- Continue learning buttons

## YouTube Integration

### URL Extraction
The system automatically extracts video IDs from various YouTube URL formats:
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ`
- `https://www.youtube.com/embed/dQw4w9WgXcQ`
- Direct video ID: `dQw4w9WgXcQ`

### Embed Format
Videos are embedded using:
```
https://www.youtube.com/embed/{videoId}
```

## Sample Data

On backend startup, the system automatically creates demo data if no courses exist:

**Course**: React for Beginners
- **Price**: ₹499
- **Sections**:
  1. Getting Started
     - Intro to React
     - React Components
  2. Core Concepts
     - React Hooks
     - State Management

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5174`

## Environment Variables

### Backend (.env)
```
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

### Frontend (.env)
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Key Features

### For Instructors
✅ Create courses with title, description, price, thumbnail
✅ Organize courses into sections
✅ Add lessons with YouTube videos
✅ Edit and delete sections/lessons
✅ View student enrollment count
✅ Manage course content

### For Students
✅ Browse all courses
✅ Search and filter courses
✅ View course details
✅ Enroll in courses
✅ Watch video lessons
✅ Navigate through sections and lessons
✅ Track progress
✅ Auto-load next lesson

### General
✅ Modern, responsive UI
✅ Real-time data updates
✅ Secure authentication
✅ Firestore database
✅ YouTube video integration
✅ Professional design system

## UI Design

### Color Scheme
- Primary: Blue-600 (#2563eb)
- Secondary: Indigo-600 (#4f46e5)
- Accent: Green-600 (#16a34a)
- Background: Gray-50 (#f9fafb)
- Dark: Gray-900 (#111827)

### Components
- Gradient backgrounds
- Smooth animations
- Hover effects
- Responsive layouts
- Card-based design
- Modern typography

## Testing the System

### 1. Create a Course
1. Sign up as instructor
2. Go to Instructor Dashboard
3. Click "Create Course"
4. Fill in course details
5. Click "Create Course"

### 2. Add Sections
1. Select course from sidebar
2. Click "Add Section"
3. Enter section title
4. Click "Create Section"

### 3. Add Lessons
1. Select section
2. Click "Add Lesson"
3. Enter lesson details
4. Paste YouTube URL
5. Click "Create Lesson"

### 4. Watch Videos
1. Sign up as student
2. Go to Course Catalog
3. Click on course
4. Click "Enroll Now"
5. Click "Start Learning"
6. Select lessons from sidebar
7. Watch videos

## Troubleshooting

### Videos Not Playing
- Verify YouTube URL is valid
- Check video ID extraction
- Ensure iframe is properly embedded

### Courses Not Showing
- Check Firestore connection
- Verify Firebase credentials
- Check browser console for errors

### Enrollment Issues
- Verify user is authenticated
- Check token in localStorage
- Verify course exists in Firestore

## Future Enhancements

- [ ] Course ratings and reviews
- [ ] Student progress tracking
- [ ] Certificate generation
- [ ] Discussion forums
- [ ] Quizzes and assignments
- [ ] Payment integration
- [ ] Course analytics
- [ ] Email notifications
- [ ] Video transcripts
- [ ] Downloadable resources

## Support

For issues or questions, check:
1. Browser console for errors
2. Backend logs
3. Firebase console
4. Network tab in DevTools
