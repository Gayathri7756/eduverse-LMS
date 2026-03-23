# Quick Start - Auto-Enrollment & Progress Tracking

## How to Test the New Features

### 1. Start the Application
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Test Auto-Enrollment

**Step 1**: Sign up or login as a student
- Go to http://localhost:5173/signup
- Create account with role "student"
- Or login if you already have an account

**Step 2**: Browse courses
- Click "Courses" in navbar
- Or go to http://localhost:5173/courses

**Step 3**: Enroll in a course
- Click "Enroll Now" on any course
- Modal opens with payment method options
- Select any payment method (Paytm, PhonePe, Google Pay, Credit Card)
- Click "Pay ₹[amount]"
- Course is instantly added to "My Learning"

**Step 4**: Verify enrollment
- Go to "My Learning" (http://localhost:5173/student-dashboard)
- See the enrolled course with 0% progress

---

### 3. Test Progress Tracking

**Step 1**: Open enrolled course
- From "My Learning", click on the enrolled course
- Or go to http://localhost:5173/course/[courseId]/player

**Step 2**: Watch videos
- Click on a lesson in the sidebar
- Video player opens
- Watch the video completely
- When video ends, lesson is marked as watched (✅ appears in sidebar)
- Progress bar updates

**Step 3**: Check progress
- See progress bar at top showing overall completion %
- See breakdown cards showing:
  - Videos: X% (watched/total)
  - Quizzes: X% (completed/total)
  - Assignments: X% (completed/total)

**Step 4**: Complete quizzes
- Click "Quizzes" tab
- Select a quiz
- Answer questions
- Submit quiz
- Quiz progress updates

**Step 5**: Complete assignments
- Click "Assignments" tab
- Select an assignment
- Submit assignment
- Assignment progress updates

---

### 4. Test Notifications

**Step 1**: Open navbar
- Look for bell icon 🔔 in navbar (top right)
- Shows number of unread notifications

**Step 2**: View notifications
- Click bell icon
- Dropdown opens showing all notifications
- Notifications are color-coded by priority:
  - 🔴 Red = Critical (overdue assignments)
  - 🟠 Orange = High (incomplete quizzes, pending assignments)
  - 🟡 Yellow = Medium (unwatched videos)
  - 🔵 Blue = Low (general)

**Step 3**: Refresh notifications
- Click "Refresh" button in notification dropdown
- Or wait 5 minutes for auto-refresh

**Example Notifications**:
- "You have 3 video(s) to watch in React Basics"
- "You have 2 quiz(zes) to complete in React Basics"
- "You have 1 assignment(s) to complete in React Basics"
- "1 assignment(s) overdue in React Basics" (Critical)

---

### 5. Test Certificate Generation

**Step 1**: Complete a course
- Watch all videos (100%)
- Complete all quizzes (100%)
- Complete all assignments (100%)

**Step 2**: View certificate
- In CoursePlayer, see golden badge with 🏆 icon
- Click "View Certificate"
- Beautiful certificate modal opens showing:
  - Student name
  - Course name
  - Completion date
  - Certificate number
  - Instructor name

**Step 3**: Download certificate
- Click "📥 Download Certificate" button
- Certificate data is ready for download

**Step 4**: See certificate in dashboard
- Go to "My Learning"
- See certificate badge on completed course card
- Click "View Certificate" to see details

---

## Key Features to Test

### Auto-Enrollment
- ✅ No registration form required
- ✅ Single payment method selection
- ✅ Instant enrollment
- ✅ Auto-redirect to course player
- ✅ Course appears in "My Learning"

### Progress Tracking
- ✅ Progress bar shows overall completion %
- ✅ Breakdown shows videos/quizzes/assignments %
- ✅ Watched lessons marked with ✅
- ✅ Progress updates in real-time
- ✅ Progress persists across sessions

### Notifications
- ✅ Bell icon shows unread count
- ✅ Notifications sorted by priority
- ✅ Color-coded by priority
- ✅ Auto-refresh every 5 minutes
- ✅ Manual refresh button

### Certificates
- ✅ Auto-generated when course completed
- ✅ Beautiful certificate design
- ✅ Shows in CoursePlayer and StudentDashboard
- ✅ Download button
- ✅ Unique certificate number

---

## Sample Data

The system comes with sample data:
- **Courses**: React Basics, Advanced React, React Hooks
- **Lessons per course**: 3 lessons with YouTube videos
- **Quizzes per course**: 3 quizzes with 3-5 questions each
- **Assignments per course**: 3 assignments with due dates

---

## Troubleshooting

### Issue: "Course not found" error
- Make sure backend is running on http://localhost:5000
- Check that courses are loaded in the database

### Issue: Notifications not showing
- Make sure you're logged in
- Check browser console for errors
- Try refreshing the page

### Issue: Progress not updating
- Make sure video plays completely
- Check that you're watching the video (not just opening it)
- Try refreshing the page

### Issue: Certificate not showing
- Make sure all requirements are met (100% videos, quizzes, assignments)
- Try refreshing the page
- Check browser console for errors

---

## API Endpoints Reference

### Progress
- `GET /api/progress/course/:courseId` - Get course progress
- `POST /api/progress/lesson-watched` - Mark lesson as watched
- `GET /api/progress/notifications` - Get notifications

### Certificates
- `POST /api/certificates/generate/:courseId` - Generate certificate
- `GET /api/certificates/user` - Get user's certificates
- `GET /api/certificates/:certificateId` - Get certificate details
- `GET /api/certificates/:certificateId/download` - Download certificate

### Enrollments
- `POST /api/enrollments/enroll-on-payment` - Auto-enroll on payment
- `GET /api/enrollments/my-courses` - Get enrolled courses
- `GET /api/enrollments/check/:courseId` - Check if enrolled

---

## Next Steps

1. Test all features thoroughly
2. Report any bugs or issues
3. Customize certificate design if needed
4. Add email notifications (optional)
5. Deploy to production

Enjoy the new features! 🎉
