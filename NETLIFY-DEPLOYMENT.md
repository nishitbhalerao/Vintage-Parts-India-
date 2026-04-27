# 🚀 Netlify Deployment Guide

Complete guide to deploy VintageParts India on Netlify.

---

## 📋 Prerequisites

- ✅ Netlify CLI installed (`npm install -g netlify-cli`)
- ✅ Frontend built (`npm run build` in client/)
- ✅ GitHub repository with code pushed
- ✅ Email: nishitbhalrao@gmail.com

---

## 🎯 Deployment Steps

### Step 1: Login to Netlify

```bash
netlify login
```

This will:
1. Open browser to Netlify login page
2. Create account with nishitbhalrao@gmail.com
3. Authorize CLI access
4. Return to terminal

### Step 2: Initialize Netlify Project

```bash
netlify init
```

Follow the prompts:
- **Team**: Select your team or create new
- **Site name**: `vintagepartsIndia` (or your choice)
- **Build command**: `cd client && npm install && npm run build`
- **Publish directory**: `client/dist`

### Step 3: Deploy

```bash
netlify deploy --prod
```

This will:
1. Build the project
2. Upload to Netlify
3. Generate live URL
4. Show deployment status

---

## 🔧 Configuration Files

### netlify.toml
Already created with:
- Build command
- Publish directory
- Redirects for SPA routing
- Environment variables

### .netlify/state.json
Stores site ID for future deployments

---

## 📝 Environment Variables

Set in Netlify Dashboard:

```
VITE_API_URL=https://your-backend-api.com/api
```

Or via CLI:
```bash
netlify env:set VITE_API_URL https://your-backend-api.com/api
```

---

## 🌐 After Deployment

### Your Site URL
```
https://vintagepartsIndia.netlify.app
```

### Update Backend API URL
1. Go to Netlify Dashboard
2. Site settings → Build & deploy → Environment
3. Set `VITE_API_URL` to your backend URL
4. Trigger new deploy

### Custom Domain (Optional)
1. Go to Netlify Dashboard
2. Domain settings
3. Add custom domain
4. Update DNS records

---

## 🔄 Continuous Deployment

### Auto-Deploy from GitHub

1. Go to Netlify Dashboard
2. Site settings → Build & deploy → Continuous Deployment
3. Connect GitHub repository
4. Select branch (master)
5. Confirm build settings
6. Save

Now every push to master will auto-deploy!

---

## 📊 Deployment Checklist

- [ ] Netlify CLI installed
- [ ] Frontend built successfully
- [ ] netlify.toml created
- [ ] Logged in to Netlify
- [ ] Project initialized
- [ ] Deployed to production
- [ ] Site URL working
- [ ] Environment variables set
- [ ] Backend API URL configured
- [ ] Custom domain added (optional)

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Check build locally
cd client && npm run build

# Check for errors
npm run build 2>&1 | tail -20
```

### Site Shows Blank Page
1. Check browser console (F12)
2. Verify `VITE_API_URL` is set
3. Check backend is running
4. Clear cache and refresh

### API Calls Fail
1. Verify backend URL in environment variables
2. Check CORS settings on backend
3. Verify backend is deployed and running

### Deployment Stuck
```bash
# Clear cache and redeploy
netlify deploy --prod --clear-cache
```

---

## 📞 Useful Commands

```bash
# Login to Netlify
netlify login

# Initialize project
netlify init

# Deploy to production
netlify deploy --prod

# Deploy preview
netlify deploy

# Check site status
netlify status

# View logs
netlify logs

# Set environment variable
netlify env:set KEY VALUE

# Get environment variable
netlify env:get KEY

# List all environment variables
netlify env:list

# Open site in browser
netlify open:site

# Open admin dashboard
netlify open:admin
```

---

## 🎯 Next Steps

1. **Deploy Frontend**: Follow steps above
2. **Deploy Backend**: Deploy Node.js backend to Heroku/Railway
3. **Update API URL**: Set `VITE_API_URL` to backend URL
4. **Test Application**: Test all features
5. **Setup Custom Domain**: Add your domain
6. **Enable Auto-Deploy**: Connect GitHub for auto-deployment

---

## 📚 Resources

- [Netlify Docs](https://docs.netlify.com/)
- [Netlify CLI Docs](https://cli.netlify.com/)
- [React Deployment](https://docs.netlify.com/frameworks/react/)
- [Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)

---

## ✨ Summary

Your VintageParts India frontend is now ready to deploy on Netlify!

**Next**: Deploy backend and update API URL for full functionality.

---

**Deployment Date**: April 27, 2026  
**Status**: Ready for Deployment  
**Frontend**: React + Vite  
**Hosting**: Netlify