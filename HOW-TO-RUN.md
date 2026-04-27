# 🚀 How to Run VintageParts India

Complete step-by-step guide to get the application running on your local machine.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Configuration](#configuration)
4. [Starting the Application](#starting-the-application)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)
7. [First Time Setup](#first-time-setup)

---

## ✅ Prerequisites

Before you start, make sure you have the following installed:

### 1. **Node.js (v16 or higher)**
- **Download**: https://nodejs.org/
- **Verify Installation**:
  ```bash
  node --version
  npm --version
  ```
- Should show version numbers like `v16.x.x` and `8.x.x`

### 2. **MongoDB (v5 or higher)**

**Option A: Local MongoDB Installation**
- **Download**: https://www.mongodb.com/try/download/community
- **Installation Guide**: https://docs.mongodb.com/manual/installation/
- **Verify Installation**:
  ```bash
  mongod --version
  ```

**Option B: MongoDB Atlas (Cloud - Recommended)**
- **Website**: https://www.mongodb.com/cloud/atlas
- **Steps**:
  1. Create free account
  2. Create a cluster
  3. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
  4. Use this string in `.env` file

### 3. **Git**
- **Download**: https://git-scm.com/
- **Verify Installation**:
  ```bash
  git --version
  ```

### 4. **Code Editor (Optional but Recommended)**
- **VS Code**: https://code.visualstudio.com/
- **WebStorm**: https://www.jetbrains.com/webstorm/

---

## 📥 Installation Steps

### Step 1: Clone the Repository

Open your terminal/command prompt and run:

```bash
git clone https://github.com/nishitbhalerao/Vintage-Parts-India-.git
cd Vintage-Parts-India-
```

**Expected Output**:
```
Cloning into 'Vintage-Parts-India-'...
remote: Enumerating objects: 88, done.
...
```

### Step 2: Install Backend Dependencies

Navigate to the server folder and install dependencies:

```bash
cd server
npm install
```

**Expected Output**:
```
added XXX packages in XXs
```

**What it does**: Downloads all required packages for the backend server (Express, MongoDB, JWT, etc.)

### Step 3: Install Frontend Dependencies

Navigate to the client folder and install dependencies:

```bash
cd ../client
npm install
```

**Expected Output**:
```
added XXX packages in XXs
```

**What it does**: Downloads all required packages for the frontend (React, Vite, Tailwind, etc.)

---

## ⚙️ Configuration

### Step 4: Setup MongoDB

#### **If using Local MongoDB:**

1. **Start MongoDB Service**:
   - **Windows**: 
     - MongoDB should start automatically
     - Or open Command Prompt and run: `mongod`
   - **Mac**: 
     ```bash
     brew services start mongodb-community
     ```
   - **Linux**: 
     ```bash
     sudo systemctl start mongod
     ```

2. **Verify MongoDB is Running**:
   ```bash
   mongosh
   ```
   You should see a MongoDB shell prompt. Type `exit` to quit.

#### **If using MongoDB Atlas (Cloud):**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and cluster
3. Click "Connect" → "Drivers" → Copy connection string
4. It will look like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

### Step 5: Create Environment Files

#### **Backend Configuration** - Create `server/.env`

Navigate to the `server` folder and create a file named `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/vintagepartsIndia
JWT_SECRET=your_super_secret_jwt_key_12345_change_this
NODE_ENV=development
```

**If using MongoDB Atlas**, replace `MONGODB_URI` with your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vintagepartsIndia
```

#### **Frontend Configuration** - Create `client/.env`

Navigate to the `client` folder and create a file named `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

**File Structure After Setup**:
```
Vintage-Parts-India-/
├── server/
│   ├── .env                 ← Create this file
│   ├── package.json
│   └── ...
├── client/
│   ├── .env                 ← Create this file
│   ├── package.json
│   └── ...
└── ...
```

---

## 🎬 Starting the Application

### Option 1: Automated Start (Windows Only)

From the project root directory, double-click:
```
start-project.bat
```

This will automatically start both servers in separate windows.

### Option 2: Manual Start (All Platforms - Recommended)

#### **Terminal 1: Start Backend Server**

```bash
cd server
npm run dev
```

**Expected Output**:
```
[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] starting `node server.js`
Server running on port 5000
✅ MongoDB Connected: 127.0.0.1
```

✅ **Backend is ready!** Keep this terminal open.

#### **Terminal 2: Start Frontend Server**

Open a new terminal and run:

```bash
cd client
npm run dev
```

**Expected Output**:
```
VITE v4.5.14  ready in 1240 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h to show help
```

✅ **Frontend is ready!** Keep this terminal open.

---

## ✔️ Verification

### Step 1: Check Backend

Open your browser and go to:
```
http://localhost:5000/api/parts
```

You should see a JSON response with parts data (or empty array if no parts yet).

### Step 2: Check Frontend

Open your browser and go to:
```
http://localhost:3000
```

You should see the VintageParts India homepage with:
- Navigation bar
- Search bar
- Featured parts section
- Call-to-action buttons

### Step 3: Test Admin Login

1. Go to http://localhost:3000/login
2. Enter credentials:
   - **Email**: `bhaleraonishit@gmail.com`
   - **Password**: `Nishit@1098`
3. Click "Sign in"
4. You should be redirected to dashboard
5. Click on "Admin Panel" in navbar
6. You should see admin dashboard with statistics

### Step 4: Test User Registration

1. Go to http://localhost:3000/register
2. Fill in the form with test data
3. Click "Create account"
4. You should be logged in and redirected to dashboard

### Step 5: Test Part Listing

1. From dashboard, click "Sell Part"
2. Fill in the 3-step form
3. Upload images
4. Click "Create Listing"
5. You should see the part in "My Listings"

---

## 🆘 Troubleshooting

### ❌ MongoDB Connection Error

**Error Message**:
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**:
1. Make sure MongoDB is running
2. **Windows**: Open Command Prompt and run `mongod`
3. **Mac**: Run `brew services start mongodb-community`
4. **Linux**: Run `sudo systemctl start mongod`
5. Wait 5 seconds and restart backend server

### ❌ Port Already in Use

**Error Message**:
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**:
1. **Windows**:
   ```bash
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```
2. **Mac/Linux**:
   ```bash
   lsof -i :5000
   kill -9 <PID>
   ```
3. Restart the server

### ❌ Dependencies Installation Failed

**Error Message**:
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution**:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### ❌ Frontend Not Loading

**Problem**: Blank page or "Cannot GET /"

**Solution**:
1. Check if Vite server is running (should show `http://localhost:3000/`)
2. Clear browser cache: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
3. Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
4. Check browser console for errors: Press `F12`

### ❌ Backend API Not Responding

**Problem**: "Failed to fetch" or network errors

**Solution**:
1. Verify backend is running on port 5000
2. Check `VITE_API_URL` in `client/.env` is correct
3. Check MongoDB connection in backend terminal
4. Restart both servers

### ❌ Images Not Uploading

**Problem**: Upload fails or images don't appear

**Solution**:
1. Check `server/uploads/` folder exists
2. Verify file size is less than 5MB
3. Check file format is PNG, JPG, or JPEG
4. Check backend logs for errors

### ❌ Admin Login Not Working

**Problem**: "Invalid credentials" error

**Solution**:
1. Verify you're using correct credentials:
   - Email: `bhaleraonishit@gmail.com`
   - Password: `Nishit@1098`
2. Check MongoDB has admin user (check in MongoDB Compass)
3. Clear browser cookies and try again

---

## 🎯 First Time Setup Checklist

- [ ] Node.js installed and verified (`node --version`)
- [ ] MongoDB installed and running (`mongod` works)
- [ ] Git installed (`git --version`)
- [ ] Repository cloned
- [ ] Backend dependencies installed (`npm install` in server/)
- [ ] Frontend dependencies installed (`npm install` in client/)
- [ ] `server/.env` file created with correct values
- [ ] `client/.env` file created with correct values
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Can access http://localhost:3000 in browser
- [ ] Can login with admin credentials
- [ ] Can create test user account
- [ ] Can list a test part

---

## 📱 Quick Reference

### URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin
- **Browse Parts**: http://localhost:3000/browse
- **Add Part**: http://localhost:3000/add-part

### Admin Credentials
- **Email**: bhaleraonishit@gmail.com
- **Password**: Nishit@1098

### Important Folders
- **Backend**: `server/`
- **Frontend**: `client/`
- **Uploads**: `server/uploads/`
- **Database**: MongoDB (local or Atlas)

### Useful Commands
```bash
# Start backend
cd server && npm run dev

# Start frontend
cd client && npm run dev

# Check if port is in use
netstat -ano | findstr :5000

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json && npm install
```

---

## 🎓 Next Steps

1. **Explore the Code**: Check `client/src/` and `server/` folders
2. **Read Documentation**: Check [README.md](README.md) and [ADMIN-GUIDE.md](ADMIN-GUIDE.md)
3. **Make Changes**: Try modifying components and see live updates
4. **Test Features**: Create accounts, list parts, use admin panel
5. **Deploy**: When ready, deploy to Heroku/Railway (backend) and Vercel/Netlify (frontend)

---

## 💬 Need Help?

- Check [Troubleshooting](#troubleshooting) section above
- Read [README.md](README.md) for more details
- Check [ADMIN-GUIDE.md](ADMIN-GUIDE.md) for admin features
- Open an issue on [GitHub](https://github.com/nishitbhalerao/Vintage-Parts-India-/issues)
- Email: bhaleraonishit@gmail.com

---

**Happy coding! 🚀**