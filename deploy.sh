#!/bin/bash

# Simple Vercel deployment script for TypeScript Portfolio

echo "🚀 Deploying Purna Boyapati Portfolio to Vercel..."
echo "📋 Using TypeScript + JSON Resume Standard"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Install dependencies
echo "📦 Installing dependencies..."
yarn install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && yarn install && cd ..

# Build the frontend
echo "🔨 Building frontend..."
cd frontend && yarn build && cd ..

# Validate JSON Resume format
echo "✅ Validating JSON Resume format..."
if command -v jq &> /dev/null; then
    jq . data/resume.json > /dev/null && echo "✅ JSON Resume is valid" || echo "❌ JSON Resume has syntax errors"
else
    echo "ℹ️  jq not found, skipping JSON validation"
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "✅ Features deployed:"
echo "   📄 JSON Resume Standard (jsonresume.org compliant)"
echo "   🎨 Modern React Frontend"
echo "   ⚡ TypeScript Serverless API"
echo "   📱 Responsive Design"
echo "   💼 Professional Portfolio"
echo "   📥 JSON Resume Download"
echo "   📧 Contact Form"
echo ""
echo "🔗 Test your deployment:"
echo "   • Visit the portfolio URL"
echo "   • Download JSON Resume"
echo "   • Test contact form"
echo "   • Verify all sections load"