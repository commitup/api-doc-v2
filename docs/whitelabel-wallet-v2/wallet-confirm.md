---
sidebar_position: 16
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Wallet Transfer — Confirm

Confirm and execute a previously validated wallet transfer transaction.

<ApiEndpoint method="POST" url="/wallet/p2p/wallet/confirm" />

## Request

<Tabs>
  <TabItem value="fields" label="Request Fields" default>

| Field                    | Type    | Constraints               | Description                                                                                                                                   |
| :----------------------- | :------ | :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `transactionId`          | String (UUID) | -                   | The unique transaction ID returned by the `/validate` endpoint.                                                                               |

  </TabItem>
  <TabItem value="headers" label="Headers">

```http
POST /wallet/p2p/wallet/confirm HTTP/1.1
Content-Type: application/json
Accept: application/json
X-Api-Key: your_api_key
X-Api-Secret: your_api_secret
X-Wallet-Id: your_wallet_id
```

  </TabItem>
</Tabs>

## Response

The response is a [Transaction Object](./transaction-object) with the status updated to reflect the final outcome of the transaction (`DONE` if successful).

> [!CAUTION] Network Timeouts
> See the [Confirm Retry Fallback](./confirm-retry-fallback) documentation for instructions on how to handle timeouts when calling this endpoint.
