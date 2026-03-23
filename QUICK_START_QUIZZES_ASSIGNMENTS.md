# Quick Start: Quizzes & Assignments

## What's New

✅ **Removed**: Duplicate "My Learning" from Navbar
✅ **Added**: Quizzes system with auto-scoring
✅ **Added**: Assignments system with submission tracking
✅ **Added**: Tabbed interface in Course Player

## How to Use

### For Students

#### Taking a Quiz
1. Enroll in a course
2. Go to Course Player
3. Click **"📝 Quizzes"** tab
4. Select a quiz
5. Answer all questions
6. Click **"Submit Quiz"**
7. View your score and detailed results

#### Submitting an Assignment
1. Go to Course Player
2. Click **"📋 Assignments"** tab
3. Select an assignment
4. Read instructions
5. Write your submission
6. Click **"Submit Assignment"**
7. Confirmation shows submission received

### For Instructors

#### Grading Assignments
1. Access student submissions via API
2. Use `/api/assignments/:submissionId/grade` endpoint
3. Provide grade (0-100) and feedback
4. Student receives notification

## Sample Data

### Quizzes (3 per course)
- **Quiz 1**: React Basics (5 questions)
- **Quiz 2**: Advanced React (3 questions)
- **Quiz 3**: React Hooks (2 questions)

### Assignments (3 per course)
- **Assignment 1**: Build a Todo App (Due in 7 days)
- **Assignment 2**: Create a Weather App (Due in 14 days)
- **Assignment 3**: State Management Project (Due in 21 days)

## API Endpoints

### Quizzes
```bash
# Get quizzes for a course
GET /api/quizzes/course/:courseId

# Submit quiz
POST /api/quizzes/:quizId/submit
Body: { answers: [0, 1, 2, ...] }

# Get quiz result
GET /api/quizzes/:quizId/result
```

### Assignments
```bash
# Get assignments for a course
GET /api/assignments/course/:courseId

# Submit assignment
POST /api/assignments/:assignmentId/submit
Body: { submissionText: "..." }

# Get submission
GET /api/assignments/:assignmentId/submission

# Grade assignment (instructor)
POST /api/assignments/:submissionId/grade
Body: { grade: 85, feedback: "..." }
```

## Course Player Tabs

| Tab | Purpose | Features |
|-----|---------|----------|
| 🎥 Videos | Watch course lessons | Video player, lesson list, progress tracking |
| 📝 Quizzes | Take quizzes | Multiple choice, auto-scoring, results |
| 📋 Assignments | Submit assignments | Instructions, text submission, due dates |

## Scoring System

### Quizzes
- **Passing Score**: 70%
- **Calculation**: (Correct Answers / Total Questions) × 100
- **Feedback**: Shows correct answer if wrong

### Assignments
- **Max Score**: 100 points (configurable)
- **Status**: Submitted → Graded
- **Feedback**: Instructor provides comments

## File Structure

```
backend/
├── src/routes/
│   ├── quizzes.js          (NEW)
│   └── assignments.js      (NEW)
└── utils/
    └── inMemoryDb.js       (UPDATED)

frontend/
├── src/components/
│   ├── QuizComponent.jsx   (NEW)
│   ├── AssignmentComponent.jsx (NEW)
│   └── Navbar.jsx          (UPDATED)
└── src/pages/
    └── CoursePlayer.jsx    (UPDATED)
```

## Testing

### Test Quiz Submission
1. Go to Course Player
2. Click Quizzes tab
3. Select "React Basics Quiz"
4. Answer all 5 questions
5. Click Submit
6. View score and results

### Test Assignment Submission
1. Go to Course Player
2. Click Assignments tab
3. Select "Build a Todo App"
4. Enter submission text
5. Click Submit
6. See confirmation

## Troubleshooting

### Quizzes not showing?
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify course ID is correct

### Assignment submission failing?
- Check that user is logged in
- Verify submission text is not empty
- Check network tab for API errors

### Scores not calculating?
- Ensure all questions are answered
- Check that answers array matches question count
- Verify correct answer indices are 0-based

## Next Features to Add

- [ ] Timed quizzes
- [ ] Quiz randomization
- [ ] File uploads for assignments
- [ ] Peer review system
- [ ] Quiz retake limits
- [ ] Assignment rubrics
- [ ] Grade notifications

## Performance Notes

- Quiz data loads instantly (in-memory)
- Assignment submissions stored in memory
- For production: migrate to database
- Consider caching quiz results

## Browser Compatibility

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers

## Support

For issues or questions:
1. Check console for errors
2. Verify API endpoints are accessible
3. Check network requests in DevTools
4. Review implementation documentation

---

**Status**: ✅ Ready to Use
**Last Updated**: March 2026
