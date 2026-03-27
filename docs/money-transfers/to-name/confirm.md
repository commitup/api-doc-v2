---
sidebar_position: 5
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Confirm

Confirm and complete the money transfer after a successful validation.

<ApiEndpoint method="GET" url="/mt-api/V2/moneysend/confirm" />

## Overview

After validating a transfer (To Name, To Account, etc.), you must call this endpoint to finalize the transaction. This endpoint requires the `operation-id` received in the header of the validation response.

---

## Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| operation-id | Yes | The ID received from the validation step. |
| externalfirm-user-code | Yes | Your unique firm user code. |

```shell title="Example Request"
curl -X POST https://apilist.payporter.com.tr:81/online/mt-api/V2/moneysend/confirm \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -H "operation-id: abc123def456" \
    -H "externalfirm-user-code: USER001"
```

## Response

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
    "processReferenceNo": 4700012345,
    "externalFirmReferenceNo": "PP-TXN-889"
  }
}
```

</ApiResponseSelector>

:::info Result
Once confirmed, the transfer status moves to **NEW**. You should store the `processReferenceNo` to track the transaction status later.
:::
