# Netlify Deployment Script for VintageParts India
# This script will deploy your frontend to Netlify

Write-Host "
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║                  🚀 NETLIFY DEPLOYMENT SCRIPT                             ║
║                                                                            ║
║                  VintageParts India Frontend Deployment                    ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
" -ForegroundColor Green

# Step 1: Check if logged in
Write-Host "`n📋 Step 1: Checking Netlify authentication..." -ForegroundColor Cyan
$status = netlify status 2>&1
if ($status -like "*Not logged in*") {
    Write-Host "❌ Not logged in to Netlify" -ForegroundColor Red
    Write-Host "`n🔐 Please login to Netlify:" -ForegroundColor Yellow
    Write-Host "   Run: netlify login" -ForegroundColor White
    Write-Host "`n   Email: nishitbhalrao@gmail.com" -ForegroundColor White
    Write-Host "`n   Then run this script again." -ForegroundColor White
    exit 1
} else {
    Write-Host "✅ Logged in to Netlify" -ForegroundColor Green
}

# Step 2: Build frontend
Write-Host "`n📦 Step 2: Building frontend..." -ForegroundColor Cyan
Set-Location client
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful" -ForegroundColor Green
Set-Location ..

# Step 3: Deploy to Netlify
Write-Host "`n🚀 Step 3: Deploying to Netlify..." -ForegroundColor Cyan
netlify deploy --prod

Write-Host "`n
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║                  ✅ DEPLOYMENT COMPLETE!                                  ║
║                                                                            ║
║              Your site is now live on Netlify!                             ║
║                                                                            ║
║              Check the URL above to access your site.                      ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
" -ForegroundColor Green
