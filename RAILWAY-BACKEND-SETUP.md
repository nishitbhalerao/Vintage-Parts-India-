# 🚀 Deploy Backend to Railway.app

Railway is the simplest way to deploy your Node.js backend!

---

## Step 1: Create Railway Account

1. Go to: https://railway.app
2. Click "Start Project"
3. Sign up with GitHub (click GitHub icon)
4. Authorize Railway to access your GitHub
5. Done! You're logged in.

---

## Step 2: Create New Project

1. Go to Railway Dashboard: https://railway.app/dashboard
2. Click "New Project"
3. Click "Deploy from GitHub repo"
4. Select: `Vintage-Parts-India-`
5. Click "Deploy Now"

Railway will ask which folder to deploy from.

---

## Step 3: Configure Deployment

When prompted for configuration:

1. **Root Directory**: Set to `server` (this is where your Node.js code is)
2. **Build Command**: Leave empty (or `npm install`)
3. **Start Command**: `node server.js`
4. Click "Deploy"

Railway will start building...

---

## Step 4: Add Environment Variables

While it's building, go to **Variables** tab:

Click "Add Variable" and add these:

| Name | Value |
|------|-------|
| `MONGODB_URI` | `mongodb+srv://vintagepartsadmin:2@cluster0.izxysw3.mongodb.net/vintagepartsIndia?retryWrites=true&w=majority` |
| `JWT_SECRET` | `vintagepartsIndia_jwt_secret_key_2024_secure` |
| `NODE_ENV` | `production` |
| `PORT` | `8000` |

After adding variables, Railway will automatically redeploy.

---

## Step 5: Get Your Backend URL

Once deployment is complete:

1. Go to **Settings** tab
2. Find **"Domains"** section
3. Copy your Railway domain (looks like: `your-app-xyz.railway.app`)
4. Your backend API URL is: `https://your-app-xyz.railway.app/api`

---

## Step 6: Update Frontend API URL

Update your frontend to use the Railway backend:

**File**: `client/.env`

Change from:
```
VITE_API_URL=https://vintage-parts-india.vercel.app/api
```

To:
```
VITE_API_URL=https://your-railway-domain.railway.app/api
```

Replace `your-railway-domain` with your actual Railway domain.

---

## Step 7: Redeploy Frontend

Push the updated `.env` to GitHub:

```bash
git add client/.env
git commit -m "Update API URL to Railway backend"
git push origin master
```

Vercel will automatically redeploy with the new API URL.

---

## Step 8: Test Everything

### Test Backend Health Check
```
https://your-railway-domain.railway.app/api/health
```

Should return:
```json
{
  "message": "VintageParts India API is running!",
  "timestamp": "2024-...",
  "environment": "production"
}
```

### Test Frontend
```
https://vintage-parts-india.vercel.app
```

Should load without errors.

### Test Register
1. Click Register
2. Create account
3. Should work!

### Test Login
1. Click Login
2. Login with account
3. Should work!

---

## Railway Dashboard URL

Keep this handy for monitoring:
```
https://railway.app/dashboard
```

---

## Troubleshooting

### Deployment Failed
- Check "Deployment" tab → "Build Logs"
- Look for error messages
- Common: Missing dependencies (check server/package.json)

### Can't Connect to MongoDB
- Verify connection string is correct
- Check IP is whitelisted in MongoDB Atlas
- Test locally first: `npm run dev` in server folder

### Frontend Can't Connect to Backend
- Verify API URL is correct in client/.env
- Check backend domain is right
- Redeploy frontend after changing .env

### Slow Response
- Railway free tier has limitations
- First request might be slow (cold start)
- Subsequent requests are fast

---

## Cost

- **Railway Free Tier**: $5/month credit (usually enough)
- **PostgreSQL/MongoDB**: Included in free tier
- **Bandwidth**: Free

---

## Summary

Your deployment will look like:

```
┌─────────────────────────────────────────┐
│        Vercel (Frontend)                │
│   https://vintage-parts-india...        │
│          (React App)                    │
└────────────────┬────────────────────────┘
                 │
                 ↓ (API calls)
┌─────────────────────────────────────────┐
│       Railway (Backend)                 │
│   https://your-domain.railway.app/api   │
│      (Node.js Express Server)           │
└────────────────┬────────────────────────┘
                 │
                 ↓
        ┌───────────────┐
        │ MongoDB Atlas │
        │   (Database)  │
        └───────────────┘
```

---

## Next Steps

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project from GitHub repo
4. Set root directory to `server`
5. Add environment variables
6. Get your domain
7. Update client/.env
8. Redeploy frontend
9. Test everything

**You're done!** Your full-stack app is live! 🎉

---

**Status**: ✅ READY FOR RAILWAY DEPLOYMENT

**Time**: ~10 minutes

**Cost**: FREE (with $5 monthly credit)
