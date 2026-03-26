@echo off
echo 🚀 Starting VintageParts India Development Servers...
echo.

echo 📋 Checking MongoDB...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MongoDB not found! Please install MongoDB first.
    echo 📥 Download from: https://www.mongodb.com/try/download/community
    echo.
    pause
    exit /b 1
)

echo ✅ MongoDB found!
echo.

echo 🔧 Starting Backend Server...
start "VintageParts Backend" cmd /k "cd server && npm run dev"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo 🎨 Starting Frontend Client...
start "VintageParts Frontend" cmd /k "cd client && npm run dev"

echo.
echo 🎉 Both servers are starting!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5000
echo.
echo Press any key to exit...
pause >nul