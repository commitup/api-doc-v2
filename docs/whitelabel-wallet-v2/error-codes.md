---
sidebar_position: 21
---

# Error Codes

This page outlines the specific error codes that you may encounter when using the Whitelabel Wallet v2 APIs.

## HTTP Status Mapping

Every error uses the same envelope — `{ "status": "error", "code": ..., "message": ... }`. The HTTP status tells you the category, the `code` tells you what to fix.

| HTTP Status | Applies to |
| :--- | :--- |
| `406 Not Acceptable` | All validation, business logic, and transaction-state errors. This is the status for nearly every code on this page. |
| `500 Internal Server Error` | Unexpected internal failure (`WL_UNKNOWN_ERROR`). |

---

## Request Format Errors

| Error Code | Field | Description |
| :--- | :--- | :--- |
| `WL_P2P_TENANT_REF_ID_EMPTY` | `tenantReferenceId` | The tenant reference ID is missing or blank. |
| `WL_P2P_DESTINATION_COUNTRY_EMPTY` | `destinationCountry` / `countryCode` | The destination country is missing or blank. Also returned by the parameter collection endpoints when `countryCode` is missing. |
| `INVALID_COUNTRY_CODE` | `countryCode` | The country code is not a known ISO 3166-1 alpha-3 code (parameter collection endpoints). |
| `WL_P2P_TRANSACTION_ID_EMPTY` | `transactionId` | Confirm only. The transaction ID is missing or blank. |
| `WALLET_TRANSFER_AMOUNT_SCALE_ERROR` | `amount` / `sendingAmount` | The amount has more than two decimal places. |
| `WL_INVALID_ENUM_VALUE` | any enum field | An enum field carries a value outside its allowed set — in the request body, or the `receiverType` query parameter of the providers endpoint. For request bodies the message names the rejected value. |

## Validation Errors

When submitting a P2P transfer, validation is performed on the request payload to ensure that all mandatory fields have been provided correctly.

### Mandatory Field Errors

If a mandatory field is missing, you will receive a specific error indicating exactly which parameter was omitted.

| Error Code | Missing Field | Description |
| :--- | :--- | :--- |
| `WL_P2P_RECEIVER_FIRST_NAME_MISSING` | `receiver.firstName` | Receiver's first name is missing. |
| `WL_P2P_RECEIVER_LAST_NAME_MISSING` | `receiver.lastName` | Receiver's last name is missing. |
| `WL_P2P_RECEIVER_TYPE_MISSING` | `receiver.receiverType` | Receiver type is missing, or the `receiver` object is missing entirely. |
| `WL_P2P_RECEIVER_FATHER_NAME_MISSING` | `receiver.fatherName` | Receiver's father's name is missing. |
| `WL_P2P_RECEIVER_BIRTH_DATE_MISSING` | `receiver.birthDate` | Receiver's date of birth is missing. |
| `WL_P2P_RECEIVER_NATIONALITY_MISSING` | `receiver.nationality` | Receiver's nationality is missing. |
| `WL_P2P_RECEIVER_BIRTH_COUNTRY_MISSING` | `receiver.birthCountry` | Receiver's country of birth is missing. |
| `WL_P2P_RECEIVER_IDENTITY_TYPE_MISSING` | `receiver.identityType` | Receiver's identity document type is missing. |
| `WL_P2P_RECEIVER_IDENTITY_ISSUE_DATE_MISSING` | `receiver.identityIssueDate` | Receiver's identity issue date is missing. |
| `WL_P2P_RECEIVER_IDENTITY_VALID_THRU_MISSING` | `receiver.identityValidThru` | Receiver's identity expiration date is missing. |
| `WL_P2P_RECEIVER_IDENTITY_NO_MISSING` | `receiver.identityNo` | Receiver's identity document number is missing. |
| `WL_P2P_RECEIVER_IDENTITY_ISSUE_COUNTRY_MISSING` | `receiver.identityIssueCountry`| Receiver's identity issue country is missing. |
| `WL_P2P_RECEIVER_ADDRESS_COUNTRY_MISSING` | `receiver.addressCountry` | Receiver's address country is missing. |
| `WL_P2P_RECEIVER_PROVINCE_MISSING` | `receiver.province` | Receiver's province/state is missing. |
| `WL_P2P_RECEIVER_DISTRICT_MISSING` | `receiver.district` | Receiver's district/city is missing. |
| `WL_P2P_RECEIVER_ADDRESS_MISSING` | `receiver.address` | Receiver's full address is missing. |
| `WL_P2P_RECEIVER_PHONE_NUMBER_MISSING` | `receiver.phoneNumber` | Receiver's phone number or country code is missing. |
| `WL_P2P_RECEIVER_JOB_MISSING` | `receiver.job` | Receiver's occupation/job is missing. |
| `WL_P2P_RECEIVER_ZIP_CODE_MISSING` | `receiver.zipCode` | Receiver's postal/zip code is missing. |
| `WL_P2P_RECEIVER_EMAIL_MISSING` | `receiver.email` | Receiver's email address is missing. |
| `WL_P2P_PURPOSE_MISSING` | `purpose` | Transfer purpose is missing. |
| `WL_P2P_SOURCE_OF_INCOME_MISSING` | `sourceOfIncome` | Source of income is missing. |
| `WL_P2P_RELATIONSHIP_WITH_SENDER_MISSING` | `relationshipWithSender` | Relationship with the sender is missing. |

### Business Logic Errors

| Error Code | Description |
| :--- | :--- |
| `WL_P2P_FEE_INCLUDED_ONLY_FOR_SENDING_AMOUNT` | The `feeIncluded` flag was set to `true`, but no `sendingAmount` was provided in the request payload. `feeIncluded` is only valid when supplying a source `sendingAmount`. |
| `WL_P2P_CARD_NUMBER_EMPTY` | The `cardNumber` field is missing for a transfer route that targets a card account. |
| `WL_P2P_PROVIDER_EMPTY` | The `provider` field is missing or blank for a `to-name`, `to-account`, or `to-wallet` transfer, or the `providerId` query parameter is missing on the cities / offices endpoints. |
| `WL_P2P_ACCOUNT_NUMBER_EMPTY` | The `accountNumber` field is missing or blank for a `to-account` transfer. |
| `WL_P2P_INVALID_AMOUNT_MODEL` | Exactly one of `amount` or `sendingAmount` must be provided. If both or neither are provided, this error is returned. |
| `WALLET_USER_INFO_NOT_FOUND_BY_PHONE` | `to-wallet` only. No wallet exists at the selected `provider` for `receiver.phoneCountryCode` + `receiver.phoneNumber`. |
| `MONEY_SEND_RECEIVER_NAME_VALIDATION` | `to-wallet` only. The receiver name does not match the holder of the wallet found for the receiver's phone number. |

### Routing & Pricing Errors

These errors mean the requested corridor (destination country, transfer type, `provider`, currency) is not available for your wallet. Use the [Parameter Collection](./parameter-collection) endpoints to pick a supported combination.

| Error Code | Description |
| :--- | :--- |
| `NO_ROUTE_FOUND` | No transfer route is configured for this combination — for example, the transfer type is not enabled for your wallet. |
| `FEE_NOT_FOUND` | No fee is defined for this combination — for example, the currency is not priced for the selected `provider`. |
| `WHITELABEL_FEE_MUST_BE_TRY` | The `sendingAmount` model was used on a route whose fee is not charged in TRY. Use the `amount` model instead. |

## Transaction & Idempotency Errors

These errors occur during transaction validation, confirmation, or status queries.

| Error Code | Description |
| :--- | :--- |
| `WL_P2P_TRANSACTION_ALREADY_EXISTS` | A transaction with the provided `tenantReferenceId` has already been processed. |
| `WL_TRANSACTION_IN_PROGRESS` | The transaction query cannot be fulfilled because the transaction is still processing. |
| `WL_TRANSACTION_NOT_FOUND` | The transaction could not be found or has permanently failed in the upstream ledger. |

## System Errors

| Error Code | Description |
| :--- | :--- |
| `WL_UNKNOWN_ERROR` | Unexpected internal failure. Returned with HTTP `500`. Do not retry a confirm on this response — query the transaction instead. |
