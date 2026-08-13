---
sidebar_position: 5
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Детали перевода

Запрос статуса и полных деталей транзакции денежного перевода.

## Получить детали перевода

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/get-transfer-details/{processReferenceNo}" />

---

## Получить детали по ссылке агента

<ApiEndpoint method="GET" url="/mt-api/V2/moneysend/detail-by-api-txn" />