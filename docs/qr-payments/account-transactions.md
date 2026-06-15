---
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Account Transactions

Returns the transaction history for the authenticated client's settlement wallet for the given date range. Results are sorted by `transactionDate` ascending (oldest first). Optionally filter by a specific `transactionId`.

<ApiEndpoint method="GET" url="/wallet/qrcode/account/transactions" />

## Relationship to QR Transactions

Account Transactions and [QR Payment transactions](./payment-object) serve different purposes:

- **QR Payment transactions** (`PAYMENT` / `REFUND`) are payment-level records with merchant details, tracked through Read → Confirm → Webhook. Use the [Reconciliation](./reconciliation) or [Query](./query-transaction) endpoints to work with these.
- **Account Transactions** are **wallet-level ledger entries** — every debit or credit to the settlement wallet appears here, including QR-related movements, top-ups, commissions, and operational entries.

### How QR Transactions Appear in Account Transactions

Each completed QR transaction produces corresponding account transaction entries:

| QR Outcome | Account Transaction(s) |
|---|---|
| `PAYMENT` → `COMPLETED` | `CARD_SALE` (debit — funds leave the wallet) + `COMMISSION_REBATE` (credit, after settlement) |
| `REFUND` → `COMPLETED` | `CARD_REFUND` or `CARD_CANCEL` (credit — funds return to the wallet) + `COMMISSION_REBATE_REVERSAL` (debit, after settlement) |

- Whether a refund produces `CARD_REFUND` or `CARD_CANCEL` depends on the BKM transaction type (cancellation vs. refund) and the refund source (e.g., late reversals produce `CARD_CANCEL`).
- Commission rebate entries are not generated immediately — they are produced asynchronously by the card scheme settlement process and may not appear on the same day as the original transaction.

:::note Other transaction types
This endpoint also returns non-QR wallet movements such as `BANK_ACCOUNT_TOPUP`, `EFT`, `PAYMENT` (IBAN deposit), and operational entries. These are **not** related to QR transactions and appear independently.
:::

### Identifier Semantics

- **`walletTransactionId`** — Unique identifier for each account transaction record. No two records share the same `walletTransactionId`.
- **`transactionId`** — Unique **within a given `transactionType`**. Each QR transaction maps to exactly one `CARD_SALE`, `CARD_REFUND`, or `CARD_CANCEL` record by `transactionId`. However, the related `COMMISSION_REBATE` or `COMMISSION_REBATE_REVERSAL` entry **shares the same `transactionId`** as the originating sale/refund — this is how commission rebates are correlated with original transactions.

### Commission Rebate Linking

Commission rebates are generated **one-to-one** with completed QR transactions:

- Each completed `CARD_SALE` produces one `COMMISSION_REBATE` entry with the **same `transactionId`**.
- Each completed `CARD_REFUND` / `CARD_CANCEL` produces one `COMMISSION_REBATE_REVERSAL` entry with the **same `transactionId`**.
- Rebates are **not** consolidated — there is no daily or merchant-level aggregation.
- Timing is asynchronous: rebates are produced by the card scheme settlement process and may not appear exactly T+1.

---

## Query Constraints

:::info
- **Retention period**: Permanent — account transactions are retained indefinitely.
- **Date range granularity**: Datetime-level. The `startDate` and `endDate` parameters accept full ISO 8601 timestamps (e.g., `2025-07-14T10:30:00Z`).
- **Maximum date range**: `endDate - startDate` must not exceed **31 days** per request.
- **Rate limit**: See [API Rate Limits](./intro#api-rate-limits).
- **Immutability**: All card and QR-related transaction types (`CARD_SALE`, `CARD_REFUND`, `CARD_CANCEL`, `CARD_REFUND_CANCEL`, `COMMISSION_REBATE`, `COMMISSION_REBATE_REVERSAL`) are **fully immutable** — once recorded, they will never be modified or deleted. Non-card types (e.g., `BANK_ACCOUNT_TOPUP`) may only be cancelled in exceptional circumstances and never under normal operations.
:::

---

**Request**

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `startDate` | String | Yes | 24 | Start of date range, inclusive (ISO 8601, e.g. `2025-07-14T00:00:00Z`). |
| `endDate` | String | Yes | 24 | End of date range, exclusive (ISO 8601, e.g. `2025-07-15T00:00:00Z`). Max span: 31 days. |
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
| `walletTransactionId` | String | Always | 36 | Unique identifier for this account transaction record (UUID v4). |
| `transactionId` | String | Always | 11 | Transaction identifier (11-digit numeric). Same as `transactionId` in the [Payment Object](./payment-object) for QR-related types. Unique within a `transactionType`; commission rebate entries share the same `transactionId` as their originating transaction. See [Identifier Semantics](#identifier-semantics). |
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

**QR-related types** — produced by QR payment flows:

| Code | `debtCredit` | Description |
|------|:---:|-------------|
| `CARD_SALE` | `D` | QR payment completed — funds debited from the wallet (card purchase). |
| `CARD_CANCEL` | `C` | QR payment cancellation or refund (BKM cancel type / late reversal) — funds returned to the wallet. |
| `CARD_REFUND` | `C` | QR refund completed (BKM refund type) — funds returned to the wallet. |
| `CARD_REFUND_CANCEL` | `D` | QR refund cancellation — refund reversed, funds debited again. |
| `COMMISSION_REBATE` | `C` | Commission rebate for a completed sale. Shares the same `transactionId` as the original `CARD_SALE`. Generated asynchronously by settlement. |
| `COMMISSION_REBATE_REVERSAL` | `D` | Commission rebate reversal for a completed refund. Shares the same `transactionId` as the original `CARD_REFUND` / `CARD_CANCEL`. Generated asynchronously by settlement. |

**Wallet-level types** — not related to QR transactions:

| Code | Description |
|------|-------------|
| `BANK_ACCOUNT_TOPUP` | Top-up from linked bank account (IBAN transfer to wallet). |
| `BANK_ACCOUNT_TOPUP_CANCEL` | Cancellation of bank account top-up. |
| `PAYMENT` | Incoming cash transfer to wallet. |
| `EFT` | EFT transfer to IBAN. |
| `EFT_REFUND` | EFT refund of previous EFT transaction. |
| `CREDIT_CASH_OPERATIONAL` | Operational cash deposit. |
| `DEBT_CASH_OPERATIONAL` | Operational cash withdrawal. |
| `OTHER` | Other/unclassified. |

<Tabs>
  <TabItem value="response_example" label="Example Response" default>
<ApiResponseSelector>

```json status="200" title="Success"
{
  "data": [
    {
      "walletTransactionId": "a1b2c3d4-e5f6-4a7b-8c9d-000000000001",
      "transactionId": "47002320001",
      "tenantReferenceId": null,
      "tenantUserId": null,
      "transactionType": "BANK_ACCOUNT_TOPUP",
      "transactionDate": "2025-07-14T09:00:00Z",
      "amount": "10000.00",
      "currency": "TRY",
      "feeAmount": "0.00",
      "feeCurrency": "TRY",
      "totalAmount": "10000.00",
      "totalBalance": "10000.00",
      "cashBalance": "10000.00",
      "debtCredit": "C",
      "merchantName": null,
      "cardId": null,
      "reason": null
    },
    {
      "walletTransactionId": "a1b2c3d4-e5f6-4a7b-8c9d-000000000002",
      "transactionId": "47002323201",
      "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
      "tenantUserId": "364",
      "transactionType": "CARD_SALE",
      "transactionDate": "2025-07-14T12:30:00Z",
      "amount": "84.00",
      "currency": "TRY",
      "feeAmount": "0.00",
      "feeCurrency": "TRY",
      "totalAmount": "84.00",
      "totalBalance": "9916.00",
      "cashBalance": "9916.00",
      "debtCredit": "D",
      "merchantName": "Lezzet Lokantası",
      "cardId": null,
      "reason": null
    },
    {
      "walletTransactionId": "a1b2c3d4-e5f6-4a7b-8c9d-000000000003",
      "transactionId": "47002323205",
      "tenantReferenceId": "b3f1a9c7-5e22-4d8a-a016-72f8b1e44d03",
      "tenantUserId": "364",
      "transactionType": "CARD_SALE",
      "transactionDate": "2025-07-14T14:15:00Z",
      "amount": "250.00",
      "currency": "TRY",
      "feeAmount": "0.00",
      "feeCurrency": "TRY",
      "totalAmount": "250.00",
      "totalBalance": "9666.00",
      "cashBalance": "9666.00",
      "debtCredit": "D",
      "merchantName": "Migros",
      "cardId": null,
      "reason": null
    },
    {
      "walletTransactionId": "a1b2c3d4-e5f6-4a7b-8c9d-000000000004",
      "transactionId": "47002323302",
      "tenantReferenceId": null,
      "tenantUserId": "364",
      "transactionType": "CARD_REFUND",
      "transactionDate": "2025-07-14T16:45:00Z",
      "amount": "250.00",
      "currency": "TRY",
      "feeAmount": "0.00",
      "feeCurrency": "TRY",
      "totalAmount": "250.00",
      "totalBalance": "9916.00",
      "cashBalance": "9916.00",
      "debtCredit": "C",
      "merchantName": "Migros",
      "cardId": null,
      "reason": null
    },
    {
      "walletTransactionId": "a1b2c3d4-e5f6-4a7b-8c9d-000000000005",
      "transactionId": "47002323201",
      "tenantReferenceId": null,
      "tenantUserId": null,
      "transactionType": "COMMISSION_REBATE",
      "transactionDate": "2025-07-15T08:00:00Z",
      "amount": "1.68",
      "currency": "TRY",
      "feeAmount": "0.00",
      "feeCurrency": "TRY",
      "totalAmount": "1.68",
      "totalBalance": "9917.68",
      "cashBalance": "9917.68",
      "debtCredit": "C",
      "merchantName": null,
      "cardId": null,
      "reason": null
    },
    {
      "walletTransactionId": "a1b2c3d4-e5f6-4a7b-8c9d-000000000006",
      "transactionId": "47002323205",
      "tenantReferenceId": null,
      "tenantUserId": null,
      "transactionType": "COMMISSION_REBATE",
      "transactionDate": "2025-07-15T08:00:01Z",
      "amount": "5.00",
      "currency": "TRY",
      "feeAmount": "0.00",
      "feeCurrency": "TRY",
      "totalAmount": "5.00",
      "totalBalance": "9922.68",
      "cashBalance": "9922.68",
      "debtCredit": "C",
      "merchantName": null,
      "cardId": null,
      "reason": null
    },
    {
      "walletTransactionId": "a1b2c3d4-e5f6-4a7b-8c9d-000000000007",
      "transactionId": "47002323302",
      "tenantReferenceId": null,
      "tenantUserId": null,
      "transactionType": "COMMISSION_REBATE_REVERSAL",
      "transactionDate": "2025-07-15T08:00:02Z",
      "amount": "5.00",
      "currency": "TRY",
      "feeAmount": "0.00",
      "feeCurrency": "TRY",
      "totalAmount": "5.00",
      "totalBalance": "9917.68",
      "cashBalance": "9917.68",
      "debtCredit": "D",
      "merchantName": null,
      "cardId": null,
      "reason": null
    }
  ],
  "pagination": {
    "page": 0,
    "pageSize": 100,
    "totalItems": 7,
    "totalPages": 1,
    "hasNext": false,
    "hasPrevious": false
  }
}
```

</ApiResponseSelector>
  </TabItem>
</Tabs>
