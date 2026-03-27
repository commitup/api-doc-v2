---
sidebar_position: 2
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Confirm - to Account

Confirm the bank account transfer using the `operation-id` from the validation step.

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/confirm" />

---

## Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| operation-id | Yes | The ID received from the `to-account/validate` response header. |

## Response

<ApiResponseSelector>

```json status="200" title="Success"
{
  "header": {
    "success": true,
    "message": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "processReferenceNo": 4700012345
  }
}
```

</ApiResponseSelector>

:::tip More Info
For detailed header requirements and common error codes, see the main **[Confirm Transfer](../to-name/confirm)** documentation.
:::
