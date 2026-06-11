---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Card Transfer — Confirm

Execute a previously validated card transfer transaction. Funds are debited from the wallet atomically during this step.

<ApiEndpoint method="POST" url="/wallet/p2p/card/confirm" />

:::important Failure handling
**HTTP 4XX errors:** The transaction is rejected and no funds are moved. The wallet balance is unchanged.

**Timeout / 5XX errors:** Retry the same request with **identical values**. Confirm is idempotent by `transactionId` + `tenantReferenceId`. See [Confirm Retry & Fallback Strategy](./confirm-retry-fallback).
:::

## Request

<Tabs>
  <TabItem value="fields" label="Request Body" default>

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `transactionId` | String | **Yes** | The transaction ID returned from the [validate](./card-validate) response. |
| `tenantReferenceId` | String | **Yes** | The tenant's reference ID — must match the value from validate. Used as an idempotency key. |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "transactionId": "d8c8ba37-c434-4f5a-bda6-9129d6294f8b",
  "tenantReferenceId": "test-happy-path-001"
}
```

  </TabItem>
</Tabs>

## Response

The response is a [Transaction Object](./transaction-object) with the following confirm-specific behaviour:

- **`status`** may still be `READY` immediately after confirm — the transition to `SENT` happens asynchronously. Use the [Query](./card-query) endpoint to poll for the updated status.
- **`processRefNo`** and **`externalTransactionId`** are populated after successful processing.
- On idempotent retries, the current status is returned (which may be `SENT` or `COMPLETED`).

<Tabs>
  <TabItem value="success" label="Success" default>
<ApiResponseSelector>

```json status="200" title="Confirm — Processing"
{
  "transactionId": "d8c8ba37-c434-4f5a-bda6-9129d6294f8b",
  "status": "READY",
  "amount": 150.00,
  "fee": 4.00,
  "total": 154.00,
  "sourceAmount": 8215.53,
  "sourceCurrency": "TRY",
  "payoutAmount": 2851428.57,
  "currency": "EUR",
  "payoutCurrency": "IDR",
  "processRefNo": "47005005788",
  "externalTransactionId": "47005005788",
  "tenantReferenceId": "test-happy-path-001"
}
```

</ApiResponseSelector>
  </TabItem>
</Tabs>
