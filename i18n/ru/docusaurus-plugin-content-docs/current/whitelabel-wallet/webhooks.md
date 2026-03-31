---
sidebar_position: 13
---

import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Вебхуки

Уведомления в реальном времени о событиях транзакций, изменениях статуса KYC и авторизациях карт.

## Уведомление о транзакции
PayPorter отправляет `POST`-запрос на настроенный вами URL вебхука для каждого финансового события.

**Пример данных (Payload):**
```json
{
  "walletId": 13920918,
  "transactionType": "CARD_SALE",
  "amount": 100.1,
  "currency": "TRY",
  "debtCredit": "D",
  "merchantName": "eBay S* San Jose USA"
}
```

---

## Авторизация карты
Запрос авторизации в реальном времени для операций по карте.

:::important
Ответьте в течение **300 мс** со статусом `200 OK`. Если ответ не получен, транзакция **одобряется по умолчанию**.
:::

**Пример данных (Payload):**
```json
{
  "ref_number": "47004583620",
  "amount": 100.10,
  "currency_code": "TRY"
}
```

---

## Изменение статуса KYC
Уведомление об обновлении статуса KYC кошелька.

**Пример одобрения:**
<ApiResponseSelector>

```json title="KYC одобрен"
{
  "walletLevel": "CONFIRMED",
  "kycStatus": "APPROVED"
}
```

</ApiResponseSelector>

**Пример отклонения:**
<ApiResponseSelector>

```json title="KYC отклонен"
{
  "walletLevel": "UN_CONFIRMED",
  "kycStatus": "REJECTED",
  "kycFailureCode": "AML_REJECTED"
}
```

</ApiResponseSelector>