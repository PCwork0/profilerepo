#!/bin/bash

# Purna Portfolio - Frontend Deployment Script
# Deploys to Vercel with JSON Resume integration

echo "🚀 Deploying Purna Portfolio to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📄 Your portfolio is now live!"
echo "🔗 JSON Resume available at: https://your-domain.vercel.app/resume.json"