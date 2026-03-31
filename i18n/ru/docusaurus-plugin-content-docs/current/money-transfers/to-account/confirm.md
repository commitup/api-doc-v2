---
sidebar_position: 2
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Подтвердить - На банковский счет

Подтвердите перевод на банковский счет, используя `operation-id`, полученный на этапе валидации.

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/confirm" />