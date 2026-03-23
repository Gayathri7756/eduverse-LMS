# EduVerse - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5174`

### Step 3: Access the Application

Open your browser and go to: `http://localhost:5174`

## 📝 First Time Setup

### 1. Sign Up as Instructor
- Click "Sign Up"
- Enter email and password
- Select "Instructor" role
- Click "Sign Up"

### 2. Create Your First Course
- Go to "Instructor Dashboard"
- Click "+ Create Course"
- Fill in:
  - Course Title: "React for Beginners"
  - Description: "Learn React basics"
  - Category: "Frontend"
  - Duration: "4 weeks"
  - Price: "499"
- Click "Create Course"

### 3. Add a Section
- Select your course from the sidebar
- Click "+ Add Section"
- Enter: "Getting Started"
- Click "Create Section"

### 4. Add a Lesson with YouTube Video
- Select the section
- Click "+ Add Lesson"
- Fill in:
  - Lesson Title: "Intro to React"
  - Description: "Introduction to React"
  - YouTube URL: `https://www.youtube.com/watch?v=bMknfKXIFA8`
- Click "Create Lesson"

### 5. View Your Course
- Go to "Course Catalog"
- Click on your course
- Click "Enroll Now"
- Click "Start Learning"
- Watch the video!

## 🎓 Student Experience

### Sign Up as Student
- Click "Sign Up"
- Enter email and password
- Select "Student" role
- Click "Sign Up"

### Browse Courses
- Go to "Course Catalog"
- Search or filter courses
- Click on any course to view details

### Enroll and Learn
- Click "Enroll Now"
- Click "Start Learning"
- Select lessons from sidebar
- Watch videos
- Click "Next Lesson" to continue

## 📊 Demo Data

The system automatically creates a demo course on first run:
- **Course**: React for Beginners
- **Price**: ₹499
- **Sections**: Getting Started, Core Concepts
- **Lessons**: 4 video lessons with real YouTube videos

## 🔧 Troubleshooting

### Backend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend shows blank page
- Check browser console (F12)
- Verify backend is running
- Clear browser cache

### Videos not playing
- Verify YouTube URL is correct
- Check internet connection
- Try a different YouTube video

### Can't enroll in course
- Make sure you're logged in as student
- Refresh the page
- Check browser console for errors

## 📚 Key Features

✅ **Create Courses** - Add title, description, price, thumbnail
✅ **Organize Content** - Create sections and lessons
✅ **YouTube Videos** - Embed any YouTube video
✅ **Student Enrollment** - Students can enroll and watch
✅ **Progress Tracking** - See course progress
✅ **Responsive Design** - Works on desktop and mobile
✅ **Real-time Updates** - Changes appear instantly

## 🎨 UI Overview

### Instructor Dashboard
- Left: Your courses list
- Right: Sections and lessons management
- Create, edit, delete content

### Course Player
- Left: Course content sidebar
- Right: Video player with lesson info
- Next lesson button
- Progress indicator

### Course Catalog
- Grid of all courses
- Search and filter
- Course cards with price and rating

## 💡 Tips

1. **Use Real YouTube URLs** - Copy from YouTube address bar
2. **Add Thumbnails** - Use image URLs for course thumbnails
3. **Organize Sections** - Group related lessons in sections
4. **Set Prices** - Use ₹ for Indian Rupees
5. **Test Everything** - Create test courses before going live

## 🚀 Next Steps

1. Create multiple courses
2. Add more sections and lessons
3. Invite students to enroll
4. Monitor student progress
5. Update course content regularly

## 📞 Support

For detailed documentation, see: `COURSE_SYSTEM_GUIDE.md`

Happy Learning! 🎉
