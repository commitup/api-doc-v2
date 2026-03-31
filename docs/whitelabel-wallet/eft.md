---
sidebar_position: 7
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# EFT (Bank Transfer)

Electronic Funds Transfer from the wallet to any Turkish bank account (IBAN).

## 1. Validate EFT
<ApiEndpoint method="POST" url="/wallet/eft/validate" />

**Request Example:**
```json
{
  "accountNo": "TR660001001075010044411111",
  "amount": "205.00",
  "receiverName": "John Doe",
  "reason": "EDUCATION"
}
```

## 2. Confirm EFT
<ApiEndpoint method="POST" url="/wallet/eft/confirm" />

### EFT Reason Codes
| Code | Description |
|------|-------------|
| `INDIVIDUAL_PAYMENTS` | Individual Payments |
| `HOME_RENT` | Home Rent |
| `EDUCATION` | Education |
| `COMMERCIAL_PAYMENTS` | Commercial Payments |
| `OTHER_PAYMENTS` | Other Payments |
