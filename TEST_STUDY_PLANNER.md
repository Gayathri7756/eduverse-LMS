# Test AI Study Planner

## Prerequisites
1. Backend running: http://localhost:5000
2. Frontend running: http://localhost:5173
3. User logged in (or will be redirected to login)

## Step-by-Step Test

### Step 1: Login
1. Go to http://localhost:5173
2. Click "Login"
3. Use test credentials:
   - Email: test@example.com
   - Password: password123

### Step 2: Access Study Planner
1. Click "🎯 Study Planner" in navbar
2. Should see "What do you want to learn?" page

### Step 3: Select Goal
1. Click "Machine Learning"
2. Button should turn blue
3. Click "Continue"

### Step 4: Select Study Time
1. Should see "How much time can you study daily?"
2. Click "2 hours per day"
3. Button should turn blue
4. Click "Continue"

### Step 5: Select Duration
1. Should see "What's your goal duration?"
2. Click "3 months"
3. Button should turn blue
4. Click "Generate Plan"

### Step 6: Wait for Generation
1. Should see spinner with "Creating your personalized study plan..."
2. Wait 1-2 seconds

### Step 7: View Plan
1. Should see "Your Study Plan" page
2. Should show: "Machine Learning • 2 hours/day • 3 months"
3. Should see 4 weeks:
   - Week 1: Python Fundamentals
   - Week 2: NumPy & Pandas
   - Week 3: Statistics & Probability
   - Week 4: Linear Regression

### Step 8: Check Content
For each week, should see:
- Week title
- Topics (with bullet points)
  - Topic title
  - Topic description
- Practice Task (in blue box)
- Recommended Videos (in purple box)

### Step 9: Check Summary
- Should see green box with "📊 Plan Summary"
- Should contain text about the plan

### Step 10: Save Plan
1. Click "Save to Dashboard"
2. Should redirect to student dashboard
3. Plan should appear in dashboard

## Expected Results

✅ All 5 steps work smoothly
✅ Plan generates in < 2 seconds
✅ All 4 weeks display correctly
✅ Topics show as bullet points
✅ Practice tasks visible
✅ YouTube recommendations visible
✅ Summary visible
✅ Can save to dashboard

## Troubleshooting

### Issue: Redirected to login
- **Solution**: Login first, then access study planner

### Issue: Plan not generating
- **Solution**: Check browser console (F12) for errors
- Check backend logs for errors
- Verify backend is running on port 5000

### Issue: Topics not showing
- **Solution**: Check browser console
- Verify data structure in network tab
- Check if topics array is being received

### Issue: Page blank
- **Solution**: Refresh page
- Clear browser cache
- Check console for errors

## Browser Console Check

Open DevTools (F12) and check:
1. Network tab - POST to /api/ai/study-plan should return 200
2. Console tab - should see logs:
   - "Generating plan with: {...}"
   - "Plan generated: {...}"
   - "Weekly plan: [...]"
   - "First week topics: [...]"

## API Test (Direct)

```bash
curl -X POST http://localhost:5000/api/ai/study-plan \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Machine Learning",
    "studyHoursPerDay": 2,
    "goalDurationMonths": 3,
    "userId": "test-user"
  }'
```

Should return JSON with weeklyPlan array containing 4 weeks.

## Success Criteria

- ✅ Page loads without errors
- ✅ All 5 steps work
- ✅ Plan generates successfully
- ✅ All content displays correctly
- ✅ Can save to dashboard
- ✅ No console errors
- ✅ Responsive on mobile/tablet/desktop

## Next Steps

1. Test all 5 learning goals
2. Test different study times (1, 2, 3 hours)
3. Test different durations (1, 3, 6 months)
4. Test on different browsers
5. Test on mobile devices
6. Verify saved plans appear in dashboard
