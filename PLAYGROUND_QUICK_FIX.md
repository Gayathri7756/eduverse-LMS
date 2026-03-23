# Playground - Quick Fix Guide

## Problem
All languages except JavaScript show: "Code execution service unavailable. Please try again later."

## Why This Happens
The backend is trying to call the Piston API (external code execution service), but it's not responding. This could be because:
1. Piston API is down
2. Internet connection issue
3. Firewall blocking the request
4. Network timeout

## Quick Fixes (Try in Order)

### Fix 1: Check Internet Connection
```bash
# Test internet
ping google.com

# If this fails, you don't have internet
# If this works, continue to Fix 2
```

### Fix 2: Test Piston API Directly
```bash
# Test if Piston API is accessible
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'

# If this returns JSON with "run" object, Piston is working
# If this times out or fails, Piston API is down
```

### Fix 3: Check Backend Logs
1. Look at the terminal where backend is running
2. When you try to execute code, you should see:
   ```
   Executing python code via Piston API
   Trying endpoint: https://emkc.org/api/v2/piston/execute
   Piston endpoint https://emkc.org/api/v2/piston/execute failed: [error message]
   Trying endpoint: https://piston.rocks/api/v2/execute
   Piston endpoint https://piston.rocks/api/v2/execute failed: [error message]
   All Piston endpoints failed
   ```
3. Look at the error messages to understand what's failing

### Fix 4: Restart Backend
```bash
# Stop backend (Ctrl+C in the terminal)
# Wait 2 seconds
# Restart backend
npm run dev
```

### Fix 5: Check Firewall
- Windows: Check Windows Defender Firewall
- Mac: Check System Preferences > Security & Privacy > Firewall
- Linux: Check iptables or ufw
- Disable firewall temporarily to test

### Fix 6: Hard Refresh Browser
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

---

## What's Working vs Not Working

### ✅ Working
- JavaScript (executes in browser, doesn't need Piston)
- Form submission
- Language switching
- UI rendering

### ❌ Not Working
- Python
- Java
- C++
- All other languages (need Piston API)

---

## Root Cause Analysis

### If Piston API is Down
- **Sign**: All non-JavaScript languages fail
- **Solution**: Wait for Piston API to come back online
- **Check**: https://status.emkc.org or https://piston.rocks

### If Internet is Down
- **Sign**: All requests fail, including Piston API
- **Solution**: Check internet connection
- **Check**: `ping google.com`

### If Firewall is Blocking
- **Sign**: Timeout errors in backend logs
- **Solution**: Check firewall settings
- **Check**: Disable firewall temporarily

### If Backend is Not Running
- **Sign**: Connection refused error
- **Solution**: Start backend with `npm run dev`
- **Check**: `curl http://localhost:5000/health`

---

## Step-by-Step Debugging

### Step 1: Verify Backend is Running
```bash
curl http://localhost:5000/health
```
**Expected Response**:
```json
{"status":"OK","message":"Backend is running","firebaseEnabled":false}
```

### Step 2: Check Internet
```bash
ping google.com
```
**Expected**: Responses from google.com

### Step 3: Test Piston API
```bash
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```
**Expected**: JSON response with `run` object

### Step 4: Check Backend Logs
- Run code in Playground
- Look at backend terminal
- Check for error messages

### Step 5: Check Browser Console
- Open DevTools (F12)
- Go to Console tab
- Look for error messages

---

## Common Solutions

### Solution 1: Piston API is Down
**Symptom**: All non-JS languages fail
**Fix**: Wait for Piston API to come back online
**Time**: Usually 5-30 minutes

### Solution 2: Internet Connection
**Symptom**: All requests fail
**Fix**: Check internet, restart router
**Time**: Immediate

### Solution 3: Firewall
**Symptom**: Timeout errors
**Fix**: Disable firewall or add exception
**Time**: Immediate

### Solution 4: Backend Not Running
**Symptom**: Connection refused
**Fix**: Start backend with `npm run dev`
**Time**: Immediate

### Solution 5: Browser Cache
**Symptom**: Old code still running
**Fix**: Hard refresh (Ctrl+Shift+R)
**Time**: Immediate

---

## Testing After Fix

1. Open Playground
2. Select Python
3. Code: `print("Hello from Python")`
4. Click "Run Code"
5. Expected: Output shows "Hello from Python"

---

## If Still Not Working

1. Check all fixes above
2. Check backend logs for specific error
3. Test Piston API with curl
4. Check internet connection
5. Restart backend
6. Hard refresh browser
7. Check firewall settings

---

## Important Notes

- **JavaScript works**: Because it executes in browser, doesn't need Piston
- **Other languages need Piston**: External API for code execution
- **Piston API is free**: But can have downtime
- **Fallback endpoints**: Code tries 2 different Piston endpoints
- **Timeout**: 15 seconds per request

---

## Status

✅ **Code is correct**
❌ **Piston API might be down or unreachable**

The fix has been applied to handle errors better. Now you need to:
1. Check if Piston API is accessible
2. Check internet connection
3. Check firewall settings
4. Restart backend if needed

---

**Last Updated**: March 16, 2026
**Status**: Debugging guide provided
