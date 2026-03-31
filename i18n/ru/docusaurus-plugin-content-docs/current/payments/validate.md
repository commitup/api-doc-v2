---
sidebar_position: 4
---

# Проверка платежа

Эта конечная точка проверяет запрос на платеж с информацией о получателе.

> [!IMPORTANT]
> Ответ на этот запрос содержит `operation-id` в заголовках. Этот `operation-id` должен быть использован в последующем запросе **Подтверждение платежа**.

<ApiEndpoint method="POST" url="/mt-api/V2/moneypayment/validate" />

### Заголовки запроса

| Заголовок | Обязательно | Значение |
| :--- | :--- | :--- |
| externalfirm-user-code | Да | Ваш уникальный код пользователя фирмы. |
| Authorization | Да | Bearer `{{auth_token}}` |
| Content-Type | Да | `application/json` |

### Параметры запроса

<Tabs>
  <TabItem value="table" label="Параметры" default>

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| receiver | Да | object | Детали получателя. См. [Person Object](../money-transfers/person-object). |
| apiAgentTxnRefNo | Да | string | Ваш уникальный контрольный номер транзакции. |
| searchUUID | Да | string | UUID, полученный из ответа **Поиск платежа**. |
| transactionAmount | Да | number | Точная сумма к выплате. |
| transactionAmountCurrency | Да | string | Код валюты ISO для суммы. |

  </TabItem>
  <TabItem value="example" label="Пример запроса">

```json
{
  "receiver": { /* Person Object */ },
  "apiAgentTxnRefNo": "REF-123456",
  "searchUUID": "550e8400-e29b-41d4-a716-446655440000",
  "transactionAmount": 100.0,
  "transactionAmountCurrency": "USD"
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
| receiver | object | Проверенные детали получателя. |
| sender | object | Проверенные детали отправителя. |
| incomingAmount | number | Оригинальная сумма отправки. |
| incomingAmountCurrency | string | Оригинальная валюта. |
| incomingAmountLocal | number | Сумма в местной валюте (если применимо). |
| incomingAmountLocalExchangeRate | number | Используемый обменный курс. |
| externalFirmReferenceNo | string | Контрольный номер фирмы. |
| fromCountry | string | Код страны отправителя. |
| fromCountryName | string | Название страны отправителя. |
| apiAgentCommissionAmount | number | Сумма комиссии агента. |
| apiAgentCommissionAmountCurrency | string | Валюта комиссии. |
| fromExternalFirmCode | number | Код фирмы-отправителя. |
| fromExternalFirmName | string | Название фирмы-отправителя. |
| apiAgentTxnRefNo | string | Ваш контрольный номер транзакции. |
| searchUUID | string | Использованный поиск UUID. |

  </TabItem>
  <TabItem value="example" label="Пример ответа">

```json status="200" title="Success"
{
  "body": {
    "responseObject": {
      "receiver": { /* Person Object */ },
      "sender": { /* Person Object */ },
      "incomingAmount": 100.0,
      "incomingAmountCurrency": "USD",
      "incomingAmountLocal": 1800.0,
      "incomingAmountLocalExchangeRate": 18.0,
      "externalFirmReferenceNo": "00275640117",
      "fromCountry": "USA",
      "fromCountryName": "United States",
      "apiAgentCommissionAmount": 5.0,
      "apiAgentCommissionAmountCurrency": "TRY",
      "fromExternalFirmCode": 1,
      "fromExternalFirmName": "MoneyGram",
      "apiAgentTxnRefNo": "REF-123456",
      "searchUUID": "550e8400-e29b-41d4-a716-446655440000"
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
