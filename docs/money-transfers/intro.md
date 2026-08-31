---
sidebar_position: 1
---

# Money Transfer API

The Money Transfer service allows you to send funds to individuals worldwide through various payout methods, including cash pick-up (to name), bank accounts, electronic wallets, and cards.

## Changelog

<details className="changelog-details">
<summary>Show all entries</summary>

| Date | Changes |
| :--- | :--- |
| 2026-08-13 | **Breaking:** transfer details by agent reference is now `GET /mt-api/V2/moneysend/detail-by-api-txn?txnId=`. See [Transfer Details](./transfer-details). |
| 2026-08-12 | Validate input constraints and [error codes](./transfer-errors) expanded. |
| 2026-05-07 | [Settlement](./settlement) added. |
| 2026-04-22 | [Webhooks](./webhooks) added. |
| 2026-03-29 | Added to-name cancel/update, to-account find-bank, to-wallet list and get-holder. Overview pages and flow diagrams. |
| 2026-03-27 | Initial Money Transfer V2 documentation. |

</details>

## Transfer Process

All money transfers follow a mandatory **Two-Step Verification** process to ensure accuracy and compliance.

### 1. Validation Step
First, you must call the specific validation endpoint for your transfer type:
- `POST /mt-api/V2/moneysend/to-name/validate`
- `POST /mt-api/V2/moneysend/to-account/validate`
- `POST /mt-api/V2/moneysend/to-wallet/validate`
- `POST /mt-api/V2/moneysend/to-card/validate`

**Result**: If successful, the API returns an `operation-id` in the response header.

### 2. Confirmation Step
Use the `operation-id` from the validation step to finalize the transfer.
- `POST /mt-api/V2/moneysend/confirm` (Header: `operation-id: {id}`)

---

## Transfer Types

- **[To Name (Cash Pick Up)](./to-name/validate)**: Send money that can be collected in cash from PayPorter offices or partner locations.
- **[To Account](./to-account/validate)**: Direct transfer to an IBAN (non Turkish).
- **[To Wallet](./to-wallet/validate)**: Send funds to a recipient's electronic wallet.
- **[To Card](./to-card/validate)**: Transfer directly to a debit or credit card (non Turkish).

---

## Status Lifecycle

The following diagram illustrates the lifecycle of a money transfer:

```mermaid
graph TD
    Start((Initiate Transfer)) --> NEW[NEW]
    NEW -->|Processing| SENT[SENT]
    SENT -->|Recipient Collected| PAID[PAID]
    
    NEW -->|Cancelled by Sender| CANCELLED[CANCELLED]
    SENT -->|Refunded| REFUNDED[REFUNDED]

    style Start fill:#f9f,stroke:#333,stroke-width:2px
    style NEW fill:#fff4dd,stroke:#d4a017,stroke-width:2px
    style SENT fill:#fff4dd,stroke:#d4a017,stroke-width:2px
    style PAID fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style CANCELLED fill:#ffebee,stroke:#c62828,stroke-width:2px
    style REFUNDED fill:#ffebee,stroke:#c62828,stroke-width:2px
```

## Transfer Statuses

| ID | Status | Description |
| :--- | :--- | :--- |
| 0 | **NEW** | Transfer request successfully received and validated. |
| 1 | **SENT** | Transfer has been sent to the paying partner or system. |
| 2 | **PAID** | Funds have been successfully collected/received by the recipient. |
| 3 | **CANCELLED** | Transfer was cancelled before it was processed. |
| 4 | **REFUNDED** | Transfer was returned, and funds were credited back to the sender. |
