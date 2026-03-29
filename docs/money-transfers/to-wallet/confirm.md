---
sidebar_position: 4
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Confirm - to Wallet

Confirm and finalize a previously validated "To Wallet" transfer. 

<ApiEndpoint method="GET" url="/mt-api/V2/moneysend/confirm" />

## Overview

After successfully validating the transfer details, you receive an `operation-id` in the API response headers. Pass this `operation-id` to the `/confirm` endpoint to officially initiate the transfer.

---

## Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| operation-id | Yes | The ID received from the header of the validation step. |
| externalfirm-user-code | Yes | Your unique firm user code. This will be provided to you during onboarding. If you don't have one, contact your account manager. |

## Response

Once confirmed, the transfer status moves to **NEW**. Store the `processReferenceNo` to track the transaction later using the [Transfer Details](../transfer-details) API.

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| apiAgentTxnRefNo | string | Your original transaction reference. |
| processReferenceNo | number | The unique PayPorter process reference number for tracking. |
| externalFirmReferenceNo | string | External firm reference number. |
| externalFirmReferenceNo2 | string | Secondary external firm reference number (if any). |

  </TabItem>
  <TabItem value="example" label="Example Response">

```json status="200" title="Success"
{
  "header": {
    "success": true,
    "code": "1",
    "message": "OPERATION_DONE_SUCCESSFUL",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "apiAgentTxnRefNo": "REF-WLL-99",
    "processReferenceNo": 4700012345,
    "externalFirmReferenceNo": "EXT98765",
    "externalFirmReferenceNo2": ""
  }
}
```

  </TabItem>
</Tabs>
