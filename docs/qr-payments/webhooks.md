---
sidebar_position: 9
---

# Webhook

PayPorter sends a `POST` request to the Partner webhook endpoint whenever a transaction reaches a final state. The result of `IN_PROGRESS` operations will be sent as `COMPLETED` or `FAILED`.

## Event Types

| Event Type | When |
|---|---|
| `qr_payment.completed` | Payment or Refund finalized successfully |
| `qr_payment.failed` | Payment or Refund finalized as failed |

## Webhook Idempotency

Each webhook delivery includes a globally unique event identifier in the `x-event-id` header. The same event may be delivered **more than once** (at-least-once delivery). Partners must use `x-event-id` to deduplicate — if you have already processed an event with the same ID, acknowledge it with HTTP 2xx and skip processing.

:::warning Refund webhook delay
**Refund webhook delay**: For credit-direction transactions (REFUND), the webhook with `COMPLETED` status is sent at minimum **180 seconds** after the authorization is approved. This allows the POS terminal's technical cancel window to close. If PayPorter receives a `REVERSAL OF REFUND` during this window, the webhook will be sent with `status: FAILED` and the settlement credit will be cancelled. Partners must **not** credit the end user until the `status: COMPLETED` webhook is received.
:::

## Retry Policy

| Condition | Behaviour |
|-----------|----------|
| Partner returns **HTTP 2xx** | Accepted as acknowledgement |
| Non-2xx or timeout | Retry up to 3 times with 10-second delay |
| Still failing | Retry every hour for up to 48 hours |

:::note Refund ETA guidance
**Refund ETA guidance:** The estimated end-to-end time from Confirm returning `IN_PROGRESS` to receiving the refund webhook is approximately **200 seconds** (180s POS cancel window + ~20s authorization processing). This estimate will be refined as production data becomes available.
:::

## Headers

| Header | Type | Presence | Length | Description | Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `x-event-id` | String | Always | 36 | Globally unique event identifier (UUID). Use for idempotency. | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| `x-event-type` | String | Always | 30 | Event type. See [Event Types](#event-types). | `qr_payment.completed` |
| `x-request-timestamp` | String | Always | 13 | Unix epoch ms when the HTTP request was sent. Generated per delivery attempt. | `1714291200000` |
| `x-request-signature` | String | Always | - | RSA-SHA256 signature of the request body. | Base64 signature |

## Webhook Signature Verification

To ensure the security and integrity of the webhook, PayPorter signs the request using RSA-SHA256 over the concatenation of the timestamp and the body.

**Signing Algorithm**
RSA-SHA256 (2048-bit). The signed content is constructed by concatenating the `x-request-timestamp` header value (Unix epoch ms) and the raw request body, separated by a colon:

```
signedContent = x-request-timestamp + ":" + request-body
```

PayPorter signs this concatenated value with its RSA private key. Partners verify using the RSA public key provided during onboarding.

**Request Headers**
The resulting signature is included in the request under the `x-request-signature` header. The `x-request-timestamp` header contains the Unix epoch timestamp in milliseconds. Reject any webhook where `x-request-timestamp` differs from server time by more than 5 minutes.

**Verification pseudocode:**
```
timestamp  = headers["x-request-timestamp"]
signature  = base64_decode(headers["x-request-signature"])
signedContent = timestamp + ":" + body
isValid    = RSA_SHA256_verify(payporterPublicKey, signedContent, signature)
```

## Webhook Body

The webhook body is a [Payment Object](./payment-object). Event metadata (`x-event-id`, `x-event-type`, `x-request-timestamp`) is provided in the [Headers](#headers) above.

Endpoint-specific behaviour:

- **`status`**: Always `COMPLETED` or `FAILED` (webhooks are only sent for terminal states).
- **`tenantReferenceId`**: Optional for refund transactions (may be `null`).
- **`tenantUserId`**: Always present after Confirm.
- **`parentTransactionId`**: Present only for `REFUND` transactions.

### Example — Payment Webhook

**Headers:**
```
x-event-id: a1b2c3d4-e5f6-7890-abcd-ef1234567890
x-event-type: qr_payment.completed
x-request-timestamp: 1715270400000
x-request-signature: Base64-encoded-RSA-SHA256-signature
```

**Body:**
```json
{
  "transactionId": "47002323201",
  "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
  "tenantUserId": "364",
  "transactionType": "PAYMENT",
  "transactionSource": "MERCHANT_QR_SCAN",
  "status": "COMPLETED",
  "amount": "84.00",
  "qrGenerationDate": "2025-07-14T15:53:21Z",
  "qrExpireDate": "2026-07-14T15:53:21Z",
  "currency": "TRY",
  "merchantId": "98765433210",
  "acquirerId": "0010",
  "mcc": "5411",
  "merchantName": "Lezzet Lokantası",
  "countryCode": "TR",
  "merchantCity": "ANTALYA",
  "terminalType": "STATIC_QRCODE",
  "terminalId": "12345678901234567890ABC"
}
```

### Example — Refund Webhook

**Headers:**
```
x-event-id: f9e8d7c6-b5a4-3210-fedc-ba0987654321
x-event-type: qr_payment.completed
x-request-timestamp: 1715356800000
x-request-signature: Base64-encoded-RSA-SHA256-signature
```

**Body:**
```json
{
  "transactionId": "47002323302",
  "parentTransactionId": "47002323201",
  "tenantReferenceId": null,
  "tenantUserId": "364",
  "transactionType": "REFUND",
  "transactionSource": "MERCHANT_QR_SCAN",
  "status": "COMPLETED",
  "amount": "84.00",
  "qrGenerationDate": "2025-07-14T15:53:21Z",
  "qrExpireDate": "2026-07-14T15:53:21Z",
  "currency": "TRY",
  "merchantId": "98765433210",
  "acquirerId": "0010",
  "mcc": "5411",
  "merchantName": "Lezzet Lokantası",
  "countryCode": "TR",
  "merchantCity": "ANTALYA",
  "terminalType": "STATIC_QRCODE",
  "terminalId": "12345678901234567890ABC"
}
```

**Expected Partner Response:**

Return any **HTTP 2xx** status code to acknowledge receipt. The response body is ignored.
