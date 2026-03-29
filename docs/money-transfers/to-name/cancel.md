---
sidebar_position: 7
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cancel Transfer

If you need to completely cancel an existing "To Name" transfer, you can use the Cancel Transfer endpoints. 

Cancelling a transfer is a two-step process: **Validate** followed by **Confirm**.

---

## Step 1: Validate Cancellation

This endpoint validates the cancellation request before it is processed. You must provide the `processReferenceNo` of the transfer and a reason.

<ApiEndpoint method="POST" url="/mt-api/V2/transfercancel/validate" />

### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| externalfirm-user-code | Yes | Your unique firm user code. This will be provided to you during onboarding. If you don't have one, contact your account manager. |

### Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| processReferenceNo | Yes | number | The process reference number of the transfer to be cancelled. |
| cancellationReasonId | Yes | number | The ID of the cancellation reason. See **Cancellation Reasons** below. |
| cancellationReasonDescription | Yes | string | A short description explaining the reason for cancellation. |

#### Cancellation Reasons

| Reason ID | Definition |
| :--- | :--- |
| 1 | Personnel Error |
| 2 | System Error |
| 3 | Customer request |
| 4 | Distance to the institution |
| 5 | Other |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "processReferenceNo": 4700012345,
  "cancellationReasonId": 3,
  "cancellationReasonDescription": "Customer requested cancellation"
}
```

  </TabItem>
</Tabs>

### Response

If the validation is successful, the API returns the transfer details to confirm what will be cancelled. **Crucially, the `operation-id` required for confirmation is sent in the response header.**

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
    "apiAgentTxnRefNo": "REF-ABC-123",
    "externalFirmReferenceNo": "EXT-123456",
    "externalFirmReferenceNo2": "",
    "fromCountry": "TUR",
    "fromExternalFirmCode": 1,
    "receiverAmount": 100,
    "receiverAmountCurrency": "EUR",
    "toCountry": "DEU",
    "toExternalFirmCode": 2
  }
}
```

</ApiResponseSelector>

---

## Step 2: Confirm Cancellation

Once you have validated the cancellation and received the `operation-id`, use this endpoint to finalize the cancellation of the transfer.

<ApiEndpoint method="GET" url="/mt-api/V2/transfercancel/confirm" />

### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| operation-id | Yes | The ID received from the header of the validation step. |
| externalfirm-user-code | Yes | Your unique firm user code. |

### Response

The response indicates whether the cancellation was successfully completed.

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
    "apiAgentTxnRefNo": "REF-ABC-123",
    "cancelComplated": true,
    "externalFirmReferenceNo": "EXT-123456",
    "fromExternalFirmCode": 1,
    "processReferenceNo": 4700012345,
    "toExternalFirmCode": 2
  }
}
```

</ApiResponseSelector>
