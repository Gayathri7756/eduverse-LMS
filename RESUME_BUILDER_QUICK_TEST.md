# Resume Builder - Quick Test Guide

## 🚀 Quick Start Testing

### Step 1: Start the Application
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Step 2: Login
1. Go to http://localhost:5173
2. Click "Login"
3. Use test credentials:
   - Email: `student@example.com`
   - Password: `password123`

### Step 3: Complete a Course (Optional but Recommended)
1. Go to "Course Catalog"
2. Click on any course (e.g., "Machine Learning")
3. Click "Enroll Now"
4. Complete payment (use test card: 4242 4242 4242 4242)
5. Watch a lesson
6. Mark course as complete

### Step 4: Test Resume Builder

#### Test 1: Personal Information (2 min)
1. Click "Resume Builder" in navbar
2. Click "Personal" tab
3. Edit name to "John Developer"
4. Edit email to "john@example.com"
5. Edit phone to "9876543210"
6. Edit location to "San Francisco, USA"
7. Edit summary to "Passionate developer with expertise in web technologies"
8. Click "Save All Changes"
9. Verify changes appear in preview on right

#### Test 2: Add Education (3 min)
1. Click "Education" tab
2. Click "+ Add Education"
3. Fill in:
   - School: "Stanford University"
   - Degree: "Bachelor of Science"
   - Field: "Computer Science"
   - Start Date: "2018"
   - End Date: "2022"
   - Description: "Focused on software engineering and algorithms"
4. Click "Save All Changes"
5. Verify education appears in preview with blue border

#### Test 3: Add Experience (3 min)
1. Click "Experience" tab
2. Click "+ Add Experience"
3. Fill in:
   - Company: "Tech Corp"
   - Position: "Junior Developer"
   - Start Date: "2022"
   - End Date: "Present"
   - Description: "Developed web applications using React and Node.js"
4. Click "Save All Changes"
5. Verify experience appears in preview with purple border

#### Test 4: Add Skills (2 min)
1. Click "Skills" tab
2. Click "+ Add Skill"
3. Enter "React" → Click OK
4. Click "+ Add Skill"
5. Enter "Node.js" → Click OK
6. Click "+ Add Skill"
7. Enter "JavaScript" → Click OK
8. Click "Save All Changes"
9. Verify skills appear as purple badges in preview

#### Test 5: Add Completed Course (3 min)
1. Scroll down in left panel to "Add Completed Courses"
2. If you completed a course earlier, click on it
3. Verify:
   - Course appears in "Completed Courses" section
   - Skills are auto-added to Skills section
   - Project appears in Projects section
   - Certificate appears in Certificates section
4. Click "Save All Changes"

#### Test 6: View All Sections (2 min)
1. Click "Projects" tab - verify auto-added projects
2. Click "Certificates" tab - verify auto-added certificates
3. Scroll right panel to see all sections in preview

#### Test 7: Download PDF (2 min)
1. Click "📥 Download Resume as PDF" button
2. Wait for PDF to generate
3. Verify PDF downloads as `John_Developer_Resume.pdf`
4. Open PDF and verify:
   - All sections are included
   - Formatting looks professional
   - No missing content

#### Test 8: Persistence (2 min)
1. Refresh the page (F5)
2. Verify all data is still there
3. Go to another page (e.g., Course Catalog)
4. Come back to Resume Builder
5. Verify all data persists

### Total Time: ~20 minutes

## ✅ Expected Results

| Test | Expected | Status |
|------|----------|--------|
| Personal Info | Changes saved and visible in preview | ✓ |
| Education | Entry added with blue border in preview | ✓ |
| Experience | Entry added with purple border in preview | ✓ |
| Skills | Skills appear as purple badges | ✓ |
| Courses | Auto-populates skills, projects, certificates | ✓ |
| Projects | Auto-added from courses, read-only | ✓ |
| Certificates | Auto-added from courses, read-only | ✓ |
| PDF Download | Downloads with correct filename | ✓ |
| Persistence | Data remains after refresh | ✓ |

## 🐛 Troubleshooting

### Issue: Resume not loading
- Check backend is running on port 5000
- Check frontend is running on port 5173
- Check browser console for errors

### Issue: Changes not saving
- Verify "Save All Changes" button is clicked
- Check network tab in browser dev tools
- Verify token is in localStorage

### Issue: PDF not downloading
- Check browser console for errors
- Verify jspdf and html2canvas are installed
- Try different browser

### Issue: Courses not appearing
- Verify you completed a course
- Refresh the page
- Check backend `/api/enrollments/completed` endpoint

## 📝 Notes

- Resume data is stored in-memory on backend (resets on server restart)
- For production, use Firebase or database
- PDF generation uses html2canvas (may take a few seconds)
- All sections are optional except personal info
- Skills can be added manually or auto-populated from courses
