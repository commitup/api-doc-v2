---
sidebar_position: 4
---

# Partner Fund Safety Model

This section describes when the partner should debit or credit the customer's account relative to the API calls and webhooks. **Getting this wrong means the partner's funds are at risk.**

## Payment: Debit Timing

For **payment** transactions, the partner debits the customer **after** a successful Read and **before** calling Confirm.

```mermaid
flowchart TD
    A["1. POST /wallet/qrcode/payment/read"] --> B{"transactionType?"}
    B -->|PAYMENT| C["2. Debit customer account"]
    C --> D["3. POST /wallet/qrcode/payment/confirm"]
    D --> E{"Response?"}
    E -->|"HTTP 406/409"| F["4a. Reverse debit immediately<br/>(no webhook will follow)"]
    E -->|"HTTP 5XX / Timeout"| G["4b. Retry with identical values<br/>(idempotency safe)"]
    E -->|"200 OK — IN_PROGRESS"| H["4c. Wait for webhook"]
    H --> I{"Webhook status?"}
    I -->|COMPLETED| J["5a. Finalize — debit stands"]
    I -->|FAILED| K["5b. Reverse debit"]
```

**Static QR note:** For static QR codes, each Read returns a **new `transactionId`**. The partner must debit only the amount entered by the user and pass the same amount to Confirm. If the Confirm is rejected (e.g., another Read has already consumed the QR), the partner must reverse the debit.

---

## Refund: Credit Timing

For **refund** transactions, the partner does **NOT** debit or credit the customer before calling Confirm. The partner credits the customer **only after** receiving a `COMPLETED` webhook.

```mermaid
flowchart TD
    A["1. POST /wallet/qrcode/payment/read"] --> B{"transactionType?"}
    B -->|REFUND| C["2. POST /wallet/qrcode/payment/confirm<br/>(do NOT credit customer yet)"]
    C --> D{"Response?"}
    D -->|"HTTP 406/409"| E["3a. No action needed<br/>(no webhook will follow)"]
    D -->|"HTTP 5XX / Timeout"| F["3b. Retry with identical values<br/>(idempotency safe)"]
    D -->|"200 OK — IN_PROGRESS"| G["3c. Wait for webhook"]
    G --> H{"Webhook status?"}
    H -->|COMPLETED| I["4a. Credit customer account"]
    H -->|FAILED| J["4b. Do NOT credit customer<br/>(refund was reversed)"]
```

---

## Idempotency, Safe Retries & Deduplication

PayPorter enforces safe retry behavior at every stage to prevent duplicate debits and ensure reliable integrations.

### Read Retry Behaviour

Repeated `Read` calls on the same QR code return the **current state** of the transaction:

| Scenario | `transactionId` across repeated Reads | Behaviour |
|----------|---------------------------------------|----------|
| Payment — dynamic QR (amount in QR) | Same `transactionId` returned | Only one Confirm can succeed |
| Payment — static QR (user enters amount) | New `transactionId` per Read | Multiple Confirms may succeed (each is a distinct transaction) |
| Refund | Same `transactionId` returned | Only one Confirm can succeed |

```mermaid
flowchart LR
    A["Read(qrCode)"] --> B{Status?}
    B -->|READ_QR| C[Safe to Confirm]
    B -->|IN_PROGRESS| D[Already confirmed]
    B -->|COMPLETED / FAILED| E[Closed]
```

### Confirm Idempotency

The first successful Confirm binds the transaction to the caller's identity. Subsequent retries are validated against the bound values.

**Idempotency keys** (checked on retry):

| Transaction Type | Key fields |
|-----------------|------------|
| **Payment** | `transactionId` + `tenantUserId` + `tenantReferenceId` |
| **Refund** | `transactionId` + `tenantUserId` |

If any key field does not match the original Confirm, the request is rejected with `QR_CODE_IDEMPOTENCY_MISMATCH`.

**Uniqueness constraint** (checked on first Confirm):

`tenantReferenceId` must be unique across all payment transactions. Reusing a previously consumed `tenantReferenceId` on a *different* transaction returns `TENANT_REFERENCE_ID_ALREADY_USED`. This is independent of idempotency — it prevents duplicate payment references.

| Scenario | Behaviour |
|----------|----------|
| First Confirm | Binds `tenantUserId` and `tenantReferenceId` (if payment) to the transaction. Processes and returns `IN_PROGRESS`. |
| Retry — all key fields match | Returns the **current transaction state** (which may now be `COMPLETED` or `FAILED`). No duplicate financial record is created. |
| Retry — `tenantUserId` differs | Returns `QR_CODE_IDEMPOTENCY_MISMATCH` (HTTP 409) |
| Retry — `tenantReferenceId` differs (payment only) | Returns `QR_CODE_IDEMPOTENCY_MISMATCH` (HTTP 409) |
| New transaction — `tenantReferenceId` already used by another payment | Returns `TENANT_REFERENCE_ID_ALREADY_USED` (HTTP 409) |

```mermaid
flowchart LR
    A[Confirm] --> B{First?}
    B -->|Yes| C["Bind tenantUserId + tenantReferenceId"]
    C --> D[Process]
    B -->|No| E{"Keys match?"}
    E -->|No| F[QR_CODE_IDEMPOTENCY_MISMATCH]
    E -->|Yes| G[Current state]
```

### Query Idempotency

Repeated queries with the same identifier always return consistent, up-to-date results.
