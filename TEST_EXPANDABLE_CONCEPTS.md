# Testing Guide - Expandable Concepts with Tutor Explanation & Video

## Pre-Test Setup

1. **Hard Refresh Browser**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Backend Running**: `npm start` in `/backend` folder
3. **Frontend Running**: `npm run dev` in `/frontend` folder
4. **GEMINI_API_KEY**: Set in backend `.env` file

## Test Case 1: Generate Learning Path

### Steps:
1. Go to Learning Path Generator page
2. Enter: `Java`
3. Click "Generate Learning Path"
4. Wait for generation

### Expected Results:
- ✅ One learning path card appears
- ✅ Shows "Complete Java Mastery"
- ✅ Shows 5 modules

---

## Test Case 2: Open Module and See Concepts

### Steps:
1. From Test Case 1 results
2. Click on "Module 1: Getting Started with Java"

### Expected Results:
- ✅ Modal opens
- ✅ Header shows "Module 1" and "Getting Started with Java"
- ✅ Overview section visible
- ✅ **Key Topics You'll Learn** section shows 3 concepts:
  - "What is Java" with ▼ arrow
  - "Why Java Matters" with ▼ arrow
  - "Prerequisites" with ▼ arrow
- ✅ Concepts are clickable (cursor changes to pointer)
- ✅ Study Material section visible below

---

## Test Case 3: Click Concept to Expand

### Steps:
1. From Test Case 2 (modal is open)
2. Click on "What is Java" concept

### Expected Results:
- ✅ Concept expands
- ✅ Arrow changes from ▼ to ▲
- ✅ Blue box appears below concept showing:
  - **📚 Tutor Explanation** heading
  - Detailed explanation (3-4 sentences)
  - **🎥 Watch Video** heading
  - Red button with play icon (▶)
  - Video title (e.g., "Best beginner tutorial for Java")

### Verify Tutor Explanation:
- ✅ Specific to Java
- ✅ Mentions Java is OOP language
- ✅ Mentions platform-independent
- ✅ Mentions JVM
- ✅ Mentions real-world use

### Verify Video Button:
- ✅ Red background
- ✅ Play icon (▶) visible
- ✅ Video title shown
- ✅ Clickable (cursor changes)

---

## Test Case 4: Click Video Button

### Steps:
1. From Test Case 3 (concept is expanded)
2. Click on "▶ Best beginner tutorial for Java" button

### Expected Results:
- ✅ New browser tab opens
- ✅ YouTube search results appear
- ✅ Search query is "Java introduction for beginners"
- ✅ Shows relevant Java tutorial videos
- ✅ Original modal still open in first tab

---

## Test Case 5: Collapse Concept

### Steps:
1. From Test Case 3 (concept is expanded)
2. Click on "What is Java" concept again

### Expected Results:
- ✅ Concept collapses
- ✅ Arrow changes from ▲ to ▼
- ✅ Blue explanation box disappears
- ✅ Smooth animation

---

## Test Case 6: Test All Concepts in Module 1

### Steps:
1. From Test Case 2 (modal is open)
2. Click on "Why Java Matters"

### Expected Results:
- ✅ Concept expands
- ✅ Shows tutor explanation about why Java is important
- ✅ Mentions companies like Google, Netflix, Amazon
- ✅ Mentions Android development
- ✅ Shows video button with title "Why learn Java"

### Steps (continued):
3. Click on "Prerequisites"

### Expected Results:
- ✅ Concept expands
- ✅ Shows tutor explanation about prerequisites
- ✅ Mentions basic computer knowledge
- ✅ Mentions system requirements
- ✅ Shows video button with title "Getting started with Java"

---

## Test Case 7: Test Module 2 - Basic Concepts

### Steps:
1. Close modal (click Back or ✕)
2. Click on "Module 2: Basic Concepts of Java"

### Expected Results:
- ✅ Modal opens for Module 2
- ✅ Shows 3 concepts:
  - First Basic Concept (e.g., "Variables")
  - Second Basic Concept (e.g., "Data Types")
  - Third Basic Concept (e.g., "Operators")

### Steps (continued):
3. Click on first concept

### Expected Results:
- ✅ Expands showing tutor explanation
- ✅ Explanation is specific to the concept
- ✅ Includes examples
- ✅ Shows video button with relevant title

---

## Test Case 8: Test Module 3 - Setup and Installation

### Steps:
1. Close modal
2. Click on "Module 3: Setup and Installation"

### Expected Results:
- ✅ Modal opens for Module 3
- ✅ Shows 3 concepts:
  - System Requirements
  - Installation Steps
  - Verification

### Steps (continued):
2. Click on "System Requirements"

### Expected Results:
- ✅ Expands showing tutor explanation
- ✅ Mentions RAM, disk space, OS requirements
- ✅ Shows video button

### Steps (continued):
3. Click on "Installation Steps"

### Expected Results:
- ✅ Expands showing tutor explanation
- ✅ Mentions where to download (oracle.com)
- ✅ Mentions JDK
- ✅ Mentions setup wizard
- ✅ Shows video button

### Steps (continued):
4. Click on "Verification"

### Expected Results:
- ✅ Expands showing tutor explanation
- ✅ Mentions `java -version` command
- ✅ Mentions `javac -version` command
- ✅ Shows video button

---

## Test Case 9: Test Module 4 - Practical Implementation

### Steps:
1. Close modal
2. Click on "Module 4: Practical Implementation"

### Expected Results:
- ✅ Modal opens for Module 4
- ✅ Shows 3 concepts with practical examples
- ✅ Each concept expands to show tutor explanation
- ✅ Each has a video button

---

## Test Case 10: Test Module 5 - Advanced Techniques

### Steps:
1. Close modal
2. Click on "Module 5: Advanced Techniques & Projects"

### Expected Results:
- ✅ Modal opens for Module 5
- ✅ Shows 3 advanced concepts
- ✅ Each concept expands to show tutor explanation
- ✅ Each has a video button

---

## Test Case 11: Multiple Concepts Expanded

### Steps:
1. Open any module
2. Click on first concept to expand
3. Click on second concept to expand

### Expected Results:
- ✅ First concept collapses
- ✅ Second concept expands
- ✅ Only one concept expanded at a time
- ✅ Smooth animation

---

## Test Case 12: Multiple Topics

### Steps:
1. Go back to Learning Path Generator
2. Click "← Generate Another Path"
3. Enter: `Python, Java`
4. Click "Generate Learning Path"

### Expected Results:
- ✅ TWO learning path cards appear
- ✅ First: "Complete Python Mastery"
- ✅ Second: "Complete Java Mastery"

### Steps (continued):
5. Click on Python Module 1

### Expected Results:
- ✅ Modal opens for Python
- ✅ Shows Python-specific concepts
- ✅ Tutor explanation mentions Python
- ✅ Video titles are Python-related

### Steps (continued):
6. Click on Java Module 1

### Expected Results:
- ✅ Modal opens for Java
- ✅ Shows Java-specific concepts
- ✅ Tutor explanation mentions Java
- ✅ Video titles are Java-related

---

## Test Case 13: Course Filtering from Modal

### Steps:
1. Open any module
2. Click "Find Related Courses" button

### Expected Results:
- ✅ Navigates to Courses page
- ✅ URL shows: `/courses?search=Java` (or relevant topic)
- ✅ Shows filtered courses

---

## Test Case 14: Responsive Design

### Steps:
1. Open module on desktop
2. Expand a concept
3. Resize browser window to tablet size
4. Verify layout

### Expected Results:
- ✅ Concept still clickable
- ✅ Expansion still works
- ✅ Text is readable
- ✅ Video button is clickable

### Steps (continued):
5. Resize to mobile size
6. Verify layout

### Expected Results:
- ✅ Concept still clickable
- ✅ Expansion still works
- ✅ Text is readable
- ✅ Video button is clickable
- ✅ No horizontal scrolling

---

## Quality Checklist

- [ ] Concepts are clickable
- [ ] Concepts expand smoothly
- [ ] Arrow indicator changes (▼ to ▲)
- [ ] Tutor explanation is specific
- [ ] Tutor explanation has 3-4 sentences
- [ ] Tutor explanation includes examples
- [ ] Video button is visible
- [ ] Video button is clickable
- [ ] Video opens in new tab
- [ ] YouTube search is relevant
- [ ] Only one concept expanded at a time
- [ ] Concepts collapse when clicked again
- [ ] All 5 modules work
- [ ] All concepts in each module work
- [ ] Multiple topics work
- [ ] Course filtering works
- [ ] No console errors
- [ ] Responsive on all screen sizes

---

## Troubleshooting

### Issue: Concepts not clickable
- **Solution**: Hard refresh browser (Ctrl+Shift+R)
- **Check**: Verify click handler is in place
- **Check**: Check browser console for errors

### Issue: Tutor explanation not showing
- **Solution**: Hard refresh browser
- **Check**: Verify backend is running
- **Check**: Check browser console for errors

### Issue: Video button not working
- **Solution**: Check internet connection
- **Check**: Verify YouTube is accessible
- **Check**: Try different concept

### Issue: Multiple concepts expanded
- **Solution**: Hard refresh browser
- **Check**: Verify expandedConcept state is working

### Issue: Arrow not changing
- **Solution**: Hard refresh browser
- **Check**: Verify CSS is loading

---

## Success Criteria ✅

All of the following must be true:

- [ ] Concepts are clickable
- [ ] Concepts expand to show tutor explanation
- [ ] Tutor explanation is specific and detailed
- [ ] Video button is visible and clickable
- [ ] Video opens YouTube in new tab
- [ ] Only one concept expanded at a time
- [ ] Concepts collapse when clicked again
- [ ] All 5 modules work
- [ ] All concepts work
- [ ] Multiple topics work
- [ ] Course filtering works
- [ ] No errors in console
- [ ] Responsive design works

---

## Status: READY FOR TESTING ✅

All code is complete. Run through the test cases above to verify everything works perfectly.

---

**Last Updated**: March 16, 2026
**Status**: COMPLETE ✅
