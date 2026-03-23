# ⚡ Quick Start - Judge0 API Setup (5 Minutes)

## 🚀 Do This Now

### 1. Get Free API Key (2 min)
```
Go to: https://rapidapi.com/judge0-official/api/judge0-ce
Click: "Subscribe to Test" (FREE)
Copy: Your API Key
```

### 2. Add to .env (1 min)
Edit `backend/.env`:
```
RAPIDAPI_KEY=your_api_key_here
```

### 3. Restart Backend (1 min)
PowerShell:
```powershell
Get-Process -Name node | Stop-Process -Force
Start-Sleep -Seconds 3
cd backend
npm run start
```

Wait for: `Server running on port 5000`

### 4. Test (1 min)
1. Open: http://localhost:5173/playground
2. Select: Python
3. Code: `print("Hello")`
4. Click: Run Code
5. Should see: `Hello`

## ✅ Done!

All 16 languages now work via Judge0 API.

## 🔍 If It Doesn't Work

**Check 1:** Backend running?
```powershell
curl http://localhost:5000/health
```
Should show: `{"status":"OK"}`

**Check 2:** API key correct?
- Go back to RapidAPI
- Copy key again
- Update .env
- Restart backend

**Check 3:** Browser DevTools
- F12 → Network tab
- Run code
- Look for request to `/api/code-executor/execute`
- Check response for errors

## 📚 Full Guide
See: `PLAYGROUND_JUDGE0_SETUP_GUIDE.md`
