# SSH Key Setup Guide for VPS Deployment

This guide will help you generate and configure SSH keys for secure VPS access from GitHub Actions.

## 🔑 Method 1: Using the Generated Script (Recommended)

### Step 1: Run the SSH Key Generation Script

```bash
./scripts/generate-ssh-key.sh
```

This script will:
- Generate a new SSH key pair (if one doesn't exist)
- Display both private and public keys
- Set proper file permissions
- Provide next steps

### Step 2: Copy the Private Key to GitHub Secrets

1. Copy the **PRIVATE key** content from the script output
2. Go to your GitHub repository
3. Navigate to **Settings** → **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `VPS_SSH_KEY`
6. Value: Paste the entire private key content (including `-----BEGIN` and `-----END` lines)
7. Click **Add secret**

### Step 3: Add Public Key to Your VPS

1. Copy the **PUBLIC key** content from the script output
2. SSH into your VPS:
   ```bash
   ssh username@your-vps-ip
   ```
3. Create SSH directory and add the public key:
   ```bash
   mkdir -p ~/.ssh
   echo "your-public-key-content-here" >> ~/.ssh/authorized_keys
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/authorized_keys
   ```

## 🔑 Method 2: Manual SSH Key Generation

### Step 1: Generate SSH Key Pair

```bash
# Generate a new SSH key
ssh-keygen -t rsa -b 4096 -C "github-actions-$(date +%Y%m%d)"

# When prompted:
# - Press Enter to save to default location (~/.ssh/id_rsa)
# - Press Enter twice for no passphrase (or set a passphrase if preferred)
```

### Step 2: Display Your Keys

```bash
# Display private key (copy this to GitHub Secrets)
cat ~/.ssh/id_rsa

# Display public key (copy this to VPS)
cat ~/.ssh/id_rsa.pub
```

### Step 3: Add to GitHub Secrets

1. Copy the private key content:
   ```bash
   cat ~/.ssh/id_rsa
   ```
2. Go to GitHub repository → Settings → Secrets and variables → Actions
3. Add new secret:
   - Name: `VPS_SSH_KEY`
   - Value: The entire private key content

### Step 4: Add to VPS

1. Copy the public key content:
   ```bash
   cat ~/.ssh/id_rsa.pub
   ```
2. SSH into your VPS and add it:
   ```bash
   ssh username@your-vps-ip
   mkdir -p ~/.ssh
   echo "your-public-key-content" >> ~/.ssh/authorized_keys
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/authorized_keys
   ```

## 🔑 Method 3: Using ssh-copy-id (Easiest)

If you already have SSH access to your VPS:

```bash
# This will automatically copy your public key to the VPS
ssh-copy-id username@your-vps-ip

# Then copy your private key to GitHub Secrets
cat ~/.ssh/id_rsa
```

## 🧪 Testing Your SSH Connection

Test that your SSH key works:

```bash
# Test SSH connection
ssh -i ~/.ssh/id_rsa username@your-vps-ip

# If successful, you should be logged in without entering a password
```

## 📋 Complete GitHub Secrets Checklist

Make sure you have all these secrets configured in GitHub:

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `VPS_HOST` | VPS IP address or domain | From your Hostinger control panel |
| `VPS_USERNAME` | SSH username | Usually `root` or `ubuntu` |
| `VPS_SSH_KEY` | Private SSH key | Generated using methods above |
| `VPS_PORT` | SSH port (optional) | Usually `22` |
| `ENABLE_INDEXING_SEO` | SEO setting | `true` or `false` |
| `ADMIN_WHATSAPP_NUMBER` | WhatsApp number | Your WhatsApp number with country code |
| `ADMIN_WHATSAPP_CHAT_FORMAT` | WhatsApp URL format | URL format for WhatsApp links |
| `FIRST_CATEGORY` | Default category | `Agrikultur` |
| `BASE_URL` | Base URL | `https://pompahcl.com` |

## 🔧 Troubleshooting

### SSH Connection Issues

1. **Permission denied (publickey)**:
   ```bash
   # Check if public key is in authorized_keys
   ssh username@your-vps-ip "cat ~/.ssh/authorized_keys"
   
   # Check file permissions
   ssh username@your-vps-ip "ls -la ~/.ssh/"
   ```

2. **Connection refused**:
   - Check if SSH service is running: `sudo systemctl status ssh`
   - Verify VPS IP address and port
   - Check firewall settings

3. **Key format issues**:
   - Ensure private key includes `-----BEGIN` and `-----END` lines
   - No extra spaces or line breaks
   - Copy the entire key content

### GitHub Actions Issues

1. **SSH key not working in GitHub Actions**:
   - Verify the private key is correctly copied to `VPS_SSH_KEY` secret
   - Check that there are no extra characters or line breaks
   - Ensure the public key is in the VPS `authorized_keys` file

2. **Permission denied in deployment**:
   - Check VPS username in `VPS_USERNAME` secret
   - Verify the user has proper permissions on `/var/www/hcl-landingpage`

## 🔒 Security Best Practices

1. **Use a dedicated SSH key** for GitHub Actions (not your personal key)
2. **Set proper file permissions**:
   ```bash
   chmod 600 ~/.ssh/id_rsa
   chmod 644 ~/.ssh/id_rsa.pub
   chmod 700 ~/.ssh
   ```
3. **Disable password authentication** on your VPS (after setting up key-based auth)
4. **Use a passphrase** for your SSH key if possible
5. **Regularly rotate SSH keys** for security

## 📞 Need Help?

If you're still having issues:

1. Check the GitHub Actions logs for specific error messages
2. Test SSH connection manually from your local machine
3. Verify all secrets are correctly configured
4. Ensure your VPS has the necessary software installed (Node.js, Yarn, etc.)

## 🚀 Ready to Deploy?

Once you have all the secrets configured:

1. Push your code to the `main` branch
2. Check the GitHub Actions tab for deployment progress
3. Monitor the deployment logs for any issues
4. Visit your domain to verify the deployment
