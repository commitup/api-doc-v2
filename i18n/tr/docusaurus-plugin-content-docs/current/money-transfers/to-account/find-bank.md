---
sidebar_position: 1
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Find Bank

Returns the complete list of available banks for a "Transfer to Bank Account" transaction filtered by the destination `countryIsoCode`. You must call this before initiating the transfer request to retrieve the valid `toBankId`.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/bank-info/{countryIsoCode}" />

## Path Parameters

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| countryIsoCode | Yes | string | ISO 3166-1 alpha-3 country code of the destination country (e.g., `RUS`, `DEU`). |

---

## Response

The response contains an array of the banks operating in the destination country.

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| id | number | ID of the bank. This corresponds to `toBankId` in the validate step. |
| bankName | string | Name of the bank. |
| countryIsoCode | string | Country code in ISO 3166-1 alpha-3 format. |

  </TabItem>
  <TabItem value="example" label="Example Response">

<ApiResponseSelector>

```json status="200" title="Success"
[
  {
    "id": 1025,
    "bankName": "ALPHA BANK",
    "countryIsoCode": "DEU"
  },
  {
    "id": 1088,
    "bankName": "BETA COMMERCIAL BANK",
    "countryIsoCode": "DEU"
  }
]
```

</ApiResponseSelector>

  </TabItem>

</Tabs>

---