---
sidebar_position: 8
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# P2P Query

Retrieve the current state of a P2P transaction. This endpoint is idempotent and safe to call at any time.

<ApiEndpoint method="GET" url="/wallet/p2p/query/{transactionId}" />

## Path Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `transactionId` | String | **Yes** | The transaction ID from the [validate](./p2p-validate) or [confirm](./p2p-confirm) response. |

## Response

The response is a [Transaction Object](./transaction-object) reflecting the current state of the transaction.

:::note
Use this endpoint to poll for status updates after confirm. The confirm response may return `status: READY`, but the query will show the updated status once the transaction transitions to `SENT` or a terminal state.
:::

<ApiResponseSelector>

```json status="200" title="Transaction — SENT"
{
  "transactionId": "d8c8ba37-c434-4f5a-bda6-9129d6294f8b",
  "status": "SENT",
  "amount": 150,
  "fee": 4,
  "total": 154,
  "sourceAmount": 8215.53,
  "payoutAmount": 2851428.57,
  "payoutCurrency": "IDR",
  "processRefNo": "47005005788",
  "externalTransactionId": "47005005788"
}
```

```json status="200" title="Transaction — COMPLETED"
{
  "transactionId": "d8c8ba37-c434-4f5a-bda6-9129d6294f8b",
  "status": "COMPLETED",
  "amount": 150,
  "fee": 4,
  "total": 154,
  "sourceAmount": 8215.53,
  "payoutAmount": 2851428.57,
  "payoutCurrency": "IDR",
  "processRefNo": "47005005788",
  "externalTransactionId": "47005005788"
}
```

```json status="200" title="Transaction — CANCELLED"
{
  "transactionId": "e580e868-dbe4-4a9a-bed0-a1c8620053c1",
  "status": "CANCELLED",
  "amount": 150,
  "fee": 4,
  "total": 154,
  "sourceAmount": 8215.53,
  "processRefNo": "47005005700"
}
```

</ApiResponseSelector>
