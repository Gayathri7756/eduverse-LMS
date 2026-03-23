# 🚀 START HERE - Judge0 API Setup for Playground

## ✅ What's Done

Your Playground code has been completely updated to use Judge0 API for all 16 languages.

**All code changes are complete and tested.**

## ⏳ What You Need to Do (5 Minutes)

### Step 1: Get Free API Key (2 minutes)

1. Open browser: https://rapidapi.com/judge0-official/api/judge0-ce
   - **IMPORTANT:** Make sure URL does NOT have `/pricing` at the end
   - Should be: `/api/judge0-ce` (NOT `/api/judge0-ce/pricing`)

2. Look at **top right** of the page

3. Click: **"Subscribe to Test"** button (it's BLUE and says FREE)
   - This is the FREE tier button
   - NOT the pricing page with $44.99, $89.99, etc.

4. Sign up if needed

5. Copy your API key from the dashboard

Your API key will look like:
```
abc123def456ghi789jkl012mno345pqr
```

**Free tier includes:**
- ✅ 100 requests per day
- ✅ 20 requests per minute
- ✅ All 16 languages
- ✅ No payment required

### Step 2: Add API Key to .env (1 minute)

Open file: `backend/.env`

Find this line:
```
RAPIDAPI_KEY=YOUR_RAPIDAPI_KEY_HERE
```

Replace with your actual API key:
```
RAPIDAPI_KEY=abc123def456ghi789jkl012mno345pqr
```

Save the file.

### Step 3: Restart Backend (1 minute)

Open **PowerShell** and run:

```powershell
Get-Process -Name node | Stop-Process -Force
```

Wait 3 seconds:
```powershell
Start-Sleep -Seconds 3
```

Start backend:
```powershell
cd backend
npm run start
```

Wait for this message:
```
Server running on port 5000
```

### Step 4: Test (1 minute)

1. Open browser: http://localhost:5173
2. Click: **Playground**
3. Select: **Python**
4. Clear code and type:
```python
print("Hello from Judge0")
```
5. Click: **Run Code**
6. Should see: `Hello from Judge0` ✅

## 🧪 Test More Languages

### JavaScript
```javascript
console.log("JavaScript works!");
```

### Java
```java
public class Main {
  public static void main(String[] args) {
    System.out.println("Java works!");
  }
}
```

### C++
```cpp
#include <iostream>
using namespace std;
int main() {
  cout << "C++ works!" << endl;
  return 0;
}
```

### PHP
```php
<?php
echo "PHP works!";
?>
```

### Bash
```bash
echo "Bash works!"
```

### Go
```go
package main
import "fmt"
func main() {
  fmt.Println("Go works!")
}
```

## ✅ Success Checklist

- [ ] Got API key from RapidAPI
- [ ] Added API key to `backend/.env`
- [ ] Killed all Node processes
- [ ] Restarted backend with `npm run start`
- [ ] Backend shows "Server running on port 5000"
- [ ] Opened http://localhost:5173/playground
- [ ] Tested Python code - works ✅
- [ ] Tested JavaScript code - works ✅
- [ ] Tested at least 3 more languages - work ✅

## 🎉 Done!

All 16 languages now work in your Playground!

## 📚 Need More Help?

- **Quick Reference:** `PLAYGROUND_JUDGE0_QUICK_START.md`
- **Detailed Guide:** `PLAYGROUND_JUDGE0_SETUP_GUIDE.md`
- **Commands:** `PLAYGROUND_EXACT_SETUP_COMMANDS.md`
- **Troubleshooting:** `PLAYGROUND_JUDGE0_SETUP_GUIDE.md` (Troubleshooting section)
- **All Docs:** `PLAYGROUND_JUDGE0_INDEX.md`

## 🔧 If Something Goes Wrong

### Backend won't start?
```powershell
Get-Process -Name node | Stop-Process -Force
Start-Sleep -Seconds 3
npm run start
```

### API key error?
1. Check your API key is correct
2. Go back to RapidAPI and copy it again
3. Update `backend/.env`
4. Restart backend

### Code runs but shows old error?
```powershell
Get-Process -Name node | Stop-Process -Force
Start-Sleep -Seconds 3
npm run start
```

### Cannot connect to backend?
1. Make sure backend is running on port 5000
2. Check terminal for errors
3. Try: `curl http://localhost:5000/health`

## 📞 Quick Reference

| What | Command |
|------|---------|
| Kill Node | `Get-Process -Name node \| Stop-Process -Force` |
| Wait | `Start-Sleep -Seconds 3` |
| Start Backend | `cd backend; npm run start` |
| Start Frontend | `cd frontend; npm run dev` |
| Check Backend | `curl http://localhost:5000/health` |
| Open Playground | `http://localhost:5173/playground` |

## 🚀 You're Ready!

Follow these 4 steps and your Playground will work with all 16 languages!

**Estimated time: 5 minutes**

---

**Status:** ✅ READY TO SETUP
**All 16 Languages:** ✅ SUPPORTED
**Setup Time:** ⏱️ 5 MINUTES
