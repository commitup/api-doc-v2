---
sidebar_position: 6
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Internal Transfers

Send money between wallets within the same whitelabel system.

## 1. Validate Transfer
<ApiEndpoint method="POST" url="/wallet/transfer/validate" />

Checks if the destination wallet exists and if the source has sufficient balance.

**Request Example:**
```json
{
  "toWalletId": 13359415,
  "amount": 12.25,
  "currency": "TRY",
  "comment": "Test transfer"
}
```

## 2. Confirm Transfer
<ApiEndpoint method="POST" url="/wallet/transfer/confirm" />

Executes the transfer using the `transactionId` obtained from the validation step.

**Request Example:**
```json
{
  "transactionId": "f66ef144-85cf-43a6-a3cd-bc4e1f858fd1"
}
```

### Response
<ApiResponseSelector>

```json status="200" title="Success"
{
  "transferReference": "47004897230",
  "transactionId": "f66ef144-85cf-43a6-a3cd-bc4e1f858fd1",
  "amount": 12.25,
  "feeAmount": 0.25
}
```

</ApiResponseSelector>
