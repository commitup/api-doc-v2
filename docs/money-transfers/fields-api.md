---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Fields API

Retrieve technical requirements and mandatory fields for different transfer types and destinations.

## Overview

Regulatory requirements and payout partner rules vary significantly by country and transfer type. The Fields API allows you to programmatically determine which information is mandatory for a specific transfer before calling the validation endpoint.

---

## Get Mandatory Fields

<Tabs>
  <TabItem value="name" label="To-Name Fields" default>
    <ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-name/fields" />
  </TabItem>
  <TabItem value="account" label="To-Account Fields">
    <ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-account/fields" />
  </TabItem>
  <TabItem value="wallet" label="To-Wallet Fields">
    <ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-wallet/fields" />
  </TabItem>
  <TabItem value="card" label="To-Card Fields">
    <ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-card/fields" />
  </TabItem>
</Tabs>

### Request Example (To-Name)

```json
{
  "amount": 100,
  "currency": "USD",
  "toCountryCode": "PHL",
  "fromCountryCode": "TUR",
  "toExternalFirmCode": 1
}
```

## Response Structure

The API returns a list of fields with their validation rules, visibility, and data types.

<ApiResponseSelector>

```json status="200" title="Success"
{
    "body": [
        {
            "fieldName": "receiver.firstName",
            "displayName": "Receiver First Name",
            "isMandatory": true,
            "dataType": "STRING",
            "maxLength": 50
        },
        {
            "fieldName": "receiver.mobileNo",
            "displayName": "Receiver Mobile Number",
            "isMandatory": true,
            "dataType": "NUMBER",
            "regex": "^[0-9]{10}$"
        }
    ],
    "restHeader": {
        "success": true,
        "message": "SUCCESS"
    }
}
```

</ApiResponseSelector>
