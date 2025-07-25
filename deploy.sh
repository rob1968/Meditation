#!/bin/bash

# Meditation App Deployment Script for Ubuntu/Plesk VPS
# Run this script on your VPS server

set -e

echo "🚀 Starting deployment of Meditation App..."

# Configuration
APP_NAME="meditation-app"
DOMAIN="pihappy.me"
APP_DIR="/var/www/vhosts/$DOMAIN/meditation-app"
WEB_DIR="/var/www/vhosts/$DOMAIN/httpdocs"
LOG_DIR="/var/www/vhosts/$DOMAIN/logs"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Install required system packages
print_status "Installing system dependencies..."
apt update
apt install -y nodejs npm mongodb ffmpeg git

# Install PM2 globally
print_status "Installing PM2 process manager..."
npm install -g pm2

# Create application directory
print_status "Creating application directory..."
mkdir -p $APP_DIR
mkdir -p $LOG_DIR

# Clone or update repository (you'll need to replace with your actual repo)
if [ -d "$APP_DIR/.git" ]; then
    print_status "Updating existing repository..."
    cd $APP_DIR
    git pull origin main
else
    print_status "Cloning repository..."
    # Replace with your actual repository URL
    print_warning "Please manually clone your repository to $APP_DIR"
    echo "git clone https://github.com/yourusername/meditation-app.git $APP_DIR"
fi

cd $APP_DIR

# Install dependencies
print_status "Installing backend dependencies..."
cd backend && npm install

print_status "Installing frontend dependencies..."
cd ../frontend && npm install

# Create production environment file
print_status "Setting up production environment..."
cd ../backend
if [ ! -f ".env" ]; then
    cp .env.production.template .env
    print_warning "Please edit backend/.env with your actual API keys and database configuration"
    print_warning "nano $APP_DIR/backend/.env"
fi

# Build frontend for production
print_status "Building frontend for production..."
cd ../frontend
npm run build:production

# Copy built frontend to web directory
print_status "Deploying frontend to web directory..."
rm -rf $WEB_DIR/*
cp -r build/* $WEB_DIR/
cp ../.htaccess $WEB_DIR/

# Set proper permissions
print_status "Setting file permissions..."
chown -R www-data:www-data $WEB_DIR
chown -R www-data:www-data $APP_DIR
chmod -R 755 $WEB_DIR

# Create temp directories
print_status "Creating temp directories..."
mkdir -p $APP_DIR/temp
mkdir -p $APP_DIR/logs
chown -R www-data:www-data $APP_DIR/temp
chown -R www-data:www-data $APP_DIR/logs

# Start MongoDB if not running
print_status "Starting MongoDB..."
systemctl start mongodb
systemctl enable mongodb

# Start application with PM2
print_status "Starting application with PM2..."
cd $APP_DIR
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
pm2 startup

print_status "Deployment completed!"
echo ""
echo "🎉 Your Meditation App should now be running at https://$DOMAIN"
echo ""
echo "📋 Next steps:"
echo "1. Edit $APP_DIR/backend/.env with your API keys"
echo "2. Restart the application: pm2 restart meditation-backend"
echo "3. Configure SSL certificate in Plesk panel"
echo "4. Test the application at https://$DOMAIN"
echo ""
echo "📊 Useful commands:"
echo "- Check application status: pm2 status"
echo "- View logs: pm2 logs meditation-backend"
echo "- Restart application: pm2 restart meditation-backend"
echo "- Stop application: pm2 stop meditation-backend"