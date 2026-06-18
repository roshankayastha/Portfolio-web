<?php
/**
 * cPanel Git Auto-Deploy Webhook Script
 * Place this file at: admin/deploy.php
 * 
 * To automate your deployments:
 * 1. Add this script to your project and push it.
 * 2. In GitHub, go to Repository Settings > Webhooks > Add Webhook.
 * 3. Payload URL: https://kayastharoshan.com.np/admin/deploy.php?token=YOUR_SECRET_TOKEN
 * 4. Content Type: application/json
 */

// ==========================================
// 1. CONFIGURATION: Set your security token and repository path
// ==========================================
// Secret token to prevent unauthorized triggers (use a secure random string)
define('SECRET_TOKEN', '27291489d219c01d4b143524246c510e0b4b95dc');

// The absolute path to your cloned Git repository root on cPanel.
// (In cPanel, go to Git Version Control to find the exact "Repository Path" for your site).
define('REPOSITORY_PATH', '/home/yogaadve/repositories/Portfolio-web'); 

// ==========================================
// 2. SECURITY CHECK
// ==========================================
if (!isset($_GET['token']) || $_GET['token'] !== SECRET_TOKEN) {
    header('HTTP/1.0 403 Forbidden');
    echo "Access Denied: Invalid Security Token";
    exit;
}

// ==========================================
// 3. EXECUTE CPANEL UAPI DEPLOYMENT
// ==========================================
header('Content-Type: text/plain');

// Check if exec is enabled on your host
if (!function_exists('exec')) {
    echo "Error: PHP 'exec' function is disabled on this server. Please contact your host or use Cron Jobs.";
    exit;
}

// 1. Run cPanel pull (UAPI update with branch specified)
$pull_command = "uapi VersionControl update repository_root=" . escapeshellarg(REPOSITORY_PATH) . " branch=master 2>&1";
$pull_output = [];
$pull_retval = 0;
exec($pull_command, $pull_output, $pull_retval);

// 2. Run cPanel deploy (UAPI VersionControlDeployment create)
$deploy_command = "uapi VersionControlDeployment create repository_root=" . escapeshellarg(REPOSITORY_PATH) . " 2>&1";
$deploy_output = [];
$deploy_retval = 0;
exec($deploy_command, $deploy_output, $deploy_retval);

if ($pull_retval === 0 && $deploy_retval === 0) {
    echo "SUCCESS: cPanel Git repository pulled and deployed successfully!\n\n";
} else {
    echo "FAILED: Git pull or deployment failed.\n\n";
}

echo "Pull Command: $pull_command\n";
echo "Pull Output:\n" . implode("\n", $pull_output) . "\n\n";

echo "Deploy Command: $deploy_command\n";
echo "Deploy Output:\n" . implode("\n", $deploy_output) . "\n";
