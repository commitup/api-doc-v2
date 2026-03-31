---
sidebar_position: 6
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Детали платежа

Запросите детали завершенного платежа, используя `processReferenceNo`.

<ApiEndpoint method="GET" url="/mt-api/V2/moneypayment/getdetail?processReferenceNo={processReferenceNo}" />

### Заголовки запроса

| Заголовок | Обязательно | Значение |
| :--- | :--- | :--- |
| Authorization | Да | Bearer `{{auth_token}}` |

### Параметры запроса

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| processReferenceNo | Да | number | Внутренний контрольный номер, возвращенный запросом **Подтверждение**. |

## Ответ

<ApiResponseSelector>

<Tabs>
  <TabItem value="fields" label="Поля ответа" default>

| Поле | Тип | Описание |
| :--- | :--- | :--- |
| agentCommisionAmount | number | Сумма комиссии агента. |
| agentCommisionAmountCurrency | string | Валюта комиссии. |
| externalFirmReferenceNo | string | Основной контрольный номер. |
| externalFirmReferenceNo2 | string | Вторичный контрольный номер (если применимо). |
| fromCountryName | string | Страна происхождения. |
| fromExternalFirmName | string | Фирма происхождения. |
| incomingAmount | number | Выплаченная сумма. |
| incomingAmountCurrency | string | Выплаченная валюта. |
| paymentDate | string | Дата платежа. |
| paymentStatusName | string | Текущий статус платежа. |
| payoutCountryName | string | Страна выплаты. |
| payoutExternalFirmName | string | Фирма выплаты. |
| processReferenceNo | number | Контрольный номер PayPorter. |
| receiver | object | Детали получателя. См. [Person Object](../resources/person-object). |
| sender | object | Детали отправителя. См. [Person Object](../resources/person-object). |

  </TabItem>
  <TabItem value="example" label="Пример ответа">

```json status="200" title="Success"
{
  "body": {
    "responseObject": {
      "agentCommisionAmount": 5.0,
      "agentCommisionAmountCurrency": "TRY",
      "externalFirmReferenceNo": "00275640117",
      "externalFirmReferenceNo2": "47000756804",
      "fromCountryName": "United States",
      "fromExternalFirmName": "MoneyGram",
      "incomingAmount": 1800.0,
      "incomingAmountCurrency": "TRY",
      "paymentDate": "2022-12-28T12:00:36.633Z",
      "paymentStatusName": "COMPLETED",
      "payoutCountryName": "Turkey",
      "payoutExternalFirmName": "PayPorter",
      "processReferenceNo": 47000902951,
      "receiver": { /* Person Object */ },
      "sender": { /* Person Object */ }
    },
    "restHeader": {
      "code": "1",
      "message": "Success",
      "success": true
    }
  },
  "statusCode": "OK",
  "statusCodeValue": 200
}
```

  </TabItem>

</Tabs>

</ApiResponseSelector>