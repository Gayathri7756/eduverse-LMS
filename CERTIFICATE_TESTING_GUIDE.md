# 🎓 Certificate Testing Guide

## Quick Start

### Step 1: Get Your User ID
1. Go to http://localhost:5173 (your app)
2. Make sure you're logged in with: **hinata777@gmail.com** / **987654321**
3. Open browser Developer Tools (Press **F12**)
4. Go to **Console** tab
5. Paste this code and press Enter:
```javascript
console.log(Object.keys(localStorage).map(k => ({ key: k, value: localStorage[k].substring(0, 50) })))
```
6. Look for a value starting with `eyJ` - that's your token
7. Copy the entire token value (it's long, starts with `eyJ`)
8. Decode it at https://jwt.io to see your UID, or just use the HTML tool below

### Step 2: Open the Certificate Tool
1. Open this file in your browser:
   ```
   file:///C:/Users/admin/Desktop/full-stack Learning Management System (LMS)/simple-complete-course.html
   ```
   
   Or simply double-click the file in File Explorer

2. You should see a form with:
   - "Your User ID" input field
   - "Select Course" dropdown
   - Green button "✅ Complete Course & Generate Certificate"

### Step 3: Fill in the Form
1. **User ID**: Paste your Firebase User ID (from Step 1)
   - If you can't find it, try this in console:
   ```javascript
   // Get the token
   let token = null;
   for (let key in localStorage) {
       const value = localStorage[key];
       if (typeof value === 'string' && value.includes('eyJ')) {
           token = value;
           break;
       }
   }
   console.log("Token:", token);
   
   // Decode it (basic decode, not verification)
   if (token) {
       const parts = token.split('.');
       const decoded = JSON.parse(atob(parts[1]));
       console.log("Your UID:", decoded.uid);
   }
   ```

2. **Select Course**: Choose any course from the dropdown

### Step 4: Click the Button
1. Click "✅ Complete Course & Generate Certificate"
2. Wait for the success message
3. You should see:
   - ✅ Success!
   - Course name
   - Number of videos, quizzes, assignments marked
   - Certificate number

### Step 5: View Your Certificate
1. Go back to http://localhost:5173
2. Click on **My Learning**
3. Refresh the page (Ctrl+R or Cmd+R)
4. You should now see a green **🎓 Generate Certificate** button on the course card
5. Click it to view your certificate!

## Troubleshooting

### "No token found" or "User ID not found"
- Make sure you're logged in at http://localhost:5173
- Check that localStorage has your token (see Step 1)
- Try copying the User ID manually from the console

### "No courses available"
- Make sure your backend is running on port 5000
- Check that courses are loaded in the database

### "Not enrolled in this course"
- You need to be enrolled in the course first
- Go to http://localhost:5173, find a course, and click "Enroll"
- Then try the certificate tool again

### "Course not completed"
- The tool will show you what's missing:
  - Videos watched: X/Y
  - Quizzes completed: X/Y
  - Assignments completed: X/Y
- All three must be 100% to generate a certificate

## What This Tool Does

1. **Marks all videos as watched** for the selected course
2. **Marks all quizzes as passed** with 100% score
3. **Marks all assignments as submitted** with 100% score
4. **Generates a certificate** with:
   - Your name
   - Course name
   - Completion date
   - Unique certificate number
   - Instructor name

## Files Used

- **simple-complete-course.html** - The tool you're using
- **Backend endpoints**:
  - `POST /api/progress/complete-for-user/:userId/:courseId` - Marks course as complete
  - `POST /api/certificates/generate-demo/:courseId` - Generates certificate

---

**Need help?** Check the browser console (F12 → Console) for error messages!
