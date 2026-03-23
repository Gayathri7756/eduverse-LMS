# Test 404 Fix - Quick Guide

## Prerequisites
- Backend running: `cd backend && npm start`
- Frontend running: `cd frontend && npm run dev`
- Browser open to http://localhost:5173

## Quick Test (2 minutes)

### Step 1: Go to Courses
```
1. Click "Courses" in navbar
2. Or go to http://localhost:5173/courses
3. You should see course list
```

### Step 2: Click Enroll
```
1. Click "Enroll Now" on any course
2. Modal should open
3. You should see payment methods
```

### Step 3: Select Payment Method
```
1. Click on any payment method (e.g., Paytm)
2. Radio button should be selected
3. You should see payment summary
```

### Step 4: Click Pay
```
1. Click "Pay ₹[amount]" button
2. You should see spinner
3. Text: "Enrolling you in the course..."
```

### Step 5: See Success Message
```
1. After 1-2 seconds, you should see:
   ✅ Checkmark
   "Successfully Enrolled!"
   "Course added to your learning dashboard"
```

### Step 6: Verify Enrollment
```
1. Modal closes
2. Redirected to course player
3. Go to "My Learning"
4. Course should appear with 0% progress
```

## Expected Results

### ✅ Success
- [ ] No 404 error
- [ ] Processing spinner appears
- [ ] Success message with ✅
- [ ] Modal auto-closes
- [ ] Redirected to course player
- [ ] Course in "My Learning"

### ❌ Error (If You See These)
- [ ] "request failed with status code 404" - Backend issue
- [ ] "Enrollment failed" - Check console
- [ ] "Course not found" - Database issue
- [ ] "Already enrolled" - Already enrolled

## Debug Steps

### Check Browser Console
```
1. Press F12
2. Go to Console tab
3. Look for logs:
   - Token: Found/Not found
   - User UID: [uid]
   - Course ID: [id]
   - Payment Method: [method]
   - Enrollment response: {success: true}
```

### Check Backend Logs
```
1. Look at terminal where backend is running
2. Should see enrollment request
3. Should see success response
4. No error messages
```

### Check Network Tab
```
1. Press F12
2. Go to Network tab
3. Click "Pay"
4. Look for POST request to /api/enrollments/enroll-on-payment
5. Response status should be 201 (Created)
6. Response body should have {success: true}
```

## Troubleshooting

### Issue: Still Getting 404

**Check 1: Backend Running?**
```
1. Look at terminal where backend is running
2. Should see "Server running on port 5000"
3. If not, run: cd backend && npm start
```

**Check 2: Correct URL?**
```
1. Check frontend is calling correct URL
2. Should be: http://localhost:5000/api/enrollments/enroll-on-payment
3. Not: http://localhost:5173/...
```

**Check 3: Backend Restarted?**
```
1. Stop backend (Ctrl+C)
2. Start backend again: npm start
3. Try enrolling again
```

### Issue: "Enrollment failed" Error

**Check 1: Course Exists?**
```
1. Go to courses page
2. Make sure course is showing
3. Try different course
```

**Check 2: Already Enrolled?**
```
1. Go to "My Learning"
2. Check if course already there
3. Try different course
```

**Check 3: Check Console**
```
1. Press F12
2. Go to Console
3. Look for error details
4. Share error message
```

### Issue: Course Not in "My Learning"

**Check 1: Refresh Page**
```
1. Go to http://localhost:5173/student-dashboard
2. Press F5 to refresh
3. Check if course appears
```

**Check 2: Check Backend**
```
1. Look at backend terminal
2. Check for enrollment creation
3. Check for errors
```

**Check 3: Check Database**
```
1. Backend uses in-memory database
2. Data is lost on restart
3. Try enrolling again
```

## Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can see courses
- [ ] Can click "Enroll Now"
- [ ] Can select payment method
- [ ] Can click "Pay"
- [ ] No 404 error
- [ ] Processing spinner appears
- [ ] Success message appears
- [ ] Modal closes
- [ ] Redirected to course player
- [ ] Course in "My Learning"
- [ ] Progress shows 0%

## What to Do Next

### 1. Test Multiple Enrollments
```
1. Enroll in first course (success)
2. Go back to courses
3. Enroll in second course (success)
4. Go to "My Learning"
5. Should see both courses
```

### 2. Test Course Access
```
1. Click on enrolled course
2. Should open course player
3. Should see videos
4. Should see quizzes
5. Should see assignments
```

### 3. Test Progress Tracking
```
1. Watch a video completely
2. Progress should update
3. Lesson should be marked ✅
4. Progress bar should increase
```

### 4. Test Notifications
```
1. Click bell icon in navbar
2. Should see notifications
3. Should show unwatched videos
4. Should show incomplete quizzes
5. Should show pending assignments
```

## Success!

If you see:
- ✅ "Successfully Enrolled!" message
- ✅ Course in "My Learning"
- ✅ Can access course player
- ✅ Can watch videos

Then the 404 fix is working correctly! 🎉

---

**Need Help?**
- See `FIX_404_ENROLLMENT_ERROR.md` for detailed explanation
- Check browser console (F12) for errors
- Check backend terminal for logs
- Restart backend if needed
