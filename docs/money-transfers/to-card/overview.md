---
sidebar_position: 0
---

# Transfer to Card Overview

The "To Card" money transfer flow empowers integrations to securely send funds directly to a recipient's debit or credit card.

Unlike other transfers, sending money to a card does not require fetching dynamic lookup data (such as querying lists of banks, branches, or locations). You simply need the receiver's raw card credentials.

## Integration Flow Diagram

<div style={{transform: 'scale(1)', transformOrigin: 'top left', marginBottom: '30px'}}>

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '16px', 'fontFamily': 'arial'}}}%%
flowchart LR
    G["Validate"] -->|operation-id| H["Confirm"]
    H --> I["Check Status"]

    style G fill:#7b68ee,stroke:#5a4bc7,color:#fff
    style H fill:#50c878,stroke:#3da35d,color:#fff
    style I fill:#f5a623,stroke:#d4891a,color:#fff
```

</div>

> The main flow is **Validate → Confirm → Check Status**. Simply supply the 16-digit `cardNumber` in validate — no dynamic card type lookup is needed. The `operation-id` is returned in the validate response header.

### Core Steps

1. **[Validate Request](./validate)**
   Provide the 16-digit `cardNumber` alongside the standard transfer payload (amount, sender, receiver) to securely validate the transfer data. The API evaluates the card routing and responds with an `operation-id`.

2. **[Confirm Transfer](./confirm)**
   Pass the `operation-id` generated from validation to finalize the transaction. Store the returned `processReferenceNo`.

3. **[Check Status](../transfer-details)**
   Query the **Transfer Details** API by using the `processReferenceNo` to continuously monitor the state of the transaction.
