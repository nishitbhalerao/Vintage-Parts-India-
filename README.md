# 🔧 VintageParts India - Marketplace for Discontinued Auto Parts

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5+-green.svg)](https://mongodb.com/)

> India's first marketplace connecting buyers and sellers of discontinued automobile spare parts for bikes and cars.

![VintageParts India](https://via.placeholder.com/800x400/1A56DB/FFFFFF?text=VintageParts+India+🔧)

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
- Node.js (v16+)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nishitbhalerao/Vintage-Parts-India-.git
cd Vintage-Parts-India-
```

2. **Install dependencies**
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. **Environment Setup**

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/vintagepartsIndia
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start the application**
```bash
# Method 1: Automated (Windows)
start-project.bat

# Method 2: Manual
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

5. **Access the application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: Login with admin credentials

## 🛡️ Admin Access

### Admin Credentials
- **Email**: `bhaleraonishit@gmail.com`
- **Password**: `Nishit@1098`

### Admin Features
- 👥 **User Management**: View, search, delete users
- 📦 **Parts Management**: Feature, verify, delete parts
- ⭐ **Featured Parts**: Highlight genuine products
- ✅ **Verification System**: Approve/reject with notes
- 📊 **Analytics**: Platform statistics and trends

## 📱 Tech Stack

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