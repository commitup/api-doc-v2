---
sidebar_position: 2
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Wallet Holder Name

This is an **optional** utility endpoint that retrieves the masked name of a wallet holder. 

It acts as an additional layer of security allowing senders to visually verify they are sending funds to the correct person. 

:::info Availability
This endpoint is not broadly activated across all international wallets. Currently, it predominantly functions for wallets operating within **Turkey**.
:::

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-wallet/holder-name" />

## Request Parameters

To discover the name assigned to the wallet account, supply the recipient's mobile coordinates.

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| toWalletId | Yes | string | The string ID of the wallet from the [Wallet List](./wallet-list) list. |
| mobileCountryCode | Yes | string | Receiver's mobile country code in ISO 3166-1 alpha-3 format (e.g. `TUR`). |
| mobileOperatorNo | Yes | number | The receiver's mobile network prefix / area code (e.g. `541`). |
| mobileNo | Yes | number | The rest of the receiver's mobile number. |
| amount | No | number | The approximate transaction amount. |
| currency | No | string | Foreign currency in ISO-4217 format. |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
    "toWalletId": "KUIKPARA",
    "mobileCountryCode": "TUR",
    "mobileNo": 8190129,
    "mobileOperatorNo": 541
}

```

  </TabItem>
</Tabs>

## Response

The API successfully resolves the provided phone parameters and correlates it with a masked string representing the wallet's fully registered name.

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| fullName | string | The masked real name of the wallet holder (e.g., `E*****S S*****U`). |

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
        "fullName": "E*****S S*****U"
    }
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
