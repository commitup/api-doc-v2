---
sidebar_position: 8
---

# Confirm Retry & Fallback Strategy

When the Confirm call fails due to a network timeout or HTTP 5XX error, the transaction may or may not have been processed. This section provides the recommended retry strategy.

## Retry Schedule

| Attempt | Delay | Action |
|---|---|---|
| 1 | 1 second | Retry Confirm with **identical** `transactionId` + `tenantReferenceId`. |
| 2 | 5 seconds | Retry Confirm with identical values. |
| 3 | 15 seconds | Retry Confirm with identical values. |
| Fallback | — | Stop retrying Confirm. Query the transaction status instead. |

## Why Retry Is Safe

Confirm is **idempotent** by `transactionId` + `tenantReferenceId`. If the original request was processed, the retry returns the current transaction state without creating a duplicate debit. If the original request was not processed, the retry processes it normally.

:::important
You **must** retry with identical values. Changing the `tenantReferenceId` on a retry will result in an idempotency mismatch error (HTTP 409).
:::

## Fallback to Query

If all 3 retries fail, use the Query endpoint to check the transaction status:

```
GET /wallet/p2p/query/{transactionId}
```

### Query Response Handling

| Status | Meaning | Action |
|---|---|---|
| `READY` | Transaction was validated but confirm was **never processed**. | Safe to retry confirm, or let the transaction expire. |
| `SENT` | Confirm was processed. Transaction submitted to card network. | Funds debited. No further action needed. |
| `COMPLETED` | Transaction settled. | Final. No action needed. |
| `CANCELLED` | Transaction failed or was reversed. | Funds returned to wallet. Investigate if unexpected. |

## Decision Flow

```mermaid
flowchart TD
    A["POST /wallet/p2p/card/confirm"] --> B{"Response?"}
    B -->|"200 OK"| C["Success — done"]
    B -->|"HTTP 406/409"| D["Rejected — no funds moved"]
    B -->|"HTTP 5XX / Timeout"| E{"Retry count < 3?"}
    E -->|Yes| F["Wait 1s / 5s / 15s"]
    F --> A
    E -->|No| G["GET /wallet/p2p/query/{transactionId}"]
    G --> H{"Status?"}
    H -->|"READY"| I["Confirm was never processed.<br/>Retry or let expire."]
    H -->|"SENT / COMPLETED"| J["Already processed.<br/>No action needed."]
    H -->|"CANCELLED"| K["Failed. Funds returned."]
```

## Error Handling Summary

| Confirm Response | Wallet Debited? | Action |
|---|---|---|
| **200 OK** | Yes (if status transitions to SENT) | Done. Query to track settlement. |
| **HTTP 406** (validation) | No | Fix request. Do not retry with same data. |
| **HTTP 409** (idempotency) | No | Values don't match original confirm. Investigate. |
| **HTTP 5XX / Timeout** | Unknown | Retry with identical values per schedule above. |
