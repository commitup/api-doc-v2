---
sidebar_position: 1
---

# QR Code API Documentation

## Version History

| Version | Date       | Changes |
| :------ | :--------- | :------ |
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

## Base URL

All API endpoints use the following base URL:

```
https://whitelabelwallet-mig.payporter.com.tr:8590
```

All endpoint paths in this document are relative to this base URL. For example, `POST /wallet/qrcode/payment/read` resolves to `https://whitelabelwallet-mig.payporter.com.tr:8590/wallet/qrcode/payment/read`.

All requests and responses use `Content-Type: application/json` unless noted otherwise.

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
| `X-Security-Key` | String | Yes | - | Encrypted secure data token. | Base64 string |

### Authentication Errors

| HTTP Status | Condition | Description |
|-------------|-----------|-------------|
| `401 Unauthorized` | Invalid `X-Api-Key` or `X-Api-Secret` | The API credentials are missing, expired, or incorrect. |
| `403 Forbidden` | Invalid `X-Security-Key` for the given `X-Wallet-Id` | The security key could not be decrypted or does not match the target wallet. |

### X-Security-Key Header Generation

You need to have a `walletId` and its corresponding RSA public key stored from the onboarding step to generate the `X-Security-Key` header for authenticated requests.
The `X-Security-Key` header contains encrypted wallet authentication data.

#### 1. Data Structure

Create a JSON payload with the following fields:

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

#### Example (JavaScript)

```javascript
const publicKeyPEM = "RSA PUBLIC KEY of walletId 1234567890";
const payload = {
  walletId: "1234567890",
  timestamp: "2026-01-07T09:40:16.524Z"
};
const secureData = await RSA.encrypt(JSON.stringify(payload), publicKeyPEM);
```

#### Reference Implementations

Complete examples are available in the `secure-data-generation/` folder:

- [Java](./example.java)
- [Go](./example.go)
- [PHP](./example.php)

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
