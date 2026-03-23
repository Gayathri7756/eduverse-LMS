# Quick Test Guide - Learning Path Modal Feature

## Pre-Test Setup

1. **Hard Refresh Browser**: Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Ensure Backend is Running**: `npm start` in `/backend` folder
3. **Ensure Frontend is Running**: `npm run dev` in `/frontend` folder

## Test Case 1: Single Topic

### Steps:
1. Go to Learning Path Generator page
2. Enter: `Python`
3. Click "Generate Learning Path"
4. Wait for generation to complete

### Expected Results:
- ✅ One learning path card appears
- ✅ Card shows "Learning Path 1"
- ✅ Card title: "Complete Python Mastery"
- ✅ Shows 5 modules:
  - Module 1: Introduction to Python
  - Module 2: Core Concepts of Python
  - Module 3: Practical Implementation
  - Module 4: Advanced Techniques
  - Module 5: Projects & Mastery
- ✅ Each module shows:
  - Module number (1, 2, 3, etc.)
  - Module name
  - Summary text
  - Key Points (3 specific topics with ✓ checkmarks)
  - Study Material (detailed content in box)

### Module Content Check:
- ✅ Key Points are SPECIFIC (e.g., "Variables", "Functions", "Loops")
- ✅ NOT generic (e.g., NOT "Basics", "Fundamentals", "Overview")
- ✅ Study Material has 3-4 sentences with examples

## Test Case 2: Click Module to Open Modal

### Steps:
1. From Test Case 1 results
2. Click on any module card (e.g., Module 1)

### Expected Results:
- ✅ Modal opens with dark overlay
- ✅ Modal header shows:
  - "Module 1" (or appropriate number)
  - Module name (e.g., "Introduction to Python")
  - Close button (✕) in top right
- ✅ Modal content shows:
  - **Overview** section with summary
  - **Key Topics You'll Learn** section with 3 topics in boxes with ✓
  - **Study Material** section with detailed content
- ✅ Modal footer shows:
  - "Back" button (left)
  - "Find Related Courses" button (right, purple)

### Interaction Check:
- ✅ Click "Back" button closes modal
- ✅ Click "✕" button closes modal
- ✅ Modal is scrollable if content is long

## Test Case 3: Find Related Courses from Modal

### Steps:
1. From Test Case 2 (modal is open)
2. Click "Find Related Courses" button

### Expected Results:
- ✅ Navigates to Courses page
- ✅ URL shows: `/courses?search=Python`
- ✅ Search field is auto-populated with "Python"
- ✅ Courses are filtered to show only Python-related courses
- ✅ NOT showing all 35 courses
- ✅ Shows only relevant courses (e.g., "Python Basics", "Python Advanced", etc.)

## Test Case 4: Multiple Topics

### Steps:
1. Go to Learning Path Generator page
2. Enter: `Python, Java`
3. Click "Generate Learning Path"
4. Wait for generation

### Expected Results:
- ✅ TWO learning path cards appear
- ✅ First card: "Complete Python Mastery"
- ✅ Second card: "Complete Java Mastery"
- ✅ Each has 5 modules
- ✅ Python modules show Python-specific topics
- ✅ Java modules show Java-specific topics

### Python Topics Should Include:
- Variables, Functions, Loops, Decorators, Generators, etc.

### Java Topics Should Include:
- Variables, Data Types, Classes, Objects, OOP, Design Patterns, etc.

## Test Case 5: Multiple Topics - Course Filtering

### Steps:
1. From Test Case 4 results
2. Click on a Python module
3. Click "Find Related Courses"

### Expected Results:
- ✅ Shows Python courses only
- ✅ URL: `/courses?search=Python`

### Steps (continued):
4. Go back to Learning Path
5. Click on a Java module
6. Click "Find Related Courses"

### Expected Results:
- ✅ Shows Java courses only
- ✅ URL: `/courses?search=Java`
- ✅ Different courses than Python

## Test Case 6: Complex Topics

### Steps:
1. Go to Learning Path Generator page
2. Enter: `Web Development, Data Science`
3. Click "Generate Learning Path"

### Expected Results:
- ✅ TWO learning paths appear
- ✅ Web Development path shows:
  - HTML, CSS, JavaScript, Responsive Design, etc.
- ✅ Data Science path shows:
  - NumPy, Pandas, Visualization, Statistics, ML, etc.
- ✅ Each module is clickable
- ✅ Course filtering works for each topic

## Test Case 7: Generate Another Path

### Steps:
1. From any test case with results
2. Click "← Generate Another Path" button

### Expected Results:
- ✅ Returns to input form
- ✅ Input field is cleared
- ✅ Can enter new topics

## Troubleshooting

### Issue: Modal doesn't open when clicking module
- **Solution**: Hard refresh browser (Ctrl+Shift+R)
- **Check**: Verify click handler is in GenerateLearningPath.jsx line ~137

### Issue: Course filtering shows all courses
- **Solution**: Check CourseCatalog.jsx is reading search parameter
- **Check**: URL should have `?search=TopicName`

### Issue: Topics are generic (Basics, Fundamentals)
- **Solution**: Check GEMINI_API_KEY is set in backend .env
- **Check**: Verify geminiApi.js prompt is requesting specific topics

### Issue: Only showing 1 topic when entering multiple
- **Solution**: Hard refresh browser
- **Check**: Verify topics are separated by comma or newline

## Success Criteria ✅

All of the following must be true:

- [ ] Single topic generates 1 learning path with 5 modules
- [ ] Multiple topics generate separate paths (1 per topic)
- [ ] Each module is clickable
- [ ] Modal opens with full content
- [ ] Modal closes properly
- [ ] "Find Related Courses" filters by specific topic
- [ ] Topics are specific (not generic)
- [ ] Course filtering works correctly
- [ ] No errors in browser console
- [ ] No errors in backend console

## Status: READY TO TEST ✅

All code changes are complete. Run through the test cases above to verify everything works.
