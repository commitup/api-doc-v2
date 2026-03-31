---
sidebar_position: 2
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Подтвердить - По имени

Подтвердите перевод по имени (выплата наличными), используя `operation-id`, полученный на этапе валидации.

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/confirm" />