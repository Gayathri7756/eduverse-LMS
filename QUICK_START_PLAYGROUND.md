# Quick Start: Multi-Language Playground

## TL;DR - Get It Working in 5 Minutes

### 1. Get API Key (2 minutes)
- Go to: https://rapidapi.com/judge0-official/api/judge0-ce
- Sign up (free)
- Click "Subscribe to Test"
- Copy your API key

### 2. Add to .env (1 minute)
Edit `backend/.env`:
```
JUDGE0_API_KEY=paste_your_key_here
```

### 3. Restart Backend (1 minute)
```
npm run dev
```
(in backend folder)

### 4. Test (1 minute)
Go to: http://localhost:5173/playground

Try Python:
```python
print("Hello World")
```

Done! ✅

## All 16 Languages Work

JavaScript, Python, Java, C++, C, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, TypeScript, R, Bash, SQL

## Troubleshooting

**"Code execution service not configured"**
→ Add JUDGE0_API_KEY to .env and restart

**"API key is invalid"**
→ Get a new key from RapidAPI

**"Cannot connect"**
→ Make sure backend is running on port 5000

**"Only JavaScript works"**
→ Check that API key is in .env and backend restarted

## Free Tier

- 100 requests/day
- 20 requests/minute
- Perfect for testing!

## Need More Help?

See: `JUDGE0_SETUP_GUIDE.md` for detailed instructions
