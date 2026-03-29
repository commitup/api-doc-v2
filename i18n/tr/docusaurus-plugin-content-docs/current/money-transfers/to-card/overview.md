---
sidebar_position: 0
---

# Transfer to Card Overview

The "To Card" money transfer flow empowers integrations to securely send funds directly to a recipient's debit or credit card.

Unlike other transfers, sending money to a card does not require fetching dynamic lookup data (such as querying lists of banks, branches, or locations). You simply need the receiver's raw card credentials.

## Integration Flow

```mermaid
graph LR
    Start((Initiate Transfer)) --> Validate[1. Validate]
    Validate --> Confirm[2. Confirm]
    Confirm --> CheckStatus[3. Check Status]
    
    %% Colors
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px
    classDef highlight fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    
    %% Styling
    style Validate fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style Confirm fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style CheckStatus fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style Start fill:#f9f9f9,stroke:#333,stroke-width:1px
```

### Core Steps

1. **[Validate Request](./validate)**
   Provide the 16-digit `cardNumber` alongside the standard transfer payload (amount, sender, receiver) to securely validate the transfer data. The API evaluates the card routing and responds with an `operation-id`.

2. **[Confirm Transfer](./confirm)**
   Pass the `operation-id` generated from validation to finalize the transaction. Store the returned `processReferenceNo`.

3. **[Check Status](../transfer-details)**
   Query the **Transfer Details** API by using the `processReferenceNo` to continuously monitor the state of the transaction.
