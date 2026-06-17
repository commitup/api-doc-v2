---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Create Collection Order

Creates a new collection order. The system generates a receiver IBAN (returned in the response) to which the customer should send a bank transfer. The `matchingKey` must be communicated to the customer — they must include it in their transfer description so the system can match the incoming transfer to this order.

<ApiEndpoint method="POST" url="/external/whitelabel/wallet/collection-order" />

**Request**

<Tabs>
  <TabItem value="table" label="Request Body" default>

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `orderId` | String | Yes | Partner's unique order ID. Must be unique across all orders. |
| `matchingKey` | String | Yes | Key to match the incoming bank transfer to this order. Must be communicated to the customer to include in their transfer description. |
| `tckn` | String | Yes | Turkish national ID number (T.C. Kimlik No) of the payer. Used for KKB identity verification. |
| `name` | String | Yes | Full name of the payer. Used for KKB identity verification. |
| `birthDate` | String | Yes | Date of birth in `dd.MM.yyyy` format. Must be a past date. Used for KKB identity verification. |
| `amount` | Number | Yes | Collection amount in TRY. Must be positive. |
| `currency` | String | Yes | Must be `"TRY"`. |
| `reason` | String | Yes | Description or reason for the collection (e.g., invoice reference). |

  </TabItem>
  <TabItem value="request_example" label="Example Request">

```json
{
  "orderId": "ORD-2026-001234",
  "matchingKey": "INV-2026-0042",
  "tckn": "12345678901",
  "name": "Ahmet Yılmaz",
  "birthDate": "15.03.1985",
  "amount": 250.00,
  "currency": "TRY",
  "reason": "Invoice INV-2026-0042"
}
```

  </TabItem>
</Tabs>

## Create Collection Order Error Codes

See [Error Response Format](./intro#error-response-format).

| HTTP Status | Code | Field | Description |
|-------------|------|-------|-------------|
| `406` | `WL_EMPTY_ORDER_ID` | `orderId` | The `orderId` field is missing or blank. |
| `406` | `WL_EMPTY_TCKN` | `tckn` | The `tckn` field is missing or blank. |
| `406` | `WL_EMPTY_NAME` | `name` | The `name` field is missing or blank. |
| `406` | `WL_EMPTY_BIRTH_DATE` | `birthDate` | The `birthDate` field is missing. |
| `406` | `WL_INVALID_BIRTH_DATE` | `birthDate` | The `birthDate` is not a past date. |
| `406` | `WL_EMPTY_AMOUNT` | `amount` | The `amount` field is missing. |
| `406` | `WL_EMPTY_CURRENCY` | `currency` | The `currency` field is missing or blank. |
| `406` | `WL_INVALID_CURRENCY` | `currency` | The `currency` value is not `"TRY"`. |
| `406` | `WL_EMPTY_REASON` | `reason` | The `reason` field is missing or blank. |

## Create Collection Order Response

Returns the created [CollectionOrder](./order-object#collectionorder-object). The `receiverIban` field contains the IBAN the customer must use for their bank transfer.

<ApiResponseSelector>

```json status="200" title="Order Created — PENDING"
{
  "id": "7f3a9c12-4d2e-4b1a-9e8f-1a2b3c4d5e6f",
  "orderId": "ORD-2026-001234",
  "matchingKey": "INV-2026-0042",
  "tckn": "12345678901",
  "name": "Ahmet Yılmaz",
  "birthDate": "15.03.1985",
  "amount": 250.00,
  "currency": "TRY",
  "reason": "Invoice INV-2026-0042",
  "receiverIban": "TR330006100519786457841326",
  "status": "PENDING",
  "orderType": "COLLECTION",
  "insertDate": "2026-06-17T10:00:00.000Z"
}
```

```json status="406" title="Missing orderId"
{
  "status": "error",
  "code": "WL_EMPTY_ORDER_ID",
  "message": "Order ID is required."
}
```

```json status="406" title="Invalid birthDate"
{
  "status": "error",
  "code": "WL_INVALID_BIRTH_DATE",
  "message": "Birth date must be a past date."
}
```

</ApiResponseSelector>
