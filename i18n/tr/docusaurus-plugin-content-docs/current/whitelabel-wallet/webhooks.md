---
sidebar_position: 13
---

import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Webhooks

Real-time notifications for transaction events, KYC status changes, and card authorizations.

## Transaction Notification
PayPorter sends a `POST` request to your configured webhook URL for every financial event.

**Payload Example:**
```json
{
  "walletId": 13920918,
  "transactionType": "CARD_SALE",
  "amount": 100.1,
  "currency": "TRY",
  "debtCredit": "D",
  "merchantName": "eBay S* San Jose USA"
}
```

---

## Card Authorization
Real-time authorization request for card transactions.

:::important
Respond within **300ms** with `200 OK`. If no response is received, the transaction is **approved by default**.
:::

**Payload Example:**
```json
{
  "ref_number": "47004583620",
  "amount": 100.10,
  "currency_code": "TRY"
}
```

---

## KYC Status Change
Notification when a wallet's KYC status is updated.

**Approved Example:**
<ApiResponseSelector>

```json title="KYC Approved"
{
  "walletLevel": "CONFIRMED",
  "kycStatus": "APPROVED"
}
```

</ApiResponseSelector>

**Rejected Example:**
<ApiResponseSelector>

```json title="KYC Rejected"
{
  "walletLevel": "UN_CONFIRMED",
  "kycStatus": "REJECTED",
  "kycFailureCode": "AML_REJECTED"
}
```

</ApiResponseSelector>