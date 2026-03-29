---
sidebar_position: 0
---

# Transfer to Wallet Overview

The "To Wallet" money transfer flow allows you to seamlessly send funds to a recipient's electronic wallet.

Wallets are uniquely identified by a `walletId`. Different wallets belong to specific countries, which is important when directing payments.

### Prerequisites: Wallet List

Before initiating any "To Wallet" transfer, you **must** fetch the comprehensive list of wallets using the **[Wallet List](./wallet-list)** endpoint and store them locally on your own platform. You will supply the static `walletId` from your local database during validation.

---

## Integration Flow

```mermaid
graph LR
    Start((Initiate Transfer)) --> GetHolder["1. Get Wallet Holder<br/><i>(Optional)</i>"]
    GetHolder --> Validate[2. Validate]
    Start --> Validate
    Validate --> Confirm[3. Confirm]
    Confirm --> CheckStatus[4. Check Status]
    
    %% Colors
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px
    classDef optional fill:#f0f4c3,stroke:#827717,stroke-width:2px,stroke-dasharray: 5 5
    classDef highlight fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    
    %% Styling
    style GetHolder fill:#f0f4c3,stroke:#827717,stroke-width:2px,stroke-dasharray: 5 5
    style Validate fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style Confirm fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style CheckStatus fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style Start fill:#f9f9f9,stroke:#333,stroke-width:1px
```

### Core Steps

1. **[Get Wallet Holder Name](./get-holder)** *(Optional)*
   For some integrations (mostly Turkish wallets), you can call the `/holder-name` endpoint passing the recipient's phone number to retrieve a masked version of their name before sending the money.

2. **[Validate Request](./validate)**
   Provide the static `toWalletId` alongside the transfer details (amount, sender, receiver, etc.) to securely validate the transfer data. The API will respond with an `operation-id`.

3. **[Confirm Transfer](./confirm)**
   Pass the `operation-id` from validation to finalize the transaction. Store the returning `processReferenceNo`.

4. **[Check Status](../transfer-details)**
   Query the **Transfer Details** API by `processReferenceNo` to monitor the transaction's lifecycle.
