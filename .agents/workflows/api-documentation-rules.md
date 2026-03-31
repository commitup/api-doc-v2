---
description: Rules and guidelines for creating new PayPorter API documentation pages.
---

# API Documentation Design Rules

When creating a new API documentation page based on PayPorter's JSON or HTML documentation chunks, strictly follow these structural and design rules to maintain consistency across the portal.

## 1. File Structure & Imports
Every new documentation page (`.md` file) must begin with a `sidebar_position` in the front matter, followed by the necessary Docusaurus component imports.

```markdown
---
sidebar_position: [INSERT_POSITION]
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# [Page Title]
```

## 2. API Endpoint Component
Immediately after the page title and a brief description, render the API endpoint using the custom `<ApiEndpoint>` component.

```markdown
<ApiEndpoint method="POST" url="/mt-api/V2/example/endpoint" />
```

## 3. Request Section
Divide the Request section into **Request Headers** and **Request Parameters**.

### Headers
Use a standard Markdown table for headers. Include explanations for common headers like `externalfirm-user-code` or `operation-id`.

```markdown
### Request Headers

| Header | Required | Value |
| :--- | :--- | :--- |
| externalfirm-user-code | Yes | Your unique firm user code. This will be provided to you during onboarding. If you don't have one, contact your account manager. |
```

### Parameters
Use the `<Tabs>` component to separate the parameter table and the JSON example.
- **Tab 1 ("Parameters")**: Describe each field. Indicate "Required" (`Yes`/`No`). Link to `Commons` or `Person Object` when applicable rather than rewriting inner objects.
- **Tab 2 ("Example Request")**: Provide a perfectly formatted JSON block.

```markdown
### Request Parameters

<Tabs>
  <TabItem value="table" label="Parameters" default>

| Parameter | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| sender | Yes | object | Identifies the sender. See [Person Object](../../resources/commons/person-object). |
| purposeCodeDefinitionId | Yes | number | Reason for transfer. See [Purpose List](../../resources/commons/purpose-list). |

  </TabItem>
  <TabItem value="example" label="Example Request">

```json
{
  ...
}
```

  </TabItem>
</Tabs>
```

## 4. Response Section
The response must always use the `<ApiResponseSelector>` wrapper for styling, but inside it should be a `<Tabs>` component separating the fields table and the example response JSON. Make sure the JSON block utilizes `status="200" title="Success"`.

```markdown
## Response

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
| :--- | :--- | :--- |
| apiAgentTxnRefNo | string | Your original transaction reference. |

  </TabItem>
  <TabItem value="example" label="Example Response">

```json status="200" title="Success"
{
  "header": {
    "success": true, ...
  },
  "responseObject": { 
    ... 
  }
}
```

  </TabItem>
</Tabs>
```

## 5. Linking Common Objects (The "Commons" Rule)
Never inline the definition of massive, reusable objects or static lists inside individual request/response parameter tables.
- **Person Object**: If a payload expects `sender` or `receiver` person sub-fields, omit them and link to `[Person Object](../../resources/commons/person-object)`.
- **Static Lists**: For `identityTypeId`, `jobCode`, `purposeCodeDefinitionId`, `sourceOfIncomeDefinitionId`, and `relationshipWithSenderId`, link to their respective pages in `../commons/`.
- In JSON examples, collapse overly verbose fields (e.g., `"sender": { /* Person Object Fields */ }`) to preserve vertical space unless the specific fields are vital to that specific context.

## 6. Sidebar Integration
Whenever you create a new documentation page, you absolutely MUST update `sidebars.ts` to include the path where the page was created so it appears in the navigation structure.