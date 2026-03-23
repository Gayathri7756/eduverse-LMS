# Playground - Debug Guide

## Issue
All languages except JavaScript are showing "Code execution service unavailable" error.

## Root Cause
The Piston API endpoints are not responding or are unreachable from the backend.

## How to Debug

### Step 1: Check Backend Logs
1. Open terminal where backend is running
2. Look for logs when you try to execute code
3. You should see:
   - `Executing [language] code via Piston API`
   - `Trying endpoint: https://emkc.org/api/v2/piston/execute`
   - Either success or failure message

### Step 2: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any error messages
4. Check Network tab to see the API request

### Step 3: Test Piston API Directly
Open a terminal and run:

```bash
# Test Piston API endpoint 1
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "version": "*",
    "files": [{"name": "main.py", "content": "print(\"Hello\")"}]
  }'

# Test Piston API endpoint 2
curl -X POST https://piston.rocks/api/v2/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "version": "*",
    "files": [{"name": "main.py", "content": "print(\"Hello\")"}]
  }'
```

### Step 4: Check Internet Connection
- Verify you have internet access
- Check if Piston API is accessible from your network
- Try accessing the endpoints in browser:
  - https://emkc.org/api/v2/piston/execute
  - https://piston.rocks/api/v2/execute

### Step 5: Check Backend is Running
```bash
# Check if backend is running
curl http://localhost:5000/health

# Should return:
# {"status":"OK","message":"Backend is running","firebaseEnabled":false}
```

---

## Solutions

### Solution 1: Check Internet Connection
- Ensure you have stable internet
- Try pinging Google: `ping google.com`
- Try accessing Piston API in browser

### Solution 2: Use Alternative Piston Endpoint
The code already tries 2 endpoints. If both fail, the service is down.

### Solution 3: Check Firewall
- Firewall might be blocking outbound requests
- Check firewall settings
- Try disabling firewall temporarily to test

### Solution 4: Check Proxy Settings
- If behind a proxy, configure it
- Check if proxy is blocking the requests

### Solution 5: Restart Backend
```bash
# Stop backend (Ctrl+C)
# Then restart
npm run dev
```

---

## Expected Behavior

### When Code Executes Successfully
1. Frontend sends request to backend
2. Backend logs: `Executing [language] code via Piston API`
3. Backend tries endpoint 1
4. Backend gets response with `run` object
5. Backend returns output
6. Frontend displays output in green

### When Code Has Errors
1. Same as above, but
2. Backend gets stderr from Piston
3. Backend returns error message
4. Frontend displays error in red

### When Piston API is Down
1. Backend tries endpoint 1 → fails
2. Backend tries endpoint 2 → fails
3. Backend returns error: "Code execution service unavailable"
4. Frontend displays error in red

---

## Troubleshooting Steps

### Issue: "Code execution service unavailable"

**Step 1: Check backend logs**
- Look for `Executing [language] code via Piston API`
- Look for `Trying endpoint:` messages
- Look for error messages

**Step 2: Test Piston API**
```bash
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```

**Step 3: Check internet**
- Ping Google: `ping google.com`
- Check if you can access https://emkc.org

**Step 4: Check firewall**
- Disable firewall temporarily
- Try again

**Step 5: Restart backend**
- Stop backend (Ctrl+C)
- Restart: `npm run dev`

---

## Testing Checklist

- [ ] Backend is running on port 5000
- [ ] Frontend can reach backend (check Network tab)
- [ ] Internet connection is working
- [ ] Piston API is accessible
- [ ] Firewall is not blocking requests
- [ ] No proxy issues

---

## Common Issues

### Issue 1: Backend not running
**Error**: Connection refused
**Solution**: Start backend with `npm run dev`

### Issue 2: Piston API down
**Error**: Code execution service unavailable
**Solution**: Wait for Piston API to come back online

### Issue 3: Firewall blocking
**Error**: Timeout or connection refused
**Solution**: Check firewall settings

### Issue 4: Proxy issues
**Error**: Connection refused or timeout
**Solution**: Configure proxy settings

### Issue 5: Network issues
**Error**: Timeout or connection refused
**Solution**: Check internet connection

---

## Logs to Check

### Backend Logs
```
Executing python code via Piston API
Trying endpoint: https://emkc.org/api/v2/piston/execute
Endpoint https://emkc.org/api/v2/piston/execute succeeded
```

### Browser Console
```
Code execution error: Network Error
```

### Network Tab
- Request: POST http://localhost:5000/api/code-executor/execute
- Status: 200 (success) or 500 (error)
- Response: JSON with output or error

---

## Quick Test

1. Open Playground
2. Select Python
3. Code: `print("test")`
4. Click Run Code
5. Check:
   - Backend logs for execution messages
   - Browser console for errors
   - Network tab for request/response

---

## Contact Support

If issue persists:
1. Check all troubleshooting steps above
2. Check backend logs for error messages
3. Test Piston API directly with curl
4. Check internet connection
5. Restart backend and try again

---

**Status**: Debugging guide created
**Last Updated**: March 16, 2026
