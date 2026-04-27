# 🔧 VintageParts India - Marketplace for Discontinued Auto Parts

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5+-green.svg)](https://mongodb.com/)

> India's first marketplace connecting buyers and sellers of discontinued automobile spare parts for bikes and cars.



## 🌟 Features

### 🛒 **Marketplace Features**
- **Multi-Category Support**: Bikes/Two-wheelers and Cars/Four-wheelers
- **Advanced Search & Filtering**: By make, model, part category, condition, price
- **Image Upload**: Multiple images per part listing (up to 5)
- **WhatsApp Integration**: Direct seller contact with pre-filled messages
- **Responsive Design**: Mobile-first, works on all devices
- **Real-time Search**: Instant search results with pagination

### 👤 **User Features**
- **Dual Role System**: Buyers, Sellers, or Both
- **JWT Authentication**: Secure login with localStorage
- **User Dashboard**: Personal stats and quick actions
- **My Listings**: Manage your parts with edit/delete options
- **Part Management**: Multi-step listing process with validation

### 🛡️ **Admin Module**
- **Complete Admin Dashboard**: Platform statistics and analytics
- **User Management**: View, search, and delete users
- **Parts Moderation**: Feature, verify, and remove parts
- **Verification System**: Approve/reject parts with admin notes
- **Featured Parts**: Star quality parts with ⭐ badge

### 🎨 **Design System**
- **Modern UI**: Professional blue color palette
- **Custom Typography**: Syne (display), DM Sans (body), Space Mono (code)
- **Smooth Animations**: Framer Motion transitions and effects
- **Animated Backgrounds**: Floating elements and gradient meshes

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16+) - [Download](https://nodejs.org/)
- **MongoDB** (v5+) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **npm** (comes with Node.js)

### Step-by-Step Installation & Setup

#### **Step 1: Clone the Repository**
```bash
git clone https://github.com/nishitbhalerao/Vintage-Parts-India-.git
cd Vintage-Parts-India-
```

#### **Step 2: Install Backend Dependencies**
```bash
cd server
npm install
```

#### **Step 3: Install Frontend Dependencies**
```bash
cd ../client
npm install
```

#### **Step 4: Setup MongoDB**

**Option A: Local MongoDB (Recommended for Development)**
1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically or run `mongod` in terminal
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`
3. Verify MongoDB is running: `mongo` or `mongosh` in terminal

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

#### **Step 5: Configure Environment Variables**

**Backend Configuration** - Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/vintagepartsIndia
JWT_SECRET=your_super_secret_jwt_key_12345
NODE_ENV=development
```

**Frontend Configuration** - Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

> **Note**: If using MongoDB Atlas, replace `MONGODB_URI` with your connection string

#### **Step 6: Start the Application**

**Option A: Automated Start (Windows Only)**
```bash
# From project root directory
start-project.bat
```

**Option B: Manual Start (All Platforms)**

Open **Terminal 1** - Start Backend Server:
```bash
cd server
npm run dev
```
✅ You should see: `Server running on port 5000` and `✅ MongoDB Connected`

Open **Terminal 2** - Start Frontend Server:
```bash
cd client
npm run dev
```
✅ You should see: `VITE v4.5.14 ready in XXX ms` and `Local: http://localhost:3000/`

#### **Step 7: Access the Application**

Open your browser and navigate to:
- **🌐 Frontend**: http://localhost:3000
- **🔌 Backend API**: http://localhost:5000
- **📊 Admin Panel**: http://localhost:3000/admin

---

## 📋 Complete Startup Checklist

- [ ] Node.js installed (`node --version`)
- [ ] MongoDB installed and running (`mongod` command works)
- [ ] Repository cloned
- [ ] Backend dependencies installed (`npm install` in server/)
- [ ] Frontend dependencies installed (`npm install` in client/)
- [ ] `.env` files created in both server/ and client/
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Can access http://localhost:3000 in browser

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
- Windows: Run `mongod` in a terminal
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill the process using the port
- Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
- Mac/Linux: `lsof -i :5000` then `kill -9 <PID>`

### Dependencies Installation Failed
```
npm ERR! code ERESOLVE
```
**Solution**: Clear npm cache and reinstall
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Frontend Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Check if Vite server is running on port 3000
- Check browser console for errors (F12)

### Backend API Not Responding
- Verify backend is running on port 5000
- Check `VITE_API_URL` in client/.env matches backend URL
- Check MongoDB connection in server logs


### Admin Features
- 👥 **User Management**: View, search, delete users
- 📦 **Parts Management**: Feature, verify, delete parts
- ⭐ **Featured Parts**: Highlight genuine products
- ✅ **Verification System**: Approve/reject with notes
- 📊 **Analytics**: Platform statistics and trends

---

## 🎯 How to Use the Application

### For Buyers
1. **Browse Parts**: Visit http://localhost:3000/browse
2. **Search & Filter**: Use search bar and filters to find parts
3. **View Details**: Click on any part to see full details
4. **Contact Seller**: Click "Contact via WhatsApp" to message seller
5. **Create Account**: Register to save favorites (optional)

### For Sellers
1. **Register Account**: Create account at http://localhost:3000/register
2. **Go to Dashboard**: Visit http://localhost:3000/dashboard
3. **List a Part**: Click "Sell Part" or go to http://localhost:3000/add-part
4. **Fill Details**: Complete the 3-step form:
   - Step 1: Vehicle Information
   - Step 2: Part Information
   - Step 3: Price & Contact Details
5. **Upload Photos**: Add up to 5 images of the part
6. **Submit**: Click "Create Listing"
7. **Manage Listings**: View and manage your parts at http://localhost:3000/my-listings



## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  address: String,
  password: String (hashed),
  isAdmin: Boolean,
  createdAt: Date
}
```

### Part Model
```javascript
{
  title: String,
  description: String,
  vehicleCategory: String (bike/car/truck/other),
  vehicleMake: String,
  vehicleModel: String,
  vehicleYear: Number,
  partCategory: String,
  partNumber: String,
  condition: String (new/used/refurbished),
  price: Number,
  negotiable: Boolean,
  images: [String],
  seller: ObjectId (ref: User),
  sellerName: String,
  sellerPhone: String,
  sellerAddress: String,
  status: String (active/pending/sold/rejected),
  featured: Boolean,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 Development Workflow

### Making Changes
1. **Backend Changes**: Edit files in `server/` folder
   - Changes auto-reload with nodemon
   - Check terminal for errors
2. **Frontend Changes**: Edit files in `client/src/` folder
   - Changes auto-reload with Vite
   - Check browser console for errors

### Testing
1. **Test Backend API**: Use Postman or curl
2. **Test Frontend**: Use browser DevTools (F12)
3. **Test Admin Features**: Login with admin credentials
4. **Test User Features**: Create test accounts

### Debugging
- **Backend**: Check `server/` terminal for logs
- **Frontend**: Open browser DevTools (F12) → Console tab
- **Database**: Use MongoDB Compass to view data
- **Network**: Check Network tab in DevTools for API calls

---

## 📦 Available Scripts

### Backend Scripts
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests (if configured)
```

### Frontend Scripts
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint (if configured)
```

---

## 🚀 Deployment

### Deploy Backend (Heroku/Railway)
1. Create account on [Heroku](https://heroku.com) or [Railway](https://railway.app)
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Deploy Frontend (Vercel/Netlify)
1. Create account on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
2. Connect GitHub repository
3. Set `VITE_API_URL` to production backend URL
4. Deploy

---

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router v6** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

### Development Tools
- **Nodemon** - Auto-restart server
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
vintageParts-india/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (Auth)
│   │   └── services/      # API calls
│   └── public/
├── server/                 # Node.js Backend
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── uploads/          # File storage
├── docs/                  # Documentation
└── scripts/              # Utility scripts
```

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
GET  /api/auth/me          # Get current user
```

### Parts
```
GET    /api/parts          # Get all parts (with filters)
GET    /api/parts/:id      # Get single part
POST   /api/parts          # Create new part (auth required)
PUT    /api/parts/:id      # Update part (owner only)
DELETE /api/parts/:id      # Delete part (owner only)
GET    /api/parts/my/listings  # Get user's parts
```

### Admin (Admin Only)
```
GET    /api/admin/dashboard     # Admin statistics
GET    /api/admin/users         # Get all users
DELETE /api/admin/users/:id     # Delete user
GET    /api/admin/parts         # Get all parts (admin view)
PATCH  /api/admin/parts/:id/featured     # Toggle featured
PATCH  /api/admin/parts/:id/verification # Update verification
```

## 🎯 Usage Examples

### Register as User
```javascript
const userData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  address: "Mumbai, India",
  role: "both",
  password: "securepassword"
};
```

### List a Part
```javascript
const partData = {
  title: "Oil Filter for Hero Honda CD100",
  vehicleCategory: "bike",
  vehicleMake: "Hero Honda",
  vehicleModel: "CD100",
  partCategory: "Engine",
  condition: "used",
  price: 250,
  description: "Good condition oil filter..."
};
```

### Search Parts
```javascript
const searchParams = {
  category: "bike",
  search: "oil filter",
  make: "Hero Honda",
  condition: "used",
  page: 1,
  limit: 12
};
```

## 🎨 Design Highlights

### Color Palette
- **Primary Blue**: `#1A56DB`
- **Light Blue**: `#EFF6FF`
- **Sky Accent**: `#38BDF8`
- **Success Green**: `#16A34A`
- **Warning Orange**: `#EA580C`

### Typography
- **Display**: Syne (bold, geometric)
- **Body**: DM Sans (clean, readable)
- **Code**: Space Mono (monospace)

### Animations
- Floating background elements
- Smooth page transitions
- Hover effects and micro-interactions
- Loading states and skeleton loaders

## 📚 Documentation

- [**Quick Start Guide**](QUICK-START.md) - Get up and running fast
- [**How to Run**](HOW-TO-RUN.md) - Detailed setup instructions
- [**Admin Guide**](ADMIN-GUIDE.md) - Complete admin documentation
- [**Setup Guide**](setup.md) - Development environment setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nishit Bhalerao**
- Email: bhaleraonishit@gmail.com
- GitHub: [@nishitbhalerao](https://github.com/nishitbhalerao)

## 🙏 Acknowledgments

- Built with ❤️ for the vintage automobile community in India
- Inspired by the need to preserve discontinued vehicle heritage
- Special thanks to all vintage vehicle enthusiasts

## 📞 Support

If you have any questions or need help:
1. Check the [documentation](docs/)
2. Open an [issue](https://github.com/nishitbhalerao/Vintage-Parts-India-/issues)
3. Contact: bhaleraonishit@gmail.com

---

**Made in India 🇮🇳 | Preserving Automotive Heritage**
