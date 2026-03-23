# Quick Test: Playground Multi-Language Support

## Prerequisites
- Backend running on port 5000: `npm run dev` (in backend folder)
- Frontend running on port 5173: `npm run dev` (in frontend folder)
- Judge0 API key added to `backend/.env`

## Test Steps

### 1. Test JavaScript (Browser Execution)
```
Language: JavaScript
Code: console.log("Hello from JavaScript")
Expected: ✅ Output: Hello from JavaScript
```

### 2. Test Python
```
Language: Python
Code: print("Hello from Python")
Expected: ✅ Output: Hello from Python
```

### 3. Test Java
```
Language: Java
Code: 
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello from Java");
  }
}
Expected: ✅ Output: Hello from Java
```

### 4. Test C++
```
Language: C++
Code:
#include <iostream>
using namespace std;
int main() {
  cout << "Hello from C++" << endl;
  return 0;
}
Expected: ✅ Output: Hello from C++
```

### 5. Test Ruby
```
Language: Ruby
Code: puts "Hello from Ruby"
Expected: ✅ Output: Hello from Ruby
```

### 6. Test Go
```
Language: Go
Code:
package main
import "fmt"
func main() {
  fmt.Println("Hello from Go")
}
Expected: ✅ Output: Hello from Go
```

## Checking Backend Logs

While testing, check the backend terminal for messages like:
```
Executing python code via Judge0 API
Judge0 execution completed with status: 3
```

This confirms the API is working.

## Common Issues

### Issue: "Code execution service not configured"
**Solution**: Add `JUDGE0_API_KEY` to `backend/.env` and restart backend

### Issue: "API key is invalid or expired"
**Solution**: Get a new API key from RapidAPI (see JUDGE0_SETUP_GUIDE.md)

### Issue: "Cannot connect to code execution service"
**Solution**: Make sure backend is running on port 5000

### Issue: Only JavaScript works
**Solution**: Check that the API key is valid and backend is running

## Success Indicators

✅ All 16 languages show in the language selector  
✅ JavaScript code runs immediately  
✅ Other languages show output after a few seconds  
✅ Backend logs show "Judge0 execution completed"  
✅ No error messages in browser console (F12)  

## Next Steps

Once all tests pass:
1. Try more complex code examples
2. Test error handling (e.g., syntax errors)
3. Test with different input/output scenarios
4. Share the Playground with others!

---

**Need help?** Check JUDGE0_SETUP_GUIDE.md for detailed setup instructions.
