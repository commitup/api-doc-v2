---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Вебхуки

Вебхуки позволяют получать уведомления об изменении статуса ваших переводов EFT в режиме реального времени. Вместо того чтобы периодически опрашивать наш API, мы будем «отправлять» информацию на ваш сервер сразу после возникновения события.

## Рабочий процесс

1.  **Эндпоинт**: Вы должны предоставить публично доступный HTTPS-эндпоинт (например, `https://your-domain.com/payporter/eft-api/notify-status`).
2.  **Уведомление**: При изменении статуса перевода (например, с `PENDING` на `COMPLETED` или `REJECTED`) PayPorter отправляет `POST`-запрос на ваш эндпоинт.
3.  **Проверка**: Вам следует проверить подпись, включенную в заголовки запроса, чтобы убедиться в подлинности уведомления.
4.  **Подтверждение**: Ваш сервер должен вернуть статус `200 OK` с `success: true`, чтобы подтвердить получение.

---

## Безопасная реализация

Для обеспечения безопасности и целостности уведомлений каждый запрос вебхука содержит цифровую подпись.

### Алгоритм хеширования
Мы используем алгоритм **HmacSHA256**. Формат вывода для хешированного значения — **шестнадцатеричный (hex)**.

### Секретный ключ
PayPorter предоставит вам **Секретное значение (Secret Value)** на этапе интеграции. Этот секрет должен храниться в безопасности на вашем сервере и никогда не должен передаваться или раскрываться в клиентском коде.

### Процесс проверки
Чтобы проверить запрос:
1.  Объедините все тело запроса в виде строки.
2.  Захешируйте эту строку с помощью алгоритма **HmacSHA256**, используя предоставленное вам **Секретное значение**.
3.  Сравните полученную hex-строку со значением, указанным в заголовке `request-sign`.

---

## Детали запроса

Данные вебхука отправляются как `POST`-запрос.

### Заголовки
| Заголовок | Описание | Обязательно |
| :--- | :--- | :--- |
| Content-Type | `application/json` | Да |
| request-sign | Подпись данных HMAC-SHA256 (в формате hex). | Да |

### Параметры
<Tabs>
  <TabItem value="table" label="Параметры запроса" default>

| Параметр | Тип | Описание | Пример |
| :--- | :--- | :--- | :--- |
| senderExtFirmRefId | string | Внешний ID ссылки фирмы отправителя | `P2P_1212121` |
| transferOrderRefId | number | ID ссылки заказа EFT | `47000000000` |
| status | number | Статус EFT (20: ЗАВЕРШЕНО, 40: ОТКЛОНЕНО, 50: ВОЗВРАТ) | `20` |
| messageCode | string | Код причины отказа/возврата | `EFT_WRONG_FEC_FOR_ACCOUNT` |
| messageDescription | string | Дополнительное описание, если оно есть | `Отправленная валюта не совпадает...` |

  </TabItem>
  <TabItem value="payload" label="Пример данных">

```json
{
  "senderExtFirmRefId": "P2P_1212121",
  "transferOrderRefId": 47000000000,
  "status": 20,
  "messageCode": "OPERATION_DONE_SUCCESSFUL",
  "messageDescription": "Успешно"
}
```

  </TabItem>
</Tabs>

---

## Ожидания ответа

Ваш сервер должен вернуть соответствующий HTTP-статус и JSON-ответ.

<Tabs>
  <TabItem value="table" label="Параметры ответа" default>

| Параметр | Тип | Описание | Пример |
| :--- | :--- | :--- | :--- |
| success | boolean | Статус обработки уведомления | `true` |
| errorCode | string | Код ошибки, если уведомление не удалось доставить | `SENDER_REF_NOT_FOUND` |

  </TabItem>
  <TabItem value="example" label="Примеры ответов">

<ApiResponseSelector>

```json status="200" title="Успешно"
{
  "success": true
}
```

```json status="404" title="Не найдено"
{
  "success": false,
  "errorCode": "SENDER_REF_NOT_FOUND"
}
```

```json status="400" title="Некорректный статус"
{
  "success": false,
  "errorCode": "STATUS_NOT_VALID"
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>

### Сопоставление HTTP-статусов

| Статус | Условие |
| :--- | :--- |
| **200** | Все в порядке (`success=true`). |
| **404** | `SENDER_REF_NOT_FOUND` или `ORDER_REF_NOT_FOUND` (`success=false`). |
| **400** | `STATUS_NOT_VALID` (`success=false`). |
| **500** | Все остальные случаи ошибок (`success=false`). |

:::important Idempotency
Вебхук должен быть **идемпотентным**. PayPorter может уведомлять об одном и том же статусе несколько раз в некоторых случаях (таймаут, системная ошибка).
:::
