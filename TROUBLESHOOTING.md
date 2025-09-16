# GitHub Actions Deployment Troubleshooting

## 🚨 Common Issues and Solutions

### Issue: Deployment Stops After "Create deployment package"

This usually means the SSH connection to your VPS is failing. Here's how to fix it:

## 🔍 Step 1: Check GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** and verify you have these secrets:

### Required Secrets Checklist:
- [ ] `VPS_HOST` - Your VPS IP address (e.g., `123.456.789.0`)
- [ ] `VPS_USERNAME` - SSH username (usually `root` or `ubuntu`)
- [ ] `VPS_SSH_KEY` - Your private SSH key (entire content including `-----BEGIN` and `-----END`)
- [ ] `VPS_PORT` - SSH port (optional, defaults to 22)

### Application Secrets:
- [ ] `ENABLE_INDEXING_SEO` - `true` or `false`
- [ ] `ADMIN_WHATSAPP_NUMBER` - Your WhatsApp number with country code
- [ ] `ADMIN_WHATSAPP_CHAT_FORMAT` - WhatsApp URL format
- [ ] `FIRST_CATEGORY` - `Agrikultur`
- [ ] `BASE_URL` - `https://pompahcl.com`

## 🔧 Step 2: Test SSH Connection Manually

Test if you can connect to your VPS from your local machine:

```bash
# Test SSH connection
ssh -i ~/.ssh/id_rsa username@your-vps-ip

# If this fails, the issue is with your SSH setup
```

## 🔧 Step 3: Verify SSH Key Format

The `VPS_SSH_KEY` secret must contain the **entire private key**:

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
... (entire key content) ...
-----END OPENSSH PRIVATE KEY-----
```

**Common mistakes:**
- Missing `-----BEGIN` or `-----END` lines
- Extra spaces or line breaks
- Only copying part of the key
- Using the public key instead of private key

## 🔧 Step 4: Check VPS SSH Configuration

SSH into your VPS and verify:

```bash
# Check if SSH service is running
sudo systemctl status ssh

# Check authorized_keys file
cat ~/.ssh/authorized_keys

# Check file permissions
ls -la ~/.ssh/
```

**Correct permissions:**
- `~/.ssh/` directory: `700`
- `~/.ssh/authorized_keys` file: `600`

## 🔧 Step 5: Fix Common SSH Issues

### Issue: Permission denied (publickey)

```bash
# On your VPS, fix permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Make sure your public key is in authorized_keys
echo "your-public-key-content" >> ~/.ssh/authorized_keys
```

### Issue: Connection refused

```bash
# Check if SSH is running
sudo systemctl start ssh
sudo systemctl enable ssh

# Check firewall
sudo ufw status
sudo ufw allow ssh
```

### Issue: Wrong username

Try different common usernames:
- `root`
- `ubuntu`
- `admin`
- `user`

## 🔧 Step 6: Test with Improved Workflow

I'll create an improved workflow with better error handling and debugging. The new workflow will:

1. Test SSH connection first
2. Provide detailed error messages
3. Show what secrets are missing
4. Give step-by-step debugging info

## 🚀 Quick Fix Commands

If you need to regenerate your SSH key:

```bash
# Generate new SSH key
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Copy private key to GitHub Secrets
cat ~/.ssh/id_rsa

# Copy public key to VPS
cat ~/.ssh/id_rsa.pub
```

## 📋 Debug Checklist

Before running the deployment again:

- [ ] All GitHub secrets are configured
- [ ] SSH key format is correct (private key with BEGIN/END lines)
- [ ] Public key is in VPS `authorized_keys`
- [ ] SSH service is running on VPS
- [ ] File permissions are correct (700 for .ssh, 600 for authorized_keys)
- [ ] VPS IP address is correct
- [ ] Username is correct
- [ ] Port is correct (usually 22)

## 🔍 Advanced Debugging

If you're still having issues, check the GitHub Actions logs:

1. Go to your repository → **Actions** tab
2. Click on the failed workflow run
3. Click on the failed job
4. Look for error messages in the "Deploy to VPS" step

Common error messages:
- `Permission denied (publickey)` - SSH key issue
- `Connection refused` - SSH service not running
- `Host key verification failed` - SSH host key issue
- `No such file or directory` - Path issues

## 📞 Still Need Help?

If you're still stuck:

1. Share the exact error message from GitHub Actions logs
2. Verify all secrets are correctly set
3. Test SSH connection manually from your local machine
4. Check if your VPS has the required software installed

## 🛠️ Alternative: Manual Deployment

If GitHub Actions continues to fail, you can deploy manually:

```bash
# Build locally
yarn build

# Create deployment package
tar -czf deployment.tar.gz .next public package.json yarn.lock next.config.js tsconfig.json

# Upload to VPS
scp deployment.tar.gz username@your-vps-ip:/var/www/hcl-landingpage/

# SSH into VPS and extract
ssh username@your-vps-ip
cd /var/www/hcl-landingpage
tar -xzf deployment.tar.gz
yarn install --production
sudo systemctl restart hcl-landingpage
```

