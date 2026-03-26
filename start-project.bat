@echo off
title VintageParts India - Startup Script
color 0A

echo.
echo ========================================
echo   🚀 VintageParts India Startup
echo ========================================
echo.

echo 📋 Step 1: Checking MongoDB...
net start MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB service started successfully
) else (
    echo ⚠️  MongoDB service already running or failed to start
    echo    Checking if MongoDB is accessible...
)

echo.
echo 📋 Step 2: Starting Backend Server...
echo    Opening new terminal for backend...
start "VintageParts Backend" cmd /k "cd /d %~dp0server && echo 🔧 Starting Backend Server... && npm run dev"

echo.
echo ⏳ Waiting 5 seconds for backend to initialize...
timeout /t 5 /nobreak >nul

echo.
echo 📋 Step 3: Starting Frontend Client...
echo    Opening new terminal for frontend...
start "VintageParts Frontend" cmd /k "cd /d %~dp0client && echo 🎨 Starting Frontend Client... && npm run dev"

echo.
echo ⏳ Waiting 3 seconds for frontend to initialize...
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   🎉 VintageParts India Started!
echo ========================================
echo.
echo 🌐 Frontend URL: http://localhost:3000
echo 🔧 Backend URL:  http://localhost:5000
echo 📊 API Health:   http://localhost:5000/api/health
echo.
echo 📝 Two terminal windows have opened:
echo    - Backend Server (Node.js + Express)
echo    - Frontend Client (React + Vite)
echo.
echo 💡 Tips:
echo    - Wait for both servers to fully start
echo    - Backend should show: "MongoDB Connected"
echo    - Frontend should show: "Local: http://localhost:3000"
echo    - Then open http://localhost:3000 in browser
echo.
echo 🛑 To stop servers: Press Ctrl+C in each terminal
echo.

echo Opening browser in 5 seconds...
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo.
echo Press any key to close this window...
pause >nul