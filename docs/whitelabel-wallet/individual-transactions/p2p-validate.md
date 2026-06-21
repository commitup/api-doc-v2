---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# P2P Validate

Submit a P2P transfer request for validation. If accepted, the response contains a `transactionId` with `status: READY`, along with calculated fees and exchange rates. No funds are moved at this stage.

<ApiEndpoint method="POST" url="/external/whitelabel/wallet/p2p/{type}/validate" />

Where `{type}` is one of: `name`, `account`, `card`, `wallet`.

:::important Idempotency
The `tenantReferenceId` must be unique across all transactions. Reusing a previously consumed `tenantReferenceId` returns an error.
:::

## Request

<Tabs>
  <TabItem value="fields" label="Request Body" default>

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `tenantReferenceId` | String | **Yes** | Unique reference ID assigned by the tenant. Used for idempotency. |
| `amount` | Number | **Conditional** | Exact payout or fixed foreign exchange amount. **Mutually exclusive** with `sendingAmount`. You must provide exactly one of these. |
| `currency` | String | **Yes** | Currency of the sending amount (ISO 4217). Example: `EUR`. |
| `sendingAmount` | Number | **Conditional** | Exact local currency collection amount. **Mutually exclusive** with `amount`. You must provide exactly one of these. |
| `sendingCurrency` | String | **Conditional** | Currency for `sendingAmount`. Required when `sendingAmount` is provided. |
| `feeIncluded` | Boolean | No | Indicates if the fee should be deducted from the `sendingAmount`. Valid only when `sendingAmount` is provided. Default is `false`. |
| `payoutCurrency` | String | No | Payout currency when different from sending currency. |
| `destinationCountry` | String | **Yes** | Destination country code (ISO 3166-1). |
| `externalFirm` | String | TO_NAME | External remittance firm code. |
| `city` | String | TO_NAME | Cash pickup city. |
| `office` | String | TO_NAME | Cash pickup office/branch. |
| `bankId` | String | TO_ACCOUNT | Destination bank code. |
| `accountNumber` | String | TO_ACCOUNT | Destination IBAN or account number. |
| `accountIndicator` | String | TO_ACCOUNT | Account type indicator. |
| `cardNumber` | String | TO_CARD | Destination card number. |
| `walletType` | String | TO_WALLET | Destination wallet type. |
| `receiver` | Object | **Yes** | Receiver information. See [ReceiverInfo](./transaction-object#receiverinfo-object). |
| `comment` | String | No | Free-text comment. |
| `purpose` | Enum | **Yes** | Transfer purpose. Valid values: `SAVING_INVESTMENT`, `DEPT_LOAN`, `SALE_BUY`, `COMMERCE_PAYMENTS`, `RENTALS`, `OTHER`, `FAMILY`, `EDUCATION`. |
| `sourceOfIncome` | Enum | **Yes** | Source of income. Valid values: `SALARY`, `BUSINESS_INCOME`, `SAVINGS`, `GIFT`, `BANK_LOAN`, `OTHER`, `SALE_OF_PROPERTY`. |
| `relationshipWithSender` | Enum | **Yes** | Relationship with receiver. Valid values: `CHILD`, `SPOUSE`, `PARENT`, `FRIEND`, `WORK_FRIEND`, `BROTHER`. |

  </TabItem>
  <TabItem value="example1" label="Example: amount (FX)">

```json title="Standard FX Transfer"
{
  "tenantReferenceId": "test-happy-path-001",
  "amount": 150,
  "currency": "EUR",
  "destinationCountry": "IDN",
  "cardNumber": "5473323225888232",
  "receiver": {
    "firstName": "Osman",
    "lastName": "SAVCI",
    "nationality": "TUR",
    "phoneCountryCode": "TUR",
    "phoneNumber": "5551234567",
    "receiverType": "CUSTOMER"
  },
  "comment": "Money transfer",
  "purpose": "FAMILY",
  "sourceOfIncome": "SALARY",
  "relationshipWithSender": "CHILD"
}
```

  </TabItem>
  <TabItem value="example2" label="Example: sendingAmount (Exact Collection)">

```json title="Exact Collection Transfer"
{
  "tenantReferenceId": "test-happy-path-002",
  "sendingAmount": 8500,
  "sendingCurrency": "TRY",
  "feeIncluded": true,
  "currency": "EUR",
  "destinationCountry": "IDN",
  "cardNumber": "5473323225888232",
  "receiver": {
    "firstName": "Osman",
    "lastName": "SAVCI",
    "nationality": "TUR",
    "phoneCountryCode": "TUR",
    "phoneNumber": "5551234567",
    "receiverType": "CUSTOMER"
  },
  "comment": "Money transfer",
  "purpose": "FAMILY",
  "sourceOfIncome": "SALARY",
  "relationshipWithSender": "CHILD"
}
```

  </TabItem>
</Tabs>

## Response

The response is a [Transaction Object](./transaction-object) with the following validate-specific behaviour:

- **`status`** is always `READY` on success.
- **`fee`**, **`total`**, **`sourceAmount`** (TRY wallet debit), and **`payoutAmount`** are calculated.
- **`processRefNo`** and **`externalTransactionId`** are `null` (populated after confirm).

<Tabs>
  <TabItem value="success" label="Success" default>
<ApiResponseSelector>

```json status="200" title="Validate — READY"
{
  "transactionId": "d8c8ba37-c434-4f5a-bda6-9129d6294f8b",
  "status": "READY",
  "amount": 150.00,
  "fee": 4.00,
  "total": 154.00,
  "sourceAmount": 8215.53,
  "sourceCurrency": "TRY",
  "sendingExchangeRate": 1.0000,
  "payoutAmount": 2851428.57,
  "currency": "EUR",
  "payoutCurrency": "IDR",
  "tenantReferenceId": "test-happy-path-001"
}
```

```json status="406" title="Missing Required Field"
{
  "restHeader": {
    "success": false,
    "code": "WL_P2P_RECEIVER_FIRST_NAME_MISSING",
    "message": "walletP2PRequest receiver.firstName must not be null"
  }
}
```

```json status="406" title="Invalid Amount Model"
{
  "restHeader": {
    "success": false,
    "code": "WL_P2P_INVALID_AMOUNT_MODEL",
    "message": "Only one of 'amount' or 'sendingAmount' must be provided."
  }
}
```

```json status="406" title="Idempotency Conflict"
{
  "restHeader": {
    "success": false,
    "code": "WL_P2P_TRANSACTION_ALREADY_EXISTS",
    "message": "A transaction with this tenantReferenceId already exists."
  }
}
```

</ApiResponseSelector>
  </TabItem>
</Tabs>
