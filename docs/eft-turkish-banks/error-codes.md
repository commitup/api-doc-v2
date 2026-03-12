---
sidebar_position: 11
---

# EFT Error Codes

This page lists the specific error codes that can occur during EFT transfers to Turkish banks. Each error includes the `messageCode` returned by the API and a description or recommended action.

import ErrorCodesTable from '@site/src/components/ErrorCodesTable';

export const codes = [
  { isCritical: true, code: "COMMAND_EXCEPTION", description: "System Command Exception", action: "Check the order status. If already received by PayPorter, do not resend. If not found, you can resend with the same reference." },
  { isCritical: true, code: "UNEXPECTED_SYSTEM_ERROR", description: "Unexpected System Error", action: "Check the order status by querying. If received by PayPorter, do not resend. If missing, resend with the same reference." },
  { isCritical: true, code: "EFT_DEMAND_FROM_EXT_REF_CODE_PREVIOUS_DEMANDS_SENDEND", description: "Duplicate Transaction Reference", action: "The order has already been received. Query the latest status and ensure your demand reference number is unique." },
  { code: "OPERATION_DONE_SUCCESSFUL", description: "Successful", action: "The operation was completed successfully." },
  { code: "CONCURRENCY_LOGOUT", description: "Session Conflict", action: "Another login has been activated, closing the previous session. Try logging in again." },
  { code: "DATE_RANGE_EXCEEDED", description: "Date Range Overflow", action: "The requested date range is too large for the query." },
  { code: "INVALID_IP_LOGOUT", description: "IP Security Violation", action: "Login from multiple IPs is not allowed by current configuration." },
  { code: "LOGOUT", description: "Session Inactive", action: "The session has expired or is not active. Obtain a fresh token via login." },
  { code: "EFT_EXCHANGE_ID_NOT_ALLOWED", description: "TRY Transfer Restriction", action: "ExchangeId is not allowed for TRY (Turkish Lira) transfers." },
  { code: "EFT_EXCHANGE_ID_REQUIRED", description: "ExchangeId Missing", action: "ExchangeId is required for foreign currency transfers." },
  { code: "EFT_EXCHANGE_NOT_FOUND", description: "Invalid ExchangeId", action: "The provided ExchangeId is either incorrect or has expired." },
  { code: "EFT_EXCHANGE_TYPE_NOT_MATCH", description: "Value Mismatch", action: "ExchangeId and transfer commercial value must be the same." },
  { code: "EFT_EXCHANGE_AMOUNT_NOT_MATCH", description: "Amount Mismatch", action: "Exchange amount and transfer amount must be identical." },
  { code: "EFT_EXCHANGE_FEC_CODE_NOT_MATCH", description: "Currency Mismatch", action: "Exchange currency and transfer currency must be the same." },
  { code: "QUERY_DATE_RANGE_EXCEEDED", description: "Query Range Error", action: "The date range is too large for this specific query." },
  { code: "RECEIVER_OR_SENDER_BIRTH_PLACE_TOO_LONG", description: "Field Length Error", action: "The Birth Place string exceeds the allowed length." },
  { code: "RECEIVER_OR_SENDER_NAME_TOO_LONG", description: "Field Length Error", action: "Receiver or sender name is too long." },
  { code: "TRN_ID_NOT_FOUND", description: "Transaction Missing", action: "The queried transaction ID does not exist." },
  { code: "UNAUTHORIZED_QUERY_FOR_ACCOUNT_NUMBER", description: "Permission Denied", action: "The account cannot be queried by the current token holder." },
  { code: "EFT_API_FEC_INFO_MUST_HAVE_VALUE", description: "Currency Missing", action: "The currency code cannot be empty." },
  { code: "EFT_API_RECEIVER_FIRST_NAME_MUST_HAVE_VALUE", description: "Receiver Name Missing", action: "Receiver name cannot be empty or too short." },
  { code: "EFT_API_RECEIVER_INFO_MUST_HAVE_VALUE", description: "Receiver Info Missing", action: "Receiver name and surname must meet minimum length requirements." },
  { code: "EFT_API_RECEIVER_LASTNAME_MUST_HAVE_VALUE", description: "Receiver Surname Missing", action: "Receiver surname cannot be empty or too short." },
  { code: "EFT_API_RECEIVER_NAME_MUST_HAVE_VALUE", description: "Receiver Name Missing", action: "Receiver name cannot be empty or too short." },
  { code: "EFT_API_SENDER_BIRTH_PLACE_MUST_HAVE_VALUE", description: "Sender Birth Place Missing", action: "Sender birth place cannot be empty." },
  { code: "EFT_API_SENDER_FIRST_NAME_MUST_HAVE_VALUE", description: "Sender Name Missing", action: "Sender name cannot be empty or too short." },
  { code: "EFT_API_SENDER_LAST_NAME_MUST_HAVE_VALUE", description: "Sender Surname Missing", action: "Sender surname cannot be empty or too short." },
  { code: "EFT_API_SENDER_NAME_MUST_HAVE_VALUE", description: "Sender Info Missing", action: "Sender name and surname cannot be empty or too short." },
  { code: "EFT_API_TRANSFER_TYPE_MUST_HAVE_VALUE", description: "Transfer Type Missing", action: "Transfer Type cannot be empty." },
  { code: "IBAN_BANK_EFT_AMOUNT_EXCEEDED", description: "Limit Exceeded", action: "The transfer amount limit has been exceeded." },
  { code: "IBAN_BANK_IS_NOT_SUPPORTED", description: "Unsupported Bank", action: "The receiver bank is not supported in the EFT System." },
  { code: "EFT_SEND_BASE_CREDIT_CARD_NO_NOT_VALID", description: "Invalid Card Number", action: "The receiver credit card number is invalid." },
  { code: "EFT_DEMAND_NOT_FOUND_WITH_FROM_EXT_FIRM_REFERANCE", description: "Reference Not Found", action: "The transaction with the provided external firm reference does not exist." },
  { code: "EFT_SEND_BASE_SOURCE_OF_FUND_NULL", description: "Funds Source Missing", action: "Source of funds field cannot be empty." },
  { code: "EFT_SEND_BASE_EFT_EFT_AMOUNT_EMPTY_OR_ZERO", description: "Invalid Amount", action: "Transfer amount must be greater than zero." },
  { code: "EFT_SEND_BASE_EFT_REASON_NULL", description: "Reason Missing", action: "The Reason of Transfer field cannot be empty." },
  { code: "EFT_SEND_BASE_RECEIVER_ACCOUNT_INFO_NULL", description: "Receiver Missing", action: "Receiver account number or credit card info cannot be empty." },
  { code: "EFT_SEND_BASE_RECEIVER_ACCOUNT_NO_NULL", description: "Account Number Missing", action: "Receiver account number cannot be empty." },
  { code: "EFT_SEND_BASE_SENDER_PERSON_NULL", description: "Invalid Sender", action: "Sender information is not valid." },
  { code: "EFT_SEND_BASE_SENDER_PERSON_BIRTH_DAY_NULL", description: "Birthday Missing", action: "Sender date of birth cannot be empty." },
  { code: "EFT_EXTERNAL_FIRM_REASON_NOT_FOUND", description: "Invalid Reason", action: "The provided transfer reason is not valid." },
  { code: "EFT_NOT_FOUND_CREDIT_CARD_BANK_INFO", description: "Invalid Card Bank", action: "The credit card's issuing bank is not valid or recognized." },
  { code: "EFT_SEND_WRONG_FEE_FEC_CODE", description: "Currency/Account Error", action: "The currency code is not suitable for this beneficiary account." },
  { code: "EFT_SEND_FEE_DEBT_AMOUNT_NOT_ENOUGH", description: "Insufficient Balance", action: "The balance is insufficient to cover the transfer and commission." },
  { code: "EFT_WRONG_IBAN_FORMAT", description: "IBAN Error", action: "IBAN format is incorrect." },
  { code: "EFT_TRANSACTION_DATE_CANNOT_BE_PAST", description: "Date Error", action: "The transaction date cannot be in the past." },
  { code: "EFT_WRONG_FEC_FOR_ACCOUNT", description: "Currency Error", action: "Currency is not suitable for the receiver account." },
  { code: "EFT_NOT_FIND_BANK_CODE_FROM_IBAN", description: "Unknown Bank", action: "The bank associated with the IBAN is not defined." },
  { code: "EFT_IBAN_CHECK_IBAN_LENGHT", description: "IBAN Length Error", action: "The IBAN must be 26 characters (for TR)." },
  { code: "EFT_IBAN_CHECK_IBAN_NOT_VALID", description: "IBAN Digit Error", action: "IBAN Format Error (Checksum/Check Digit failed)." },
  { code: "EFT_RECEIVER_FULL_NAME_MUST_HAVE_VALUE", description: "Name Missing", action: "Receiver name and surname cannot be empty." },
  { code: "EFT_SENDER_BIRTH_DATE_MUST_HAVE_VALUE", description: "Birthday Missing", action: "Sender birth date cannot be empty." },
  { code: "EFT_SENDER_BIRTH_PALACE_MUST_HAVE_VALUE", description: "Birth Place Missing", action: "Sender birth place cannot be empty." },
  { code: "EFT_SENDER_FULL_NAME_MUST_HAVE_VALUE", description: "Name Missing", action: "Sender name and surname cannot be empty." },
  { code: "EFT_SENDER_IDENTY_NO_MUST_HAVE_VALUE", description: "ID Missing", action: "Sender identity number cannot be empty." },
  { code: "EFT_SENDER_PHONE_NO_MUST_HAVE_VALUE", description: "Phone Missing", action: "Sender phone number cannot be empty." },
];

export const labels = {
  searchPlaceholder: "Search by code, description, or action...",
  code: "Code",
  description: "Description",
  action: "Action / Note",
  noResults: "No matching error code found."
};


<ErrorCodesTable codes={codes} labels={labels} />
