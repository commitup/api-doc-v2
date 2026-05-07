---
sidebar_position: 10
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# EFT Settlement

This endpoint is used to get EFT transfers between two dates. It is used for the settlement of the EFT transfers.

<ApiEndpoint method="POST" url="/api/v2/reconciliation/eft" />

## Request

### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| Authorization | Yes | Bearer token |

### Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| begin | Yes | string | ISO-8601 formatted start date and time. |
| end | Yes | string | ISO-8601 formatted end date and time. |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "begin":"2023-08-09T06:26:10.274Z",
  "end":"2023-08-10T06:26:10.274Z"
}
```

  </TabItem>
</Tabs>

## Response

<ApiResponseSelector>
<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| transferOrderRefId | number | Transfer order reference ID. |
| transferDate | string | Transfer date. |
| amount | number | Transfer amount. |
| comment | string | Transfer comment. |
| currency | string | Transfer currency. |
| transferType | string | Type of the transfer. |
| transferReason | string | Reason for the transfer. |
| commission | number | Commission amount. |
| commissionCurrency | string | Commission currency. |
| receiverBankCode | number | Receiver bank code. |
| receiverBranchCode | number | Receiver branch code. |
| receiverAccount | string | Receiver account number (IBAN). |
| senderInfo | object | Information about the sender.See [EftPersonInfo](#eftpersoninfo). |
| receiverInfo | object | Information about the receiver.See [EftPersonInfo](#eftpersoninfo). |
| collectionRefId | string | Collection reference ID. |
| status | object | Transfer status details. |
| senderExtFirmRefId | string | Sender external firm reference ID. |
| cancellationDate | string | Cancellation date if cancelled. |

  </TabItem>
  <TabItem value="example" label="Example Response">

```json status="200" title="Success"
{
  "header": {
    "success": true,
    "code": "0",
    "message": "İşleminiz Başarıyla Gerçekleşmiştir.",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "eftTransferList": [
      {
        "transferOrderRefId": 47003982765,
        "transferDate": "2026-05-07T00:00:00.000+0300",
        "amount": 150.23,
        "comment": "string",
        "currency": "TRY",
        "transferType": "TO_IBAN",
        "transferReason": "COMMERCIAL_PAYMENTS",
        "commission": 1.5,
        "commissionCurrency": "EUR",
        "receiverBankCode": 15,
        "receiverBranchCode": 0,
        "receiverAccount": "TR050001500158000020757464",
        "senderInfo": {
          "firstName": "JOHN",
          "middleName": "MIDDLE",
          "lastName": "DOE",
          "fullName": "JOHN MIDDLE DOE",
          "fatherName": null,
          "birthDay": "1990-01-01T00:00:00.000+0300",
          "birthPlace": "TURKEY",
          "nationalCountryCode": null,
          "birthCountryCode": null,
          "identityNumber": "11111111111",
          "addressCountryCode": "TUR",
          "address": "123 Main St. 34096 FATIH Istanbul",
          "email": "johndoe@example.com",
          "countryPhoneCode": 90,
          "phoneNumber": "5550000000",
          "company": false
        },
        "receiverInfo": {
          "firstName": "JANE",
          "middleName": null,
          "lastName": "SMITH",
          "fullName": null,
          "fatherName": null,
          "birthDay": null,
          "birthPlace": null,
          "nationalCountryCode": null,
          "birthCountryCode": null,
          "identityNumber": null,
          "addressCountryCode": null,
          "address": null,
          "email": null,
          "countryPhoneCode": null,
          "phoneNumber": null,
          "company": false
        },
        "collectionRefId": null,
        "status": {
          "statusCode": 20,
          "statusName": "Completed",
          "statusDescription": "COMPLETE",
          "statusReasonMessageCode": null,
          "statusReasonMessageDetail": null
        },
        "senderExtFirmRefId": "a18debc9-1359-46e7-a27d-49def5f5fb8d",
        "cancellationDate": null
      }
    ]
  }
}
```

  </TabItem>
</Tabs>
</ApiResponseSelector>
