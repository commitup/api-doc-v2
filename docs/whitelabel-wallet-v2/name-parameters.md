---
sidebar_position: 11
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

<ApiEndpoint method="GET" url="/wallet/p2p/name/countries/{countryCode}/providers/{providerId}/cities" />

### Path Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `countryCode` | String | ISO 3166-1 alpha-3 country code. |
| `providerId` | String | The ID of the provider. |

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

<ApiEndpoint method="GET" url="/wallet/p2p/name/countries/{countryCode}/providers/{providerId}/cities/{cityCode}/offices" />

### Path Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `countryCode` | String | ISO 3166-1 alpha-3 country code. |
| `providerId` | String | The ID of the provider. |
| `cityCode` | String | The city code retrieved from the cities endpoint. |

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
