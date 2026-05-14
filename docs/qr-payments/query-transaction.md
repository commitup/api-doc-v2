---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Query Transaction

- Finds and returns the details of a transaction by either `transactionId` or `tenantReferenceId` (exactly one must be provided).
- If both parameters are provided, the request is treated as if neither was provided and returns `QR_CODE_QUERY_IDENTIFIER_EMPTY`.
- This endpoint can also be used to query externally triggered refunds (disputes, late reversals) using the `transactionId` received via webhook.

<ApiEndpoint method="GET" url="/wallet/qrcode/transactions" />

**Request**

<Tabs>
  <TabItem value="table" label="Query Parameters" default>

| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `transactionId` | String | If `tenantReferenceId` empty | 11 | PayPorter transaction ID. |
| `tenantReferenceId` | String | If `transactionId` empty | 100 | Partner's unique reference ID. |

  </TabItem>
</Tabs>

## Query Error Codes

See [Error Response Format](./intro#error-response-format).

| HTTP Status | Code | Description |
|-------------|------|-------------|
| `406` | `QR_CODE_TRANSACTION_NOT_FOUND` | No transaction found for the given identifier. |
| `406` | `QR_CODE_QUERY_IDENTIFIER_EMPTY` | Neither `transactionId` nor `tenantReferenceId` was provided (or both were provided). |

## Query Response

The response body is a [Payment Object](./payment-object) with the following endpoint-specific behaviour:

- **`tenantReferenceId`**: Optional for refund transactions (may be `null`).
- **`tenantUserId`**: Always present (for transactions that have been confirmed).
- **`parentTransactionId`**: Present only for `REFUND` transactions.

<Tabs>
  <TabItem value="response_example" label="Example Response" default>
<ApiResponseSelector>

```json status="200" title="Success"
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

</ApiResponseSelector>
  </TabItem>
</Tabs>
