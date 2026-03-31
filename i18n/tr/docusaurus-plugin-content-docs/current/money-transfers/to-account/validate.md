---
sidebar_position: 1
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Doğrula - Banka Hesabına

Bir banka hesabına, IBAN'a veya hesaba bağlı kartlara doğrudan para transferi talebini doğrulayın.

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-account/validate" />