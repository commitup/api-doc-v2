---
sidebar_position: 9
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Card Transfer — Query

Retrieve the current state of a P2P card transfer transaction. This endpoint is idempotent and safe to call at any time.

<ApiEndpoint method="GET" url="/wallet/p2p/query/{transactionId}" />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Request

<Tabs>
  <TabItem value="fields" label="Path Parameters" default>

| Parameter | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `transactionId` | String | Format: UUID | The transaction ID from the [validate](./card-validate) or [confirm](./card-confirm) response. |

  </TabItem>
  <TabItem value="headers" label="Headers">

```http
GET /wallet/p2p/query/{transactionId} HTTP/1.1
Accept: application/json
X-Api-Key: your_api_key
X-Api-Secret: your_api_secret
X-Wallet-Id: your_wallet_id
```

  </TabItem>
  <TabItem value="curl" label="cURL">

```bash
curl -X GET "https://whitelabelwallet-mig.payporter.com.tr:8590/wallet/p2p/query/d8c8ba37-c434-4f5a-bda6-9129d6294f8b" \
     -H "Accept: application/json" \
     -H "X-Api-Key: your_api_key" \
     -H "X-Api-Secret: your_api_secret" \
     -H "X-Wallet-Id: your_wallet_id"
```

  </TabItem>
</Tabs>

## Response

The response is a [Transaction Object](./transaction-object) if the transaction was successfully processed, otherwise it returns an error.

:::note
Use this endpoint to poll for status updates if a confirm call times out or returns a 5XX error.
:::

<ApiResponseSelector>

```json status="200" title="Success (Processed)"
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

```json status="404" title="Transaction Not Found"
{
  "status": "error",
  "code": "WL_TRANSACTION_NOT_FOUND",
  "message": "Transaction not found or funds returned."
}
```

```json status="409" title="Transaction In Progress"
{
  "status": "error",
  "code": "WL_TRANSACTION_IN_PROGRESS",
  "message": "Transaction is currently processing."
}
```

</ApiResponseSelector>
