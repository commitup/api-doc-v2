---
sidebar_position: 3
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';

# Source of Income List

List of income sources used in the `sourceOfIncomeDefinitionId` field of the validate request.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/source-of-income-info-list" />

:::info Static List
This is a static list that rarely changes. You do not need to call the endpoint for every transaction — you can safely hardcode these values. If any changes are made, they will be communicated in advance.
:::

| ID | Name |
| :--- | :--- |
| 8847659 | Salary |
| 8847661 | Business Income |
| 8847663 | Savings |
| 8847667 | Gift |
| 8847671 | Bank Loan |
| 8847681 | Other |
| 8847685 | Sale of Property |
