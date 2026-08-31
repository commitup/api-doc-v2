---
sidebar_position: 6
---

# Transfer Errors

Common errors that can occur during the transfer process are listed below. Each error includes the HTTP return code, a descriptive message code, and recommended actions to resolve the issue on your integration's side.

import ErrorCodesTable from '@site/src/components/ErrorCodesTable';

export const codes = [
  { code: "OPERATION_DONE_SUCCESSFUL", description: "200 - OK", action: "Successful, order is accepted." },
  { isCritical: true, code: "ORDER_NUMBER_HAS_ALREADY_BEEN_PROCESSED", description: "406 - BUSINESS ERROR", action: "This order has already been executed by PayPorter. You can query the order to get the latest status. Be sure your apiAgentTxnRefNo is unique." },
  { isCritical: true, code: "OPERATION_INFO_ID_ALREADY_EXUCUTE", description: "406 - BUSINESS ERROR", action: "This order has already been executed by PayPorter. You can query the order to get the latest status." },
  { isCritical: true, code: "OPERATION_INFO_ID_ALREADY_EXECUTING", description: "406 - BUSINESS ERROR", action: "This order has been already executing at PayPorter. You can query the order to get the latest status." },
  { code: "UNAUTHORIZED", description: "401 - UNAUTHORIZED", action: "Unauthorized, call login and get a valid token. The order has not been accepted. Try again after login." },
  { code: "TOO_MANY_REQUESTS", description: "429 - TOO MANY REQUESTS", action: "Maximum call count in a minute has exceeded. There may be a system error on the caller side. The order has not been accepted. Try again a bit later." },
  { code: "LOGOUT", description: "406 - BUSINESS ERROR", action: "Call login and get a valid token. The order has not been accepted. Try again after login." },
  { code: "CONCURRENCY_LOGOUT", description: "406 - BUSINESS ERROR", action: "While there is one active session, one other login has been activated. The previous login is closed with this error. The order has not been accepted. Try again." },
  { code: "INVALID_IP_LOGOUT", description: "406 - BUSINESS ERROR", action: "Your IP is not accepted. The order has not been accepted. Configuration by PayPorter is needed. Contact us." },
  { code: "UNEXPECTED_SYSTEM_ERROR", description: "406 - BUSINESS ERROR", action: "Unhandled exception. Be sure your apiAgentTxnRefNo is same, send the very same order again without changing apiAgentTxnRefNo and any params." },
  { code: "INTERNAL_SERVER_ERROR", description: "500 - SERVER ERROR", action: "Unexpected exception. Be sure your apiAgentTxnRefNo is same, send the very same order again without changing apiAgentTxnRefNo and any params." },
  { code: "MT_SEND_TRANSFER_NOT_FOUND", description: "406 - BUSINESS ERROR", action: "The transaction queried is not on PayPorter system. Check date time filters you send. You can omit date filter if you send reference number." },
  { code: "AML_STATUS_BLOCKED", description: "406 - BUSINESS ERROR", action: "The transaction is blocked by internal Anti-Money Laundering (AML) rules." },
  { code: "OPERATION_INFO_ID_NOT_FOUND", description: "406 - BUSINESS ERROR", action: "Fill or correct the operation info id in the header." },
  { code: "MONEY_TRANSFER_SEND_EXTERNAL_FIRM_SERVICE_ERROR", description: "406 - BUSINESS ERROR", action: "The beneficiary partner encountered a general system error." },
  { code: "NO_ROUTE_FOUND", description: "406 - BUSINESS ERROR", action: "No route found for the transfer. Contact PayPorter support." },
  { code: "SENDER/RECEIVER_FIRST_NAME_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The first name is too long. Max length is 50." },
  { code: "SENDER/RECEIVER_FIRST_NAME_INVALID_CHARACTER_ERROR", description: "406 - VALIDATION ERROR", action: "First name contains invalid characters. Only latin/alphanumeric characters allowed." },
  { code: "SENDER/RECEIVER_MIDDLE_NAME_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The middle name is too long. Max length is 50." },
  { code: "SENDER/RECEIVER_MIDDLE_NAME_INVALID_CHARACTER_ERROR", description: "406 - VALIDATION ERROR", action: "Middle name contains invalid characters. Only latin/alphanumeric characters allowed." },
  { code: "SENDER/RECEIVER_LAST_NAME_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The last name is too long. Max length is 50." },
  { code: "SENDER/RECEIVER_LAST_NAME_INVALID_CHARACTER_ERROR", description: "406 - VALIDATION ERROR", action: "Last name contains invalid characters. Only latin/alphanumeric characters allowed." },
  { code: "SENDER/RECEIVER_FATHER_NAME_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The father name is too long. Max length is 50." },
  { code: "SENDER/RECEIVER_FATHER_NAME_INVALID_CHARACTER_ERROR", description: "406 - VALIDATION ERROR", action: "Father name contains invalid characters. Only latin/alphanumeric characters allowed." },
  { code: "SENDER/RECEIVER_INVALID_BIRTH_DATE", description: "406 - VALIDATION ERROR", action: "Birth date must be exactly 10 characters (dd.MM.yyyy)." },
  { code: "SENDER/RECEIVER_INVALID_NATIONAL_COUNTRY_CODE", description: "406 - VALIDATION ERROR", action: "National country code must be exactly 3 characters." },
  { code: "SENDER/RECEIVER_INVALID_BIRTH_COUNTRY_CODE", description: "406 - VALIDATION ERROR", action: "Birth country code must be exactly 3 characters." },
  { code: "SENDER/RECEIVER_INVALID_IDENTITY_ISSUE_COUNTRY_CODE", description: "406 - VALIDATION ERROR", action: "Identity issue country code must be exactly 3 characters." },
  { code: "SENDER/RECEIVER_INVALID_ADDRESS_COUNTRY_CODE", description: "406 - VALIDATION ERROR", action: "Address country code must be exactly 3 characters." },
  { code: "SENDER/RECEIVER_ADDRESS_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The address is too long. Max length is 250." },
  { code: "SENDER/RECEIVER_ADDRESS_INVALID_CHARACTER_ERROR", description: "406 - VALIDATION ERROR", action: "The address contains invalid characters." },
  { code: "SENDER/RECEIVER_PROVINCE_NAME_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The province name is too long. Max length is 50." },
  { code: "SENDER/RECEIVER_PROVINCE_NAME_INVALID_CHARACTER_ERROR", description: "406 - VALIDATION ERROR", action: "The province name contains invalid characters." },
  { code: "SENDER/RECEIVER_DISTRICT_NAME_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The district name is too long. Max length is 50." },
  { code: "SENDER/RECEIVER_DISTRICT_NAME_INVALID_CHARACTER_ERROR", description: "406 - VALIDATION ERROR", action: "The district name contains invalid characters." },
  { code: "SENDER/RECEIVER_MOBILE_NO_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The mobile number is too long. Max length is 20." },
  { code: "SENDER/RECEIVER_MOBILE_COUNTRY_CODE_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The mobile country code is too long. Max length is 5." },
  { code: "SENDER/RECEIVER_MOBILE_OPERATOR_NO_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The mobile operator number is too long. Max length is 5." },
  { code: "INVALID_TO_COUNTRY_CODE", description: "406 - VALIDATION ERROR", action: "Destination country code must be exactly 3 characters." },
  { code: "INVALID_CURRENCY", description: "406 - VALIDATION ERROR", action: "Currency code must be exactly 3 characters." },
  { code: "COMMENT_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The comment field exceeds 250 characters." },
  { code: "TO_ACCOUNT_NUMBER_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The account number exceeds 34 characters." },
  { code: "CARD_NUMBER_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The card number exceeds 34 characters." },
  { code: "TO_WALLET_ID_TOO_LONG", description: "406 - VALIDATION ERROR", action: "The wallet ID exceeds 50 characters." },
];

export const labels = {
  searchPlaceholder: "Search by code, description, or action...",
  code: "Message Code",
  description: "Description",
  action: "Your Action",
  noResults: "No matching error code found."
};

<ErrorCodesTable codes={codes} labels={labels} />
