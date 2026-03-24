# 🚀 Eduverse LMS Deployment Guide

Follow these steps to deploy your full-stack monorepo.

## 1. Backend (Render)
Render will use the `render.yaml` file in your root directory to set up the backend and a PostgreSQL database (if needed, though we use MySQL on Aiven).

**Environment Variables to add in Render Dashboard:**
| Variable | Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `mysql://...` | Your Aiven MySQL connection string |
| `JWT_ACCESS_SECRET` | `your_random_string` | Secret for Access Tokens |
| `JWT_REFRESH_SECRET` | `your_random_string` | Secret for Refresh Tokens |
| `FRONTEND_URL` | `https://your-app.vercel.app` | Your Vercel deployment URL |
| `NODE_ENV` | `production` | Set to production |
| `PORT` | `5000` | Backend port |

**Build & Start Commands (Already in render.yaml):**
- **Build:** `npm install && npx prisma generate && npm run build`
- **Start:** `npm start`

---

## 2. Frontend (Vercel)
Vercel will deploy the `/frontend` directory. 

**Vercel Dashboard Settings:**
- **Root Directory:** `frontend`
- **Framework Preset:** `Next.js`

**Environment Variables to add in Vercel Dashboard:**
| Variable | Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `https://lms-backend.onrender.com/api` | Your Render Backend URL |

---

## 3. Database (Aiven)
Ensure your MySQL instance is running and allows connections from Render's IP or all IPs (`0.0.0.0/0`).

---

### ✅ Checklist before pushing:
1. [x] `render.yaml` created in root.
2. [x] `frontend/next.config.js` created.
3. [x] `frontend/package.json` and configs consolidated.
4. [x] Backend scripts (`build`, `start`) updated in `backend/package.json`.
