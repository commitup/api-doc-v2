---
sidebar_position: 9
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Card Operations

Comprehensive management for virtual and physical (no-name) cards linked to the wallet.

## Card Inventory
<ApiEndpoint method="GET" url="/wallet/cards" />

Returns all cards associated with the wallet.

---

## Creation & Activation

### Create Virtual Card
<ApiEndpoint method="POST" url="/wallet/cards/virtual" />

### Personalize No-Name Card
<ApiEndpoint method="POST" url="/wallet/cards/no-name" />

---

## Security & Access

### Get Security Data (CVV/Expiry)
<ApiEndpoint method="GET" url="/wallet/cards/{cardId}/security-data" />

### Set/Change Card PIN
<ApiEndpoint method="POST" url="/wallet/cards/{cardId}/set-pin" />

---

## Limits & Controls

### Management Authorization
<ApiEndpoint method="POST" url="/wallet/cards/{cardId}/auth-info" />
Controls features like `moto`, `contactless`, `cash`, `international`, and `ecom`.

### Transaction Limits
<ApiEndpoint method="POST" url="/wallet/cards/{cardId}/limit-info" />
Set `dailyLimit`, `weeklyLimit`, and `monthlyLimit`.

---

## Status Management

### Temporary Close/Open
<ApiEndpoint method="POST" url="/wallet/cards/{cardId}/temporally-close/{isClose}" />

### Cancel Card (Permanent)
<ApiEndpoint method="POST" url="/wallet/cards/{cardId}/cancel" />

---

## Reference Lists

<Tabs>
  <TabItem value="type" label="Card Types" default>

| Code | Description |
|------|-------------|
| `VIRTUAL` | Digital-only card |
| `NO_NAME` | Physical card without printed name |

  </TabItem>
  <TabItem value="status" label="Card Statuses">

| Code | Description |
|------|-------------|
| `ACTIVE` | Ready for use |
| `TEMPORARY_CLOSED` | Locked by user |
| `CANCELLED` | Permanently disabled |
| `LOST_STOLEN` | Reported missing |

  </TabItem>
</Tabs>
