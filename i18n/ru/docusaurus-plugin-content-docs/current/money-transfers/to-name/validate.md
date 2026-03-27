---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Проверить - По имени

Проверьте запрос на денежный перевод, при котором получатель забирает средства наличными (выплата наличными).

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-name/validate" />

## Обзор

Используйте эту конечную точку для проверки деталей перевода перед окончательным подтверждением. На этом этапе проверяются обязательные поля, допустимые страны назначения и лимиты сумм.

---

## Параметры запроса

<Tabs>
  <TabItem value="table" label="Параметры" default>

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| sender | Да | object | Идентифицирует отправителя. См. [Объект Person](#объект-person). |
| receiver | Да | object | Идентифицирует получателя. |
| amount | Да | number | Сумма для отправки. |
| currency | Да | string | Трехбуквенный код валюты ISO 4217 (например, USD). |
| payoutCurrency | Да | string | Валюта, которую получит получатель (например, TRY). |
| toCountryCode | Да | string | Страна назначения (ISO 3166-1 alpha-3). |

  </TabItem>
</Tabs>

## Ответ

В случае успеха API возвращает `200 OK`. **Важно: `operation-id`, необходимый для подтверждения, отправляется в заголовке ответа.**

---

## Объект Person

| Параметр | Обязательно | Тип | Описание |
| :--- | :--- | :--- | :--- |
| firstName | Да | string | Имя. |
| lastName | Да | string | Фамилия. |
| mobileNo | Да | string | Номер телефона без кода страны. |
| addressCountryCode | Да | string | Код страны ISO. |
