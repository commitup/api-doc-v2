---
sidebar_position: 4
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Информация о кошельке и баланс

Получение текущего баланса, статуса и уровня KYC кошелька.

<ApiEndpoint method="GET" url="/wallet" />

### Ответ

<Tabs>
  <TabItem value="fields" label="Поля ответа" default>

| Поле | Тип | Описание |
|-------|------|-------------|
| tenantUserId | String | ID пользователя в системе арендатора (tenant). |
| walletId | number | Уникальный идентификатор кошелька. |
| totalBalance | number | Сумма наличных и других балансов. |
| cashBalance | number | Доступный баланс наличных. |
| currencyCode | String | Код валюты ISO (например, `TRY`). |
| walletStatus | String | Текущий статус кошелька. См. ниже. |
| walletLevel | String | Уровень верификации. См. ниже. |
| kycStatus | String | Статус прохождения KYC. См. ниже. |
| kycFailureCode | String | Причина сбоя KYC, если применимо. |

  </TabItem>
  <TabItem value="example" label="Пример ответа">

<ApiResponseSelector>

```json status="200" title="Успешно"
{
  "tenantUserId": "TESTTENANT0014",
  "walletId": 18341595,
  "totalBalance": 0,
  "cashBalance": 0,
  "currencyCode": "TRY",
  "walletStatus": "ACTIVE",
  "walletLevel": "UN_CONFIRMED",
  "kycStatus": "ANONYMOUS",
  "kycFailureCode": null
}
```

</ApiResponseSelector>

  </TabItem>

</Tabs>

---

## Справочные списки

### Статус кошелька
| Код     | Описание   |
|----------|---------------|
| ACTIVE   | Активен       |
| PASSIVE  | Пассивен      |
| BLOCKED  | Заблокирован  |

### Уровень кошелька
| Код         | Описание  |
|--------------|--------------|
| UN_CONFIRMED | KYC не пройден |
| CONFIRMED    | KYC подтвержден |

### Статус KYC
| Код                         | Описание                               |
|-----------------------------|-------------------------------------------|
| ANONYMOUS                   | Нет KYC - Анонимный                        |
| WAITING_TO_PHYSICAL_LOCATION| Ожидание физической доставки договора |
| WAITING_APPROVAL            | Ожидание одобрения                      |
| APPROVED                    | KYC одобрен                              |
| REJECTED                    | KYC отклонен                              |
| EXPIRED                     | Срок действия KYC истек                               |

### Код ошибки KYC 
| Код              | Описание                                      |
|-------------------|--------------------------------------------------|
| KPS_ERROR         | Данные удостоверения личности не совпадают (для граждан Турции) |
| AML_REJECTED      | Отклонено по причинам AML                      |
| APPROVAL_REJECTED | Отклонено из-за несоблюдения требований             |
| APPROVAL_EXPIRED  | Требования не были выполнены вовремя                     |