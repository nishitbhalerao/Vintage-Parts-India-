# 🚀 Deploy Backend to Vercel (Serverless)

Deploy your Node.js backend to Vercel as serverless functions!

---

## ✅ Why Vercel for Backend?

✅ **Free tier** - No credit card needed  
✅ **Serverless** - No server management  
✅ **Auto-scaling** - Handles traffic automatically  
✅ **Same platform** - Frontend + Backend on Vercel  
✅ **Easy deployment** - Git-based deployment  
✅ **Fast** - Global CDN  

---

## 📊 Current Status

| Component | Status | Details |
|-----------|--------|---------|
| Frontend | ✅ Live | https://vintage-parts-india.vercel.app |
| Backend | ⏳ Ready | Ready to deploy to Vercel |
| Database | ⏳ Setup | Need MongoDB Atlas |
| GitHub | ✅ Synced | All code pushed |

---

## 🎯 Deployment Steps (10 Minutes)

### Step 1: Setup MongoDB Atlas (5 minutes)

**Go to**: https://www.mongodb.com/cloud/atlas

1. Sign up with GitHub
2. Create free M0 cluster
3. Create database user:
   - Username: `vintagepartsadmin`
   - Password: `YourSecurePassword123!`
4. Whitelist IP: "Allow Access from Anywhere"
5. Get connection string:
   ```
   mongodb+srv://vintagepartsadmin:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/vintagepartsIndia?retryWrites=true&w=majority
   ```

**Save this connection string!**

---

### Step 2: Push Code to GitHub (1 minute)

All code is already pushed, but verify:

```bash
git status
# Should show: "On branch master, nothing to commit"
```

If there are changes:
```bash
git add .
git commit -m "Prepare backend for Vercel deployment"
git push origin master
```

---

### Step 3: Deploy to Vercel (3 minutes)

**Go to**: https://vercel.com/dashboard

**Step 1**: Click "Add New Project"

**Step 2**: Select your GitHub repository
- Search: `Vintage-Parts-India-`
- Click to select

**Step 3**: Configure project
- Framework: `Other`
- Root Directory: `.` (root)
- Build Command: `npm install --prefix server`
- Output Directory: Leave empty

**Step 4**: Add Environment Variables
- Click "Environment Variables"
- Add these variables:

```
MONGODB_URI=mongodb+srv://vintagepartsadmin:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/vintagepartsIndia?retryWrites=true&w=majority
JWT_SECRET=vintagepartsIndia_jwt_secret_key_2024_secure
NODE_ENV=production
```

**Step 5**: Click "Deploy"

Vercel will:
- Clone your repository
- Install dependencies
- Build your project
- Deploy to production

**Wait 2-3 minutes for deployment to complete**

---

### Step 4: Get Your Backend URL (1 minute)

1. Go to your Vercel project dashboard
2. Look for your deployment URL
3. It will be something like: `https://vintage-parts-india.vercel.app`
4. Your API will be at: `https://vintage-parts-india.vercel.app/api`

**Save this URL!**

---

### Step 5: Update Frontend (Optional - Already Done)

If you need to update the frontend API URL:

1. Go to your frontend project in Vercel
2. Settings → Environment Variables
3. Update: `VITE_API_URL=https://vintage-parts-india.vercel.app/api`
4. Redeploy

---

## 🧪 Test Your Backend

### Test 1: Health Check
```
https://vintage-parts-india.vercel.app/api/health
```

Should return:
```json
{"message":"VintageParts India API is running!"}
```

### Test 2: Register User
```bash
curl -X POST https://vintage-parts-india.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "address": "Test Address",
    "password": "TestPassword123!"
  }'
```

### Test 3: Login
```bash
curl -X POST https://vintage-parts-india.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

### Test 4: Get Parts
```
https://vintage-parts-india.vercel.app/api/parts
```

---

## 📋 Environment Variables

### Required Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `MONGODB_URI` | MongoDB connection string | Database connection |
| `JWT_SECRET` | Your secret key | JWT token signing |
| `NODE_ENV` | `production` | Environment mode |

### Optional Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `PORT` | `3000` | Server port (Vercel sets this) |

---

## 🔧 Configuration Files

### vercel.json
```json
{
  "version": 2,
  "buildCommand": "npm install --prefix server",
  "functions": {
    "api/index.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api"
    }
  ]
}
```

### api/index.js
- Express app configured for Vercel
- All routes included
- CORS enabled
- Error handling included

---

## 🆘 Troubleshooting

### Build Failed
- Check Vercel build logs
- Ensure `server/package.json` exists
- Verify all dependencies are listed
- Check for syntax errors

### MongoDB Connection Error
- Verify connection string is correct
- Check IP is whitelisted in MongoDB Atlas
- Ensure database name is included
- Test connection string locally first

### Routes Not Working
- Check Vercel logs for errors
- Verify environment variables are set
- Ensure `api/index.js` is in root directory
- Check CORS headers are correct

### 404 on API Routes
- Verify backend is deployed
- Check Vercel deployment status
- Ensure routes are correctly configured
- Test health check endpoint first

---

## 📊 Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created (M0 Free)
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string obtained
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Backend URL obtained
- [ ] Health check working
- [ ] Can register user
- [ ] Can login
- [ ] Can get parts

---

## 🎯 What Gets Deployed

✅ Node.js Express server  
✅ All API routes  
✅ Authentication system  
✅ Database connection  
✅ Error handling  
✅ CORS configuration  

---

## 📈 Performance

- **Cold start**: ~2-3 seconds
- **Warm requests**: <100ms
- **Memory**: 1024 MB
- **Timeout**: 30 seconds
- **Concurrent**: Unlimited

---

## 💡 Pro Tips

1. **Test locally first** - Run `npm run dev` in server folder
2. **Check logs** - Vercel logs show all errors
3. **Monitor usage** - Free tier has limits
4. **Use MongoDB Atlas** - Free tier is sufficient
5. **Keep secrets safe** - Use environment variables

---

## 🔗 Important Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Your Frontend**: https://vintage-parts-india.vercel.app
- **Your GitHub**: https://github.com/nishitbhalerao/Vintage-Parts-India-

---

## 🎉 Success Indicators

✅ Vercel deployment shows "Success"  
✅ Backend health check returns JSON  
✅ Can register new user  
✅ Can login with user  
✅ Can get parts list  
✅ Can add new parts  
✅ Admin features work  

---

## 📞 Next Steps

1. Setup MongoDB Atlas (5 min)
2. Deploy to Vercel (3 min)
3. Test backend (2 min)
4. Update frontend if needed (1 min)
5. Share your live app!

---

**Status**: ✅ READY FOR DEPLOYMENT  
**Time Required**: ~10 minutes  
**Cost**: FREE  

**Let's deploy your backend to Vercel!** 🚀
