# Playground - Simple Fix Guide 🚀

## The Problem
Python, Java, C++, and other languages show: "Code execution service unavailable"

## The Solution
Most likely the Piston API (external service) is down or unreachable.

---

## Quick Fix (Try These in Order)

### Fix 1: Restart Backend (30 seconds)
1. Find the terminal where backend is running
2. Press `Ctrl+C` to stop it
3. Wait 2 seconds
4. Type: `npm run dev`
5. Press Enter
6. Try Python code again

### Fix 2: Check Internet (1 minute)
1. Open a new terminal
2. Type: `ping google.com`
3. Press Enter
4. If you see responses → Internet is working
5. If you see errors → No internet, check WiFi

### Fix 3: Disable Firewall (2 minutes)
**Windows:**
1. Open Windows Settings
2. Search for "Firewall"
3. Click "Turn Windows Defender Firewall on or off"
4. Click "Turn off" (for testing)
5. Try Python code again
6. Turn firewall back on

**Mac:**
1. Open System Settings
2. Go to Security & Privacy
3. Click Firewall
4. Click "Turn Off" (for testing)
5. Try Python code again
6. Turn firewall back on

### Fix 4: Wait for Piston API
- Piston API might be temporarily down
- Wait 5-10 minutes
- Try again

---

## If Still Not Working

### Check Backend Logs
1. Look at the terminal where backend is running
2. Try Python code in Playground
3. Look for messages like:
   - "Executing python code via Piston API" ✓
   - "succeeded" ✓
   - "failed" ✗

### Test Piston API Directly
1. Open a new terminal
2. Copy and paste this:
```bash
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```
3. Press Enter
4. If you see JSON with "run" → Piston is working
5. If you see error → Piston is down

---

## What's Working vs Not Working

### ✅ Working
- JavaScript (runs in browser)
- UI and buttons
- Language switching

### ❌ Not Working
- Python
- Java
- C++
- All other languages (need Piston API)

---

## Why This Happens

The Playground uses an external service called "Piston API" to run code for languages other than JavaScript.

When you click "Run Code":
1. Frontend sends code to backend
2. Backend sends code to Piston API
3. Piston API runs the code
4. Piston API sends output back
5. Backend sends output to frontend
6. Frontend shows output

If Piston API is down or unreachable, you get the error.

---

## Common Causes

| Cause | Fix |
|-------|-----|
| Piston API is down | Wait 5-10 minutes |
| No internet | Check WiFi/Ethernet |
| Firewall blocking | Disable firewall temporarily |
| Backend not running | Run `npm run dev` |
| DNS issue | Restart router |

---

## Status Check

### Is Backend Running?
```bash
curl http://localhost:5000/health
```
Should show: `{"status":"OK",...}`

### Is Internet Working?
```bash
ping google.com
```
Should show: Responses from google.com

### Is Piston API Working?
```bash
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```
Should show: JSON with "run" object

---

## Step-by-Step Fix

### Step 1: Restart Backend
```
Terminal 1 (Backend):
Ctrl+C
npm run dev
```

### Step 2: Test Internet
```
Terminal 2 (New):
ping google.com
Ctrl+C
```

### Step 3: Test Piston API
```
Terminal 2:
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```

### Step 4: Try Python Code
1. Go to Playground
2. Select Python
3. Code: `print("Hello")`
4. Click Run Code
5. Should work now

---

## If Still Not Working

1. Check backend logs (Terminal 1)
2. Look for "Executing python code via Piston API"
3. Check if it says "succeeded" or "failed"
4. If "failed", check:
   - Internet connection
   - Firewall settings
   - Piston API status

---

## Important Notes

- **JavaScript works**: Runs in browser, doesn't need Piston
- **Other languages need Piston**: External API for code execution
- **Piston is free**: But can have downtime
- **Timeout**: 15 seconds per request
- **Fallback**: Code tries 2 different Piston endpoints

---

## Quick Reference

| What | Where | Command |
|------|-------|---------|
| Restart backend | Terminal 1 | `npm run dev` |
| Test internet | Terminal 2 | `ping google.com` |
| Test Piston | Terminal 2 | `curl -X POST https://...` |
| Check backend | Terminal 2 | `curl http://localhost:5000/health` |
| Check logs | Terminal 1 | Look at output |

---

## Success Indicators

✅ Backend logs show "succeeded"
✅ Piston API returns JSON
✅ Internet is working
✅ Firewall is not blocking
✅ Python code runs and shows output

---

**Last Updated**: March 16, 2026
**Status**: Simple fix guide ready
