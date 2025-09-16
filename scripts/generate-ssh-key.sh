#!/bin/bash

# SSH Key Generation Script for GitHub Actions VPS Deployment
# This script helps you generate SSH keys for secure VPS access

set -e

echo "🔑 SSH Key Generation for VPS Deployment"
echo "========================================"
echo ""

# Check if SSH key already exists
if [ -f ~/.ssh/id_rsa ]; then
    echo "⚠️  SSH key already exists at ~/.ssh/id_rsa"
    echo "Do you want to generate a new one? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Using existing SSH key..."
        echo ""
        echo "📋 Your existing private key content:"
        echo "------------------------------------"
        cat ~/.ssh/id_rsa
        echo ""
        echo "📋 Your existing public key content:"
        echo "------------------------------------"
        cat ~/.ssh/id_rsa.pub
        echo ""
        echo "✅ Copy the PRIVATE key content above to GitHub Secrets as VPS_SSH_KEY"
        echo "✅ Copy the PUBLIC key content above to your VPS ~/.ssh/authorized_keys"
        exit 0
    fi
fi

# Generate new SSH key
echo "🔧 Generating new SSH key pair..."
ssh-keygen -t rsa -b 4096 -C "github-actions-$(date +%Y%m%d)" -f ~/.ssh/id_rsa -N ""

echo ""
echo "✅ SSH key pair generated successfully!"
echo ""

# Display the keys
echo "📋 Your PRIVATE key (copy this to GitHub Secrets as VPS_SSH_KEY):"
echo "=================================================================="
cat ~/.ssh/id_rsa
echo ""
echo "📋 Your PUBLIC key (copy this to your VPS ~/.ssh/authorized_keys):"
echo "=================================================================="
cat ~/.ssh/id_rsa.pub
echo ""

# Set proper permissions
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

echo "🔧 Setting proper file permissions..."
echo ""

echo "📋 Next Steps:"
echo "=============="
echo "1. Copy the PRIVATE key content above"
echo "2. Go to your GitHub repository → Settings → Secrets and variables → Actions"
echo "3. Add a new secret named 'VPS_SSH_KEY' with the private key content"
echo "4. Copy the PUBLIC key content above"
echo "5. Add it to your VPS ~/.ssh/authorized_keys file"
echo ""
echo "🚀 VPS Setup Commands:"
echo "====================="
echo "# SSH into your VPS and run:"
echo "mkdir -p ~/.ssh"
echo "echo '$(cat ~/.ssh/id_rsa.pub)' >> ~/.ssh/authorized_keys"
echo "chmod 700 ~/.ssh"
echo "chmod 600 ~/.ssh/authorized_keys"
echo ""
echo "🔍 Test SSH Connection:"
echo "======================"
echo "ssh -i ~/.ssh/id_rsa username@your-vps-ip"
