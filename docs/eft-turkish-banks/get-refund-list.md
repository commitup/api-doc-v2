---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Get EFT Refund List

Retrieve a list of EFT transfers that have been refunded by the beneficiary bank.

<ApiEndpoint method="POST" url="/eft-api/V2/transfer/get-refund-transfer-list" />

**Request Parameters**

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| startDate | Yes | string | Starting date for search (e.g., `2026-03-01T00:00:00.000Z`). |
| endDate | Yes | string | Ending date for search (e.g., `2026-03-06T23:59:59.000Z`). |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "startDate": "2026-03-06T00:00:00.000Z",
  "endDate": "2026-03-06T23:59:59.000Z"
}
```

  </TabItem>
  <TabItem value="curl" label="cURL">

```shell
curl -X POST https://online-mig.payporter.com.tr:8586/online/eft-api/V2/transfer/get-refund-transfer-list \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{ "startDate": "2026-03-06T00:00:00.000Z", "endDate": "2026-03-06T23:59:59.000Z" }'
```

  </TabItem>
</Tabs>

**Response**

<Tabs>
  <TabItem value="table" label="Response Parameters" default>

| Parameter | Type | Description |
| :--- | :--- | :--- |
| eftRefundTransferList | array | A list of objects containing refund details. |

  </TabItem>
  <TabItem value="example" label="Example Response">

<ApiResponseSelector>

```json status="200" title="Success"
{
  "body": {
    "responseObject": {
      "eftRefundTransferList": [
        {
          "transferOrderRefId": 47004907882,
          "senderExtFirmRefId": "TEST-13223234",
          "amount": 500,
          "currency": "TRY",
          "refundDate": "2026-03-06T14:30:00.000Z",
          "refundDescription": "Account closed",
          "status": {
            "statusCode": 50,
            "statusName": "Refund",
            "statusDescription": "Transfer is refunded by the receiver bank"
          }
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

:::tip Daily Monitoring
It is highly recommended to monitor this endpoint multiple times a day using the `SYSDATE` (today) parameter to handle returns promptly. For automated real-time updates, ensure your [Webhooks](./webhooks) are configured.
:::
