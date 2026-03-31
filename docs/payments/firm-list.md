---
sidebar_position: 2
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Payment Firm List

This endpoint returns a list of external/remittance firms available for payment collection.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/money-payment-external-firm-list" />

### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| Authorization | Yes | Bearer `{{auth_token}}` |

### Response Samples

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| id | number | Unique ID of the firm. |
| name | string | Name of the firm. |
| active | string | Status of the firm (e.g., "Y" or "N"). |

  </TabItem>
  <TabItem value="example" label="Example Response">



<ApiResponseSelector>
```json status="200" title="Success"
[
  {
    "active": "Y",
    "id": 1,
    "name": "FIRM-1"
  },
  {
    "active": "Y",
    "id": 47,
    "name": "PayPorter"
  }
]
```
</ApiResponseSelector>
  </TabItem>
</Tabs>

