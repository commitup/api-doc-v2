---
sidebar_position: 4
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Payment Validate

This endpoint validates the payment request with the receiver's information. 

:::tip Important
In search response, there is a limited receiver information. You need to provide the detailed receiver information in the validate request.
:::

<ApiEndpoint method="POST" url="/mt-api/V2/moneypayment/validate" />

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
| receiver | Yes | object | Receiver details. See [Person Object](../resources/person-object). |
| apiAgentTxnRefNo | Yes | string | Your unique transaction reference number. |
| searchUUID | Yes | string | The UUID obtained from the **Search Payment** response. |
| transactionAmount | Yes | number | The exact amount to be paid. |
| transactionAmountCurrency | Yes | string | ISO currency code for the amount. |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "receiver": { /* Person Object */ },
  "apiAgentTxnRefNo": "REF-123456",
  "searchUUID": "550e8400-e29b-41d4-a716-446655440000",
  "transactionAmount": 100.0,
  "transactionAmountCurrency": "USD"
}
```

  </TabItem>
</Tabs>

## Response

If successful, the API returns a `200 OK`. **Crucially, the `operation-id` required for confirmation is sent in the response header.**


<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| receiver | object | Validated receiver details. |
| sender | object | Validated sender details. |
| incomingAmount | number | Original amount sent. |
| incomingAmountCurrency | string | Original currency. |
| incomingAmountLocal | number | Amount in local currency (if applicable). |
| incomingAmountLocalExchangeRate | number | Exchange rate used. |
| externalFirmReferenceNo | string | Firm's reference number. |
| fromCountry | string | Sender's country code. |
| fromCountryName | string | Sender's country name. |
| apiAgentCommissionAmount | number | Commission amount for the agent. |
| apiAgentCommissionAmountCurrency | string | Commission currency. |
| fromExternalFirmCode | number | Originating firm code. |
| fromExternalFirmName | string | Originating firm name. |
| apiAgentTxnRefNo | string | Your transaction reference. |
| searchUUID | string | Search UUID used. |

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

