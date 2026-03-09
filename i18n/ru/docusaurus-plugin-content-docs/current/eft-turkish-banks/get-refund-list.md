---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Получить список возвратов EFT

Получите список переводов EFT, которые были возвращены банком-получателем.

<ApiEndpoint method="POST" url="/eft-api/V2/transfer/get-refund-transfer-list" />

**Параметры запроса**

<Tabs>
  <TabItem value="table" label="Параметры" default>

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| startDate | Да | string | Дата начала поиска (например, `2026-03-01`). |
| endDate | Да | string | Дата окончания поиска (например, `2026-03-06`). |

  </TabItem>
  <TabItem value="example" label="Пример запроса">

```json
{
  "startDate": "2026-03-06T00:00:00.000Z",
  "endDate": "2026-03-06T23:59:59.000Z"
}
```

  </TabItem>
</Tabs>

**Ответ**

<Tabs>
  <TabItem value="table" label="Параметры ответа" default>

| Параметр | Тип | Описание |
| :--- | :--- | :--- |
| eftRefundTransferList | array | Список объектов, содержащих информацию о возврате. |

  </TabItem>
  <TabItem value="example" label="Пример ответа">

<ApiResponseSelector>

```json status="200" title="Успешно"
{
  "body": {
    "responseObject": {
      "eftRefundTransferList": [
        {
          "transferOrderRefId": 47004907882,
          "senderExtFirmRefId": "TEST-13223234",
          "amount": 500,
          "currency": "TRY",
          "refundDate": "2026-03-06T14:30:00.000Z",
          "refundDescription": "Счет закрыт",
          "status": {
            "statusCode": 50,
            "statusName": "Refund",
            "statusDescription": "Transfer is refunded by the receiver bank"
          }
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

:::tip Ежедневный мониторинг
Настоятельно рекомендуется проверять этот эндпоинт несколько раз в день, используя параметр `SYSDATE` (сегодня), чтобы оперативно обрабатывать возвраты. Для автоматических обновлений убедитесь, что ваши [вебхуки](./eft-flow#лучшие-практики) настроены.
:::
