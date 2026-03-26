# 🚀 VintageParts India - Quick Setup Guide

## Step 1: Install MongoDB (Choose One Option)

### Option A: Local MongoDB Installation (Recommended)
1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows → Version 7.0+ → Package: msi
   - Download and run the installer

2. **Installation Settings**
   - ✅ Install MongoDB as a Service
   - ✅ Install MongoDB Compass (GUI tool)
   - Use default installation path

3. **Verify Installation**
   ```bash
   mongod --version
   ```

### Option B: MongoDB Atlas (Cloud Database)
1. **Create Free Account**
   - Visit: https://cloud.mongodb.com/
   - Sign up for free account
   - Create a new cluster (free tier)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Update `server/.env` file with your connection string

## Step 2: Start the Application

### Terminal 1: Start Backend Server
```bash
cd server
npm run dev
```
**Expected Output:**
```
✅ MongoDB Connected: localhost:27017
Server running on port 5000
```

### Terminal 2: Start Frontend Client
```bash
cd client  
npm run dev
```
**Expected Output:**
```
Local:   http://localhost:3000/
Network: http://192.168.x.x:3000/
```

## Step 3: Access the Application

1. **Open Browser**: http://localhost:3000
2. **Register Account**: Click "Register" to create new account
3. **Explore Features**:
   - Browse parts without login
   - Register/Login to add parts
   - Use search and filters
   - Contact sellers via phone/WhatsApp

## 🔧 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB service is running
net start MongoDB

# If not running, start it
net start MongoDB
```

### Port Already in Use
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Kill process on port 3000  
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Dependencies Issues
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📱 Features to Test

1. **Landing Page**: Animated hero section with vehicle categories
2. **Authentication**: Register/Login with form validation
3. **Browse Parts**: Search, filter by category, make, condition
4. **Add Part**: Multi-step form with image upload
5. **Part Details**: View part info, contact seller
6. **Dashboard**: User stats and quick actions
7. **My Listings**: Manage your parts

## 🎯 Demo Data

After setup, you can:
1. Register as a seller
2. Add sample parts with images
3. Browse and search functionality
4. Test WhatsApp integration
5. View responsive design on mobile

## 📞 Need Help?

If you encounter issues:
1. Check console logs in browser (F12)
2. Check terminal outputs for errors
3. Ensure MongoDB is running
4. Verify all dependencies installed correctly

**Happy coding! 🚀**