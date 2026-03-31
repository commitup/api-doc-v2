---
sidebar_position: 4
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Wallet Info & Balance

Retrieve the current balance, status, and KYC level of the wallet.

<ApiEndpoint method="GET" url="/wallet" />

### Response

<Tabs>
  <TabItem value="fields" label="Response Fields" default>

| Field | Type | Description |
|-------|------|-------------|
| tenantUserId | String | User's ID in the tenant system. |
| walletId | number | Unique wallet identifier. |
| totalBalance | number | Sum of cash and other balances. |
| cashBalance | number | Available cash balance. |
| currencyCode | String | ISO currency code (e.g., `TRY`). |
| walletStatus | String | Current status of the wallet. See below. |
| walletLevel | String | Verification level. See below. |
| kycStatus | String | KYC progression status. See below. |
| kycFailureCode | String | Reason for KYC failure, if applicable. |

  </TabItem>
  <TabItem value="example" label="Example Response">

<ApiResponseSelector>

```json status="200" title="Success"
{
  "tenantUserId": "TESTTENANT0014",
  "walletId": 18341595,
  "totalBalance": 0,
  "cashBalance": 0,
  "currencyCode": "TRY",
  "walletStatus": "ACTIVE",
  "walletLevel": "UN_CONFIRMED",
  "kycStatus": "ANONYMOUS",
  "kycFailureCode": null
}
```

</ApiResponseSelector>

  </TabItem>

</Tabs>

---

## Reference Lists

### Wallet Status
| Code     | Description   |
|----------|---------------|
| ACTIVE   | Active        |
| PASSIVE  | Passive       |
| BLOCKED  | Blocked       |

### Wallet Level
| Code         | Description  |
|--------------|--------------|
| UN_CONFIRMED | Kyc not done |
| CONFIRMED    | Kyc approved |

### KYC Status
| Code                         | Description                               |
|-----------------------------|-------------------------------------------|
| ANONYMOUS                   | No KYC - Anonymous                        |
| WAITING_TO_PHYSICAL_LOCATION| Waiting for Agreement Delivery Physically |
| WAITING_APPROVAL            | Waiting for Approval                      |
| APPROVED                    | KYC Approved                              |
| REJECTED                    | KYC Rejected                              |
| EXPIRED                     | KYC Expired                               |

### KYC Failure Code 
| Code              | Description                                      |
|-------------------|--------------------------------------------------|
| KPS_ERROR         | Idendity info does'nt match for Turkish citizens |
| AML_REJECTED      | Rejected due to AML reasons                      |
| APPROVAL_REJECTED | Rejected due to requirements not met             |
| APPROVAL_EXPIRED  | Requirements not met in time                     |