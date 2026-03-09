---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Webhooks

Webhooks allow you to receive real-time notifications about status changes in your EFT transfers. Instead of polling our API, we will "push" information to your server as soon as an event occurs.

## Workflow

1.  **Endpoint**: You must provide a publicly accessible HTTPS endpoint (e.g., `https://your-domain.com/payporter/eft-api/notify-status`).
2.  **Notification**: When a transfer status changes (e.g., from `PENDING` to `COMPLETED` or `REJECTED`), PayPorter sends a `POST` request to your endpoint.
3.  **Verification**: You should verify the signature included in the request headers to ensure the notification is authentic.
4.  **Acknowledgment**: Your server should return a `200 OK` status with `success: true` to acknowledge receipt.

:::danger Idempotency
Webhook needs to be **idempotent**. PayPorter may notify the same status multiple times in some cases (timeout, system error).
:::

---

## Secure Implementation

To ensure the security and integrity of the notifications, every webhook request includes a digital signature.

### Hashing Algorithm
We use the **HmacSHA256** algorithm. The output format for the hashed value is **hexadecimal (hex)**.

### Secret Key
PayPorter will provide you with a **Secret Value** during the integration phase. This secret must be kept secure on your server and should never be shared or exposed in client-side code.

### Verification Process
To verify the request:
1.  Concatenate the entire request body as a string.
2.  Hash this string using the **HmacSHA256** algorithm with your provided **Secret Value**.
3.  Compare the resulting hex string with the value provided in the `request-sign` header.

---

## Request Details

The webhook payload is sent as a `POST` request.

### Headers
| Header | Description | Required |
| :--- | :--- | :--- |
| Content-Type | `application/json` | Yes |
| request-sign | The HMAC-SHA256 signature of the payload (hex format). | Yes |

### Parameters
<Tabs>
  <TabItem value="table" label="Request Parameters" default>

| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| senderExtFirmRefId | string | Sender external firm reference id | `P2P_1212121` |
| transferOrderRefId | number | EFT order reference id | `47000000000` |
| status | number | Status of the EFT (20: COMPLETE, 40: REJECTED, 50: REFUND) | `20` |
| messageCode | string | Reject/refund reason code | `EFT_WRONG_FEC_FOR_ACCOUNT` |
| messageDescription | string | Extra description if it exists | `The currency sent does not match...` |

  </TabItem>
  <TabItem value="payload" label="Example Payload">

```json
{
  "senderExtFirmRefId": "P2P_1212121",
  "transferOrderRefId": 47000000000,
  "status": 20,
  "messageCode": "OPERATION_DONE_SUCCESSFUL",
  "messageDescription": "Success"
}
```

  </TabItem>
</Tabs>

---

## Response Expectations

Your server must return an appropriate HTTP status code and a JSON response.

<Tabs>
  <TabItem value="table" label="Response Parameters" default>

| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| success | boolean | Notification processing status | `true` |
| errorCode | string | Error code if notification failed | `SENDER_REF_NOT_FOUND` |

  </TabItem>
  <TabItem value="example" label="Example Responses">

<ApiResponseSelector>

```json status="200" title="Success"
{
  "success": true
}
```

```json status="404" title="Not Found"
{
  "success": false,
  "errorCode": "SENDER_REF_NOT_FOUND"
}
```

```json status="400" title="Status Not Valid"
{
  "success": false,
  "errorCode": "STATUS_NOT_VALID"
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>

### HTTP Status Code Mapping

| Status | Condition |
| :--- | :--- |
| **200** | Everything is OK (`success=true`). |
| **404** | `SENDER_REF_NOT_FOUND` or `ORDER_REF_NOT_FOUND` (`success=false`). |
| **400** | `STATUS_NOT_VALID` (`success=false`). |
| **500** | All other error cases (`success=false`). |


