---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Name Transfer — Confirm

Execute a previously validated name transfer transaction. Funds are debited from the wallet atomically during this step.

<ApiEndpoint method="POST" url="/wallet/p2p/to-name/confirm" />

:::important Failure handling
**HTTP 4XX errors:** The transaction is rejected and no funds are moved. The wallet balance is unchanged.

**Timeout / 5XX errors:** Do not retry the confirm request. Instead, immediately query the transaction status using the `transactionId`. See [Confirm Fallback Strategy](./confirm-retry-fallback).
:::

## Request

<Tabs>
  <TabItem value="fields" label="Request Fields" default>

| Field | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `transactionId` | String | Max: 36<br/>Format: UUID | The transaction ID returned from the validate response. |
| `tenantReferenceId` | String | Max: 50<br/>Alphanumeric | Unique reference ID assigned by the tenant. |

  </TabItem>
  <TabItem value="headers" label="Headers">

```http
POST /wallet/p2p/to-name/confirm HTTP/1.1
Content-Type: application/json
Accept: application/json
X-Api-Key: your_api_key
X-Api-Secret: your_api_secret
X-Wallet-Id: your_wallet_id
```

  </TabItem>
</Tabs>

## Response

> [!IMPORTANT]
> A successful Confirm response may still return `status: READY`.
> This is expected behaviour, as the transition to `SENT` happens asynchronously.
> Clients should use the Query endpoint to monitor the transaction until it reaches a terminal status.

The response is a [Transaction Object](./transaction-object).
