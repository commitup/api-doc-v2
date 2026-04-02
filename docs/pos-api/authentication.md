---
sidebar_position: 1
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Authentication

All API requests must be authenticated using API Key and API Secret headers.

### Request Headers

| Header Name | Description |
| :--- | :--- |
| X-API-KEY | Your unique API Key provided during onboarding. |
| X-API-SECRET | Your unique API Secret. Keep this secure. |

These credentials are unique to each merchant and must be included in every API request. Requests without valid credentials will receive a `401 Unauthorized` response. You can get credentials from the **Settings** page in our dashboard.

### Example Request

```bash
curl -X POST https://api.example.com/api/payment \
     -H "Content-Type: application/json" \
     -H "X-API-KEY: your_api_key_here" \
     -H "X-API-SECRET: your_api_secret_here" \
     -d '{"orderId": "ORD-12345", ...}'
```

:::warning Security
Ensure that your API Key and API Secret are kept secure and not shared publicly.
:::
