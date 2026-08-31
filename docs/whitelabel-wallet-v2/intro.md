---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# P2P Money Transfer API

## Version History

<details className="changelog-details">
<summary>Show all entries</summary>

| Version | Date | Changes |
| :--- | :--- | :--- |
| 1.3.0 | 2026-08-31 | `provider` is now the only provider field, on requests and responses alike. `externalFirm`, `bankId`, and `walletType` were removed from both. `provider` is echoed back on validate, confirm, and query. |
| 1.2.0 | 2026-08-31 | **Breaking:** type segments renamed to `to-name`, `to-account`, `to-card`, `to-wallet`. Reference data endpoints restructured. New unified `provider` field. |
| 1.1.0 | 2026-08-26 | Name, Account, and Wallet transfer flows. Parameter Collection endpoints. |
| 1.0.0 | 2026-06-11 | Initial version. Validate, confirm, query. Fund safety model, confirm retry and fallback. |

</details>

---

## Base URL

All API endpoints use the following base URL:

```
https://whitelabelwallet-mig.payporter.com.tr:8590
```

All endpoint paths in this document are relative to this base URL. For example, `POST /wallet/p2p/{type}/validate` resolves to `https://whitelabelwallet-mig.payporter.com.tr:8590/wallet/p2p/{type}/validate`.

All requests and responses use `Content-Type: application/json`.

---

## Transfer Types

The `{type}` path segment selects the transfer type. It is used by the validate and confirm endpoints, and by the providers endpoint.

| Segment | Transfer Type | Description |
| :--- | :--- | :--- |
| `to-name` | Name Transfer | Cash pickup at a provider office. |
| `to-account` | Account Transfer | Payout to a bank account or IBAN. |
| `to-card` | Card Transfer | Payout to a debit or credit card. |
| `to-wallet` | Wallet Transfer | Payout to a partner digital wallet. |

---

## Authentication

All API requests require authentication via the `X-Api-Key`, `X-Api-Secret`, `X-Wallet-Id`, and `X-Secure-Data` headers.

### API Key Authentication (Server-to-Server)

Include these headers in every request:

| Header | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `X-Api-Key` | String | Yes | Provided API key. | `48807662-d38d-43f3-88e0-1b4cfb394f68` |
| `X-Api-Secret` | String | Yes | Provided API secret. | `a85120ef-8fe6-4c0c-ad28-388cb8f6a703` |
| `X-Wallet-Id` | String | Yes | Target wallet identifier. | `11292772` |
| `X-Secure-Data` | String | Yes | Encrypted secure data token. | Base64 string |

### Authentication Errors

| HTTP Status | Condition | Description |
|-------------|-----------|-------------|
| `401 Unauthorized` | Invalid `X-Api-Key` or `X-Api-Secret` | The API credentials are missing, expired, or incorrect. |
| `403 Forbidden` | Invalid `X-Secure-Data` for the given `X-Wallet-Id` | The secure data could not be decrypted or does not match the target wallet. |

### X-Secure-Data Header Generation

You need a `walletId` and its corresponding RSA public key (`accessKey`) stored from the onboarding step to generate the `X-Secure-Data` header.

#### 1. Data Structure

Create a JSON payload with the following fields:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `deviceId` | String | Yes | The wallet ID |
| `timestamp` | String | Yes | ISO 8601 format (e.g., `2023-10-27T10:00:00.123Z`) |

**Example:**

```json
{
  "deviceId": "11292772",
  "timestamp": "2023-10-27T10:00:00.123Z"
}
```

#### 2. Encryption

Encrypt the JSON string using RSA:

| Parameter | Value |
|-----------|-------|
| Algorithm | RSA |
| Mode | ECB |
| Padding | PKCS1Padding (PKCS#1 v1.5) |
| Key | Wallet's RSA Public Key (X.509 encoded) |

#### 3. Encoding

Base64 encode the encrypted byte array.

#### Reference Implementations

<Tabs>
  <TabItem value="java" label="Java" default>

```java
package commitup.pf;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import javax.crypto.Cipher;

class WalletSecureDataTest {
    record WhitelabelSecureData(
            String deviceId,
            @JsonFormat(shape = JsonFormat.Shape.STRING,
                        pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            Date timestamp) {
    }

    public String generateSecureDataJson(String walletId)
            throws JsonProcessingException {
        var secureData = new WhitelabelSecureData(walletId, new Date());
        var om = new ObjectMapper();
        return om.writeValueAsString(secureData);
    }

    public String encryptSecureDataJson(
            String secureDataJson, String publicKeyString)
            throws JsonProcessingException {
        try {
            byte[] publicKeyBytes =
                Base64.getDecoder().decode(publicKeyString);
            X509EncodedKeySpec keySpec =
                new X509EncodedKeySpec(publicKeyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PublicKey publicKey = keyFactory.generatePublic(keySpec);

            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);

            byte[] encrypted =
                cipher.doFinal(secureDataJson.getBytes());
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }
    }
}
```

  </TabItem>
  <TabItem value="go" label="Go">

```go
package main

import (
    "crypto/rand"
    "crypto/rsa"
    "crypto/x509"
    "encoding/base64"
    "encoding/json"
    "fmt"
    "time"
)

type WhitelabelSecureData struct {
    DeviceId  string `json:"deviceId"`
    Timestamp string `json:"timestamp"`
}

func generateSecureDataJSON(walletId string) (string, error) {
    timestamp := time.Now().UTC().Format(
        "2006-01-02T15:04:05.000Z")
    secureData := WhitelabelSecureData{
        DeviceId:  walletId,
        Timestamp: timestamp,
    }
    b, err := json.Marshal(secureData)
    if err != nil {
        return "", err
    }
    return string(b), nil
}

// RSA/ECB/PKCS1Padding == Go: rsa.EncryptPKCS1v15
func encryptSecureDataJSON(
    secureDataJSON string, publicKeyBase64 string,
) (string, error) {
    pubDer, err := base64.StdEncoding.DecodeString(
        publicKeyBase64)
    if err != nil {
        return "", fmt.Errorf(
            "invalid public key base64: %w", err)
    }
    pubAny, err := x509.ParsePKIXPublicKey(pubDer)
    if err != nil {
        return "", fmt.Errorf(
            "invalid public key DER (PKIX): %w", err)
    }
    pub, ok := pubAny.(*rsa.PublicKey)
    if !ok {
        return "", fmt.Errorf("public key is not RSA")
    }
    encrypted, err := rsa.EncryptPKCS1v15(
        rand.Reader, pub, []byte(secureDataJSON))
    if err != nil {
        return "", fmt.Errorf(
            "rsa encrypt failed: %w", err)
    }
    return base64.StdEncoding.EncodeToString(encrypted), nil
}
```

  </TabItem>
  <TabItem value="php" label="PHP">

```php
<?php

function generateSecureDataJson(string $walletId): string
{
    $secureData = [
        "deviceId" => $walletId,
        "timestamp" => (new DateTimeImmutable(
            "now", new DateTimeZone("UTC")
        ))->format("Y-m-d\TH:i:s.v\Z"),
    ];
    $json = json_encode(
        $secureData, JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        throw new RuntimeException(
            "json_encode failed: " . json_last_error_msg());
    }
    return $json;
}

/**
 * RSA/ECB/PKCS1Padding == OpenSSL: OPENSSL_PKCS1_PADDING
 * $publicKeyBase64: X.509 SubjectPublicKeyInfo (DER)
 */
function encryptSecureDataJson(
    string $secureDataJson, string $publicKeyBase64
): string {
    $der = base64_decode($publicKeyBase64, true);
    if ($der === false) {
        throw new InvalidArgumentException(
            "Invalid publicKeyBase64");
    }
    $pem = "-----BEGIN PUBLIC KEY-----\n"
        . chunk_split(base64_encode($der), 64, "\n")
        . "-----END PUBLIC KEY-----\n";
    $pubKey = openssl_pkey_get_public($pem);
    if ($pubKey === false) {
        throw new RuntimeException(
            "openssl_pkey_get_public failed");
    }
    $encrypted = "";
    $ok = openssl_public_encrypt(
        $secureDataJson, $encrypted,
        $pubKey, OPENSSL_PKCS1_PADDING);
    if (!$ok) {
        throw new RuntimeException(
            "openssl_public_encrypt failed");
    }
    return base64_encode($encrypted);
}
```

  </TabItem>
</Tabs>

---

## Transaction Flow

All P2P money transfer transactions follow a three-step flow:

```
Validate  →  Confirm  →  Query (optional)
```

1. **Validate** — Submit transaction details. If accepted, the response contains a `transactionId` with `status: READY`. No funds are moved yet.
2. **Confirm** — Submit the `transactionId` to execute the transaction. Funds are debited from the wallet atomically.
3. **Query** — Retrieve the current state of a transaction by `transactionId`.

:::important
There are **no webhooks** for P2P money transfer transactions. All status transitions can be observed via the Query endpoint.
:::

---

## Amount Model

P2P money transfers support multi-currency transfers. The request accepts **one of two mutually exclusive** amount inputs:

| Input Option | Fields | Description |
|---|---|---|
| **Option A** | `amount` + `currency` | Sending amount in a specified currency (e.g., 150 EUR). |
| **Option B** | `sendingAmount` + `sendingCurrency` | Alternative sending amount in the sender's local currency. |

:::important
Exactly one of `amount` or `sendingAmount` must be provided. Providing both or neither will result in a validation error.
:::

The response includes three amount layers:

| Response Field | Description | Example |
|---|---|---|
| `amount` / `currency` | Sending amount (echoed from input). | `150.00` / `EUR` |
| `sourceAmount` / `sourceCurrency` | TRY equivalent debited from the wallet. | `8215.53` / `TRY` |
| `payoutAmount` / `payoutCurrency` | Final payout in the destination currency. Available after validate, determined by the 3rd party. | `2851428.57` / `IDR` |

---

## Error Response Format

All errors use the same JSON envelope. The HTTP status code indicates the error category:

| HTTP Status | Category | When |
|-------------|----------|------|
| `406 Not Acceptable` | Validation / Business Logic | Missing/invalid fields, already processed transactions, or state conflicts |
| `429 Too Many Requests` | Rate Limit | Rate limiting policy exceeded |
| `5XX Server Error` | System | Unexpected internal failure |

```json
{
  "status": "error",
  "code": "<ERROR_CODE>",
  "message": "<Human-readable description>"
}
```

Endpoint-specific error codes are listed in each API section below.
