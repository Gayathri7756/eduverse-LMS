# EduVerse - Course Access Flow

## New User Journey

### Step 1: Browse Courses (Homepage)
- User sees all 15 courses
- Each course shows: thumbnail, title, instructor, price, category, students
- User clicks on any course

### Step 2: View Course Details (NOT Enrolled)
- Course detail page opens
- Shows: title, description, instructor, duration, students, price
- Shows: course features (Comprehensive, Expert Instructor, Certificate)
- Shows: course stats (students, duration, sections, lessons)
- **IMPORTANT**: Course content is LOCKED 🔒
- Shows: "Course Content Locked" message
- Shows: "Enroll Now to Unlock" button
- **NO YouTube videos visible**

### Step 3: Enroll in Course
- User clicks "Enroll Now"
- Registration modal opens
- User fills form:
  - Full Name
  - Email
  - Phone (10 digits, starts 6-9)
  - Address
  - City (dropdown + custom)
  - State (dropdown + custom)
  - Zip Code (6 digits)
- User clicks "Continue to Payment"
- Payment modal opens
- User selects payment method
- User clicks "Pay Now"
- Payment processes (2 seconds)
- Modal closes

### Step 4: Course Added to "My Learning"
- Course automatically appears in "My Learning" dashboard
- Shows: thumbnail, title, instructor, progress (0%)
- User can click to start learning

### Step 5: Access Course Content (AFTER Enrollment)
- User goes to "My Learning"
- User clicks on enrolled course
- Course detail page opens
- **NOW**: Course content is UNLOCKED 🔓
- Shows: all sections and lessons
- Shows: lesson titles and descriptions
- Shows: "Start Learning" button
- User clicks "Start Learning"
- Video player opens with YouTube videos

### Step 6: Watch Videos
- Video player shows dark theme
- YouTube videos embedded directly
- Sidebar shows all sections and lessons
- User can navigate between lessons
- Activity tracked every minute
- Watch time recorded

## Key Differences

### Before Enrollment
```
Course Detail Page:
✓ Course info (title, description, instructor, price)
✓ Course features
✓ Course stats
✗ Course content (LOCKED)
✗ YouTube videos (NOT visible)
✗ Sections and lessons (NOT visible)
```

### After Enrollment
```
Course Detail Page:
✓ Course info (title, description, instructor, price)
✓ Course features
✓ Course stats
✓ Course content (UNLOCKED)
✓ All sections and lessons visible
✓ "Start Learning" button
✓ Can access video player
```

## User Flow Diagram

```
Homepage
   ↓
Click Course
   ↓
Course Detail (NOT Enrolled)
   ├─ Shows: Info, Features, Stats
   ├─ Shows: "Course Content Locked" 🔒
   └─ Shows: "Enroll Now" button
   ↓
Click "Enroll Now"
   ↓
Registration Modal
   ├─ Fill form
   └─ Click "Continue to Payment"
   ↓
Payment Modal
   ├─ Select payment method
   └─ Click "Pay Now"
   ↓
Payment Processing (2 seconds)
   ↓
Success! Course Added to "My Learning"
   ↓
Go to "My Learning" Dashboard
   ↓
Click Enrolled Course
   ↓
Course Detail (ENROLLED)
   ├─ Shows: All course content
   ├─ Shows: All sections and lessons
   └─ Shows: "Start Learning" button
   ↓
Click "Start Learning"
   ↓
Video Player
   ├─ YouTube videos embedded
   ├─ Dark theme interface
   ├─ Sidebar navigation
   └─ Activity tracking
```

## Security Features

✅ Course content locked until enrolled
✅ Videos only accessible after payment
✅ Activity tracking on all videos
✅ Progress tracking per course
✅ Enrollment verification on backend

## Testing the Flow

### Test 1: View Course Without Enrollment
1. Go to http://localhost:5173
2. Click any course
3. See "Course Content Locked" message
4. See "Enroll Now to Unlock" button
5. NO YouTube videos visible
6. NO sections/lessons visible

### Test 2: Complete Enrollment
1. Click "Enroll Now"
2. Fill registration form
3. Select payment method
4. Click "Pay Now"
5. Wait 2 seconds
6. Modal closes
7. Course appears in "My Learning"

### Test 3: Access Course After Enrollment
1. Go to "My Learning"
2. Click enrolled course
3. See "You're Enrolled!" message
4. See all sections and lessons
5. Click "Start Learning"
6. Video player opens
7. YouTube videos visible
8. Can watch and track activity

## API Endpoints Used

### Check Enrollment
```
GET /api/enrollments/check/:courseId
Returns: { enrolled: true/false }
```

### Get Course Content
```
GET /api/courses/:id/content
Returns: { sections: [...] }
Only shown if enrolled
```

### Create Enrollment
```
POST /api/enrollments
Body: { courseId, userId }
Returns: { success: true, enrollment }
```

## Database Updates

### Enrollments Table
```javascript
{
  id: "enrollment-123",
  userId: "user-456",
  courseId: "course-1",
  purchased: true,
  progress: 0,
  enrolledAt: "2026-03-13T...",
  transactionId: "TXN-..."
}
```

## Benefits

✅ Prevents unauthorized access to course content
✅ Ensures payment before content access
✅ Tracks which users have paid
✅ Protects instructor's intellectual property
✅ Maintains course integrity
✅ Clear user experience
✅ Professional platform behavior

## Next Steps

1. Test course access flow
2. Verify content is locked before enrollment
3. Verify content is unlocked after enrollment
4. Test video player access
5. Verify activity tracking works
6. Test multiple enrollments
