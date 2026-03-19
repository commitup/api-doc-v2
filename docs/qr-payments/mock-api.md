---
sidebar_position: 5
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';

# Mock APIs

Use these utility endpoints to test the QR payment flow without needing a physical POS terminal or a real QR generator.

## Generate Mock QR Code

Generates a valid (but mock) QR code string that can be used as input for the `/qrcode/payment/read` endpoint.

<ApiEndpoint method="GET" url="/external/qrcode/generate" />

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| type | string | `PAYMENT` or `REFUND`. |
| scenario | string | Optional. `SUCCESS`, `EXPIRED`, `USED`, `NOT_FOUND`, `ERROR`. |

### Response Example

```json
"00020101021226800010TR.COM.BKM06011083219a632ee403e49b1c5505258311606280910TDVMAUJ0001001N110200491000234156725195000210020499980312843904678755040202052312345678901234567890ABC0612260225142423071226022514292352045661530394954120000000025005802TR5914Faruk Eczanesi6007ANTALYA6105070006304AA55"
```

---

## Start Mock Authorization

Simulates the asynchronous processing of a transaction that is in the `IN_PROGRESS` status. Calling this will trigger the Webhook notification.

<ApiEndpoint method="POST" url="/external/qrcode/authorize" />

### Request Body

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| transactionId | Yes | number | The ID of the transaction to authorize. |

```json
{
  "transactionId": 470023232
}
```

### Response

Returns `200 OK` (No Content) if the authorization simulation was successfully queued.
