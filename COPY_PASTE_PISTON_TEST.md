# Copy & Paste: Test Piston API 📋

## Your Status
✅ Internet: Working
✅ Backend: Running
❓ Piston API: Unknown (TEST NOW)

---

## Copy This Entire Command

```powershell
Invoke-WebRequest -Uri "https://emkc.org/api/v2/piston/execute" -Method POST -ContentType "application/json" -Body '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}' -UseBasicParsing
```

---

## How to Run It

### Step 1: Open PowerShell
- Press: `Windows Key + R`
- Type: `powershell`
- Press: `Enter`

### Step 2: Copy the Command
- Select the command above
- Press: `Ctrl+C`

### Step 3: Paste in PowerShell
- Click in PowerShell window
- Press: `Ctrl+V`

### Step 4: Run It
- Press: `Enter`
- Wait for response

---

## What You Should See

### Success (Piston is Working)
```
StatusCode        : 200
StatusDescription : OK
Content           : {"language":"python","version":"3.10.0","run":{"stdout":"test\n","stderr":"","code":0,"signal":null}}
RawContent        : HTTP/1.1 200 OK
...
```

### Failure (Piston is Down)
```
Invoke-WebRequest : The remote server returned an error: (503) Service Unavailable.
At line:1 char:1
+ Invoke-WebRequest -Uri "https://emkc.org/api/v2/piston/execute" ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [], WebException
    + FullyQualifiedErrorId : WebCmdletWebResponseException
```

### Firewall Blocking
```
Invoke-WebRequest : The remote server returned an error: (403) Forbidden.
```

### Network Error
```
Invoke-WebRequest : The remote name could not be resolved: 'emkc.org'
```

---

## What Each Result Means

| Result | Meaning | Next Step |
|--------|---------|-----------|
| Status 200 + JSON | Piston is working ✓ | Try Python code in Playground |
| 503 Service Unavailable | Piston is down ✗ | Wait 5-10 minutes |
| 403 Forbidden | Firewall blocking ✗ | Disable firewall |
| Could not resolve host | DNS issue ✗ | Restart router |

---

## If Piston is Working (Status 200)

1. Go to Playground: http://localhost:5173/playground
2. Select Python
3. Code: `print("Hello from Python")`
4. Click "Run Code"
5. Should show output now

---

## If Piston is Down (503)

1. Wait 5-10 minutes
2. Run the command again
3. Or check: https://status.emkc.org

---

## If Firewall is Blocking (403)

### Windows Firewall
1. Open Windows Settings
2. Search: "Firewall"
3. Click: "Windows Defender Firewall"
4. Click: "Turn Windows Defender Firewall on or off"
5. Click: "Turn off" (for testing)
6. Run the command again
7. If it works, turn firewall back on

---

## Ready?

### Copy This:
```powershell
Invoke-WebRequest -Uri "https://emkc.org/api/v2/piston/execute" -Method POST -ContentType "application/json" -Body '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}' -UseBasicParsing
```

### Paste in PowerShell and Press Enter

### Tell Me What You See!

---

**Status**: Ready to test
**Last Updated**: March 16, 2026
