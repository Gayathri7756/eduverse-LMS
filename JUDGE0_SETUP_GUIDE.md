# Judge0 API Setup Guide - Multi-Language Code Execution

## Current Status
✅ Backend: Judge0 API integration is ready  
✅ Frontend: Playground supports all 16 languages  
❌ Missing: Valid Judge0 API Key in `.env` file

## What You Need to Do

### Step 1: Get a Free Judge0 API Key

1. Go to **RapidAPI**: https://rapidapi.com/judge0-official/api/judge0-ce
2. Click **"Sign Up"** (if you don't have an account)
3. Complete the signup process
4. Once logged in, you'll see the Judge0 CE API page
5. Click **"Subscribe to Test"** (the free tier)
6. You'll get a **free API key** with 100 requests/day

### Step 2: Add API Key to `.env`

1. Open `backend/.env`
2. Find the line: `JUDGE0_API_KEY=`
3. Replace it with your actual API key:
   ```
   JUDGE0_API_KEY=your_actual_api_key_here
   ```
4. Save the file

### Step 3: Restart Backend

1. Stop the backend (Ctrl+C in the terminal)
2. Run: `npm run dev` in the backend folder
3. You should see: `Server running on port 5000`

### Step 4: Test the Playground

1. Go to: http://localhost:5173/playground
2. Try different languages:
   - **Python**: `print("Hello")`
   - **Java**: Use the template
   - **C++**: Use the template
   - **JavaScript**: Works in browser (no API needed)

## Supported Languages (All 16)

✅ JavaScript (browser execution)  
✅ Python  
✅ Java  
✅ C++  
✅ C  
✅ C#  
✅ Go  
✅ Rust  
✅ Ruby  
✅ PHP  
✅ Swift  
✅ Kotlin  
✅ TypeScript  
✅ R  
✅ Bash  
✅ SQL  

## Troubleshooting

### Error: "API key is invalid or expired"
- Check that you copied the API key correctly
- Make sure there are no extra spaces
- Restart the backend after updating `.env`

### Error: "Code execution service not configured"
- The `JUDGE0_API_KEY` is missing from `.env`
- Add it and restart the backend

### Error: "API quota exceeded"
- You've used all 100 free requests for the day
- Wait until tomorrow or upgrade to a paid plan

### Only JavaScript Works
- Make sure the backend is running on port 5000
- Check browser console (F12) for errors
- Verify the API key is in `.env`

## Free Tier Limits

- **100 requests per day**
- **20 requests per minute**
- **Supports all 16 languages**

This is perfect for testing and development!

## Next Steps

Once you have the API key set up:
1. Test all languages in the Playground
2. Try running different code snippets
3. Check the output terminal for results

Enjoy coding in all languages! 🚀
