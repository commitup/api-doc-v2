---
sidebar_position: 3
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Search Payment

This endpoint retrieves information about a payment using a reference number. The `searchUUID` returned in the response is required for the validation step.

<ApiEndpoint method="POST" url="/mt-api/V2/moneypayment/search" />

### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| externalfirm-user-code | Yes | Your unique firm user code. This will be provided to you during onboarding. If you don't have one, contact your account manager. |
| Authorization | Yes | Bearer `{{auth_token}}` |
| Content-Type | Yes | `application/json` |

### Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| externalFirmCode | Yes | number | ID of the firm (from Payment Firm List). |
| externalFirmReferenceNo | Yes | string | The reference number provided by the sender. |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "externalFirmCode": 1,
  "externalFirmReferenceNo": "00275640117"
}
```

  </TabItem>
</Tabs>

## Response

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| amount | number | Transaction amount. |
| currency | string | Currency name. |
| currencyCode | number | ISO currency code. |
| externalFirmCode | number | Firm code. |
| externalFirmName | string | Firm name. |
| externalFirmReferenceNo | string | Original reference number. |
| receiver | object | Receiver details. See [Person Object](../resources/person-object). |
| searchUUID | string | Unique search ID needed for validation. |
| sendDate | string | Date the transfer was sent. |
| sender | object | Sender details. See [Person Object](../resources/person-object). |
| senderCountryCode | string | ISO country code of the sender. |
| senderCountryName | string | Country name of the sender. |

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
        "receiver": {
            "firstName": "GUZIN",
            "middleName": null,
            "lastName": "SARGUN",
            "fatherName": null,
            "birthDateStr": null,
            "nationalCountryCode": null,
            "birthCountryCode": null,
            "identityTypeId": null,
            "identityIssueDateStr": null,
            "identityValidThruDateStr": null,
            "identityNumber": null,
            "identityIssueCountryCode": null,
            "addressCountryCode": null,
            "provinceName": null,
            "districtName": null,
            "address": "",
            "mobileCountryCode": null,
            "mobileOperatorNo": null,
            "mobileNo": "905058725909",
            "ssnId": null,
            "customerId": null,
            "jobCode": null,
            "zipCode": null
        },
        "sender": {
            "firstName": "AHMET",
            "middleName": null,
            "lastName": "BODUR",
            "fatherName": null,
            "birthDateStr": "10.01.2002",
            "nationalCountryCode": "TUR",
            "birthCountryCode": null,
            "identityTypeId": null,
            "identityIssueDateStr": null,
            "identityValidThruDateStr": null,
            "identityNumber": "OTHER-A3512345C",
            "identityIssueCountryCode": null,
            "addressCountryCode": null,
            "provinceName": null,
            "districtName": null,
            "address": "TURKEY OSMANIYE TASDELEN",
            "mobileCountryCode": null,
            "mobileOperatorNo": null,
            "mobileNo": "905058725909",
            "ssnId": null,
            "customerId": null,
            "jobCode": null,
            "zipCode": null
        },
        "senderCountryCode": "TUR",
        "senderCountryName": "TÜRKİYE",
        "sendDate": null,
        "amount": 100,
        "currency": "TRY",
        "externalFirmReferenceNo": "00275640117",
        "externalFirmCode": 47,
        "externalFirmName": "PAYPORTER",
        "searchUUID": "44fb3a45-2722-435d-b22d-dc2739ab0f88"
    }
}
```

```json status="406" title="Payment not found"
{
    "header": {
        "success": false,
        "code": "502",
        "message": "002756401172 external firm referance number not found",
        "messageCode": "MT_SEND_TRANSFER_NOT_BY_EXTERNAL_FIRM_REFERENCE_FOUND"
    },
    "responseObject": null
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
