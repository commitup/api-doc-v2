---
sidebar_position: 6
---

# Transfer Errors

Common errors that can occur during the transfer process are listed below. Each error includes the HTTP return code, a descriptive message code, and recommended actions to resolve the issue on your integration's side.

| Http Return Code | MessageCode | Your Action |
| :--- | :--- | :--- |
| **200 - OK** | | Successful, order is accepted. |
| **406 – BUSINESS ERROR** | `ORDER_NUMBER_HAS_ALREADY_BEEN_PROCESSED` | This order has already been executed by PayPorter. You can query the order to get the latest status. Be sure your `apiAgentTxnRefNo` is unique. |
| **406 – BUSINESS ERROR** | `OPERATION_INFO_ID_ALREADY_EXUCUTE` | This order has already been executed by PayPorter. You can query the order to get the latest status. |
| **406 – BUSINESS ERROR** | `OPERATION_INFO_ID_ALREADY_EXECUTING` | This order has been already executing at PayPorter. You can query the order to get the latest status. |
| **401 - UNAUTHORIZED** | | Unauthorized, call login and get a valid token. The order has not been accepted. Try again after login. |
| **429 - TOO MANY REQUESTS** | | Maximum call count in a minute has exceeded. There may be a system error on the caller side. The order has not been accepted. Try again a bit later. |
| **406** | `LOGOUT` | Call login and get a valid token. The order has not been accepted. Try again after login. |
| **406** | `CONCURRENCY_LOGOUT` | While there is one active session, one other login has been activated. The previous login is closed with this error. The order has not been accepted. Try again. |
| **406** | `INVALID_IP_LOGOUT` | Your IP is not accepted. The order has not been accepted. Configuration by PayPorter is needed. Contact us. |
| **406** | `UNEXPECTED_SYSTEM_ERROR` | Unhandled exception, send the order again. |
| **500** | | Unexpected exception, send the order again. |
| **406** | `MT_SEND_TRANSFER_NOT_FOUND` | The transaction queried is not on PayPorter system. Check date time filters you send. You can omit date filter if you send reference number. |
| **406** | `AML_STATUS_BLOCKED` | The transaction is blocked by internal Anti-Money Laundering (AML) rules. |
| **406** | `OPERATION_INFO_ID_NOT_FOUND` | Fill or correct the operation info id in the header. |
| **406** | `MONEY_TRANSFER_SEND_EXTERNAL_FIRM_SERVICE_ERROR` | The beneficiary partner encountered a general system error. |
| **406** | `NO_ROUTE_FOUND` | No route found for the transfer. Contact PayPorter support. |
|
