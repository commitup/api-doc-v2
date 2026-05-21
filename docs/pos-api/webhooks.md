---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhooks

Receive real-time notifications when payment status changes occur. Webhooks are sent as HTTP POST requests to your configured endpoint.

## Overview

When a payment transitions to a final state (`SUCCESS`, `FAILED`, `REJECTED`, or `CANCELLED`), we send a webhook notification to your registered URL.

### Setup

1. Please contact our support team for webhook activation.
2. Generate a **Webhook Secret Key** — this is used to verify the authenticity of incoming webhooks.
3. Copy and securely store the secret key. It is shown only once.

---

## Webhook Headers

Every webhook request includes the following security headers:

| Header | Description | Example |
| :--- | :--- | :--- |
| `x-request-time` | Unix timestamp in milliseconds when the webhook was generated. | `1715150400000` |
| `x-request-signature` | HMAC SHA-256 hex digest of `timestampMillis:payload`. | `5d41402abc4b2a76b9719d...` |
| `x-event-id` | Unique identifier for the webhook event (UUID). | `123e4567-e89b-12d3-a456-426614174000` |
| `x-event-type` | Event type (e.g., `payment.status_changed`). | `payment.status_changed` |

---

## Webhook Payload

Webhooks are sent as `POST` requests with a JSON body. The body is the `ApiPaymentResponse` object:

```json
{
  "paymentId": "UUID",
  "orderId": "string",
  "amount": "number",
  "installmentCount": "number",
  "currency": "string",
  "merchantCommission": "number",
  "status": "string",
  "transactionType": "string",
  "paymentDate": "date",
  "cardHolderName": "string",
  "pan": "string",
  "domInt": "string",
  "cardScheme": "string",
  "cardType": "string",
  "cardSubType": "string",
  "loyaltyCode": "string",
  "externalTransactionId": "string",
  "authCode": "string",
  "resultCode": "string",
  "resultMessage": "string",
  "customerId": "string"
}
```

The payload is an exact representation of the `ApiPaymentResponse` object. Please refer to the [Payment](./payment) response field descriptions for more details.

---

## Signature Verification

You **must** verify the `x-request-signature` header to ensure the request is authentic and has not been tampered with.

### Verification Steps

1. Extract the `x-request-time` header (epoch milliseconds).
2. Extract the `x-request-signature` header (hex digest).
3. Construct the signed content: `x-request-time + ":" + raw_request_body`
4. Compute HMAC SHA-256 of the signed content using your webhook secret key.
5. Compare the computed signature with the `x-request-signature` header value. If they match, the webhook is authentic.
6. **Recommended:** Reject webhooks where the timestamp is older than 5 minutes to prevent replay attacks.

### Verification Examples

<Tabs>
  <TabItem value="nodejs" label="Node.js" default>

```javascript
const crypto = require('crypto');

function verifyWebhook(requestBody, timestampHeader, signatureHeader, secret) {
  // 1. Construct signed content
  const signedContent = timestampHeader + ':' + requestBody;

  // 2. Compute expected signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedContent)
    .digest('hex');

  // 3. Compare signatures (timing-safe)
  const isValid = crypto.timingSafeEqual(
    Buffer.from(signatureHeader, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );

  // 4. Check timestamp freshness (5 minutes = 300000ms)
  const age = Date.now() - parseInt(timestampHeader);
  if (age > 300000) {
    return false; // Too old — possible replay attack
  }

  return isValid;
}

// Express.js webhook handler
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const timestamp = req.headers['x-request-time'];
  const signature = req.headers['x-request-signature'];
  const body = req.body.toString();

  if (!verifyWebhook(body, timestamp, signature, 'your_webhook_secret')) {
    return res.status(401).send('Invalid signature');
  }

  const event = JSON.parse(body);
  console.log('Payment status changed:', event.status);

  // Process the webhook...

  res.status(200).send('OK');
});
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

public boolean verifySignature(String requestBody, String timestampHeader,
                                String signatureHeader, String secret) throws Exception {
    // 1. Construct signed content
    String signedContent = timestampHeader + ":" + requestBody;

    // 2. Compute expected signature
    Mac mac = Mac.getInstance("HmacSHA256");
    mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
    String expectedSignature = HexFormat.of().formatHex(
        mac.doFinal(signedContent.getBytes(StandardCharsets.UTF_8))
    );

    // 3. Compare signatures
    if (!expectedSignature.equals(signatureHeader)) {
        return false;
    }

    // 4. Check timestamp freshness (5 minutes = 300000ms)
    long age = System.currentTimeMillis() - Long.parseLong(timestampHeader);
    return age <= 300000;
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import hmac
import hashlib
import time

def verify_webhook(request_body: str, timestamp_header: str,
                   signature_header: str, secret: str) -> bool:
    # 1. Construct signed content
    signed_content = f"{timestamp_header}:{request_body}"

    # 2. Compute expected signature
    expected_signature = hmac.new(
        secret.encode(), signed_content.encode(), hashlib.sha256
    ).hexdigest()

    # 3. Compare signatures (timing-safe)
    if not hmac.compare_digest(signature_header, expected_signature):
        return False

    # 4. Check timestamp freshness (5 minutes = 300000ms)
    age = int(time.time() * 1000) - int(timestamp_header)
    return age <= 300000
```

  </TabItem>
</Tabs>

---

## Retry Policy

The first delivery attempt is made immediately when the payment reaches a final state. If your endpoint does not respond with an HTTP `2xx` status code, we will retry the webhook with exponential backoff:

| Retry | Delay After Failure | Cumulative Time |
| :--- | :--- | :--- |
| 1 | 30 seconds | ~30s |
| 2 | 1 minute | ~1.5m |
| 3 | 5 minutes | ~6.5m |
| 4 | 15 minutes | ~21.5m |
| 5 | 1 hour | ~1.4h |
| 6 | 4 hours | ~5.4h |
| 7 | 12 hours | ~17.4h |
| 8+ | 24 hours | ~41.4h |

Retries will continue for up to **48 hours** after the initial event. After this period, the webhook is permanently marked as failed.

---

## Best Practices

:::tip
Always verify webhook signatures and respond quickly to prevent unnecessary retries.
:::

- **Respond quickly:** Return a `2xx` response within 5 seconds. Process the webhook data asynchronously if needed.
- **Verify signatures:** Always verify the `x-request-signature` header using the `x-request-time` header before processing the webhook.
- **Handle duplicates:** Webhooks may be delivered more than once. Use the `x-event-id` header or `paymentId` field to deduplicate.
- **Use HTTPS:** Your webhook URL must use HTTPS.
- **Check timestamp:** Reject webhooks where the timestamp is older than 5 minutes to prevent replay attacks.
- **Don't rely solely on webhooks:** For critical flows, use the webhook as a notification and verify the payment status by calling the appropriate API endpoint (e.g., `GET /api/payment/{paymentId}` or `GET /api/checkout/{checkoutId}`).
