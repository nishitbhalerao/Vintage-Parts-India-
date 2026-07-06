# Deploy Backend Separately to Vercel

Your backend needs to be on a **separate Vercel project** from the frontend.

## Current Status
- Frontend: vintage-parts-india.vercel.app ✅
- Backend: Needs separate deployment

## Solution: Deploy Backend to Railway (Simpler Alternative)

Since Vercel's serverless setup is complex for full Express apps, let's use **Railway.app** instead - it's much simpler:

1. Go to: https://railway.app
2. Sign up with GitHub
3. Create new project
4. Connect your GitHub repo
5. Select the `server` directory as root
6. Add environment variables:
   - `MONGODB_URI`: Your connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: production
7. Deploy

Railway will automatically detect it's a Node.js app and deploy it!

## Alternative: Deploy Backend to Render.com

Even simpler:

1. Go to: https://render.com
2. Sign up
3. Create new Web Service
4. Connect GitHub repo
5. Settings:
   - Build command: `npm install --prefix server && npm install --prefix server`
   - Start command: `node server/server.js`
6. Add environment variables
7. Deploy

Both are FREE and much easier than Vercel for backend!

Which would you prefer?
- Railway (recommended)
- Render
- Continue with Vercel
