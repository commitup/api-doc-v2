---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Transfer Details

Query the status and full details of a money transfer transaction.

## Get Transfer Details

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/get-transfer-details/{processReferenceNo}" />

### Path Parameters

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| processReferenceNo | Yes | number | The unique PayPorter process reference number for the transfer. |

---

## Get Details by Agent Reference

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/get-transfer-details-by-api-agent-txn-no/{apiAgentTxnRefNo}" />

### Path Parameters

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| apiAgentTxnRefNo | Yes | string | Your unique reference number provided during the validation step. |

---

## Response

<ApiResponseSelector>

```json status="200" title="Success"
{
  "body": {
    "responseObject": {
      "processReferenceNo": 4700012345,
      "apiAgentTxnRefNo": "REF-ACC-99",
      "status": "PAID",
      "amount": 250,
      "currency": "TRY",
      "payoutAmount": 240,
      "payoutCurrency": "TRY",
      "sender": { "firstName": "John", "lastName": "Doe" },
      "receiver": { "firstName": "Jane", "lastName": "Smith" },
      "transactionDate": "2024-03-19T10:00:00.000+0300"
    },
    "restHeader": {
      "success": true,
      "message": "SUCCESS"
    }
  }
}
```

</ApiResponseSelector>

:::info Status Monitoring
You should continue to query these endpoints until the `status` reaches a final state (**PAID**, **CANCELLED**, or **REFUNDED**).
:::
