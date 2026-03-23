# 🎯 Exact Commands to Run - Copy & Paste

## Step 1: Get API Key (Do This in Browser)

1. Open: https://rapidapi.com/judge0-official/api/judge0-ce
2. Click: "Subscribe to Test" (FREE)
3. Sign up if needed
4. Copy your API key from the dashboard

**Your API key will look like:**
```
abc123def456ghi789jkl012mno345pqr
```

## Step 2: Edit .env File

Open `backend/.env` in your editor and change:

**FROM:**
```
RAPIDAPI_KEY=YOUR_RAPIDAPI_KEY_HERE
```

**TO:**
```
RAPIDAPI_KEY=abc123def456ghi789jkl012mno345pqr
```

(Replace with your actual API key)

## Step 3: Kill All Node Processes

Open **PowerShell** and run:

```powershell
Get-Process -Name node | Stop-Process -Force
```

Wait 3 seconds:
```powershell
Start-Sleep -Seconds 3
```

## Step 4: Start Backend

In PowerShell:

```powershell
cd backend
npm run start
```

**Wait for this message:**
```
Server running on port 5000
```

## Step 5: Start Frontend (New PowerShell Window)

Open a **NEW PowerShell window** and run:

```powershell
cd frontend
npm run dev
```

**Wait for this message:**
```
VITE v... ready in ... ms
```

## Step 6: Test in Browser

1. Open: http://localhost:5173
2. Click: **Playground**
3. Select: **Python**
4. Clear the code and type:
```python
print("Hello from Judge0")
```
5. Click: **Run Code**
6. Should see output: `Hello from Judge0`

## Step 7: Test More Languages

### Test JavaScript
```javascript
console.log("JavaScript works!");
```

### Test Java
```java
public class Main {
  public static void main(String[] args) {
    System.out.println("Java works!");
  }
}
```

### Test C++
```cpp
#include <iostream>
using namespace std;
int main() {
  cout << "C++ works!" << endl;
  return 0;
}
```

### Test PHP
```php
<?php
echo "PHP works!";
?>
```

### Test Bash
```bash
echo "Bash works!"
```

### Test Go
```go
package main
import "fmt"
func main() {
  fmt.Println("Go works!")
}
```

## ✅ Verification Commands

### Check Backend is Running
```powershell
curl http://localhost:5000/health
```

Should show:
```json
{"status":"OK","message":"Backend is running","firebaseEnabled":false}
```

### Check Frontend is Running
Open browser: http://localhost:5173

Should show the EduVerse LMS homepage.

## 🔧 If Something Goes Wrong

### Backend won't start?
1. Kill all node processes: `Get-Process -Name node | Stop-Process -Force`
2. Wait 3 seconds
3. Try again: `npm run start`

### API key error?
1. Check your API key is correct
2. Go back to RapidAPI and copy it again
3. Update `backend/.env`
4. Kill backend: `Get-Process -Name node | Stop-Process -Force`
5. Restart: `npm run start`

### Code runs but shows old error?
1. Kill all node processes: `Get-Process -Name node | Stop-Process -Force`
2. Wait 3 seconds
3. Restart backend: `npm run start`

### Cannot connect to backend?
1. Make sure backend is running on port 5000
2. Check terminal for errors
3. Try: `curl http://localhost:5000/health`

## 📋 Complete Checklist

- [ ] Got API key from RapidAPI
- [ ] Added API key to `backend/.env`
- [ ] Killed all node processes
- [ ] Started backend with `npm run start`
- [ ] Backend shows "Server running on port 5000"
- [ ] Started frontend with `npm run dev`
- [ ] Frontend shows "VITE v... ready"
- [ ] Opened http://localhost:5173 in browser
- [ ] Went to Playground
- [ ] Tested Python code - works ✅
- [ ] Tested JavaScript code - works ✅
- [ ] Tested at least 2 more languages - work ✅

## 🎉 Success!

Once all tests pass, your Playground supports all 16 languages!

## 📞 Quick Reference

| Command | Purpose |
|---------|---------|
| `Get-Process -Name node \| Stop-Process -Force` | Kill all Node processes |
| `Start-Sleep -Seconds 3` | Wait 3 seconds |
| `cd backend` | Go to backend folder |
| `npm run start` | Start backend |
| `cd frontend` | Go to frontend folder |
| `npm run dev` | Start frontend |
| `curl http://localhost:5000/health` | Check backend |
| `http://localhost:5173` | Open frontend |

## 🚀 You're Ready!

Follow these steps in order and your Playground will work with all 16 languages!
