---
sidebar_position: 5
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transaction History

Retrieve a list of transactions for the authenticated wallet.

<ApiEndpoint method="POST" url="/wallet/transactions" />

### Request Parameters

```json
{
  "startDate": "2025-07-16",
  "endDate": "2025-07-16"
}
```

### Response

<ApiResponseSelector>

```json status="200" title="Success"
[
  {
    "transactionId": "f66ef144-85cf-43a6-a3cd-bc4e1f858fd1",
    "amount": 105,
    "feeAmount": 5,
    "currencyType": "TRY",
    "transactionDate": "2025-07-08T16:00:13.738+0300",
    "transactionName": "Internal Transfer",
    "debtCredit": "D"
  }
]
```

</ApiResponseSelector>

| Field | Description |
|-------|-------------|
| `debtCredit` | `D` for Debit (Outgoing), `C` for Credit (Incoming). |
| `transactionName` | Human-readable name of the transaction type. |
