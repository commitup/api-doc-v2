---
sidebar_position: 0
---

# Transfer to Account Overview

The "To Account" money transfer flow allows you to send funds directly to a recipient's bank account, IBAN.

This integration requires checking the available banks in the destination country prior to validating the transfer.

## Integration Flow

```mermaid
graph LR
    Start((Initiate Transfer)) --> FindBank[1. Find Bank]
    FindBank --> Validate[2. Validate]
    Validate --> Confirm[3. Confirm]
    Confirm --> CheckStatus[4. Check Status]
    
    %% Colors
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px
    classDef highlight fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    classDef terminal fill:#fff4dd,stroke:#d4a017,stroke-width:2px
    
    %% Styling
    style FindBank fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style Validate fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style Confirm fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style CheckStatus fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style Start fill:#f9f9f9,stroke:#333,stroke-width:1px
```

### Core Steps

1. **[Find Bank](./find-bank)**
   Call the `/mt-api/V2/moneytransfercommon/bank-info/{countryIsoCode}` endpoint to retrieve the list of available banks for the destination country. You will need the receiving bank's `id`.

2. **[Validate Request](./validate)**
   Use the `toBankId` and the `toAccountNumber` (IBAN) to validate the transfer data. The API will respond with an `operation-id` in the header if successful.

3. **[Confirm Transfer](./confirm)**
   Pass the `operation-id` to the confirmation endpoint to finalize the transaction. The transfer status moves to **NEW**. Store the `processReferenceNo` to track the status.

4. **[Check Status](../transfer-details)**
   Query the **Transfer Details** endpoint using the `processReferenceNo` to track the state through its lifecycle (NEW → SENT → PAID).
