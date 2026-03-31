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

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| transferStatusId | number | ID of the transfer status. See [Transfer Statuses](./intro#transfer-statuses). |
| transferStatus | string | Name of the transfer status (e.g., `Sent`, `New`, `Paid`). |
| processReferenceNo | number | The unique PayPorter process reference number for the transfer. |
| externalFirmReferenceNo | string | External firm's reference number. |
| externalFirmReferenceNo2 | string | Secondary external reference number (if any). |
| fromExternalFirmName | string | Sending firm name. |
| toExternalFirmName | string | Receiving firm name. |
| fromCountryName | string | Sending country name. |
| toCountryName | string | Destination country name. |
| toCityName | string | Destination city name. |
| toOfficeName | string | Destination office name. |
| purposeName | string | Purpose of the transfer. |
| sourceOfIncomeName | string | Source of the funds. |
| receiverAmount | number | Amount the receiver will get. |
| receiverAmountCurrency | string | Currency the receiver will get. |
| agentCommisionAmount | number | Agent commission amount. |
| agentCommisionCurrency | string | Currency of the agent commission. |
| sendDate | string | Timestamp when the transfer was sent. |
| comment | string | Optional comment attached to the transfer. |
| sender | object | Details of the sender. See [Person Object](../resources/person-object). |
| receiver | object | Details of the receiver. See [Person Object](../resources/person-object). |

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
    "sender": {
      "firstName": "CABBER",
      "lastName": "GRINGO",
      // ... Person Object Fields
    },
    "receiver": {
      "firstName": "HURRIYET",
      "lastName": "SENOL",
      // ... Person Object Fields
    },
    "transferStatusId": 1,
    "transferStatus": "Sent",
    "fromExternalFirmName": "TESTPAY",
    "toExternalFirmName": "PAYPORTER",
    "fromCountryName": "TURKEY",
    "toCountryName": "TURKEY",
    "processReferenceNo": 47001132580,
    "externalFirmReferenceNo": "47001132580",
    "externalFirmReferenceNo2": null,
    "toCityName": null,
    "toOfficeName": null,
    "purposeName": "Other Renting",
    "sourceOfIncomeName": "Salary / Income",
    "receiverAmount": 100,
    "receiverAmountCurrency": "EUR",
    "agentCommisionAmount": 6,
    "agentCommisionCurrency": "EUR",
    "sendDate": "2024-06-11T10:56:30.965+0300",
    "comment": "test"
  }
}
```

```json status="406" title="Payment not found"
{
    "header": {
        "success": false,
        "code": "470",
        "message": "MT_PAYMENT_TRANSFER_NOT_FOUND",
        "messageCode": "MT_PAYMENT_TRANSFER_NOT_FOUND"
    },
    "responseObject": null
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>

:::info Status Monitoring
You should continue to query these endpoints until the `transferStatusId` reaches a final state (**2 (PAID)**, **3 (CANCELLED)**, or **4 (REFUNDED)**).
:::
