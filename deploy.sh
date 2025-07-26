#!/bin/bash

# Deployment script for Vercel

echo "🚀 Deploying Purna Boyapati Portfolio to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && yarn install && cd ..

# Build the frontend
echo "🔨 Building frontend..."
cd frontend && yarn build && cd ..

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📋 Your portfolio is now live!"
echo ""
echo "🔗 Next steps:"
echo "1. Visit your deployment URL"
echo "2. Test the JSON Resume download feature"
echo "3. Verify contact form functionality"
echo "4. Check all portfolio sections"
echo ""
echo "📊 Features deployed:"
echo "   ✅ Professional portfolio showcase"
echo "   ✅ JSON Resume format download"
echo "   ✅ Contact form with file storage"
echo "   ✅ Responsive design"
echo "   ✅ Modern UI with animations"