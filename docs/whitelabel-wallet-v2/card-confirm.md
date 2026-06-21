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

**Timeout / 5XX errors:** Do not retry the confirm request. Instead, immediately query the transaction status using the `transactionId`. See [Confirm Fallback Strategy](./confirm-retry-fallback).
:::

## Request

<Tabs>
  <TabItem value="fields" label="Request Fields" default>

| Field | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `transactionId` | String | Max: 36<br/>Format: UUID | The transaction ID returned from the [validate](./card-validate) response. |

  </TabItem>
  <TabItem value="headers" label="Headers">

```http
POST /wallet/p2p/card/confirm HTTP/1.1
Content-Type: application/json
Accept: application/json
X-Api-Key: your_api_key
X-Api-Secret: your_api_secret
X-Wallet-Id: your_wallet_id
```

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "transactionId": "d8c8ba37-c434-4f5a-bda6-9129d6294f8b"
}
```

  </TabItem>
  <TabItem value="curl" label="cURL">

```bash
curl -X POST "https://whitelabelwallet-mig.payporter.com.tr:8590/wallet/p2p/card/confirm" \
     -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     -H "X-Api-Key: your_api_key" \
     -H "X-Api-Secret: your_api_secret" \
     -H "X-Wallet-Id: your_wallet_id" \
     -d '{
           "transactionId": "d8c8ba37-c434-4f5a-bda6-9129d6294f8b"
         }'
```

  </TabItem>
</Tabs>

## Response

> [!IMPORTANT]
> A successful Confirm response may still return `status: READY`.
>
> This is expected behaviour, as the transition to `SENT` happens asynchronously.
> Clients should use the Query endpoint to monitor the transaction until it reaches a terminal status.

The response is a [Transaction Object](./transaction-object).

- **`processRefNo`** and **`externalTransactionId`** are populated after successful processing.

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
  "externalTransactionId": "47005005788"
}
```

```json status="406" title="Idempotency Conflict"
{
  "restHeader": {
    "success": false,
    "code": "WL_P2P_TRANSACTION_ALREADY_EXISTS",
    "message": "A transaction with this tenantReferenceId already exists."
  }
}
```

</ApiResponseSelector>
  </TabItem>
</Tabs>
