---
sidebar_position: 5
---

# Transaction Object

The **Transaction Object** is the common response model returned by the validate, confirm, and query endpoints of **all four transfer types** (`to-name`, `to-account`, `to-card`, `to-wallet`).

:::note Null fields are omitted
Fields with no value are left out of the JSON entirely rather than serialised as `null`. Do not rely on a key being present — a missing key and a null value mean the same thing.
:::

## Amount Model & FX Flow

The wallet is always debited in **TRY**. What varies is which side of the transfer you pin down, and whether the fee comes out of that amount or is added on top.

```mermaid
flowchart TD
    A(["Which amount model?"]) --> B["<b>amount</b> + currency<br/>pin the amount the receiver gets"]
    A --> C["<b>sendingAmount</b> + sendingCurrency<br/>pin the amount you spend"]

    B --> D["Wallet debit = amount + fee<br/>Receiver gets the full amount"]

    C --> E{"feeIncluded"}
    E -->|"false or omitted"| F["Wallet debit = sendingAmount + fee<br/>The whole sendingAmount is converted"]
    E -->|"true"| G["Wallet debit = sendingAmount<br/>Fee is taken out first, the rest is converted"]
```

:::important `feeIncluded` requires `sendingAmount`
Sending `feeIncluded: true` together with `amount` is rejected with `WL_P2P_FEE_INCLUDED_ONLY_FOR_SENDING_AMOUNT`. With the `amount` model the fee is always charged on top — that is what pinning the receiver's amount means.
:::

### Worked examples

| Input | Fee | Wallet debit (TRY equivalent) | Receiver gets |
| :--- | :--- | :--- | :--- |
| `amount: 100 USD` | 5 USD | 105 USD | **100 USD** — exactly what you asked for |
| `sendingAmount: 1000 TRY`<br/>`feeIncluded: false` | 25 TRY | 1025 TRY | **40 EUR** — all 1000 TRY converted |
| `sendingAmount: 1000 TRY`<br/>`feeIncluded: true` | 25 TRY | 1000 TRY | **48 USD** — 975 TRY converted after the fee |

Read the exact figures for your transaction off the validate response: `sourceAmount` is what leaves the wallet, `payoutAmount` is what arrives.

## Response Fields

| Field                   | Type          | Presence        | Description                                                                   |
|:------------------------|:--------------|:----------------|:------------------------------------------------------------------------------|
| `transactionId`         | String        | Always          | Unique transaction ID assigned by PayPorter. Used for confirm and query.      |
| `status`                | String        | Always          | Current transaction status. See [Status Values](#status-values) below.        |
| `tenantReferenceId`     | String        | Always          | Tenant's unique reference ID, echoed from the validate request.               |
| `amount`                | String        | Always          | Sending amount (echoed from input).                                           |
| `currency`              | String        | Always          | Sending currency (ISO 4217).                                                  |
| `fee`                   | String        | Always          | Fee charged for this transaction.                                             |
| `feeCurrency`           | String        | Always          | Currency of the fee (e.g. `TRY`).                                             |
| `total`                 | String        | Always          | Total debited: `amount + fee`.                                                |
| `sourceAmount`          | String        | Always          | TRY equivalent debited from the wallet.                                       |
| `sourceCurrency`        | String        | Always          | Wallet debit currency. Currently always `TRY`.                                |
| `sendingExchangeRate`   | String        | When applicable | Exchange rate applied (sending currency → TRY).                               |
| `payoutAmount`          | String        | After validate  | Final payout amount in the destination currency. Determined by the 3rd party. |
| `payoutCurrency`        | String        | After validate  | Payout currency code (ISO 4217).                                              |
| `payoutExchangeRate`    | String        | When applicable | Exchange rate applied for payout currency conversion.                         |
| `processRefNo`          | String        | After confirm   | Internal process reference number.                                            |
| `externalTransactionId` | String        | After confirm   | Reference number assigned by the external remittance firm.                    |
| `destinationCountry`    | String        | Always          | Destination country code (ISO 3166-1 alpha-3).                                |
| `sendingAmount`         | String        | When applicable | Echoed when the `sendingAmount` model was used on validate.                    |
| `sendingCurrency`       | String        | When applicable | Currency of `sendingAmount`.                                                  |
| `receiver`              | Object        | Always          | Receiver identity and contact info. See [ReceiverInfo](#receiverinfo-object). |
| `comment`               | String        | Optional        | Free-text comment.                                                            |
| `purpose`               | Enum          | When provided   | Transfer purpose. Valid values: `SAVING_INVESTMENT`, `DEPT_LOAN`, `SALE_BUY`, `COMMERCE_PAYMENTS`, `RENTALS`, `OTHER`, `FAMILY`, `EDUCATION`. |
| `sourceOfIncome`        | Enum          | When provided   | Source of income. Valid values: `SALARY`, `BUSINESS_INCOME`, `SAVINGS`, `GIFT`, `BANK_LOAN`, `OTHER`, `SALE_OF_PROPERTY`. |
| `relationshipWithSender`| Enum          | When provided   | Relationship with receiver. Valid values: `CHILD`, `SPOUSE`, `PARENT`, `FRIEND`, `WORK_FRIEND`, `BROTHER`. |

---

## Destination Fields by Transfer Type

Which destination fields appear depends on the transfer type. Only the fields for the type used are returned.

| Transfer type | Fields returned |
| :--- | :--- |
| `to-name` | `provider`, `city`, `office` |
| `to-account` | `provider`, `accountNumber`, `accountIndicator` |
| `to-card` | `cardNumber` |
| `to-wallet` | `provider` |

| Field | Type | Description |
| :--- | :--- | :--- |
| `provider` | String | The provider code used for the transfer, echoed back from the request. The external firm for `to-name`, the bank for `to-account`, the digital wallet for `to-wallet`. Not returned for `to-card`, which has no provider. |
| `city` | String | Destination city code. |
| `office` | String | Destination office code. |
| `accountNumber` | String | Destination account number or IBAN. |
| `accountIndicator` | String | Account type indicator, when the destination bank requires one. |
| `cardNumber` | String | Destination card number. |

---

## Status Values

| Status | Description | Terminal? |
|---|---|---|
| `READY` | Transaction validated and ready for confirm. No funds have moved. | No |
| `SENT` | Transaction confirmed and submitted to the card network. Funds debited from wallet. | No |
| `COMPLETED` | Transaction successfully settled at the destination. | Yes |
| `CANCELLED` | Transaction failed or was reversed before completion. Funds returned to wallet. | Yes |
| `REFUNDED` | A completed transaction was refunded. Funds returned to wallet. | Yes |

### State Machine

```mermaid
stateDiagram-v2
    [*] --> READY : Validate accepted
    READY --> SENT : Confirm processed
    SENT --> COMPLETED : Transfer settled
    SENT --> CANCELLED : Transfer failed / reversed
    COMPLETED --> REFUNDED : Refund processed
    COMPLETED --> [*]
    CANCELLED --> [*]
    REFUNDED --> [*]
```

:::note
The transition from `READY` to `SENT` happens asynchronously after confirm. The confirm response may still show `status: READY` — use the Query endpoint to poll for the `SENT` or terminal status.
:::

---

## ReceiverInfo Object

:::note Allowed Characters
Text fields in `ReceiverInfo` (such as `firstName`, `lastName`, `fatherName`, `address`, `province`, `district`) must contain only Latin characters, numbers, and common punctuation.
:::

| Field                  | Type   | Constraints             | Description                          |
|:-----------------------|:-------|:------------------------|:-------------------------------------|
| `firstName`            | String | Max: 50                 | Receiver's first name.               |
| `lastName`             | String | Max: 50                 | Receiver's last name.                |
| `receiverType`         | Enum   | `CUSTOMER`, `BUSINESS`  | Receiver type.                       |
| `nationality`          | String | ISO 3166-1 alpha-3      | Nationality code (e.g., `TUR`).      |
| `phoneCountryCode`     | String | ISO 3166-1 alpha-3      | Phone country code (e.g., `TUR`).    |
| `phoneNumber`          | String | Max: 20                 | Phone number without country prefix. |
| `fatherName`           | String | Max: 50                 | Father's name.                       |
| `birthDate`            | String | Format: YYYY-MM-DD      | ISO 8601 date (e.g., `1990-01-15`).  |
| `birthPlace`           | String | Max: 100                | Place of birth.                      |
| `birthCountry`         | String | ISO 3166-1 alpha-3      | Country of birth.                    |
| `identityNo`           | String | Max: 25                 | Identity document number.            |
| `identityIssueCountry` | String | ISO 3166-1 alpha-3      | Identity document issue country.     |
| `identityValidThru`    | String | Format: YYYY-MM-DD      | Identity document expiry date.       |
| `identityIssueDate`    | String | Format: YYYY-MM-DD      | Identity document issue date.        |
| `addressCountry`       | String | ISO 3166-1 alpha-3      | Address country code.                |
| `address`              | String | Max: 250                | Street address.                      |
| `province`             | String | Max: 50                 | Province / state.                    |
| `district`             | String | Max: 50                 | District.                            |
| `zipCode`              | String | Max: 20                 | Postal code.                         |
| `job`                  | String | Max: 100                | Occupation.                          |
| `email`                | String | Max: 100, Format: Email | Email address.                       |
| `identityType`         | Enum   | -                       | Identity document type. Valid values: `PASSPORT`, `DRIVING_LICENCE`, `IDENTITY`, `FOREIGN_IDENTITY_CARD`, `NEW_IDENTITY_CARD`, `TEMPORARY_PROTECTION_DOCUMENT`, `TRNC_IDENTITY_CARD`, `BLUE_IDENTITY_CARD`, `SEAMAN_CERTIFICATE`. See [Identity Types](#identity-types). |

:::note Dynamic Required Fields
The required status of `ReceiverInfo` fields is evaluated dynamically based on the destination country, transfer type, and partner routing rules. If a required field is missing, the validate endpoint will return a field-specific error (e.g., `WL_P2P_RECEIVER_FIRST_NAME_MISSING`). You can also retrieve the mandatory fields dynamically via the [Mandatory Fields](./mandatory-fields) endpoint.
:::

---

## Identity Types

| Enum Value | ID | Description |
| :--- | :--- | :--- |
| `PASSPORT` | 1 | Passport |
| `DRIVING_LICENCE` | 2 | Driving Licence |
| `IDENTITY` | 3 | Identity |
| `FOREIGN_IDENTITY_CARD` | 4 | Foreign Identity Card |
| `NEW_IDENTITY_CARD` | 5 | New Identity Card |
| `TEMPORARY_PROTECTION_DOCUMENT` | 62 | Temporary Protection Document (Geçici Koruma Belgesi) |
| `TRNC_IDENTITY_CARD` | 61 | TRNC Identity Card (KKTC Kimlik Kartı) |
| `BLUE_IDENTITY_CARD` | 33 | Blue Identity Card (Mavi Kimlik Kartı) |
| `SEAMAN_CERTIFICATE` | 63 | Seaman Certificate (Gemi Adamı Belgesi) |

---

## Example Response

```json
{
  "transactionId": "d8c8ba37-c434-4f5a-bda6-9129d6294f8b",
  "status": "SENT",
  "tenantReferenceId": "test-happy-path-001",
  "amount": 150.00,
  "fee": 4.00,
  "total": 154.00,
  "sourceAmount": 8215.53,
  "sourceCurrency": "TRY",
  "sendingExchangeRate": 1.0000,
  "payoutAmount": 2851428.57,
  "currency": "EUR",
  "payoutCurrency": "IDR",
  "processRefNo": "47005005788",
  "externalTransactionId": "47005005788"
}
```
