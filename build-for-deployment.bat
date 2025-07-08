@echo off
echo 🚀 Preparing project for lh.pl deployment...

:: Step 1: Build frontend
echo 📦 Building frontend...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)

:: Step 2: Install backend dependencies for production
echo 📦 Installing backend dependencies...
cd server
call npm install --production
if %ERRORLEVEL% neq 0 (
    echo ❌ Backend dependencies installation failed!
    pause
    exit /b 1
)

:: Step 3: Create deployment package
echo 📁 Creating deployment package...
cd ..
if exist deploy rmdir /s /q deploy
mkdir deploy

:: Copy built frontend
xcopy /e /i /y dist deploy\dist

:: Copy backend files
xcopy /e /i /y server deploy\server
copy package.json deploy\
copy README.md deploy\
copy DEPLOYMENT.md deploy\

:: Copy environment example
copy server\.env.production deploy\server\.env.example

echo.
echo ✅ Deployment package ready in 'deploy' folder!
echo.
echo 📋 Next steps for lh.pl hosting:
echo 1. Upload contents of 'deploy' folder to your lh.pl hosting
echo 2. Set environment variables in hosting panel
echo 3. Configure Node.js app to run 'server/index.js'
echo 4. Set up SSL certificate for HTTPS (required for PayU)
echo 5. Configure domain and test the application
echo.
echo 📚 See DEPLOYMENT.md for detailed instructions
echo.
pause
