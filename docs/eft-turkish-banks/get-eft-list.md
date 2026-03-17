---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Get EFT Transfer List

Retrieve a history of your EFT transfers within a specific date range.

<ApiEndpoint method="POST" url="/eft-api/V2/transfer/get-transfer-list" />

**Request Parameters**

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| startDate | Yes | string | Starting date for search (e.g., `2026-03-01`). |
| endDate | Yes | string | Ending date for search (e.g., `2026-03-06`). |
| statusCode | No | number | Filter results by a specific [EFT Status Code](./eft-flow#eft-status-codes). |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "startDate": "2026-03-01T00:00:00.000Z",
  "endDate": "2026-03-06T23:59:59.000Z",
  "statusCode": 20
}
```

  </TabItem>
  <TabItem value="curl" label="cURL">

```shell
curl -X POST https://online-mig.payporter.com.tr:8586/online/eft-api/V2/transfer/get-transfer-list \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{ "startDate": "2026-03-01T00:00:00.000Z", "endDate": "2026-03-06T23:59:59.000Z", "statusCode": 20 }'
```

  </TabItem>
</Tabs>

**Response**

<Tabs>
  <TabItem value="table" label="Response Parameters" default>

| Parameter | Type | Description |
| :--- | :--- | :--- |
| eftTransferList | array | A list of objects containing transfer details. |

  </TabItem>
  <TabItem value="example" label="Example Response">

<ApiResponseSelector>

```json status="200" title="Success"
{
  "body": {
    "responseObject": {
      "eftTransferList": [
        {
          "transferOrderRefId": 47004907882,
          "senderExtFirmRefId": "TEST-13223234",
          "amount": 500,
          "currency": "TRY",
          "status": {
            "statusCode": 20,
            "statusName": "Completed",
            "statusDescription": "Transfer order is successfully sended receiver bank"
          },
          "transferDate": "2026-03-06T10:00:00.000Z"
        }
      ]
    },
    "restHeader": {
      "code": "1",
      "message": "OPERATION_DONE_SUCCESSFUL",
      "success": true,
      "messageCode": "OPERATION_DONE_SUCCESSFUL"
    }
  }
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
