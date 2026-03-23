# Quick Start - AI Study Planner

## 30-Second Setup

### 1. Both Servers Running?
```
Backend: http://localhost:5000 ✅
Frontend: http://localhost:5173 ✅
```

### 2. Go Here
```
http://localhost:5173/study-planner
```

### 3. Test It
1. **Login** (if not already)
   - Email: test@example.com
   - Password: password123

2. **Select Goal**: Machine Learning

3. **Choose Time**: 2 hours/day

4. **Choose Duration**: 3 months

5. **Generate**: Click "Generate Plan"

6. **See Result**: 4-week study plan with:
   - Week 1: Python Fundamentals
   - Week 2: NumPy & Pandas
   - Week 3: Statistics & Probability
   - Week 4: Linear Regression

7. **Save**: Click "Save to Dashboard"

---

## What Should Happen

✅ Plan generates in < 2 seconds
✅ Shows all 4 weeks
✅ Each week has topics, practice task, videos
✅ Can save to dashboard
✅ Saved plan appears in "My Learning"

---

## If It Doesn't Work

### Check 1: Are servers running?
```
Backend: http://localhost:5000/health
Frontend: http://localhost:5173
```

### Check 2: Browser console (F12)
- Look for red errors
- Check Network tab for API response

### Check 3: Backend logs
- Should see "Generating study plan for: Machine Learning"

### Check 4: Clear cache
- Ctrl+Shift+Delete
- Clear all cache
- Refresh page

---

## That's It!

If it works → AI Study Planner is COMPLETE ✅

If it doesn't → Tell me what error you see
