---
sidebar_position: 5
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# История транзакций

Получение списка транзакций для аутентифицированного кошелька.

<ApiEndpoint method="POST" url="/wallet/transactions" />

### Параметры запроса

```json
{
  "startDate": "2025-07-16",
  "endDate": "2025-07-16"
}
```

### Ответ

<ApiResponseSelector>

```json status="200" title="Успешно"
[
  {
    "transactionId": "f66ef144-85cf-43a6-a3cd-bc4e1f858fd1",
    "amount": 105,
    "feeAmount": 5,
    "currencyType": "TRY",
    "transactionDate": "2025-07-08T16:00:13.738+0300",
    "transactionName": "Внутренний перевод",
    "debtCredit": "D"
  }
]
```

</ApiResponseSelector>

| Поле | Описание |
|-------|-------------|
| `debtCredit` | `D` для дебета (исходящий), `C` для кредита (входящий). |
| `transactionName` | Читаемое название типа транзакции. |