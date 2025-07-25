#!/bin/bash

# Production Build Script for Meditation App
# Run this script to build the application for production deployment

set -e

echo "🏗️ Building Meditation App for production..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    print_warning "This script must be run from the root of the meditation app directory"
    exit 1
fi

# Install dependencies if node_modules don't exist
print_info "Checking dependencies..."

if [ ! -d "backend/node_modules" ]; then
    print_status "Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    print_status "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Create production environment files if they don't exist
print_info "Checking environment configuration..."

if [ ! -f "backend/.env" ]; then
    print_warning "Creating backend .env from template..."
    cp backend/.env.production.template backend/.env
    print_warning "Please edit backend/.env with your production API keys!"
fi

# Build frontend for production
print_status "Building frontend for production..."
cd frontend
npm run build:production
cd ..

# Create deployment package directory
print_status "Creating deployment package..."
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="meditation-app-${TIMESTAMP}"
PACKAGE_DIR="dist/${PACKAGE_NAME}"

mkdir -p "$PACKAGE_DIR"

# Copy necessary files for deployment
print_status "Packaging application files..."

# Backend files
cp -r backend "$PACKAGE_DIR/"
# Remove development node_modules to save space
rm -rf "$PACKAGE_DIR/backend/node_modules"

# Frontend build
cp -r frontend/build "$PACKAGE_DIR/frontend-build"

# Configuration files
cp ecosystem.config.js "$PACKAGE_DIR/"
cp deploy.sh "$PACKAGE_DIR/"
cp .htaccess "$PACKAGE_DIR/"

# Package.json for root-level scripts
cp package.json "$PACKAGE_DIR/"

# Create README for deployment
cat > "$PACKAGE_DIR/DEPLOYMENT_README.md" << EOF
# Meditation App Deployment Package

This package contains everything needed to deploy the Meditation App to your VPS.

## Quick Deployment Steps:

1. Upload this entire folder to your VPS
2. Run: \`sudo ./deploy.sh\`
3. Edit \`backend/.env\` with your API keys
4. Restart: \`pm2 restart meditation-backend\`

## What's Included:

- \`backend/\` - Node.js backend application
- \`frontend-build/\` - Built React frontend (ready for production)
- \`ecosystem.config.js\` - PM2 process manager configuration
- \`deploy.sh\` - Automated deployment script
- \`.htaccess\` - Apache configuration for reverse proxy

## Requirements:

- Ubuntu/Debian VPS with root access
- Domain pointing to your server (pihappy.me)
- Plesk panel (optional, but recommended)

## API Keys Needed:

- ELEVEN_LABS_API_KEY
- ANTHROPIC_API_KEY
- GOOGLE_CLOUD_API_KEY (optional)
- MongoDB connection string

Built on: $(date)
EOF

# Create archive
print_status "Creating deployment archive..."
cd dist
tar -czf "${PACKAGE_NAME}.tar.gz" "$PACKAGE_NAME"
cd ..

print_status "Production build completed!"
echo ""
print_info "📦 Deployment package created: dist/${PACKAGE_NAME}.tar.gz"
print_info "📁 Uncompressed package: dist/${PACKAGE_NAME}/"
echo ""
print_info "🚀 To deploy:"
print_info "1. Upload dist/${PACKAGE_NAME}.tar.gz to your VPS"
print_info "2. Extract: tar -xzf ${PACKAGE_NAME}.tar.gz"
print_info "3. Run: sudo ./${PACKAGE_NAME}/deploy.sh"
print_info "4. Configure your API keys in backend/.env"
print_info "5. Restart: pm2 restart meditation-backend"