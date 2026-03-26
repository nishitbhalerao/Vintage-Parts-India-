# VintageParts India 🔧

A full-stack marketplace for discontinued automobile spare parts in India. Connect buyers and sellers of rare parts for bikes and cars.

## Tech Stack

- **Frontend**: React (Vite), React Router v6, Axios, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT stored in localStorage
- **File Uploads**: Multer (local storage)

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB running locally
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd vintageParts-india
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Environment Setup

Create `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vintagepartsIndia
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Create `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the application
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

## API Endpoints

### Auth Routes (/api/auth)
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login, returns JWT |
| GET | /api/auth/me | Get current user (protected) |

### Parts Routes (/api/parts)
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/parts | Get all parts (with filters) |
| GET | /api/parts/:id | Get single part detail |
| POST | /api/parts | Add new part listing (protected) |
| PUT | /api/parts/:id | Update part (protected, owner only) |
| DELETE | /api/parts/:id | Delete part (protected, owner only) |
| GET | /api/parts/my/listings | Get parts listed by logged-in user |

## Features

- 🔍 Advanced search and filtering
- 📱 Mobile-responsive design
- 🔐 JWT authentication
- 📸 Image upload for parts
- 💬 WhatsApp integration for seller contact
- 🏍️ Support for bikes and cars
- 📊 View tracking and analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - Made in India 🇮🇳