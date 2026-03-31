---
sidebar_position: 10
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# KYC Overview

KYC (Know Your Customer) verification is required to upgrade wallets from `UN_CONFIRMED` to `CONFIRMED` level. There are two methods available:

### Manual KYC
The traditional verification method where users submit identity documents and personal information. After submission:
1. Documents are reviewed manually by PayPorter's compliance team
2. User is required to visit a physical location for agreement signing
3. Status progresses through `WAITING_TO_PHYSICAL_LOCATION` → `WAITING_APPROVAL` → `APPROVED`/`REJECTED`

### Digital KYC (Recommended)
SDK-based automated verification using mobile device capabilities:
1. Real-time ID document capture and validation
2. NFC chip reading for enhanced security
3. Liveness detection to prevent fraud
4. Faster approval with minimal manual intervention

:::tip Recommendation
Digital KYC provides faster processing times and better user experience. Use Manual KYC only when digital verification is not available on the user's device.
:::