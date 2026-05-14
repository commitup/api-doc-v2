---
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Balance Inquiry

Returns the current balance of the settlement wallet. Errors: authentication errors only (see [Authentication Errors](./intro#authentication-errors)).

<ApiEndpoint method="GET" url="/wallet/qrcode/account/balance" />

## Balance Response

| Field | Type | Presence | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `balance` | String | Always | 12 | Current available balance. |
| `currency` | String | Always | 3 | Currency code (e.g., `TRY`). |

<Tabs>
  <TabItem value="response_example" label="Example Response" default>
<ApiResponseSelector>

```json status="200" title="Success"
{
  "balance": "15420.75",
  "currency": "TRY"
}
```

</ApiResponseSelector>
  </TabItem>
</Tabs>

:::note
This endpoint is for periodic balance monitoring. It should not be called before every transaction.
:::
