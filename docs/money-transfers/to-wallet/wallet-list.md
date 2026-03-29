---
sidebar_position: 1
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Wallet List

:::danger Mandatory: Local Static Data
You **must not** call this endpoint prior to every transfer. The list of valid wallets changes infrequently, meaning you are required to fetch this list once and store the `walletId`s locally on your own systems. Supply your localized `walletId` strings during the validation step.
:::

Returns the complete list of all valid electronic wallet providers that are currently supported by the platform. 

Some wallets may exist in several countries. Due to this, the `walletId` typically embeds the country identifier (e.g., `WALLET-TUR`, `WALLET-USA`). Ensure you select the correct wallet based on the destination.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/wallet-info-list" />

## Response

The response contains a list of wallet objects mapping their IDs and localized names.

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| walletId | string | The unique string identifier of the wallet provider. |
| walletName | string | The readable name of the wallet. |
| countryIsoCode | string | The ISO 3166-1 alpha-3 code of the country where the wallet operates. |

:::warning Note
The `countryIsoCode` parameter is provided entirely for informational purposes to help you build out UI filters. It is **not required** when initiating a transfer; only the `walletId` is required.
:::

  </TabItem>
  <TabItem value="example" label="Example Response">

<ApiResponseSelector>

```json status="200" title="Success"
[
  {
     "walletId": "WALLET-TUR",
     "walletName": "Turkish Wallet",
     "countryIsoCode": "TUR"
  },
  {
     "walletId": "WALLET-ARE",
     "walletName": "UAE Wallet",
     "countryIsoCode": "ARE"
  }
]
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
