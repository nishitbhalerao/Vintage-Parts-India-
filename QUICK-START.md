# 🚀 VintageParts India - Quick Start Guide

## 🎯 Super Simple Startup (3 Methods)

### Method 1: Automated Script (Easiest)
```powershell
# Double-click this file:
start-project.bat

# Or run in PowerShell:
.\start-project.ps1
```

### Method 2: Manual Commands (Recommended for Development)
```powershell
# Step 1: Start MongoDB (if not running)
net start MongoDB

# Step 2: Backend (Terminal 1)
cd server
npm run dev

# Step 3: Frontend (Terminal 2 - New Window)
cd client  
npm run dev

# Step 4: Open Browser
# Go to: http://localhost:3000
```

### Method 3: One-Line Commands
```powershell
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend  
cd client && npm run dev
```

## ⚡ What Happens When You Start

### 1. MongoDB Starts (Port 27017)
```
✅ MongoDB service started
```

### 2. Backend Starts (Port 5000)
```
✅ MongoDB Connected: 127.0.0.1
Server running on port 5000
```

### 3. Frontend Starts (Port 3000)
```
VITE v4.5.14 ready in 498 ms
➜ Local: http://localhost:3000/
```

### 4. Browser Opens
- **URL**: http://localhost:3000
- **Page**: Animated landing page with blue theme

## 🔍 Startup Order (IMPORTANT!)

**ALWAYS start in this order:**
1. **MongoDB** (must be first)
2. **Backend** (needs MongoDB)
3. **Frontend** (needs Backend for API calls)

## 🎮 Quick Test

After startup, test these URLs:
- **Frontend**: http://localhost:3000 ✅ Should show landing page
- **Backend**: http://localhost:5000/api/health ✅ Should return JSON
- **Parts API**: http://localhost:5000/api/parts ✅ Should return empty array

## 🛑 How to Stop

1. **Frontend**: Press `Ctrl + C` in frontend terminal
2. **Backend**: Press `Ctrl + C` in backend terminal  
3. **MongoDB**: Keep running (or `net stop MongoDB`)

## 🔧 If Something Goes Wrong

### MongoDB Issues:
```powershell
# Check if MongoDB is running
Get-Service MongoDB

# Start if stopped
net start MongoDB
```

### Port Issues:
```powershell
# Kill process on port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3000 (frontend)  
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependency Issues:
```powershell
# Reinstall dependencies
cd server && npm install
cd client && npm install
```

## 🎉 Success Checklist

- ✅ MongoDB service running
- ✅ Backend shows "MongoDB Connected"  
- ✅ Frontend shows "Local: http://localhost:3000"
- ✅ Browser opens to animated landing page
- ✅ Can register/login successfully

**You're ready to build! 🚀**