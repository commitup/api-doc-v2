---
sidebar_position: 4
---

# Partner Fund Safety Model

This section describes the fund safety guarantees for P2P money transfer transactions. **Understanding this model is critical to avoid fund risk.**

## Key Principle

P2P money transfers are **wallet-funded**. PayPorter debits the wallet atomically during the Confirm step. The partner does not need to manage separate fund reservations.

---

## Transaction Safety Flow

```mermaid
flowchart TD
    A["1. POST /wallet/p2p/{type}/validate"] --> B{"Response?"}
    B -->|"200 OK — READY"| C["Funds NOT yet moved.<br/>transactionId reserved."]
    B -->|"HTTP 406"| D["Rejected — no funds moved.<br/>Fix request."]
    C --> E["2. POST /wallet/p2p/{type}/confirm<br/>{transactionId, tenantReferenceId}"]
    E -->|"HTTP 200 OK"| G["Success — check query for SETTLED state"]
    E -->|"HTTP 406"| H["Rejected — no funds moved."]
    E -->|"HTTP 5XX / Timeout"| I["Immediately Query status.<br/>See Confirm Fallback."]
    G --> J["3. GET /wallet/p2p/query/{transactionId}"]
    J --> K{"Status?"}
    K -->|"SENT"| L["In progress — awaiting settlement."]
    K -->|"COMPLETED"| M["Settled. Final."]
    K -->|"CANCELLED"| N["Failed. Funds returned to wallet."]
```

---

## When Are Funds Debited?

| Step | Funds Status |
|---|---|
| **Validate** | No funds moved. The `transactionId` and fees are reserved but the wallet balance is not affected. |
| **Confirm — 200 OK** | Wallet debited atomically (amount + fee). The `sourceAmount` (TRY) is deducted. |
| **Confirm — HTTP 4XX** | No funds moved. The wallet balance is unchanged. |
| **Confirm — HTTP 5XX / Timeout** | Unknown. Immediately query the transaction status using the `transactionId`. |

---

## Idempotency Guarantees

### Validate

Each call to validate with a unique `tenantReferenceId` creates a new transaction. Calling validate with a `tenantReferenceId` that was already used returns a `WL_P2P_TRANSACTION_ALREADY_EXISTS` error.

### Confirm

Confirm is executed only once for a given `transactionId`. A second confirm for the same `transactionId` does not debit the wallet again.

| Situation | HTTP | Behaviour |
|---|---|---|
| Missing or malformed confirm payload | `406` | Returns the field-specific error code, e.g. `WL_P2P_TENANT_REF_ID_EMPTY`. No funds moved. |
| `transactionId` already confirmed | `406` | Returns an error rather than reprocessing. Use Query to read the current state. |

### Query

Query is always safe to call. It returns the current state of the transaction without side effects.
