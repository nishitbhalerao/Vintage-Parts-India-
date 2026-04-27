# 📖 Complete Setup Guide

Comprehensive guide for setting up VintageParts India development environment.

---

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Guide](#installation-guide)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Verification Steps](#verification-steps)
6. [Development Tips](#development-tips)

---

## 🖥️ System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB free space
- **Internet**: Required for npm packages and MongoDB Atlas

### Software Requirements

#### Node.js & npm
- **Version**: Node.js 16+ (LTS recommended)
- **Download**: https://nodejs.org/
- **Installation**: Follow official installer
- **Verify**:
  ```bash
  node --version  # v16.x.x or higher
  npm --version   # 8.x.x or higher
  ```

#### MongoDB
- **Version**: 5.0+
- **Options**:
  - **Local**: https://www.mongodb.com/try/download/community
  - **Cloud**: https://www.mongodb.com/cloud/atlas (recommended)

#### Git
- **Version**: 2.0+
- **Download**: https://git-scm.com/
- **Verify**:
  ```bash
  git --version  # git version 2.x.x
  ```

---

## 📥 Installation Guide

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/nishitbhalerao/Vintage-Parts-India-.git

# Navigate to project
cd Vintage-Parts-India-

# Verify structure
ls -la  # or dir on Windows
```

**Expected Output**:
```
client/
server/
.git/
.gitignore
README.md
HOW-TO-RUN.md
QUICK-START.md
...
```

### Step 2: Install Backend Dependencies

```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Verify installation
npm list  # Shows installed packages
```

**Expected Output**:
```
added XXX packages in XXs
```

**Key Packages Installed**:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (JWT auth)
- multer (file upload)
- bcryptjs (password hashing)
- nodemon (auto-reload)

### Step 3: Install Frontend Dependencies

```bash
# Navigate to client
cd ../client

# Install dependencies
npm install

# Verify installation
npm list
```

**Expected Output**:
```
added XXX packages in XXs
```

**Key Packages Installed**:
- react (UI library)
- vite (build tool)
- tailwindcss (styling)
- framer-motion (animations)
- react-router-dom (routing)
- axios (HTTP client)

---

## ⚙️ Configuration

### Step 1: Setup MongoDB

#### **Option A: Local MongoDB**

**Windows**:
1. Download from https://www.mongodb.com/try/download/community
2. Run installer and follow steps
3. MongoDB starts automatically
4. Verify: Open Command Prompt and run `mongod`

**Mac**:
```bash
# Install via Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start service
brew services start mongodb-community

# Verify
mongosh
```

**Linux (Ubuntu)**:
```bash
# Install
sudo apt-get install -y mongodb

# Start service
sudo systemctl start mongod

# Verify
mongosh
```

#### **Option B: MongoDB Atlas (Cloud)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new project
4. Create cluster (free tier available)
5. Create database user
6. Get connection string
7. Connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```

### Step 2: Create Environment Files

#### **Backend Environment** - `server/.env`

Create file at `server/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/vintagepartsIndia

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads

# CORS
CORS_ORIGIN=http://localhost:3000
```

**For MongoDB Atlas**, replace `MONGODB_URI`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vintagepartsIndia
```

#### **Frontend Environment** - `client/.env`

Create file at `client/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=VintageParts India
VITE_APP_VERSION=1.0.0
```

### Step 3: Verify Configuration

**Backend Configuration Check**:
```bash
cd server
cat .env  # or type .env on Windows
```

Should show:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/vintagepartsIndia
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Frontend Configuration Check**:
```bash
cd ../client
cat .env  # or type .env on Windows
```

Should show:
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🎬 Running the Application

### Method 1: Automated (Windows Only)

From project root:
```bash
start-project.bat
```

This opens two Command Prompt windows:
- Window 1: Backend server
- Window 2: Frontend server

### Method 2: Manual (All Platforms)

#### **Terminal 1: Backend Server**

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

**Keep this terminal open!**

#### **Terminal 2: Frontend Server**

Open new terminal and run:

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

**Keep this terminal open!**

---

## ✅ Verification Steps

### Step 1: Backend Verification

**Check Backend API**:
```bash
# In browser or terminal
curl http://localhost:5000/api/parts
```

**Expected Response**:
```json
{
  "success": true,
  "parts": [],
  "total": 0
}
```

### Step 2: Frontend Verification

**Check Frontend**:
1. Open browser
2. Go to http://localhost:3000
3. Should see homepage with:
   - Navigation bar
   - Search bar
   - Featured parts section
   - Call-to-action buttons

### Step 3: Database Verification

**Check MongoDB Connection**:
```bash
# In backend terminal, you should see:
✅ MongoDB Connected: 127.0.0.1
```

**Using MongoDB Compass** (GUI):
1. Download: https://www.mongodb.com/products/compass
2. Connect to `mongodb://127.0.0.1:27017`
3. Should see `vintagepartsIndia` database

### Step 4: Admin Login Test

1. Go to http://localhost:3000/login
2. Enter:
   - Email: `bhaleraonishit@gmail.com`
   - Password: `Nishit@1098`
3. Click "Sign in"
4. Should redirect to dashboard
5. Click "Admin Panel" in navbar
6. Should see admin dashboard

### Step 5: User Registration Test

1. Go to http://localhost:3000/register
2. Fill form with test data
3. Click "Create account"
4. Should be logged in and redirected to dashboard

---

## 💡 Development Tips

### Hot Reload
- **Backend**: Changes auto-reload with nodemon
- **Frontend**: Changes auto-reload with Vite
- No need to restart servers!

### Debugging

**Backend Debugging**:
```bash
# Add console.log in code
console.log('Debug message:', variable);

# Check backend terminal for output
```

**Frontend Debugging**:
1. Open browser DevTools: `F12`
2. Go to Console tab
3. Check for errors
4. Use Network tab to see API calls

### Database Inspection

**Using MongoDB Compass**:
1. Download and install
2. Connect to MongoDB
3. Browse collections
4. View and edit documents

**Using mongosh CLI**:
```bash
# Connect to MongoDB
mongosh

# Show databases
show dbs

# Use database
use vintagepartsIndia

# Show collections
show collections

# View documents
db.users.find()
db.parts.find()
```

### Common Development Commands

```bash
# Backend
cd server
npm run dev          # Start with auto-reload
npm start            # Start without auto-reload
npm test             # Run tests

# Frontend
cd client
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
```

### File Structure for Development

```
Vintage-Parts-India-/
├── server/
│   ├── controllers/      # Business logic
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded files
│   ├── .env             # Environment variables
│   ├── server.js        # Entry point
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context
│   │   ├── services/    # API calls
│   │   ├── App.jsx      # Main component
│   │   └── main.jsx     # Entry point
│   ├── .env             # Environment variables
│   ├── vite.config.js   # Vite config
│   └── package.json
└── README.md
```

### Making Your First Change

**Backend Change**:
1. Edit `server/controllers/partController.js`
2. Add console.log
3. Save file
4. Check backend terminal (auto-reloaded)

**Frontend Change**:
1. Edit `client/src/pages/Landing.jsx`
2. Change text or styling
3. Save file
4. Check browser (auto-reloaded)

---

## 🚀 Next Steps

1. **Explore Code**: Read through components and controllers
2. **Make Changes**: Try modifying UI or adding features
3. **Test Features**: Create accounts, list parts, use admin panel
4. **Read Docs**: Check [README.md](README.md) and [ADMIN-GUIDE.md](ADMIN-GUIDE.md)
5. **Deploy**: When ready, deploy to production

---

## 📞 Support

- **Documentation**: [README.md](README.md)
- **Quick Start**: [QUICK-START.md](QUICK-START.md)
- **How to Run**: [HOW-TO-RUN.md](HOW-TO-RUN.md)
- **Admin Guide**: [ADMIN-GUIDE.md](ADMIN-GUIDE.md)
- **Issues**: https://github.com/nishitbhalerao/Vintage-Parts-India-/issues
- **Email**: bhaleraonishit@gmail.com

---

**Happy developing! 🎉**