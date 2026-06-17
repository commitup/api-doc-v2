---
sidebar_position: 2
---

# Flow Diagrams

## Happy Path — Successful Collection

```mermaid
sequenceDiagram
    participant Customer
    participant Partner
    participant PayPorter
    participant Bank
    participant KKB

    Note over Partner, PayPorter: Step 1 — Create Order
    Partner->>PayPorter: POST /external/whitelabel/wallet/collection-order<br/>{orderId, tckn, name, birthDate, amount, currency, reason, matchingKey}
    PayPorter-->>Partner: 200 OK {status: PENDING, receiverIban}

    Note over Partner, Customer: Step 2 — Instruct Customer
    Partner->>Customer: Share receiverIban + matchingKey<br/>(customer must include matchingKey in transfer description)

    Note over Customer, PayPorter: Step 3 — Customer Sends Transfer
    Customer->>Bank: EFT transfer to receiverIban<br/>(matchingKey in transfer description)
    Bank->>PayPorter: Incoming bank transaction notification

    Note over PayPorter, KKB: Step 4 — Matching & Identity Verification
    PayPorter->>PayPorter: Match transaction to order by matchingKey & amount
    PayPorter->>KKB: Verify sender IBAN identity (TCKN lookup)
    KKB-->>PayPorter: Identity confirmed — sender IBAN belongs to tckn/name/birthDate in order
    PayPorter->>PayPorter: Set order status = MATCHED

    Note over PayPorter, Partner: Step 5 — Webhook Approval
    PayPorter->>Partner: Webhook POST {status: MATCHED, senderIban, receivedAmount, ...}
    Partner-->>PayPorter: HTTP 200 {status: "COMPLETED"}
    PayPorter->>PayPorter: Set order status = COMPLETED<br/>Credit wallet, trigger fee processing
```

---

## Rejection — Sender Identity Mismatch (KKB)

When the bank transfer arrives but the sender's IBAN does not belong to the customer identity (`tckn`, `name`, `birthDate`) provided in the order, the transfer is automatically rejected and refunded.

```mermaid
sequenceDiagram
    participant Customer
    participant Partner
    participant PayPorter
    participant Bank
    participant KKB

    Partner->>PayPorter: POST /collection-order → 200 OK {status: PENDING, receiverIban}
    Partner->>Customer: Share receiverIban + matchingKey

    Customer->>Bank: EFT transfer to receiverIban
    Bank->>PayPorter: Incoming bank transaction notification

    PayPorter->>PayPorter: Match transaction to order by matchingKey
    PayPorter->>KKB: Verify sender IBAN identity (TCKN lookup)
    KKB-->>PayPorter: ❌ Identity MISMATCH — sender IBAN does not belong to order's tckn/name/birthDate

    PayPorter->>PayPorter: Set order status = REJECTED (statusDetail: SENDER_MISMATCH)
    PayPorter->>Partner: Webhook POST {status: REJECTED, statusDetail: SENDER_MISMATCH}
    PayPorter->>Bank: Initiate EFT refund to sender IBAN
```

---

## Rejection — Order Expired

If no matching bank transfer is received within the order's validity window, the order is automatically expired.

```mermaid
sequenceDiagram
    participant Partner
    participant PayPorter

    Partner->>PayPorter: POST /collection-order → 200 OK {status: PENDING, receiverIban}

    Note over PayPorter: Time passes — no matching bank transfer received

    PayPorter->>PayPorter: Set order status = REJECTED (statusDetail: EXPIRED)
    PayPorter->>Partner: Webhook POST {status: REJECTED, statusDetail: EXPIRED}

    Note over Partner: Informational only — no approval required.<br/>No bank transfer to refund.
```

---

## Rejection — Partner Rejects Webhook

When a bank transfer is matched and KKB confirms identity, but the partner returns a non-`COMPLETED` status in the webhook response, the order is rejected and the transfer is refunded.

```mermaid
sequenceDiagram
    participant Customer
    participant Partner
    participant PayPorter
    participant Bank
    participant KKB

    Partner->>PayPorter: POST /collection-order → 200 OK {status: PENDING, receiverIban}
    Customer->>Bank: EFT transfer to receiverIban
    Bank->>PayPorter: Incoming bank transaction notification
    PayPorter->>PayPorter: Match transaction to order
    PayPorter->>KKB: Verify sender IBAN identity
    KKB-->>PayPorter: Identity confirmed ✓
    PayPorter->>PayPorter: Set order status = MATCHED

    PayPorter->>Partner: Webhook POST {status: MATCHED, senderIban, receivedAmount, ...}
    Partner-->>PayPorter: HTTP 200 {status: "REJECTED", reason: "Customer not eligible"}

    PayPorter->>PayPorter: Set order status = REJECTED (statusDetail: CANCELLED_BY_CLIENT)
    PayPorter->>Bank: Initiate EFT refund to sender IBAN
```
