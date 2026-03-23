# Quick Reference Card - Three Core Features

## 🎯 Learning Path Generator

### Endpoint
```
POST /api/learning-path/generate
Authorization: Bearer {token}
```

### Request
```json
{
  "subject": "Python"
}
```

### Response
```json
{
  "success": true,
  "data": {
    "subject": "Python Programming",
    "modules": [
      {
        "title": "Fundamentals",
        "topics": [
          {
            "name": "Variables & Data Types",
            "subtopics": ["Strings", "Integers", "Floats", ...],
            "resources": ["https://...", "https://..."],
            "time": "2 days"
          }
        ]
      }
    ]
  }
}
```

### Supported Subjects
- Python
- JavaScript
- Web Development
- Data Science
- Machine Learning
- Any other (generic fallback)

---

## 📚 Study Planner

### Save Plan
```
POST /api/study-planner/save
Authorization: Bearer {token}

{
  "date": "2024-03-20",
  "subject": "Python",
  "topic": "Data Structures",
  "estimatedTime": 5,
  "details": "Optional notes"
}
```

### Get All Plans
```
GET /api/study-planner/plans
Authorization: Bearer {token}
```

### Get Plan by ID
```
GET /api/study-planner/plans/{planId}
Authorization: Bearer {token}
```

### Update Plan
```
PUT /api/study-planner/plans/{planId}
Authorization: Bearer {token}

{
  "date": "2024-03-21",
  "subject": "Python",
  "topic": "Functions",
  "estimatedTime": 3
}
```

### Delete Plan
```
DELETE /api/study-planner/plans/{planId}
Authorization: Bearer {token}
```

### Validation
- date: YYYY-MM-DD (required)
- subject: non-empty string (required)
- topic: non-empty string (required)
- estimatedTime: positive integer (required)
- details: any string (optional)

---

## 💻 Code Playground

### Execute Code
```
POST /api/code-executor/execute

{
  "language": "python",
  "code": "print('Hello, World!')"
}
```

### Response (Success)
```json
{
  "success": true,
  "language": "python",
  "output": "Hello, World!\n",
  "error": "",
  "exitCode": 0,
  "message": "Code executed successfully"
}
```

### Response (Error)
```json
{
  "success": false,
  "language": "python",
  "output": "",
  "error": "NameError: name 'x' is not defined",
  "exitCode": 1,
  "message": "Code executed with errors"
}
```

### Supported Languages
JavaScript, Python, Java, C++, C, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, TypeScript, R, Bash, SQL

---

## 🔑 Key Features

### Learning Path
✅ Always returns valid JSON
✅ Never empty
✅ Real resource links
✅ Time estimates
✅ Structured hierarchy

### Study Planner
✅ Full CRUD operations
✅ User privacy
✅ Validation
✅ Persistence
✅ Sorted by date

### Code Executor
✅ 16+ languages
✅ Multiple endpoints
✅ Error handling
✅ Exit codes
✅ Instant JS execution

---

## 📊 Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (missing token) |
| 404 | Not found (plan not found) |
| 500 | Server error |

---

## 🚀 Quick Test

### Learning Path
```bash
curl -X POST http://localhost:5000/api/learning-path/generate \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"subject": "Python"}'
```

### Study Planner
```bash
curl -X POST http://localhost:5000/api/study-planner/save \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-03-20",
    "subject": "Python",
    "topic": "Data Structures",
    "estimatedTime": 5
  }'
```

### Code Executor
```bash
curl -X POST http://localhost:5000/api/code-executor/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "print(\"Hello\")"
  }'
```

---

## 📝 Common Errors

### Learning Path
- Missing subject → Add "subject" field
- Unknown subject → Uses generic fallback

### Study Planner
- Missing fields → Add all required fields
- Invalid date → Use YYYY-MM-DD format
- Invalid time → Use positive integer
- Plan not found → Check planId

### Code Executor
- Missing language → Add "language" field
- Missing code → Add "code" field
- Timeout → Code took too long
- Service unavailable → API down, try again

---

## 🎯 Remember

1. **Learning Path**: Always returns structured data
2. **Study Planner**: Always validates and persists
3. **Code Executor**: Always returns output or error

No empty responses. No placeholders. No excuses.

---

**Version**: 1.0.0
**Status**: Production Ready
**Last Updated**: March 2024
