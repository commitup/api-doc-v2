---
sidebar_position: 1
---

# Individual Wallet Transactions

## Version History

| Version | Date       | Changes |
| :------ | :--------- | :------ |
| 1.0.0   | 2026-06-10 | Initial version. P2P transfer endpoints (validate, confirm, query). Partner fund safety model. Confirm retry & fallback strategy. |

---

## Base URL

All API endpoints use the following base URL:

```
https://whitelabelwallet-mig.payporter.com.tr:8590
```

All endpoint paths in this document are relative to this base URL. For example, `POST /wallet/p2p/card/validate` resolves to `https://whitelabelwallet-mig.payporter.com.tr:8590/wallet/p2p/card/validate`.

All requests and responses use `Content-Type: application/json`.

---

## Authentication

All API requests require authentication via the `X-Api-Key`, `X-Api-Secret`, `X-Wallet-Id`, and `X-Secure-Data` headers. The wallet identity (`tenantUserId`) is bound at registration time — it is **not** passed per-transaction.

See [Authentication](../authentication) for the full authentication guide, including `X-Secure-Data` header generation.

| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `X-Api-Key` | String | Yes | Provided API key. |
| `X-Api-Secret` | String | Yes | Provided API secret. |
| `X-Wallet-Id` | String | Yes | Target wallet identifier. |
| `X-Secure-Data` | String | Yes | Encrypted secure data token. |

---

## Transaction Flow

All individual wallet transactions follow a three-step flow:

```
Validate  →  Confirm  →  Query (optional)
```

1. **Validate** — Submit transaction details. If accepted, the response contains a `transactionId` with `status: READY`. No funds are moved yet.
2. **Confirm** — Submit the `transactionId` and `tenantReferenceId` to execute the transaction. Funds are debited from the wallet atomically.
3. **Query** — Retrieve the current state of a transaction by `transactionId`.

:::important
There are **no webhooks** for individual wallet transactions. All status transitions can be observed via the Query endpoint.
:::

---

## Amount Model

Individual wallet transactions support multi-currency transfers. The request accepts **one of two mutually exclusive** amount inputs:

| Input Option | Fields | Description |
|---|---|---|
| **Option A** | `amount` + `currency` | Sending amount in a specified currency (e.g., 150 EUR). |
| **Option B** | `sendingAmount` + `sendingCurrency` | Alternative sending amount in the sender's local currency. |

:::important
Exactly one of `amount` or `sendingAmount` must be provided. Providing both or neither will result in a validation error.
:::

The response includes three amount layers:

| Response Field | Description | Example |
|---|---|---|
| `amount` / `currency` | Sending amount (echoed from input). | `150.00` / `EUR` |
| `sourceAmount` / `sourceCurrency` | TRY equivalent debited from the wallet. | `8215.53` / `TRY` |
| `payoutAmount` / `payoutCurrency` | Final payout in the destination currency. Available after validate, determined by the 3rd party. | `2851428.57` / `IDR` |

---

## Error Response Format

Errors are returned with the following JSON envelope:

```json
{
  "restHeader": {
    "success": false,
    "code": "<ERROR_CODE>",
    "message": "<Human-readable description>",
    "httpStatus": 200,
    "modulName": "jaws-wallet-manager"
  },
  "responseObject": null
}
```

| HTTP Status | Category | When |
|---|---|---|
| `406 Not Acceptable` | Validation | Missing or invalid request fields |
| `409 Conflict` | Idempotency / Uniqueness | Duplicate `tenantReferenceId` |
| `5XX Server Error` | System | Unexpected internal failure |

---

## Transaction Types

Individual wallet transactions support the following P2P transfer sub-types via the `{type}` path parameter:

| Path Segment | Transfer Type | Description |
|---|---|---|
| `name` | `TO_NAME` | Cash pickup via external remittance firm |
| `account` | `TO_ACCOUNT` | Bank transfer to IBAN / account number |
| `card` | `TO_CARD` | Transfer to debit/credit card |
| `wallet` | `TO_WALLET` | Transfer to another wallet |

More transaction types (EFT, wallet-to-wallet, debit/credit) will be migrated to this structure in future releases.
