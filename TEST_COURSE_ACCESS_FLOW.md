# Test Course Access Flow

## Pre-Test Checklist
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Browser console open (F12)
- [ ] No errors in console

## Test 1: View Course Without Enrollment

### Steps:
1. [ ] Open http://localhost:5173
2. [ ] Click on any course (e.g., "React for Beginners")
3. [ ] Course detail page opens

### Expected Results:
- [ ] Course title visible: "React for Beginners"
- [ ] Course description visible
- [ ] Instructor name visible: "React Master"
- [ ] Duration visible: "4 weeks"
- [ ] Students count visible: "5"
- [ ] Price visible: "₹499"
- [ ] Course features visible (Comprehensive, Expert, Certificate)
- [ ] Course stats visible (Students, Duration, Sections, Lessons)
- [ ] "Enroll Now" button visible
- [ ] **"Course Content Locked" message visible** 🔒
- [ ] **"Enroll Now to Unlock" button visible**
- [ ] **NO sections visible**
- [ ] **NO lessons visible**
- [ ] **NO YouTube videos visible**

### Verification:
```
✓ Content is locked before enrollment
✓ User cannot see course structure
✓ User cannot see videos
✓ Clear call-to-action to enroll
```

---

## Test 2: Complete Enrollment Process

### Steps:
1. [ ] Click "Enroll Now" button
2. [ ] Registration modal opens
3. [ ] Fill form with valid data:
   - [ ] Full Name: John Doe
   - [ ] Email: john@example.com
   - [ ] Phone: 9876543210
   - [ ] Address: 123 Main Street
   - [ ] City: Mumbai (select from dropdown)
   - [ ] State: Maharashtra (select from dropdown)
   - [ ] Zip Code: 400001
4. [ ] Click "Continue to Payment"
5. [ ] Payment modal opens
6. [ ] Select payment method: Paytm
7. [ ] Click "Pay Now"
8. [ ] Wait for processing (2 seconds)
9. [ ] Modal closes automatically

### Expected Results:
- [ ] Registration form validates all fields
- [ ] No error messages
- [ ] Payment modal shows payment methods
- [ ] Payment summary shows:
  - [ ] Course Price: ₹499
  - [ ] Tax (18%): ₹90
  - [ ] Total Amount: ₹589
- [ ] Processing screen shows spinner
- [ ] Modal closes after 2 seconds
- [ ] No errors in console

### Verification:
```
✓ Registration form works
✓ Payment method selection works
✓ Payment processing works
✓ Modal closes on success
```

---

## Test 3: Course Appears in My Learning

### Steps:
1. [ ] After enrollment, go to "My Learning" in navbar
2. [ ] My Learning dashboard opens

### Expected Results:
- [ ] Enrolled course appears in dashboard
- [ ] Course card shows:
  - [ ] Course thumbnail
  - [ ] Course title: "React for Beginners"
  - [ ] Instructor name: "React Master"
  - [ ] Progress bar: 0%
  - [ ] Category badge
- [ ] "Click to Continue" or similar button visible
- [ ] Can click course card

### Verification:
```
✓ Course added to My Learning
✓ Course card displays correctly
✓ Progress shows 0%
✓ Can click to access course
```

---

## Test 4: View Course After Enrollment

### Steps:
1. [ ] From My Learning, click on enrolled course
2. [ ] Course detail page opens

### Expected Results:
- [ ] Course title visible
- [ ] Course description visible
- [ ] Instructor info visible
- [ ] Course stats visible
- [ ] **"You're Enrolled!" message visible** ✓
- [ ] **"Start Learning" button visible**
- [ ] **Course content is NOW VISIBLE** 🔓
- [ ] **All sections visible**
- [ ] **All lessons visible**
- [ ] **Lesson titles visible**
- [ ] **Lesson descriptions visible**
- [ ] **"Start Learning" button in sidebar**

### Verification:
```
✓ Content is unlocked after enrollment
✓ All sections visible
✓ All lessons visible
✓ "Start Learning" button available
✓ "You're Enrolled!" confirmation shown
```

---

## Test 5: Access Video Player

### Steps:
1. [ ] Click "Start Learning" button
2. [ ] Video player page opens

### Expected Results:
- [ ] Dark theme interface (gray-900 background)
- [ ] YouTube video embedded
- [ ] Video player controls visible
- [ ] Sidebar shows all sections and lessons
- [ ] Current lesson highlighted
- [ ] Can click to play video
- [ ] Watch time displays
- [ ] Status shows "Playing" or "Paused"

### Verification:
```
✓ Video player opens
✓ YouTube video embedded
✓ Sidebar navigation works
✓ Can play video
✓ Activity tracking works
```

---

## Test 6: Activity Tracking

### Steps:
1. [ ] In video player, click play
2. [ ] Watch video for 1+ minute
3. [ ] Check activity logs

### Expected Results:
- [ ] Video plays
- [ ] Watch time updates
- [ ] Status shows "Playing"
- [ ] Activity logged every minute
- [ ] Can check logs at: http://localhost:5000/api/activity/all

### Verification:
```
✓ Video plays
✓ Activity tracked
✓ Watch time recorded
✓ Logs accessible
```

---

## Test 7: Multiple Enrollments

### Steps:
1. [ ] Go back to homepage
2. [ ] Click another course
3. [ ] Enroll in second course
4. [ ] Go to My Learning

### Expected Results:
- [ ] Both courses appear in My Learning
- [ ] Each has separate progress
- [ ] Can access both courses
- [ ] Each has separate video player

### Verification:
```
✓ Multiple enrollments work
✓ Each course tracked separately
✓ Progress independent
✓ Can access all enrolled courses
```

---

## Test 8: Enrollment Persistence

### Steps:
1. [ ] Enroll in a course
2. [ ] Refresh page (F5)
3. [ ] Go to My Learning

### Expected Results:
- [ ] Course still appears in My Learning
- [ ] Progress still shows 0%
- [ ] Can still access course
- [ ] Enrollment persists

### Verification:
```
✓ Enrollment persists after refresh
✓ Course data saved
✓ Can access anytime
```

---

## Test 9: Unauthenticated User

### Steps:
1. [ ] Logout (if logged in)
2. [ ] Click on a course
3. [ ] Click "Enroll Now"

### Expected Results:
- [ ] Redirected to login page
- [ ] Cannot enroll without login
- [ ] Clear message to login first

### Verification:
```
✓ Unauthenticated users cannot enroll
✓ Redirected to login
✓ Security maintained
```

---

## Test 10: Instructor View

### Steps:
1. [ ] Login as instructor
2. [ ] Click on a course
3. [ ] View course detail

### Expected Results:
- [ ] Instructor sees course info
- [ ] No "Enroll Now" button
- [ ] Can see course content
- [ ] Can edit course (if owner)

### Verification:
```
✓ Instructor view different
✓ No enrollment for instructors
✓ Can manage courses
```

---

## Test 11: Error Handling

### Steps:
1. [ ] Try to enroll with invalid phone
2. [ ] Try to enroll with invalid zip
3. [ ] Try to enroll without payment method

### Expected Results:
- [ ] Error messages shown
- [ ] Cannot proceed with errors
- [ ] Can correct and retry
- [ ] Clear guidance provided

### Verification:
```
✓ Validation works
✓ Error messages clear
✓ Cannot submit with errors
✓ Can retry after correction
```

---

## Test 12: UI/UX

### Steps:
1. [ ] Check course detail page layout
2. [ ] Check enrollment modal layout
3. [ ] Check video player layout
4. [ ] Check My Learning layout

### Expected Results:
- [ ] All pages responsive
- [ ] Mobile friendly
- [ ] Desktop friendly
- [ ] Tablet friendly
- [ ] No layout issues
- [ ] All buttons clickable
- [ ] All text readable

### Verification:
```
✓ Responsive design
✓ Professional appearance
✓ Good user experience
✓ Accessible on all devices
```

---

## Test 13: Content Lock/Unlock

### Steps:
1. [ ] View course before enrollment
2. [ ] Note: Content locked
3. [ ] Enroll in course
4. [ ] View course after enrollment
5. [ ] Note: Content unlocked

### Expected Results:
- [ ] Before: "Course Content Locked" visible
- [ ] Before: NO sections/lessons visible
- [ ] Before: NO videos visible
- [ ] After: "You're Enrolled!" visible
- [ ] After: All sections visible
- [ ] After: All lessons visible
- [ ] After: Can access videos

### Verification:
```
✓ Content properly locked before enrollment
✓ Content properly unlocked after enrollment
✓ Security maintained
✓ User experience clear
```

---

## Test 14: Payment Summary

### Steps:
1. [ ] Enroll in course
2. [ ] Go to payment step
3. [ ] Check payment summary

### Expected Results:
- [ ] Course price shown: ₹499
- [ ] Tax calculated: ₹90 (18%)
- [ ] Total shown: ₹589
- [ ] Math correct
- [ ] Clearly formatted

### Verification:
```
✓ Payment summary accurate
✓ Tax calculated correctly
✓ Total correct
✓ Clear presentation
```

---

## Test 15: Browser Compatibility

### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] Responsive design works

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Responsive design works

### Safari
- [ ] All features work
- [ ] No console errors
- [ ] Responsive design works

---

## Final Checklist

- [ ] Course content locked before enrollment
- [ ] Enrollment process works
- [ ] Course appears in My Learning
- [ ] Course content unlocked after enrollment
- [ ] Video player works
- [ ] Activity tracking works
- [ ] Multiple enrollments work
- [ ] Enrollment persists
- [ ] Unauthenticated users cannot enroll
- [ ] Instructor view different
- [ ] Error handling works
- [ ] UI/UX professional
- [ ] Content lock/unlock works
- [ ] Payment summary correct
- [ ] Works on all browsers
- [ ] No console errors
- [ ] Ready for production

---

## Summary

✅ **Before Enrollment**: Content locked, no videos visible
✅ **After Enrollment**: Content unlocked, all videos accessible
✅ **My Learning**: Shows all enrolled courses
✅ **Video Player**: YouTube videos embedded, activity tracked
✅ **Security**: Proper access control maintained
✅ **User Experience**: Clear and professional

**Status**: Ready for testing!
