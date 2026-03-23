# Quick Test Guide - AI Study Planner

## 🚀 Start Here

### 1. Install Dependencies (First Time Only)
```bash
# Frontend
cd frontend
npm install

# Backend (if not done)
cd ../backend
npm install
```

### 2. Start Backend
```bash
cd backend
npm start
```
Expected output:
```
Server running on port 5000
Health check: http://localhost:5000/health
```

### 3. Start Frontend (New Terminal)
```bash
cd frontend
npm run dev
```
Expected output:
```
VITE v5.0.8  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 4. Open Browser
Navigate to: `http://localhost:5173`

---

## 📋 Test Checklist

### Test 1: Generate Study Plan ✅
- [ ] Click "Study Planner" in navbar
- [ ] Login if needed
- [ ] Select "Machine Learning"
- [ ] Select "2 hours per day"
- [ ] Select "3 months"
- [ ] Click "Generate Plan"
- [ ] Wait for plan to load
- [ ] Verify plan shows 4 weeks with topics

### Test 2: Copy to Text ✅
- [ ] Click "📋 Copy Text" button
- [ ] See alert: "Study plan copied to clipboard!"
- [ ] Open Notepad/Word
- [ ] Paste (Ctrl+V)
- [ ] Verify formatted text with all sections

### Test 3: Download PDF ✅
- [ ] Click "📄 Download PDF" button
- [ ] File downloads: `study-plan-machine-learning.pdf`
- [ ] Open PDF file
- [ ] Verify all content is visible and formatted

### Test 4: Save Plan ✅
- [ ] Click "💾 Save Plan" button
- [ ] See alert: "Study plan saved successfully!"
- [ ] Redirected to student dashboard
- [ ] Plan should appear in saved plans (if dashboard shows them)

### Test 5: Create New Plan ✅
- [ ] Click "New Plan" button
- [ ] Select different goal (e.g., "Web Development")
- [ ] Select different time (e.g., "1 hour per day")
- [ ] Select different duration (e.g., "1 month")
- [ ] Generate and verify new plan

### Test 6: Different Goals ✅
Test at least 3 different goals:
- [ ] Machine Learning
- [ ] Web Development
- [ ] Python Programming
- [ ] Data Science
- [ ] React.js

---

## 🔍 What to Verify

### Plan Content
- ✅ Week-by-week breakdown
- ✅ Topics with descriptions
- ✅ Practice tasks
- ✅ YouTube recommendations
- ✅ Summary section

### Copy to Text
- ✅ Formatted with headers
- ✅ All sections included
- ✅ Readable structure
- ✅ No missing content

### PDF Download
- ✅ File downloads with correct name
- ✅ All content visible
- ✅ Proper formatting
- ✅ Multi-page if needed

### Save Functionality
- ✅ No errors in console
- ✅ Success alert appears
- ✅ Redirects to dashboard
- ✅ Plan persists (check backend logs)

---

## 🐛 Common Issues & Fixes

### Issue: "Failed to generate study plan"
```
Fix: Check backend is running
- Terminal 1: cd backend && npm start
- Should see "Server running on port 5000"
```

### Issue: "Failed to save study plan"
```
Fix: Make sure you're logged in
- Login first, then try saving
- Check browser console for token errors
```

### Issue: "Failed to download PDF"
```
Fix: Install dependencies
- cd frontend
- npm install
- npm run dev
```

### Issue: Copy button doesn't work
```
Fix: Use localhost (not IP address)
- Go to http://localhost:5173
- Not http://192.168.x.x:5173
```

---

## 📊 Expected Results

### Generate Plan Response
```json
{
  "success": true,
  "plan": {
    "weeklyPlan": [
      {
        "week": "Week 1: Python Fundamentals",
        "topics": [
          {
            "title": "Python Basics",
            "description": "Variables, data types, operators"
          }
        ],
        "practiceTask": "Write 5 Python programs...",
        "youtubeTopics": ["Python for Beginners - Crash Course"]
      }
    ],
    "summary": "This 4-week plan covers..."
  }
}
```

### Save Plan Response
```json
{
  "success": true,
  "plan": {
    "id": "plan-1234567890",
    "userId": "user123",
    "goal": "Machine Learning",
    "studyHoursPerDay": 2,
    "goalDurationMonths": 3,
    "createdAt": "2024-03-13T...",
    "status": "active"
  }
}
```

---

## ✅ Success Criteria

All tests pass when:
1. ✅ Plans generate without errors
2. ✅ Copy to text works and copies formatted content
3. ✅ PDF downloads with correct filename
4. ✅ Save functionality works without errors
5. ✅ All 5 goals generate different plans
6. ✅ No console errors
7. ✅ UI is responsive and looks good

---

## 📝 Notes

- Plans are stored in-memory (backend memory)
- No Firebase required for this feature
- All 5 goals have pre-built plans
- Plans are customizable based on study time and duration
- PDF generation requires jspdf and html2canvas

---

## 🎯 Next Feature

After AI Study Planner is complete:
**Coding Playground** - Monaco Editor + Python/JavaScript execution
