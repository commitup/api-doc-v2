---
sidebar_position: 0
---

# Transfer to Account Overview

The "To Account" money transfer flow allows you to send funds directly to a recipient's bank account, IBAN.

This integration requires checking the available banks in the destination country prior to validating the transfer.

## Flow Diagram

<div style={{transform: 'scale(1)', transformOrigin: 'top left', marginBottom: '30px'}}>

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '16px', 'fontFamily': 'arial'}}}%%
flowchart LR
    A["Find Bank"] --> G["Validate"]
    G -->|operation-id| H["Confirm"]
    H --> I["Check Status"]

    style A fill:#4a9eff,stroke:#2171cc,color:#fff
    style G fill:#7b68ee,stroke:#5a4bc7,color:#fff
    style H fill:#50c878,stroke:#3da35d,color:#fff
    style I fill:#f5a623,stroke:#d4891a,color:#fff
```

</div>

> The main flow goes **Find Bank → Validate → Confirm → Check Status**. The `operation-id` is returned in the validate response header and must be passed to confirm.

### Core Steps

1. **[Find Bank](./find-bank)**
   Call the `/mt-api/V2/moneytransfercommon/bank-info/{countryIsoCode}` endpoint to retrieve the list of available banks for the destination country. You will need the receiving bank's `id`.

2. **[Validate Request](./validate)**
   Use the `toBankId` and the `toAccountNumber` (IBAN) to validate the transfer data. The API will respond with an `operation-id` in the header if successful.

3. **[Confirm Transfer](./confirm)**
   Pass the `operation-id` to the confirmation endpoint to finalize the transaction. The transfer status moves to **NEW**. Store the `processReferenceNo` to track the status.

4. **[Check Status](../transfer-details)**
   Query the **Transfer Details** endpoint using the `processReferenceNo` to track the state through its lifecycle (NEW → SENT → PAID).
