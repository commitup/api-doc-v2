---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Validate - to Card

Validate a money transfer request directly to a recipient's debit or credit card.

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-card/validate" />

---

## Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| amount | Yes | number | The amount to be sent. |
| currency | Yes | string | ISO 4217 currency code. |
| cardType | Yes | string | Type of card (e.g., KORTI). |
| toCountryCode | Yes | string | Destination country. |
| toCardNumber | Yes | string | The recipient's full card number. |
| sender | Yes | object | Identifies the sender. See [Person Object](#person-object). |
| receiver | Yes | object | Identifies the recipient. See [Person Object](#person-object). |

  </TabItem>
  <TabItem value="request_example" label="Example Request">

```json
{
  "amount": 100,
  "currency": "TRY",
  "cardType": "KORTI",
  "toCountryCode": "TJK",
  "toCardNumber": "4444555566667777",
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
      "amount": 100,
      "feeAmount": 5,
      "receiverPayOutAmount": 95
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
