---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Cancel Order

Cancels a `PENDING` collection or sell order. Only orders that have not yet been matched to a bank transfer can be cancelled.

<ApiEndpoint method="POST" url="/external/whitelabel/wallet/collection-order/cancel" />

:::important
Once an order reaches `MATCHED` or `COMPLETED` status, it can no longer be cancelled. Use [Refund Order](./refund-order) to return funds for a completed order.
:::

**Request**

<Tabs>
  <TabItem value="table" label="Request Body" default>

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `orderId` | String | Yes | The partner's unique order reference ID. |
| `reason` | String | Yes | Reason for cancellation. |

  </TabItem>
  <TabItem value="request_example" label="Example Request">

```json
{
  "orderId": "ORD-2026-001234",
  "reason": "Customer requested cancellation"
}
```

  </TabItem>
</Tabs>

## Cancel Order Error Codes

See [Error Response Format](./intro#error-response-format).

| HTTP Status | Code | Description |
|-------------|------|-------------|
| `406` | `WL_EMPTY_ORDER_ID` | The `orderId` field is missing or blank. |

## Cancel Order Response

Returns the [CollectionOrder](./order-object#collectionorder-object) with `status: CANCELLED` and `statusDetail: CANCELLED_BY_CLIENT`.

<ApiResponseSelector>

```json status="200" title="Order Cancelled"
{
  "orderId": "ORD-2026-001234",
  "matchingKey": "INV-2026-0042",
  "tckn": "12345678901",
  "name": "Ahmet Yılmaz",
  "amount": 250.00,
  "currency": "TRY",
  "reason": "Invoice INV-2026-0042",
  "status": "CANCELLED",
  "statusDetail": "CANCELLED_BY_CLIENT",
  "statusDetailMessage": "Customer requested cancellation",
  "orderType": "COLLECTION",
  "insertDate": "2026-06-17T10:00:00.000Z",
  "updateDate": "2026-06-17T10:08:00.000Z"
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
