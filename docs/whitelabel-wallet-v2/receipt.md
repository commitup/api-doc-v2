---
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';

# Transaction Receipt

Retrieve the official transaction receipt in PDF format for a completed P2P transfer operation.

<ApiEndpoint method="GET" url="/wallet/p2p/receipt/{transactionId}" />

## Request

<Tabs>
  <TabItem value="fields" label="Path Parameters" default>

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `transactionId` | String | **Yes** | The transaction ID of the P2P transfer. Example: `407a7a58-66f5-4871-9514-fbfbc09f47fb`. |

  </TabItem>
  <TabItem value="headers" label="Headers">

```http
GET /wallet/p2p/receipt/{transactionId} HTTP/1.1
Accept: application/pdf
X-Api-Key: your_api_key
X-Api-Secret: your_api_secret
X-Wallet-Id: your_wallet_id
```

  </TabItem>
  <TabItem value="curl" label="cURL">

```bash
curl -X GET "https://whitelabelwallet-mig.payporter.com.tr:8590/wallet/p2p/receipt/407a7a58-66f5-4871-9514-fbfbc09f47fb" \
     -H "Accept: application/pdf" \
     -H "X-Api-Key: your_api_key" \
     -H "X-Api-Secret: your_api_secret" \
     -H "X-Wallet-Id: your_wallet_id" \
     --output receipt.pdf
```

  </TabItem>
</Tabs>

## Response

The endpoint returns a binary PDF file stream (`application/pdf`) representing the transaction receipt. If the transaction or receipt is not found, an HTTP `404 Not Found` response is returned.

<Tabs>
  <TabItem value="success" label="Success" default>

```http status="200 OK"
HTTP/1.1 200 OK
Content-Type: application/pdf

[Binary PDF Content]
```

  </TabItem>
  <TabItem value="error" label="Error Response">

```http status="404 Not Found"
HTTP/1.1 404 Not Found
```

  </TabItem>
</Tabs>
