---
sidebar_position: 3
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Предварительная авторизация (Pre-Authorization)

Выполните транзакцию предварительной авторизации, чтобы зарезервировать средства на карте без их немедленного списания.

<ApiEndpoint method="POST" url="/api/pre-authorization" />

### Параметры запроса (Request Parameters)

<Tabs>
  <TabItem value="table" label="Параметры" default>

| Параметр | Обязателен | Тип | Описание |
| :--- | :--- | :--- | :--- |
| orderId | Да | string | Номер заказа клиента для отслеживания (например, ORD-12345). |
| amount | Да | number | Сумма транзакции (например, 100.50). |
| currency | Да | string | Код валюты (например, TRY). |
| cardHolderName | Да | string | Имя держателя карты. |
| pan | Да | string | Номер карты (16 цифр) (например, 5421190122090656). |
| expiryMonth | Да | string | Месяц истечения срока действия карты (2 цифры, например, 04). |
| expiryYear | Да | string | Год истечения срока действия карты (2 цифры, например, 28). |
| cvv | Да | string | Код CVV (например, 916). |
| requestIp | Да | string | IP-адрес клиента, делающего запрос (например, 192.168.1.1). |
| requestPort | Да | number | Номер порта клиента, делающего запрос (например, 8080). |
| customerId | Нет | string | Необязательный уникальный идентификатор клиента (например, CUST-12345). |

  </TabItem>
  <TabItem value="example" label="Пример запроса">

```json
{
  "orderId": "ORD-12345",
  "amount": 100.50,
  "currency": "TRY",
  "cardHolderName": "John Doe",
  "pan": "5421190122090656",
  "expiryMonth": "04",
  "expiryYear": "28",
  "cvv": "916",
  "requestIp": "192.168.1.1",
  "requestPort": 8080,
  "customerId": "CUST-12345"
}
```

  </TabItem>
</Tabs>

## Ответ (Response)

Возвращает объект `ApiPaymentResponse` с подробностями предварительной авторизации.

<Tabs>
  <TabItem value="fields" label="Поля ответа" default>

| Поле | Тип | Описание |
| :--- | :--- | :--- |
| paymentId | string | Уникальный идентификатор платежа (UUID). |
| orderId | string | Номер заказа для отслеживания. |
| amount | number | Сумма транзакции. |
| installmentCount | number | Количество рассрочек. |
| currency | string | Код валюты. |
| merchantCommission | number | Комиссия, взимаемая с мерчанта. |
| status | string | Статус платежа (например, SUCCESS, FAILED, ENROLLED). |
| paymentDate | string | Дата и время платежа (формат ISO, например, 2023-05-01T14:30:00Z). |
| cardHolderName | string | Имя держателя карты. |
| pan | string | Маскированный номер карты (например, 411111******1111). |
| domInt | string | Внутренняя или международная транзакция (DOM/INT). |
| cardScheme | string | Платежная система (например, VISA, MASTERCARD). |
| cardType | string | Тип карты (например, CREDIT, DEBIT). |
| loyaltyCode | string | Код программы лояльности (если применимо). |
| externalTransactionId | string | Идентификатор транзакции от платежного провайдера. |
| authCode | string | Код авторизации от платежного провайдера. |
| resultCode | string | Код результата от платежного провайдера. |
| resultMessage | string | Сообщение о результате от платежного провайдера. |
| customerId | string | Уникальный идентификатор клиента (если был предоставлен). |

  </TabItem>
  <TabItem value="example" label="Пример ответа">

<ApiResponseSelector>

```json status="200" title="Успех"
{
  "paymentId": "123e4567-e89b-12d3-a456-426614174000",
  "orderId": "ORD-12345",
  "amount": 100.50,
  "installmentCount": 3,
  "currency": "TRY",
  "merchantCommission": 2.50,
  "status": "SUCCESS",
  "paymentDate": "2023-05-01T14:30:00Z",
  "cardHolderName": "John Doe",
  "pan": "411111******1111",
  "domInt": "DOM",
  "cardScheme": "VISA",
  "cardType": "CREDIT",
  "loyaltyCode": "GOLD123",
  "externalTransactionId": "EXT123456789",
  "authCode": "AUTH987654",
  "resultCode": "SUCCESS",
  "resultMessage": "Successful",
  "customerId": "CUST-12345"
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
