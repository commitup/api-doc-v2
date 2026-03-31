---
sidebar_position: 1
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Проверить - На банковский счет

Проверьте запрос на денежный перевод непосредственно на банковский счет, IBAN или карту, привязанную к счету.

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-account/validate" />