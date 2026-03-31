---
sidebar_position: 5
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Подтверждение платежа

Эта конечная точка завершает запрос на платеж. Вы должны предоставить `operation-id`, полученный из заголовка ответа **Проверка платежа**.

<ApiEndpoint method="GET" url="/mt-api/V2/moneypayment/confirm" />

### Заголовки запроса

| Заголовок | Обязательно | Значение |
| :--- | :--- | :--- |
| externalfirm-user-code | Да | Ваш уникальный код пользователя фирмы. |
| operation-id | Да | ID, полученный из заголовка ответа **Проверка**. |
| Authorization | Да | Bearer `{{auth_token}}` |

## Ответ

<ApiResponseSelector>

<Tabs>
  <TabItem value="fields" label="Поля ответа" default>

| Поле | Тип | Описание |
| :--- | :--- | :--- |
| apiAgentTxnRefNo | string | Ваш контрольный номер транзакции. |
| processReferenceNo | number | Внутренний контрольный номер процесса PayPorter. |
| externalFirmReferenceNo | string | Контрольный номер фирмы. |

  </TabItem>
  <TabItem value="example" label="Пример ответа">

```json status="200" title="Success"
{
  "header": {
    "success": true,
    "code": "1",
    "message": "OPERATION_DONE_SUCCESSFUL",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "apiAgentTxnRefNo": "REF-123456",
    "processReferenceNo": 47000902951,
    "externalFirmReferenceNo": "47000756804"
  }
}
```

  </TabItem>

</Tabs>

</ApiResponseSelector>