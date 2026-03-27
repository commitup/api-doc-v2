---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Validate - to Account

Validate a money transfer request directly to a bank account, IBAN, or account-attached cards.

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-account/validate" />

## Overview

Use this endpoint to validate the recipient's bank details and ensure the transfer can be processed.

---

## Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| sender | Yes | object | Identifies the sender. See [Person Object](#person-object). |
| receiver | Yes | object | Identifies the recipient. See [Person Object](#person-object). |
| amount | Yes | number | The amount to be sent. |
| currency | Yes | string | Three-letter ISO 4217 currency code (e.g., USD). |
| toCountryCode | Yes | string | Destination country (ISO 3166-1 alpha-3). |
| toAccountNumber | Yes | string | Receiver's IBAN or account number. |
| toBankId | Yes | string | The ID of the receiving bank. Use [Find Banks](#find-banks). |

  </TabItem>
  <TabItem value="request_example" label="Example Request">

```json
{
  "sender": {
    "firstName": "John",
    "lastName": "Doe",
    "mobileNo": "5320000000",
    "address": "Atatürk Mah.",
    "addressCountryCode": "TUR"
  },
  "receiver": {
    "firstName": "Jane",
    "lastName": "Smith",
    "mobileNo": "123456789",
    "address": "Arbat Str.",
    "addressCountryCode": "RUS"
  },
  "amount": 250,
  "currency": "TRY",
  "toCountryCode": "RUS",
  "toAccountNumber": "RU12345678901234567890",
  "toBankId": "1025",
  "apiAgentTxnRefNo": "REF-ACC-99"
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
      "amount": 250,
      "feeAmount": 10,
      "receiverPayOutAmount": 240,
      "toCountry": "RUS",
      "currency": "TRY"
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

## Find Banks

To get the valid `toBankId` for a country, use the following endpoint:

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/bank-info/{countryIsoCode}" />

**Example**: `GET /mt-api/V2/moneytransfercommon/bank-info/RUS`

---

## Person Object

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| firstName | Yes | string | First name. |
| lastName | Yes | string | Last name. |
| mobileNo | Yes | string | Phone number without country code. |
| address | Yes | string | Full address. |
| addressCountryCode | Yes | string | ISO country code. |
