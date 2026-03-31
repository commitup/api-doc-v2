---
sidebar_position: 5
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Payment Confirm

This endpoint finalizes the payment request. You must provide the `operation-id` obtained from the **Payment Validate** response header.

<ApiEndpoint method="GET" url="/mt-api/V2/moneypayment/confirm" />

### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| externalfirm-user-code | Yes | Your unique firm user code. |
| operation-id | Yes | The ID obtained from the **Validate** response header. |
| Authorization | Yes | Bearer `{{auth_token}}` |

## Response

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| apiAgentTxnRefNo | string | Your transaction reference number. |
| processReferenceNo | number | PayPorter's internal process reference number. |
| externalFirmReferenceNo | string | The firm's reference number. |

  </TabItem>
  <TabItem value="example" label="Example Response">
<ApiResponseSelector>

```json status="200" title="Success"
{
  "header": {
    "success": true,
    "code": "1",
    "message": "OPERATION_DONE_SUCCESSFUL",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "apiAgentTxnRefNo": "REF-123456",
    "processReferenceNo": 47000902951,
    "externalFirmReferenceNo": "47000756804"
  }
}
```
</ApiResponseSelector>

  </TabItem>
</Tabs>
