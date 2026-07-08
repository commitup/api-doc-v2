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
| iban | true | string | IBAN number |
| name | true | string | Account owner name |
| currencyCode | true | string | Currency code in [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) format |

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
  <TabItem value="curl" label="cURL">

```shell
curl -X POST https://online-mig.payporter.com.tr:8586/online/eft-api/V2/validate-iban \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{ "iban": "TR123456789012345678901234", "name": "Mustafa Dogan", "currencyCode": "TRY" }'
```

  </TabItem>
</Tabs>

---

## Response

<Tabs>
  <TabItem value="table" label="Response Parameters" default>

If IBAN is valid and matches with given name and currency, it returns masked name of the account owner.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| name | string | Account owner masked name |

If Iban is not valid or does not match with given name and currency, it returns messageCodes below.

| MessageCode | Your Action |
| :--- | :--- |
| EFT_IBAN_CHECK_FAILED | IBAN is not valid. |
| EFT_IBAN_CHECK_CURRENCY_NOT_MATCH | IBAN currency does not match with given currency. |
| EFT_IBAN_CHECK_NAME_NOT_MATCH | IBAN name does not match with given name. |
| EFT_IBAN_CHECK_SYSTEM_ERROR | Unknown error. |

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
