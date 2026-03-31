---
sidebar_position: 3
---

# Поиск платежа

Эта конечная точка получает информацию о платеже с использованием контрольного номера. `searchUUID`, возвращаемый в ответе, необходим для этапа проверки.

<ApiEndpoint method="POST" url="/mt-api/V2/moneypayment/search" />

### Заголовки запроса

| Заголовок | Обязательно | Значение |
| :--- | :--- | :--- |
| externalfirm-user-code | Да | Ваш уникальный код пользователя фирмы. |
| invoker | Да | `API` |
| Authorization | Да | Bearer `{{auth_token}}` |
| Content-Type | Да | `application/json` |

### Параметры запроса

<Tabs>
  <TabItem value="table" label="Параметры" default>

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| externalFirmCode | Да | number | ID фирмы (из Списка платежных фирм). |
| externalFirmReferenceNo | Да | string | Контрольный номер, предоставленный отправителем. |

  </TabItem>
  <TabItem value="example" label="Пример запроса">

```json
{
  "externalFirmCode": 1,
  "externalFirmReferenceNo": "00275640117"
}
```

  </TabItem>
</Tabs>

## Ответ

<ApiResponseSelector>
<Tabs>
  <TabItem value="fields" label="Поля ответа" default>

| Поле | Тип | Описание |
| :--- | :--- | :--- |
| amount | number | Сумма транзакции. |
| currency | string | Название валюты. |
| currencyCode | number | Код валюты ISO. |
| externalFirmCode | number | Код фирмы. |
| externalFirmName | string | Название фирмы. |
| externalFirmReferenceNo | string | Оригинальный контрольный номер. |
| receiver | object | Детали получателя. См. [Person Object](../money-transfers/person-object). |
| searchUUID | string | Уникальный ID поиска, необходимый для проверки. |
| sendDate | string | Дата отправки перевода. |
| sender | object | Детали отправителя. См. [Person Object](../money-transfers/person-object). |
| senderCountryCode | string | Код страны отправителя ISO. |
| senderCountryName | string | Название страны отправителя. |

  </TabItem>
  <TabItem value="example" label="Пример ответа">

```json status="200" title="Success"
{
  "body": {
    "responseObject": {
      "amount": 100.0,
      "currency": "USD",
      "currencyCode": 840,
      "externalFirmCode": 1,
      "externalFirmName": "MoneyGram",
      "externalFirmReferenceNo": "00275640117",
      "receiver": { /* Person Object */ },
      "searchUUID": "550e8400-e29b-41d4-a716-446655440000",
      "sendDate": "2022-12-28T06:46:22.714Z",
      "sender": { /* Person Object */ },
      "senderCountryCode": "USA",
      "senderCountryName": "United States"
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
