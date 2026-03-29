---
sidebar_position: 1
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';

# Identity Type List

List of identity document types used in the `identityTypeId` field of the [Person Object](../person-object).

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/identity-type-list" />

:::info Static List
This is a static list that rarely changes. You do not need to call the endpoint for every transaction — you can safely hardcode these values. If any changes are made, they will be communicated in advance.
:::

| ID | Name |
| :--- | :--- |
| 1 | Passport |
| 2 | Driving License |
| 3 | Identity Card |
| 4 | Foreign Identity Card |
| 5 | New Identity Card |
| 11 | National ID Document |
| 14 | Residence Document |
| 33 | Ex-Citizen/Blue Identity |
| 61 | Northern Cyprus Identity |
| 62 | Temporary Protection Document |
| 63 | Seafarer Identity |
