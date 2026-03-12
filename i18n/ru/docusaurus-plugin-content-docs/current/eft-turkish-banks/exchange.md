---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Обмен валюты (Exchange)

Используйте этот эндпоинт для конвертации валюты между иностранными валютами и TRY. Это полезно при отправке средств в валюте, отличной от валюты вашего операционного счета.

<ApiEndpoint method="POST" url="/eft-api/V2/exchange" />

## Обзор

Сервис обмена позволяет:
- Конвертировать иностранную валюту в TRY.
- Конвертировать TRY в иностранную валюту.
- Получить действительный `exchangeId`, необходимый для инициирования мультивалютного перевода EFT.

:::important Срок действия
Сгенерированный `exchangeId` действителен в течение **1 минуты**. Если вы не инициируете перевод в течение этого времени, необходимо запросить новый `exchangeId`.
:::

---

## Формат запроса

<Tabs>
  <TabItem value="table" label="Параметры" default>

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| amountForeign | Нет | number | Сумма в иностранной валюте. |
| currencyForeign | Да | string | Код иностранной валюты (например, `USD`, `EUR`). |
| amountTRY | Нет | number | Сумма в TRY. |
| commercial | Нет | boolean | Установите значение `true` для коммерческих транзакций. |

  </TabItem>
  <TabItem value="example" label="Пример запроса">

```json
{
  "amountForeign": 100,
  "currencyForeign": "USD",
  "amountTRY": null,
  "commercial": false
}
```

  </TabItem>
</Tabs>

---

## Ответ

<Tabs>
  <TabItem value="table" label="Параметры ответа" default>

| Параметр | Тип | Описание |
| :--- | :--- | :--- |
| exchangeId | string | Уникальный ID сессии обмена. Действителен 60 секунд. |
| rate | number | Курс обмена, примененный к транзакции. |
| convertedAmount | number | Результирующая сумма после конвертации. |

  </TabItem>
  <TabItem value="example" label="Пример ответа">

<ApiResponseSelector>

```json status="200" title="Успешно"
{
  "header": {
    "success": true,
    "code": "1",
    "message": "OPERATION_DONE_SUCCESSFUL",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "exchangeId": "EX-88234-9912",
    "rate": 31.45,
    "amountForeign": 100,
    "currencyForeign": "USD",
    "amountTRY": 3145,
    "validUntil": "2026-03-09T17:45:00.000Z"
  }
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
