---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Read QR Code

This endpoint retrieves transaction details (amount, merchant info, etc.) from a raw QR code string scanned from a merchant's POS or static display.

<ApiEndpoint method="POST" url="/qrcode/payment/read" />

## Overview

When a user scans a QR code, the mobile application should send the raw QR content to this endpoint. The response will contain all relevant information required to display a confirmation screen to the user.

---

## Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| qrCode | Yes | string | The raw QR code string scanned by the camera. |

  </TabItem>
  <TabItem value="request_example" label="Example Request">

```json
{
  "qrCode": "999998261035605117b00490089854ce1ed71c8898da336966E827"
}
```

  </TabItem>
  <TabItem value="curl" label="cURL">

```shell
curl -X POST https://apilist.payporter.com.tr:81/online/qrcode/payment/read \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{ "qrCode": "999998261035605117b00490089854ce1ed71c8898da336966E827" }'
```

  </TabItem>
</Tabs>

## Response

<ApiResponseSelector>

```json status="200" title="Success"
{
  "transactionId": 470023232,
  "transactionType": "PAYMENT",
  "status": "READ_QR",
  "amount": 84,
  "currency": "TRY",
  "qrGenerationDate": "2025-07-14T15:53:21.000+0300",
  "qrExpireDate": "2026-07-14T15:53:21.000+0300",
  "merchantId": 98765433210,
  "mcc": 5411,
  "merchantName": "Lezzet Lokantası",
  "countryCode": "TR",
  "merchantCity": "ANTALYA",
  "terminalType": "STATIC_QRCODE",
  "terminalId": "12345678901234567890ABC"
}
```

```json status="400" title="Invalid QR"
{
  "header": {
    "success": false,
    "message": "INVALID_QR_CODE"
  }
}
```

</ApiResponseSelector>

:::tip Transaction Types
The `transactionType` field indicates whether the QR code is for a **PAYMENT** or a **REFUND**.
:::
