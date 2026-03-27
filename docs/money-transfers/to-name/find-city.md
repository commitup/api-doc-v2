---
sidebar_position: 2
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# City List

Retrieve the list of cities for a specific country and external firm.

<ApiEndpoint method="POST" url="/mt-api/V2/moneytransfercommon/city-list" />

## Overview

If a firm indicates that city selection is mandatory (`cityMandatory: true`), use this endpoint to fetch the list of available cities.

:::tip Caching
It is highly recommended to cache this list in your database instead of calling it for every transaction, as city lists change infrequently.
:::

---

## Request Body

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| countryCode | Yes | string | ISO 3166-1 alpha-3 country code. |
| externalFirmCode | Yes | number | The code of the selected firm. |

```json title="Example Request"
{
  "countryCode": "PAK",
  "externalFirmCode": 28
}
```

---

## Response

<ApiResponseSelector>

```json status="200" title="Success"
[
  {
    "cityName": "ISLAMABAD",
    "countryCode": "PAK",
    "externalFirmCode": 28,
    "id": 1023
  },
  {
    "cityName": "KARACHI",
    "countryCode": "PAK",
    "externalFirmCode": 28,
    "id": 1045
  }
]
```

</ApiResponseSelector>
