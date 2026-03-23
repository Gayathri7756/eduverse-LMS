# Playground API Flow - Technical Documentation

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│              Playground.jsx Component                       │
│                                                             │
│  - Language Selector (16 languages)                        │
│  - Code Editor (Monaco)                                    │
│  - Output Terminal                                         │
│  - Run/Clear Buttons                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ POST /api/code-executor/execute
                     │ { language, code }
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Express)                        │
│              codeExecutor.js Route                          │
│                                                             │
│  - Validate language & code                                │
│  - Handle JavaScript separately                            │
│  - Call Judge0 API for other languages                     │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
   JavaScript              Other Languages
   (Browser)               (Judge0 API)
   eval()                  
   Instant                 1-5 seconds
        │                         │
        └────────────┬────────────┘
                     │
                     ▼ Response
        { success, output, error }
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│              Display Output Terminal                        │
│                                                             │
│  - Show stdout in green                                    │
│  - Show stderr in red                                      │
│  - Show error messages                                     │
└─────────────────────────────────────────────────────────────┘
```

## Request/Response Flow

### 1. Frontend Sends Request

```javascript
// Playground.jsx
const response = await axios.post(
  'http://localhost:5000/api/code-executor/execute',
  {
    language: 'python',
    code: 'print("Hello")'
  },
  { timeout: 20000 }
)
```

### 2. Backend Receives Request

```javascript
// codeExecutor.js - POST /execute
router.post('/execute', async (req, res) => {
  const { language, code } = req.body
  
  // Validate
  if (!language || !code) {
    return res.status(400).json({
      success: false,
      error: 'Language and code are required'
    })
  }
  
  // Handle JavaScript
  if (language === 'javascript') {
    return res.json({
      success: true,
      language: 'javascript',
      message: 'Execute in browser using eval()'
    })
  }
  
  // Execute via Judge0
  const result = await executeViaJudge0(language, code)
  res.json(result)
})
```

### 3. Backend Calls Judge0 API

```javascript
// codeExecutor.js - executeViaJudge0()
const response = await axios.post(
  'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
  {
    language_id: 71,  // Python
    source_code: 'print("Hello")',
    stdin: ''
  },
  {
    headers: {
      'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    timeout: 20000
  }
)
```

### 4. Judge0 Executes Code

Judge0 API:
- Receives code
- Compiles (if needed)
- Executes in isolated environment
- Returns stdout, stderr, status

### 5. Backend Returns Response

```javascript
{
  success: true,
  language: 'python',
  output: 'Hello\n',
  error: '',
  exitCode: 0,
  message: 'Code executed successfully'
}
```

### 6. Frontend Displays Output

```javascript
// Playground.jsx
if (response.data.success === false) {
  setError(response.data.error)
} else if (response.data.error) {
  setError(response.data.error)
} else {
  setOutput(response.data.output)
}
```

## Language ID Mapping

```javascript
const languageMap = {
  'javascript': 63,
  'python': 71,
  'java': 62,
  'cpp': 54,
  'c': 50,
  'csharp': 51,
  'go': 60,
  'rust': 73,
  'ruby': 72,
  'php': 68,
  'swift': 83,
  'kotlin': 78,
  'typescript': 74,
  'r': 80,
  'bash': 46,
  'sql': 82
}
```

## Error Handling Flow

```
User submits code
    ↓
Frontend validates
    ↓
Backend receives request
    ├─ Missing language/code? → 400 error
    ├─ JavaScript? → Browser execution
    └─ Other language? → Judge0 API
        ├─ No API key? → Configuration error
        ├─ Invalid API key? → Authentication error
        ├─ Unsupported language? → Language error
        ├─ Timeout? → Timeout error
        ├─ Code error? → Execution error (stderr)
        └─ Success? → Output (stdout)
    ↓
Frontend displays result
    ├─ Error? → Red error message
    └─ Success? → Green output
```

## Response Format

### Success Response

```json
{
  "success": true,
  "language": "python",
  "output": "Hello\n",
  "error": "",
  "exitCode": 0,
  "message": "Code executed successfully"
}
```

### Error Response

```json
{
  "success": false,
  "error": "API key is invalid or expired. Please check your JUDGE0_API_KEY in .env file.",
  "output": "",
  "message": "Authentication error"
}
```

## Execution Timeline

### JavaScript
```
User clicks Run
    ↓ (instant)
Browser eval()
    ↓ (instant)
Output displayed
Total: < 100ms
```

### Other Languages
```
User clicks Run
    ↓ (instant)
Request sent to backend
    ↓ (1-2ms)
Backend calls Judge0 API
    ↓ (500-2000ms)
Judge0 executes code
    ↓ (100-1000ms)
Response returned to backend
    ↓ (1-2ms)
Backend returns to frontend
    ↓ (instant)
Output displayed
Total: 1-5 seconds
```

## Configuration

### Environment Variables

```env
JUDGE0_API_KEY=your_api_key_here
```

### Backend Setup

```javascript
// codeExecutor.js
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com'
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY
```

### Frontend Setup

```javascript
// Playground.jsx
const response = await axios.post(
  'http://localhost:5000/api/code-executor/execute',
  { language, code },
  { timeout: 20000 }
)
```

## Rate Limiting

Judge0 Free Tier:
- 100 requests per day
- 20 requests per minute

Backend should implement:
- Request queuing
- Rate limit headers
- User feedback on limits

## Security Considerations

1. **Code Isolation**: Judge0 runs code in isolated containers
2. **No File Access**: Code cannot access server filesystem
3. **API Key Protection**: Stored in .env, not in code
4. **Input Validation**: Language and code validated
5. **Error Messages**: Don't expose sensitive info
6. **Timeout**: 20 seconds max per request

## Monitoring

### Backend Logs

```
Executing python code via Judge0 API
Judge0 execution completed with status: 3
```

### Frontend Console

```
POST http://localhost:5000/api/code-executor/execute 200 OK
```

### Metrics to Track

- Execution time per language
- Success/failure rate
- API quota usage
- Error types
- User feedback

## Troubleshooting

### Issue: 403 Forbidden
**Cause**: Invalid API key  
**Solution**: Get new key from RapidAPI

### Issue: 429 Too Many Requests
**Cause**: Rate limit exceeded  
**Solution**: Wait or upgrade plan

### Issue: 504 Gateway Timeout
**Cause**: Judge0 overloaded  
**Solution**: Retry after delay

### Issue: Empty Output
**Cause**: Code produced no output  
**Solution**: Normal - show "Code executed successfully"

## Future Enhancements

1. **Caching**: Cache execution results
2. **Async Execution**: Queue long-running jobs
3. **Custom Input**: Support stdin for interactive programs
4. **File Support**: Allow multiple files
5. **Debugging**: Add breakpoints and step-through
6. **Performance**: Optimize API calls
7. **Analytics**: Track usage patterns

---

**This is the complete technical flow for the multi-language Playground.**
