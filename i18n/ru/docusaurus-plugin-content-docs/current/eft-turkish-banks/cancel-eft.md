---
sidebar_position: 9
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Отмена перевода EFT

Отмените запрос на перевод EFT, который еще не был обработан банком-получателем.

<ApiEndpoint method="GET" url="/eft-api/V2/transfer/cancel" />

## Обзор

Отменить можно только те переводы, которые находятся в статусе **NEW**. Как только перевод переходит в статус `PENDING` или `COMPLETED`, его больше нельзя отменить через этот эндпоинт.

---

## Параметры пути

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| transferOrderRefId | Да | number | Уникальный ID ссылки, сгенерированный PayPorter для перевода. |

---

## Ответ

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
    "cancelledTransferInfo": {
      "transferOrderRefId": 47000594670,
      "transferDate": "2023-01-17T00:00:00.000+0300",
      "amount": 100,
      "currency": "TRY",
      "status": {
        "statusCode": 60,
        "statusName": "Cancel",
        "statusDescription": "Transfer is cancelled"
      },
      "senderExtFirmRefId": "TEST233",
      "cancellationDate": "2026-03-09T17:40:00.000Z"
    }
  }
}
```

```json status="400" title="Невозможно отменить"
{
  "header": {
    "success": false,
    "message": "ORDER_ALREADY_PROCESSED"
  }
}
```

</ApiResponseSelector>

:::info Результат
В случае успеха статус перевода изменится на **CANCEL** (код 60). Вам следует прекратить опрос обновлений для этой транзакции.
:::
