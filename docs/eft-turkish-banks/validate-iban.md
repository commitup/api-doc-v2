---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# IBAN Validation
:::info Premium Feature
This is an extra paid feature. Please contact your account manager to enable this service.
:::
Verify recipient details before initiating a transfer to minimize returns and errors.

<ApiEndpoint method="POST" url="/eft-api/V2/validate-iban" />

## Overview

IBAN Validation is a premium feature that checks if a provided IBAN, currency, and account owner name are valid and match the bank's records.



---

## Request Format

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| iban | Yes | string | The full IBAN of the recipient (e.g., `TR...`). |
| name | Yes | string | The full name of the account owner. |
| currencyCode | Yes | string | The currency of the account (e.g., `TRY`). |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  "iban": "TR123456789012345678901234",
  "name": "John Doe",
  "currencyCode": "TRY"
}
```

  </TabItem>
</Tabs>

---

## Response

<Tabs>
  <TabItem value="table" label="Response Parameters" default>

| Parameter | Type | Description |
| :--- | :--- | :--- |
| name | string | The masked name of the account owner. |

  </TabItem>
  <TabItem value="example" label="Example Response">

<ApiResponseSelector>

```json status="200" title="Success (Valid)"
{
    "header": {
        "success": true,
        "code": "1",
        "message": "OPERATION_DONE_SUCCESSFUL",
        "messageCode": "OPERATION_DONE_SUCCESSFUL"
    },
    "responseObject": {
        "name": "ZE*** AY*** DO***"
    }
}
```

```json status="406" title="Name Mismatch"
{
    "header": {
        "success": false,
        "code": "577",
        "message": "The receivers name does not match the IBAN",
        "messageCode": "EFT_IBAN_CHECK_NAME_NOT_MATCH"
    },
    "responseObject": null
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
