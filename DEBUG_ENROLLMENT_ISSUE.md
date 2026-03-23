# Debug - Enrollment Not Showing in My Learning

## Issue
After enrolling in a course, the course is not appearing in My Learning section.

## Root Cause Found
The token was not being decoded correctly. The Firebase ID token uses `sub` field for user ID, not `uid`. The middleware has been updated to handle this.

## What Was Fixed
1. Updated auth middleware to check for `sub` field in JWT token
2. Added detailed logging to track the issue
3. Middleware now correctly extracts user ID from token

## Current Status
Backend has been restarted with the fix. All previous enrollments have been cleared (in-memory database).

## What to Do Now

### Step 1: Try Enrolling Again
1. Go to http://localhost:5173/courses
2. Click "Enroll Now" on any course
3. Select a payment method
4. Click "Pay"
5. Wait for success message

### Step 2: Check Backend Logs
When you enroll, you should see in the backend console:
```
=== ENROLL-ON-PAYMENT REQUEST ===
Body userId: LNWKwxM5Zxcm6OWN...
Course ID: course-1
Payment Method: paytm
Final userId to use: LNWKwxM5Zxcm6OWN...
✅ Enrollment created: { ... }
Total enrollments now: 1
All enrollments: [ { userId: 'LNWKwxM5Zxcm6OWN...', courseId: 'course-1' } ]
```

### Step 3: Check Enrollment Status
After the page reloads, you should see:
```
=== CHECK ENROLLMENT REQUEST ===
User UID: LNWKwxM5Zxcm6OWN...
Course ID: course-1
Total enrollments in DB: 1
All enrollments: [ { userId: 'LNWKwxM5Zxcm6OWN...', courseId: 'course-1' } ]
Enrollment found: true
```

### Step 4: Go to My Learning
1. Click "My Learning" in the navigation
2. You should see the enrolled course

### Step 5: Check My Learning Logs
When you visit My Learning, you should see:
```
=== MY-COURSES REQUEST ===
User UID from token: LNWKwxM5Zxcm6OWN...
Total enrollments in DB: 1
All enrollments: [ { userId: 'LNWKwxM5Zxcm6OWN...', courseId: 'course-1' } ]
Student enrollments found: 1
✅ Returning 1 courses
```

## Expected Result
- ✅ Enrollment modal shows success
- ✅ Page reloads
- ✅ Course detail page shows "✓ Already Enrolled" button
- ✅ My Learning shows the enrolled course

## If Still Not Working

### Check 1: Backend Logs
- Look for "ENROLL-ON-PAYMENT" logs
- Look for "CHECK ENROLLMENT" logs
- Look for "MY-COURSES" logs
- Check if userId matches across all logs

### Check 2: Frontend Console
- Open browser DevTools (F12)
- Go to Console tab
- Look for any error messages
- Check if token is being sent

### Check 3: Network Tab
- Open browser DevTools (F12)
- Go to Network tab
- Enroll in a course
- Check the request/response for `/enroll-on-payment`
- Check the request/response for `/check/course-id`
- Check the request/response for `/my-courses`

## Key Points
- Token now correctly decoded from `sub` field
- UserId should match between enrollment and token
- Enrollments are stored in in-memory database (cleared on backend restart)
- All endpoints have detailed logging for debugging

## Next Steps
1. Try enrolling again
2. Check backend logs
3. Go to My Learning
4. Verify course appears
5. Report any errors you see in the logs
