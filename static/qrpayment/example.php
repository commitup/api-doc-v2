<?php

function generateSecureDataJson(string $walletId): string
{
    $secureData = [
        "deviceId" => $walletId,
        // Java pattern: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        // v = milliseconds
        "timestamp" => (new DateTimeImmutable("now", new DateTimeZone("UTC")))->format("Y-m-d\TH:i:s.v\Z"),
    ];

    $json = json_encode($secureData, JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        throw new RuntimeException("json_encode failed: " . json_last_error_msg());
    }
    return $json;
}

/**
 * Java: RSA/ECB/PKCS1Padding == OpenSSL: OPENSSL_PKCS1_PADDING
 * $publicKeyBase64: X.509 SubjectPublicKeyInfo (DER) base64 string
 */
function encryptSecureDataJson(string $secureDataJson, string $publicKeyBase64): string
{
    // DER bytes -> PEM
    $der = base64_decode($publicKeyBase64, true);
    if ($der === false) {
        throw new InvalidArgumentException("Invalid publicKeyBase64");
    }

    $pem = "-----BEGIN PUBLIC KEY-----\n"
        . chunk_split(base64_encode($der), 64, "\n")
        . "-----END PUBLIC KEY-----\n";

    $pubKey = openssl_pkey_get_public($pem);
    if ($pubKey === false) {
        throw new RuntimeException("openssl_pkey_get_public failed");
    }

    $encrypted = "";
    $ok = openssl_public_encrypt($secureDataJson, $encrypted, $pubKey, OPENSSL_PKCS1_PADDING);
    // openssl_free_key($pubKey); // Deprecated in PHP 8.0+

    if (!$ok) {
        throw new RuntimeException("openssl_public_encrypt failed");
    }

    return base64_encode($encrypted);
}

// ---- Example usage ----
$walletId = "16250953";
$publicKeyString = "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAoRVM4ZYsAvTlPO+DAA7klpiuWauIVwsa50YqojEptD56vUrd0niepStPw2dtWDevogjCj3q6fN8fnaTabGl16gRc3QJc6/euf3G++wJjDHGAnnkNpG1RIsEOvC/lhFfmuJ7DxW2suCpZObQ12Fr++F8KgHT0rHfvqX4YqtJirJABOlUumc9CK5B6SGzyHGDNjFXyUgWdt1lfpnFo6Hxhyb3rY9Ivl4wX6F5sdIpkJYiamS0I3dKVd/qLtGiv5WlVprqwZgMcFC7wLEODh5A7NWIXrLoihluJYh98pdwrNir0VmluJ4i8tcrhAWg9p8980yo3/HKw3rQgg57CYUCY1plQuRrGUhUI7JOtHZbpnZiKXe/8+lMAVhlGfmNhWiudS0KFwFC65RM64sQf4e1l6w5F0EfAlbbV2pwWTJChXe6LsfxmIpfdblal/rrXQXkyCYy1MroaLAHUBwvRd3DxGUjjyEXC0lO3+xwrD2hNL9bXmSYm4QZ35t6BS5oudk6LfTD3JD4ZWuD1uoOHI1cs4t0E5uwzxk5iHP22cBqFIMI/+HawbQT6ubpz0OeVxLrwNKiPxh6/C7Ags7Yw7K5YxMHCArj1XaxMDXtparJkNACJ42YTseSZ7Mxw5Ov+GDiW3d9MD4sM5h5cVVJ/xuWKBMS3oi+r0zpXq0+xTXCS9s0CAwEAAQ==";

$secureDataJson = generateSecureDataJson($walletId);
echo "Secure : " . $secureDataJson . PHP_EOL;

$encrypted = encryptSecureDataJson($secureDataJson, $publicKeyString);
echo "Encrypted secure data: " . $encrypted . PHP_EOL;
