---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Parameter Collection

Before validating and initiating a transfer, you must collect the necessary parameters dynamically. 

:::warning Caching Required
To ensure optimal performance and avoid rate-limiting, **all parameter data (countries, providers, cities, offices) must be cached** on your side. Do not call these endpoints repeatedly for every transaction. We recommend refreshing this cache periodically (e.g., once a day or every few hours).
:::

---

## 1. Get Available Countries

Retrieve a list of all available destination countries for P2P transfers. This is required for **all** transfer types (Name, Account, and Card).

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

---

## 2. Get Providers

Retrieve a list of available transfer providers for a specific country and transfer type. 

> **Important Usage Note:** 
> - **Account Transfers:** The provider represents a **Bank**. You will use the returned provider ID as the `bankId` field.
> - **Name Transfers:** The provider represents an **External Firm** (cash pickup location). You will use the returned provider ID as the `externalFirm` field.
> - **Card Transfers:** Providers are **not** used. Card transfers only require the country and the card number.

<ApiEndpoint method="GET" url="/wallet/p2p/{type}/countries/{countryCode}/providers" />

### Path Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `type` | String | The transfer type: `name`, or `account`. |
| `countryCode` | String | ISO 3166-1 alpha-3 country code. |

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `receiverType` | String | Optional. Filter by receiver type (e.g. `CUSTOMER` or `BUSINESS`). |

### Response

The response object contains boolean flags (`cityMandatory` and `officeMandatory`) which dictate whether you need to fetch further parameters for this specific provider.

```json
{
  "providers": [
    {
      "code": "100",
      "name": "Provider A",
      "cityMandatory": true,
      "officeMandatory": false
    }
  ]
}
```

---

## 3. Get Cities (If Mandatory)

**Only used for Name transfers.** If the selected provider returned `cityMandatory: true`, you must retrieve the valid cities for that provider and pass the city code in the validate request.

<ApiEndpoint method="GET" url="/wallet/p2p/name/countries/{countryCode}/providers/{providerId}/cities" />

### Response

```json
{
  "cities": [
    {
      "code": "34",
      "name": "Istanbul"
    }
  ]
}
```

---

## 4. Get Offices (If Mandatory)

**Only used for Name transfers.** If the selected provider returned `officeMandatory: true`, you must retrieve the valid offices for the selected city and pass the office code in the validate request.

<ApiEndpoint method="GET" url="/wallet/p2p/name/countries/{countryCode}/providers/{providerId}/cities/{cityCode}/offices" />

### Response

```json
{
  "offices": [
    {
      "code": "OFFICE_1",
      "name": "Main Branch"
    }
  ]
}
```
