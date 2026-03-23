# Quick Test - Task 5 Features

## 🚀 FAST TEST (5 minutes)

### Step 1: Test Quiz Timer
```
1. Go to any course → Click "Start Learning"
2. Scroll to Quizzes section → Click any quiz
3. Click "Start Quiz" button
4. ⏱️ Timer should appear in top right, counting down
5. Wait 30 seconds - verify timer decrements
6. When timer ≤60 seconds - should turn RED
7. Let timer reach 0 - quiz auto-submits
```

**Expected**: Timer works, auto-submits at 0

---

### Step 2: Test Enrollment Check
```
1. Go to Course Catalog
2. Click any course card
3. Click "Enroll Now" button
4. Select payment method → Pay
5. ✅ Should see "Successfully Enrolled!"
6. Go back to same course
7. Click "Enroll Now" again
8. ✅ Should see "Already Enrolled" message
9. Click "Continue Learning" button
10. ✅ Should go to course player
```

**Expected**: Can't enroll twice, shows "Already Enrolled"

---

### Step 3: Test My Learning
```
1. Enroll in 2-3 courses (repeat Step 2 for each)
2. Click "My Learning" in navbar
3. ✅ Should see all enrolled courses
4. Each course should show:
   - Thumbnail image
   - Course title
   - Progress bar (0%)
   - "Continue" button
5. Click "Continue" on any course
6. ✅ Should go to course player
```

**Expected**: My Learning shows all enrolled courses

---

## 🔍 DETAILED TEST (15 minutes)

### Test Quiz Timer Details
```
1. Start a quiz with 30-minute time limit
2. Verify timer shows: MM:SS format
3. Verify timer decrements every second
4. At 1:00 remaining - should turn red
5. At 0:00 - should auto-submit
6. Check quiz results page shows score
```

### Test Enrollment Flow
```
1. First enrollment:
   - Click "Enroll Now"
   - See payment form
   - Select payment method
   - Click "Pay ₹XXX"
   - See "Processing..."
   - See "Successfully Enrolled!"
   
2. Second enrollment (same course):
   - Click "Enroll Now"
   - See "Already Enrolled!" message
   - Click "Continue Learning"
   - Go to course player
```

### Test My Learning Progress
```
1. Enroll in course
2. Go to My Learning
3. See course with 0% progress
4. Go to course player
5. Watch a video (mark as watched)
6. Go back to My Learning
7. Progress should update
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] Quiz timer displays MM:SS format
- [ ] Timer counts down every second
- [ ] Timer turns red at ≤60 seconds
- [ ] Quiz auto-submits when timer reaches 0
- [ ] First enrollment shows payment form
- [ ] Second enrollment shows "Already Enrolled"
- [ ] "Continue Learning" button works
- [ ] My Learning shows all enrolled courses
- [ ] Progress bar visible for each course
- [ ] "Continue" button navigates to course
- [ ] No console errors

---

## 🐛 TROUBLESHOOTING

### Timer not showing?
- Check browser console for errors
- Verify quiz has `timeLimit` field
- Refresh page and try again

### "Already Enrolled" not showing?
- Check backend is running
- Verify enrollment was saved
- Check browser console for API errors

### My Learning shows no courses?
- Verify you're logged in
- Check you've enrolled in at least one course
- Verify backend `/api/enrollments/my-courses` endpoint works

### Progress not updating?
- Progress updates when videos are marked as watched
- Check progress tracking is implemented
- May need to refresh page to see updates

---

## 📱 TEST ACCOUNTS

Use any test account you created during signup:
- Email: test@example.com
- Password: Test@123

Or create new accounts as needed.

---

## 🎯 SUCCESS CRITERIA

All tests pass when:
1. ✅ Quiz timer works correctly
2. ✅ Enrollment check prevents duplicates
3. ✅ My Learning shows enrolled courses
4. ✅ No console errors
5. ✅ All buttons navigate correctly
