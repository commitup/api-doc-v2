---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Валидация IBAN

Проверяйте реквизиты получателя перед инициированием перевода, чтобы минимизировать возвраты и ошибки.

<ApiEndpoint method="POST" url="/eft-api/V2/validate-iban" />

## Обзор

Валидация IBAN — это премиум-функция, которая проверяет, являются ли предоставленные IBAN, валюта и имя владельца счета действительными и соответствуют ли они записям банка.

:::info Премиум-функция
Это дополнительная платная функция. Валидация владельца счета доступна только для определенных банков-участников в Турции. Пожалуйста, свяжитесь с вашим аккаунт-менеджером для активации этой услуги.
:::

---

## Формат запроса

<Tabs>
  <TabItem value="table" label="Параметры" default>

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| iban | Да | string | Полный IBAN получателя (например, `TR...`). |
| name | Да | string | Полное имя владельца счета. |
| currencyCode | Да | string | Валюта счета (например, `TRY`). |

  </TabItem>
  <TabItem value="example" label="Пример запроса">

```json
{
  "iban": "TR123456789012345678901234",
  "name": "John Doe",
  "currencyCode": "TRY"
}
```

  </TabItem>
</Tabs>

---

## Ответ

<Tabs>
  <TabItem value="table" label="Параметры ответа" default>

| Параметр | Тип | Описание |
| :--- | :--- | :--- |
| name | string | Маскированное имя владельца счета. |

  </TabItem>
  <TabItem value="example" label="Пример ответа">

<ApiResponseSelector>

```json status="200" title="Успешно (Валидно)"
{
    "header": {
        "success": true,
        "code": "1",
        "message": "OPERATION_DONE_SUCCESSFUL",
        "messageCode": "OPERATION_DONE_SUCCESSFUL"
    },
    "responseObject": {
        "name": "ZE*** AY*** DO***"
    }
}
```

```json status="406" title="Несоответствие имени"
{
    "header": {
        "success": false,
        "code": "577",
        "message": "The receivers name does not match the IBAN",
        "messageCode": "EFT_IBAN_CHECK_NAME_NOT_MATCH"
    },
    "responseObject": null
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
