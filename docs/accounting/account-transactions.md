---
sidebar_position: 2
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Account Transactions

Retrieve the transaction history for a specific account within a given date range. Each transaction entry includes the amount, direction (debit/credit), explanation, and timestamps — useful for reconciliation, reporting, and auditing purposes.

<ApiEndpoint method="POST" url="/accounting-api/V2/get-account-transactions" />

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
| accountNo | Yes | string | The account number to query transactions for. |
| suffixNo | Yes | number | The suffix number of the account. |
| startDate | Yes | string | Start of the date range (ISO-8601 format). |
| endDate | Yes | string | End of the date range (ISO-8601 format). |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "accountNo": "1197",
  "suffixNo": 1,
  "startDate": "2023-07-18T00:00:00Z",
  "endDate": "2023-09-18T00:00:00Z"
}
```

  </TabItem>
</Tabs>

## Response

The response contains account metadata along with a nested `accountTransaction` array listing individual movements.

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

#### Account Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| account | object | Account identifier details. |
| account.branchCode | number | Branch code of the account. |
| account.accountNo | string | Account number. |
| account.suffixNo | number | Account suffix number. |
| account.accountNickName | string | Friendly name assigned to the account. |
| currency | string | Account currency (ISO 4217). |
| accountCreateDate | string | Date and time the account was created. |
| accountExpireDate | string | Expiration date of the account, if any. |
| balance | number | Current available balance. |

#### Transaction Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| amount | number | Transaction amount. Negative values indicate debits. |
| balance | number | Running balance after the transaction, if available. |
| explanation | string | Description of the transaction (e.g., reference numbers, type). |
| operationType | string | Type of operation, if applicable. |
| sequenceNo | string | Unique sequence number identifying the transaction. |
| transactionDate | string | Date the transaction was processed. |
| transactionTime | string | Time the transaction was processed (`HH:mm:ss`). |
| valueDate | string | Value date of the transaction. |
| insertUser | string | System user that created the record. |
| referenceNumber | number | Internal reference number. |
| dc | string | Direction indicator: `D` for Debit, `C` for Credit. |

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
    "accountDetailModelList": [
      {
        "account": {
          "branchCode": 555,
          "accountNo": "1197",
          "suffixNo": 4,
          "accountNickName": "EFT Transfer Account"
        },
        "currency": "TRY",
        "accountCreateDate": "2023-01-31T18:20:39.085+0300",
        "accountExpireDate": null,
        "balance": 75258.38,
        "customerName": null,
        "isAccountActive": null,
        "accountTransaction": [
          {
            "amount": -50,
            "balance": null,
            "explanation": "47000711455 REF1689672738071 EFT",
            "operationType": null,
            "sequenceNo": "1387674",
            "transactionDate": "2023-07-18T00:00:00.000+0300",
            "transactionTime": "12:36:06",
            "valueDate": "2023-07-18T00:00:00.000+0300",
            "insertUser": "autopay",
            "referenceNumber": 47004892110,
            "dc": "D"
          },
          {
            "amount": 1.53,
            "balance": null,
            "explanation": "47000708687 REF05098 EFT Commission",
            "operationType": null,
            "sequenceNo": "1438793",
            "transactionDate": "2023-09-07T00:00:00.000+0300",
            "transactionTime": "11:15:04",
            "valueDate": "2023-09-07T00:00:00.000+0300",
            "insertUser": "autopay",
            "referenceNumber": 47004892110,
            "dc": "C"
          }
        ]
      }
    ]
  }
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
