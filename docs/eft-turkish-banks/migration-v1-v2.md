---
sidebar_position: 1.5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# EFT API Migration Guide: V1 to V2

This document provides a comprehensive guide for migrating from **EFT API Version 1** to **EFT API Version 2**. 

## 1. Base URL Changes

The base URL prefix has been updated to include versioning.

| Version | Base URL Path |
| :--- | :--- |
| **V1** | `eft-api/` |
| **V2** | `eft-api/V2/` |

---

## 2. Endpoint Mapping & Renames

Several endpoints have been renamed or simplified in V2.

| Method | V1 Endpoint | V2 Endpoint | Status |
| :--- | :--- | :--- | :--- |
| **Create Transfer** | `/transfer/create-money-transfer` | `/transfer/create` | **Renamed** |
| **Check Status (Ext Ref)** | `/transfer/check-transfer-status-by-ext-firm-id/{id}` | `/transfer/check-status-by-ext-firm-id/{id}` | **Simplified** |
| **Check Status (Order Ref)** | `/transfer/check-transfer-status-by-transfer-order-ref/{id}` | `/transfer/check-status-by-transfer-order-ref/{id}` | **Simplified** |
| **Cancel Transfer** | `/transfer/cancel-transfer` | `/transfer/cancel` | **Renamed** |
| **Get Transfer List** | `/transfer/get-transfer-list` | `/transfer/get-transfer-list` | Path same (Base changed) |
| **Get Refund List** | `/transfer/get-refund-transfer-list` | `/transfer/get-refund-transfer-list` | Path same (Base changed) |
| **Exchange Rate** | N/A | `/exchange` | **NEW** |

---

## 3. Request Body Changes

:::info
The **EFT V2 API** primarily introduces changes to the **request** structure (specifically in the `create` method). The **response** structures for all endpoints remain consistent with Version 1 to ensure a smooth transition for your existing parsing logic.
:::

The request structure has been updated to be more concise and standardized.

### Top-Level Field Changes

| V1 Field | V2 Field | Category | Note |
| :--- | :--- | :--- | :--- |
| `transferDate` | **Removed** | Removal | Handled internally in V2. |
| `fec` | **`currency`** | **Object -> String** | V1 used `{"fecId": 1}`; V2 uses `"TRY"`. |
| `receiverAccount` | `receiverAccount` | **Object -> String** | V1 used `{"accountNo": "..."}`; V2 uses either `receiverAccount` (for IBAN) or `receiverCardNumber` (for Credit Card) depending on the `transferType`. |
| `transferType` | `transferType` | **Object -> Enum** | V1 used `{"transferTypeId": 4}`; V2 uses `TO_IBAN` or `TO_CREDIT_CARD` (Transfer method). |
| `transferReason` | `transferReason` | **Object -> Enum** | V1 used `{"reasonTypeId": 99}`; V2 uses enums like `OTHER_PAYMENTS`. See **[EftTransferReason](./create-eft#efttransferreason)** |
| N/A | `fromCountry` | **New Field** | ISO alpha-3 code (e.g., "TUR"). |


### Person Info Changes (`senderInfo`, `receiverInfo`)

| V1 Field | V2 Field | Detail |
| :--- | :--- | :--- |
| `name` | **`firstName`** | Renamed |
| `midName` | **`middleName`** | Renamed |
| `surName` | **`lastName`** | Renamed |
| `nationalCountryCode`| `nationalCountryCode`| **Integer -> String** (e.g., `152` -> `"TUR"`) |

### Example JSON Comparison

<div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
  <div style={{ flex: '1 1 400px', minWidth: '400px' }}>
    <h4>VERSION 1 (Old)</h4>

```json
{
  "amount": 1000.0,
  "comment": "Support for family, AHMET CAN YILMAZ",
  "fec": {
    "fecId": 1
  },
  "receiverAccount": {
    "accountNo": "TR840013400002108617000001"
  },
  "receiverInfo": {
    "countryPhoneCode": 90,
    "fullName": "AYŞE DEMİR",
    "name": "AYŞE",
    "phoneNumber": "5551234567",
    "surName": "DEMİR"
  },
  "senderExtFirmRefId": "EX-REF-123456",
  "senderInfo": {
    "address": "TURKEY, ISTANBUL, SISLI, MERKEZ MAH. 123 SK. NO:1",
    "birthDay": "1985-05-15T00:00:00Z",
    "birthPlace": "ISTANBUL",
    "countryPhoneCode": 90,
    "fullName": "AHMET CAN YILMAZ",
    "identityNumber": "12345678901",
    "midName": "CAN",
    "name": "AHMET",
    "nationalCountryCode": "TUR",
    "phoneNumber": "5557654321",
    "surName": "YILMAZ"
  },
  "transferDate": "2026-04-07T07:55:47.912639Z",
  "transferReason": {
    "reasonTypeId": 99
  },
  "transferType": {
    "transferTypeId": 4
  }
}
```

  </div>
  <div style={{ flex: '1 1 400px', minWidth: '400px' }}>
    <h4>VERSION 2 (New)</h4>

```json
{
  "amount": 1000.00,
  "comment": "Support for family, AHMET YILMAZ",
  "currency": "TRY",
  "receiverAccount": "TR840013400002108617000001",
  "senderExtFirmRefId": "NEW-REF-7890",
  "transferReason": "FAMILY_SUPPORT",
  "transferType": "TO_IBAN",
  "fromCountry": "TUR",
  "receiverInfo": {
    "firstName": "AYŞE",
    "lastName": "DEMİR",
    "nationalCountryCode": "TUR",
    "countryPhoneCode": 90,
    "phoneNumber": "5551234567"
  },
  "senderInfo": {
    "firstName": "AHMET",
    "middleName": "CAN",
    "lastName": "YILMAZ",
    "nationalCountryCode": "TUR",
    "countryPhoneCode": 90,
    "phoneNumber": "5557654321",
    "address": "TURKEY, ISTANBUL, SISLI, MERKEZ MAH. 123 SK. NO:1",
    "birthDay": "1985-05-15",
    "birthPlace": "ISTANBUL",
    "company": false,
    "email": "ahmet.yilmaz@email.com",
    "identityNumber": "12345678901"
  }
}
```

  </div>
</div>

### Example Response

Response is same as V1. No changes.

```json
{
    "responseObject": {
        "transferOrderRefId": 47004813026,
        "status": {
            "statusCode": 10,
            "statusName": "New",
            "statusDescription": "New",
            "statusReasonMessageCode": null,
            "statusReasonMessageDetail": null
        },
        "senderExtFirmRefId": "TEST-135542"
    }
}
```

---

## 4. New Features in V2

### Webhooks
**Purpose:** Receive real-time push notifications when a transfer status changes, eliminating the need for polling the `check-status` endpoint.
**Details:** See **[Webhooks Documentation](./webhooks)**.

### IBAN Validation
**Endpoint:** `POST /validate-iban`
**Purpose:** Validate IBAN format and account existence before attempting a transfer to prevent errors. See **[IBAN Validation Documentation](./validate-iban)**.
