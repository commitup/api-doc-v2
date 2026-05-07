---
sidebar_position: 1
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Account Info

Retrieve account details associated with your partnership. This endpoint returns information such as account number, branch, currency, balance, and activation status for one or all of your accounts.

If no input parameters are provided, the response will include **all accounts** linked to your firm. To query a specific account, supply the `accountNo` and `suffixNo` fields.

<ApiEndpoint method="POST" url="/accounting-api/V2/get-account-info" />

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
| accountNo | No | string | The account number to query. Omit to retrieve all accounts. |
| suffixNo | No | number | The suffix number of the account. Used together with `accountNo` to identify a specific sub-account. |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "accountNo": "1197",
  "suffixNo": 1
}
```

  </TabItem>
</Tabs>

## Response

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| accountInfoModelList | array | List of account information objects. |
| account | object | Account identifier details. |
| account.branchCode | number | Branch code of the account. |
| account.accountNo | string | Account number. |
| account.suffixNo | number | Account suffix number. |
| account.accountNickName | string | Friendly name assigned to the account. |
| currency | string | Account currency (ISO 4217). |
| accountCreateDate | string | Date and time the account was created. |
| accountExpireDate | string | Expiration date of the account, if any. |
| balance | number | Current available balance. |
| customerName | string | Customer name associated with the account. |
| isAccountActive | boolean | Whether the account is currently active. |

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
    "accountInfoModelList": [
      {
        "account": {
          "branchCode": 2,
          "accountNo": "1197",
          "suffixNo": 1,
          "accountNickName": null
        },
        "currency": "TRY",
        "accountCreateDate": "2020-03-27T16:58:51.046+0300",
        "accountExpireDate": null,
        "balance": 9499.34,
        "customerName": null,
        "isAccountActive": null
      }
    ]
  }
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
