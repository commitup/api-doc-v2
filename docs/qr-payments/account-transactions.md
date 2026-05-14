---
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Account Transactions

Returns the transaction history for the authenticated client for the given date range. Results are sorted by `transactionDate` ascending (oldest first). Optionally filter by a specific `transactionId`.

<ApiEndpoint method="GET" url="/wallet/qrcode/account/transactions" />

**Request**

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `startDate` | String | Yes | 24 | Start of date range, inclusive (ISO 8601, e.g. `2025-07-14T00:00:00Z`). |
| `endDate` | String | Yes | 24 | End of date range, exclusive (ISO 8601, e.g. `2025-07-15T00:00:00Z`). |
| `transactionId` | String | No | 11 | Filter by transaction ID (11-digit numeric). |
| `page` | Integer | No | - | Page number (0-indexed, default `0`). |
| `size` | Integer | No | - | Page size (default `100`, max `1000`). |

  </TabItem>
</Tabs>

## Response Fields

| Field | Type | Presence | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `data` | Array | Always | - | List of account transaction records. See [Transaction Record Fields](#transaction-record-fields). |
| `pagination` | Object | Always | - | Standard pagination metadata. |
| `pagination.page` | Integer | Always | - | Current page number. |
| `pagination.pageSize` | Integer | Always | - | Number of records per page. |
| `pagination.totalItems` | Integer | Always | - | Total number of items across all pages. |
| `pagination.totalPages` | Integer | Always | - | Total number of pages available. |
| `pagination.hasNext` | Boolean | Always | - | Indicates if there is a subsequent page. |
| `pagination.hasPrevious` | Boolean | Always | - | Indicates if there is a preceding page. |

### Transaction Record Fields

All fields within the transaction record object are returned as **strings**.

| Field | Type | Presence | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `transactionId` | String | Always | 11 | Transaction identifier (11-digit numeric). Same as `transactionId` in the [Payment Object](./payment-object). |
| `tenantReferenceId` | String | Conditional | 100 | Partner's unique reference ID. Present for API-initiated transactions where the partner provided a reference. |
| `tenantUserId` | String | Conditional | 50 | The tenant's user identifier. Present for API-initiated transactions (QR payment). |
| `transactionType` | String | Always | 30 | Transaction type. See [Account Transaction Types](#account-transaction-types). |
| `transactionDate` | String | Always | 24 | Transaction timestamp (ISO 8601). |
| `amount` | String | Always | 12 | Transaction amount (pattern `999999999.99`). |
| `currency` | String | Always | 3 | Currency code (e.g., `TRY`). |
| `feeAmount` | String | Always | 12 | Fee amount. `"0.00"` if no fee. |
| `feeCurrency` | String | Always | 3 | Fee currency code. |
| `totalAmount` | String | Always | 12 | Total amount including fees. |
| `totalBalance` | String | Always | 12 | Wallet total balance after transaction. |
| `cashBalance` | String | Always | 12 | Wallet cash balance after transaction. |
| `debtCredit` | String | Always | 1 | `D` (debit) or `C` (credit). |
| `merchantName` | String | Conditional | 100 | Merchant name. Present for card and payment transactions. |
| `cardId` | String | Conditional | 20 | Card identifier. Present for card transactions. |
| `reason` | String | Conditional | 200 | Transaction description or reason. |

### Account Transaction Types

| Code | Description |
|------|-------------|
| `PAYMENT` | Incoming cash transfer to wallet|
| `EFT` | EFT transfer to IBAN |
| `EFT_REFUND` | EFT refund of previous EFT transaction |
| `CARD_SALE` | Card purchase |
| `CARD_CANCEL` | Card purchase cancellation |
| `CARD_REFUND` | Card purchase refund |
| `CARD_REFUND_CANCEL` | Card purchase refund cancellation |
| `CREDIT_CASH_OPERATIONAL` | Operational cash deposit |
| `DEBT_CASH_OPERATIONAL` | Operational cash withdrawal |
| `OTHER` | Other/unclassified |

<Tabs>
  <TabItem value="response_example" label="Example Response" default>
<ApiResponseSelector>

```json status="200" title="Success"
{
  "data": [
    {
      "transactionId": "47002323201",
      "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
      "tenantUserId": "364",
      "transactionType": "CARD_SALE",
      "transactionDate": "2025-07-14T15:53:21Z",
      "amount": "84.00",
      "currency": "TRY",
      "feeAmount": "0.00",
      "feeCurrency": "TRY",
      "totalAmount": "84.00",
      "totalBalance": "15420.75",
      "cashBalance": "15420.75",
      "debtCredit": "C",
      "merchantName": "Lezzet Lokantası",
      "cardId": null,
      "reason": null
    },
    {
      "transactionId": "47002323302",
      "tenantReferenceId": null,
      "tenantUserId": "364",
      "transactionType": "CARD_REFUND",
      "transactionDate": "2025-07-14T16:15:05Z",
      "amount": "84.00",
      "currency": "TRY",
      "feeAmount": "0.00",
      "feeCurrency": "TRY",
      "totalAmount": "84.00",
      "totalBalance": "15336.75",
      "cashBalance": "15336.75",
      "debtCredit": "D",
      "merchantName": "Lezzet Lokantası",
      "cardId": null,
      "reason": null
    },
    {
      "transactionId": "47002324001",
      "tenantReferenceId": null,
      "tenantUserId": null,
      "transactionType": "PAYMENT",
      "transactionDate": "2025-07-14T17:30:00Z",
      "amount": "500.00",
      "currency": "TRY",
      "feeAmount": "0.00",
      "feeCurrency": "TRY",
      "totalAmount": "500.00",
      "totalBalance": "15836.75",
      "cashBalance": "15836.75",
      "debtCredit": "C",
      "merchantName": null,
      "cardId": null,
      "reason": "IBAN deposit"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 100,
    "totalItems": 3,
    "totalPages": 1,
    "hasNext": false,
    "hasPrevious": false
  }
}
```

</ApiResponseSelector>
  </TabItem>
</Tabs>
