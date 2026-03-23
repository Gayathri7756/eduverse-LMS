# EduVerse - API Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {token}
```

## Courses API

### Get All Courses
```
GET /courses
```
**Response:**
```json
[
  {
    "id": "course_id",
    "title": "React for Beginners",
    "description": "Learn React basics",
    "category": "Frontend",
    "price": 499,
    "thumbnail": "https://...",
    "instructorId": "user_id",
    "instructorName": "John Doe",
    "studentCount": 10,
    "duration": "4 weeks",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Get Featured Courses
```
GET /courses/featured
```
**Response:** Same as above (limited to 6 courses)

### Get Course by ID
```
GET /courses/:id
```
**Parameters:**
- `id` (string) - Course ID

**Response:**
```json
{
  "id": "course_id",
  "title": "React for Beginners",
  "description": "Learn React basics",
  "category": "Frontend",
  "price": 499,
  "thumbnail": "https://...",
  "instructorId": "user_id",
  "instructorName": "John Doe",
  "studentCount": 10,
  "duration": "4 weeks",
  "content": "Full course content...",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Get Course Content (Sections & Lessons)
```
GET /courses/:id/content
```
**Parameters:**
- `id` (string) - Course ID

**Response:**
```json
{
  "sections": [
    {
      "id": "section_id",
      "courseId": "course_id",
      "title": "Getting Started",
      "order": 1,
      "lessons": [
        {
          "id": "lesson_id",
          "courseId": "course_id",
          "sectionId": "section_id",
          "title": "Intro to React",
          "description": "Introduction to React",
          "youtubeUrl": "https://www.youtube.com/watch?v=...",
          "videoId": "dQw4w9WgXcQ",
          "order": 1
        }
      ]
    }
  ]
}
```

### Create Course
```
POST /courses
Authorization: Bearer {token}
```
**Headers:**
- `Authorization: Bearer {token}` (Instructor only)

**Request Body:**
```json
{
  "title": "React for Beginners",
  "description": "Learn React basics",
  "category": "Frontend",
  "content": "Full course content...",
  "duration": "4 weeks",
  "price": 499,
  "thumbnail": "https://..."
}
```

**Response:**
```json
{
  "id": "new_course_id",
  "message": "Course created successfully"
}
```

**Errors:**
- `400` - Missing required fields
- `401` - Unauthorized
- `403` - Not an instructor

### Get Instructor's Courses
```
GET /courses/instructor
Authorization: Bearer {token}
```
**Response:** Array of courses created by the instructor

---

## Sections API

### Get Sections for Course
```
GET /sections/:courseId/sections
```
**Parameters:**
- `courseId` (string) - Course ID

**Response:**
```json
[
  {
    "id": "section_id",
    "courseId": "course_id",
    "title": "Getting Started",
    "order": 1,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Create Section
```
POST /sections/:courseId/sections
Authorization: Bearer {token}
```
**Parameters:**
- `courseId` (string) - Course ID

**Request Body:**
```json
{
  "title": "Getting Started",
  "order": 1
}
```

**Response:**
```json
{
  "id": "new_section_id",
  "courseId": "course_id",
  "title": "Getting Started",
  "order": 1,
  "message": "Section created successfully"
}
```

**Errors:**
- `400` - Missing title
- `401` - Unauthorized
- `403` - Not course instructor
- `404` - Course not found

### Update Section
```
PUT /sections/:sectionId
Authorization: Bearer {token}
```
**Parameters:**
- `sectionId` (string) - Section ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "order": 2
}
```

**Response:**
```json
{
  "message": "Section updated successfully"
}
```

### Delete Section
```
DELETE /sections/:sectionId
Authorization: Bearer {token}
```
**Parameters:**
- `sectionId` (string) - Section ID

**Response:**
```json
{
  "message": "Section deleted successfully"
}
```

---

## Lessons API

### Get Lessons for Section
```
GET /lessons/:sectionId/lessons
```
**Parameters:**
- `sectionId` (string) - Section ID

**Response:**
```json
[
  {
    "id": "lesson_id",
    "courseId": "course_id",
    "sectionId": "section_id",
    "title": "Intro to React",
    "description": "Introduction to React",
    "youtubeUrl": "https://www.youtube.com/watch?v=...",
    "videoId": "dQw4w9WgXcQ",
    "order": 1,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Get Single Lesson
```
GET /lessons/lesson/:lessonId
```
**Parameters:**
- `lessonId` (string) - Lesson ID

**Response:**
```json
{
  "id": "lesson_id",
  "courseId": "course_id",
  "sectionId": "section_id",
  "title": "Intro to React",
  "description": "Introduction to React",
  "youtubeUrl": "https://www.youtube.com/watch?v=...",
  "videoId": "dQw4w9WgXcQ",
  "order": 1
}
```

### Create Lesson
```
POST /lessons/:sectionId/lessons
Authorization: Bearer {token}
```
**Parameters:**
- `sectionId` (string) - Section ID

**Request Body:**
```json
{
  "title": "Intro to React",
  "description": "Introduction to React",
  "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "order": 1
}
```

**Response:**
```json
{
  "id": "new_lesson_id",
  "courseId": "course_id",
  "sectionId": "section_id",
  "title": "Intro to React",
  "description": "Introduction to React",
  "youtubeUrl": "https://www.youtube.com/watch?v=...",
  "videoId": "dQw4w9WgXcQ",
  "order": 1,
  "message": "Lesson created successfully"
}
```

**Errors:**
- `400` - Missing title or invalid YouTube URL
- `401` - Unauthorized
- `403` - Not course instructor
- `404` - Section not found

### Update Lesson
```
PUT /lessons/:lessonId
Authorization: Bearer {token}
```
**Parameters:**
- `lessonId` (string) - Lesson ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "youtubeUrl": "https://www.youtube.com/watch?v=...",
  "order": 2
}
```

**Response:**
```json
{
  "message": "Lesson updated successfully"
}
```

### Delete Lesson
```
DELETE /lessons/:lessonId
Authorization: Bearer {token}
```
**Parameters:**
- `lessonId` (string) - Lesson ID

**Response:**
```json
{
  "message": "Lesson deleted successfully"
}
```

---

## Enrollments API

### Check Enrollment Status
```
GET /enrollments/check/:courseId
Authorization: Bearer {token}
```
**Parameters:**
- `courseId` (string) - Course ID

**Response:**
```json
{
  "enrolled": true,
  "purchased": true,
  "progress": 45
}
```

### Enroll in Course
```
POST /enrollments
Authorization: Bearer {token}
```
**Request Body:**
```json
{
  "courseId": "course_id"
}
```

**Response:**
```json
{
  "id": "enrollment_id",
  "userId": "user_id",
  "courseId": "course_id",
  "purchased": false,
  "progress": 0,
  "message": "Enrolled successfully"
}
```

**Errors:**
- `400` - Missing courseId
- `401` - Unauthorized
- `404` - Course not found
- `409` - Already enrolled

---

## Users API

### Sign Up
```
POST /users/signup
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "student"
}
```

**Response:**
```json
{
  "uid": "user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "student",
  "token": "jwt_token"
}
```

**Errors:**
- `400` - Invalid email or weak password
- `409` - Email already exists

### Login
```
POST /users/login
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "uid": "user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "student",
  "token": "jwt_token"
}
```

**Errors:**
- `401` - Invalid credentials
- `404` - User not found

---

## Error Responses

### Standard Error Format
```json
{
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Server Error

---

## Rate Limiting
Currently no rate limiting. Implement in production.

## Pagination
Currently no pagination. Implement for large datasets.

## Filtering
Use query parameters for filtering:
```
GET /courses?category=Frontend&minPrice=0&maxPrice=1000
```

## Sorting
Use query parameters for sorting:
```
GET /courses?sort=price&order=asc
```

## Testing with cURL

### Get All Courses
```bash
curl http://localhost:5000/api/courses
```

### Create Course (with token)
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React for Beginners",
    "description": "Learn React basics",
    "category": "Frontend",
    "price": 499
  }'
```

### Create Lesson
```bash
curl -X POST http://localhost:5000/api/lessons/SECTION_ID/lessons \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Intro to React",
    "description": "Introduction",
    "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }'
```

---

## Webhook Events (Future)
- `course.created`
- `course.updated`
- `lesson.created`
- `enrollment.completed`
- `user.registered`

## API Versioning
Current version: v1 (implicit)
Future: `/api/v2/courses`
