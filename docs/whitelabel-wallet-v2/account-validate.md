---
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Account Transfer — Validate

Validate a money transfer to a bank account. This endpoint checks if the transaction is possible, validates the bank ID and account number, calculates exchange rates and fees, and prepares the transaction for confirmation. No funds are moved at this stage.

<ApiEndpoint method="POST" url="/wallet/p2p/to-account/validate" />

## Request

<Tabs>
  <TabItem value="fields" label="Request Fields" default>

| Field                    | Type    | Constraints               | Description                                                                                                                                   |
| :----------------------- | :------ | :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `tenantReferenceId`      | String  | Max: 50<br/>Alphanumeric  | Unique reference ID assigned by the tenant to prevent duplicates.                                                                             |
| `amount`                 | String  | 18,2                      | Exact payout amount requested. Mutually exclusive with `sendingAmount`.                                                                       |
| `currency`               | String  | ISO 4217                  | Currency of the sending amount.                                                                                                               |
| `sendingAmount`          | String  | 18,2                      | Alternative sending amount. Mutually exclusive with `amount`.                                                                                 |
| `sendingCurrency`        | String  | ISO 4217                  | Currency for `sendingAmount`. Required when `sendingAmount` is provided.                                                                      |
| `payoutCurrency`         | String  | ISO 4217                  | Payout currency when different from sending currency.                                                                                         |
| `destinationCountry`     | String  | ISO 3166-1 alpha-3        | Destination country code.                                                                                                                     |
| `provider`               | String  | -                         | Provider ID from the [providers endpoint](./parameter-collection#2-get-providers). Applies to all transfer types and takes precedence over the legacy type-specific field. |
| `bankId`                 | String  | -                         | **Legacy.** Bank ID from the providers list. Use `provider` instead; ignored when `provider` is sent.                                          |
| `accountNumber`          | String  | -                         | The recipient's bank account number or IBAN. Required for account transfers.                                                                  |
| `receiver`               | Object  | -                         | Receiver information. See [ReceiverInfo](./transaction-object#receiverinfo-object).                                                           |
| `comment`                | String  | Max: 255                  | Free-text comment.                                                                                                                            |
| `purpose`                | Enum    | -                         | Transfer purpose. Valid values: `SAVING_INVESTMENT`, `DEPT_LOAN`, `SALE_BUY`, `COMMERCE_PAYMENTS`, `RENTALS`, `OTHER`, `FAMILY`, `EDUCATION`. |
| `sourceOfIncome`         | Enum    | -                         | Source of income. Valid values: `SALARY`, `BUSINESS_INCOME`, `SAVINGS`, `GIFT`, `BANK_LOAN`, `OTHER`, `SALE_OF_PROPERTY`.                     |
| `relationshipWithSender` | Enum    | -                         | Relationship with receiver. Valid values: `CHILD`, `SPOUSE`, `PARENT`, `FRIEND`, `WORK_FRIEND`, `BROTHER`.                                    |
| `feeIncluded`            | Boolean | `true` or `false`         | Indicates if fee is included in `sendingAmount`. Only valid when `sendingAmount` is provided.                                                 |

> **Amount Model Validation:** Exactly one amount model must be provided: either (`amount` + `currency`) OR (`sendingAmount` + `sendingCurrency`).

  </TabItem>
  <TabItem value="headers" label="Headers">

```http
POST /wallet/p2p/to-account/validate HTTP/1.1
Content-Type: application/json
Accept: application/json
X-Api-Key: your_api_key
X-Api-Secret: your_api_secret
X-Wallet-Id: your_wallet_id
```

  </TabItem>
</Tabs>

## Response

The response is a [Transaction Object](./transaction-object) with the status `READY`.
