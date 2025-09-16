#!/bin/bash

# Debug Deployment Script
# This script helps debug deployment issues

echo "🔍 HCL Landing Page Deployment Debug"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Found package.json - we're in the right directory"
echo ""

# Check if deployment package exists
if [ -f "deployment.tar.gz" ]; then
    echo "✅ deployment.tar.gz exists"
    echo "📊 Package size: $(du -h deployment.tar.gz | cut -f1)"
    echo "📋 Package contents:"
    tar -tzf deployment.tar.gz | head -10
    echo "..."
else
    echo "❌ deployment.tar.gz not found"
    echo "💡 Run 'yarn build' first to create the deployment package"
fi

echo ""
echo "🔧 Manual Deployment Test Commands:"
echo "==================================="
echo ""
echo "1. Build the application:"
echo "   yarn build"
echo ""
echo "2. Create deployment package:"
echo "   tar -czf deployment.tar.gz .next public package.json yarn.lock next.config.js tsconfig.json"
echo ""
echo "3. Test SSH connection to VPS:"
echo "   ssh -i ~/.ssh/id_rsa username@your-vps-ip"
echo ""
echo "4. Manual deployment to VPS:"
echo "   scp deployment.tar.gz username@your-vps-ip:/var/www/hcl-landingpage/"
echo "   ssh username@your-vps-ip 'cd /var/www/hcl-landingpage && tar -xzf deployment.tar.gz && yarn install --production'"
echo ""
echo "5. Check VPS setup:"
echo "   ssh username@your-vps-ip 'ls -la /var/www/hcl-landingpage/'"
echo "   ssh username@your-vps-ip 'sudo systemctl status hcl-landingpage'"
echo ""
echo "🔍 Common Issues and Solutions:"
echo "==============================="
echo ""
echo "❌ 'deployment.tar.gz not found'"
echo "   → The SCP upload failed or the file wasn't created properly"
echo "   → Check if the 'Create deployment package' step completed successfully"
echo ""
echo "❌ 'Permission denied'"
echo "   → SSH key not properly configured"
echo "   → Check VPS_SSH_KEY secret in GitHub"
echo "   → Verify public key is in VPS ~/.ssh/authorized_keys"
echo ""
echo "❌ 'yarn: command not found'"
echo "   → Yarn not installed on VPS"
echo "   → Run the VPS setup script: ./scripts/setup-vps.sh"
echo ""
echo "❌ 'Service not found'"
echo "   → systemd service not created"
echo "   → Run the VPS setup script: ./scripts/setup-vps.sh"
echo ""
echo "📋 GitHub Secrets Checklist:"
echo "============================"
echo "Required secrets in GitHub repository:"
echo "- VPS_HOST (your VPS IP address)"
echo "- VPS_USERNAME (SSH username)"
echo "- VPS_SSH_KEY (private SSH key)"
echo "- VPS_PORT (optional, defaults to 22)"
echo "- ENABLE_INDEXING_SEO"
echo "- ADMIN_WHATSAPP_NUMBER"
echo "- ADMIN_WHATSAPP_CHAT_FORMAT"
echo "- FIRST_CATEGORY"
echo "- BASE_URL"
echo ""
echo "🔧 Next Steps:"
echo "=============="
echo "1. Check GitHub Actions logs for the exact error message"
echo "2. Verify all GitHub secrets are configured"
echo "3. Test SSH connection manually"
echo "4. Run VPS setup script if not done already"
echo "5. Try manual deployment to isolate the issue"
