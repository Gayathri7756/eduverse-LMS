# Test Progress Tracking & Certificate Generation

## Quick Test Steps

### 1. Test Progress Display (33% per component)
1. Go to "My Learning"
2. Find an enrolled course
3. **Expected**: See three boxes showing:
   - Videos: X%
   - Quizzes: X%
   - Assignments: X%
4. **Expected**: Overall progress = (Videos + Quizzes + Assignments) / 3

### 2. Test Partial Progress
1. Watch 1 video (Videos: 20%)
2. Pass 1 quiz (Quizzes: 20%)
3. Submit 1 assignment (Assignments: 20%)
4. **Expected**: Overall = (20 + 20 + 20) / 3 = 20%
5. **Expected**: Button shows "Continue"

### 3. Test 100% Progress
1. Watch all 5 videos (Videos: 100%)
2. Pass all 5 quizzes (Quizzes: 100%)
3. Submit all 5 assignments (Assignments: 100%)
4. Go to "My Learning"
5. **Expected**: Overall = 100%
6. **Expected**: Button shows "🎓 Generate Certificate" (green)

### 4. Test Certificate Generation
1. Click "🎓 Generate Certificate" button
2. **Expected**: Redirected to certificate page
3. **Expected**: See professional certificate with:
   - Student name
   - Course name
   - Completion date
   - Certificate number
   - Instructor name

### 5. Test Certificate Download
1. On certificate page, click "📥 Download Certificate"
2. **Expected**: Success message appears
3. **Expected**: Certificate data ready for download

### 6. Test Certificate Persistence
1. Generate certificate
2. Go back to My Learning
3. **Expected**: Button now shows "Review Course"
4. Click "Review Course"
5. **Expected**: Can still view certificate

### 7. Test Share Options
1. On certificate page, see share buttons
2. **Expected**: Three buttons:
   - 📘 Share on Facebook
   - 𝕏 Share on Twitter
   - 💼 Share on LinkedIn

---

## Progress Calculation Examples

### Example 1: Starting Course
```
Videos: 0% (0/5 watched)
Quizzes: 0% (0/5 passed)
Assignments: 0% (0/5 submitted)
Overall: 0%
Button: Continue
```

### Example 2: Halfway Through
```
Videos: 100% (5/5 watched)
Quizzes: 50% (2/4 passed)
Assignments: 0% (0/5 submitted)
Overall: (100 + 50 + 0) / 3 = 50%
Button: Continue
```

### Example 3: Almost Done
```
Videos: 100% (5/5 watched)
Quizzes: 100% (5/5 passed)
Assignments: 80% (4/5 submitted)
Overall: (100 + 100 + 80) / 3 = 93%
Button: Continue
```

### Example 4: Complete
```
Videos: 100% (5/5 watched)
Quizzes: 100% (5/5 passed)
Assignments: 100% (5/5 submitted)
Overall: (100 + 100 + 100) / 3 = 100%
Button: 🎓 Generate Certificate
```

---

## What Changed

### Frontend
- ✅ MyLearning shows three-part progress breakdown
- ✅ Certificate button appears at 100%
- ✅ New CertificatePage component
- ✅ Professional certificate display
- ✅ Download and share options

### Backend
- ✅ Progress calculation: 33.33% per component
- ✅ Certificate generation endpoint
- ✅ Certificate storage in database
- ✅ Certificate retrieval endpoints

---

## Expected Behavior

### Progress Bar
- Shows overall percentage (0-100%)
- Updates in real-time
- Color: Blue gradient

### Progress Breakdown
- Three boxes: Videos, Quizzes, Assignments
- Each shows percentage
- Updates as user completes activities

### Certificate Button
- Appears only when progress = 100%
- Green gradient background
- Text: "🎓 Generate Certificate"
- Replaces "Continue" button

### Certificate Page
- Professional design
- Decorative borders
- All course details
- Download button
- Share buttons
- Navigation options

---

## Troubleshooting

### Progress not updating
- Refresh the page
- Check that videos/quizzes/assignments are being marked complete
- Verify backend is running

### Certificate button not showing
- Ensure all three components are at 100%
- Refresh My Learning page
- Check browser console for errors

### Certificate not generating
- Verify you're logged in
- Check that course is fully completed
- Try again or refresh page

### Download not working
- Check browser console for errors
- Verify backend is running
- Try downloading again

