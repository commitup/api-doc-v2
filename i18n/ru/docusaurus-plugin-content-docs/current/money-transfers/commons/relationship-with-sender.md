---
sidebar_position: 5
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';

# Relationship with Sender

List of relationships used in the `relationshipWithSenderId` field of the validate request.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/relationship-with-sender-list" />

:::info Static List
This is a static list that rarely changes. You do not need to call the endpoint for every transaction — you can safely hardcode these values. If any changes are made, they will be communicated in advance.
:::

| ID | Relationship |
| :--- | :--- |
| 1 | Child |
| 2 | Spouse |
| 3 | Parent |
| 4 | Friend |
| 5 | Work Friend |
| 6 | Brother/Sister |
