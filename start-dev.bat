@echo off
echo 🚀 Starting development environment...
echo.
echo 📋 This will start:
echo   - Frontend (React + Vite) on http://localhost:8080
echo   - Backend (Node.js + Express) on http://localhost:3001
echo   - PayU integration in SANDBOX mode
echo.
echo 🧪 PayU Sandbox credentials are configured
echo 💡 Any changes to code will auto-reload
echo.
echo Press Ctrl+C to stop both servers
echo.
pause

echo Starting both frontend and backend...
npm run dev:full
