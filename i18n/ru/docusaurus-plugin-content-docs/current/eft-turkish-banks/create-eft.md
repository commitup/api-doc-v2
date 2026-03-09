---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Создать перевод EFT

Инициируйте новый перевод EFT на турецкий банковский счет.

<ApiEndpoint method="POST" url="/send-eft" />

**Параметры запроса**

<Tabs>
  <TabItem value="table" label="Параметры" default>
    | Параметр | Обязательно | Тип   | Описание |
    |-----------|---------|-------|----------|
    | amount | Да | number | Сумма перевода |
    | comment | Нет | string | Описание платежа / Комментарий |
    | currency | Да | string | Код валюты (например, TRY) |
    | receiverAccount | Да | string | IBAN или номер счета получателя |
    | receiverInfo | Да | object | Информация о получателе (EftPersonInfo) |
    | senderExtFirmRefId | Да | string | Ваш внутренний уникальный ID ссылки |
    | senderInfo | Да | object | Информация об отправителе (EftPersonInfo) |
    | transferReason | Да | string | Причина перевода |
    | transferType | Да | string | Тип перевода (например, TO_IBAN) |
    | exchangeId | Нет | string | Опциональный ID ссылки для обмена валюты |
  </TabItem>
  <TabItem value="request_example" label="Пример запроса">
    ```json
    {
      "amount": 500,
      "comment": "Аренда за март",
      "currency": "TRY",
      "receiverAccount": "TR123456789012345678901234",
      "receiverInfo": {
        "name": "Ahmet Yilmaz"
      },
      "senderExtFirmRefId": "AB3566AVC",
      "senderInfo": {
        "name": "Jane Doe"
      },
      "transferReason": "АРЕНДА",
      "transferType": "TO_IBAN",
      "exchangeId": "EXC-123456"
    }
    ```
  </TabItem>
</Tabs>

**Ответ (Response)**

<ApiResponseSelector>

```json status="200" title="Успешно"
{
  "header": {
    "success": true,
    "code": "0",
    "message": "Перевод EFT инициирован",
    "messageCode": "OPERATION_SUCCESS"
  },
  "responseObject": {
    "transactionId": "EFT-987654321",
    "status": "PROCESSING",
    "estimatedCompletion": "2026-03-06T18:00:00Z"
  }
}
```

```json status="406" title="Недостаточно средств"
{
    "header": {
        "success": false,
        "code": "102",
        "message": "Недостаточно средств для этой транзакции",
        "messageCode": "BALANCE_INSUFFICIENT"
    },
    "responseObject": null
}
```

</ApiResponseSelector>
