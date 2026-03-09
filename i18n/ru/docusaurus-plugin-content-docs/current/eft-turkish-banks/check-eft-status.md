---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Проверить статус EFT

Проверьте текущий статус перевода EFT, используя ваш внутренний ID ссылки или ID ссылки PayPorter.

## Проверка по внешнему Ref ID фирмы

Используйте этот эндпоинт, если хотите запросить статус, используя ваш собственный уникальный ID ссылки.

<ApiEndpoint method="GET" url="/eft-api/V2/transfer/check-status-by-ext-firm-id/{senderExtFirmRefId}" />

### Параметры пути

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| senderExtFirmRefId | Да | string | Уникальный ID ссылки, сгенерированный вашей системой. |

---

## Проверка по Ref ID заказа на перевод

Используйте этот эндпоинт, если хотите запросить статус, используя ID ссылки PayPorter.

<ApiEndpoint method="GET" url="/eft-api/V2/transfer/check-status-by-transfer-order-ref/{transferOrderRefId}" />

### Параметры пути

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| transferOrderRefId | Да | number | Уникальный ID ссылки, сгенерированный PayPorter. |

---

## Ответ

Формат ответа идентичен для обоих эндпоинтов.

<Tabs>
  <TabItem value="table" label="Параметры ответа" default>

| Параметр | Тип | Описание |
| :--- | :--- | :--- |
| transferStatus | object | Подробная информация о статусе. |
| transferStatus.statusCode | number | Числовой код статуса. См. [Коды статусов EFT](./eft-flow#коды-статусов-eft). |
| transferStatus.statusName | string | Краткое название статуса (например, "Pending"). |
| transferStatus.statusDescription | string | Понятное описание статуса. |

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
    "transferStatus": {
      "statusCode": 30,
      "statusName": "Pending",
      "statusDescription": "Pending",
      "statusReasonMessageCode": null,
      "statusReasonMessageDetail": null
    }
  }
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>

:::info Конечный статус
Как только перевод достигает **Конечного статуса** (ЗАВЕРШЕНО, ОТКЛОНЕНО, ВОЗВРАТ или ОТМЕНА), рекомендуется прекратить опрос этого эндпоинта. Для получения обновлений в реальном времени без опроса рассмотрите возможность внедрения нашей [Системы вебхуков](./eft-flow#лучшие-практики).
:::

:::warning Ограничение частоты запросов
На индивидуальные запросы статуса распространяется ограничение в **60 запросов в минуту**. Для мониторинга большого объема транзакций используйте эндпоинт [Получить список переводов EFT](./get-eft-list).
:::
