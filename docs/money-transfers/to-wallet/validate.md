---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Validate - to Wallet

Validate a money transfer request to an electronic wallet.

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-wallet/validate" />

---

## Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| amount | Yes | number | The amount to be sent. |
| currency | Yes | string | ISO 4217 currency code. |
| toWalletId | Yes | string | Unique ID of the receiving wallet. |
| sender | Yes | object | Identifies the sender. See [Person Object](#person-object). |
| receiver | Yes | object | Identifies the recipient. See [Person Object](#person-object). |

  </TabItem>
  <TabItem value="request_example" label="Example Request">

```json
{
  "amount": 50,
  "currency": "USD",
  "toWalletId": "W-5582991",
  "sender": { "firstName": "John", "lastName": "Doe" },
  "receiver": { "firstName": "Jane", "lastName": "Smith" }
}
```

  </TabItem>
</Tabs>

## Response

<ApiResponseSelector>

```json status="200" title="Success"
{
  "body": {
    "responseObject": {
      "amount": 50,
      "feeAmount": 2,
      "receiverPayOutAmount": 48
    },
    "restHeader": {
      "success": true,
      "message": "OPERATION_DONE_SUCCESSFUL"
    }
  }
}
```

</ApiResponseSelector>

---

## Person Object

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| firstName | Yes | string | First name. |
| lastName | Yes | string | Last name. |
| mobileNo | Yes | string | Phone number without country code. |
| address | Yes | string | Full address. |
| addressCountryCode | Yes | string | ISO country code. |
