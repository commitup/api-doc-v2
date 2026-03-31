---
sidebar_position: 5
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Transfer Detayları

Bir para transferi işleminin durumunu ve tüm detaylarını sorgulayın.

## Transfer Detaylarını Getir

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/get-transfer-details/{processReferenceNo}" />

---

## Ajan Referansı ile Detayları Getir

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/get-transfer-details-by-api-agent-txn-no/{apiAgentTxnRefNo}" />