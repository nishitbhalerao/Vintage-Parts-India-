# VintageParts India - PowerShell Startup Script

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   🚀 VintageParts India Startup" -ForegroundColor Green  
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Step 1: Check and start MongoDB
Write-Host "📋 Step 1: Checking MongoDB..." -ForegroundColor Yellow
try {
    $mongoService = Get-Service -Name "MongoDB" -ErrorAction Stop
    if ($mongoService.Status -eq "Running") {
        Write-Host "✅ MongoDB is already running" -ForegroundColor Green
    } else {
        Write-Host "🔄 Starting MongoDB service..." -ForegroundColor Yellow
        Start-Service -Name "MongoDB"
        Write-Host "✅ MongoDB service started" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  MongoDB service not found. Please ensure MongoDB is installed." -ForegroundColor Red
    Write-Host "   Download from: https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
}

# Step 2: Start Backend Server
Write-Host ""
Write-Host "📋 Step 2: Starting Backend Server..." -ForegroundColor Yellow
$backendPath = Join-Path $PSScriptRoot "server"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host '🔧 Starting Backend Server...' -ForegroundColor Cyan; npm run dev" -WindowStyle Normal

# Step 3: Wait and start Frontend
Write-Host "⏳ Waiting 5 seconds for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "📋 Step 3: Starting Frontend Client..." -ForegroundColor Yellow
$frontendPath = Join-Path $PSScriptRoot "client"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host '🎨 Starting Frontend Client...' -ForegroundColor Cyan; npm run dev" -WindowStyle Normal

# Final instructions
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   🎉 VintageParts India Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Frontend URL: " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend URL:  " -NoNewline -ForegroundColor White  
Write-Host "http://localhost:5000" -ForegroundColor Cyan
Write-Host "📊 API Health:   " -NoNewline -ForegroundColor White
Write-Host "http://localhost:5000/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Two PowerShell windows have opened:" -ForegroundColor Yellow
Write-Host "   - Backend Server (Node.js + Express)" -ForegroundColor White
Write-Host "   - Frontend Client (React + Vite)" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "   - Wait for both servers to fully start" -ForegroundColor White
Write-Host "   - Backend should show: 'MongoDB Connected'" -ForegroundColor White
Write-Host "   - Frontend should show: 'Local: http://localhost:3000'" -ForegroundColor White
Write-Host "   - Then open http://localhost:3000 in browser" -ForegroundColor White
Write-Host ""
Write-Host "🛑 To stop servers: Press Ctrl+C in each PowerShell window" -ForegroundColor Red
Write-Host ""

# Wait and open browser
Write-Host "Opening browser in 5 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")