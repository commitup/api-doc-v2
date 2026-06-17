---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Query Order

Retrieves the current state of a collection or sell order by its `orderId`.

<ApiEndpoint method="POST" url="/external/whitelabel/wallet/collection-order/query" />

**Request**

<Tabs>
  <TabItem value="table" label="Request Body" default>

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `orderId` | String | Yes | The partner's unique order reference ID. |

  </TabItem>
  <TabItem value="request_example" label="Example Request">

```json
{
  "orderId": "ORD-2026-001234"
}
```

  </TabItem>
</Tabs>

## Query Order Error Codes

See [Error Response Format](./intro#error-response-format).

| HTTP Status | Code | Description |
|-------------|------|-------------|
| `406` | `WL_EMPTY_ORDER_ID` | The `orderId` field is missing or blank. |

## Query Order Response

Returns the [CollectionOrder](./order-object#collectionorder-object) with its current status.

<ApiResponseSelector>

```json status="200" title="Order Query — PENDING"
{
  "orderId": "ORD-2026-001234",
  "matchingKey": "INV-2026-0042",
  "tckn": "12345678901",
  "name": "Ahmet Yılmaz",
  "amount": 250.00,
  "currency": "TRY",
  "reason": "Invoice INV-2026-0042",
  "receiverIban": "TR330006100519786457841326",
  "status": "PENDING",
  "orderType": "COLLECTION",
  "insertDate": "2026-06-17T10:00:00.000Z"
}
```

```json status="200" title="Order Query — COMPLETED"
{
  "orderId": "ORD-2026-001234",
  "matchingKey": "INV-2026-0042",
  "tckn": "12345678901",
  "name": "Ahmet Yılmaz",
  "amount": 250.00,
  "receivedAmount": 250.00,
  "currency": "TRY",
  "reason": "Invoice INV-2026-0042",
  "receiverIban": "TR330006100519786457841326",
  "senderIban": "TR640006200112345678901234",
  "status": "COMPLETED",
  "orderType": "COLLECTION",
  "insertDate": "2026-06-17T10:00:00.000Z",
  "matchDate": "2026-06-17T10:12:00.000Z",
  "notificationDate": "2026-06-17T10:12:05.000Z"
}
```

```json status="200" title="Order Query — REJECTED (SENDER_MISMATCH)"
{
  "orderId": "ORD-2026-001234",
  "amount": 250.00,
  "currency": "TRY",
  "status": "REJECTED",
  "statusDetail": "SENDER_MISMATCH",
  "statusDetailMessage": "Sender IBAN identity could not be verified for the provided TCKN",
  "orderType": "COLLECTION",
  "insertDate": "2026-06-17T10:00:00.000Z",
  "updateDate": "2026-06-17T10:30:00.000Z"
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
