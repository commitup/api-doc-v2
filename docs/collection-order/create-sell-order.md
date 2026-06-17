---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Create Sell Order

Creates a new sell order. A sell order follows the same structure and matching flow as a [Collection Order](./create-collection-order) but uses `orderType: SELL`, indicating a sell/disbursement flow.

<ApiEndpoint method="POST" url="/external/whitelabel/wallet/sell-order" />

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
| `amount` | Number | Yes | Order amount in TRY. Must be positive. |
| `currency` | String | Yes | Must be `"TRY"`. |
| `reason` | String | Yes | Description or reason for the sell order. |

  </TabItem>
  <TabItem value="request_example" label="Example Request">

```json
{
  "orderId": "SELL-2026-000789",
  "matchingKey": "GOLD-SELL-789",
  "tckn": "12345678901",
  "name": "Ahmet Yılmaz",
  "birthDate": "15.03.1985",
  "amount": 500.00,
  "currency": "TRY",
  "reason": "Gold sell order #789"
}
```

  </TabItem>
</Tabs>

## Create Sell Order Error Codes

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

## Create Sell Order Response

Returns the created [CollectionOrder](./order-object#collectionorder-object) with `orderType: SELL`.

<ApiResponseSelector>

```json status="200" title="Sell Order Created — PENDING"
{
  "id": "8a1b2c34-5d6e-7f8a-9b0c-1d2e3f4a5b6c",
  "orderId": "SELL-2026-000789",
  "matchingKey": "GOLD-SELL-789",
  "tckn": "12345678901",
  "name": "Ahmet Yılmaz",
  "birthDate": "15.03.1985",
  "amount": 500.00,
  "currency": "TRY",
  "reason": "Gold sell order #789",
  "receiverIban": "TR330006100519786457841326",
  "status": "PENDING",
  "orderType": "SELL",
  "insertDate": "2026-06-17T10:05:00.000Z"
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
