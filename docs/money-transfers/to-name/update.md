---
sidebar_position: 6
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Transfer (Amendment)

If you need to amend the receiver's information for an existing "To Name" transfer, you can use the Update Transfer endpoints. 

Updating a transfer is a two-step process: **Validate** followed by **Confirm**.

---

## Step 1: Validate Update

This endpoint validates the required changes before they are actually applied. You can update the receiver's details using the `processReferenceNo` of the original transaction.

<ApiEndpoint method="POST" url="/mt-api/V2/transferupdate/validate" />

### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| externalfirm-user-code | Yes | Your unique firm user code. This will be provided to you during onboarding. If you don't have one, contact your account manager. |

### Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| processReferenceNo | Yes | number | The unique PayPorter process reference number of the transfer to be updated. |
| receiver | Yes | object | Identifies the updated recipient. See [Person Object](../../resources/person-object). |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "processReferenceNo": 4700012345,
  "receiver": {
    "firstName": "HURRIYET",
    "lastName": "SENOL",
    "mobileCountryCode": "TUR",
    "mobileOperatorNo": "538",
    "mobileNo": "47458754"
  }
}
```

  </TabItem>
</Tabs>

### Response

If the validation is successful, the API returns the updated snapshot of the transaction. **Crucially, the `operation-id` required for confirmation is sent in the response header.**

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
    "externalFirmReferenceNo": "REF-123456",
    "fromCountry": "TUR",
    "fromExternalFirmCode": 1,
    "processReferenceNo": 4700012345,
    "receiver": { 
      "firstName": "HURRIYET", 
      "lastName": "SENOL" 
    },
    "receiverAmount": 100,
    "receiverAmountCurrency": "EUR",
    "sender": { 
      "firstName": "CABBER", 
      "lastName": "GRINGO" 
    },
    "toCountry": "TUR",
    "toExternalFirmCode": 2
  }
}
```

</ApiResponseSelector>

---

## Step 2: Confirm Update

Once you have validated the update and received the `operation-id`, use this endpoint to finalize the changes to the transfer.

<ApiEndpoint method="GET" url="/mt-api/V2/transferupdate/confirm" />

### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| operation-id | Yes | The ID received from the header of the validation step. |
| externalfirm-user-code | Yes | Your unique firm user code. |

### Response

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
    "message": "OPERATION SUCCESSFUL",
    "successFull": true
  }
}
```

</ApiResponseSelector>
