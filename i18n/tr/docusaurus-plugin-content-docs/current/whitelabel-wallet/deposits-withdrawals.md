---
sidebar_position: 8
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Deposits & Withdrawals

Manage funds entering and leaving the wallet via cash or master account operations.

## Cash Drop (Deposit)
For depositing cash into the wallet using a PIN from a supported remittance firm.

### 1. Validate Payment
<ApiEndpoint method="POST" url="/wallet/payment/validate" />

**Request Example:**
```json
{
  "externalFirmCode": 47,
  "referenceNo": 47004897230
}
```

### 2. Confirm Payment
<ApiEndpoint method="POST" url="/wallet/payment/confirm" />

---

## Debit (From Wallet to Master Account)
Withdraw funds from the wallet to your master account.

### 1. Validate Debit
<ApiEndpoint method="POST" url="/wallet/debit/validate" />

**Request Example:**
```json
{
  "amount": 170.50,
  "currency": "TRY",
  "reason": "CUSTOM_DEBIT_REASON"
}
```

### 2. Confirm Debit
<ApiEndpoint method="POST" url="/wallet/debit/confirm" />

---

## Credit (From Master Account to Wallet)
Deposit funds from your master account into a specific wallet.

### 1. Validate Credit
<ApiEndpoint method="POST" url="/wallet/credit/validate" />

### 2. Confirm Credit
<ApiEndpoint method="POST" url="/wallet/credit/confirm" />