# Piston API Whitelist Issue - Solution 🔧

## The Problem
**Piston API is now whitelist-only as of February 15, 2026**

Error Message:
```
"API is now whitelist only as of 2/15/2026. Please contact EngineerMan on Discord 
with use case justification or consider hosting your own Piston instance."
```

This means:
- ❌ Public access to Piston API is blocked
- ❌ You need to be whitelisted to use it
- ❌ Or host your own Piston instance

---

## Solutions (In Order of Ease)

### Solution 1: Show Message to Users (Easiest - 5 minutes)
Display a message that code execution is temporarily unavailable and suggest alternatives.

**Pros**: Quick fix, no setup needed
**Cons**: Users can't execute code

### Solution 2: Use Alternative API (Medium - 30 minutes)
Use a different code execution API like:
- Judge0 API (free tier available)
- Replit API
- AWS Lambda

**Pros**: Works immediately
**Cons**: Need to integrate new API

### Solution 3: Host Your Own Piston (Hard - 1-2 hours)
Set up your own Piston instance locally or on a server.

**Pros**: Full control, no restrictions
**Cons**: Requires server setup and maintenance

---

## Recommended: Solution 1 + Solution 2

### Step 1: Implement Fallback Message (5 minutes)
Show users that code execution is unavailable.

### Step 2: Integrate Judge0 API (30 minutes)
Use Judge0 as alternative (has free tier).

---

## Solution 1: Show Unavailable Message

### File: `backend/src/routes/codeExecutor.js`

Replace the Piston API calls with a message:

```javascript
router.post('/execute', async (req, res) => {
  try {
    const { language, code } = req.body

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        error: 'Language and code are required'
      })
    }

    // Handle JavaScript separately (browser execution)
    if (language === 'javascript') {
      return res.json({
        success: true,
        language: 'javascript',
        message: 'Execute in browser using eval()',
        note: 'JavaScript should be executed in the browser for security'
      })
    }

    // Piston API is now whitelist-only
    return res.status(503).json({
      success: false,
      error: 'Code execution service is currently unavailable. Only JavaScript is supported at this time.',
      message: 'The external code execution service (Piston API) is now whitelist-only. Please use JavaScript or contact support.',
      supportedLanguages: ['javascript']
    })
  } catch (error) {
    console.error('Code execution error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})
```

---

## Solution 2: Use Judge0 API (Recommended)

### Step 1: Get Judge0 API Key
1. Go to: https://judge0.com
2. Sign up for free account
3. Get your API key

### Step 2: Update Backend

Replace `backend/src/routes/codeExecutor.js` with Judge0 implementation:

```javascript
import express from 'express'
import axios from 'axios'

const router = express.Router()
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || 'YOUR_API_KEY'
const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com'

router.post('/execute', async (req, res) => {
  try {
    const { language, code } = req.body

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        error: 'Language and code are required'
      })
    }

    // Handle JavaScript separately (browser execution)
    if (language === 'javascript') {
      return res.json({
        success: true,
        language: 'javascript',
        message: 'Execute in browser using eval()',
        note: 'JavaScript should be executed in the browser for security'
      })
    }

    // Use Judge0 API
    const result = await executeViaJudge0(language, code)
    res.json(result)
  } catch (error) {
    console.error('Code execution error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

async function executeViaJudge0(language, code) {
  const languageMap = {
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

  const languageId = languageMap[language]
  if (!languageId) {
    return {
      success: false,
      error: `Language ${language} is not supported`
    }
  }

  try {
    const response = await axios.post(
      `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
      {
        language_id: languageId,
        source_code: code,
        stdin: ''
      },
      {
        headers: {
          'X-RapidAPI-Key': JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    )

    const { stdout, stderr, status } = response.data

    return {
      success: true,
      language: language,
      output: stdout || '',
      error: stderr || '',
      exitCode: status?.id || 0,
      message: stderr ? 'Code executed with errors' : 'Code executed successfully'
    }
  } catch (error) {
    console.error('Judge0 API error:', error.message)
    return {
      success: false,
      error: 'Code execution service unavailable. Please try again later.',
      output: '',
      message: 'Failed to execute code'
    }
  }
}

export default router
```

### Step 3: Add Judge0 API Key to .env

```
JUDGE0_API_KEY=your_judge0_api_key_here
```

---

## Solution 3: Host Your Own Piston

### Option A: Docker (Easiest)
```bash
docker run -d -p 2000:2000 evals/piston
```

Then update backend to use: `http://localhost:2000/api/v2/execute`

### Option B: Manual Setup
1. Clone Piston: https://github.com/engineer-man/piston
2. Follow installation guide
3. Run locally or on server
4. Update backend URL

---

## Quickest Fix: Show Message to Users

### File: `backend/src/routes/codeExecutor.js`

```javascript
import express from 'express'

const router = express.Router()

router.post('/execute', async (req, res) => {
  try {
    const { language, code } = req.body

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        error: 'Language and code are required'
      })
    }

    // Handle JavaScript separately (browser execution)
    if (language === 'javascript') {
      const logs = []
      const originalLog = console.log
      const originalError = console.error

      console.log = (...args) => {
        logs.push(args.map(arg => {
          if (typeof arg === 'object') {
            return JSON.stringify(arg, null, 2)
          }
          return String(arg)
        }).join(' '))
      }

      console.error = (...args) => {
        logs.push('ERROR: ' + args.map(arg => String(arg)).join(' '))
      }

      try {
        eval(code)
        return res.json({
          success: true,
          language: 'javascript',
          output: logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)',
          error: ''
        })
      } catch (err) {
        return res.json({
          success: true,
          language: 'javascript',
          output: '',
          error: err.message
        })
      } finally {
        console.log = originalLog
        console.error = originalError
      }
    }

    // Other languages not supported
    return res.status(503).json({
      success: false,
      error: 'Code execution for this language is currently unavailable. Only JavaScript is supported.',
      message: 'The external code execution service is temporarily unavailable. Please use JavaScript or try again later.',
      supportedLanguages: ['javascript']
    })
  } catch (error) {
    console.error('Code execution error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

export default router
```

---

## Update Frontend to Show Better Message

### File: `frontend/src/pages/Playground.jsx`

Update the error display:

```javascript
if (response.data) {
  if (response.data.success === false) {
    // Check if it's a service unavailable error
    if (response.status === 503) {
      setError('Code execution service is currently unavailable. Only JavaScript is supported at this time.')
    } else {
      setError(response.data.error || 'Code execution failed')
    }
    setOutput('')
  } else if (response.data.error && response.data.error.trim() !== '') {
    setError(response.data.error)
    setOutput('')
  } else {
    setOutput(response.data.output || 'Code executed successfully (no output)')
    setError('')
  }
}
```

---

## Recommended Action Plan

### Immediate (5 minutes)
1. Update backend to show unavailable message
2. Update frontend to show better error message
3. Keep JavaScript working

### Short Term (30 minutes)
1. Sign up for Judge0 API
2. Integrate Judge0 into backend
3. Test all languages

### Long Term (Optional)
1. Host your own Piston instance
2. Full control and no restrictions

---

## Status

| Solution | Time | Difficulty | Cost |
|----------|------|-----------|------|
| Show Message | 5 min | Easy | Free |
| Judge0 API | 30 min | Medium | Free (with limits) |
| Host Piston | 1-2 hrs | Hard | Free (server cost) |

---

## Next Steps

1. **Decide which solution to use**
2. **Implement the solution**
3. **Test all languages**
4. **Update documentation**

---

**Status**: Piston API whitelist issue identified
**Solution**: Multiple options provided
**Recommendation**: Use Judge0 API (easiest + works)
