---
sidebar_position: 8
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Депозиты и Вывод средств

Управляйте средствами, поступающими в кошелек и покидающими его, через кассовые операции или операции с основным счетом.

## Внесение наличных (Депозит)
Для внесения наличных в кошелек с использованием ПИН-кода от поддерживаемой системы денежных переводов.

### 1. Проверка платежа
<ApiEndpoint method="POST" url="/wallet/payment/validate" />

**Пример запроса:**
```json
{
  "externalFirmCode": 47,
  "referenceNo": 47004897230
}
```

### 2. Подтверждение платежа
<ApiEndpoint method="POST" url="/wallet/payment/confirm" />

---

## Дебет (Из кошелька на основной счет)
Вывод средств из кошелька на ваш основной счет.

### 1. Проверка дебета
<ApiEndpoint method="POST" url="/wallet/debit/validate" />

**Пример запроса:**
```json
{
  "amount": 170.50,
  "currency": "TRY",
  "reason": "CUSTOM_DEBIT_REASON"
}
```

### 2. Подтверждение дебета
<ApiEndpoint method="POST" url="/wallet/debit/confirm" />

---

## Кредит (С основного счета в кошелек)
Внесение средств с вашего основного счета в конкретный кошелек.

### 1. Проверка кредита
<ApiEndpoint method="POST" url="/wallet/credit/validate" />

### 2. Подтверждение кредита
<ApiEndpoint method="POST" url="/wallet/credit/confirm" />