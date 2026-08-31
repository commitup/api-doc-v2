---
sidebar_position: 18
---

# Confirm Fallback Strategy

When the Confirm call fails due to a network timeout or HTTP 5XX error, the transaction may or may not have been processed.

**Do not retry the Confirm request.** Retry attempts may lead to duplicate processing or unintended side-effects.

## Fallback to Query

If you encounter a timeout or 5XX error on confirm, use the Query endpoint to check the internal transaction status:

```
GET /wallet/p2p/query/{transactionId}
```

### Query Response Handling

When you call the Query endpoint, it will check the internal transaction state and return one of the following:

| Response | Meaning | Action |
|---|---|---|
| **200 OK (Payment Object)** | Confirm was successfully processed. | Funds debited. No further action needed. |
| **Error: `WL_TRANSACTION_IN_PROGRESS`** | Transaction is still processing. | Query again with a 10-second delay (up to 3 times). If it persists, raise an issue. |
| **Error: `WL_TRANSACTION_NOT_FOUND`** | Confirm was never processed, or the transaction failed and funds were returned to the wallet. | Safe to restart the flow or let the transaction expire. |

## Decision Flow

```mermaid
flowchart TD
    A["POST /wallet/p2p/to-card/confirm"] --> B{"Response?"}
    B -->|"200 OK"| C["Success — done"]
    B -->|"HTTP 406"| D["Rejected — no funds moved"]
    B -->|"HTTP 5XX / Timeout"| G["GET /wallet/p2p/query/{transactionId}"]
    G --> H{"Query Response?"}
    H -->|"Error: WL_TRANSACTION_NOT_FOUND"| I["Confirm was never processed.<br/>Safe to restart."]
    H -->|"200 OK"| J["Already processed.<br/>No action needed."]
    H -->|"Error: WL_TRANSACTION_IN_PROGRESS"| K["Still processing.<br/>Poll again (max 3 times)."]
```

## Error Handling Summary

| Confirm Response | Wallet Debited? | Action |
|---|---|---|
| **200 OK** | Yes (if status transitions to SENT) | Done. Query to track settlement. |
| **HTTP 406** (validation) | No | Fix request. |
| **HTTP 5XX / Timeout** | Unknown | Immediately query using the `transactionId`. |
