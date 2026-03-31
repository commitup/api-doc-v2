---
sidebar_position: 4
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';

# Purpose List

List of transfer purposes used in the `purposeCodeDefinitionId` field of the validate request.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/purpose-info-list" />

:::info Static List
This is a static list that rarely changes. You do not need to call the endpoint for every transaction — you can safely hardcode these values. If any changes are made, they will be communicated in advance.
:::

| ID | Name |
| :--- | :--- |
| 2 | Family |
| 3 | Commerce Payments |
| 6 | Rentals |
| 10 | Other |
| 11 | Dept/Loan |
| 12 | Sale/Buy |
| 14 | Saving/Investment |
| 16 | Education |
