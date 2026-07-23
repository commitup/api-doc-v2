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
| `balance` | String | Always | 12 | Current available balance — the sum of all completed wallet transactions. See [Balance Semantics](#balance-semantics) below. |
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

## Balance Semantics

The `balance` field represents the sum of all **completed** wallet transactions:

- Only **completed** QR transactions (`CARD_SALE`, `CARD_REFUND`, `CARD_CANCEL`) are reflected in the balance.
- **Commission entries** (`CREDIT_COMMISSION`, `DEBIT_COMMISSION`) are **not** included until the settlement with the Card Scheme is completed and the commission transaction is finalised.
- In-flight amounts — such as confirmed payments awaiting authorization, or commission entries awaiting settlement processing — are **not** reflected in this balance.
- The direction of commission entries (credit or debit) for your account is determined by your business agreement.

:::note
This endpoint is for periodic balance monitoring — it should not be called before every transaction. See [API Rate Limits](./intro#api-rate-limits) for per-endpoint limits.
:::
