---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Создать перевод EFT

Инициируйте новый перевод EFT на турецкий банковский счет.

<ApiEndpoint method="POST" url="/eft-api/V2/transfer/create" />

:::tip Мультивалютные переводы
Если вы отправляете средства в валюте, отличной от валюты вашего операционного счета (например, отправляете TRY со счета USD), вы должны сначала получить `exchangeId` через эндпоинт **[Exchange (Обмен)](./exchange)**.
:::

**Параметры запроса**

<Tabs>
  <TabItem value="table" label="Параметры" default>
### Параметры запроса перевода

| Параметр           | Обязательно | Тип    | Описание |
|--------------------|-------------|--------|-------------|
| amount             | Да          | number | Сумма перевода в указанной валюте. |
| currency           | Да          | string | Трехбуквенный код валюты ISO 4217 (например, TRY). |
| receiverAccount    | Да          | string | IBAN или номер счета получателя в зависимости от типа перевода. |
| receiverCardNumber | Нет         | string | Номер кредитной карты получателя в зависимости от типа перевода. |
| fromCountry        | Да          | string | Трехбуквенный код страны отправителя ISO 3166-1 alpha-3. |  
| receiverInfo       | Да          | object | Информация о получателе. См. [EftPersonInfo](#eftpersoninfo). |
| senderExtFirmRefId | Да          | string | Уникальный справочный ID, созданный клиентской системой. |
| senderInfo         | Да          | object | Информация об отправителе. См. [EftPersonInfo](#eftpersoninfo). |
| transferReason     | Да          | string | Причина перевода. См. [EftTransferReason](#efttransferreason). |
| transferType       | Да          | string | Метод перевода (`TO_IBAN` или `TO_CREDIT_CARD`). |
| comment            | Нет         | string | Необязательная информация о переводе. |
| exchangeId         | Нет         | string | Справочный ID валютной операции, если применяется конвертация. См. [Exchange (Обмен)](./exchange). |

  </TabItem>
  <TabItem value="request_example" label="Пример запроса">
    ```json
    {
        "amount": 150.23,
        "comment": "Оплата счета за консультационные услуги",
        "currency": "TRY",
        "receiverAccount": "TR330006100519786457841326",
        "senderExtFirmRefId": "b7e4c4c2-8a3f-4f42-b3c6-9e8f6f3d0a91",
        "transferDate": "2026-03-06",
        "transferReason": "COMMERCIAL_PAYMENTS",
        "transferType": "TO_IBAN",
        "fromCountry": "DEU",
        "exchangeId": "EXC-123456",
        "receiverInfo": {
          "birthDay": "1992-05-14",
          "birthPlace": "Istanbul",
          "middleName": "Mehmet",
          "firstName": "Ahmet",
          "lastName": "Yılmaz",
          "address": "Atatürk Mah. Ertuğrul Gazi Sk. No:12 D:4 Kadıköy Istanbul",
          "addressCountryCode": "TUR",
          "company": false,
          "countryPhoneCode": 90,
          "phoneNumber": 5324567890,
          "email": "ahmet.yilmaz@example.com",
          "identityNumber": "27894561234"
        },
        "senderInfo": {
          "birthDay": "1988-11-02",
          "birthPlace": "Berlin",
          "middleName": "Johann",
          "firstName": "Michael",
          "lastName": "Schneider",
          "address": "Alexanderplatz 7, 10178 Berlin",
          "addressCountryCode": "DEU",
          "company": false,
          "countryPhoneCode": 49,
          "phoneNumber": 1512345678,
          "email": "m.schneider@example.de",
          "identityNumber": "D123456789"
        }
}
```

  </TabItem>
</Tabs>

### EftPersonInfo

Представляет идентификационную информацию участника перевода.
Используется как для полей `senderInfo`, так и для `receiverInfo`.

| Параметр           | Обязательно для      | Тип    | Описание |
|--------------------|----------------------|--------|-------------|
| firstName          | Отправитель и Получатель | string | Имя. |
| lastName           | Отправитель и Получатель | string | Фамилия. |
| middleName         | Нет                  | string | Отчество. |
| birthDay           | Отправитель          | string | Дата рождения в формате ГГГГ-ММ-ДД. |
| birthPlace         | Отправитель          | string | Место рождения. |
| address            | Нет                  | string | Адрес. |
| addressCountryCode | Нет                  | string | Трехбуквенный код страны ISO 3166-1 alpha-3. |
| company            | Нет                  | boolean | Является ли получатель компанией. По умолчанию false. |
| countryPhoneCode   | Нет                  | number | Телефонный код страны. |
| phoneNumber        | Нет                  | number | Номер телефона. |
| email              | Нет                  | string | Адрес электронной почты. |
| identityNumber     | Нет                  | string | Идентификационный номер. |

## EftTransferReason

Часто используемые причины платежей (требуются для соблюдения нормативных требований).

| Значение | Описание |
| :--- | :--- |
| `HOME_RENT` | Аренда жилья |
| `OFFICE_RENT` | Аренда офиса |
| `OTHER_RENT` | Другая аренда |
| `DUES` | Членские взносы |
| `EDUCATION` | Образование |
| `CREDIT_CARD_DEBT` | Долг по кредитной карте |
| `STAFF_PAYMENTS` | Выплаты персоналу |
| `E_COMMERCE_PAYMENTS` | Платежи по электронной коммерции |
| `OTHER_PAYMENTS` | Другие платежи |
| `COMMERCIAL_PAYMENTS` | Коммерческие платежи |
| `INDIVIDUAL_PAYMENTS` | Индивидуальные платежи |
| `INVESTMENT` | Инвестиции |
| `FINANCIAL` | Финансовые операции |


**Ответ (Response)**

<Tabs>
  <TabItem value="table" label="Параметры ответа" default>

### Ответ на создание EFT

| Параметр           | Обязательно | Тип    | Описание |
|--------------------|-------------|--------|-------------|
| transferOrderRefId | Да          | number | Уникальный ссылочный ID, созданный клиентской системой. |
| status             | Да          | object | Статус перевода. См. [Жизненный цикл EFT](./eft-flow). |
| senderExtFirmRefId | Да          | string | Отправленный уникальный ссылочный ID. |

  </TabItem>
  <TabItem value="response_example" label="Пример ответа">
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
        "transferOrderRefId": 47004907882,
        "status": {
            "statusCode": 10,
            "statusName": "Yeni",
            "statusDescription": "NEW",
            "statusReasonMessageCode": null,
            "statusReasonMessageDetail": null
        },
        "senderExtFirmRefId": "TEST-13223234"
    }
}
```

```json status="406" title="senderExtFirmRefId должен быть уникальным"
{
    "header": {
        "success": false,
        "code": "2012",
        "message": "EFT DEMAND FROM EXTERNAL REFERENCE CODE PREVIOUS DEMANDS SENDED",
        "messageCode": "EFT_DEMAND_FROM_EXT_REF_CODE_PREVIOUS_DEMANDS_SENDEND"
    },
    "responseObject": null
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
