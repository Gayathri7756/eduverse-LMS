# Quick Test Certificate - Run These Commands

## 🚀 Quick Start (Copy & Paste)

### Terminal 1 - Start Backend
```bash
cd backend && npm start
```

### Terminal 2 - Start Frontend
```bash
cd frontend && npm run dev
```

### Browser
1. Go to http://localhost:5174
2. Login with your account
3. Click "My Learning" in navbar
4. You should see your course with 100% progress
5. Click the green "🎓 Generate Certificate" button
6. View your professional certificate!

---

## What You'll See

### My Learning Page
```
Course: React Basics
Progress: 100%
├─ Videos: 100% ✅
├─ Quizzes: 100% ✅
└─ Assignments: 100% ✅

Button: 🎓 Generate Certificate (GREEN)
```

### Certificate Page
```
🏆 Certificate of Completion

Student Name: Student
Course: React Basics
Completion Date: March 16, 2026
Certificate #: CERT-1773640000000-ABC123XYZ
Instructor: React Expert

Buttons:
- 📥 Download Certificate
- ← Back to My Learning
- Browse More Courses
```

---

## Database Pre-Populated With

✅ 5 Videos Watched
✅ 5 Quizzes Passed (100% each)
✅ 5 Assignments Submitted (100% each)
✅ 1 Certificate Generated

---

## Test Steps

1. **Start Backend**
   ```bash
   cd backend && npm start
   ```
   Wait for: `Server running on port 5000`

2. **Start Frontend**
   ```bash
   cd frontend && npm run dev
   ```
   Wait for: `Local: http://localhost:5174`

3. **Open Browser**
   - Go to http://localhost:5174
   - Login

4. **Navigate to My Learning**
   - Click "My Learning" in navbar
   - See course with 100% progress

5. **Generate Certificate**
   - Click green "🎓 Generate Certificate" button
   - See certificate page

6. **View Certificate**
   - See professional certificate design
   - See all certificate details
   - Click "📥 Download Certificate"

7. **Test Persistence**
   - Refresh page (F5)
   - Certificate should still be there
   - Go back to My Learning
   - Course should still show 100%

---

## Expected Results

✅ Certificate button appears when all three = 100%
✅ Certificate page displays correctly
✅ All certificate details visible
✅ Download button works
✅ Data persists after refresh
✅ Can navigate back and forth

---

## If Something Goes Wrong

### Certificate Button Not Showing
- Refresh page
- Check all three progress bars are 100%
- Check browser console (F12)

### Certificate Page Error
- Check backend is running on port 5000
- Check browser console (F12)
- Try again

### Data Not Loading
- Restart backend
- Check `backend/data/db.json` exists
- Refresh page

---

## Files Modified

- ✅ `backend/data/db.json` - Pre-populated with completed course data
- ✅ `frontend/src/pages/MyLearning.jsx` - Fixed syntax errors
- ✅ All other files already implemented

---

## Ready to Test! 🎉

Everything is set up. Just run the commands above and test the certificate feature!
