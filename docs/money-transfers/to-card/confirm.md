---
sidebar_position: 2
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Confirm - to Card

Confirm and finalize a previously validated "To Card" transfer. 

<ApiEndpoint method="GET" url="/mt-api/V2/moneysend/confirm" />

## Overview

After successfully validating the 16-digit card number and payload, you receive an `operation-id` via the API response headers. Pass this `operation-id` to the `/confirm` endpoint to officially initiate the push-to-card processing.

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
    "apiAgentTxnRefNo": "REF-CRD-99",
    "processReferenceNo": 4700012345,
    "externalFirmReferenceNo": "EXT98765",
    "externalFirmReferenceNo2": ""
  }
}
```

  </TabItem>
</Tabs>
