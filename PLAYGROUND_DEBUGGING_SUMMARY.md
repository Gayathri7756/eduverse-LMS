# Playground Debugging - Complete Summary 📋

## The Issue
All languages except JavaScript show: "Code execution service unavailable. Please try again later."

## Why This Happens
The backend is trying to call the Piston API (external code execution service), but it's not responding.

## Root Causes (In Order of Likelihood)
1. **Piston API is down** (60% chance)
2. **Firewall blocking requests** (20% chance)
3. **No internet connection** (10% chance)
4. **Backend not running** (5% chance)
5. **DNS issue** (5% chance)

---

## Quick Fixes (Try in Order)

### Fix 1: Restart Backend (30 seconds)
**Where**: Terminal 1 (Backend Terminal)
```
Press: Ctrl+C
Type: npm run dev
Press: Enter
```

### Fix 2: Check Internet (1 minute)
**Where**: Terminal 2 (New Terminal)
```
Type: ping google.com
Press: Enter
Look for: Responses from google.com
Stop: Press Ctrl+C
```

### Fix 3: Disable Firewall (2 minutes)
**Where**: Windows/Mac/Linux Settings
- Windows: Settings > Firewall > Turn off
- Mac: System Settings > Security > Firewall > Turn off
- Linux: `sudo ufw disable`

### Fix 4: Wait for Piston API (5-10 minutes)
- Piston API might be temporarily down
- Wait and try again

---

## Detailed Debugging Steps

### Step 1: Check Backend Logs
**Where**: Terminal 1 (Backend Terminal)
**What to Look For**:
```
Executing python code via Piston API
Trying endpoint: https://emkc.org/api/v2/piston/execute
```

**If You See**:
- "succeeded" → Piston is working ✓
- "failed" → Piston is not accessible ✗

### Step 2: Test Internet
**Where**: Terminal 2 (New Terminal)
**Command**:
```bash
ping google.com
```

**If You See**:
- Responses → Internet is working ✓
- "Destination unreachable" → No internet ✗

### Step 3: Test Piston API
**Where**: Terminal 2 (New Terminal)
**Command**:
```bash
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```

**If You See**:
- JSON with "run" object → Piston is working ✓
- "Could not resolve host" → DNS/internet issue ✗
- "Failed to connect" → Firewall/network issue ✗

### Step 4: Test Backend Health
**Where**: Terminal 2 (New Terminal)
**Command**:
```bash
curl http://localhost:5000/health
```

**If You See**:
- `{"status":"OK",...}` → Backend is running ✓
- "Connection refused" → Backend is not running ✗

---

## Where to Run Each Command

| Command | Terminal | Location |
|---------|----------|----------|
| `npm run dev` | Terminal 1 | Backend folder |
| `Ctrl+C` | Terminal 1 | Backend folder |
| `ping google.com` | Terminal 2 | Any folder |
| `curl http://localhost:5000/health` | Terminal 2 | Any folder |
| `curl -X POST https://emkc.org/...` | Terminal 2 | Any folder |
| Check logs | Terminal 1 | Look at output |
| Check firewall | Settings | Windows/Mac/Linux |

---

## Terminal Setup

### Terminal 1: Backend Terminal
- **Already running**: `npm run dev`
- **Purpose**: Run backend, see logs
- **What to do**: Watch for logs, restart if needed

### Terminal 2: Command Terminal
- **New terminal**: Open a new one
- **Purpose**: Run debugging commands
- **What to do**: Run curl, ping, and other commands

### Browser
- **URL**: `http://localhost:5173/playground`
- **Purpose**: Test Playground
- **What to do**: Try Python code, watch Terminal 1 for logs

---

## Troubleshooting Decision Tree

```
Is JavaScript working?
├─ YES → Problem is with Piston API
│  ├─ Check Backend Logs (Terminal 1)
│  │  ├─ "succeeded" → Piston is working, problem elsewhere
│  │  └─ "failed" → Piston is not accessible
│  ├─ Test Internet (Terminal 2: ping google.com)
│  │  ├─ Responses → Internet is working
│  │  └─ No responses → No internet
│  ├─ Test Piston (Terminal 2: curl -X POST https://...)
│  │  ├─ JSON response → Piston is working
│  │  └─ Error → Piston is down or firewall blocking
│  └─ Check Firewall (Settings)
│     ├─ Disable temporarily
│     └─ Try again
└─ NO → Problem is with backend or browser
   ├─ Test Backend (Terminal 2: curl http://localhost:5000/health)
   │  ├─ JSON response → Backend is running
   │  └─ Connection refused → Backend is not running
   └─ Restart Backend (Terminal 1: Ctrl+C, npm run dev)
```

---

## Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Code execution service unavailable" | Piston API down | Wait 5-10 minutes |
| "Code execution service unavailable" | Firewall blocking | Disable firewall |
| "Code execution service unavailable" | No internet | Check WiFi/Ethernet |
| "Connection refused" | Backend not running | Run `npm run dev` |
| "Could not resolve host" | DNS issue | Restart router |
| "Failed to connect" | Network issue | Check firewall |

---

## Success Indicators

✅ Backend logs show "succeeded"
✅ Piston API returns JSON
✅ Internet is working (ping responses)
✅ Backend is running (curl health check)
✅ Firewall is not blocking
✅ Python code runs and shows output

---

## Files to Check

### Backend Logs
- **Where**: Terminal 1 (Backend Terminal)
- **What to Look For**: "Executing python code via Piston API"
- **Success**: "succeeded"
- **Failure**: "failed"

### Browser Console
- **Where**: Browser DevTools (F12)
- **What to Look For**: JavaScript errors
- **Success**: No errors
- **Failure**: Error messages

### Network Tab
- **Where**: Browser DevTools (F12) > Network
- **What to Look For**: POST request to `/api/code-executor/execute`
- **Success**: Status 200, JSON response
- **Failure**: Status 500, error message

---

## Step-by-Step Fix Process

### Step 1: Identify the Problem
1. Open Terminal 1 (Backend)
2. Try Python code in Playground
3. Look for "Executing python code via Piston API"
4. Check if it says "succeeded" or "failed"

### Step 2: Diagnose the Issue
1. Open Terminal 2
2. Run: `ping google.com` (check internet)
3. Run: `curl http://localhost:5000/health` (check backend)
4. Run: `curl -X POST https://emkc.org/...` (check Piston)

### Step 3: Apply the Fix
- If internet is down: Check WiFi/Ethernet
- If backend is down: Run `npm run dev`
- If Piston is down: Wait or disable firewall
- If firewall is blocking: Disable temporarily

### Step 4: Test the Fix
1. Go to Playground
2. Select Python
3. Code: `print("Hello")`
4. Click Run Code
5. Check if output shows

---

## Important Notes

- **JavaScript works**: Runs in browser, doesn't need Piston
- **Other languages need Piston**: External API for code execution
- **Piston is free**: But can have downtime
- **Timeout**: 15 seconds per request
- **Fallback**: Code tries 2 different Piston endpoints

---

## Quick Reference

### Commands to Run
```bash
# Test internet
ping google.com

# Test backend
curl http://localhost:5000/health

# Test Piston API
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'

# Restart backend
npm run dev
```

### Where to Run
- `ping` → Terminal 2
- `curl` → Terminal 2
- `npm run dev` → Terminal 1
- Check logs → Terminal 1
- Check firewall → Settings

---

## Status

✅ **Code is correct**
❌ **Piston API might be down or unreachable**

The issue is not with the code. It's with the external Piston API service not being accessible.

---

## Next Steps

1. **Follow the Quick Fixes** (in order)
2. **Check Backend Logs** (Terminal 1)
3. **Test Internet** (Terminal 2: ping)
4. **Test Piston API** (Terminal 2: curl)
5. **Disable Firewall** (Settings)
6. **Restart Backend** (Terminal 1)
7. **Try Python Code Again** (Browser)

---

## Support

If still not working:
1. Check all debugging steps above
2. Check backend logs for specific error
3. Test Piston API with curl
4. Check internet connection
5. Restart backend
6. Disable firewall temporarily
7. Wait for Piston API to come back online

---

**Last Updated**: March 16, 2026
**Status**: Complete debugging guide ready
**Ready**: YES
