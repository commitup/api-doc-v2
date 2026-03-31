---
sidebar_position: 6
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Внутренние переводы

Перевод денег между кошельками внутри одной системы whitelabel.

## 1. Проверка перевода
<ApiEndpoint method="POST" url="/wallet/transfer/validate" />

Проверяет, существует ли целевой кошелек и достаточно ли средств на балансе отправителя.

**Пример запроса:**
```json
{
  "toWalletId": 13359415,
  "amount": 12.25,
  "currency": "TRY",
  "comment": "Тестовый перевод"
}
```

## 2. Подтверждение перевода
<ApiEndpoint method="POST" url="/wallet/transfer/confirm" />

Выполняет перевод, используя `transactionId`, полученный на этапе проверки.

**Пример запроса:**
```json
{
  "transactionId": "f66ef144-85cf-43a6-a3cd-bc4e1f858fd1"
}
```

### Ответ
<ApiResponseSelector>

```json status="200" title="Успешно"
{
  "transferReference": "47004897230",
  "transactionId": "f66ef144-85cf-43a6-a3cd-bc4e1f858fd1",
  "amount": 12.25,
  "feeAmount": 0.25
}
```

</ApiResponseSelector>