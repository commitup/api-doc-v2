---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Reconciliation

- Returns only `COMPLETED` transaction records within the given UTC date range for reconciliation purposes.
- Results are sorted by `transactionDate` ascending (oldest first).
- This endpoint uses a lightweight record format optimised for bulk reconciliation. Merchant-level details (name, city, terminal, etc.) can be retrieved via the [Query endpoint](./query-transaction) if needed.

<ApiEndpoint method="GET" url="/wallet/qrcode/reconciliation" />

**Request**

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `startDate` | String | Yes | 24 | Start of date range, inclusive (ISO 8601, e.g. `2025-07-14T00:00:00Z`). |
| `endDate` | String | Yes | 24 | End of date range, exclusive (ISO 8601, e.g. `2025-07-15T00:00:00Z`). |
| `page` | Integer | No | - | Page number (0-indexed, default `0`). |
| `size` | Integer | No | - | Page size (default `100`, max `1000`). |

  </TabItem>
</Tabs>

:::tip
Use a maximum date range of **1 day** per request for optimal performance. For larger ranges, paginate by day.
:::

## Response Fields

| Field | Type | Presence | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `data` | Array | Always | - | List of reconciliation records. See [Reconciliation Record Fields](#reconciliation-record-fields). |
| `summary` | Object | Always | - | Summary of business related fields for the entire input date range. |
| `summary.totalPaymentCount` | Integer | Always | - | Total number of payment records across the date range. |
| `summary.totalPaymentAmount` | String | Always | 12 | Total payment amount across the date range. |
| `summary.totalRefundCount` | Integer | Always | - | Total number of refund records across the date range. |
| `summary.totalRefundAmount` | String | Always | 12 | Total refund amount across the date range. |
| `pagination` | Object | Always | - | Standard pagination metadata. |
| `pagination.page` | Integer | Always | - | Current page number. |
| `pagination.pageSize` | Integer | Always | - | Number of records per page. |
| `pagination.totalItems` | Integer | Always | - | Total number of items across all pages. |
| `pagination.totalPages` | Integer | Always | - | Total number of pages available. |
| `pagination.hasNext` | Boolean | Always | - | Indicates if there is a subsequent page. |
| `pagination.hasPrevious` | Boolean | Always | - | Indicates if there is a preceding page. |

### Reconciliation Record Fields

| Field | Type | Presence | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `transactionId` | String | Always | 11 | Unique transaction identifier. |
| `tenantReferenceId` | String | Conditional | 100 | Partner's unique reference ID. Optional for refund transactions (may be `null`). |
| `tenantUserId` | String | Always | 50 | The tenant's user identifier. |
| `parentTransactionId` | String | Conditional | 11 | Original payment transaction ID (for refunds). |
| `transactionType` | String | Always | 10 | `PAYMENT` or `REFUND`. |
| `transactionSource` | String | Always | 30 | Source of the transaction. See [Transaction Source Types](./payment-object#transaction-source-types). |
| `status` | String | Always | 20 | `COMPLETED`. |
| `settlementAmount` | String | Always | 12 | Settlement amount. |
| `settlementCurrency` | String | Always | 3 | Settlement currency code. |
| `transactionDate` | String | Always | 24 | Transaction completion date (ISO 8601, e.g. `2025-07-14T15:53:21Z`). |

<Tabs>
  <TabItem value="response_example" label="Example Response" default>
<ApiResponseSelector>

```json status="200" title="Success"
{
  "data": [
    {
      "transactionId": "47002323201",
      "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
      "tenantUserId": "364",
      "transactionType": "PAYMENT",
      "transactionSource": "MERCHANT_QR_SCAN",
      "status": "COMPLETED",
      "settlementAmount": "84.00",
      "settlementCurrency": "TRY",
      "transactionDate": "2025-07-14T10:30:00Z"
    },
    {
      "transactionId": "47002323205",
      "tenantReferenceId": "b3f1a9c7-5e22-4d8a-a016-72f8b1e44d03",
      "tenantUserId": "364",
      "transactionType": "PAYMENT",
      "transactionSource": "MERCHANT_QR_SCAN",
      "status": "COMPLETED",
      "settlementAmount": "250.00",
      "settlementCurrency": "TRY",
      "transactionDate": "2025-07-14T12:15:00Z"
    },
    {
      "transactionId": "47002323210",
      "tenantReferenceId": "c4d5e6f7-8901-2345-ab67-890123456789",
      "tenantUserId": "364",
      "transactionType": "PAYMENT",
      "transactionSource": "MERCHANT_QR_SCAN",
      "status": "COMPLETED",
      "settlementAmount": "120.50",
      "settlementCurrency": "TRY",
      "transactionDate": "2025-07-14T14:00:00Z"
    },
    {
      "transactionId": "47002323302",
      "tenantReferenceId": null,
      "tenantUserId": "364",
      "parentTransactionId": "47002323201",
      "transactionType": "REFUND",
      "transactionSource": "MERCHANT_QR_SCAN",
      "status": "COMPLETED",
      "settlementAmount": "84.00",
      "settlementCurrency": "TRY",
      "transactionDate": "2025-07-14T16:45:00Z"
    },
    {
      "transactionId": "47002323215",
      "tenantReferenceId": "d7e8f901-2345-6789-abcd-ef0123456789",
      "tenantUserId": "364",
      "transactionType": "PAYMENT",
      "transactionSource": "MERCHANT_QR_SCAN",
      "status": "COMPLETED",
      "settlementAmount": "45.00",
      "settlementCurrency": "TRY",
      "transactionDate": "2025-07-14T17:30:00Z"
    }
  ],
  "summary": {
    "totalPaymentCount": 4,
    "totalPaymentAmount": "499.50",
    "totalRefundCount": 1,
    "totalRefundAmount": "84.00"
  },
  "pagination": {
    "page": 0,
    "pageSize": 100,
    "totalItems": 5,
    "totalPages": 1,
    "hasNext": false,
    "hasPrevious": false
  }
}
```

</ApiResponseSelector>
  </TabItem>
</Tabs>
