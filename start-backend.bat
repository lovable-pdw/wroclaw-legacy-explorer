@echo off
echo 🔧 Starting BACKEND ONLY...
echo.
echo 📋 Backend server will run on: http://localhost:3001
echo 🧪 PayU Sandbox mode enabled
echo 💡 Auto-restart on file changes
echo.
echo API Endpoints:
echo   - POST /api/create-order
echo   - GET /api/order-status/:orderId  
echo   - POST /api/payu-webhook
echo.
echo Press Ctrl+C to stop
echo.
pause

cd server
npm run dev
