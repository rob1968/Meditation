#\!/bin/bash

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

# Install Node.js via NodeSource repository
print_status "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x  < /dev/null |  bash -
apt install -y nodejs

# Install other dependencies
apt install -y ffmpeg git

# Install MongoDB Community Edition
print_status "Installing MongoDB..."
# Import MongoDB public GPG key
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install MongoDB
apt update
apt install -y mongodb-org

# Install PM2 globally
print_status "Installing PM2 process manager..."
npm install -g pm2

# Create application directory
print_status "Creating application directory..."
mkdir -p $APP_DIR
mkdir -p $LOG_DIR

# Copy application files from current directory
print_status "Copying application files..."
cp -r backend $APP_DIR/
cp -r frontend-build $APP_DIR/frontend-build
cp ecosystem.config.js $APP_DIR/
cp .htaccess $APP_DIR/

cd $APP_DIR

# Install dependencies
print_status "Installing backend dependencies..."
cd backend && npm install

# Create production environment file
print_status "Setting up production environment..."
if [ \! -f ".env" ]; then
    cat > .env << 'ENVEOF'
# Production Environment Configuration
NODE_ENV=production
PORT=5002
HOST=127.0.0.1

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/meditation_production

# API Keys - PLEASE UPDATE THESE\!
ELEVEN_LABS_API_KEY=your_elevenlabs_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key_here
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key_here
ENVEOF
    
    print_warning "Please edit backend/.env with your actual API keys"
    print_warning "nano $APP_DIR/backend/.env"
fi

# Deploy frontend to web directory
print_status "Deploying frontend to web directory..."
rm -rf $WEB_DIR/*
cp -r ../frontend-build/* $WEB_DIR/
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

# Start MongoDB
print_status "Starting MongoDB..."
systemctl start mongod
systemctl enable mongod

# Start application with PM2
print_status "Starting application with PM2..."
cd $APP_DIR
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
pm2 startup

print_status "Deployment completed\!"
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
