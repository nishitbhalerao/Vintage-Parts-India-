# 🚀 Deploy Backend to Railway

Complete step-by-step guide to deploy your Node.js backend to Railway.

---

## ✅ Prerequisites

- GitHub account (already have)
- Railway account (free)
- Your backend code pushed to GitHub (already done)

---

## 🎯 Step-by-Step Deployment

### Step 1: Create Railway Account

1. Go to: https://railway.app
2. Click "Start Free"
3. Sign up with GitHub
4. Authorize Railway to access your GitHub account
5. Click "Create New Project"

---

### Step 2: Create New Project on Railway

1. Click "Create New Project"
2. Select "Deploy from GitHub repo"
3. Search for: `Vintage-Parts-India-`
4. Click to select your repository
5. Click "Deploy"

---

### Step 3: Configure Project

1. Railway will ask: "Which directory contains your code?"
2. Enter: `server`
3. Click "Deploy"

Railway will now:
- Clone your repository
- Install dependencies
- Build your project
- Deploy to production

---

### Step 4: Set Environment Variables

Once deployment starts:

1. Go to your Railway project dashboard
2. Click on your service (should be named after your repo)
3. Click "Variables" tab
4. Add these environment variables:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vintagepartsIndia
JWT_SECRET=vintagepartsIndia_jwt_secret_key_2024_secure
NODE_ENV=production
```

**Important**: 
- For `MONGODB_URI`, use MongoDB Atlas (cloud) connection string
- Get it from: https://www.mongodb.com/cloud/atlas

---

### Step 5: Get Your Backend URL

1. In Railway dashboard, go to "Deployments"
2. Look for your deployment URL (e.g., `https://vintage-parts-india-api.railway.app`)
3. Copy this URL

---

### Step 6: Update Vercel with Backend URL

1. Go to: https://vercel.com/dashboard
2. Select your project: `vintage-parts-india`
3. Go to "Settings" → "Environment Variables"
4. Add new variable:
   ```
   VITE_API_URL=https://your-railway-url/api
   ```
   (Replace `your-railway-url` with your actual Railway URL)

5. Click "Save"
6. Go to "Deployments" tab
7. Click "Redeploy" on latest deployment

---

### Step 7: Test Your Backend

1. Visit your Railway URL + `/api/health`
   - Example: `https://vintage-parts-india-api.railway.app/api/health`
   - Should see: `{"message":"VintageParts India API is running!"}`

2. Visit your Vercel frontend: https://vintage-parts-india.vercel.app
3. Try to register or login
4. Should work without errors!

---

## 📊 Environment Variables Explained

| Variable | Value | Purpose |
|----------|-------|---------|
| `PORT` | `5000` | Server port |
| `MONGODB_URI` | MongoDB connection string | Database connection |
| `JWT_SECRET` | Your secret key | JWT token signing |
| `NODE_ENV` | `production` | Environment mode |

---

## 🆘 Troubleshooting

### Build Failed
- Check Railway logs for errors
- Ensure `server/package.json` exists
- Verify all dependencies are listed

### MongoDB Connection Error
- Use MongoDB Atlas (cloud) instead of local
- Get connection string from MongoDB Atlas
- Make sure IP is whitelisted in MongoDB Atlas

### Backend URL Not Working
- Wait 2-3 minutes for deployment to complete
- Check Railway deployment status
- Verify environment variables are set

### Frontend Still Can't Connect
- Verify `VITE_API_URL` is set in Vercel
- Redeploy Vercel frontend
- Check browser console for errors

---

## 📋 Deployment Checklist

- [ ] Railway account created
- [ ] GitHub repository connected
- [ ] Project deployed to Railway
- [ ] Environment variables set
- [ ] Backend URL obtained
- [ ] Vercel environment variable updated
- [ ] Vercel frontend redeployed
- [ ] Backend health check working
- [ ] Frontend can connect to backend
- [ ] Registration/Login working

---

## 🎉 Success Indicators

✅ Railway deployment shows "Success"  
✅ Backend health check returns JSON  
✅ Vercel frontend loads without errors  
✅ Can register new account  
✅ Can login with account  
✅ Can browse parts  
✅ Can add new parts  

---

## 📞 Quick Links

- **Railway Dashboard**: https://railway.app/dashboard
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Frontend**: https://vintage-parts-india.vercel.app

---

## 🚀 Next Steps After Deployment

1. Test all features on frontend
2. Create test account
3. Add test parts
4. Test admin features
5. Share live link with others

---

**Status**: Ready for Railway Deployment  
**Backend**: Node.js + Express  
**Database**: MongoDB  
**Hosting**: Railway  
**Frontend**: Vercel
