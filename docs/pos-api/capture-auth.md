---
sidebar_position: 4
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Capture Pre-Authorization

Capture a previously authorized payment. You can capture the full amount or a partial amount.

<ApiEndpoint method="POST" url="/api/pre-authorization/{paymentId}/capture" />

### Path Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| paymentId | string | The UUID of the pre-authorized payment. |

### Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| amount | Yes | number | Amount to capture (can be less than or equal to the pre-authorized amount) (e.g., 90.00). |
| currency | Yes | string | Currency code (e.g., TRY). |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "amount": 90.00,
  "currency": "TRY"
}
```

  </TabItem>
</Tabs>

## Response

Returns an `ApiPaymentResponse` object with capture details.

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| paymentId | string | Unique identifier for the payment (UUID). |
| orderId | string | Client's tracking number for the order. |
| amount | number | Transaction amount. |
| installmentCount | number | Number of installments. |
| currency | string | Currency code. |
| merchantCommission | number | Commission charged to the merchant. |
| status | string | Payment status (e.g., SUCCESS, FAILED, ENROLLED). |
| paymentDate | string | Date and time (ISO format, e.g., 2023-05-01T14:30:00Z). |
| cardHolderName | string | Name of the card holder. |
| pan | string | Masked Primary Account Number (e.g., 411111******1111). |
| domInt | string | Domestic or International transaction (DOM/INT). |
| cardScheme | string | Card scheme (e.g., VISA, MASTERCARD). |
| cardType | string | Type of card (e.g., CREDIT, DEBIT). |
| loyaltyCode | string | Loyalty program code (if applicable). |
| externalTransactionId | string | Transaction ID from the payment provider. |
| authCode | string | Authorization code from the payment provider. |
| resultCode | string | Result code from the payment provider. |
| resultMessage | string | Result message from the payment provider. |
| customerId | string | Unique identifier for the customer (if provided). |

  </TabItem>
  <TabItem value="example" label="Example Response">

<ApiResponseSelector>

```json status="200" title="Success"
{
  "paymentId": "123e4567-e89b-12d3-a456-426614174000",
  "orderId": "ORD-12345",
  "amount": 100.50,
  "installmentCount": 3,
  "currency": "TRY",
  "merchantCommission": 2.50,
  "status": "SUCCESS",
  "paymentDate": "2023-05-01T14:30:00Z",
  "cardHolderName": "John Doe",
  "pan": "411111******1111",
  "domInt": "DOM",
  "cardScheme": "VISA",
  "cardType": "CREDIT",
  "loyaltyCode": "GOLD123",
  "externalTransactionId": "EXT123456789",
  "authCode": "AUTH987654",
  "resultCode": "SUCCESS",
  "resultMessage": "Successful",
  "customerId": "CUST-12345"
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
