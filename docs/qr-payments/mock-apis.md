---
sidebar_position: 13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Mock APIs (Sandbox Only)

:::important
These endpoints are available **only in sandbox/test environments**. They are completely absent from production. All mock endpoints require the same authentication headers as production endpoints.

In sandbox, webhooks are automatically delivered as mock if no real webhook is configured for your wallet — no real HTTP call is made. Webhook event logs are still created normally, enabling verification via the [webhook-event-log](#query-webhook-event-log) endpoint. To configure a real webhook URL for sandbox, use the [Update Webhook URL](#update-webhook-url) endpoint or contact PayPorter via email.
:::

## Generate Mock QR Code

Generates a BKM-format QR code with configurable transaction type, amount, expiration behavior, merchant info, and error behaviour. Use `errorCode` to force a failure at the **Read** stage, or `confirmErrorCode` to force a failure at the **Confirm** stage. Both can be combined to test sequential error handling.

<ApiEndpoint method="POST" url="/wallet/qrcode/mock/generate-mock-qr-code" />

**Request**

<Tabs>
  <TabItem value="table" label="Query Parameters" default>

| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `qrCodeTransactionType` | String | Yes | 10 | `PAYMENT` or `REFUND` |
| `amount` | String | Yes | 12 | Transaction amount (pattern `999999999.99`). Use `"0.00"` or `"0"` for static QR. |
| `errorCode` | String | No | 50 | Forces a specific error at **Read** stage. See [Read Error Code Matrix](#read-error-code-matrix). |
| `confirmErrorCode` | String | No | 50 | Forces a specific error at **Confirm** stage. See [Confirm Error Code Matrix](#confirm-error-code-matrix). |
| `parentTransactionId` | String | Conditional | 11 | Required for `REFUND`. The original payment's `transactionId`. |
| `ttlSeconds` | Integer | No | - | Expiration offset in seconds (default is 300 seconds). |
| `merchantId` | String | No | 10 | Custom merchant ID (Tag 49) to embed in the QR code. If omitted (and not inherited from parent), defaults to a random 10-digit number. |
| `merchantName` | String | No | 25 | Custom merchant name (Tag 59) to embed in the QR code. If omitted (and not inherited from parent), defaults to `"E-PAYPORTER AS"`. |
| `mcc` | String | No | 4 | Custom Merchant Category Code (Tag 52) to embed in the QR code. If omitted (and not inherited from parent), defaults to a random MCC (e.g., 1520, 1711, 1731, 1740, 1750). |
| `authTimeout` | Boolean | No | - | If `true`, enables the 60-second authorization timeout for this transaction. When the partner confirms the QR and no card authorization arrives within 60 seconds, the transaction is automatically failed with `failureReason: AUTH_TIMEOUT`. Defaults to `false` in sandbox. **In production, auth timeout is always active regardless of this parameter.** |

  </TabItem>
</Tabs>

### Read Error Code Matrix

The `errorCode` parameter triggers an error when the partner calls the Read endpoint. The QR is generated, but the Read call fails with the specified error.

| `errorCode` Value | HTTP Status | Error Code Returned | Description |
|-------------------|-------------|---------------------|-------------|
| *(empty/omitted)* | — | — | Read succeeds normally. |
| `QR_CODE_USED` | 406 | `QR_CODE_USED` | QR code appears as already used by another application. |
| `QR_CODE_NOT_FOUND` | 406 | `QR_CODE_NOT_FOUND` | QR code appears as not found / invalid. |
| `QR_CODE_EXPIRED` | 406 | `QR_CODE_EXPIRED` | QR code appears as expired. |
| `QR_CODE_TRANSACTION_ERROR` | 406 | `QR_CODE_TRANSACTION_ERROR` | BKM processing error during QR read. |

### Confirm Error Code Matrix

The `confirmErrorCode` parameter triggers an error when the partner calls the Confirm endpoint. The Read call succeeds, allowing the partner to test Confirm-stage error handling independently.

| `confirmErrorCode` Value | HTTP Status | Error Code Returned | Description |
|--------------------------|-------------|---------------------|-------------|
| *(empty/omitted)* | — | — | Confirm proceeds normally. |
| `QR_CODE_EXPIRED` | 406 | `QR_CODE_EXPIRED` | QR code expired between Read and Confirm. |
| `QR_CODE_USED` | 406 | `QR_CODE_USED` | QR code consumed by another application between Read and Confirm. |
| `QR_CODE_TRANSACTION_ERROR` | 406 | `QR_CODE_TRANSACTION_ERROR` | BKM processing error during Confirm. |

### Partner-Triggered Confirm Errors

These errors are triggered by the partner's request data, not by mock parameters. They work the same in sandbox and production:

| Test Case | How to Trigger | HTTP Status | Error Code |
|-----------|---------------|-------------|------------|
| Idempotency mismatch | Confirm same `transactionId` with a *different* `tenantReferenceId` | 409 | `QR_CODE_IDEMPOTENCY_MISMATCH` |
| Duplicate reference | Confirm *different* `transactionId` with a *previously used* `tenantReferenceId` | 409 | `TENANT_REFERENCE_ID_ALREADY_USED` |
| Idempotent success | Confirm same `transactionId` with the *same* `tenantReferenceId` | 200 | — (returns original response) |
| Missing reference | Confirm PAYMENT without `tenantReferenceId` | 406 | `QR_CODE_TENANT_REFERENCE_ID_EMPTY` |
| Amount mismatch | Confirm with amount different from the QR code (dynamic QR) | 406 | `QR_CODE_AMOUNT_MISMATCH` |
| Invalid amount | Confirm with `amount <= 0` | 406 | `QR_CODE_AMOUNT_INVALID` |

:::note Mock Authorization
To test webhooks, use the `start-mock-authorization` endpoint after Confirm returns `IN_PROGRESS`. To simulate a `FAILED` outcome, generate a QR code with an amount exceeding the wallet's available balance.
:::

### Response

Returns the raw QR code string as plain text (not JSON).

```text
"00020101021226800010TR.COM.BKM06011083219a632ee403e49b1c5505258311606280910TDVMAUJ0001001N110200491000234156725195000210020499980312843904678755040202052312345678901234567890ABC0612260225142423071226022514292352045661530394954120000000025005802TR5914Faruk Eczanesi6007ANTALYA6105070006304AA55"
```

---

## Start Mock Authorization

Sends an authorization request for an `IN_PROGRESS` QR transaction (normal payment path), or simulates an externally-originated clearing message for headless refund scenarios (`LATE_REVERSAL`, `USER_NOT_PRESENT_REFUND`).

The request goes through the real prepaid auth service — the final outcome depends on the wallet's available balance.

<ApiEndpoint method="POST" url="/wallet/qrcode/mock/start-mock-authorization" />

**Request**

<Tabs>
  <TabItem value="table" label="Query Parameters" default>

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `transactionId` | String | Yes | Transaction ID (must be in `IN_PROGRESS` status for payment, or `COMPLETED` for external refund paths) |
| `externalSource` | String | No | `LATE_REVERSAL` or `USER_NOT_PRESENT_REFUND`. Omit for the normal payment authorization path. |
| `amount` | String | Conditional | Required only when `externalSource=USER_NOT_PRESENT_REFUND`. The refund amount (must not exceed the original payment amount). |

  </TabItem>
</Tabs>

### Normal Payment Path

When `externalSource` is omitted, simulates BKM Switch sending a clearing message for a payment that is `IN_PROGRESS`. Outcome depends on wallet balance:

| Outcome | Condition | Webhook Event |
|---------|-----------|-------------------|
| `COMPLETED` | Sufficient balance | `qr_payment.completed` |
| `FAILED` | Insufficient balance or auth rejection | `qr_payment.failed` |

:::tip Testing the FAILED webhook path
Generate a mock QR with an `amount` larger than the wallet's current balance (check via [Balance Inquiry](./balance-inquiry)). After Read → Confirm → Start Mock Authorization, the auth service rejects the transaction and fires a `qr_payment.failed` webhook.
:::

### External Refund Paths

When `externalSource` is provided, simulates a clearing message arriving directly from BKM Switch without a prior Read/Confirm step. The target `transactionId` must be a `COMPLETED` payment.

| `externalSource` | Auth Type | Description | Expected Timing |
|---|---|---|---|
| `LATE_REVERSAL` | SALE/R (reversal) | Reverses a completed payment. No `amount` needed — the full original amount is reversed. Only one reversal per payment is allowed. | Near real-time (~10 s) |
| `USER_NOT_PRESENT_REFUND` | REFUND/N (delayed refund) | Refunds a partial or full amount back to the wallet. `amount` is required and must not exceed the total payment amount. | **30 s in UAT**, 3 min in production |

:::important UAT refund delay
The `USER_NOT_PRESENT_REFUND` clearing message is queued with a delay before the auth service processes it:
- **UAT / MIG environment:** 30 seconds
- **Production:** 3 minutes

Do not query the transaction or webhook event log until the respective window has elapsed.
:::

:::note Duplicate guard — LATE_REVERSAL
Submitting a second `LATE_REVERSAL` for the same `transactionId` will be rejected with an error. Each completed payment can only be reversed once.
:::

### Response (200)

Returns a JSON object with the IDs of the resulting child transaction and the original parent:

```json
{
  "transactionId": "47003662389",
  "parentTransactionId": "47002978001"
}
```

| Field | Description |
|---|---|
| `transactionId` | ID of the **child** transaction (the authorization / reversal / refund record). Use this to query status and webhook events. |
| `parentTransactionId` | ID of the **parent** (original payment) transaction. |

:::note
After receiving the response, use `transactionId` (the child) with [Query Transaction](./query-transaction) and [Query Webhook Event Log](#query-webhook-event-log) to verify the outcome. For `USER_NOT_PRESENT_REFUND` wait for the applicable delay before querying (30 s in UAT, 3 min in production).
:::

---

## Query Webhook Event Log

Returns the webhook delivery history for a given transaction. Returns an array of all webhook events associated with the transaction. Enables self-service verification without database access.

<ApiEndpoint method="POST" url="/wallet/qrcode/mock/webhook-event-log" />

**Request**

<Tabs>
  <TabItem value="table" label="Query Parameters" default>

| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `transactionId` | String | Yes | 11 | The transaction ID to look up |

  </TabItem>
</Tabs>

### Response (200)

Returns an **array** of webhook event log entries.

```json
[
  {
    "eventId": "a3f2b1c4-5678-9abc-def0-123456789abc",
    "eventType": "qr_payment.completed",
    "status": "DELIVERED",
    "attemptCount": 1,
    "webhookUrl": "mock-success-webhook",
    "httpStatusCode": 200,
    "createdAt": "2026-05-10T01:15:00Z",
    "deliveredAt": "2026-05-10T01:15:01Z",
    "lastAttemptAt": "2026-05-10T01:15:01Z",
    "errorMessage": null
  }
]
```

| Field | Type | Presence | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `eventId` | String | Always | 36 | UUID of the webhook event |
| `eventType` | String | Always | 30 | `qr_payment.completed` or `qr_payment.failed` |
| `status` | String | Always | 20 | `PENDING`, `DELIVERED`, `FAILED`, or `EXHAUSTED` |
| `attemptCount` | Integer | Always | - | Number of delivery attempts so far |
| `webhookUrl` | String | Always | 500 | Target URL (or `mock-success-webhook` for mock) |
| `httpStatusCode` | Integer | Always | - | Last HTTP response status (200 for mock) |
| `createdAt` | String | Always | 24 | Event creation timestamp (ISO 8601) |
| `deliveredAt` | String | Conditional | 24 | Successful delivery timestamp, or `null` |
| `lastAttemptAt` | String | Always | 24 | Most recent attempt timestamp |
| `errorMessage` | String | Conditional | 500 | Last error message, or `null` |

### Response (406)

No webhook event found for the given transaction.

---

## Retry Webhook Delivery

Manually re-triggers webhook delivery for a transaction. Uses the most recent webhook event log entry for the retry. Useful for testing the retry flow without waiting for the scheduled retry job.

<ApiEndpoint method="POST" url="/wallet/qrcode/mock/retry-webhook" />

**Request**

<Tabs>
  <TabItem value="table" label="Query Parameters" default>

| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `transactionId` | String | Yes | 11 | The transaction ID to retry |

  </TabItem>
</Tabs>

### Response (200)

```json
{
  "eventId": "a3f2b1c4-5678-9abc-def0-123456789abc",
  "status": "DELIVERED",
  "attemptCount": 2,
  "message": "Webhook retry triggered successfully"
}
```

### Response (406)

No eligible webhook event found for retry.

---

## Rotate Webhook Signing Key

Generates a new RSA-2048 keypair for webhook signature verification. The private key is stored server-side; the public key PEM is returned for the partner to verify `x-request-signature` headers on incoming webhooks.

<ApiEndpoint method="POST" url="/wallet/qrcode/mock/rotate-webhook-key" />

### Response (200)

```json
{
  "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqh...\n-----END PUBLIC KEY-----",
  "algorithm": "SHA256withRSA",
  "header": "x-request-signature",
  "message": "Key rotated. Use this public key to verify x-request-signature header."
}
```

| Field | Type | Presence | Description |
| :--- | :--- | :--- | :--- |
| `publicKey` | String | Always | RSA public key in PEM format. Use to verify `x-request-signature`. |
| `algorithm` | String | Always | Signature algorithm (`SHA256withRSA`). |
| `header` | String | Always | HTTP header name containing the signature. |
| `message` | String | Always | Human-readable confirmation message. |

---

## Update Webhook URL

Updates the webhook delivery URL for the authenticated wallet. If `webhookUrl` is omitted or empty, resets to mock delivery mode (no real HTTP call is made).

:::important Network Access Setup
After updating the webhook URL, you must contact PayPorter to set up the necessary network access/firewall configurations to allow webhook delivery to your server.
:::

<ApiEndpoint method="POST" url="/wallet/qrcode/mock/update-webhook-url" />

**Request**

<Tabs>
  <TabItem value="table" label="Query Parameters" default>

| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `webhookUrl` | String | No | 500 | The webhook URL to receive notifications. If empty, resets to mock delivery. |

  </TabItem>
</Tabs>

### Response (200)

<Tabs>
  <TabItem value="set" label="URL Set" default>

```json
{
  "webhookUrl": "https://partner.example.com/webhook",
  "message": "Webhook URL updated. Notifications will POST to this URL."
}
```

  </TabItem>
  <TabItem value="reset" label="URL Reset">

```json
{
  "webhookUrl": "mock-success-webhook",
  "message": "Webhook URL reset to mock (no HTTP delivery)."
}
```

  </TabItem>
</Tabs>

| Field | Type | Presence | Description |
| :--- | :--- | :--- | :--- |
| `webhookUrl` | String | Always | The effective webhook URL after the update. |
| `message` | String | Always | Human-readable result description. |

---

## UAT Testing Guide

For a step-by-step walkthrough of all test scenarios, timing expectations, and a pre-production acceptance checklist, see the dedicated **[UAT Testing Guide](./uat-testing-guide)**.
