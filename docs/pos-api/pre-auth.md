---
sidebar_position: 3
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Pre-Authorization

Process a pre-authorization transaction to reserve funds on a card without capturing them immediately.

<ApiEndpoint method="POST" url="/api/pre-authorization" />

### Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| orderId | Yes | string | Client's tracking number for the order (e.g., ORD-12345). |
| amount | Yes | number | Transaction amount (e.g., 100.50). |
| currency | Yes | string | Currency code (e.g., TRY). |
| cardHolderName | Yes | string | Name of the card holder. |
| pan | Yes | string | Primary Account Number (card number) (e.g., 5421190122090656). |
| expiryMonth | Yes | string | Card expiry month (2 digits, e.g., 04). |
| expiryYear | Yes | string | Card expiry year (2 digits, e.g., 28). |
| cvv | Yes | string | Card Verification Value (e.g., 916). |
| requestIp | Yes | string | IP address of the client making the request (e.g., 192.168.1.1). |
| requestPort | Yes | number | Port number of the client making the request (e.g., 8080). |
| customerId | No | string | Optional unique identifier for the customer (e.g., CUST-12345). |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "orderId": "ORD-12345",
  "amount": 100.50,
  "currency": "TRY",
  "cardHolderName": "John Doe",
  "pan": "5421190122090656",
  "expiryMonth": "04",
  "expiryYear": "28",
  "cvv": "916",
  "requestIp": "192.168.1.1",
  "requestPort": 8080,
  "customerId": "CUST-12345"
}
```

  </TabItem>
</Tabs>

## Response

Returns an `ApiPaymentResponse` object with pre-authorization details.

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
