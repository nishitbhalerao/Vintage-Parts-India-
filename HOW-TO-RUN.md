# 🚀 How to Run VintageParts India - Complete Guide

## 📋 Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v16 or higher)
- ✅ MongoDB installed and configured
- ✅ Git (optional, for cloning)

## 🔄 Step-by-Step Startup Process

### Step 1: Start MongoDB (FIRST - Most Important!)

MongoDB must be running before starting the backend server.

**Option A: Start as Windows Service**
```powershell
# Open PowerShell as Administrator
net start MongoDB
```

**Option B: Check if already running**
```powershell
# Check MongoDB service status
Get-Service -Name "*mongo*"
# Should show: Status = Running
```

**Option C: Start manually (if service method doesn't work)**
```powershell
# Navigate to MongoDB bin directory (adjust path as needed)
cd "C:\Program Files\MongoDB\Server\7.0\bin"
mongod --dbpath "C:\data\db"
```

**✅ Verify MongoDB is Running:**
```powershell
# Check if port 27017 is listening
netstat -an | findstr :27017
# Should show: TCP 127.0.0.1:27017 ... LISTENING
```

---

### Step 2: Start Backend Server (SECOND)

Open **Terminal/PowerShell Window #1**:

```powershell
# Navigate to project directory
cd "path\to\your\vintageParts-india"

# Go to server directory
cd server

# Install dependencies (first time only)
npm install

# Start backend server
npm run dev
```

**✅ Expected Output:**
```
✅ MongoDB Connected: 127.0.0.1
Server running on port 5000
```

**❌ If you see errors:**
- `Database connection error` → MongoDB not running (go back to Step 1)
- `Port 5000 already in use` → Kill process: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

---

### Step 3: Start Frontend Client (THIRD)

Open **Terminal/PowerShell Window #2**:

```powershell
# Navigate to project directory (new terminal window)
cd "path\to\your\vintageParts-india"

# Go to client directory
cd client

# Install dependencies (first time only)
npm install

# Start frontend server
npm run dev
```

**✅ Expected Output:**
```
VITE v4.5.14 ready in 498 ms
➜ Local:   http://localhost:3000/
➜ Network: use --host to expose
```

---

### Step 4: Access Application (FINAL)

Open your web browser and go to:
**http://localhost:3000**

## 🎯 Quick Start Commands (Copy & Paste)

### For First Time Setup:
```powershell
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend (open new terminal)
cd client
npm install
npm run dev
```

### For Daily Development:
```powershell
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend (open new terminal)
cd client
npm run dev
```

## 🔧 Troubleshooting Common Issues

### Issue 1: MongoDB Connection Failed
```
❌ Database connection error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
```powershell
# Start MongoDB service
net start MongoDB

# Or check if running
Get-Service MongoDB
```

### Issue 2: Port Already in Use
```
❌ Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```powershell
# Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Then restart server
npm run dev
```

### Issue 3: Frontend Won't Start
```
❌ Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:**
```powershell
# Find and kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Then restart client
npm run dev
```

### Issue 4: Dependencies Missing
```
❌ Module not found errors
```
**Solution:**
```powershell
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🎮 Testing Your Setup

### 1. Test Backend API
```powershell
curl http://localhost:5000/api/health
# Should return: {"message":"VintageParts India API is running!"}
```

### 2. Test Frontend
- Open: http://localhost:3000
- Should see animated landing page

### 3. Test Database Connection
```powershell
curl http://localhost:5000/api/parts
# Should return: {"parts":[],"pagination":{...}}
```

## 🔄 Stopping the Application

### Stop All Servers:
1. **Frontend**: Press `Ctrl + C` in Terminal 2
2. **Backend**: Press `Ctrl + C` in Terminal 1
3. **MongoDB**: `net stop MongoDB` (optional - can keep running)

## 📱 What to Expect After Startup

### URLs:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

### Features Ready:
- ✅ User Registration/Login
- ✅ Add Parts with Images
- ✅ Browse & Search Parts
- ✅ WhatsApp Integration
- ✅ Responsive Design
- ✅ Dashboard & Analytics

## 🚀 Development Workflow

### Daily Startup Routine:
1. **Check MongoDB**: `Get-Service MongoDB`
2. **Start Backend**: `cd server && npm run dev`
3. **Start Frontend**: `cd client && npm run dev`
4. **Open Browser**: http://localhost:3000

### Making Changes:
- **Backend changes**: Server auto-restarts (nodemon)
- **Frontend changes**: Page auto-reloads (Vite HMR)
- **Database changes**: Persistent in MongoDB

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ Backend shows: "MongoDB Connected" + "Server running on port 5000"
- ✅ Frontend shows: "Local: http://localhost:3000/"
- ✅ Browser loads the animated landing page
- ✅ You can register/login successfully

**Happy Development! 🚀**