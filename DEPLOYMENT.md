# HCL Landing Page - Deployment Guide

This guide will help you set up CI/CD deployment for the HCL Landing Page to a Hostinger VPS using GitHub Actions.

## 📋 Prerequisites

- Hostinger VPS with Ubuntu/Debian
- Domain name pointing to your VPS
- GitHub repository with admin access
- SSH access to your VPS

## 🚀 VPS Setup

### 1. Initial VPS Configuration

SSH into your Hostinger VPS and run the setup script:

```bash
# Download and run the setup script
curl -fsSL https://raw.githubusercontent.com/your-username/hcl-landingpage/main/scripts/setup-vps.sh | bash
```

Or manually run the script:

```bash
chmod +x scripts/setup-vps.sh
./scripts/setup-vps.sh
```

### 2. Configure Domain

Edit the Nginx configuration to use your actual domain:

```bash
sudo nano /etc/nginx/sites-available/hcl-landingpage
```

Replace `your-domain.com` with your actual domain name.

### 3. SSL Certificate (Recommended)

Install Certbot and get SSL certificate:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🔐 GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add the following secrets:

### Required Secrets

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `VPS_HOST` | Your VPS IP address or domain | `123.456.789.0` or `your-domain.com` |
| `VPS_USERNAME` | SSH username for VPS | `root` or `ubuntu` |
| `VPS_SSH_KEY` | Private SSH key for VPS access | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `VPS_PORT` | SSH port (optional, defaults to 22) | `22` |

### Application Environment Variables

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `ENABLE_INDEXING_SEO` | Enable/disable SEO indexing | `true` or `false` |
| `ADMIN_WHATSAPP_NUMBER` | Admin WhatsApp number | `+6281234567890` |
| `ADMIN_WHATSAPP_CHAT_FORMAT` | WhatsApp chat URL format | `https://wa.me/{number}?text=Hello%20from%20HCL` |
| `FIRST_CATEGORY` | Default category name | `Agrikultur` |
| `BASE_URL` | Base URL for the application | `https://pompahcl.com` |

## 🔑 SSH Key Setup

### 1. Generate SSH Key Pair (if you don't have one)

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions@your-domain.com"
```

### 2. Add Public Key to VPS

```bash
# Copy public key to VPS
ssh-copy-id -i ~/.ssh/id_rsa.pub username@your-vps-ip

# Or manually add to authorized_keys
cat ~/.ssh/id_rsa.pub | ssh username@your-vps-ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 3. Add Private Key to GitHub Secrets

Copy the private key content:

```bash
cat ~/.ssh/id_rsa
```

Add this entire content (including `-----BEGIN` and `-----END` lines) to the `VPS_SSH_KEY` secret in GitHub.

## 🚀 Deployment Process

### Automatic Deployment

The deployment will automatically trigger when you push to the `main` branch:

1. **Build Process**: Installs dependencies, runs linter, and builds the application
2. **Package Creation**: Creates a deployment package with built files
3. **VPS Deployment**: 
   - Connects to VPS via SSH
   - Backs up current deployment
   - Stops the application
   - Uploads and extracts new deployment
   - Installs production dependencies
   - Creates environment file
   - Restarts the application

### Manual Deployment

You can also trigger deployment manually:

1. Go to GitHub repository → Actions tab
2. Select "Deploy to Hostinger VPS" workflow
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

## 🔧 Troubleshooting

### Check Service Status

```bash
sudo systemctl status hcl-landingpage
```

### View Application Logs

```bash
sudo journalctl -u hcl-landingpage -f
```

### Check Nginx Status

```bash
sudo systemctl status nginx
sudo nginx -t
```

### Restart Services

```bash
sudo systemctl restart hcl-landingpage
sudo systemctl restart nginx
```

### Check Application Directory

```bash
ls -la /var/www/hcl-landingpage/
```

### Verify Environment Variables

```bash
cat /var/www/hcl-landingpage/.env.local
```

## 📁 File Structure

After deployment, your VPS will have the following structure:

```
/var/www/hcl-landingpage/
├── .next/                 # Built Next.js application
├── public/               # Static assets
├── package.json          # Dependencies
├── yarn.lock            # Lock file
├── next.config.js       # Next.js configuration
├── .env.local           # Environment variables
└── ecosystem.config.js  # PM2 configuration
```

## 🔄 Rollback Process

If you need to rollback to a previous version:

1. SSH into your VPS
2. Navigate to the application directory
3. Restore the backup:

```bash
cd /var/www/hcl-landingpage
sudo rm -rf .next
sudo mv .next.backup .next
sudo systemctl restart hcl-landingpage
```

## 📊 Monitoring

### PM2 Monitoring (if using PM2)

```bash
pm2 status
pm2 logs hcl-landingpage
pm2 monit
```

### System Resources

```bash
htop
df -h
free -h
```

## 🛡️ Security Considerations

1. **Firewall**: Configure UFW to only allow necessary ports
2. **SSH**: Use key-based authentication and disable password login
3. **Updates**: Regularly update system packages
4. **SSL**: Always use HTTPS in production
5. **Environment Variables**: Never commit sensitive data to repository

## 📞 Support

If you encounter any issues:

1. Check the GitHub Actions logs
2. Review VPS system logs
3. Verify all secrets are correctly configured
4. Ensure VPS has sufficient resources (RAM, disk space)

## 🔄 Updates

To update the deployment process:

1. Modify `.github/workflows/deploy.yml`
2. Update VPS setup script if needed
3. Test changes in a development branch first
4. Merge to main branch to deploy
