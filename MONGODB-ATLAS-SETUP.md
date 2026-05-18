# 🗄️ MongoDB Atlas Setup Guide

Railway needs a cloud MongoDB database. This guide shows how to set up MongoDB Atlas (free).

---

## ✅ Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email or Google
4. Verify your email
5. Create account

---

## 🎯 Step 2: Create a Cluster

1. After login, click "Create a Deployment"
2. Choose "M0 Free" (free tier)
3. Select your region (closest to you)
4. Click "Create Deployment"
5. Wait 2-3 minutes for cluster to be created

---

## 🔐 Step 3: Create Database User

1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username: `vintagepartsadmin`
5. Enter password: `YourSecurePassword123!` (remember this!)
6. Click "Add User"

---

## 🌐 Step 4: Whitelist IP Address

1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

> **Note**: For production, add specific IP addresses instead

---

## 📋 Step 5: Get Connection String

1. Go to "Databases" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Select "Node.js" and version "4.x or later"
5. Copy the connection string

**Example**:
```
mongodb+srv://vintagepartsadmin:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## 🔧 Step 6: Update Connection String

Replace the default database name with your database name:

**Before**:
```
mongodb+srv://vintagepartsadmin:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**After**:
```
mongodb+srv://vintagepartsadmin:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/vintagepartsIndia?retryWrites=true&w=majority
```

---

## 📝 Step 7: Use in Railway

When setting up Railway environment variables, use:

```
MONGODB_URI=mongodb+srv://vintagepartsadmin:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/vintagepartsIndia?retryWrites=true&w=majority
```

---

## ✅ Verify Connection

To test your connection string locally:

1. Update `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://vintagepartsadmin:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/vintagepartsIndia?retryWrites=true&w=majority
   ```

2. Start backend:
   ```bash
   cd server
   npm run dev
   ```

3. Should see: `✅ MongoDB Connected`

---

## 🎯 MongoDB Atlas Dashboard

Once connected, you can:
- View your data in "Collections"
- Create indexes
- Monitor performance
- Backup data
- Scale your cluster

---

## 📊 Free Tier Limits

- **Storage**: 512 MB
- **Connections**: 100
- **Throughput**: Shared
- **Backups**: 7-day retention

> **Note**: Upgrade anytime if you need more

---

## 🆘 Troubleshooting

### Connection Refused
- Check IP whitelist (Network Access)
- Verify username and password
- Ensure database name is correct

### Authentication Failed
- Double-check username and password
- Make sure special characters are URL-encoded
- Try resetting password

### Cluster Not Ready
- Wait 5-10 minutes for cluster creation
- Refresh the page
- Check cluster status in dashboard

---

## 🔗 Important Links

- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Connection String Docs**: https://docs.mongodb.com/manual/reference/connection-string/
- **Node.js Driver**: https://www.mongodb.com/docs/drivers/node/

---

## 📋 Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created (M0 Free)
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string copied
- [ ] Connection string updated with database name
- [ ] Connection tested locally
- [ ] Connection string added to Railway

---

**Status**: Ready for Railway Deployment  
**Database**: MongoDB Atlas (Cloud)  
**Tier**: Free (M0)  
**Storage**: 512 MB
