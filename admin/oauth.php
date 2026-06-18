<?php
/**
 * Sveltia / Decap CMS GitHub OAuth Gateway for PHP (cPanel self-hosted)
 * Place this file at: admin/oauth.php
 */

// ==========================================
// 1. CONFIGURATION: Paste your GitHub Developer App keys here
// ==========================================
define('GITHUB_CLIENT_ID', 'YOUR_GITHUB_CLIENT_ID');
define('GITHUB_CLIENT_SECRET', 'YOUR_GITHUB_CLIENT_SECRET');

// Determine host URL automatically to configure callback
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'];
$self = $_SERVER['PHP_SELF'];
$redirect_uri = $protocol . $host . $self; // Points back to this same oauth.php file

// ==========================================
// 2. AUTH FLOW INITIATION
// ==========================================
if (!isset($_GET['code'])) {
    // Stage 1: Redirect user to GitHub's OAuth login screen
    $authorize_url = "https://github.com/login/oauth/authorize?" . http_build_query([
        'client_id'    => GITHUB_CLIENT_ID,
        'redirect_uri' => $redirect_uri,
        'scope'        => 'repo,user',
        'state'        => bin2hex(random_bytes(16)) // Anti-CSRF token
    ]);
    
    header("Location: " . $authorize_url);
    exit;
}

// ==========================================
// 3. CALLBACK HANDSHAKE (Token Exchange)
// ==========================================
$code = $_GET['code'];

// Exchange code for Access Token via cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://github.com/login/oauth/access_token");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'client_id'     => GITHUB_CLIENT_ID,
    'client_secret' => GITHUB_CLIENT_SECRET,
    'code'          => $code,
    'redirect_uri'  => $redirect_uri
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json'
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
}
curl_close($ch);

$token_data = json_decode($response, true);

// ==========================================
// 4. CMS RESPONSE (postMessage Callback)
// ==========================================
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Authenticating...</title>
</head>
<body>
    <div style="text-align: center; font-family: sans-serif; margin-top: 40px; color: #555;">
        <h3>Authenticating with GitHub...</h3>
        <p>This window will close automatically.</p>
    </div>

    <script>
        <?php if ($http_code === 200 && isset($token_data['access_token'])): ?>
            // Success: Build expected Decap/Sveltia CMS payload
            const payload = JSON.stringify({
                token: "<?php echo htmlspecialchars($token_data['access_token'], ENT_QUOTES, 'UTF-8'); ?>",
                provider: "github"
            });
            const message = `authorization:github:success:${payload}`;
            
            // Send token to CMS admin opener window
            window.opener.postMessage(message, "*");
        <?php else: ?>
            // Failure: Report error message to CMS opener window
            const errorPayload = JSON.stringify({
                message: "<?php echo htmlspecialchars(isset($error_msg) ? $error_msg : (isset($token_data['error_description']) ? $token_data['error_description'] : 'Authentication failed'), ENT_QUOTES, 'UTF-8'); ?>"
            });
            const message = `authorization:github:error:${errorPayload}`;
            window.opener.postMessage(message, "*");
        <?php endif; ?>
        
        // Close authorization popup window
        window.close();
    </script>
</body>
</html>
