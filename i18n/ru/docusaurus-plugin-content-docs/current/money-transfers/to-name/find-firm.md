---
sidebar_position: 1
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Find Firm

Retrieve the list of external (remittance) firms available for a specific destination country.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/firm-info/{countryIsoCode}" />

## Overview

Before initiating a "To Name" transfer, you must identify which remittance firms operate in the destination country. This endpoint provides the firm codes and informs you whether city or office selection is mandatory for that specific firm.

:::tip Static Data Option
This data can also be provided to you statically. If you prefer not to call this endpoint, you can store the firm codes, currencies, and city/office requirements on your side. Contact your account manager to receive the static firm list.
:::

---

## Path Parameters

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| countryIsoCode | Yes | string | ISO 3166-1 alpha-3 country code (e.g., `PAK`, `PHL`). |

## Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| externalfirm-user-code | Yes | Your unique firm user code. This will be provided to you during onboarding. If you don't have one, contact your account manager. |

---

## Response

The response contains a list of firms and their requirements.

<ApiResponseSelector>

```json status="200" title="Success"
{
  "body": {
    "responseObject": [
      {
        "code": 3,
        "name": "FIRM-1",
        "cityMandatory": true,
        "officeMandatory": false,
        "currencies": [
          {
            "code": "USD",
            "payoutCurrencies": []
          }
        ]
      },
      {
        "code": 11,
        "name": "FIRM-2",
        "cityMandatory": true,
        "officeMandatory": true,
        "currencies": [
          {
            "code": "USD",
            "payoutCurrencies": []
          },
          {
            "code": "EUR",
            "payoutCurrencies": []
          }
        ]
      }
    ],
    "restHeader": {
      "success": true,
      "message": "OPERATION_DONE_SUCCESSFUL"
    }
  }
}
```

</ApiResponseSelector>

### Key Fields

- **cityMandatory**: If `true`, you must call the [City List](./find-city) endpoint and include `toCityId` in your validation request.
- **officeMandatory**: If `true`, you must call the [Office List](./find-office) endpoint and include `toOfficeId` in your validation request.
- **currencies**: Shows supported sending currencies and their corresponding payout currencies.