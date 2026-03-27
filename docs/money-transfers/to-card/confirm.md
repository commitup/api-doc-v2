---
sidebar_position: 2
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Confirm - to Card

Confirm the card transfer using the `operation-id` from the validation step.

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/confirm" />

---

## Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| operation-id | Yes | The ID received from the `to-card/validate` response header. |

## Response

<ApiResponseSelector>

```json status="200" title="Success"
{
  "header": {
    "success": true,
    "message": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "processReferenceNo": 4700044455
  }
}
```

</ApiResponseSelector>
