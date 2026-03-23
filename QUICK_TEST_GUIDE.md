# EduVerse - Quick Test Guide

## System Status
✅ Backend: http://localhost:5000
✅ Frontend: http://localhost:5173

## What's New

### 1. Complete Enrollment Flow
- Registration form with address details
- Payment method selection (Paytm, PhonePe, Google Pay, Credit Card)
- Tax calculation (18%)
- Simulated payment processing
- Automatic course enrollment after payment

### 2. Direct Video Embedding
- YouTube videos embedded directly in course player
- No "Watch on YouTube" links
- Dark theme interface
- Responsive design

### 3. Activity Tracking
- Tracks every user action minute-by-minute
- Records: play, pause, complete, view actions
- Stores watch time in seconds
- Accessible via API

### 4. My Learning Dashboard
- Shows all enrolled courses
- Progress tracking
- Quick access to course player

## Step-by-Step Test

### Test 1: Browse and View Course
1. Open http://localhost:5173
2. Click on any course card (e.g., "React for Beginners")
3. You should see:
   - Course hero section with title, description, instructor
   - Course content with sections and lessons
   - YouTube lesson links
   - Enroll button

### Test 2: Complete Enrollment Flow
1. On course detail page, click "Enroll Now"
2. **Registration Modal Opens** - Fill in:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Address: 123 Main St
   - City: Mumbai
   - State: Maharashtra
   - Zip Code: 400001
3. Click "Continue to Payment"
4. **Payment Modal Opens** - Select:
   - Payment Method: Paytm (or any option)
   - Review total amount (Price + 18% Tax)
5. Click "Pay Now"
6. **Processing** - Wait 2 seconds
7. **Success** - Modal closes, course added to "My Learning"

### Test 3: Watch Course with Activity Tracking
1. Go to "My Learning" in navbar
2. Click on enrolled course
3. **Course Player Opens** with:
   - YouTube video embedded
   - Dark theme interface
   - Sidebar with all sections and lessons
   - Current lesson highlighted
4. Click play on video
5. Watch for 1+ minute
6. Activity is automatically tracked every minute
7. Click pause/play to see tracking in action

### Test 4: Check Activity Logs
1. Open browser DevTools (F12)
2. Go to Console tab
3. Watch the video for 1+ minute
4. Check backend logs for activity tracking
5. Or visit: http://localhost:5000/api/activity/all

### Test 5: Multiple Enrollments
1. Go back to homepage
2. Enroll in another course
3. Go to "My Learning"
4. Both courses should appear
5. Each with separate progress tracking

## Expected Results

### After Enrollment:
- ✅ Course appears in "My Learning" dashboard
- ✅ Progress bar shows 0%
- ✅ Course thumbnail and details visible
- ✅ "Start Learning" button available

### During Video Watching:
- ✅ Video plays in embedded player
- ✅ Watch time updates in real-time
- ✅ Play/pause status shown
- ✅ Activity logged every minute
- ✅ Can navigate between lessons

### Activity Tracking:
- ✅ `video_play` logged when play clicked
- ✅ `video_pause` logged when pause clicked
- ✅ `video_complete` logged when video ends
- ✅ `lesson_view` logged on lesson selection
- ✅ Duration recorded in seconds
- ✅ Timestamp recorded for each action

## API Endpoints to Test

### Get All Courses
```
GET http://localhost:5000/api/courses
```

### Get Course Details
```
GET http://localhost:5000/api/courses/course-1
```

### Get Course Content (Sections & Lessons)
```
GET http://localhost:5000/api/courses/course-1/content
```

### Initiate Payment
```
POST http://localhost:5000/api/payments/initiate
Body: {
  "courseId": "course-1",
  "amount": 499,
  "paymentMethod": "paytm",
  "userDetails": {...},
  "userId": "user-123"
}
```

### Get Activity Logs
```
GET http://localhost:5000/api/activity/all
```

### Get Course Activity Summary
```
GET http://localhost:5000/api/activity/summary/course-1
```

## Troubleshooting

### Issue: "Course not found" on detail page
- **Solution**: Make sure backend is running on port 5000
- Check: http://localhost:5000/api/courses

### Issue: Enrollment modal doesn't appear
- **Solution**: Clear browser cache (Ctrl+Shift+Delete)
- Refresh page (Ctrl+Shift+R)

### Issue: Video doesn't play
- **Solution**: Check YouTube video ID is valid
- Verify: `videoId` field in lesson data

### Issue: Activity not tracking
- **Solution**: Check browser console for errors
- Verify: User is logged in
- Check: Backend is running

### Issue: "My Learning" shows no courses
- **Solution**: Complete enrollment flow first
- Check: Payment confirmation succeeded
- Verify: Backend received enrollment

## Sample Test Data

### Sample Course
- ID: course-1
- Title: React for Beginners
- Price: ₹499
- Category: Frontend Development
- Instructor: React Master

### Sample Lesson
- Title: Intro to React
- YouTube URL: https://www.youtube.com/watch?v=bMknfKXIFA8
- Video ID: bMknfKXIFA8

## Performance Notes

- Activity tracking: Every 60 seconds
- Payment processing: 2 seconds (simulated)
- Video loading: Depends on YouTube
- Course loading: < 1 second

## Next Steps

1. Test all enrollment flows
2. Verify activity tracking works
3. Check "My Learning" dashboard
4. Test video player functionality
5. Monitor backend logs for errors

## Support

For issues or questions:
1. Check browser console (F12)
2. Check backend logs
3. Verify both servers running
4. Clear cache and refresh
5. Restart servers if needed
