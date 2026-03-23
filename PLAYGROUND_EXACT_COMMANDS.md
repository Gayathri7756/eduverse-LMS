# Playground - Exact Commands to Run 💻

## Copy & Paste These Commands

---

## Command 1: Test Internet Connection

### Where to Run
**Terminal 2 (New Terminal)**

### Command (Copy & Paste)
```bash
ping google.com
```

### What to Do
1. Open a new terminal
2. Copy the command above
3. Paste it into terminal
4. Press Enter
5. Wait for responses
6. Press Ctrl+C to stop

### Expected Output
```
PING google.com (142.250.185.46) 56(84) bytes of data.
64 bytes from 142.250.185.46: icmp_seq=1 ttl=119 time=25.3 ms
64 bytes from 142.250.185.46: icmp_seq=2 ttl=119 time=24.8 ms
64 bytes from 142.250.185.46: icmp_seq=3 ttl=119 time=25.1 ms
^C
```

### What It Means
- **Responses**: Internet is working ✓
- **No responses**: No internet ✗

---

## Command 2: Test Backend Health

### Where to Run
**Terminal 2 (New Terminal)**

### Command (Copy & Paste)
```bash
curl http://localhost:5000/health
```

### What to Do
1. Open Terminal 2
2. Copy the command above
3. Paste it into terminal
4. Press Enter
5. Wait for response

### Expected Output
```json
{"status":"OK","message":"Backend is running","firebaseEnabled":false}
```

### What It Means
- **JSON response**: Backend is running ✓
- **Connection refused**: Backend is not running ✗

---

## Command 3: Test Piston API (Endpoint 1)

### Where to Run
**Terminal 2 (New Terminal)**

### Command (Copy & Paste)
```bash
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```

### What to Do
1. Open Terminal 2
2. Copy the entire command above (all lines)
3. Paste it into terminal
4. Press Enter
5. Wait for response

### Expected Output (Success)
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

### Expected Output (Failure)
```
curl: (6) Could not resolve host name
```
or
```
curl: (7) Failed to connect to emkc.org port 443
```

### What It Means
- **JSON with "run" object**: Piston API is working ✓
- **"Could not resolve host"**: DNS issue or no internet ✗
- **"Failed to connect"**: Firewall or network issue ✗

---

## Command 4: Test Piston API (Endpoint 2)

### Where to Run
**Terminal 2 (New Terminal)**

### Command (Copy & Paste)
```bash
curl -X POST https://piston.rocks/api/v2/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```

### What to Do
1. Open Terminal 2
2. Copy the entire command above (all lines)
3. Paste it into terminal
4. Press Enter
5. Wait for response

### Expected Output
Same as Command 3

### What It Means
- If Endpoint 1 fails, try this one
- If both fail, Piston API is down

---

## Command 5: Restart Backend

### Where to Run
**Terminal 1 (Backend Terminal)**

### Step 1: Stop Backend
```
Press: Ctrl+C
```

### Step 2: Wait
```
Wait: 2 seconds
```

### Step 3: Start Backend
```bash
npm run dev
```

### What to Do
1. Look at Terminal 1 (where backend is running)
2. Press Ctrl+C to stop it
3. Wait 2 seconds
4. Type: `npm run dev`
5. Press Enter
6. Wait for "Server running on port 5000"

### Expected Output
```
Server running on port 5000
Health check: http://localhost:5000/health
```

### What It Means
- **"Server running on port 5000"**: Backend restarted successfully ✓
- **Errors**: Check backend code for issues ✗

---

## Command 6: Check Backend Logs

### Where to Run
**Terminal 1 (Backend Terminal)**

### What to Do
1. Look at Terminal 1 (where backend is running)
2. Try Python code in Playground
3. Watch Terminal 1 for messages

### What to Look For
```
Executing python code via Piston API
Trying endpoint: https://emkc.org/api/v2/piston/execute
Endpoint https://emkc.org/api/v2/piston/execute succeeded
```

or

```
Executing python code via Piston API
Trying endpoint: https://emkc.org/api/v2/piston/execute
Piston endpoint https://emkc.org/api/v2/piston/execute failed: getaddrinfo ENOTFOUND emkc.org
Trying endpoint: https://piston.rocks/api/v2/execute
Piston endpoint https://piston.rocks/api/v2/execute failed: getaddrinfo ENOTFOUND piston.rocks
All Piston endpoints failed
```

### What It Means
- **"succeeded"**: Piston API is working ✓
- **"failed"**: Piston API is not accessible ✗

---

## Command 7: Disable Firewall (Windows)

### Where to Run
**Windows Settings**

### Steps
1. Open Windows Settings
2. Search for "Firewall"
3. Click "Windows Defender Firewall"
4. Click "Turn Windows Defender Firewall on or off"
5. Click "Turn off" (for testing)
6. Try Python code in Playground
7. Turn firewall back on

---

## Command 8: Disable Firewall (Mac)

### Where to Run
**Mac System Settings**

### Steps
1. Open System Settings
2. Go to: Security & Privacy
3. Click "Firewall"
4. Click "Turn Off" (for testing)
5. Try Python code in Playground
6. Turn firewall back on

---

## Command 9: Disable Firewall (Linux)

### Where to Run
**Terminal 2 (New Terminal)**

### Command to Disable
```bash
sudo ufw disable
```

### Command to Enable
```bash
sudo ufw enable
```

### What to Do
1. Open Terminal 2
2. Copy the disable command
3. Paste it into terminal
4. Press Enter
5. Enter your password if prompted
6. Try Python code in Playground
7. Run the enable command to turn firewall back on

---

## Complete Testing Sequence

### Step 1: Check Internet (Terminal 2)
```bash
ping google.com
```
Press Ctrl+C to stop

### Step 2: Check Backend (Terminal 2)
```bash
curl http://localhost:5000/health
```

### Step 3: Check Piston API (Terminal 2)
```bash
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```

### Step 4: Check Backend Logs (Terminal 1)
- Look at Terminal 1 output
- Try Python code in Playground
- Watch for "Executing python code via Piston API"

### Step 5: Restart Backend (Terminal 1)
```
Ctrl+C
npm run dev
```

### Step 6: Try Python Code (Browser)
1. Go to Playground
2. Select Python
3. Code: `print("Hello")`
4. Click Run Code
5. Check if output shows

---

## Quick Reference: All Commands

| # | Command | Terminal | Purpose |
|---|---------|----------|---------|
| 1 | `ping google.com` | Terminal 2 | Test internet |
| 2 | `curl http://localhost:5000/health` | Terminal 2 | Test backend |
| 3 | `curl -X POST https://emkc.org/...` | Terminal 2 | Test Piston 1 |
| 4 | `curl -X POST https://piston.rocks/...` | Terminal 2 | Test Piston 2 |
| 5 | `Ctrl+C` then `npm run dev` | Terminal 1 | Restart backend |
| 6 | Look at output | Terminal 1 | Check logs |
| 7 | Settings > Firewall | Windows | Disable firewall |
| 8 | Settings > Security | Mac | Disable firewall |
| 9 | `sudo ufw disable` | Terminal 2 | Disable firewall |

---

## Troubleshooting: Which Command to Run

### If Python code shows error
→ Run Command 1 (ping)
→ Run Command 2 (backend health)
→ Run Command 3 (Piston API)
→ Check Command 6 (backend logs)

### If internet is not working
→ Run Command 1 (ping)
→ Check WiFi/Ethernet connection

### If backend is not running
→ Run Command 2 (backend health)
→ Run Command 5 (restart backend)

### If Piston API is not accessible
→ Run Command 3 (Piston endpoint 1)
→ Run Command 4 (Piston endpoint 2)
→ Check firewall (Command 7, 8, or 9)

### If firewall is blocking
→ Run Command 7, 8, or 9 (disable firewall)
→ Try Python code again

---

## Copy-Paste Ready Commands

### Test Internet
```bash
ping google.com
```

### Test Backend
```bash
curl http://localhost:5000/health
```

### Test Piston 1
```bash
curl -X POST https://emkc.org/api/v2/piston/execute -H "Content-Type: application/json" -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```

### Test Piston 2
```bash
curl -X POST https://piston.rocks/api/v2/execute -H "Content-Type: application/json" -d '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}'
```

### Restart Backend
```bash
npm run dev
```

### Disable Firewall (Linux)
```bash
sudo ufw disable
```

### Enable Firewall (Linux)
```bash
sudo ufw enable
```

---

**Last Updated**: March 16, 2026
**Status**: All commands ready to copy & paste
