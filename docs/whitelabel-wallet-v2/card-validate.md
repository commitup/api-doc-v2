---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Card Transfer — Validate

Submit a P2P card transfer request for validation. If accepted, the response contains a `transactionId` with `status: READY`, along with calculated fees and exchange rates. No funds are moved at this stage.

<ApiEndpoint method="POST" url="/wallet/p2p/card/validate" />

:::important Idempotency
The `tenantReferenceId` must be unique across all transactions. Reusing a previously consumed `tenantReferenceId` returns a `WL_P2P_TRANSACTION_ALREADY_EXISTS` error.
:::

## Request

<Tabs>
  <TabItem value="fields" label="Request Fields" default>

| Field | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `tenantReferenceId` | String | Max: 100<br/>Alphanumeric | Unique reference ID assigned by the tenant. Used for idempotency. |
| `amount` | Decimal | 18,2 | Sending amount. Mutually exclusive with `sendingAmount`. |
| `currency` | String | ISO 4217 | Currency of the sending amount. Example: `EUR`. |
| `sendingAmount` | Decimal | 18,2 | Alternative sending amount. Mutually exclusive with `amount`. |
| `sendingCurrency` | String | ISO 4217 | Currency for `sendingAmount`. Required when `sendingAmount` is provided. |
| `payoutCurrency` | String | ISO 4217 | Payout currency when different from sending currency. |
| `destinationCountry` | String | ISO 3166-1 alpha-3 | Destination country code. Example: `IDN`. |
| `cardNumber` | String | Max: 19 | Destination card number. |
| `receiver` | Object | - | Receiver information. See [ReceiverInfo](./transaction-object#receiverinfo-object). |
| `comment` | String | Max: 255 | Free-text comment. |
| `purpose` | Enum | - | Transfer purpose. Valid values: `SAVING_INVESTMENT`, `DEPT_LOAN`, `SALE_BUY`, `COMMERCE_PAYMENTS`, `RENTALS`, `OTHER`, `FAMILY`, `EDUCATION`. |
| `sourceOfIncome` | Enum | - | Source of income. Valid values: `SALARY`, `BUSINESS_INCOME`, `SAVINGS`, `GIFT`, `BANK_LOAN`, `OTHER`, `SALE_OF_PROPERTY`. |
| `relationshipWithSender` | Enum | - | Relationship with receiver. Valid values: `CHILD`, `SPOUSE`, `PARENT`, `FRIEND`, `WORK_FRIEND`, `BROTHER`. |
| `feeIncluded` | Boolean | `true` or `false` | Indicates if fee is included in `sendingAmount`. Only valid when `sendingAmount` is provided. |

> **Amount Model Validation:** Exactly one amount model must be provided: either (`amount` + `currency`) OR (`sendingAmount` + `sendingCurrency`). Providing both or neither will result in a `WL_P2P_INVALID_AMOUNT_MODEL` error.

  </TabItem>
  <TabItem value="headers" label="Headers">

```http
POST /wallet/p2p/card/validate HTTP/1.1
Content-Type: application/json
Accept: application/json
X-Api-Key: your_api_key
X-Api-Secret: your_api_secret
X-Wallet-Id: your_wallet_id
```

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "tenantReferenceId": "test-happy-path-001",
  "amount": 150.00,
  "currency": "EUR",
  "payoutCurrency": "IDR",
  "destinationCountry": "IDN",
  "cardNumber": "5473323225888232",
  "receiver": {
    "firstName": "Osman",
    "lastName": "SAVCI",
    "receiverType": "CUSTOMER",
    "nationality": "TUR",
    "phoneCountryCode": "TUR",
    "phoneNumber": "5551234567",
    "fatherName": "Mehmet",
    "birthDate": "1990-01-15",
    "birthPlace": "Istanbul",
    "birthCountry": "TUR",
    "identityNo": "12345678901",
    "identityType": "IDENTITY",
    "identityIssueCountry": "TUR",
    "identityValidThru": "2030-01-01",
    "identityIssueDate": "2020-01-01",
    "addressCountry": "TUR",
    "address": "Ataturk Caddesi No: 1",
    "province": "Istanbul",
    "district": "Kadikoy",
    "zipCode": "34000",
    "job": "Software Engineer",
    "email": "osman.savci@example.com"
  },
  "comment": "Money transfer for family support",
  "purpose": "FAMILY",
  "sourceOfIncome": "SALARY",
  "relationshipWithSender": "CHILD"
}
```

  </TabItem>
  <TabItem value="example-sendingAmount" label="Example with sendingAmount">

```json
{
  "tenantReferenceId": "test-happy-path-002",
  "sendingAmount": 1000.00,
  "sendingCurrency": "TRY",
  "currency": "EUR",
  "destinationCountry": "IDN",
  "cardNumber": "5473323225888232",
  "feeIncluded": true,
  "receiver": {
    "firstName": "Osman",
    "lastName": "SAVCI",
    "receiverType": "CUSTOMER",
    "nationality": "TUR",
    "phoneCountryCode": "TUR",
    "phoneNumber": "5551234567"
  },
  "comment": "Money transfer",
  "purpose": "FAMILY",
  "sourceOfIncome": "SALARY",
  "relationshipWithSender": "CHILD"
}
```

  </TabItem>
  <TabItem value="curl" label="cURL">

```bash
curl -X POST "https://whitelabelwallet-mig.payporter.com.tr:8590/wallet/p2p/card/validate" \
     -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     -H "X-Api-Key: your_api_key" \
     -H "X-Api-Secret: your_api_secret" \
     -H "X-Wallet-Id: your_wallet_id" \
     -d '{
           "tenantReferenceId": "test-happy-path-001",
           "amount": 150.00,
           "currency": "EUR",
           "payoutCurrency": "IDR",
           "destinationCountry": "IDN",
           "cardNumber": "5473323225888232",
           "receiver": {
             "firstName": "Osman",
             "lastName": "SAVCI",
             "receiverType": "CUSTOMER",
             "nationality": "TUR",
             "phoneCountryCode": "TUR",
             "phoneNumber": "5551234567"
           },
           "purpose": "FAMILY",
           "sourceOfIncome": "SALARY",
           "relationshipWithSender": "CHILD"
         }'
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
  "status": "error",
  "code": "WL_P2P_RECEIVER_FIRST_NAME_MISSING",
  "message": "Receiver's first name is missing."
}
```

```json status="406" title="Invalid Amount Model"
{
  "status": "error",
  "code": "WL_P2P_INVALID_AMOUNT_MODEL",
  "message": "Exactly one amount model must be provided: (amount + currency) or (sendingAmount + sendingCurrency)."
}
```

```json status="406" title="Already Exists"
{
  "status": "error",
  "code": "WL_P2P_TRANSACTION_ALREADY_EXISTS",
  "message": "A transaction with this tenantReferenceId already exists."
}
```

</ApiResponseSelector>
  </TabItem>
</Tabs>
