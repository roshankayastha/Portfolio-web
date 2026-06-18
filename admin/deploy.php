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

// cPanel UAPI command to pull from remote and deploy via .cpanel.yml
$command = "uapi VersionControl update repository_root=" . escapeshellarg(REPOSITORY_PATH) . " 2>&1";

$output = [];
$retval = 0;
exec($command, $output, $retval);

if ($retval === 0) {
    echo "SUCCESS: cPanel Git repository updated and deployed successfully!\n\n";
} else {
    echo "FAILED: cPanel Git deployment failed with exit code $retval.\n\n";
}

echo "Command executed: $command\n";
echo "Command Output:\n";
echo implode("\n", $output);
