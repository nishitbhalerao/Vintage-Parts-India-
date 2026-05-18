# 🔧 Fix: API Connection Error on Vercel

## Problem
Your Vercel frontend is showing network errors:
- `Failed to fetch featured parts: AxiosError: Network Error`
- `Failed to load resources: localhost:5000`

## Root Cause
The frontend is trying to connect to `localhost:5000`, but:
1. Backend server is not running
2. Vercel (cloud) can't access your local machine
3. No API URL is configured in Vercel environment variables

## Solution

### For Immediate Testing (Local)

**Step 1: Start Backend Server**
```bash
cd server
npm install
npm run dev
```

**Step 2: Start Frontend Locally**
```bash
cd client
npm run dev
```

**Step 3: Test**
- Visit: http://localhost:3000
- Should work without errors

---

### For Production (Vercel)

You need to deploy your backend to a cloud platform.

**Choose one:**
1. **Railway** (Easiest) - https://railway.app
2. **Heroku** - https://heroku.com
3. **Render** - https://render.com

**Then:**
1. Deploy backend to chosen platform
2. Get backend URL (e.g., `https://your-api.railway.app`)
3. Set environment variable in Vercel:
   ```
   VITE_API_URL=https://your-api.railway.app/api
   ```
4. Redeploy frontend:
   ```bash
   vercel --prod
   ```

---

## Quick Steps

### To Test Locally Right Now:

```bash
# Terminal 1: Start Backend
cd server
npm run dev

# Terminal 2: Start Frontend
cd client
npm run dev

# Then visit: http://localhost:3000
```

### To Deploy Backend (Choose One):

**Railway (Recommended):**
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project
4. Connect your GitHub repo
5. Select `server` folder
6. Add environment variables
7. Deploy

**Then update Vercel:**
```bash
vercel env add VITE_API_URL
# Enter: https://your-railway-app.railway.app/api
# Select: Production
vercel --prod
```

---

## Files Created

- `.env.local` - Local environment configuration
- `BACKEND-DEPLOYMENT-OPTIONS.md` - Detailed deployment guide
- `API-CONNECTION-ERROR-FIX.md` - This file

---

## Next Steps

1. **Choose**: Local testing or cloud deployment?
2. **If local**: Start backend server (see above)
3. **If cloud**: Deploy to Railway/Heroku/Render
4. **Then**: Update Vercel environment variables
5. **Finally**: Redeploy and test

---

**Status**: ⏳ Waiting for backend deployment  
**Frontend**: ✅ Live on Vercel  
**Backend**: ⏳ Needs deployment
