---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Webhooks

Receive real-time notifications for the final status of your QR transactions (Payments and Refunds).

## Overview

Since QR transactions are processed asynchronously after the `/confirm` call, you must provide a webhook URL to receive the final result. PayPorter will send a `POST` request to your registered endpoint when a transaction is **COMPLETED** or **FAILED**.

---

## Webhook Payload

The payload contains the full transaction details, similar to the response of the `/read` and `/confirm` endpoints, but with the updated `status`.

<Tabs>
  <TabItem value="payment" label="PAYMENT Example" default>

```json
{
  "transactionId": 470023232,
  "parentTransactionId": null,
  "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
  "transactionType": "PAYMENT",
  "status": "COMPLETED",
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

  </TabItem>
  <TabItem value="refund" label="REFUND Example">

For refunds, the `parentTransactionId` will contain the ID of the original payment transaction.

```json
{
  "transactionId": 470023233,
  "parentTransactionId": 470023232,
  "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
  "transactionType": "REFUND",
  "status": "COMPLETED",
  "amount": 84,
  "currency": "TRY",
  "qrGenerationDate": null,
  "qrExpireDate": null,
  "merchantId": 98765433210,
  "mcc": 5411,
  "merchantName": "Lezzet Lokantası",
  "countryCode": "TR"
}
```

  </TabItem>
</Tabs>

## Security & Verification

:::info Verification
PayPorter strongly recommends verifying the authenticity of webhook requests. Please refer to the general [Webhook Security Guide](../introduction/intro) (if applicable) or contact support for information on HMAC signatures or IP whitelisting.
:::
