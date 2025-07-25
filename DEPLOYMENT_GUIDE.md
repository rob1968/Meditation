# 🚀 Meditation App Deployment Guide

Complete guide for deploying the Meditation App to your VPS with Ubuntu and Plesk at https://pihappy.me

## 📋 Prerequisites

- Ubuntu VPS with root access
- Domain `pihappy.me` pointing to your server
- Plesk panel (optional but recommended)
- Basic command line knowledge

## 🎯 Quick Start (Automated Deployment)

### Option 1: Automated Script Deployment

1. **Build the production package locally:**
   ```bash
   ./build-production.sh
   ```

2. **Upload to your VPS:**
   ```bash
   # Upload the generated tar.gz file to your server
   scp dist/meditation-app-*.tar.gz root@pihappy.me:/tmp/
   ```

3. **Deploy on server:**
   ```bash
   ssh root@pihappy.me
   cd /tmp
   tar -xzf meditation-app-*.tar.gz
   cd meditation-app-*
   sudo ./deploy.sh
   ```

4. **Configure API keys:**
   ```bash
   nano /var/www/vhosts/pihappy.me/meditation-app/backend/.env
   pm2 restart meditation-backend
   ```

## 🔧 Manual Step-by-Step Deployment

### Step 1: Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y nodejs npm mongodb ffmpeg git nginx

# Install PM2 globally
sudo npm install -g pm2
```

### Step 2: Setup Application

```bash
# Create directory structure
sudo mkdir -p /var/www/vhosts/pihappy.me/meditation-app
sudo mkdir -p /var/www/vhosts/pihappy.me/httpdocs
sudo mkdir -p /var/www/vhosts/pihappy.me/logs

# Clone your repository (replace with your actual repo)
cd /var/www/vhosts/pihappy.me/meditation-app
# git clone https://github.com/yourusername/meditation-app.git .

# Or upload files manually
```

### Step 3: Backend Setup

```bash
cd /var/www/vhosts/pihappy.me/meditation-app/backend

# Install dependencies
npm install

# Create environment file
cp .env.production.template .env

# Edit with your actual values
nano .env
```

**Required environment variables:**
```env
NODE_ENV=production
PORT=5002
HOST=127.0.0.1
MONGODB_URI=mongodb://localhost:27017/meditation_production
ELEVEN_LABS_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
GOOGLE_CLOUD_API_KEY=your_key_here
```

### Step 4: Frontend Setup

```bash
cd /var/www/vhosts/pihappy.me/meditation-app/frontend

# Install dependencies
npm install

# Build for production
npm run build:production

# Deploy to web directory
sudo cp -r build/* /var/www/vhosts/pihappy.me/httpdocs/
sudo cp ../.htaccess /var/www/vhosts/pihappy.me/httpdocs/
```

### Step 5: Database Setup

```bash
# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Verify MongoDB is running
sudo systemctl status mongodb
```

### Step 6: Process Management

```bash
cd /var/www/vhosts/pihappy.me/meditation-app

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
pm2 startup
```

### Step 7: Web Server Configuration

#### Option A: Apache (Plesk Default)

If using Plesk, the `.htaccess` file should handle everything automatically. Ensure these Apache modules are enabled:
- mod_rewrite
- mod_proxy
- mod_proxy_http

#### Option B: Nginx (Alternative)

```bash
# Copy nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/pihappy.me

# Enable site
sudo ln -s /etc/nginx/sites-available/pihappy.me /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### Step 8: SSL Certificate

#### Using Plesk:
1. Go to Plesk panel → Domains → pihappy.me → SSL/TLS Certificates
2. Request a Let's Encrypt certificate

#### Using Certbot (manual):
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d pihappy.me -d www.pihappy.me
```

### Step 9: Permissions

```bash
# Set proper ownership
sudo chown -R www-data:www-data /var/www/vhosts/pihappy.me/httpdocs
sudo chown -R www-data:www-data /var/www/vhosts/pihappy.me/meditation-app

# Set permissions
sudo chmod -R 755 /var/www/vhosts/pihappy.me/httpdocs
sudo chmod -R 755 /var/www/vhosts/pihappy.me/meditation-app

# Create temp directories
sudo mkdir -p /var/www/vhosts/pihappy.me/meditation-app/temp
sudo chown -R www-data:www-data /var/www/vhosts/pihappy.me/meditation-app/temp
```

## 🔍 Verification

1. **Check application status:**
   ```bash
   pm2 status
   pm2 logs meditation-backend
   ```

2. **Test API endpoint:**
   ```bash
   curl https://pihappy.me/api/health
   ```

3. **Visit your app:**
   Open https://pihappy.me in your browser

## 📊 Monitoring & Management

### Useful PM2 Commands
```bash
pm2 status                    # Check application status
pm2 logs meditation-backend   # View logs
pm2 restart meditation-backend # Restart application
pm2 stop meditation-backend   # Stop application
pm2 delete meditation-backend # Remove from PM2
```

### Log Files
- PM2 logs: `pm2 logs`
- Application logs: `/var/www/vhosts/pihappy.me/meditation-app/logs/`
- Nginx logs: `/var/log/nginx/`
- MongoDB logs: `/var/log/mongodb/`

### Updating the Application
```bash
# Pull latest changes
cd /var/www/vhosts/pihappy.me/meditation-app
git pull origin main

# Update backend
cd backend && npm install

# Update frontend
cd ../frontend && npm install && npm run build:production
sudo cp -r build/* /var/www/vhosts/pihappy.me/httpdocs/

# Restart application
pm2 restart meditation-backend
```

## 🚨 Troubleshooting

### Common Issues

1. **Port 5002 already in use:**
   ```bash
   sudo lsof -i :5002
   sudo kill -9 <PID>
   ```

2. **Permission denied errors:**
   ```bash
   sudo chown -R www-data:www-data /var/www/vhosts/pihappy.me/
   ```

3. **MongoDB connection failed:**
   ```bash
   sudo systemctl restart mongodb
   sudo systemctl status mongodb
   ```

4. **FFmpeg not found:**
   ```bash
   sudo apt install -y ffmpeg
   which ffmpeg  # Should return /usr/bin/ffmpeg
   ```

5. **API keys not working:**
   - Check `.env` file formatting
   - Ensure no extra spaces around `=`
   - Restart PM2 after changes: `pm2 restart meditation-backend`

### Checking Logs
```bash
# Application logs
pm2 logs meditation-backend --lines 100

# System logs
sudo journalctl -u nginx -f
sudo journalctl -u mongodb -f

# Check disk space
df -h

# Check memory usage
free -h
```

## 🔐 Security Considerations

1. **Firewall Setup:**
   ```bash
   sudo ufw enable
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   ```

2. **Regular Updates:**
   ```bash
   sudo apt update && sudo apt upgrade
   npm audit fix
   ```

3. **Backup Strategy:**
   - Database: `mongodump --db meditation_production`
   - Application files: Regular git pushes
   - Environment files: Secure backup of `.env`

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Verify all environment variables are set
3. Ensure all services are running
4. Check file permissions
5. Test individual components (MongoDB, Node.js, Nginx)

Your Meditation App should now be live at https://pihappy.me! 🎉