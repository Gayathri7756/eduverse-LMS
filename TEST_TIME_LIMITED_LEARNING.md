# Testing Time-Limited Learning Flow

## Quick Test Steps

### 1. Start the Application
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm run dev
```

### 2. Enroll in a Course
1. Go to Course Catalog
2. Click on "React for Beginners" (or any course)
3. Click "Enroll" or select payment method
4. Confirm enrollment

### 3. Click "Start Learning"
- Should see CoursePlayer with new UI

### 4. Verify Header Section
- [ ] Course title: "React for Beginners"
- [ ] Duration: "4 weeks (28 days)"
- [ ] Course deadline displayed (28 days from today)
- [ ] Days remaining counter shows correct number
- [ ] Learning flow instruction: "Videos → Quizzes → Assignments"

### 5. Verify Learning Flow Card
- [ ] Shows 3 steps with icons
- [ ] Step 1: 🎥 Watch Videos (4 videos)
- [ ] Step 2: 📝 Take Quizzes (3 quizzes)
- [ ] Step 3: 📋 Submit Assignments (3 assignments)
- [ ] Each step shows requirements

### 6. Test Videos Tab
- [ ] Click "Videos" tab
- [ ] See YouTube player
- [ ] See video list on right sidebar
- [ ] Can select different videos
- [ ] Video player updates when selecting new video

### 7. Test Quizzes Tab
- [ ] Click "Quizzes" tab
- [ ] See all 3 quizzes listed
- [ ] For each quiz, verify:
  - [ ] Quiz title displayed
  - [ ] Quiz description shown
  - [ ] Questions count: 5, 3, 2
  - [ ] Time limits: 30 min, 45 min, 40 min
  - [ ] Due dates displayed
  - [ ] Grid layout shows: Questions | Time Limit | Due Date

### 8. Test Quiz Submission
1. Click on Quiz 1 (React Basics)
2. Answer all 5 questions
3. Click "Submit Quiz"
4. Verify:
   - [ ] Score displayed (e.g., 85%)
   - [ ] Pass/Fail status shown
   - [ ] Detailed results review
   - [ ] Can go back to quizzes list

### 9. Test Assignments Tab
- [ ] Click "Assignments" tab
- [ ] See all 3 assignments listed
- [ ] For each assignment, verify:
  - [ ] Assignment title displayed
  - [ ] Assignment description shown
  - [ ] Max score: 100 pts
  - [ ] Time limit: "No time limit - Complete by due date"
  - [ ] Due dates displayed
  - [ ] Grid layout shows: Max Score | Time Limit | Due Date

### 10. Test Assignment Submission
1. Click on Assignment 1 (Todo App)
2. Enter submission text
3. Click "Submit Assignment"
4. Verify:
   - [ ] Success message shown
   - [ ] ✅ Assignment Submitted!
   - [ ] Submission details displayed
   - [ ] Can go back to assignments list

### 11. Test Overdue Indicator
- [ ] Manually change system date to after due date
- [ ] Refresh CoursePlayer
- [ ] Verify overdue indicator appears (⏰ Overdue)
- [ ] Red styling applied to overdue items

### 12. Verify Data in Browser Console
```javascript
// Open browser console (F12)
// Check if course has durationDays
// Check if quizzes have timeLimit and dueDate
// Check if assignments have timeLimit and dueDate
```

## Expected Data Structure

### Course
```javascript
{
  id: 'course-1',
  title: 'React for Beginners',
  duration: '4 weeks',
  durationDays: 28,  // Should be present
  price: 499,
  // ... other fields
}
```

### Quiz
```javascript
{
  id: 'quiz-1',
  courseId: 'course-1',
  title: 'React Basics Quiz',
  timeLimit: 30,  // Should be present (minutes)
  dueDate: '2026-03-23T...',  // Should be present
  questions: [...]
}
```

### Assignment
```javascript
{
  id: 'assignment-1',
  courseId: 'course-1',
  title: 'Build a Todo App',
  dueDate: '2026-03-23T...',
  timeLimit: 'No time limit - Complete by due date',  // Should be present
  maxScore: 100
}
```

## Debugging Tips

### If CoursePlayer shows blank page:
1. Check browser console for errors
2. Verify course ID is correct
3. Check if course data is loading
4. Verify API endpoints are working

### If time limits not showing:
1. Check if quizzes have `timeLimit` field
2. Verify API response includes `timeLimit`
3. Check browser console for errors

### If due dates not showing:
1. Check if quizzes/assignments have `dueDate` field
2. Verify date format is correct (ISO string)
3. Check browser console for errors

### If deadline not calculating:
1. Verify course has `durationDays` field
2. Check if enrollment date is set correctly
3. Verify date calculation logic

## API Testing

### Test Quiz Endpoint
```bash
curl http://localhost:5000/api/quizzes/course/course-1
```

Expected response should include:
- `timeLimit` field (e.g., 30)
- `dueDate` field (ISO string)

### Test Assignment Endpoint
```bash
curl http://localhost:5000/api/assignments/course/course-1
```

Expected response should include:
- `timeLimit` field (e.g., "No time limit - Complete by due date")
- `dueDate` field (ISO string)

### Test Course Endpoint
```bash
curl http://localhost:5000/api/courses/course-1
```

Expected response should include:
- `durationDays` field (e.g., 28)
- `duration` field (e.g., "4 weeks")

## Visual Verification Checklist

### CoursePlayer Header
- [ ] Course title visible
- [ ] Duration shown (e.g., "4 weeks (28 days)")
- [ ] Deadline banner with date
- [ ] Days remaining counter
- [ ] Learning flow instruction

### Learning Flow Card
- [ ] 3 steps displayed in grid
- [ ] Icons for each step (🎥 📝 📋)
- [ ] Step titles and descriptions
- [ ] Requirements listed for each step

### Tabs
- [ ] Videos tab shows video count
- [ ] Quizzes tab shows quiz count
- [ ] Assignments tab shows assignment count
- [ ] Active tab highlighted in indigo

### Videos Tab
- [ ] YouTube player visible
- [ ] Video list sidebar on right
- [ ] Can select different videos
- [ ] Player updates on selection

### Quizzes Tab
- [ ] All quizzes listed
- [ ] Grid showing: Questions | Time Limit | Due Date
- [ ] Time limits visible (30, 45, 40 min)
- [ ] Due dates visible
- [ ] Quiz components embedded

### Assignments Tab
- [ ] All assignments listed
- [ ] Grid showing: Max Score | Time Limit | Due Date
- [ ] Max scores visible (100 pts)
- [ ] Time limits visible
- [ ] Due dates visible
- [ ] Assignment components embedded

## Performance Checklist

- [ ] CoursePlayer loads within 2 seconds
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth tab switching
- [ ] Responsive on mobile

## Browser Compatibility

Test on:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Mobile Testing

- [ ] CoursePlayer responsive on mobile
- [ ] Tabs stack vertically on small screens
- [ ] Learning flow card readable on mobile
- [ ] Quiz/assignment components work on mobile

## Accessibility Testing

- [ ] Tab navigation works
- [ ] Keyboard shortcuts work
- [ ] Screen reader friendly
- [ ] Color contrast sufficient
- [ ] Focus indicators visible

## Success Criteria

✅ All tests pass when:
1. CoursePlayer displays with new UI
2. Course deadline calculated correctly
3. Learning flow card shows 3 steps
4. Quizzes show time limits and due dates
5. Assignments show time limits and due dates
6. Quiz submission works
7. Assignment submission works
8. Overdue indicators display correctly
9. No console errors
10. Responsive on all devices

## Troubleshooting

### Issue: "No quizzes available"
**Solution**: 
- Check if quizzes are initialized in inMemoryDb
- Verify courseId matches in quizzes
- Check API endpoint: `/api/quizzes/course/course-1`

### Issue: "No assignments available"
**Solution**:
- Check if assignments are initialized in inMemoryDb
- Verify courseId matches in assignments
- Check API endpoint: `/api/assignments/course/course-1`

### Issue: Time limits not showing
**Solution**:
- Verify quizzes have `timeLimit` field
- Check if API response includes `timeLimit`
- Verify frontend is reading `quiz.timeLimit`

### Issue: Due dates not showing
**Solution**:
- Verify quizzes/assignments have `dueDate` field
- Check if date is in ISO format
- Verify frontend is parsing date correctly

### Issue: Deadline not calculating
**Solution**:
- Verify course has `durationDays` field
- Check if enrollment date is available
- Verify date calculation: `enrollmentDate + durationDays`

## Next Steps After Testing

1. ✅ Verify all features work
2. ✅ Check for any console errors
3. ✅ Test on different browsers
4. ✅ Test on mobile devices
5. ✅ Verify API responses
6. ✅ Check database/in-memory data
7. ✅ Document any issues
8. ✅ Deploy to production

## Support

If you encounter any issues:
1. Check browser console for errors
2. Check backend logs
3. Verify API endpoints are working
4. Check if data is initialized correctly
5. Review the implementation files
