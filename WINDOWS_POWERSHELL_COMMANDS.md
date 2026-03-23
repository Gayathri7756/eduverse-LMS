# Windows PowerShell - Correct Commands 🪟

## Important: Use PowerShell Syntax, Not Linux curl

On Windows PowerShell, `curl` is an alias for `Invoke-WebRequest`, which has different syntax than Linux curl.

---

## Command 1: Test Piston API (Correct PowerShell Syntax)

### Where to Run
**PowerShell Terminal**

### Command (Copy & Paste)
```powershell
$body = @{
    language = "python"
    version = "*"
    files = @(
        @{
            name = "main.py"
            content = "print('test')"
        }
    )
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://emkc.org/api/v2/piston/execute" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body `
  -UseBasicParsing
```

### What to Do
1. Open PowerShell
2. Copy the entire command above (all lines)
3. Paste it into PowerShell
4. Press Enter
5. Wait for response

### Expected Output (Success)
```
StatusCode        : 200
StatusDescription : OK
Content           : {"language":"python","version":"3.10.0","run":{"stdout":"test\n","stderr":"","code":0,"signal":null}}
```

### Expected Output (Failure)
```
Invoke-WebRequest : The remote server returned an error: (503) Service Unavailable.
```

---

## Command 2: Test Piston API (Endpoint 2)

### Where to Run
**PowerShell Terminal**

### Command (Copy & Paste)
```powershell
$body = @{
    language = "python"
    version = "*"
    files = @(
        @{
            name = "main.py"
            content = "print('test')"
        }
    )
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://piston.rocks/api/v2/execute" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body `
  -UseBasicParsing
```

### What to Do
1. Open PowerShell
2. Copy the entire command above (all lines)
3. Paste it into PowerShell
4. Press Enter
5. Wait for response

---

## Command 3: Simple Test (Easier)

### Where to Run
**PowerShell Terminal**

### Command (Copy & Paste)
```powershell
Invoke-WebRequest -Uri "https://emkc.org/api/v2/piston/execute" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}' `
  -UseBasicParsing
```

### What to Do
1. Open PowerShell
2. Copy the command above
3. Paste it into PowerShell
4. Press Enter
5. Wait for response

---

## What Your Results Mean

### ✅ Internet is Working
```
Ping statistics for 142.251.43.238:
Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
```
**Result**: Internet connection is good ✓

### ✅ Backend is Running
```
StatusCode        : 200
StatusDescription : OK
Content           : {"status":"OK","message":"Backend is running","firebaseEnabled":false}
```
**Result**: Backend is running on port 5000 ✓

### ❓ Next: Test Piston API
Now run one of the commands above to test if Piston API is accessible.

---

## If Piston API Test Fails

### Error: "The remote server returned an error: (503) Service Unavailable"
**Meaning**: Piston API is down
**Solution**: Wait 5-10 minutes and try again

### Error: "The remote server returned an error: (403) Forbidden"
**Meaning**: Firewall is blocking
**Solution**: Disable firewall temporarily

### Error: "The remote server returned an error: (500) Internal Server Error"
**Meaning**: Piston API has an error
**Solution**: Wait and try again

### Error: "No such host is known"
**Meaning**: DNS issue
**Solution**: Restart router or try different DNS

---

## Next Steps

1. **Run Command 3** (Simple Test) in PowerShell
2. **Check the response**:
   - If you see JSON with "run" object → Piston is working ✓
   - If you see error → Piston is down or firewall blocking ✗
3. **If Piston is working**:
   - Try Python code in Playground
   - It should work now
4. **If Piston is not working**:
   - Disable firewall temporarily
   - Try again
   - Or wait for Piston API to come back online

---

## Summary of Your Status

| Check | Result | Status |
|-------|--------|--------|
| Internet | ✅ Working | Good |
| Backend | ✅ Running | Good |
| Piston API | ❓ Unknown | Test now |

---

## PowerShell vs Linux curl

### Linux curl
```bash
curl -X POST https://emkc.org/api/v2/piston/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python",...}'
```

### Windows PowerShell
```powershell
Invoke-WebRequest -Uri "https://emkc.org/api/v2/piston/execute" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"language":"python",...}' `
  -UseBasicParsing
```

**Key Differences**:
- Use `Invoke-WebRequest` instead of `curl`
- Use `-Uri` instead of URL directly
- Use `-Method POST` instead of `-X POST`
- Use `-ContentType` instead of `-H`
- Use `-Body` instead of `-d`
- Use `-UseBasicParsing` to avoid security warnings
- Use backtick `` ` `` for line continuation

---

## Ready to Test?

Run this command in PowerShell:

```powershell
Invoke-WebRequest -Uri "https://emkc.org/api/v2/piston/execute" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"language":"python","version":"*","files":[{"name":"main.py","content":"print(\"test\")"}]}' `
  -UseBasicParsing
```

Then let me know what you see!

---

**Status**: Windows PowerShell commands ready
**Last Updated**: March 16, 2026
