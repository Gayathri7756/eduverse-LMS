# 🎨 Visual Guide - Judge0 API Setup

## 🏗️ Architecture Diagram

### BEFORE (Broken)
```
┌─────────────────────────────────────────────────────────────┐
│                    USER'S COMPUTER                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │  Frontend    │         │   Backend    │                 │
│  │  (Port 5173) │────────▶│ (Port 5000)  │                 │
│  └──────────────┘         └──────────────┘                 │
│                                  │                          │
│                                  ▼                          │
│                           ❌ spawn('python')                │
│                           ❌ spawn('java')                  │
│                           ❌ spawn('g++')                   │
│                                  │                          │
│                                  ▼                          │
│                           ❌ ERROR                          │
│                           "Command not found"               │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Result: Only 6 languages work, rest fail ❌
```

### AFTER (Fixed)
```
┌─────────────────────────────────────────────────────────────┐
│                    USER'S COMPUTER                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │  Frontend    │         │   Backend    │                 │
│  │  (Port 5173) │────────▶│ (Port 5000)  │                 │
│  └──────────────┘         └──────────────┘                 │
│                                  │                          │
│                                  ▼                          │
│                        ✅ Judge0 API Call                   │
│                        (RapidAPI)                           │
│                                  │                          │
│                                  ▼                          │
│                    ┌──────────────────────┐                 │
│                    │   INTERNET / CLOUD   │                 │
│                    │                      │                 │
│                    │  Judge0 Servers      │                 │
│                    │  - Python            │                 │
│                    │  - Java              │                 │
│                    │  - C++               │                 │
│                    │  - All 16 Languages  │                 │
│                    │                      │                 │
│                    └──────────────────────┘                 │
│                                  │                          │
│                                  ▼                          │
│                        ✅ Output/Error                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Result: All 16 languages work ✅
```

## 📋 Setup Flow

```
START
  │
  ├─▶ 1. Get API Key from RapidAPI
  │   └─▶ https://rapidapi.com/judge0-official/api/judge0-ce
  │       └─▶ Subscribe to Test (FREE)
  │           └─▶ Copy API Key
  │
  ├─▶ 2. Add API Key to .env
  │   └─▶ RAPIDAPI_KEY=your_key_here
  │
  ├─▶ 3. Kill Node Processes
  │   └─▶ Get-Process -Name node | Stop-Process -Force
  │
  ├─▶ 4. Start Backend
  │   └─▶ npm run start
  │       └─▶ Wait for "Server running on port 5000"
  │
  ├─▶ 5. Start Frontend
  │   └─▶ npm run dev
  │       └─▶ Wait for "VITE v... ready"
  │
  ├─▶ 6. Test in Browser
  │   └─▶ http://localhost:5173/playground
  │       └─▶ Try Python: print("Hello")
  │           └─▶ Click Run Code
  │               └─▶ See Output: Hello ✅
  │
  └─▶ SUCCESS! All 16 languages work!
```

## 🔄 Request/Response Cycle

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: User Writes Code in Playground                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Code Editor:                                               │
│  ┌──────────────────────────────────────┐                  │
│  │ print("Hello from Judge0")           │                  │
│  └──────────────────────────────────────┘                  │
│                                                              │
│  Language: Python                                           │
│  Button: [▶️ Run Code]                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Frontend Sends Request to Backend                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  POST http://localhost:5000/api/code-executor/execute      │
│                                                              │
│  Body:                                                      │
│  {                                                          │
│    "language": "python",                                    │
│    "code": "print('Hello from Judge0')",                    │
│    "language_id": 71                                        │
│  }                                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Backend Forwards to Judge0 API                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  POST https://judge0-ce.p.rapidapi.com/submissions         │
│                                                              │
│  Headers:                                                   │
│  - X-RapidAPI-Key: your_api_key                            │
│  - X-RapidAPI-Host: judge0-ce.p.rapidapi.com               │
│  - Content-Type: application/json                          │
│                                                              │
│  Body:                                                      │
│  {                                                          │
│    "source_code": "print('Hello from Judge0')",             │
│    "language_id": 71,                                       │
│    "stdin": ""                                              │
│  }                                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Judge0 Executes Code in Cloud                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Judge0 Server (Cloud):                                     │
│  ┌──────────────────────────────────────┐                  │
│  │ $ python -c "print('Hello from...')" │                  │
│  │ Hello from Judge0                    │                  │
│  └──────────────────────────────────────┘                  │
│                                                              │
│  Status: 3 (Accepted)                                       │
│  Stdout: "Hello from Judge0"                                │
│  Stderr: ""                                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: Backend Receives Response from Judge0              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Response from Judge0:                                      │
│  {                                                          │
│    "stdout": "Hello from Judge0",                           │
│    "stderr": "",                                            │
│    "status": { "id": 3 }                                    │
│  }                                                          │
│                                                              │
│  Backend processes and sends to frontend:                   │
│  {                                                          │
│    "success": true,                                         │
│    "language": "python",                                    │
│    "output": "Hello from Judge0",                           │
│    "error": "",                                             │
│    "message": "Code executed successfully"                  │
│  }                                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 6: Frontend Displays Output                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Output Terminal:                                           │
│  ┌──────────────────────────────────────┐                  │
│  │ ✅ Output:                           │                  │
│  │ Hello from Judge0                    │                  │
│  └──────────────────────────────────────┘                  │
│                                                              │
│  User sees: SUCCESS! ✅                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Language Support Matrix

```
┌──────────────┬────────────┬────────────┐
│ Language     │ Before     │ After      │
├──────────────┼────────────┼────────────┤
│ JavaScript   │ ✅ Works   │ ✅ Works   │
│ Python       │ ✅ Works   │ ✅ Works   │
│ Java         │ ❌ Fails   │ ✅ Works   │
│ C++          │ ❌ Fails   │ ✅ Works   │
│ C            │ ❌ Fails   │ ✅ Works   │
│ C#           │ ❌ Fails   │ ✅ Works   │
│ Go           │ ✅ Works   │ ✅ Works   │
│ Rust         │ ❌ Fails   │ ✅ Works   │
│ Ruby         │ ✅ Works   │ ✅ Works   │
│ PHP          │ ✅ Works   │ ✅ Works   │
│ Swift        │ ❌ Fails   │ ✅ Works   │
│ Kotlin       │ ❌ Fails   │ ✅ Works   │
│ TypeScript   │ ❌ Fails   │ ✅ Works   │
│ R            │ ❌ Fails   │ ✅ Works   │
│ Bash         │ ✅ Works   │ ✅ Works   │
│ SQL          │ ❌ Fails   │ ✅ Works   │
├──────────────┼────────────┼────────────┤
│ TOTAL        │ 6/16 (37%) │ 16/16 (100%)│
└──────────────┴────────────┴────────────┘
```

## 🔑 API Key Setup Visual

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Go to RapidAPI                                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Browser: https://rapidapi.com/judge0-official/api/judge0-ce
│                                                              │
│  ┌──────────────────────────────────────┐                  │
│  │ Judge0 Code Execution API            │                  │
│  │                                      │                  │
│  │ [Subscribe to Test] ◀─ Click here    │                  │
│  │ (FREE)                               │                  │
│  └──────────────────────────────────────┘                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Copy Your API Key                                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Dashboard:                                                 │
│  ┌──────────────────────────────────────┐                  │
│  │ X-RapidAPI-Key:                      │                  │
│  │ abc123def456ghi789jkl012mno345pqr   │ ◀─ Copy this     │
│  └──────────────────────────────────────┘                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Add to backend/.env                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  File: backend/.env                                         │
│  ┌──────────────────────────────────────┐                  │
│  │ PORT=5000                            │                  │
│  │ FIREBASE_PROJECT_ID=...              │                  │
│  │ RAPIDAPI_KEY=abc123def456ghi789...   │ ◀─ Paste here   │
│  └──────────────────────────────────────┘                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Restart Backend                                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PowerShell:                                                │
│  $ Get-Process -Name node | Stop-Process -Force             │
│  $ Start-Sleep -Seconds 3                                   │
│  $ cd backend                                               │
│  $ npm run start                                            │
│                                                              │
│  Output:                                                    │
│  Server running on port 5000 ✅                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Test in Playground                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Browser: http://localhost:5173/playground                 │
│                                                              │
│  Code: print("Hello")                                       │
│  Language: Python                                           │
│  Button: [▶️ Run Code]                                      │
│                                                              │
│  Output: Hello ✅                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## ✅ Success Indicators

```
✅ Backend Logs Show:
   Judge0 execution completed: {
     language: 'python',
     status: 3,
     hasOutput: true,
     hasError: false
   }

✅ Browser DevTools Show:
   Request: POST /api/code-executor/execute
   Response: {
     "success": true,
     "output": "Hello",
     "error": ""
   }

✅ Playground Shows:
   ✅ Output:
   Hello

✅ All 16 Languages Work:
   Python ✅
   Java ✅
   C++ ✅
   ... and 13 more ✅
```

## 🎉 You're Done!

Your Playground now supports all 16 languages via Judge0 API!
