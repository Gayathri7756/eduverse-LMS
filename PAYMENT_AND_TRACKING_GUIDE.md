# EduVerse - Payment & Activity Tracking Implementation Guide

## Overview
This document describes the complete enrollment, payment, and activity tracking system implemented in EduVerse.

## Features Implemented

### 1. Enrollment Flow with Registration & Payment

#### Step 1: Registration Form
When a user clicks "Enroll Now" on a course, they see a registration modal with:
- Full Name
- Email
- Phone Number (10 digits)
- Address
- City
- State
- Zip Code

#### Step 2: Payment Selection
After registration, user selects payment method:
- Paytm
- PhonePe
- Google Pay
- Credit Card

Payment summary shows:
- Course Price
- Tax (18%)
- Total Amount

#### Step 3: Payment Processing
- Payment is initiated via backend
- Transaction ID is generated
- Payment is simulated (2-second delay for demo)
- Upon success, course is added to "My Learning"

### 2. Course Player with Direct Video Embedding

#### Features:
- YouTube videos embedded directly (no "Watch on YouTube" links)
- Dark theme interface (gray-900 background)
- Responsive design
- Sidebar navigation with all sections and lessons
- Current lesson highlighting
- Video time tracking

#### Video Controls:
- Play/Pause tracking
- Video completion tracking
- Watch time display

### 3. Activity Tracking System

#### Tracked Activities:
- `video_play` - When user starts playing a video
- `video_pause` - When user pauses a video
- `video_complete` - When user completes a video
- `lesson_view` - When user views a lesson

#### Tracking Frequency:
- **Real-time**: Play, Pause, Complete actions
- **Every Minute**: Automatic activity logging while watching

#### Activity Data Stored:
- User ID
- Course ID
- Lesson ID
- Action type
- Duration (in seconds)
- Timestamp

#### API Endpoints:
```
POST /api/activity/track
- Track user activity

GET /api/activity/logs/:userId
- Get user's activity logs
- Query params: courseId, limit

GET /api/activity/summary/:courseId
- Get course activity summary
- Returns: totalDuration, videoPlayCount, videoCompleteCount, lessonsViewed

GET /api/activity/all
- Get all activity logs (admin)
```

### 4. My Learning Dashboard

#### Features:
- Shows all enrolled courses
- Progress bar for each course
- Course thumbnail, title, instructor
- Quick access to course player
- "Browse More Courses" button

#### Course Card Shows:
- Course thumbnail
- Category badge
- Title
- Description
- Instructor name
- Progress percentage
- Progress bar

### 5. Payment Integration

#### Backend Routes:
```
POST /api/payments/initiate
- Initiate payment transaction
- Returns: transactionId, paymentUrl

POST /api/payments/confirm
- Confirm payment and create enrollment
- Returns: enrollment details

GET /api/payments/status/:transactionId
- Check payment status
```

#### Payment Flow:
1. User submits registration form
2. Backend generates transaction ID
3. Payment method is selected
4. Payment is processed (simulated in demo)
5. Upon success, enrollment is created
6. Course appears in "My Learning"

## User Journey

### For Students:

1. **Browse Courses**
   - Visit homepage or /courses
   - See all 15 sample courses
   - Search and filter by category

2. **View Course Details**
   - Click on any course card
   - See course info, sections, and lessons
   - See YouTube lesson links

3. **Enroll in Course**
   - Click "Enroll Now" button
   - Fill registration form
   - Select payment method
   - Complete payment
   - Course added to "My Learning"

4. **Watch Course**
   - Go to "My Learning" dashboard
   - Click on enrolled course
   - Video player opens with dark theme
   - Watch videos with activity tracking
   - Navigate between lessons in sidebar

5. **Track Progress**
   - Activity is tracked every minute
   - Watch time is recorded
   - Play/pause/complete actions logged
   - View activity summary in dashboard

### For Instructors:

1. **Create Courses**
   - Go to Instructor Dashboard
   - Create new course
   - Add sections
   - Add lessons with YouTube URLs

2. **View Student Activity**
   - Access activity logs
   - See which students watched which lessons
   - Track engagement metrics

## Database Schema

### Enrollments
```javascript
{
  id: string,
  userId: string,
  courseId: string,
  purchased: boolean,
  progress: number (0-100),
  enrolledAt: Date,
  transactionId: string
}
```

### Activity Logs
```javascript
{
  id: string,
  userId: string,
  courseId: string,
  lessonId: string,
  action: string,
  duration: number (seconds),
  timestamp: Date,
  createdAt: Date
}
```

### Payments
```javascript
{
  transactionId: string,
  courseId: string,
  userId: string,
  amount: number,
  paymentMethod: string,
  userDetails: {
    fullName: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    state: string,
    zipCode: string
  },
  status: string,
  createdAt: Date
}
```

## API Endpoints Summary

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/content` - Get sections and lessons
- `POST /api/courses` - Create course (instructor only)

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/check/:courseId` - Check if enrolled
- `GET /api/enrollments/my-courses` - Get enrolled courses

### Payments
- `POST /api/payments/initiate` - Start payment
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/status/:transactionId` - Check status

### Activity
- `POST /api/activity/track` - Track activity
- `GET /api/activity/logs/:userId` - Get activity logs
- `GET /api/activity/summary/:courseId` - Get summary
- `GET /api/activity/all` - Get all logs (admin)

## Testing the System

### Test Enrollment Flow:
1. Go to http://localhost:5173
2. Click on any course
3. Click "Enroll Now"
4. Fill registration form
5. Select payment method
6. Click "Pay Now"
7. Wait for payment processing
8. Course should appear in "My Learning"

### Test Video Player:
1. Go to "My Learning" dashboard
2. Click on enrolled course
3. Video player should open
4. Click play/pause to track activity
5. Watch time should update
6. Activity should be logged every minute

### Test Activity Tracking:
1. Open browser console
2. Watch a video for 1+ minute
3. Check backend logs for activity tracking
4. Visit `/api/activity/logs/:userId` to see logs

## Notes

- Payment is simulated in demo (2-second delay)
- In production, integrate with actual Paytm/PayPal API
- Activity tracking happens every minute automatically
- All data is stored in-memory (not persistent)
- For production, use database like Firebase/MongoDB

## Future Enhancements

1. Real payment gateway integration (Paytm, PayPal)
2. Persistent database (Firebase, MongoDB)
3. Email notifications on enrollment
4. Certificate generation on course completion
5. Refund management
6. Subscription plans
7. Discount codes
8. Analytics dashboard
9. Student performance reports
10. Automated email reminders
