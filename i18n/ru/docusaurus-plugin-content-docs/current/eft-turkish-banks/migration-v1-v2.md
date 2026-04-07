---
sidebar_position: 1.5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Руководство по миграции EFT API: V1 -> V2

Этот документ представляет собой подробное руководство по переходу с **EFT API версии 1** на **EFT API версии 2**.

## 1. Изменения базового URL

Префикс базового URL был обновлен и теперь включает версию.

| Версия | Путь базового URL |
| :--- | :--- |
| **V1** | `eft-api/` |
| **V2** | `eft-api/V2/` |

---

## 2. Сопоставление и переименование эндпоинтов

В V2 несколько эндпоинтов были переименованы или упрощены.

| Метод | Эндпоинт V1 | Эндпоинт V2 | Статус |
| :--- | :--- | :--- | :--- |
| **Создать перевод** | `/transfer/create-money-transfer` | `/transfer/create` | **Переименовано** |
| **Проверить статус (Ext Ref)** | `/transfer/check-transfer-status-by-ext-firm-id/{id}` | `/transfer/check-status-by-ext-firm-id/{id}` | **Упрощено** |
| **Проверить статус (Order Ref)** | `/transfer/check-transfer-status-by-transfer-order-ref/{id}` | `/transfer/check-status-by-transfer-order-ref/{id}` | **Упрощено** |
| **Отменить перевод** | `/transfer/cancel-transfer` | `/transfer/cancel` | **Переименовано** |
| **Список переводов** | `/transfer/get-transfer-list` | `/transfer/get-transfer-list` | Путь остался прежним (База изменилась) |
| **Список возвратов** | `/transfer/get-refund-transfer-list` | `/transfer/get-refund-transfer-list` | Путь остался прежним (База изменилась) |
| **Курс обмена** | N/A | `/exchange` | **НОВОЕ** |

---

## 3. Изменения в теле запроса (Request Body)

:::info
**EFT V2 API** в основном вносит изменения в структуру **запроса** (особенно в методе `create`). Структуры **ответов (response)** для всех эндпоинтов остаются идентичными версии 1, чтобы обеспечить плавный переход для вашей существующей логики парсинга.
:::

Структура запроса стала более лаконичной и стандартизированной.

### Изменения полей верхнего уровня

| Поле V1 | Поле V2 | Категория | Примечание |
| :--- | :--- | :--- | :--- |
| `transferDate` | **Удалено** | Удаление | Обрабатывается внутренне в V2. |
| `fec` | **`currency`** | **Объект -> Строка** | В V1 использовалось `{"fecId": 1}`; В V2 используется `"TRY"`. |
| `receiverAccount` | `receiverAccount` | **Объект -> Строка** | В V1 использовалось `{"accountNo": "..."}`; В V2 используется либо `receiverAccount` (для IBAN), либо `receiverCardNumber` (для кредитной карты) в зависимости от `transferType`. |
| `transferType` | `transferType` | **Объект -> Enum** | В V1 использовалось `{"transferTypeId": 4}`; В V2 используются `TO_IBAN` или `TO_CREDIT_CARD`. |
| `transferReason` | `transferReason` | **Объект -> Enum** | В V1 использовалось `{"reasonTypeId": 99}`; В V2 используются enum, например, `FAMILY_SUPPORT`. См. **[EftTransferReason](./create-eft#efttransferreason)** |
| N/A | `fromCountry` | **Новое поле** | Код ISO alpha-3 (например, "TUR"). |

### Изменения информации о лицах (`senderInfo`, `receiverInfo`)

| Поле V1 | Поле V2 | Детали |
| :--- | :--- | :--- |
| `name` | **`firstName`** | Переименовано |
| `midName` | **`middleName`** | Переименовано |
| `surName` | **`lastName`** | Переименовано |
| `nationalCountryCode`| `nationalCountryCode`| **Integer -> String** (например, `152` -> `"TUR"`) |

### Пример сравнения JSON

<div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
  <div style={{ flex: '1 1 400px', minWidth: '400px' }}>
    <h4>ВЕРСИЯ 1 (Старая)</h4>

```json
{
  "amount": 1000.0,
  "comment": "Поддержка семьи, AHMET CAN YILMAZ",
  "fec": {
    "fecId": 1
  },
  "receiverAccount": {
    "accountNo": "TR840013400002108617000001"
  },
  "receiverInfo": {
    "countryPhoneCode": 90,
    "fullName": "AYŞE DEMİR",
    "name": "AYŞE",
    "phoneNumber": "5551234567",
    "surName": "DEMİR"
  },
  "senderExtFirmRefId": "EX-REF-123456",
  "senderInfo": {
    "address": "TURKEY, ISTANBUL, SISLI, MERKEZ MAH. 123 SK. NO:1",
    "birthDay": "1985-05-15T00:00:00Z",
    "birthPlace": "ISTANBUL",
    "countryPhoneCode": 90,
    "fullName": "AHMET CAN YILMAZ",
    "identityNumber": "12345678901",
    "midName": "CAN",
    "name": "AHMET",
    "nationalCountryCode": "TUR",
    "phoneNumber": "5557654321",
    "surName": "YILMAZ"
  },
  "transferDate": "2026-04-07T07:55:47.912639Z",
  "transferReason": {
    "reasonTypeId": 99
  },
  "transferType": {
    "transferTypeId": 4
  }
}
```

  </div>
  <div style={{ flex: '1 1 400px', minWidth: '400px' }}>
    <h4>ВЕРСИЯ 2 (Новая)</h4>

```json
{
  "amount": 1000.00,
  "comment": "Поддержка семьи, AHMET YILMAZ",
  "currency": "TRY",
  "receiverAccount": "TR840013400002108617000001",
  "senderExtFirmRefId": "NEW-REF-7890",
  "transferReason": "FAMILY_SUPPORT",
  "transferType": "TO_IBAN",
  "fromCountry": "TUR",
  "receiverInfo": {
    "firstName": "AYŞE",
    "lastName": "DEMİR",
    "nationalCountryCode": "TUR",
    "countryPhoneCode": 90,
    "phoneNumber": "5551234567"
  },
  "senderInfo": {
    "firstName": "AHMET",
    "middleName": "CAN",
    "lastName": "YILMAZ",
    "nationalCountryCode": "TUR",
    "countryPhoneCode": 90,
    "phoneNumber": "5557654321",
    "address": "TURKEY, ISTANBUL, SISLI, MERKEZ MAH. 123 SK. NO:1",
    "birthDay": "1985-05-15",
    "birthPlace": "ISTANBUL",
    "company": false,
    "email": "ahmet.yilmaz@email.com",
    "identityNumber": "12345678901"
  }
}
```

  </div>
</div>

### Пример ответа (Response)

Ответ такой же, как в V1. Без изменений.

```json
{
    "responseObject": {
        "transferOrderRefId": 47004813026,
        "status": {
            "statusCode": 10,
            "statusName": "New",
            "statusDescription": "New",
            "statusReasonMessageCode": null,
            "statusReasonMessageDetail": null
        },
        "senderExtFirmRefId": "TEST-135542"
    }
}
```

---

## 4. Новые возможности в V2

### Вебхуки
**Цель:** Вместо опроса эндпоинта `check-status`, теперь вы можете получать push-уведомления в реальном времени при изменении статуса перевода.
**Подробности:** См. **[Документацию по вебхукам](./webhooks)**.

### Валидация IBAN
**Эндпоинт:** `POST /validate-iban`
**Цель:** Проверьте формат IBAN и существование счета перед попыткой перевода, чтобы предотвратить ошибки. См. **[Документацию по валидации IBAN](./validate-iban)**.
