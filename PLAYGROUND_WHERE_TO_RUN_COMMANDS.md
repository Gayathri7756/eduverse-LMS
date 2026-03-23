# Where to Run Each Command - Visual Guide 📍

## Setup: You Need 3 Terminal Windows

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR COMPUTER                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────┐ │
│  │  Terminal 1      │  │  Terminal 2      │  │ Browser  │ │
│  │  (Backend)       │  │  (Commands)      │  │ (Test)   │ │
│  │                  │  │                  │  │          │ │
│  │  npm run dev     │  │  ping google.com │  │ Python   │ │
│  │  (running)       │  │  curl ...        │  │ code     │ │
│  │                  │  │  (run commands)  │  │          │ │
│  └──────────────────┘  └──────────────────┘  └──────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Terminal 1: Backend Terminal

### What It Is
The terminal where your backend server is running.

### How to Identify It
- Shows: `Server running on port 5000`
- Shows: `Health check: http://localhost:5000/health`
- Shows logs when you run code

### What to Do Here
1. **Check logs** - Look for "Executing python code via Piston API"
2. **Restart backend** - Press Ctrl+C, then `npm run dev`
3. **Watch for errors** - See what's failing

### Example Output
```
$ npm run dev
Server running on port 5000
Health check: http://localhost:5000/health

[User tries Python code]

Executing python code via Piston API
Trying endpoint: https://emkc.org/api/v2/piston/execute
Piston endpoint https://emkc.org/api/v2/piston/execute failed: getaddrinfo ENOTFOUND emkc.org
```

---

## Terminal 2: Command Terminal

### What It Is
A new terminal where you run debugging commands.

### How to Open It
- **Windows**: Right-click desktop → Open PowerShell or Command Prompt
- **Mac**: Open Applications > Utilities > Terminal
- **Linux**: Right-click desktop → Open Terminal

### What to Do Here
Run these commands one by one:

#### Command 1: Test Internet
```bash
ping google.com
```
**Expected**: Responses from google.com
**Press**: Ctrl+C to stop

#### Command 2: Test Backend Health
```bash
curl http://localhost:5000/health
```
**Expected**: `{"status":"OK",...}`

#### Command 3: Test Piston API
```bash
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```
**Expected**: JSON with "run" object

### Example Session
```
$ ping google.com
PING google.com (142.250.185.46) 56(84) bytes of data.
64 bytes from 142.250.185.46: icmp_seq=1 ttl=119 time=25.3 ms
^C

$ curl http://localhost:5000/health
{"status":"OK","message":"Backend is running","firebaseEnabled":false}

$ curl -X POST https://emkc.org/api/v2/piston/execute ...
{
  "language": "python",
  "version": "3.10.0",
  "run": {
    "stdout": "test\n",
    "stderr": "",
    "code": 0
  }
}
```

---

## Browser: Test Playground

### What It Is
Your web browser where you test the Playground.

### How to Open It
1. Open browser
2. Go to: `http://localhost:5173`
3. Click "Playground"

### What to Do Here
1. Select Python
2. Code: `print("Hello")`
3. Click "Run Code"
4. Check if output shows

### Watch Terminal 1
While you're testing in browser, watch Terminal 1 for logs.

---

## Complete Workflow

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Open Terminal 1 (Backend)                           │
│ ├─ Already running with: npm run dev                        │
│ └─ Watch for logs                                           │
├─────────────────────────────────────────────────────────────┤
│ Step 2: Open Terminal 2 (Commands)                          │
│ ├─ Run: ping google.com                                     │
│ ├─ Run: curl http://localhost:5000/health                   │
│ └─ Run: curl -X POST https://emkc.org/...                   │
├─────────────────────────────────────────────────────────────┤
│ Step 3: Open Browser                                        │
│ ├─ Go to: http://localhost:5173/playground                 │
│ ├─ Select Python                                            │
│ ├─ Code: print("Hello")                                     │
│ └─ Click Run Code                                           │
├─────────────────────────────────────────────────────────────┤
│ Step 4: Check Results                                       │
│ ├─ Terminal 1: Look for logs                                │
│ ├─ Terminal 2: Check command outputs                        │
│ └─ Browser: Check if output shows                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Command Reference Table

| Command | Terminal | Purpose | Expected Result |
|---------|----------|---------|-----------------|
| `npm run dev` | Terminal 1 | Start backend | "Server running on port 5000" |
| `Ctrl+C` | Terminal 1 | Stop backend | Backend stops |
| `ping google.com` | Terminal 2 | Test internet | Responses from google.com |
| `curl http://localhost:5000/health` | Terminal 2 | Test backend | JSON response |
| `curl -X POST https://emkc.org/...` | Terminal 2 | Test Piston | JSON with "run" object |
| Check logs | Terminal 1 | See execution | "Executing python code..." |

---

## Troubleshooting: Where to Look

### Problem: "Code execution service unavailable"

**Where to Check**:
1. **Terminal 1** → Look for "Executing python code via Piston API"
2. **Terminal 2** → Run `curl -X POST https://emkc.org/...`
3. **Terminal 2** → Run `ping google.com`

**What to Look For**:
- Terminal 1: "succeeded" or "failed"?
- Terminal 2: JSON response or error?
- Terminal 2: Ping responses or timeout?

### Problem: Backend not responding

**Where to Check**:
1. **Terminal 1** → Is it running?
2. **Terminal 2** → Run `curl http://localhost:5000/health`

**What to Do**:
- Terminal 1: Press Ctrl+C, then `npm run dev`

### Problem: No internet

**Where to Check**:
1. **Terminal 2** → Run `ping google.com`

**What to Do**:
- Check WiFi/Ethernet connection
- Restart router

---

## Quick Checklist

### ✓ Terminal 1 (Backend)
- [ ] Backend is running
- [ ] Shows "Server running on port 5000"
- [ ] Shows logs when code executes
- [ ] No error messages

### ✓ Terminal 2 (Commands)
- [ ] `ping google.com` shows responses
- [ ] `curl http://localhost:5000/health` shows JSON
- [ ] `curl -X POST https://emkc.org/...` shows JSON

### ✓ Browser
- [ ] Playground loads
- [ ] Can select languages
- [ ] Can write code
- [ ] Can click Run Code

---

## Visual: Data Flow

```
Browser (Playground)
    ↓
    │ POST /api/code-executor/execute
    │ {language: "python", code: "print(\"test\")"}
    ↓
Terminal 1 (Backend)
    ├─ Logs: "Executing python code via Piston API"
    ├─ Logs: "Trying endpoint: https://emkc.org/..."
    ↓
Terminal 2 (Internet)
    ├─ Piston API (https://emkc.org/...)
    ├─ Returns: {run: {stdout: "test\n", ...}}
    ↓
Terminal 1 (Backend)
    ├─ Logs: "Endpoint succeeded"
    ├─ Returns: {success: true, output: "test\n"}
    ↓
Browser (Playground)
    └─ Shows: "test" in green
```

---

## If Something Goes Wrong

### Backend Logs Show "failed"
→ Check Terminal 2: `curl -X POST https://emkc.org/...`

### Curl Shows "Could not resolve host"
→ Check Terminal 2: `ping google.com`

### Ping Shows No Responses
→ Check internet connection

### Backend Not Running
→ Terminal 1: `npm run dev`

### Still Not Working
→ Check all 3 terminals
→ Restart backend
→ Disable firewall temporarily
→ Wait for Piston API to come back online

---

## Summary

| What | Where | How |
|------|-------|-----|
| Check logs | Terminal 1 | Look at output |
| Restart backend | Terminal 1 | Ctrl+C, npm run dev |
| Test internet | Terminal 2 | ping google.com |
| Test backend | Terminal 2 | curl http://localhost:5000/health |
| Test Piston | Terminal 2 | curl -X POST https://emkc.org/... |
| Test Playground | Browser | Go to http://localhost:5173/playground |

---

**Last Updated**: March 16, 2026
**Status**: Complete visual guide ready
