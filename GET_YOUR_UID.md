# Get Your User ID to Complete Certificate Test

## Quick Steps

1. **Open this file in your browser:**
   - Open `get-user-id.html` in your browser
   - Or go to: `file:///C:/Users/admin/Desktop/full-stack Learning Management System (LMS)/get-user-id.html`

2. **Click "Get My User ID" button**

3. **Copy your UID** (it will look like: `abc123xyz...`)

4. **Share the UID with me** and I'll:
   - Complete a course for you
   - Generate a certificate
   - You'll see it in My Learning

---

## Alternative: Get UID from Browser Console

If the HTML file doesn't work:

1. Go to http://localhost:5173 (your app)
2. Open DevTools (F12)
3. Go to **Console** tab
4. Paste this code:
```javascript
const token = Object.keys(localStorage)
  .find(key => localStorage[key].includes('eyJ'))
  ?.split('_')[1] || 
  localStorage.getItem('firebase_token');

if (token) {
  const parts = token.split('.');
  const decoded = JSON.parse(atob(parts[1]));
  console.log('Your UID:', decoded.uid || decoded.sub);
} else {
  console.log('No token found - make sure you are logged in');
}
```
5. Your UID will be printed in the console

---

## Once You Have Your UID

Share it with me and I'll complete a course and generate your certificate!
