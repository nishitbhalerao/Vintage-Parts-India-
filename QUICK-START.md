# ⚡ Quick Start Guide - 5 Minutes to Running

Get VintageParts India running in just 5 minutes!

---

## 🚀 Super Quick Setup

### Prerequisites (2 minutes)
```bash
# Check Node.js is installed
node --version    # Should show v16+

# Check MongoDB is running
mongod --version  # Should show version
```

### Installation (2 minutes)
```bash
# Clone and install
git clone https://github.com/nishitbhalerao/Vintage-Parts-India-.git
cd Vintage-Parts-India-

# Backend
cd server && npm install && cd ..

# Frontend
cd client && npm install && cd ..
```

### Configuration (1 minute)

**Create `server/.env`**:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/vintagepartsIndia
JWT_SECRET=secret123
NODE_ENV=development
```

**Create `client/.env`**:
```env
VITE_API_URL=http://localhost:5000/api
```

### Run (1 minute)

**Terminal 1 - Backend**:
```bash
cd server && npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd client && npm run dev
```

### Access
- **App**: http://localhost:3000
- **Admin**: Login with `bhaleraonishit@gmail.com` / `Nishit@1098`

---

## 🎯 What to Do Next

### 1. Browse Parts
- Go to http://localhost:3000/browse
- Search and filter parts

### 2. Create Account
- Click "Sign Up"
- Fill in details
- Create account

### 3. List a Part
- Go to Dashboard
- Click "Sell Part"
- Fill 3-step form
- Upload images
- Submit

### 4. Admin Panel
- Login with admin credentials
- Go to Admin Panel
- Manage users and parts

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB error | Run `mongod` in terminal |
| Port in use | Kill process: `taskkill /PID <PID> /F` |
| Blank page | Clear cache: `Ctrl+Shift+Delete` |
| API not working | Check backend is running on 5000 |

---

## 📚 Full Documentation

- **Detailed Setup**: [HOW-TO-RUN.md](HOW-TO-RUN.md)
- **Admin Guide**: [ADMIN-GUIDE.md](ADMIN-GUIDE.md)
- **Full README**: [README.md](README.md)

---

**That's it! You're ready to go! 🎉**