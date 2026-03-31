---
sidebar_position: 3
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Office List

Retrieve the list of payout offices for a specific city and external firm.

<ApiEndpoint method="POST" url="/mt-api/V2/moneytransfercommon/office-list" />

## Overview

If a firm indicates that office selection is mandatory (`officeMandatory: true`), use this endpoint to fetch the list of available payout locations within a city.

:::tip Caching
Like the city list, it is recommended to cache office details to improve performance.
:::

---

## Request Body

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| cityId | Yes | number | The ID of the selected city. |
| externalFirmCode | Yes | number | The code of the selected firm. |

```json title="Example Request"
{
  "cityId": 1023,
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
    "externalFirmCode": 28,
    "id": 5001,
    "officeName": "Blue Area Branch"
  },
  {
    "cityName": "ISLAMABAD",
    "externalFirmCode": 28,
    "id": 5002,
    "officeName": "F-10 Markaz Branch"
  }
]
```

</ApiResponseSelector>