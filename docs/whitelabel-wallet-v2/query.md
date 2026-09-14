---
sidebar_position: 17
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Query a Transaction

Retrieve the current state of a transfer. This endpoint is safe to call at any time and has no side effects.

<ApiEndpoint method="GET" url="/wallet/p2p/query/{transactionId}" />

One endpoint serves all four transfer types — there is no `{type}` segment. Use it to poll for settlement, and to recover state after a confirm call times out.

:::important No webhooks
There are no webhooks for P2P transfers. Query is the only way to observe status transitions.
:::

## Request

<Tabs>
  <TabItem value="fields" label="Path Parameters" default>

| Parameter | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `transactionId` | String | Format: UUID | The transaction ID from the validate or [confirm](./confirm) response. |

  </TabItem>
  <TabItem value="headers" label="Headers">

```http
GET /wallet/p2p/query/{transactionId} HTTP/1.1
Accept: application/json
X-Api-Key: your_api_key
X-Api-Secret: your_api_secret
X-Wallet-Id: your_wallet_id
X-Secure-Data: your_secure_data
```

  </TabItem>
  <TabItem value="curl" label="cURL">

```bash
curl -X GET "https://whitelabelwallet-mig.payporter.com.tr:8590/wallet/p2p/query/d8c8ba37-c434-4f5a-bda6-9129d6294f8b" \
     -H "Accept: application/json" \
     -H "X-Api-Key: your_api_key" \
     -H "X-Api-Secret: your_api_secret" \
     -H "X-Wallet-Id: your_wallet_id" \
     -H "X-Secure-Data: your_secure_data"
```

  </TabItem>
</Tabs>

## Response

On success the response is a [Transaction Object](./transaction-object). Read its `status` field to determine where the transfer stands:

| `status` | Meaning | Terminal? |
| :--- | :--- | :--- |
| `SENT` | Submitted to the network, awaiting settlement. | No |
| `COMPLETED` | Settled at the destination. | Yes |
| `CANCELLED` | Failed or reversed. Funds returned to the wallet. | Yes |
| `REFUNDED` | A completed transfer was refunded. Funds returned to the wallet. | Yes |

If the transaction has not reached a readable state, the endpoint returns HTTP `406` with an error code instead of a Transaction Object:

| Error code | Meaning | Action |
| :--- | :--- | :--- |
| `WL_TRANSACTION_IN_PROGRESS` | Still processing. | Poll again after 10 seconds (max 3 attempts). |
| `WL_TRANSACTION_NOT_FOUND` | Not found, or failed upstream and funds were returned to the wallet. | Safe to restart the flow. See [Confirm Fallback Strategy](./confirm-retry-fallback). |

<ApiResponseSelector>

```json status="200" title="Success (Processed)"
{
  "transactionId": "48972265-9396-4efc-a40a-bc697f69b0b4",
  "status": "SENT",
  "transactionType": "TO_CARD",
  "processRefNo": "47014456074",
  "externalTransactionId": "187659276",
  "tenantReferenceId": "TFZ-DEV-93111",
  "amount": "452",
  "currency": "USD",
  "fee": "8",
  "total": "22367.18",
  "totalCurrency": "TRY",
  "feeCurrency": "USD",
  "sourceAmount": "22367.18",
  "sourceCurrency": "TRY",
  "payoutAmount": "452",
  "payoutCurrency": "USD",
  "receiver": {
    "firstName": "ILYA",
    "lastName": "BAZHKO",
    "fatherName": null,
    "receiverType": null,
    "birthDate": null,
    "birthPlace": null,
    "nationality": null,
    "birthCountry": null,
    "identityNo": "AB4094780",
    "identityType": "PASSPORT",
    "identityIssueCountry": null,
    "identityValidThru": null,
    "identityIssueDate": null,
    "addressCountry": null,
    "address": null,
    "province": null,
    "district": null,
    "zipCode": null,
    "job": null,
    "email": null,
    "phoneCountryCode": null,
    "phoneNumber": "905551234567"
  },
  "comment": "Tax free iadesi commenti",
  "purpose": "OTHER",
  "sourceOfIncome": "OTHER"
}
```

```json status="406" title="Transaction In Progress"
{
  "status": "error",
  "code": "WL_TRANSACTION_IN_PROGRESS",
  "message": "Transaction is currently processing."
}
```

```json status="406" title="Transaction Not Found"
{
  "status": "error",
  "code": "WL_TRANSACTION_NOT_FOUND",
  "message": "Transaction not found or funds returned."
}
```

</ApiResponseSelector>
