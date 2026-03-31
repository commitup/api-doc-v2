---
sidebar_position: 6
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Payment Details

Query the details of a completed payment using the `processReferenceNo`.

<ApiEndpoint method="GET" url="/mt-api/V2/moneypayment/getdetail?processReferenceNo={processReferenceNo}" />

### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| Authorization | Yes | Bearer `{{auth_token}}` |

### Query Parameters

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| processReferenceNo | Yes | number | The internal reference number returned by the **Confirm** request. |

## Response

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| agentCommisionAmount | number | Commission amount for the agent. |
| agentCommisionAmountCurrency | string | Commission currency. |
| externalFirmReferenceNo | string | Main reference number. |
| externalFirmReferenceNo2 | string | Secondary reference number (if applicable). |
| fromCountryName | string | Origin country. |
| fromExternalFirmName | string | Origin firm. |
| incomingAmount | number | Paid amount. |
| incomingAmountCurrency | string | Paid currency. |
| paymentDate | string | Date of payment. |
| paymentStatusName | string | Current status of the payment. |
| payoutCountryName | string | Payout country. |
| payoutExternalFirmName | string | Payout firm. |
| processReferenceNo | number | PayPorter reference number. |
| receiver | object | Receiver details. See [Person Object](../resources/person-object). |
| sender | object | Sender details. See [Person Object](../resources/person-object). |

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
            "firstName": "guzın",
            "middleName": "",
            "lastName": "sargun",
            "fatherName": "Veli",
            "birthDateStr": "01.01.1981",
            "nationalCountryCode": "RUS",
            "birthCountryCode": "TUR",
            "identityTypeId": 1,
            "identityIssueDateStr": "01.01.1981",
            "identityValidThruDateStr": "01.01.2050",
            "identityNumber": "testpas1234",
            "identityIssueCountryCode": null,
            "addressCountryCode": "TUR",
            "provinceName": "osmaniye",
            "districtName": "düziçi",
            "address": "taşdelen",
            "mobileCountryCode": "TUR",
            "mobileOperatorNo": "505",
            "mobileNo": "8725909",
            "ssnId": "16295979334",
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
        "incomingAmount": 100,
        "incomingAmountCurrency": "USD",
        "incomingAmountLocal": 3236.7,
        "incomingAmountLocalExchangeRate": 32.367,
        "externalFirmReferenceNo": "00275640117",
        "fromCountry": "TUR",
        "fromCountryName": "TÜRKİYE",
        "apiAgentCommissionAmount": 1,
        "apiAgentCommissionAmountCurrency": "USD",
        "fromExternalFirmCode": 47,
        "fromExternalFirmName": "PAYPORTER",
        "apiAgentTxnRefNo": null,
        "searchUUID": "44fb3a45-2722-435d-b22d-dc2739ab0f88"
    }
}
```
</ApiResponseSelector>

  </TabItem>
</Tabs>
