---
sidebar_position: 11
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Settlement

Reconciliation endpoints used to retrieve transfers or payments between two dates.

---

## Transfer Settlement

This endpoint is used to get transfers between two dates. It is used for the settlement of the transfer.

<ApiEndpoint method="POST" url="/api/v2/reconciliation/transfer" />

### Request

#### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| Authorization | Yes | Bearer token |

#### Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| begin | Yes | string | ISO-8601 formatted start date and time. |
| end | Yes | string | ISO-8601 formatted end date and time. |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "begin":"2023-08-09T06:26:10.274Z",
  "end":"2023-08-10T06:26:10.274Z"
}
```

  </TabItem>
</Tabs>

### Response

<ApiResponseSelector>
<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| processReferenceNo | string | Process reference number. |
| apiAgentTxnRefNo | string | Your original transaction reference. |
| sendDate | string | Transfer send date. |
| insertUser | string | The user who created the transfer. |
| amount | number | Transfer amount. |
| currency | string | Transfer currency. |
| receiverPayOutAmount | number | Payout amount for the receiver. |
| receiverPayoutCurrency | string | Payout currency. |
| receiverPayOutAmountExchangeRate | number | Exchange rate used. |
| commissionAmount | number | Commission amount. |
| commissionCurrency | string | Commission currency. |
| statusId | number | Transfer status ID. |
| status | string | Status description (e.g., Cancelled, Refunded). |
| transferType | string | Type of the transfer. |
| receiverName | string | Name of the receiver. |
| receiverAccountNo | string | Account number of the receiver, if applicable. |
| receiverWalletNo | string | Wallet number of the receiver, if applicable. |
| fromCountry | string | Sender country code (ISO 3166-1 alpha-3). |
| toCountry | string | Receiver country code (ISO 3166-1 alpha-3). |
| updateDate | string | Last update date. |

  </TabItem>
  <TabItem value="example" label="Example Response">

```json status="200" title="Success"
{
  "header": {
    "success": true,
    "code": "1",
    "message": "OPERATION_DONE_SUCCESSFUL",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": [
    {
      "processReferenceNo": "47000821165",
      "apiAgentTxnRefNo": "TESTPAY1691589422652",
      "sendDate": "2023-08-09T16:57:57.733+0300",
      "insertUser": "ttestpay2",
      "amount": 50,
      "currency": "USD",
      "receiverPayOutAmount": 14266.98,
      "receiverPayoutCurrency": "PKR",
      "receiverPayOutAmountExchangeRate": 285.339672,
      "commissionAmount": 3,
      "commissionCurrency": "USD",
      "statusId": 3,
      "status": "Cancelled",
      "transferType": "TRANSFER_TO_NAME",
      "receiverName": "JHON DOE",
      "receiverAccountNo": null,
      "receiverWalletNo": null,
      "fromCountry": "UZB",
      "toCountry": "PAK",
      "updateDate": "2023-08-09T17:34:21.789+0300"
    }
  ]
}
```

  </TabItem>
</Tabs>
</ApiResponseSelector>

---

## Payment Settlement

This endpoint is used to get payments between two dates. It is used for the settlement of the payment.

<ApiEndpoint method="POST" url="/api/v2/reconciliation/payment" />

### Request

#### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| Authorization | Yes | Bearer token |

#### Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| begin | Yes | string | ISO-8601 formatted start date and time. |
| end | Yes | string | ISO-8601 formatted end date and time. |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "begin":"2023-08-09T06:26:10.274Z",
  "end":"2023-08-10T06:26:10.274Z"
}
```

  </TabItem>
</Tabs>

### Response

<ApiResponseSelector>
<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| processReferenceNo | string | Process reference number. |
| apiAgentTxnRefNo | string | Your original transaction reference. |
| paymentDate | string | Payment date. |
| insertUser | string | The user who created the payment. |
| incomingAmount | number | Incoming payment amount. |
| incomingAmountCurrency | string | Incoming amount currency. |
| paymentStatus | number | Payment status ID. |
| commissionAmount | number | Commission amount. |
| commissionAmountCurrency | string | Commission currency. |
| fromCountry | string | Sender country code (ISO 3166-1 alpha-3). |
| toCountry | string | Receiver country code (ISO 3166-1 alpha-3). |
| updateDate | string | Last update date. |

  </TabItem>
  <TabItem value="example" label="Example Response">

```json status="200" title="Success"
{
  "header": {
    "success": true,
    "code": "1",
    "message": "OPERATION_DONE_SUCCESSFUL",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": [
    {
      "processReferenceNo": "47005054711",
      "apiAgentTxnRefNo": null,
      "paymentDate": "2024-02-09T16:43:56.671+0300",
      "insertUser": "faturamatik",
      "incomingAmount": 10,
      "incomingAmountCurrency": "USD",
      "paymentStatus": 4,
      "commissionAmount": 0.02,
      "commissionAmountCurrency": "USD",
      "fromCountry": "TUR",
      "toCountry": "TUR",
      "updateDate": "2024-02-09T16:45:01.052+0300"
    }
  ]
}
```

  </TabItem>
</Tabs>
</ApiResponseSelector>
