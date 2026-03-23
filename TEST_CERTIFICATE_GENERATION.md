# Certificate Generation Test - Step by Step

## Your User Info
- **User ID**: LNWKwxM5Zxcm6OWNagqzotP4vvp1
- **Enrolled Courses**: course-1, course-4

## Test Steps

### Step 1: Make sure backend is running
```bash
cd backend
npm start
```
Should see: `Server running on port 5000`

### Step 2: Make sure frontend is running
```bash
cd frontend
npm run dev
```
Should see: `Local: http://localhost:5174`

### Step 3: Open Browser and Login
1. Go to http://localhost:5174
2. Login with your account
3. You should see your enrolled courses

### Step 4: Go to My Learning
1. Click "My Learning" in navbar
2. You should see your enrolled courses (course-1, course-4)
3. Each course shows:
   - Progress: 0%
   - Videos: 0%
   - Quizzes: 0%
   - Assignments: 0%
   - Buttons: "Continue" + "⚡ Quick Complete"

### Step 5: Quick Complete Course-1
1. Find "course-1" card in My Learning
2. Click the purple "⚡ Quick Complete" button
3. Wait for the button to update
4. The course card should now show:
   - Progress: 100%
   - Videos: 100%
   - Quizzes: 100%
   - Assignments: 100%
   - Buttons: "🎓 Generate Certificate" + "Review Course"

### Step 6: Generate Certificate
1. Click the green "🎓 Generate Certificate" button
2. You'll be redirected to the certificate page
3. You should see:
   - 🏆 Trophy icon
   - "Certificate of Completion"
   - Your name
   - Course name: "React Basics" (or whatever course-1 is)
   - Completion date
   - Certificate number (CERT-XXXXX-XXXXX)
   - Instructor name
   - Action buttons: Download, Back, Browse More

### Step 7: Download Certificate
1. Click "📥 Download Certificate" button
2. Certificate data should be ready

### Step 8: Verify Data Persistence
1. Go back to My Learning
2. Refresh the page (F5)
3. The course should still show 100% progress
4. The certificate button should still be there
5. Click it again - certificate should load

---

## Expected Results

### Before Quick Complete
```
Course Card:
├─ Progress: 0%
├─ Videos: 0%
├─ Quizzes: 0%
├─ Assignments: 0%
└─ Buttons: Continue | ⚡ Quick Complete
```

### After Quick Complete
```
Course Card:
├─ Progress: 100%
├─ Videos: 100%
├─ Quizzes: 100%
├─ Assignments: 100%
└─ Buttons: 🎓 Generate Certificate | Review Course
```

### Certificate Page
```
Certificate Display:
├─ 🏆 Trophy Icon
├─ "Certificate of Completion"
├─ Student Name
├─ Course Name
├─ Completion Date
├─ Certificate Number
├─ Instructor Name
└─ Buttons: Download | Back | Browse More
```

---

## Troubleshooting

### Quick Complete Button Not Working
- Check browser console for errors (F12)
- Make sure backend is running on port 5000
- Try refreshing the page

### Certificate Button Not Showing
- Make sure all three progress bars are 100%
- Try refreshing the page
- Check browser console for errors

### Certificate Page Shows Error
- Check browser console for error messages
- Make sure backend is running
- Try going back to My Learning and clicking again

### Data Not Persisting
- Check that `backend/data/db.json` exists
- Make sure backend has write permissions
- Restart backend to reload data

---

## API Calls Made

### 1. Quick Complete
```
POST http://localhost:5000/api/progress/quick-complete/course-1
Headers: Authorization: Bearer {your-token}
```

### 2. Get Progress
```
GET http://localhost:5000/api/progress/course/course-1
Headers: Authorization: Bearer {your-token}
```

### 3. Generate Certificate
```
POST http://localhost:5000/api/certificates/generate/course-1
Headers: Authorization: Bearer {your-token}
```

---

## Success Criteria

✅ Quick Complete button works
✅ Progress updates to 100% on all three
✅ Certificate button appears
✅ Certificate page displays correctly
✅ Certificate shows all details
✅ Data persists after refresh
✅ Can generate certificate multiple times

---

## Next Steps After Testing

1. Test with course-4 as well
2. Test with multiple courses
3. Test certificate download
4. Test data persistence across browser restarts
5. Test with different users
