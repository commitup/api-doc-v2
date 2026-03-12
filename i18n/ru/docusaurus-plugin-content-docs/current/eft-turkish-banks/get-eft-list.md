---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Получить список переводов EFT

Получите историю ваших переводов EFT за определенный период времени.

<ApiEndpoint method="POST" url="/eft-api/V2/transfer/get-transfer-list" />

**Параметры запроса**

<Tabs>
  <TabItem value="table" label="Параметры" default>

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| startDate | Да | string | Дата начала поиска (например, `2026-03-01`). |
| endDate | Да | string | Дата окончания поиска (например, `2026-03-06`). |
| statusCode | Нет | number | Фильтрация результатов по конкретному [коду статуса EFT](./eft-flow#коды-статусов-eft). |

  </TabItem>
  <TabItem value="example" label="Пример запроса">

```json
{
  "startDate": "2026-03-01T00:00:00.000Z",
  "endDate": "2026-03-06T23:59:59.000Z",
  "statusCode": 20
}
```

  </TabItem>
</Tabs>

**Ответ**

<Tabs>
  <TabItem value="table" label="Параметры ответа" default>

| Параметр | Тип | Описание |
| :--- | :--- | :--- |
| eftTransferList | array | Список объектов, содержащих детали перевода. |

  </TabItem>
  <TabItem value="example" label="Пример ответа">

<ApiResponseSelector>

```json status="200" title="Успешно"
{
  "body": {
    "responseObject": {
      "eftTransferList": [
        {
          "transferOrderRefId": 47004907882,
          "senderExtFirmRefId": "TEST-13223234",
          "amount": 500,
          "currency": "TRY",
          "status": {
            "statusCode": 20,
            "statusName": "Completed",
            "statusDescription": "Transfer order is successfully sended receiver bank"
          },
          "transferDate": "2026-03-06T10:00:00.000Z"
        }
      ]
    },
    "restHeader": {
      "code": "1",
      "message": "OPERATION_DONE_SUCCESSFUL",
      "success": true,
      "messageCode": "OPERATION_DONE_SUCCESSFUL"
    }
  }
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
