---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Read QR Info

Returns transaction details for a scanned QR code. The `transactionType` field indicates whether this is a `PAYMENT` or `REFUND`.

<ApiEndpoint method="POST" url="/wallet/qrcode/payment/read" />

**Request**

<Tabs>
  <TabItem value="table" label="Request Body" default>

| Field | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `qrCode` | String | Yes | 500 | The QR code string scanned by the camera. |
| `tenantUserId` | String | Yes | 50 | The unique identifier of the user in the tenant's system. Used for logging purposes. |

  </TabItem>
  <TabItem value="request_example" label="Example Request">

```json
{
  "qrCode": "999998261035605117b00490089854ce1ed71c8898da336966E827",
  "tenantUserId": "SVC_TC_1_1"
}
```

  </TabItem>
</Tabs>

## Read Error Codes

See [Error Response Format](./intro#error-response-format).

| HTTP Status | Code                | Description                                             |
|-------------|---------------------|---------------------------------------------------------|
| `406` | `QR_CODE_EMPTY`     | The `qrCode` field is missing or blank.                 |
| `406` | `QR_CODE_TENANT_USER_ID_EMPTY` | The `tenantUserId` field is missing or blank.       |
| `406` | `QR_CODE_NOT_FOUND` | No transaction found for the given QR code.             |
| `406` | `QR_CODE_EXPIRED`   | The QR code has expired.                                |
| `406` | `QR_CODE_USED`      | The QR code has been read by another application, not our API. |
| `406` | `QR_CODE_TRANSACTION_ERROR` | A processing error occurred while reading the QR code.  |

## Read Response

The response body is a [Payment Object](./payment-object) with the following endpoint-specific behaviour:

- **`tenantReferenceId`** and **`tenantUserId`** are always `null` at Read phase (no Confirm has occurred yet).
- **`amount`**: For payment transactions, `null` when the QR is static (the partner must collect the amount from the user before Confirm). Always present for refund transactions.
- **`parentTransactionId`**: Present only for `REFUND` transactions.

:::warning
If the returned `amount` is `null`, the partner presents an amount entry UI to the user before proceeding.
:::

**Cancellation equivalence:** BKM `transactionType = 3` (Cancellation) is treated identically to `transactionType = 4` (Refund). Both are returned as `transactionType: REFUND` in the API response.

**Partial & multiple refunds:** Partial refund amounts are supported. The same original payment may be refunded multiple times, each producing a separate REFUND transaction linked via `parentTransactionId`. The refund amount in the QR code is fixed by the merchant POS and cannot be modified during Confirm. Sending a different amount returns `QR_CODE_AMOUNT_MISMATCH`.

<Tabs>
  <TabItem value="payment" label="Payment" default>
<ApiResponseSelector>

```json status="200" title="Payment Read Response"
{
  "transactionId": "47002323201",
  "tenantReferenceId": null,
  "tenantUserId": null,
  "transactionType": "PAYMENT",
  "transactionSource": "MERCHANT_QR_SCAN",
  "status": "READ_QR",
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

```json status="406" title="QR Code Not Found"
{
  "status": "error",
  "code": "QR_CODE_NOT_FOUND",
  "message": "No transaction found for the given QR code."
}
```

```json status="406" title="QR Code Expired"
{
  "status": "error",
  "code": "QR_CODE_EXPIRED",
  "message": "The QR code has expired."
}
```

```json status="406" title="QR Code Used"
{
  "status": "error",
  "code": "QR_CODE_USED",
  "message": "The QR code has been read by another application."
}
```

</ApiResponseSelector>
  </TabItem>
  <TabItem value="refund" label="Refund">
<ApiResponseSelector>

```json status="200" title="Refund Read Response"
{
  "transactionId": "47002323302",
  "parentTransactionId": "47002323201",
  "tenantReferenceId": null,
  "tenantUserId": null,
  "transactionType": "REFUND",
  "transactionSource": "MERCHANT_QR_SCAN",
  "status": "READ_QR",
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
