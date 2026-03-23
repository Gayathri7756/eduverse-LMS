# 💻 Coding Playground - Complete Guide

## Overview

The Coding Playground allows students to write and execute code directly in the LMS. Supports JavaScript (browser) and Python (cloud).

---

## Features

### ✅ Monaco Editor
- VS Code-like editor
- Syntax highlighting
- Line numbers
- Auto-formatting
- Dark theme

### ✅ JavaScript Execution
- Runs in browser (instant)
- Captures console.log output
- Shows errors
- No server needed

### ✅ Python Execution
- Runs on Piston API
- Cloud-based execution
- Full Python support
- Real-time output

### ✅ Output Terminal
- Real-time output display
- Error highlighting (red)
- Success highlighting (green)
- Scrollable for long output

---

## How to Use

### Step 1: Navigate to Playground
```
Click "💻 Playground" in navbar
or go to http://localhost:5173/playground
```

### Step 2: Select Language
```
Click "JavaScript" or "Python" button
```

### Step 3: Write Code
```
Type your code in the editor
```

### Step 4: Run Code
```
Click "▶️ Run Code" button
```

### Step 5: View Output
```
See output in terminal on the right
```

---

## JavaScript Examples

### Hello World
```javascript
console.log("Hello, World!")
```

### Variables and Math
```javascript
let x = 10
let y = 20
console.log("Sum:", x + y)
console.log("Product:", x * y)
```

### Arrays
```javascript
let numbers = [1, 2, 3, 4, 5]
console.log("Array:", numbers)
console.log("Sum:", numbers.reduce((a, b) => a + b, 0))
```

### Functions
```javascript
function greet(name) {
  return `Hello, ${name}!`
}

console.log(greet("Alice"))
console.log(greet("Bob"))
```

### Objects
```javascript
let person = {
  name: "John",
  age: 25,
  city: "New York"
}

console.log("Name:", person.name)
console.log("Age:", person.age)
```

### Loops
```javascript
for (let i = 1; i <= 5; i++) {
  console.log(`Number: ${i}`)
}
```

---

## Python Examples

### Hello World
```python
print("Hello, World!")
```

### Variables and Math
```python
x = 10
y = 20
print("Sum:", x + y)
print("Product:", x * y)
```

### Lists
```python
numbers = [1, 2, 3, 4, 5]
print("List:", numbers)
print("Sum:", sum(numbers))
```

### Functions
```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
print(greet("Bob"))
```

### Dictionaries
```python
person = {
    "name": "John",
    "age": 25,
    "city": "New York"
}

print("Name:", person["name"])
print("Age:", person["age"])
```

### Loops
```python
for i in range(1, 6):
    print(f"Number: {i}")
```

---

## Features Explained

### Language Selector
- **JavaScript**: Runs in browser (instant)
- **Python**: Runs on Piston API (1-2 seconds)

### Code Editor
- Full Monaco Editor features
- Syntax highlighting
- Line numbers
- Auto-indentation
- Dark theme

### Run Code Button
- Executes code
- Shows loading state
- Captures output
- Displays errors

### Clear Button
- Resets code to template
- Clears output
- Clears errors

### Output Terminal
- Shows console output
- Shows errors in red
- Shows success in green
- Scrollable for long output

---

## Error Handling

### JavaScript Errors
```javascript
// This will show an error
console.log(undefined_variable)
```

Output:
```
❌ Error:
undefined_variable is not defined
```

### Python Errors
```python
# This will show an error
print(undefined_variable)
```

Output:
```
❌ Error:
name 'undefined_variable' is not defined
```

---

## Tips & Tricks

### 1. Use Console.log (JavaScript)
```javascript
console.log("Debug:", variable)
```

### 2. Use Print (Python)
```python
print("Debug:", variable)
```

### 3. Test Functions
```javascript
function add(a, b) {
  return a + b
}

console.log(add(5, 3))  // Output: 8
```

### 4. Use Loops for Repetition
```python
for i in range(5):
    print(f"Iteration {i}")
```

### 5. Work with Data Structures
```javascript
let data = [1, 2, 3, 4, 5]
console.log(data.map(x => x * 2))  // [2, 4, 6, 8, 10]
```

---

## Limitations

### JavaScript
- No file system access
- No external libraries (only built-in)
- Limited to browser capabilities
- No network requests (CORS restricted)

### Python
- Limited to standard library
- No external packages (pip)
- 5-10 second timeout
- No file system access

---

## Performance

- **JavaScript**: Instant (< 100ms)
- **Python**: 1-2 seconds (API call)
- **Output**: Real-time display

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## Troubleshooting

### Issue: Code doesn't run
```
Solution:
1. Check for syntax errors
2. Click "Run Code" again
3. Check browser console (F12)
```

### Issue: Python code is slow
```
Solution:
1. Python runs on cloud (1-2s normal)
2. Check internet connection
3. Try simpler code first
```

### Issue: Output not showing
```
Solution:
1. Make sure you have console.log (JS) or print (Python)
2. Check for errors in output terminal
3. Try running again
```

### Issue: Error message unclear
```
Solution:
1. Read error message carefully
2. Check syntax
3. Try simpler code first
```

---

## Use Cases

### Learning Programming
- Practice syntax
- Test algorithms
- Debug code
- Learn interactively

### Quick Testing
- Test code snippets
- Verify logic
- Check output
- Debug issues

### Teaching
- Show examples
- Demonstrate concepts
- Interactive learning
- Real-time feedback

---

## Keyboard Shortcuts

### Monaco Editor
- `Ctrl+S` - Save (not needed)
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo
- `Ctrl+/` - Toggle comment
- `Tab` - Indent
- `Shift+Tab` - Unindent

---

## API Details

### Piston API (Python)
```
POST https://emkc.org/api/v2/piston/execute

Request:
{
  "language": "python",
  "version": "*",
  "files": [
    {
      "name": "main.py",
      "content": "print('Hello')"
    }
  ]
}

Response:
{
  "run": {
    "stdout": "Hello\n",
    "stderr": "",
    "code": 0,
    "signal": null
  }
}
```

---

## Summary

The Coding Playground is a powerful tool for:
- ✅ Learning programming
- ✅ Testing code
- ✅ Debugging
- ✅ Interactive learning
- ✅ Quick prototyping

**Status: READY TO USE** 🚀

---

## Next Steps

1. Try JavaScript examples
2. Try Python examples
3. Write your own code
4. Test algorithms
5. Debug issues

Happy coding! 💻
