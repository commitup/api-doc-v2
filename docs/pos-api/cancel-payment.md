---
sidebar_position: 8
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cancel Payment

Cancel a previously completed payment. A new payment record with transaction type `CANCEL` is created referencing the original payment.

<ApiEndpoint method="POST" url="/api/payment/{paymentId}/cancel" />

### Path Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| paymentId | string | UUID of the original payment to cancel. |

### Request Body

No request body is required.

## Response

Returns an `ApiPaymentResponse` for the newly created cancel transaction. Check `status` field — `SUCCESS` means the cancellation was accepted.

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| paymentId | string | Unique identifier for the cancel transaction (UUID). |
| parentPaymentId | string | UUID of the original cancelled payment. |
| orderId | string | Client's tracking number for the order. |
| amount | number | Transaction amount. |
| installmentCount | number | Number of installments. |
| currency | string | Currency code. |
| merchantCommission | number | Commission charged to the merchant. |
| status | string | Payment status (e.g., SUCCESS, FAILED). |
| transactionType | string | Transaction type (`CANCEL`). |
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
  "paymentId": "987e6543-e21b-45d3-b678-526614174999",
  "parentPaymentId": "123e4567-e89b-12d3-a456-426614174000",
  "orderId": "ORD-12345",
  "amount": 100.50,
  "installmentCount": 1,
  "currency": "TRY",
  "merchantCommission": 2.50,
  "status": "SUCCESS",
  "transactionType": "CANCEL",
  "paymentDate": "2023-05-01T16:00:00Z",
  "cardHolderName": "John Doe",
  "pan": "411111******1111",
  "domInt": "DOM",
  "cardScheme": "VISA",
  "cardType": "CREDIT",
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

## Important Notes

:::warning Same-day transactions only
Only same-day transactions can be cancelled. Transactions from previous days cannot be cancelled — use the [Refund](./refund-payment) endpoint instead.
:::

- Only payments in `SUCCESS` status can be cancelled.
- The cancel transaction will have the same amount and currency as the original payment.
- The response includes a `parentPaymentId` field referencing the original payment.
- If webhook is configured, a webhook notification will be sent upon cancellation.

---

## Example

```javascript
const cancelPayment = async (paymentId) => {
  const response = await fetch(`https://api.example.com/api/payment/${paymentId}/cancel`, {
    method: 'POST',
    headers: {
      'X-API-KEY': 'your_api_key_here',
      'X-API-SECRET': 'your_api_secret_here'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const result = await response.json();
  if (result.status === 'SUCCESS') {
    console.log('Payment cancelled successfully');
  }
  return result;
};
```
