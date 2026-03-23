# Playground Debugging - Step by Step Guide 🔧

## Overview
This guide shows you EXACTLY where to run each debugging command.

---

## Setup: Open 3 Terminal Windows

You need 3 terminal windows open:

### Terminal 1: Backend Terminal
- **Purpose**: Run backend server and see logs
- **Location**: Already running with `npm run dev`
- **What you'll see**: Backend logs when code executes

### Terminal 2: Command Terminal
- **Purpose**: Run debugging commands
- **Location**: Any folder (doesn't matter)
- **What you'll do**: Run curl, ping, and other commands

### Terminal 3: Frontend Terminal (Optional)
- **Purpose**: Run frontend server
- **Location**: Already running with `npm run dev`
- **What you'll see**: Frontend logs

---

## Step 1: Check Backend Logs

### Where to Look
**Terminal 1 (Backend Terminal)**

### What to Do
1. Look at the terminal where backend is running
2. Try to execute Python code in Playground
3. Watch the terminal for messages

### What You Should See
```
Executing python code via Piston API
Trying endpoint: https://emkc.org/api/v2/piston/execute
Piston endpoint https://emkc.org/api/v2/piston/execute failed: getaddrinfo ENOTFOUND emkc.org
Trying endpoint: https://piston.rocks/api/v2/execute
Piston endpoint https://piston.rocks/api/v2/execute failed: getaddrinfo ENOTFOUND piston.rocks
All Piston endpoints failed
```

### What It Means
- If you see "succeeded": Piston API is working ✓
- If you see "failed": Piston API is not accessible ✗
- If you see "ENOTFOUND": DNS issue or no internet ✗

---

## Step 2: Test Internet Connection

### Where to Run
**Terminal 2 (Command Terminal)**

### Command
```bash
ping google.com
```

### How to Run
1. Open Terminal 2
2. Type: `ping google.com`
3. Press Enter
4. Wait for responses

### What You Should See
```
PING google.com (142.250.185.46) 56(84) bytes of data.
64 bytes from 142.250.185.46: icmp_seq=1 ttl=119 time=25.3 ms
64 bytes from 142.250.185.46: icmp_seq=2 ttl=119 time=24.8 ms
64 bytes from 142.250.185.46: icmp_seq=3 ttl=119 time=25.1 ms
```

### What It Means
- If you see responses: Internet is working ✓
- If you see "Destination unreachable": No internet ✗
- If you see "Name or service not known": DNS issue ✗

### How to Stop
Press `Ctrl+C` to stop the ping

---

## Step 3: Test Piston API

### Where to Run
**Terminal 2 (Command Terminal)**

### Command
```bash
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```

### How to Run
1. Open Terminal 2
2. Copy the entire command above
3. Paste it into Terminal 2
4. Press Enter
5. Wait for response

### What You Should See (Success)
```json
{
  "language": "python",
  "version": "3.10.0",
  "run": {
    "stdout": "test\n",
    "stderr": "",
    "code": 0,
    "signal": null
  }
}
```

### What You Should See (Failure)
```
curl: (6) Could not resolve host name
```
or
```
curl: (7) Failed to connect to emkc.org port 443
```

### What It Means
- If you see JSON with "run" object: Piston API is working ✓
- If you see "Could not resolve host": DNS issue ✗
- If you see "Failed to connect": Network/firewall issue ✗

---

## Step 4: Test Backend Health

### Where to Run
**Terminal 2 (Command Terminal)**

### Command
```bash
curl http://localhost:5000/health
```

### How to Run
1. Open Terminal 2
2. Type the command above
3. Press Enter
4. Wait for response

### What You Should See
```json
{"status":"OK","message":"Backend is running","firebaseEnabled":false}
```

### What It Means
- If you see this JSON: Backend is running ✓
- If you see "Connection refused": Backend is not running ✗
- If you see nothing: Backend might be crashed ✗

---

## Step 5: Restart Backend

### Where to Run
**Terminal 1 (Backend Terminal)**

### How to Do It
1. Look at Terminal 1 (where backend is running)
2. Press `Ctrl+C` to stop the backend
3. Wait 2 seconds
4. Type: `npm run dev`
5. Press Enter
6. Wait for "Server running on port 5000"

### What You Should See
```
Server running on port 5000
Health check: http://localhost:5000/health
```

### What It Means
- If you see this: Backend restarted successfully ✓
- If you see errors: Check backend code for issues ✗

---

## Step 6: Check Firewall (Windows)

### Where to Do It
**Windows Settings**

### How to Do It
1. Open Windows Settings
2. Go to: Settings > Privacy & Security > Windows Defender Firewall
3. Click "Allow an app through firewall"
4. Look for Node.js or npm
5. If not there, click "Allow another app" and add it

### Alternative: Disable Firewall Temporarily
1. Open Windows Defender Firewall
2. Click "Turn Windows Defender Firewall on or off"
3. Click "Turn off" (for testing only)
4. Test Playground
5. Turn firewall back on

---

## Step 7: Check Firewall (Mac)

### Where to Do It
**Mac System Settings**

### How to Do It
1. Open System Settings
2. Go to: Security & Privacy > Firewall
3. Click "Firewall Options"
4. Check if firewall is on
5. If on, try disabling temporarily for testing

---

## Step 8: Check Firewall (Linux)

### Where to Run
**Terminal 2 (Command Terminal)**

### Command (UFW)
```bash
sudo ufw status
```

### Command (iptables)
```bash
sudo iptables -L
```

### How to Disable UFW Temporarily
```bash
sudo ufw disable
```

### How to Re-enable UFW
```bash
sudo ufw enable
```

---

## Complete Debugging Checklist

### ✓ Step 1: Check Backend Logs
- [ ] Open Terminal 1 (Backend)
- [ ] Try running Python code in Playground
- [ ] Look for "Executing python code via Piston API"
- [ ] Check if it says "succeeded" or "failed"

### ✓ Step 2: Test Internet
- [ ] Open Terminal 2
- [ ] Run: `ping google.com`
- [ ] See if you get responses
- [ ] Press Ctrl+C to stop

### ✓ Step 3: Test Piston API
- [ ] Open Terminal 2
- [ ] Run the curl command for Piston API
- [ ] Check if you get JSON response

### ✓ Step 4: Test Backend Health
- [ ] Open Terminal 2
- [ ] Run: `curl http://localhost:5000/health`
- [ ] Check if you get JSON response

### ✓ Step 5: Restart Backend
- [ ] Open Terminal 1
- [ ] Press Ctrl+C
- [ ] Run: `npm run dev`
- [ ] Wait for "Server running on port 5000"

### ✓ Step 6: Check Firewall
- [ ] Open Windows/Mac/Linux firewall settings
- [ ] Check if firewall is blocking Node.js
- [ ] Disable temporarily for testing

---

## Troubleshooting Results

### If Step 1 Shows "succeeded"
✓ Piston API is working
✓ Backend can reach Piston API
✓ Problem might be elsewhere

### If Step 1 Shows "failed"
✗ Piston API is not accessible
→ Check Step 2 (Internet)
→ Check Step 3 (Piston API directly)
→ Check Step 6 (Firewall)

### If Step 2 Shows No Responses
✗ No internet connection
→ Check your WiFi/Ethernet
→ Restart router
→ Check ISP status

### If Step 3 Shows "Could not resolve host"
✗ DNS issue or no internet
→ Check internet connection
→ Try different DNS (8.8.8.8)
→ Restart router

### If Step 3 Shows "Failed to connect"
✗ Network or firewall issue
→ Check firewall settings
→ Try disabling firewall temporarily
→ Check if Piston API is down

### If Step 4 Shows "Connection refused"
✗ Backend is not running
→ Go to Terminal 1
→ Run: `npm run dev`
→ Wait for "Server running on port 5000"

### If Step 5 Fails
✗ Backend won't start
→ Check for errors in Terminal 1
→ Check if port 5000 is in use
→ Try: `lsof -i :5000` (Mac/Linux)
→ Try: `netstat -ano | findstr :5000` (Windows)

### If Step 6 Shows Firewall Blocking
✗ Firewall is blocking Node.js
→ Add Node.js to firewall exceptions
→ Or disable firewall temporarily for testing

---

## Quick Reference: Where to Run Each Command

| Command | Where to Run | Terminal |
|---------|-------------|----------|
| `ping google.com` | Terminal 2 | Command Terminal |
| `curl http://localhost:5000/health` | Terminal 2 | Command Terminal |
| `curl -X POST https://emkc.org/...` | Terminal 2 | Command Terminal |
| `npm run dev` | Terminal 1 | Backend Terminal |
| `Ctrl+C` | Terminal 1 | Backend Terminal |
| Check logs | Terminal 1 | Backend Terminal |
| Check firewall | Settings | Windows/Mac/Linux |

---

## Example: Full Debugging Session

### Terminal 1 (Backend)
```
$ npm run dev
Server running on port 5000
Health check: http://localhost:5000/health

[User tries Python code in Playground]

Executing python code via Piston API
Trying endpoint: https://emkc.org/api/v2/piston/execute
Piston endpoint https://emkc.org/api/v2/piston/execute failed: getaddrinfo ENOTFOUND emkc.org
Trying endpoint: https://piston.rocks/api/v2/execute
Piston endpoint https://piston.rocks/api/v2/execute failed: getaddrinfo ENOTFOUND piston.rocks
All Piston endpoints failed
```

### Terminal 2 (Commands)
```
$ ping google.com
PING google.com (142.250.185.46) 56(84) bytes of data.
64 bytes from 142.250.185.46: icmp_seq=1 ttl=119 time=25.3 ms
^C

$ curl http://localhost:5000/health
{"status":"OK","message":"Backend is running","firebaseEnabled":false}

$ curl -X POST https://emkc.org/api/v2/piston/execute ...
curl: (6) Could not resolve host name
```

### Conclusion
- Backend is running ✓
- Internet is working ✓
- Piston API is not accessible ✗
- **Problem**: Firewall or DNS issue

---

## Next Steps

1. **If Piston API is not accessible**:
   - Check firewall settings
   - Try disabling firewall temporarily
   - Check if Piston API is down (visit https://status.emkc.org)

2. **If Internet is not working**:
   - Check WiFi/Ethernet connection
   - Restart router
   - Check ISP status

3. **If Backend is not running**:
   - Go to Terminal 1
   - Run: `npm run dev`
   - Wait for "Server running on port 5000"

4. **If everything is working**:
   - Try running Python code again
   - It should work now

---

**Status**: Complete debugging guide with exact locations
**Last Updated**: March 16, 2026
