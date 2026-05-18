# ⚡ Vercel Backend Deployment - Quick Start

Deploy your backend to Vercel in 10 minutes!

---

## 🎯 3-Step Deployment

### Step 1: MongoDB Atlas (5 minutes)

**Go to**: https://www.mongodb.com/cloud/atlas

1. Sign up with GitHub
2. Create free M0 cluster
3. Create user: `vintagepartsadmin` / `YourSecurePassword123!`
4. Whitelist IP: "Allow Access from Anywhere"
5. Get connection string:
   ```
   mongodb+srv://vintagepartsadmin:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/vintagepartsIndia?retryWrites=true&w=majority
   ```

---

### Step 2: Deploy to Vercel (3 minutes)

**Go to**: https://vercel.com/dashboard

1. Click "Add New Project"
2. Select: `Vintage-Parts-India-`
3. Framework: `Other`
4. Build Command: `npm install --prefix server`
5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://vintagepartsadmin:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/vintagepartsIndia?retryWrites=true&w=majority
   JWT_SECRET=vintagepartsIndia_jwt_secret_key_2024_secure
   NODE_ENV=production
   ```
6. Click "Deploy"

**Wait 2-3 minutes...**

---

### Step 3: Test (2 minutes)

**Test 1**: Health Check
```
https://vintage-parts-india.vercel.app/api/health
```

**Test 2**: Frontend
```
https://vintage-parts-india.vercel.app
```

**Test 3**: Register
- Click "Register"
- Fill form
- Should work!

---

## 🔗 URLs

| Service | URL |
|---------|-----|
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas |
| Vercel | https://vercel.com/dashboard |
| Frontend | https://vintage-parts-india.vercel.app |
| Backend | https://vintage-parts-india.vercel.app/api |

---

## ✅ Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string obtained
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Health check working
- [ ] Frontend loads
- [ ] Can register

---

## 🎉 Done!

Your backend is now live on Vercel! 🚀

**Frontend**: https://vintage-parts-india.vercel.app  
**Backend**: https://vintage-parts-india.vercel.app/api  

---

**Time**: ~10 minutes  
**Cost**: FREE  
**Status**: Ready to deploy!
