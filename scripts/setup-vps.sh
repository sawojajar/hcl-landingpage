#!/bin/bash

# VPS Setup Script for HCL Landing Page
# Run this script on your Hostinger VPS to prepare it for deployment

set -e

echo "🚀 Setting up VPS for HCL Landing Page deployment..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
echo "📦 Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
echo "📦 Installing Yarn..."
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn -y

# Install PM2 for process management
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install nginx -y

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/hcl-landingpage
sudo chown -R $USER:$USER /var/www/hcl-landingpage

# Create PM2 ecosystem file
echo "⚙️ Creating PM2 ecosystem configuration..."
sudo tee /var/www/hcl-landingpage/ecosystem.config.js > /dev/null <<EOF
module.exports = {
  apps: [{
    name: 'hcl-landingpage',
    script: 'yarn',
    args: 'start',
    cwd: '/var/www/hcl-landingpage',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Create systemd service file
echo "⚙️ Creating systemd service..."
sudo tee /etc/systemd/system/hcl-landingpage.service > /dev/null <<EOF
[Unit]
Description=HCL Landing Page
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/hcl-landingpage
ExecStart=/usr/bin/yarn start
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF

# Configure Nginx
echo "⚙️ Configuring Nginx..."
sudo tee /etc/nginx/sites-available/hcl-landingpage > /dev/null <<EOF
server {
    listen 80;
    server_name pompahcl.com www.pompahcl.com;  # Replace with your actual domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/hcl-landingpage /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Enable services
sudo systemctl enable hcl-landingpage
sudo systemctl enable nginx

echo "✅ VPS setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Replace 'pompahcl.com' in /etc/nginx/sites-available/hcl-landingpage with your actual domain"
echo "2. Configure SSL certificate (recommended: Let's Encrypt)"
echo "3. Set up GitHub repository secrets"
echo "4. Push to main branch to trigger deployment"
echo ""
echo "🔧 Useful commands:"
echo "- Check service status: sudo systemctl status hcl-landingpage"
echo "- View logs: sudo journalctl -u hcl-landingpage -f"
echo "- Restart service: sudo systemctl restart hcl-landingpage"
echo "- Test Nginx: sudo nginx -t"
echo "- Reload Nginx: sudo systemctl reload nginx"
