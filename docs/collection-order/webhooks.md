---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Webhooks

When a bank transfer is matched to a collection order, or when an order expires without a match, the system sends a `POST` request to the partner's configured webhook URL.

:::important Synchronous approval gate — not a fire-and-forget notification
This webhook is an **approval gate**. The system waits for the partner's HTTP response to decide the order outcome:

- Respond `status: "COMPLETED"` → order is completed, funds are settled to the wallet.
- Respond any other status, or return an HTTP error → order is **rejected**, the bank transfer is automatically refunded to the sender via EFT reversal.
:::

See [Flow Diagrams](./flow-diagrams) for end-to-end sequence diagrams of each scenario.

---

## When Webhooks Are Sent

| Trigger | Order Status at Time of Webhook | Action Required |
|---------|--------------------------------|-----------------|
| Bank transfer matched to order & KKB identity confirmed | `MATCHED` | **Yes** — partner must approve or reject. |
| Order expires without a match | `REJECTED` (statusDetail: `EXPIRED`) | No — informational notification only. |
| KKB identity check fails | `REJECTED` (statusDetail: `SENDER_MISMATCH`) | No — informational notification only. Auto-refund is triggered. |

---

## Webhook Configuration

The webhook endpoint URL is configured per wallet via the `orderApprovalWebhook` field in the wallet's webhook configuration. Contact onboarding support to set or update this URL.

---

## Webhook Request

The system sends a `POST` request containing the full [CollectionOrder](./order-object#collectionorder-object) object as the body.

| Property | Value |
|----------|-------|
| Method | `POST` |
| Content-Type | `application/json` |
| Body | Full [CollectionOrder](./order-object#collectionorder-object) object |

<Tabs>
  <TabItem value="matched" label="MATCHED — approval required" default>
<ApiResponseSelector>

```json status="200" title="MATCHED — approval required"
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
  "status": "MATCHED",
  "orderType": "COLLECTION",
  "insertDate": "2026-06-17T10:00:00.000Z",
  "matchDate": "2026-06-17T10:12:00.000Z"
}
```

</ApiResponseSelector>
  </TabItem>
  <TabItem value="expired" label="REJECTED / EXPIRED — informational">
<ApiResponseSelector>

```json status="200" title="REJECTED / EXPIRED — informational"
{
  "orderId": "ORD-2026-001234",
  "matchingKey": "INV-2026-0042",
  "amount": 250.00,
  "currency": "TRY",
  "status": "REJECTED",
  "statusDetail": "EXPIRED",
  "orderType": "COLLECTION",
  "insertDate": "2026-06-17T10:00:00.000Z",
  "updateDate": "2026-06-17T11:00:00.000Z"
}
```

</ApiResponseSelector>
  </TabItem>
  <TabItem value="sender_mismatch" label="REJECTED / SENDER_MISMATCH — informational">
<ApiResponseSelector>

```json status="200" title="REJECTED / SENDER_MISMATCH — informational"
{
  "orderId": "ORD-2026-001234",
  "matchingKey": "INV-2026-0042",
  "amount": 250.00,
  "receivedAmount": 250.00,
  "currency": "TRY",
  "senderIban": "TR640006200112345678901234",
  "status": "REJECTED",
  "statusDetail": "SENDER_MISMATCH",
  "statusDetailMessage": "Sender IBAN identity could not be verified for the provided TCKN",
  "orderType": "COLLECTION",
  "insertDate": "2026-06-17T10:00:00.000Z",
  "updateDate": "2026-06-17T10:15:00.000Z"
}
```

</ApiResponseSelector>
  </TabItem>
</Tabs>

---

## Webhook Response

The partner must respond with an HTTP `2xx` status code and a JSON body:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `orderId` | String | Yes | Echo the `orderId` from the received webhook. |
| `status` | String | Yes | `"COMPLETED"` to approve the order. Any other value causes rejection and automatic refund. |
| `reason` | String | No | Recommended when rejecting. Human-readable reason for the rejection. |

<Tabs>
  <TabItem value="approve" label="Approve (COMPLETED)" default>

```json
{
  "orderId": "ORD-2026-001234",
  "status": "COMPLETED"
}
```

  </TabItem>
  <TabItem value="reject" label="Reject">

```json
{
  "orderId": "ORD-2026-001234",
  "status": "REJECTED",
  "reason": "Customer not eligible for this order"
}
```

  </TabItem>
</Tabs>

---

## Outcome After Response

| Partner Response | Order Final Status | What Happens |
|------------------|--------------------|--------------|
| `status: "COMPLETED"` | `COMPLETED` | Funds credited to the wallet. Fee processing triggered. |
| Any other `status` or HTTP error | `REJECTED` (statusDetail: `CANCELLED_BY_CLIENT`) | Bank transfer automatically refunded to the sender via EFT reversal. |

:::warning Refund on rejection
If you reject the webhook or your endpoint returns an HTTP error, the received bank transfer is **automatically refunded** to the sender. This cannot be reversed. Ensure your approval logic is correct before responding with a non-`COMPLETED` status.
:::

---

## Retry Policy

| Condition | Behaviour |
|-----------|-----------|
| Partner returns HTTP `2xx` | Accepted as the approval/rejection decision. |
| HTTP error or network timeout | Request is retried via an internal queue. |

:::note Idempotency
Implement idempotency in your webhook handler — the same `orderId` may be delivered more than once due to retries. Use `orderId` to deduplicate and avoid processing the same order twice.
:::

---

## Security

The webhook request is sent without a cryptographic signature. Partners should:

- Restrict webhook endpoint access to the system's IP range (obtain the IP range from onboarding support).
- Validate that the `orderId` exists in your system and is in an expected state before returning `status: "COMPLETED"`.
- Return HTTP `4xx` or `5xx` if the order cannot be found or is not eligible — this will trigger a rejection and automatic refund.
