---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Reference Data


:::warning Caching Required
To ensure optimal performance and avoid rate-limiting, **all parameter data (countries, providers, cities, offices) must be cached** on your side. Do not call these endpoints repeatedly for every transaction. We recommend refreshing this cache periodically (e.g., once a day or every few hours).
:::

Retrieve general configuration parameters required for validating and creating transfers.

## Get Available Countries

Retrieve a list of all available destination countries for P2P transfers.

<ApiEndpoint method="GET" url="/wallet/p2p/available-countries" />

### Response

```json
{
  "countries": [
    {
      "code": "TUR",
      "name": "Turkey"
    }
  ]
}
```

## Get Providers

Retrieve a list of available transfer providers for a specific country and transfer type.

<ApiEndpoint method="GET" url="/wallet/p2p/{type}/countries/{countryCode}/providers" />

### Path Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `type` | String | The transfer type: `name`, `account`, `card`, or `wallet`. |
| `countryCode` | String | ISO 3166-1 alpha-3 country code. |

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `receiverType` | String | Optional. Filter by receiver type (e.g. `CUSTOMER` or `BUSINESS`). |

### Response

```json
{
  "providers": [
    {
      "code": "100",
      "name": "Provider A"
    }
  ]
}
```
