---
sidebar_position: 3
---

# Order Object & Domain Models

## CollectionOrder Object

The `CollectionOrder` object is both the request body for creating an order and the response model returned by all endpoints.

Fields marked **Required** must be provided when creating an order. Fields marked **Response only** are populated by the system and should not be sent in requests.

| Field | Type | Presence | Format / Constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | Response only | — | Internal system identifier. |
| `orderId` | String | **Required** | Not blank | Partner's unique order reference ID. Must be unique per order. |
| `matchingKey` | String | **Required** | Not blank | Key used to match the incoming bank transfer to this order. Must be unique and communicated to the customer — the customer must include this value in their transfer description. |
| `tckn` | String | **Required** | Not blank | Turkish national ID number (T.C. Kimlik No) of the payer. Used for KKB identity verification. |
| `name` | String | **Required** | Not blank | Full name of the payer. Used for KKB identity verification. |
| `birthDate` | String | **Required** | `dd.MM.yyyy`, must be in the past | Date of birth of the payer. Used for KKB identity verification. |
| `amount` | Number | **Required** | Positive decimal | Expected collection amount in TRY. |
| `currency` | String | **Required** | Must be `"TRY"` | Currency code. Only TRY is supported. |
| `reason` | String | **Required** | Not blank | Description or reason for the collection (e.g., invoice reference). |
| `processRefNo` | String | Response only | — | System process reference number. |
| `refundProcessRefNo` | String | Response only | — | Process reference number for the associated refund, if any. |
| `receivedAmount` | Number | Response only | — | Actual amount received from the bank transfer. |
| `receiverIban` | String | Response only | — | IBAN to which the customer should send the transfer. Returned on order creation. |
| `senderIban` | String | Response only | — | IBAN from which the transfer was received. Populated after matching. |
| `status` | String | Response only | See [Order Statuses](./intro#order-status-state-machine) | Current order status. |
| `statusDetail` | String | Response only | See [Status Detail Codes](#order-status-detail-codes) | Detail code explaining the current status, when applicable. |
| `statusDetailMessage` | String | Response only | — | Human-readable message accompanying `statusDetail`. |
| `orderType` | String | Response only | See [Order Types](#order-types) | Type of order (`COLLECTION` or `SELL`). |
| `walletId` | Integer | Response only | — | Wallet identifier associated with this order. |
| `bankTransactionId` | Long | Response only | — | Internal ID of the matched bank transaction. |
| `insertDate` | String | Response only | ISO 8601 | Timestamp when the order was created. |
| `matchDate` | String | Response only | ISO 8601 | Timestamp when the order was matched to a bank transfer. |
| `notificationDate` | String | Response only | ISO 8601 | Timestamp when the partner webhook notification was sent. |
| `updateDate` | String | Response only | ISO 8601 | Timestamp of the last status update. |

---

## CollectionOrderId Object

Used as the request body for the Query, Cancel, and Refund endpoints.

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `orderId` | String | Yes | The partner's unique order reference ID. |
| `reason` | String | Conditional | Required for Cancel and Refund. Free-text reason for the action. |

---

## Order Status Detail Codes

The `statusDetail` field provides additional context when an order is `REJECTED` or `CANCELLED`.

| Code | Description |
|------|-------------|
| `CANCELLED_BY_CLIENT` | The order was explicitly cancelled by the partner (via the Cancel endpoint, or via a non-`COMPLETED` webhook response). |
| `AMOUNT_MISMATCH` | The received bank transfer amount did not match the order amount. |
| `SENDER_MISMATCH` | The sender's IBAN was verified via KKB (Turkish Credit Bureau) and the identity does not match the `tckn`, `name`, or `birthDate` provided in the order. The bank transfer is automatically refunded to the sender. |
| `EXPIRED` | The order expired before a matching bank transfer was received. |
| `INVALID_REFERENCE` | The bank transfer description did not contain a `matchingKey` that matches any active order. |

---

## Order Types

| Code | Description |
|------|-------------|
| `COLLECTION` | Standard collection order. The customer sends a bank transfer to the provided receiver IBAN. Created via [Create Collection Order](./create-collection-order). |
| `SELL` | Sell order. Used for sell/disbursement flows. Created via [Create Sell Order](./create-sell-order). |
