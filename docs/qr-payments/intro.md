---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# QR Code API Documentation

## Version History

| Version | Date       | Changes |
| :------ | :--------- | :------ |
| 1.9.0   | 2026-07-16 | Added `sequenceNumber` field to Account Transactions for absolute ordering. Changed sort order to `sequenceNumber` ascending (oldest first). Renamed commission transactions. Added production URL. Added Firewall & IP Whitelisting section. Clarified `X-Security-Key` 5-minute TTL. Readability and clarification updates. |
| 1.8.2   | 2026-07-08 | Added validation and parent lookup error behaviors to the Read QR API. `QRCODE_PARENT_TRANSACTION_NOT_FOUND`: different user/non-completed parent. |
| 1.8.1   | 2026-07-03 | Expanded mock sandbox capabilities for QR generation (`POST /wallet/qrcode/mock/generate-mock-qr-code`): added `merchantId`, `merchantName`, and `mcc` parameters to allow customizing merchant details. |
| 1.8.0   | 2026-06-12 | Added Account Transaction Types: `BANK_ACCOUNT_TOPUP`, `BANK_ACCOUNT_TOPUP_CANCEL`, `CREDIT_COMMISSION`, `DEBIT_COMMISSION`. Added QR-to-Account Transaction mapping table, identifier semantics (`walletTransactionId` vs `transactionId`), and commission linking documentation. Added Account Transactions query constraints (permanent retention, 31-day max range, 60 req/min rate limit, immutability rules). Clarified Balance Inquiry semantics (completed transactions only, pending commissions excluded). Added UAT test case TC-UAT-018: QR refund exceeds original payment (FAILED webhook). |
| 1.7.1   | 2026-06-08 | Added static QR payment verification scenarios (happy path, insufficient balance, and multiple scan transaction IDs) to the UAT Testing Guide. |
| 1.7.0   | 2026-06-03 | Added UAT Testing Guide with step-by-step test flows and acceptance checklist. Expanded mock authorization capabilities for refund scenarios: `LATE_REVERSAL` and `USER_NOT_PRESENT_REFUND`. |
| 1.6.0   | 2026-05-17 | Added `POST /wallet/qrcode/query` endpoint (replaces deprecated `GET /wallet/qrcode/transactions`). Added mock sandbox endpoints: Rotate Webhook Signing Key (`POST /mock/rotate-webhook-key`) and Update Webhook URL (`POST /mock/update-webhook-url`). Migrated mock endpoints to `/mock/` path prefix — old paths are deprecated and will be removed before production. Changed mock `webhook-event-log` and `retry-webhook` to `POST`; `webhook-event-log` now returns an array. Added inline authentication code examples (Java, Go, PHP). |
| 1.5.0   | 2026-05-14 | Added standard pagination envelope (`data` array, `pagination` object, and optional `summary` object) to Reconciliation and Account Transactions endpoints. Standardized input tables to `Required` style and output tables to `Presence` style. Updated endpoint paths in flow diagrams to full relative URLs. Added `X-Wallet-Id` to Authentication description. |
| 1.4.2   | 2026-05-13 | Changed Balance Inquiry endpoint to `GET /wallet/qrcode/account/balance`. Added HTTP status codes to all error code tables. Clarified Mock Authorization sends approval only; `FAILED` path tested via insufficient balance. Unified example amounts and transaction IDs across all sections. |
| 1.4.1   | 2026-05-12 | Added Account Transactions endpoint (`GET /wallet/qrcode/account/transactions`) with Account Transaction Types. Added Base URL section.  Added pagination to Reconciliation. Heading and ToC cleanup. |
| 1.4.0   | 2026-05-12 | Added Partner Fund Safety Model section with debit/credit timing diagrams. Added Confirm Retry & Fallback Strategy. Added webhook event envelope headers (`x-event-id`, `x-event-type`, `x-request-timestamp`, `x-request-signature`). Expanded Mock APIs: error code matrices, webhook event log query and retry endpoints, authorization failure testing. |
| 1.3.1 | 2026-05-05 | Added `QR_CODE_USED` error code to Read and Confirm endpoints. |
| 1.3.0 | 2026-05-05 | Clarified synchronous Confirm errors are terminal (no webhook follows). Added error handling guidance with recommended actions per error code. Updated webhook signature to sign `timestamp:body`. Added refund ETA guidance (~200s). Added safe retry policy for 5xx/timeout. |
| 1.2.0 | 2026-04-28 | Added Idempotency & Deduplication section. Added Transaction State Machine with finality rules. Added Error Codes table. Documented amount format conventions. Documented partial/multiple refund and cancellation equivalence. Added `tenantReferenceId` uniqueness constraint. |
| 1.1.0 | 2026-04-28 | Added `transactionSource`, `acquirerId` fields. Added Balance Inquiry endpoint. Added response field tables. Updated webhook signing to RSA-SHA256. Documented refund 180s webhook delay. |
| 1.0.1 | 2026-04-08 | Updated field requirements and refined length constraints for Read and Confirm APIs. |
| 1.0.0 | 2026-03-20 | Initial version. |

---

## Environments & Base URLs

| Environment | Base URL | Purpose |
|---|---|---|
| **Sandbox** | `https://whitelabelwallet-mig.payporter.com.tr:8590` | Integration testing and development |
| **Production** | `https://whitelabelwallet.payporter.com.tr:8590` | Live operations |

All endpoint paths in this document are relative to the base URL. For example, `POST /wallet/qrcode/payment/read` resolves to `https://whitelabelwallet-mig.payporter.com.tr:8590/wallet/qrcode/payment/read` in sandbox.

All requests and responses use `Content-Type: application/json` unless noted otherwise.

:::warning Firewall & IP Whitelisting
**Both sandbox and production** require IP whitelisting before access. Each environment is whitelisted independently — having access to sandbox does not grant access to production.

Contact PayPorter with your server's public IP addresses to request firewall access for each environment. Requests from non-whitelisted IPs will be silently dropped at the network level.
:::

---

## Authentication

All API requests require authentication via the `X-Api-Key`, `X-Api-Secret`, `X-Wallet-Id`, and `X-Security-Key` headers.
The security key is constructed from the `walletId` and the RSA public key provided during onboarding.

### API Key Authentication (Server-to-Server)

Include these headers in every request:

| Header | Type | Required | Length | Description | Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `X-Api-Key` | String | Yes | 36 | Provided API key. | `a208c005-17a2-441a-b3e9-58b6e0d6c082` |
| `X-Api-Secret` | String | Yes | 36 | Provided API secret. | `3208c005-17a6-441a-b3e9-58b6e0d6c082` |
| `X-Wallet-Id` | String | Yes | 50 | Target wallet identifier. | `1234567890` |
| `X-Security-Key` | String | Yes | - | Encrypted secure data token. Valid for **5 minutes** from the embedded timestamp. | Base64 string |

### Authentication Errors

| HTTP Status | Condition | Description |
|-------------|-----------|-------------|
| `401 Unauthorized` | Invalid `X-Api-Key` or `X-Api-Secret` | The API credentials are missing, expired, or incorrect. |
| `403 Forbidden` | Invalid `X-Security-Key` for the given `X-Wallet-Id` | The security key could not be decrypted or does not match the target wallet. |

### X-Security-Key Header Generation

You need to have a `walletId` and its corresponding RSA public key stored from the onboarding step to generate the `X-Security-Key` header for authenticated requests.
The `X-Security-Key` header contains encrypted wallet authentication data. **The generated key is valid for 5 minutes** from the `timestamp` value — requests with an older timestamp will be rejected with `403 Forbidden`.

#### 1. Data Structure

Create a JSON object with the following two fields. This is **not** a request body — it is only used to construct the `X-Security-Key` header value:

| Field | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `walletId` | String | Yes | 50 | The wallet ID |
| `timestamp` | String | Yes | 24 | ISO 8601 format (e.g., `2023-10-27T10:00:00.123Z`) |

**Example:**

```json
{
  "walletId": "16250953",
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
            String walletId,
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
    WalletId  string `json:"walletId"`
    Timestamp string `json:"timestamp"`
}

func generateSecureDataJSON(walletId string) (string, error) {
    timestamp := time.Now().UTC().Format(
        "2006-01-02T15:04:05.000Z")
    secureData := WhitelabelSecureData{
        WalletId:  walletId,
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
        "walletId" => $walletId,
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

## QR Code Formats

This API accepts QR codes in the standard BKM (Bankalararası Kart Merkezi) format:

| Format | BKM Standard | Description |
|--------|-------------|-------------|
| Long QR | BKM UKF (Uzun Karekod Formatı) | Full EMVCo-compatible QR string containing all transaction metadata. |
| Short QR | BKM KKF (Kısa Karekod Formatı) | Compact QR string that resolves to full transaction data via BKM infrastructure. |

Both formats are accepted by the [Read QR Info](./read-qr) endpoint. The `qrCode` field in the Read request should contain the raw string content from the scanned QR code, regardless of format.

---

## Error Response Format

All errors use the same JSON envelope. The HTTP status code indicates the error category:

| HTTP Status | Category | When |
|-------------|----------|------|
| `406 Not Acceptable` | Validation | Missing or invalid request fields |
| `409 Conflict` | Idempotency / Uniqueness | Key mismatch or duplicate reference |
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

---

## Amount Format

All monetary values are represented as **strings** with a fixed decimal pattern.

| Rule | Detail |
|------|--------|
| Currency | TRY (Turkish Lira) |
| Type | `String` |
| Pattern | `999999999.99` — up to 9 integer digits, dot, exactly 2 decimal digits |
| Examples | `"11.50"`, `"84.00"`, `"0.01"` |
| Sign | Always positive. The direction (debit/credit) is determined by `transactionType`. |

:::note
All amounts are denominated in TRY. No FX conversion is applied.
:::

---

## API Rate Limits

All endpoints enforce per-client rate limits. Exceeding the limit returns **HTTP 429 Too Many Requests** with a standard [error response](#error-response-format) and error code `RATE_LIMIT_EXCEEDED`.

### Rate Limits by Endpoint

| Endpoint | Method | Rate Limit | Notes |
|---|---|---|---|
| `/wallet/qrcode/payment/read` | POST | 300 / min | User-facing, time-sensitive — allow for peak hour bursts. |
| `/wallet/qrcode/payment/confirm` | POST | 300 / min | Paired with Read; same limit. |
| `/wallet/qrcode/query` | POST | 1500 / min | May be polled for status; 5× transactional limit to support retries. |
| `/wallet/qrcode/reconciliation` | GET | 60 / min | Bulk data retrieval — heavier queries. |
| `/wallet/qrcode/account/transactions` | GET | 60 / min | Bulk data retrieval — heavier queries. |
| `/wallet/qrcode/account/balance` | GET | 60 / min | Informational — should not be called per-transaction. |

:::tip Best practices for staying within limits
- **Do not poll Query in tight loops.** Use webhooks as the primary notification mechanism; use Query only as a fallback or for reconciliation.
- **Reconciliation and Account Transactions** are designed for periodic batch pulls (e.g., hourly or daily), not real-time monitoring.
- **Balance Inquiry** is for periodic monitoring — do not call it before every payment.
- **Implement exponential backoff** when you receive HTTP 429. The rate limit window resets every 60 seconds.
:::

