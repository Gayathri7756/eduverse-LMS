# 🎯 Playground Judge0 API Setup - Complete Guide

## ✅ What I've Done

1. **Replaced Backend Code Executor** (`backend/src/routes/codeExecutor.js`)
   - Removed all local execution code (spawn, execSync)
   - Implemented proper Judge0 API integration
   - Added language ID mapping for all 16 languages
   - Added proper error handling for API key issues

2. **Updated package.json**
   - Added `node-fetch` dependency for API calls
   - Ran `npm install` to install the package

3. **Frontend Already Correct** (`frontend/src/pages/Playground.jsx`)
   - Already has language ID mapping
   - Already sends requests to `/api/code-executor/execute`
   - No changes needed

## ⚠️ What You MUST Do Now

### Step 1: Get Judge0 API Key (FREE)

1. Go to: https://rapidapi.com/judge0-official/api/judge0-ce
2. Click **"Subscribe to Test"** (it's FREE)
3. Sign up if you don't have an account
4. Copy your API key from the dashboard

### Step 2: Add API Key to .env

Edit `backend/.env` and replace:
```
RAPIDAPI_KEY=YOUR_RAPIDAPI_KEY_HERE
```

With your actual API key:
```
RAPIDAPI_KEY=your_actual_api_key_here
```

**Example:**
```
RAPIDAPI_KEY=abc123def456ghi789jkl012mno345pqr
```

### Step 3: Restart Backend

**IMPORTANT: Kill all Node processes first**

In PowerShell (as Administrator):
```powershell
Get-Process -Name node | Stop-Process -Force
Start-Sleep -Seconds 3
```

Then start the backend:
```powershell
cd backend
npm run start
```

Wait for this message:
```
Server running on port 5000
```

### Step 4: Start Frontend (if not already running)

In a new PowerShell window:
```powershell
cd frontend
npm run dev
```

Wait for:
```
VITE v... ready in ... ms
```

## 🧪 Test It

1. Open browser: http://localhost:5173
2. Go to **Playground**
3. Try Python:
   ```python
   print("Hello from Judge0")
   ```
4. Click **Run Code**
5. Should see output: `Hello from Judge0`

## ✅ Verify It's Working

### Check Backend Logs

When you run code, you should see in the backend terminal:
```
Judge0 execution completed: {
  language: 'python',
  status: 3,
  hasOutput: true,
  hasError: false
}
```

**Status codes:**
- 3 = Success ✅
- 4-9 = Error ❌

### Check Browser Network Tab

1. Open DevTools: **F12**
2. Go to **Network** tab
3. Run code
4. Look for request to: `http://localhost:5000/api/code-executor/execute`
5. Response should show:
   ```json
   {
     "success": true,
     "language": "python",
     "output": "Hello from Judge0",
     "error": "",
     "message": "Code executed successfully"
   }
   ```

## 🧪 Test All Languages

### Python
```python
print("Python works!")
```

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

### Rust
```rust
fn main() {
  println!("Rust works!");
}
```

### Ruby
```ruby
puts "Ruby works!"
```

### C
```c
#include <stdio.h>
int main() {
  printf("C works!\n");
  return 0;
}
```

### C#
```csharp
using System;
class Program {
  static void Main() {
    Console.WriteLine("C# works!");
  }
}
```

### Swift
```swift
print("Swift works!")
```

### Kotlin
```kotlin
fun main() {
  println("Kotlin works!")
}
```

### TypeScript
```typescript
console.log("TypeScript works!");
```

### R
```r
print("R works!")
```

### SQL
```sql
SELECT "SQL works!" AS message;
```

## 🔧 Troubleshooting

### Error: "Judge0 API key not configured"
- **Solution**: Add `RAPIDAPI_KEY` to `backend/.env`
- Restart backend after adding key

### Error: "Invalid Judge0 API key"
- **Solution**: Check your API key is correct
- Go to https://rapidapi.com/judge0-official/api/judge0-ce
- Copy the key again
- Update `backend/.env`
- Restart backend

### Error: "Rate limit exceeded"
- **Solution**: Free tier has 100 requests/day limit
- Wait a bit and try again
- Or upgrade to paid plan

### Error: "Cannot connect to code execution service"
- **Solution**: Backend is not running
- Make sure backend is running on port 5000
- Check terminal for errors

### Code runs but shows old error
- **Solution**: Node.js module caching
- Kill all node processes: `Get-Process -Name node | Stop-Process -Force`
- Wait 3 seconds
- Restart backend: `npm run start`

## 📋 Checklist

- [ ] Got Judge0 API key from RapidAPI
- [ ] Added API key to `backend/.env`
- [ ] Killed all Node processes
- [ ] Restarted backend with `npm run start`
- [ ] Backend shows "Server running on port 5000"
- [ ] Frontend running on port 5173
- [ ] Tested Python code - works ✅
- [ ] Tested JavaScript code - works ✅
- [ ] Tested at least 3 other languages - work ✅

## 🎉 Success!

Once all tests pass, your Playground supports all 16 languages via Judge0 API!

**Supported Languages:**
- ✅ JavaScript
- ✅ Python
- ✅ Java
- ✅ C++
- ✅ C
- ✅ C#
- ✅ Go
- ✅ Rust
- ✅ Ruby
- ✅ PHP
- ✅ Swift
- ✅ Kotlin
- ✅ TypeScript
- ✅ R
- ✅ Bash
- ✅ SQL

## 📞 Need Help?

If something doesn't work:
1. Check backend logs for errors
2. Check browser DevTools Network tab
3. Verify API key is correct
4. Restart backend completely
5. Try a simple test (Python: `print("test")`)
