---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Refund Order

Initiates a refund for a `COMPLETED` collection or sell order. The collected funds are returned to the sender via EFT.

<ApiEndpoint method="POST" url="/external/whitelabel/wallet/collection-order/refund" />

:::important
Only `COMPLETED` orders can be refunded. For orders that have not yet been matched to a bank transfer, use [Cancel Order](./cancel-order) instead.
:::

**Request**

<Tabs>
  <TabItem value="table" label="Request Body" default>

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `orderId` | String | Yes | The partner's unique order reference ID. |
| `reason` | String | Yes | Reason for the refund. |

  </TabItem>
  <TabItem value="request_example" label="Example Request">

```json
{
  "orderId": "ORD-2026-001234",
  "reason": "Duplicate payment by customer"
}
```

  </TabItem>
</Tabs>

## Refund Order Error Codes

See [Error Response Format](./intro#error-response-format).

| HTTP Status | Code | Description |
|-------------|------|-------------|
| `406` | `WL_EMPTY_ORDER_ID` | The `orderId` field is missing or blank. |

## Refund Order Response

Returns the [CollectionOrder](./order-object#collectionorder-object) with `status: REFUNDED` and the `refundProcessRefNo` populated.

<ApiResponseSelector>

```json status="200" title="Order Refunded"
{
  "orderId": "ORD-2026-001234",
  "matchingKey": "INV-2026-0042",
  "tckn": "12345678901",
  "name": "Ahmet Yılmaz",
  "amount": 250.00,
  "receivedAmount": 250.00,
  "currency": "TRY",
  "reason": "Invoice INV-2026-0042",
  "refundProcessRefNo": "REF-2026-000456",
  "senderIban": "TR640006200112345678901234",
  "status": "REFUNDED",
  "orderType": "COLLECTION",
  "insertDate": "2026-06-17T10:00:00.000Z",
  "matchDate": "2026-06-17T10:12:00.000Z",
  "updateDate": "2026-06-17T11:00:00.000Z"
}
```

```json status="406" title="Missing orderId"
{
  "status": "error",
  "code": "WL_EMPTY_ORDER_ID",
  "message": "Order ID is required."
}
```

</ApiResponseSelector>
