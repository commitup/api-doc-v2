---
sidebar_position: 3
---

# Flow Diagrams

## Transaction Flow (All Types)

The following sequence diagram shows the generic flow for all individual wallet transactions. Replace `{txType}` with the specific endpoint path (e.g., `p2p/card`, `p2p/name`, `eft`, etc.).

```mermaid
sequenceDiagram
    participant Partner
    participant PayPorter
    participant External as External Provider

    Note over Partner, PayPorter: Step 1 — Validate
    Partner->>PayPorter: POST /wallet/{txType}/validate<br/>{tenantReferenceId, amount, currency, ...}
    PayPorter->>PayPorter: Validate fields, calculate fees & FX
    PayPorter-->>Partner: 200 OK<br/>{status: READY, transactionId, fee, sourceAmount, payoutAmount}

    Note over Partner, PayPorter: Step 2 — Confirm
    Partner->>PayPorter: POST /wallet/{txType}/confirm<br/>{transactionId, tenantReferenceId}
    PayPorter->>PayPorter: Debit wallet atomically
    PayPorter->>External: Submit transaction
    PayPorter-->>Partner: 200 OK<br/>{status: READY, processRefNo, externalTransactionId}

    Note over Partner, External: Step 3 — Async settlement
    External->>PayPorter: Settlement confirmation
    PayPorter->>PayPorter: Update status → SENT → COMPLETED

    Note over Partner, PayPorter: Step 4 — Query (optional)
    Partner->>PayPorter: GET /wallet/{txType}/query/{transactionId}
    PayPorter-->>Partner: 200 OK<br/>{status: SENT or COMPLETED}
```

---

## P2P To Card Flow

```mermaid
sequenceDiagram
    participant Partner
    participant PayPorter
    participant CardNetwork as Card Network

    Partner->>PayPorter: POST /wallet/p2p/card/validate<br/>{tenantReferenceId, amount: 150, currency: EUR,<br/>destinationCountry: IDN, cardNumber: 5473...}
    PayPorter-->>Partner: 200 OK<br/>{status: READY, transactionId,<br/>fee: 4.00, sourceAmount: 8215.53 TRY,<br/>payoutAmount: 2851428.57 IDR}

    Partner->>PayPorter: POST /wallet/p2p/card/confirm<br/>{transactionId, tenantReferenceId}
    PayPorter->>PayPorter: Debit 8215.53 TRY from wallet
    PayPorter->>CardNetwork: Submit card transfer
    PayPorter-->>Partner: 200 OK<br/>{processRefNo, externalTransactionId}

    CardNetwork-->>PayPorter: Settlement
    Partner->>PayPorter: GET /wallet/p2p/query/{transactionId}
    PayPorter-->>Partner: 200 OK {status: SENT}
```

---

## P2P To Name (Cash Pickup) Flow

```mermaid
sequenceDiagram
    participant Partner
    participant PayPorter
    participant RemittanceFirm as Remittance Firm

    Partner->>PayPorter: POST /wallet/p2p/name/validate<br/>{tenantReferenceId, amount, currency,<br/>destinationCountry, externalFirm,<br/>receiver: {firstName, lastName, ...}}
    PayPorter-->>Partner: 200 OK<br/>{status: READY, transactionId, fee, payoutAmount}

    Partner->>PayPorter: POST /wallet/p2p/name/confirm<br/>{transactionId, tenantReferenceId}
    PayPorter->>RemittanceFirm: Submit transfer
    PayPorter-->>Partner: 200 OK<br/>{processRefNo, externalTransactionId}

    RemittanceFirm-->>PayPorter: Settlement / pickup confirmation
```

---

## P2P To Account (Bank Transfer) Flow

```mermaid
sequenceDiagram
    participant Partner
    participant PayPorter
    participant Bank

    Partner->>PayPorter: POST /wallet/p2p/account/validate<br/>{tenantReferenceId, amount, currency,<br/>destinationCountry, bankId, accountNumber,<br/>receiver: {...}}
    PayPorter-->>Partner: 200 OK<br/>{status: READY, transactionId, fee}

    Partner->>PayPorter: POST /wallet/p2p/account/confirm<br/>{transactionId, tenantReferenceId}
    PayPorter->>Bank: Submit bank transfer
    PayPorter-->>Partner: 200 OK<br/>{processRefNo}
```

---

## P2P To Wallet Flow

```mermaid
sequenceDiagram
    participant Partner
    participant PayPorter
    participant DestWallet as Destination Wallet

    Partner->>PayPorter: POST /wallet/p2p/wallet/validate<br/>{tenantReferenceId, amount, currency,<br/>destinationCountry, walletType,<br/>receiver: {...}}
    PayPorter-->>Partner: 200 OK<br/>{status: READY, transactionId, fee}

    Partner->>PayPorter: POST /wallet/p2p/wallet/confirm<br/>{transactionId, tenantReferenceId}
    PayPorter->>DestWallet: Submit wallet transfer
    PayPorter-->>Partner: 200 OK<br/>{processRefNo}
```

---

## Error Flow

```mermaid
sequenceDiagram
    participant Partner
    participant PayPorter

    Partner->>PayPorter: POST /wallet/*/validate
    PayPorter-->>Partner: 406 — Validation error<br/>{restHeader: {code, message}}
    Note over Partner: Fix the request and retry

    Partner->>PayPorter: POST /wallet/*/validate
    PayPorter-->>Partner: 200 OK {status: READY}
    Partner->>PayPorter: POST /wallet/*/confirm
    PayPorter-->>Partner: 5XX / Timeout
    Note over Partner: Retry with identical values<br/>(idempotent by transactionId + tenantReferenceId)
    Partner->>PayPorter: POST /wallet/*/confirm (retry)
    PayPorter-->>Partner: 200 OK
```
