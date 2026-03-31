---
sidebar_position: 3
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Wallet Registration

### Register and Get Access Key

Creates a new wallet and returns the access key for secure data generation.

<ApiEndpoint method="POST" url="/wallet/register" />

:::info Authentication
Requires **API Key** headers. Use corporate wallet credentials in the `X-Wallet-Id` and `X-Security-Key` headers to register individual wallets.
:::

**Request Parameters:**

<Tabs>
  <TabItem value="fields" label="Request Fields" default>

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tenantUserId | String | Yes | Unique identifier for the user in your system. |
| firstName | String | Yes | User's first name. |
| lastName | String | Yes | User's last name. |
| mail | String | Yes | User's email address. |
| phoneCountryCode | String | Yes | ISO country code (e.g., `TUR`). |
| phoneNumber | String | Yes | User's mobile phone number. |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "tenantUserId": "ABC123XYZ",
  "firstName": "John",
  "lastName": "Doe",
  "mail": "john.doe@mail.com",
  "phoneCountryCode": "TUR",
  "phoneNumber": "1231212"
}
```

  </TabItem>
</Tabs>

### Response

<ApiResponseSelector>

```json status="200" title="Success"
{
  "tenantUserId": "ABC123XYZ",
  "walletId": "1234567890",
  "accessKey": "RSA PUBLIC KEY"
}
```

</ApiResponseSelector>

:::warning Important
Store the `accessKey` securely. It is required to encrypt payloads for subsequent wallet-bound requests (as the `X-Security-Key` header).
:::
