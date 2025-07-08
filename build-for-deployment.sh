#!/bin/bash

echo "🚀 Preparing project for lh.pl deployment..."

# Step 1: Build frontend
echo "📦 Building frontend..."
npm run build

# Step 2: Install backend dependencies for production
echo "📦 Installing backend dependencies..."
cd server
npm install --production

# Step 3: Create deployment package
echo "📁 Creating deployment package..."
cd ..
mkdir -p deploy

# Copy built frontend
cp -r dist deploy/

# Copy backend files
cp -r server deploy/
cp package.json deploy/
cp README.md deploy/
cp DEPLOYMENT.md deploy/

# Copy environment example
cp server/.env.production deploy/server/.env.example

echo "✅ Deployment package ready in 'deploy' folder!"
echo ""
echo "📋 Next steps for lh.pl hosting:"
echo "1. Upload contents of 'deploy' folder to your lh.pl hosting"
echo "2. Set environment variables in hosting panel"
echo "3. Configure Node.js app to run 'server/index.js'"
echo "4. Set up SSL certificate for HTTPS (required for PayU)"
echo "5. Configure domain and test the application"
echo ""
echo "📚 See DEPLOYMENT.md for detailed instructions"
