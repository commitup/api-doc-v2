<?php

/**
 * Example function to demonstrate how to generate HMAC-SHA256 signature for PayPorter webhooks in PHP.
 *
 * @param string $secret The secret key used for hashing.
 * @param array|object $request The request body data to be hashed.
 * @return string Hexadecimal representation of the HMAC-SHA256 hash.
 */
function encrypt($secret, $request) {
    // Convert the request data to JSON string
    $json = json_encode($request);
    
    // Generate HMAC-SHA256 hash in hexadecimal format
    return hash_hmac('sha256', $json, $secret);
}

// Example usage
$secret = "your-secret-key";

// Example request body array (should match the JSON structure received in the webhook)
$requestBody = [
    "transactionId" => "470023232",
    "tenantReferenceId" => "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
    "tenantUserId" => "364",
    "status" => "COMPLETED",
    "amount" => 11.50
];

$signature = encrypt($secret, $requestBody);

echo "Generated Signature (request-sign): " . $signature . "\n";

?>
