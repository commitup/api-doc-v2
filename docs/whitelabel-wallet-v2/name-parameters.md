---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Name Transfer Parameters


:::warning Caching Required
To ensure optimal performance and avoid rate-limiting, **all parameter data (countries, providers, cities, offices) must be cached** on your side. Do not call these endpoints repeatedly for every transaction. We recommend refreshing this cache periodically (e.g., once a day or every few hours).
:::

Name transfers require specific destination parameters such as City and Office. These parameters can be retrieved dynamically depending on the selected provider and country.

## Get Cities

Retrieve a list of available destination cities for a specific country and provider.

<ApiEndpoint method="GET" url="/wallet/p2p/to-name/cities" />

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `countryCode` | String | Yes | ISO 3166-1 alpha-3 country code. |
| `providerId` | String | Yes | The ID of the provider (the `code` returned by the providers endpoint). |

**Example:**

```
GET /wallet/p2p/to-name/cities?countryCode=IDN&providerId=100
```

### Response

```json
{
  "cities": [
    {
      "id": "IST",
      "name": "Istanbul"
    }
  ]
}
```

## Get Offices

Retrieve a list of available destination offices for a specific city.

<ApiEndpoint method="GET" url="/wallet/p2p/to-name/cities/{cityCode}/offices" />

### Path Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `cityCode` | String | The city `id` retrieved from the cities endpoint. |

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `countryCode` | String | Yes | ISO 3166-1 alpha-3 country code. |
| `providerId` | String | Yes | The ID of the provider (the `code` returned by the providers endpoint). |

**Example:**

```
GET /wallet/p2p/to-name/cities/34/offices?countryCode=IDN&providerId=100
```

### Response

```json
{
  "offices": [
    {
      "id": "1",
      "name": "Kadikoy Branch"
    }
  ]
}
```
