---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Confirm Payment

- For payments, the partner debits the resolved amount from the customer's account **before** calling Confirm. See [Partner Fund Safety Model](./safety-model) for detailed timing.
- For refunds, the partner must **not** credit the customer before Confirm. Credit the customer **only after** receiving a `COMPLETED` webhook. If the webhook delivers `FAILED`, do **not** credit. See [Partner Fund Safety Model](./safety-model).
- When the returned status is `IN_PROGRESS`, the final result will be delivered asynchronously via the [Webhook](./webhooks).

:::warning Authorization timeout (60 seconds)
After Confirm returns `IN_PROGRESS`, if no card authorization is received within **60 seconds**, the transaction is automatically failed with `failureReason: AUTH_TIMEOUT` and a `qr_payment.failed` webhook is sent. The partner must reverse the customer debit (for payments) or take no action (for refunds, since no credit was issued yet).

This timeout is independent of the 180-second refund delay (POS cancel window), which applies *after* a successful refund authorization.
:::

<ApiEndpoint method="POST" url="/wallet/qrcode/payment/confirm" />

:::important Failure handling
**Failure handling:** If Confirm returns a synchronous error (HTTP 406/409), the transaction is **rejected and no webhook will be sent**. The partner must immediately reverse the customer debit. If the webhook delivers `status: FAILED`, the partner must likewise reverse the debit.

**Timeout / 5xx handling:** If the Confirm call times out or returns an HTTP 5xx error, retry the same request with **identical values**. The [idempotency mechanism](./safety-model#confirm-idempotency) ensures no duplicate processing.
:::

**Request**

<Tabs>
  <TabItem value="table" label="Request Body" default>

| Field | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `transactionId` | String | Yes | 11 | The unique identifier of the transaction. |
| `tenantReferenceId` | String | Conditional | 100 | Required for PAYMENT. Optional for REFUND. **Must be unique per payment** — reuse across different transactions returns `TENANT_REFERENCE_ID_ALREADY_USED`. |
| `amount` | String | Yes | 12 | The transaction amount (pattern `999999999.99`). For dynamic QR, must match the amount returned by Read. For refund QR, must match the refund amount in the QR code — sending a different value returns `QR_CODE_AMOUNT_MISMATCH`. |
| `tenantUserId` | String | Yes | 50 | The unique identifier of the tenant's user/customer. |
| `tenantName` | String | No | 50 | The name of the tenant user. |
| `tenantSurname` | String | No | 50 | The surname of the tenant user. |
| `tenantNationality` | String | No | 3 | Nationality of the tenant user (ISO 3166-1 alpha-3, e.g. `TUR`). |
| `tenantBirthDate` | String | No | 10 | Birth date of the tenant user (ISO 8601 date, e.g. `1996-12-28`). |

  </TabItem>
  <TabItem value="request_example" label="Example Request">

```json
{
  "transactionId": "47002323201",
  "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
  "amount": "84.00",
  "tenantUserId": "364",
  "tenantName": "Tahir",
  "tenantSurname": "incedere",
  "tenantNationality": "TUR",
  "tenantBirthDate": "1996-12-28"
}
```

  </TabItem>
</Tabs>

## Confirm Error Codes

See [Error Response Format](./intro#error-response-format).

| HTTP Status | Code | Description | Category | Expected in Production? |
|-------------|------|-------------|----------|----------------|
| `406` | `QR_CODE_TRANSACTION_ID_EMPTY` | The `transactionId` field is missing or blank. | Integration | No — indicates a request construction bug. |
| `406` | `QR_CODE_TENANT_USER_ID_EMPTY` | The `tenantUserId` field is missing. | Integration | No — indicates a request construction bug. |
| `406` | `QR_CODE_TENANT_REFERENCE_ID_EMPTY` | The `tenantReferenceId` field is missing (required for payments). | Integration | No — indicates a request construction bug. |
| `406` | `QR_CODE_AMOUNT_EMPTY` | The `amount` field is missing. | Integration | No — indicates a request construction bug. |
| `406` | `QR_CODE_AMOUNT_INVALID` | The `amount` field is invalid (for example, it is 0 or negative). | Integration | No — indicates a request construction bug. |
| `406` | `QR_CODE_AMOUNT_MISMATCH` | The provided amount does not match the amount in the QR code (dynamic QR or refund QR). | Orchestration | No — indicates a logic error between Read and Confirm. |
| `406` | `QR_CODE_TRANSACTION_NOT_FOUND` | No transaction found for the given identifier. Unexpected after a successful Read. | Orchestration | No — Should not occur after a successful Read. |
| `409` | `QR_CODE_IDEMPOTENCY_MISMATCH` | The `tenantUserId` or `tenantReferenceId` (if payment) does not match the values from the original Confirm. | Orchestration | No — indicates a retry with inconsistent values. |
| `409` | `TENANT_REFERENCE_ID_ALREADY_USED` | The `tenantReferenceId` has already been used by a different transaction. | Orchestration | No — indicates duplicate reference generation. |
| `406` | `QR_CODE_EXPIRED` | The QR code has expired (user delayed on confirmation page). | Business | **Yes** — expected in normal flows. |
| `406` | `QR_CODE_USED` | The QR code has been read by another application, not our API. | Business | **Yes** — expected in normal flows. |
| `406` | `QR_CODE_TRANSACTION_ERROR` | A processing error occurred during BKM Switch processing. | BKM Processing | **Yes** — transient infrastructure failure. |

### Confirm Error Handling by Category

| Category | Webhook Follows? | Recommended Action |
|----------|-----------------|-------------------|
| **Integration** | No | Monitor & alert. Reverse debit, await manual investigation. Should not reach production if integration is validated. |
| **Orchestration** | No | Monitor & alert. Reverse debit, await manual investigation. Indicates a logic error in your integration. |
| **Business** | No | **Reverse debit immediately.** |
| **BKM Processing** | No | **Reverse debit immediately.** Expected occasionally. Monitor & alert if frequently occurs. |
| **5XX or Network timeout** | Unknown | **Retry the same request with identical values.** See [Confirm Retry & Fallback Strategy](./confirm-retry-fallback). |

## Confirm Response

The response body is a [Payment Object](./payment-object) with the following endpoint-specific behaviour:

- **`status`** is `IN_PROGRESS` on the first successful Confirm. On idempotent retries, the current status (`IN_PROGRESS`, `COMPLETED`, or `FAILED`) is returned.
- **`tenantReferenceId`**: Always present for payments. Optional for refunds (may be `null`).
- **`tenantUserId`**: Always present.
- **`parentTransactionId`**: Present only for `REFUND` transactions.

<Tabs>
  <TabItem value="payment" label="Payment" default>
<ApiResponseSelector>

```json status="200" title="Payment Confirm — IN_PROGRESS"
{
  "transactionId": "47002323201",
  "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
  "tenantUserId": "364",
  "transactionType": "PAYMENT",
  "transactionSource": "MERCHANT_QR_SCAN",
  "status": "IN_PROGRESS",
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

```json status="406" title="QR Code Expired"
{
  "status": "error",
  "code": "QR_CODE_EXPIRED",
  "message": "The QR code has expired."
}
```

```json status="406" title="Amount Mismatch"
{
  "status": "error",
  "code": "QR_CODE_AMOUNT_MISMATCH",
  "message": "The provided amount does not match the amount in the QR code."
}
```

```json status="409" title="Idempotency Mismatch"
{
  "status": "error",
  "code": "QR_CODE_IDEMPOTENCY_MISMATCH",
  "message": "The tenantUserId or tenantReferenceId does not match the original Confirm."
}
```

```json status="409" title="Duplicate Reference"
{
  "status": "error",
  "code": "TENANT_REFERENCE_ID_ALREADY_USED",
  "message": "The tenantReferenceId has already been used by a different transaction."
}
```

</ApiResponseSelector>
  </TabItem>
  <TabItem value="refund" label="Refund">
<ApiResponseSelector>

```json status="200" title="Refund Confirm — IN_PROGRESS"
{
  "transactionId": "47002323302",
  "parentTransactionId": "47002323201",
  "tenantReferenceId": null,
  "tenantUserId": "364",
  "transactionType": "REFUND",
  "transactionSource": "MERCHANT_QR_SCAN",
  "status": "IN_PROGRESS",
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

```json status="406" title="QR Code Expired"
{
  "status": "error",
  "code": "QR_CODE_EXPIRED",
  "message": "The QR code has expired."
}
```

</ApiResponseSelector>
  </TabItem>
</Tabs>
