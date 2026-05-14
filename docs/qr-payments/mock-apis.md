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

In sandbox, webhooks are automatically delivered as mock if no real webhook is configured for your wallet — no real HTTP call is made. Webhook event logs are still created normally, enabling verification via the [webhook-event-log](#query-webhook-event-log) endpoint. To configure a real webhook URL for sandbox, contact PayPorter via email.
:::

## Generate Mock QR Code

Generates a BKM-format QR code with configurable transaction type, amount, and error behaviour. Use `errorCode` to force a failure at the **Read** stage, or `confirmErrorCode` to force a failure at the **Confirm** stage. Both can be combined to test sequential error handling.

<ApiEndpoint method="GET" url="/wallet/qrcode/generate-mock-qr-code" />

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

Sends an authorization approval request for an `IN_PROGRESS` transaction. The request goes through the real prepaid auth service — the final outcome depends on whether the wallet has sufficient balance to cover the transaction amount.

<ApiEndpoint method="GET" url="/wallet/qrcode/start-mock-authorization" />

| Outcome | Condition | Webhook Event Type |
|---------|-----------|-------------------|
| `COMPLETED` | Wallet has sufficient balance | `qr_payment.completed` |
| `FAILED` | Insufficient balance or authorization rejection | `qr_payment.failed` |

:::tip Testing the FAILED webhook path
**Testing the `FAILED` webhook path:** Generate a mock QR code with an `amount` larger than the wallet's current balance (check via [Balance Inquiry](./balance-inquiry)). After Read → Confirm → Start Mock Authorization, the auth service will reject the transaction due to insufficient funds, producing a `qr_payment.failed` webhook.
:::

**Request**

<Tabs>
  <TabItem value="table" label="Query Parameters" default>

| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `transactionId` | String | Yes | 11 | Transaction ID (must be in `IN_PROGRESS` status) |

  </TabItem>
</Tabs>

### Response

`200 OK` (No Content)

:::note
After calling this endpoint, use [Query Webhook Event Log](#query-webhook-event-log) to verify the webhook delivery result.
:::

---

## Query Webhook Event Log

Returns the webhook delivery status for a given transaction. Enables self-service verification without database access.

<ApiEndpoint method="GET" url="/wallet/qrcode/mock/webhook-event-log" />

**Request**

<Tabs>
  <TabItem value="table" label="Query Parameters" default>

| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `transactionId` | String | Yes | 11 | The transaction ID to look up |

  </TabItem>
</Tabs>

### Response (200)

```json
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

Manually re-triggers webhook delivery for a transaction. Useful for testing the retry flow without waiting for the scheduled retry job.

<ApiEndpoint method="GET" url="/wallet/qrcode/mock/retry-webhook" />

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
