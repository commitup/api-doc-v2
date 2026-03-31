---
sidebar_position: 3
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Регистрация кошелька

### Регистрация и получение ключа доступа

Создает новый кошелек и возвращает ключ доступа для генерации защищенных данных.

<ApiEndpoint method="POST" url="/wallet/register" />

:::info Аутентификация
Требуются заголовки **API-ключа**. Используйте учетные данные корпоративного кошелька в заголовках `X-Wallet-Id` и `X-Security-Key` для регистрации индивидуальных кошельков.
:::

**Параметры запроса:**

<Tabs>
  <TabItem value="fields" label="Поля запроса" default>

| Поле | Тип | Обязательно | Описание |
|-------|------|----------|-------------|
| tenantUserId | String | Да | Уникальный идентификатор пользователя в вашей системе. |
| firstName | String | Да | Имя пользователя. |
| lastName | String | Да | Фамилия пользователя. |
| mail | String | Да | Адрес электронной почты пользователя. |
| phoneCountryCode | String | Да | Код страны ISO (например, `TUR`). |
| phoneNumber | String | Да | Номер мобильного телефона пользователя. |

  </TabItem>
  <TabItem value="example" label="Пример запроса">

```json
{
  "tenantUserId": "ABC123XYZ",
  "firstName": "John",
  "lastName": "Doe",
  "mail": "john.doe@mail.com",
  "phoneCountryCode": "TUR",
  "phoneNumber": "1231212"
}
```

  </TabItem>

</Tabs>

### Ответ

<ApiResponseSelector>

```json status="200" title="Успешно"
{
  "tenantUserId": "ABC123XYZ",
  "walletId": "1234567890",
  "accessKey": "RSA PUBLIC KEY"
}
```

</ApiResponseSelector>

:::warning Важно
Храните `accessKey` в безопасности. Он необходим для шифрования полезной нагрузки последующих запросов, привязанных к кошельку (в качестве заголовка `X-Security-Key`).
:::