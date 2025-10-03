#!/bin/bash

# Deployment Testing Script
# This script helps test if your deployment is working

VPS_IP="145.79.11.67"
DOMAIN="pompahcl.com"

echo "🧪 HCL Landing Page Deployment Testing"
echo "======================================"
echo ""
echo "VPS IP: $VPS_IP"
echo "Domain: $DOMAIN"
echo ""

# Test 1: Basic connectivity
echo "🔍 Test 1: Basic Connectivity"
echo "============================="
echo "Testing if VPS is reachable..."

if ping -c 3 $VPS_IP >/dev/null 2>&1; then
    echo "✅ VPS is reachable via ping"
else
    echo "❌ VPS is not reachable via ping"
    echo "💡 Check if VPS is running and IP is correct"
fi

echo ""

# Test 2: SSH connectivity
echo "🔍 Test 2: SSH Connectivity"
echo "==========================="
echo "Testing SSH connection..."

if timeout 10 ssh -o ConnectTimeout=5 -o BatchMode=yes -i ~/.ssh/id_rsa root@$VPS_IP "echo 'SSH connection successful'" 2>/dev/null; then
    echo "✅ SSH connection successful"
    SSH_WORKING=true
else
    echo "❌ SSH connection failed"
    echo "💡 Try different usernames: root, ubuntu, admin, user"
    SSH_WORKING=false
fi

echo ""

# Test 3: HTTP connectivity
echo "🔍 Test 3: HTTP Connectivity"
echo "============================"
echo "Testing HTTP connection on port 80..."

if curl -s --connect-timeout 10 http://$VPS_IP >/dev/null 2>&1; then
    echo "✅ HTTP connection successful on port 80"
    HTTP_WORKING=true
else
    echo "❌ HTTP connection failed on port 80"
    echo "💡 Nginx might not be running or configured"
    HTTP_WORKING=false
fi

echo ""

# Test 4: HTTPS connectivity
echo "🔍 Test 4: HTTPS Connectivity"
echo "============================"
echo "Testing HTTPS connection on port 443..."

if curl -s --connect-timeout 10 -k https://$VPS_IP >/dev/null 2>&1; then
    echo "✅ HTTPS connection successful on port 443"
    HTTPS_WORKING=true
else
    echo "❌ HTTPS connection failed on port 443"
    echo "💡 SSL certificate might not be configured"
    HTTPS_WORKING=false
fi

echo ""

# Test 5: Domain connectivity
echo "🔍 Test 5: Domain Connectivity"
echo "============================="
echo "Testing domain connection..."

if curl -s --connect-timeout 10 http://$DOMAIN >/dev/null 2>&1; then
    echo "✅ Domain connection successful"
    DOMAIN_WORKING=true
else
    echo "❌ Domain connection failed"
    echo "💡 Domain might not be pointing to VPS or DNS not propagated"
    DOMAIN_WORKING=false
fi

echo ""

# Test 6: Application status (if SSH works)
if [ "$SSH_WORKING" = true ]; then
    echo "🔍 Test 6: Application Status"
    echo "============================"
    echo "Checking application status on VPS..."
    
    # Check if application directory exists
    if ssh -i ~/.ssh/id_rsa root@$VPS_IP "[ -d /var/www/hcl-landingpage ]" 2>/dev/null; then
        echo "✅ Application directory exists"
        
        # Check if .next directory exists
        if ssh -i ~/.ssh/id_rsa root@$VPS_IP "[ -d /var/www/hcl-landingpage/.next ]" 2>/dev/null; then
            echo "✅ Application is built (.next directory exists)"
        else
            echo "❌ Application is not built (.next directory missing)"
        fi
        
        # Check if service is running
        if ssh -i ~/.ssh/id_rsa root@$VPS_IP "systemctl is-active hcl-landingpage" 2>/dev/null | grep -q "active"; then
            echo "✅ Application service is running"
        else
            echo "❌ Application service is not running"
            echo "💡 Run: sudo systemctl start hcl-landingpage"
        fi
        
        # Check if Nginx is running
        if ssh -i ~/.ssh/id_rsa root@$VPS_IP "systemctl is-active nginx" 2>/dev/null | grep -q "active"; then
            echo "✅ Nginx is running"
        else
            echo "❌ Nginx is not running"
            echo "💡 Run: sudo systemctl start nginx"
        fi
        
    else
        echo "❌ Application directory does not exist"
        echo "💡 Run the VPS setup script first"
    fi
else
    echo "⏭️ Skipping application status check (SSH not working)"
fi

echo ""

# Test 7: Port scanning
echo "🔍 Test 7: Port Scanning"
echo "========================"
echo "Checking which ports are open..."

for port in 22 80 443 3000; do
    if timeout 5 bash -c "</dev/tcp/$VPS_IP/$port" 2>/dev/null; then
        echo "✅ Port $port is open"
    else
        echo "❌ Port $port is closed"
    fi
done

echo ""

# Summary and recommendations
echo "📋 Summary and Recommendations"
echo "=============================="
echo ""

if [ "$SSH_WORKING" = true ]; then
    echo "✅ SSH is working - you can access your VPS"
    echo "💡 Run these commands to check your deployment:"
    echo "   ssh -i ~/.ssh/id_rsa root@$VPS_IP"
    echo "   sudo systemctl status hcl-landingpage"
    echo "   sudo systemctl status nginx"
    echo "   ls -la /var/www/hcl-landingpage/"
else
    echo "❌ SSH is not working - you cannot access your VPS"
    echo "💡 Try these solutions:"
    echo "   1. Check VPS IP address in Hostinger control panel"
    echo "   2. Try different usernames: root, ubuntu, admin, user"
    echo "   3. Check if VPS is running"
    echo "   4. Check firewall settings"
fi

echo ""

if [ "$HTTP_WORKING" = true ] || [ "$DOMAIN_WORKING" = true ]; then
    echo "✅ Web server is accessible"
    echo "🌐 Your website should be available at:"
    echo "   http://$VPS_IP"
    echo "   http://$DOMAIN"
else
    echo "❌ Web server is not accessible"
    echo "💡 Check Nginx configuration and service status"
fi

echo ""

echo "🔧 Manual Testing Commands:"
echo "==========================="
echo ""
echo "# Test SSH connection:"
echo "ssh -i ~/.ssh/id_rsa root@$VPS_IP"
echo ""
echo "# Test HTTP connection:"
echo "curl -I http://$VPS_IP"
echo "curl -I http://$DOMAIN"
echo ""
echo "# Check application logs:"
echo "ssh -i ~/.ssh/id_rsa root@$VPS_IP 'sudo journalctl -u hcl-landingpage -f'"
echo ""
echo "# Check Nginx logs:"
echo "ssh -i ~/.ssh/id_rsa root@$VPS_IP 'sudo tail -f /var/log/nginx/error.log'"
echo ""
echo "# Restart services:"
echo "ssh -i ~/.ssh/id_rsa root@$VPS_IP 'sudo systemctl restart hcl-landingpage nginx'"

