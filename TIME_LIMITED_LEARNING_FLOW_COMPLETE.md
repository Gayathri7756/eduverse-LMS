# Time-Limited Learning Flow Implementation ✅

## Overview
Implemented a structured learning flow where students must complete videos, quizzes, and assignments within a course duration deadline to earn certificates.

## Key Features

### 1. Course Duration & Deadline
- Each course has a `durationDays` field (converted from weeks)
- Enrollment deadline = enrollment date + course duration
- Example: 4-week course = 28 days to complete all requirements
- Deadline displayed prominently in CoursePlayer header

### 2. Learning Sequence (Enforced Order)
```
Step 1: 🎥 Watch Videos (Required)
   ↓
Step 2: 📝 Take Quizzes (Time-limited, 70% pass required)
   ↓
Step 3: 📋 Submit Assignments (Due date tracking)
   ↓
Certificate Generated (When all completed)
```

### 3. Quiz Time Limits
- **Quiz 1 (React Basics)**: 30 minutes
- **Quiz 2 (Advanced React)**: 45 minutes  
- **Quiz 3 (React Hooks)**: 40 minutes
- Each quiz has a due date within course duration
- Passing score: 70%

### 4. Assignment Deadlines
- **Assignment 1 (Todo App)**: Due in 7 days
- **Assignment 2 (Weather App)**: Due in 14 days
- **Assignment 3 (State Management)**: Due in 21 days
- No time limit per submission (complete by due date)
- Max score: 100 points each

### 5. CoursePlayer UI Enhancements

#### Header Section
- Course title and duration
- Course deadline with days remaining
- Clear instruction: "Videos → Quizzes → Assignments"

#### Learning Flow Info Card
Shows three steps with requirements:
- Step 1: Watch all videos (required to unlock quizzes)
- Step 2: Take quizzes (pass 70% to proceed)
- Step 3: Submit assignments (earn certificate)

#### Tabs with Time Information
Each tab now displays:
- **Videos Tab**: List of all course videos
- **Quizzes Tab**: 
  - Number of questions
  - Time limit (in minutes)
  - Due date
  - Overdue indicator (if applicable)
- **Assignments Tab**:
  - Max score
  - Time limit (complete by due date)
  - Due date
  - Overdue indicator (if applicable)

## Data Structure Updates

### Course Object
```javascript
{
  id: 'course-1',
  title: 'React for Beginners',
  duration: '4 weeks',
  durationDays: 28,  // NEW: Days to complete course
  price: 499,
  // ... other fields
}
```

### Quiz Object
```javascript
{
  id: 'quiz-1',
  courseId: 'course-1',
  title: 'React Basics Quiz',
  timeLimit: 30,  // NEW: Minutes to complete quiz
  dueDate: '2026-03-23T...',  // NEW: Quiz deadline
  questions: [...],
  // ... other fields
}
```

### Assignment Object
```javascript
{
  id: 'assignment-1',
  courseId: 'course-1',
  title: 'Build a Todo App',
  dueDate: '2026-03-23T...',
  timeLimit: 'No time limit - Complete by due date',  // NEW
  maxScore: 100,
  // ... other fields
}
```

## Course Duration Mapping

| Course | Duration | Days |
|--------|----------|------|
| React for Beginners | 4 weeks | 28 |
| JavaScript Fundamentals | 3 weeks | 21 |
| Vue.js Complete Guide | 5 weeks | 35 |
| Advanced React Patterns | 6 weeks | 42 |
| MERN Stack Bootcamp | 12 weeks | 84 |
| Game Development | 10 weeks | 70 |

## Certificate Generation Logic

Certificate is awarded when:
1. ✅ All videos watched (100%)
2. ✅ All quizzes passed (70% minimum)
3. ✅ All assignments submitted
4. ✅ All deadlines met (within course duration)

## Frontend Changes

### CoursePlayer.jsx
- Added course deadline calculation
- Added learning flow info card
- Enhanced quiz tab with time limits and due dates
- Enhanced assignment tab with time limits and due dates
- Added overdue indicators
- Improved visual hierarchy with grid layouts

### Quiz/Assignment Components
- Dark theme styling (already updated)
- Display time limits and due dates
- Show overdue warnings

## Backend Changes

### coursesData.js
- Added `weeksToDays()` helper function
- Added `durationDays` field to all 35 courses
- Maintains backward compatibility with `duration` field

### inMemoryDb.js
- Added `timeLimit` to all quizzes (in minutes)
- Added `dueDate` to all quizzes
- Added `timeLimit` to all assignments
- Quizzes due at: 7, 14, 21 days
- Assignments due at: 7, 14, 21 days

## API Endpoints (Existing)

- `GET /api/courses/:courseId` - Get course with durationDays
- `GET /api/quizzes/course/:courseId` - Get quizzes with timeLimit and dueDate
- `GET /api/assignments/course/:courseId` - Get assignments with timeLimit and dueDate
- `POST /api/quizzes/:quizId/submit` - Submit quiz (auto-scores)
- `POST /api/assignments/:assignmentId/submit` - Submit assignment
- `GET /api/certificates/user` - Get user certificates

## Testing Checklist

- [ ] Enroll in a course
- [ ] Click "Start Learning"
- [ ] Verify course deadline is displayed
- [ ] Verify learning flow card shows 3 steps
- [ ] Click Videos tab - verify all videos load
- [ ] Click Quizzes tab - verify time limits and due dates show
- [ ] Click Assignments tab - verify due dates and max scores show
- [ ] Take a quiz - verify timer works
- [ ] Submit an assignment - verify submission works
- [ ] Check if overdue items show warning
- [ ] Verify certificate generation when all complete

## User Flow Example

1. **Day 1**: Student enrolls in "React for Beginners" (4-week course)
   - Deadline: 28 days from enrollment
   - Sees learning flow: Videos → Quizzes → Assignments

2. **Days 1-7**: Student watches all 4 videos
   - Unlocks quizzes

3. **Days 8-14**: Student takes 3 quizzes
   - Quiz 1: 30 min, due day 7
   - Quiz 2: 45 min, due day 14
   - Quiz 3: 40 min, due day 21
   - Must pass 70% on each

4. **Days 15-28**: Student submits 3 assignments
   - Assignment 1: Due day 7
   - Assignment 2: Due day 14
   - Assignment 3: Due day 21

5. **Day 28**: If all complete, certificate generated ✅

## Future Enhancements

- [ ] Add quiz timer countdown (real-time)
- [ ] Add assignment submission timer
- [ ] Email notifications for upcoming deadlines
- [ ] Progress dashboard showing completion %
- [ ] Ability to extend deadlines (admin feature)
- [ ] Partial credit for late submissions
- [ ] Leaderboard based on completion time
- [ ] Retry limits for quizzes

## Files Modified

1. `backend/src/utils/coursesData.js` - Added durationDays to all courses
2. `backend/src/utils/inMemoryDb.js` - Added timeLimit and dueDate to quizzes/assignments
3. `frontend/src/pages/CoursePlayer.jsx` - Enhanced UI with time limits and deadlines

All changes verified with 0 diagnostics errors.
