# Task 5 - API Reference

## Enrollment Endpoints

### Check Enrollment Status
```
GET /api/enrollments/check/:courseId
```

**Headers**:
```
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "enrolled": true,
  "enrollmentDate": "2026-03-16T10:30:00.000Z",
  "progress": 0
}
```

**Response** (200 OK - Not Enrolled):
```json
{
  "enrolled": false,
  "enrollmentDate": null,
  "progress": 0
}
```

---

### Check Enrollment (No Auth - Testing)
```
GET /api/enrollments/check-no-auth/:courseId/:userId
```

**Response** (200 OK):
```json
{
  "enrolled": true,
  "enrollmentDate": "2026-03-16T10:30:00.000Z",
  "progress": 0
}
```

---

### Enroll on Payment
```
POST /api/enrollments/enroll-on-payment
```

**Body**:
```json
{
  "courseId": "course-1",
  "paymentMethod": "paytm",
  "userId": "user-uid-123"
}
```

**Headers** (Optional):
```
Authorization: Bearer {token}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Enrolled successfully! Course added to My Learning",
  "enrollment": {
    "id": "enrollment_1234567890",
    "userId": "user-uid-123",
    "courseId": "course-1",
    "paymentMethod": "paytm",
    "status": "active",
    "purchased": true,
    "enrollmentDate": "2026-03-16T10:30:00.000Z",
    "progress": 0,
    "certificateGenerated": false
  }
}
```

**Response** (400 Bad Request - Already Enrolled):
```json
{
  "error": "Already enrolled in this course"
}
```

---

### Get My Courses
```
GET /api/enrollments/my-courses
```

**Headers**:
```
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
[
  {
    "id": "course-1",
    "title": "React Fundamentals",
    "description": "Learn React from scratch",
    "category": "Web Development",
    "thumbnail": "https://...",
    "instructorName": "John Doe",
    "price": 999,
    "durationDays": 90,
    "enrollmentDate": "2026-03-16T10:30:00.000Z",
    "progress": 25,
    "certificateGenerated": false
  },
  {
    "id": "course-2",
    "title": "JavaScript Advanced",
    "description": "Master JavaScript",
    "category": "Programming",
    "thumbnail": "https://...",
    "instructorName": "Jane Smith",
    "price": 1299,
    "durationDays": 120,
    "enrollmentDate": "2026-03-15T14:20:00.000Z",
    "progress": 50,
    "certificateGenerated": false
  }
]
```

---

## Quiz Endpoints

### Get Quizzes for Course
```
GET /api/quizzes/course/:courseId
```

**Response** (200 OK):
```json
[
  {
    "id": "quiz-1",
    "courseId": "course-1",
    "title": "React Basics Quiz",
    "description": "Test your React knowledge",
    "timeLimit": 30,
    "dueDate": "2026-04-15T23:59:59.000Z",
    "questions": [
      {
        "id": "q1",
        "text": "What is React?",
        "options": [
          "A JavaScript library",
          "A CSS framework",
          "A database",
          "A server"
        ]
      }
    ]
  }
]
```

---

### Submit Quiz
```
POST /api/quizzes/:quizId/submit
```

**Headers**:
```
Authorization: Bearer {token}
```

**Body**:
```json
{
  "answers": [0, 1, 2, 0, 1]
}
```

**Response** (200 OK):
```json
{
  "quizId": "quiz-1",
  "score": 80,
  "passed": true,
  "correctAnswers": 4,
  "totalQuestions": 5,
  "detailedResults": [
    {
      "question": "What is React?",
      "userAnswer": 0,
      "correctAnswer": 0,
      "isCorrect": true
    }
  ]
}
```

---

## Progress Endpoints

### Get Course Progress
```
GET /api/progress/course/:courseId
```

**Headers**:
```
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "courseId": "course-1",
  "courseName": "React Fundamentals",
  "enrollmentDate": "2026-03-16T10:30:00.000Z",
  "lessons": {
    "total": 5,
    "watched": 2,
    "progress": 40
  },
  "quizzes": {
    "total": 4,
    "completed": 1,
    "progress": 25,
    "results": []
  },
  "assignments": {
    "total": 4,
    "completed": 0,
    "progress": 0,
    "submissions": []
  },
  "overallProgress": 22,
  "isCompleted": false,
  "certificateGenerated": false
}
```

---

### Mark Lesson as Watched
```
POST /api/progress/lesson-watched
```

**Headers**:
```
Authorization: Bearer {token}
```

**Body**:
```json
{
  "courseId": "course-1",
  "lessonId": "lesson-1"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Lesson marked as watched"
}
```

---

## Frontend Integration Examples

### Check Enrollment Before Showing Payment
```javascript
const checkEnrollment = async () => {
  try {
    const token = localStorage.getItem(`token_${user.uid}`)
    const response = await axios.get(
      `http://localhost:5000/api/enrollments/check/${course.id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    
    if (response.data.enrolled) {
      // Show "Already Enrolled" message
      setStep('already-enrolled')
    } else {
      // Show payment form
      setStep('payment')
    }
  } catch (err) {
    console.error('Error checking enrollment:', err)
  }
}
```

### Fetch My Courses
```javascript
const fetchMyCourses = async () => {
  try {
    const token = localStorage.getItem(`token_${user.uid}`)
    const response = await axios.get(
      'http://localhost:5000/api/enrollments/my-courses',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    
    // Response is array directly
    const courses = Array.isArray(response.data) 
      ? response.data 
      : response.data.courses || []
    
    setCourses(courses)
  } catch (err) {
    console.error('Error fetching courses:', err)
  }
}
```

### Submit Quiz with Timer
```javascript
const handleSubmitQuiz = async () => {
  try {
    const token = localStorage.getItem(`token_${user?.uid}`)
    const response = await axios.post(
      `http://localhost:5000/api/quizzes/${selectedQuiz.id}/submit`,
      { answers: Object.values(answers) },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    
    setResult(response.data)
    setSubmitted(true)
  } catch (err) {
    console.error('Error submitting quiz:', err)
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Already enrolled in this course"
}
```

### 404 Not Found
```json
{
  "error": "Course not found"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Token Format

Tokens are stored in localStorage with format:
```
token_${user.uid}
```

Example:
```
token_abc123def456
```

Always include in Authorization header:
```
Authorization: Bearer {token}
```

---

## Testing with cURL

### Check Enrollment
```bash
curl -X GET http://localhost:5000/api/enrollments/check/course-1 \
  -H "Authorization: Bearer token_abc123"
```

### Get My Courses
```bash
curl -X GET http://localhost:5000/api/enrollments/my-courses \
  -H "Authorization: Bearer token_abc123"
```

### Enroll on Payment
```bash
curl -X POST http://localhost:5000/api/enrollments/enroll-on-payment \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "course-1",
    "paymentMethod": "paytm",
    "userId": "user-uid-123"
  }'
```

### Submit Quiz
```bash
curl -X POST http://localhost:5000/api/quizzes/quiz-1/submit \
  -H "Authorization: Bearer token_abc123" \
  -H "Content-Type: application/json" \
  -d '{
    "answers": [0, 1, 2, 0, 1]
  }'
```

---

## Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## Rate Limiting

No rate limiting implemented. For production, consider adding:
- 100 requests per minute per user
- 1000 requests per minute per IP

---

## CORS

CORS is enabled for:
- `http://localhost:3000` (frontend dev)
- `http://localhost:5173` (Vite dev)

For production, update CORS settings in backend.
