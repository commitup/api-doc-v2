---
sidebar_position: 10
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Fields API

Retrieve technical requirements and mandatory fields for different transfer types and destinations.

## Overview

Regulatory requirements and payout partner rules vary significantly by country and transfer type. The Fields API allows you to programmatically determine which information is mandatory for a specific transfer before calling the validation endpoint.

---

## Get Mandatory Fields

The endpoint you call differs based on the transfer destination. Each endpoint requires its own unique payload to calculate the rules.

<Tabs>
  <TabItem value="name" label="To Name" default>
    <ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-name/fields" />
    
    ### Request Input
    | Parameter | Required | Description |
    | :--- | :--- | :--- |
    | `amount` | Yes | Amount to be sent. |
    | `currency` | Yes | Sending currency in ISO-4217 format. |
    | `toCountryCode` | Yes | Destination country code (ISO 3166-1 alpha-3). |
    | `fromCountryCode` | Yes | Sending country code. |
    | `toExternalFirmCode` | Yes | Office or payout firm code where money will be collected. |
    
  </TabItem>
  <TabItem value="account" label="To Account">
    <ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-account/fields" />

    ### Request Input
    | Parameter | Required | Description |
    | :--- | :--- | :--- |
    | `amount` | Yes | Amount to be sent. |
    | `currency` | Yes | Sending currency in ISO-4217 format. |
    | `toCountryCode` | Yes | Destination country code (ISO 3166-1 alpha-3). |
    | `toBankId` | Yes | Bank ID where money will be sent. |

  </TabItem>
  <TabItem value="wallet" label="To Wallet">
    <ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-wallet/fields" />

    ### Request Input
    | Parameter | Required | Description |
    | :--- | :--- | :--- |
    | `amount` | Yes | Amount to be sent. |
    | `currency` | Yes | Sending currency in ISO-4217 format. |
    | `toWalletId` | Yes | Unique Wallet Identifier that money is mapped to. |

  </TabItem>
  <TabItem value="card" label="To Card">
    <ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-card/fields" />

    ### Request Input
    | Parameter | Required | Description |
    | :--- | :--- | :--- |
    | `amount` | Yes | Amount to be sent. |
    | `currency` | Yes | Sending currency in ISO-4217 format. |
    | `toCountryCode` | Yes | Destination country code (ISO 3166-1 alpha-3). |
    | `cardType` | Yes | **Deprecated.** Supply placeholder data. |

  </TabItem>

</Tabs>

---

## Response Structure

The Fields response schema is logically identical for **all** transfer types. 

Rather than sending an array of objects, the `responseObject` acts as a boolean configuration map organized into `sender`, `receiver`, and `transferCommonInputs` clusters. 

:::info Parsing the Map
If a property (e.g. `"mobileNo": true`) is flagged `true` in this response, you **must** provide that exact field dynamically when constructing the user's `POST /validate` payload. If the field is `false`, it is optional.
:::

<ApiResponseSelector>

```json status="200" title="Success"
{
  "header": {
    "success": true,
    "code": "1",
    "message": "SUCCESS",
    "messageCode": "SUCCESS"
  },
  "responseObject": {
        "sender": {
            "firstName": true,
            "lastName": true,
            "nationalCountryCode": true,
            "mobileNo": true,
            "middleName": false,
            "fatherName": false,
            "birthDate": false,
            "birthCountryCode": false,
            "identityTypeId": false,
            "identityIssueDate": false,
            "identityValidThruDate": false,
            "identityNumber": false,
            "identityIssueCountryCode": false,
            "addressCountryCode": false,
            "provinceName": false,
            "districtName": false,
            "address": false,
            "ssnId": false,
            "jobCode": false,
            "zipCode": false,
            "email": false
        },
        "receiver": {
            "firstName": true,
            "lastName": true,
            "nationalCountryCode": true,
            "mobileNo": true,
            "middleName": false,
            "fatherName": false,
            "birthDate": false,
            "birthCountryCode": false,
            "identityTypeId": false,
            "identityIssueDate": false,
            "identityValidThruDate": false,
            "identityNumber": false,
            "identityIssueCountryCode": false,
            "addressCountryCode": false,
            "provinceName": false,
            "districtName": false,
            "address": false,
            "ssnId": false,
            "jobCode": false,
            "zipCode": false,
            "email": false
        },
        "transferCommonInputs": {
            "purposeCodeDefinitionId": true,
            "sourceOfIncomeDefinitionId": true,
            "relationshipWithSender": false,
            "toCityId": false,
            "toOfficeId": false,
            "fromCountryCode": false,
            "toBankId": false,
            "toAccountNumber": false,
            "accountIndicator": false,
            "toWalletId": false
        }
    }
}
```

</ApiResponseSelector>