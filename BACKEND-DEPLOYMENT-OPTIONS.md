# 🚀 Backend Deployment Options

## Current Issue
Your Vercel frontend is trying to connect to `localhost:5000`, but:
1. Backend is not running locally
2. Vercel can't access localhost (it's a cloud platform)

## Solution: You Need to Deploy Backend

### Option 1: Deploy to Railway (Easiest) ⭐ RECOMMENDED

**Step 1: Create Railway Account**
1. Go to: https://railway.app
2. Sign up with GitHub
3. Create new project

**Step 2: Connect GitHub Repository**
1. Click "New Project"
2. Select "Deploy from GitHub"
3. Choose your repository: `Vintage-Parts-India-`
4. Select `server` folder as root directory

**Step 3: Set Environment Variables**
1. Go to Variables tab
2. Add:
   ```
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/vintagepartsIndia
   JWT_SECRET=vintagepartsIndia_jwt_secret_key_2024_secure
   NODE_ENV=production
   ```

**Step 4: Deploy**
- Railway auto-deploys
- Get your backend URL (e.g., `https://your-app.railway.app`)

**Step 5: Update Vercel**
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add: `VITE_API_URL=https://your-app.railway.app/api`
5. Redeploy

---

### Option 2: Deploy to Heroku

**Step 1: Create Heroku Account**
1. Go to: https://heroku.com
2. Sign up

**Step 2: Create New App**
1. Click "New" → "Create new app"
2. App name: `vintage-parts-india-api`
3. Region: Europe or US

**Step 3: Connect GitHub**
1. Deployment method: GitHub
2. Search for your repo
3. Connect

**Step 4: Set Environment Variables**
1. Settings → Config Vars
2. Add same variables as Railway

**Step 5: Deploy**
1. Manual deploy or enable auto-deploy
2. Get your backend URL

**Step 6: Update Vercel**
- Same as Railway (Step 5)

---

### Option 3: Deploy to Render

**Step 1: Create Render Account**
1. Go to: https://render.com
2. Sign up with GitHub

**Step 2: Create New Service**
1. Click "New +" → "Web Service"
2. Connect GitHub repository
3. Select `server` folder

**Step 3: Configure**
1. Name: `vintage-parts-india-api`
2. Environment: Node
3. Build command: `npm install`
4. Start command: `npm start`

**Step 4: Set Environment Variables**
- Add same variables as Railway

**Step 5: Deploy**
- Render auto-deploys
- Get your backend URL

**Step 6: Update Vercel**
- Same as Railway (Step 5)

---

### Option 4: Run Backend Locally (For Testing Only)

**If you want to test locally:**

1. **Start Backend Server**
   ```bash
   cd server
   npm install
   npm run dev
   ```
   - Runs on `http://localhost:5000`

2. **Update Frontend API URL**
   - Edit `client/src/services/api.js`
   - Change: `const API_URL = 'http://localhost:5000/api'`

3. **Run Frontend Locally**
   ```bash
   cd client
   npm run dev
   ```
   - Runs on `http://localhost:3000`

4. **Test**
   - Visit `http://localhost:3000`
   - Should work without errors

---

## Recommended Path

1. **Deploy Backend to Railway** (easiest, free tier available)
2. **Get Backend URL** (e.g., `https://vintage-parts-india-api.railway.app`)
3. **Set Vercel Environment Variable**
   ```
   VITE_API_URL=https://vintage-parts-india-api.railway.app/api
   ```
4. **Redeploy on Vercel**
   ```bash
   vercel --prod
   ```

---

## Important Notes

- **MongoDB**: You need MongoDB running (local or Atlas)
- **Environment Variables**: Must be set in both Railway/Heroku AND Vercel
- **CORS**: Backend should allow requests from your Vercel domain
- **API URL**: Must include `/api` at the end

---

## Quick Checklist

- [ ] Deploy backend to Railway/Heroku/Render
- [ ] Get backend URL
- [ ] Set `VITE_API_URL` in Vercel
- [ ] Redeploy frontend
- [ ] Test all features
- [ ] Verify no console errors

---

**Need help?** Choose one platform and I'll guide you through it step by step.
