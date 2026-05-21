---
sidebar_position: 7
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Payment Status

Query the current status of a payment by its ID. Use this endpoint to verify payment status independently — especially useful as a fallback when a webhook notification was not received.

<ApiEndpoint method="GET" url="/api/payment/{paymentId}" />

### Path Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| paymentId | string | UUID of the payment (returned from payment, 3DS, or pre-authorization endpoints). |

## Response

Returns an `ApiPaymentResponse` object (identical to the **Direct Payment** response).

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
  "installmentCount": 1,
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

---

## When to Use

- **3D Secure fallback:** If your success/failure callback was not triggered, poll this endpoint using the `paymentId` returned from `POST /api/3ds`.
- **Webhook fallback:** If a webhook notification was not received within a reasonable time, query this endpoint to confirm the payment's final status.
- **Reconciliation:** Use to verify payment status during end-of-day reconciliation.

---

## Example

```javascript
const getPaymentStatus = async (paymentId) => {
  const response = await fetch(`https://api.example.com/api/payment/${paymentId}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': 'your_api_key_here',
      'X-API-SECRET': 'your_api_secret_here'
    }
  });
  return await response.json();
};

// 3DS fallback — if user was not redirected to callback
const paymentId = enrollmentResponse.paymentId; // ID from POST /api/3ds
const status = await getPaymentStatus(paymentId);

if (status.status === 'SUCCESS') {
  // Payment successful
} else if (status.status === 'FAILED' || status.status === 'CANCELLED') {
  // Payment failed
} else {
  // Still processing (ENROLLED), wait and retry
}
```
