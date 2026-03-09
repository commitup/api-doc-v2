---
sidebar_position: 100
---

# 🤖 AI Agent Documentation Rules

This guide defines the standards for writing and updating documentation in this project. All AI agents contributing to this codebase MUST follow these rules to ensure consistency, accessibility, and high quality.

## 1. File Structure & Naming
- **File Names**: Use `kebab-case` for all `.md` and `.mdx` files (e.g., `create-eft.md`).
- **Sidebar Position**: Every documentation page must include a `sidebar_position` in the frontmatter.
- **i18n Requirement**: For every page created in `docs/`, corresponding translations MUST be created in `i18n/tr/` and `i18n/ru/`.

## 2. Component Usage
Consistency in UI is critical. Use the following custom components for API documentation:

### API Endpoints
Always use the `<ApiEndpoint />` component at the top of an API page.
```mdx
<ApiEndpoint method="POST" url="/v1/your-endpoint" />
```

### Request Parameters
Use `<Tabs>` to separate the technical parameter table and a JSON example.
```mdx
<Tabs>
  <TabItem value="table" label="Parameters" default>
    | Parameter | Required | Type | Description |
    | :--- | :--- | :--- | :--- |
    | amount | Yes | number | ... |
  </TabItem>
  <TabItem value="example" label="Example Request">
    ```json
    { "amount": 100 }
    ```
  </TabItem>
</Tabs>
```

### API Responses
Use `<ApiResponseSelector>` with direct Markdown code block children. The component automatically parses `status` and `title` from the code block metastring.
```mdx
<ApiResponseSelector>

```json status="200" title="Success"
{ "success": true }
```

```json status="401" title="Unauthorized"
{ "error": "Invalid token" }
```

</ApiResponseSelector>
```

## 3. Global Translations
- UI strings (Navbar, Hero sections, etc.) must use the `<Translate />` component with a unique ID.
- Static translations for the theme should be updated in `i18n/[lang]/code.json` and `i18n/[lang]/docusaurus-theme-classic/navbar.json`.

## 4. Visual Elements
- **Mermaid Diagrams**: Use Mermaid for flows and lifecycles. Ensure the Mermaid theme is enabled in `docusaurus.config.ts`.
- **Admonitions**: Use Docusaurus admonitions (`:::info`, `:::warning`, `:::danger`) to highlight important notes.

## 5. Metadata & SEO
- Ensure pages have clear H1 headers.
- Provide descriptive `meta` or frontmatter titles if the H1 is not sufficient for SEO.

---
*Follow these rules strictly to maintain the premium feel and technical accuracy of the platform.*
