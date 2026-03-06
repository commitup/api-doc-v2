---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Вход (Login)

Доступ ко всем эндпоинтам API требует аутентификации с помощью Bearer токена.

<ApiEndpoint method="POST" url="/oauth-login" />

**Запрос (Request)**

Логин и пароль будут предоставлены. Если у вас их нет, пожалуйста, свяжитесь со своим менеджером аккаунта.

<Tabs>
  <TabItem value="table" label="Параметры" default>
    | Параметр  | Обязательно | Тип    | Описание |
    |-----------|-------------|--------|----------|
    | username  | Да          | string | Имя пользователя |
    | password  | Да          | string | Пароль |
  </TabItem>
  <TabItem value="request_example" label="Пример запроса">
    ```shell
    curl -X POST https://api.example.com/oauth-login \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -d "username=john" \
        -d "password=secret"
    ```
  </TabItem>
</Tabs>

**Ответ (Response)**

<Tabs>
  <TabItem value="response_table" label="Свойства тела ответа" default>
    | Параметр      | Тип    | Описание |
    |---------------|--------|----------|
    | access_token  | string | Токен доступа, который следует использовать в заголовке Authorization |
    | token_type    | string | Bearer |
    | refresh_token | string | Устарело, не используется |
    | expires_in    | number | Токен истекает через **секунд** |
    | scope         | string | Область действия (scope), назначенная токену |
  </TabItem>
  <TabItem value="response_example" label="Пример ответа">
    <ApiResponseSelector>

```json status="200" title="Успешный ответ"
{
  "header": {
    "success": true,
    "code": "0",
    "message": "Операция прошла успешно",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "access_token": "578628e9-3b10-4a31-bfc7-56f148e68fee",
    "token_type": "bearer",
    "refresh_token": "7702dd57-9ef4-4892-9dd3-557ab6d7c25c",
    "expires_in": 3599,
    "scope": "read write"
  }
}
```

```json status="406" title="Бизнес-ошибка"
{
    "header": {
        "success": false,
        "code": "35",
        "message": "Неверные учетные данные",
        "messageCode": "LOGIN_FAILURE.BADCREDENTIALSEXCEPTION"
    },
    "responseObject": null
}
```

```json status="400" title="Некорректный запрос"
{
    "header": {
        "success": true,
        "code": null,
        "message": null,
        "messageCode": null
    },
    "responseObject": null
}
```

```json status="500" title="Ошибка сервера"
{
      "header": {
        "success": false,
        "code": "500",
        "message": "Внутренняя ошибка сервера",
        "messageCode": null
    },
    "responseObject": null
}
```

    </ApiResponseSelector>
  </TabItem>
</Tabs>

### Важные примечания о входе
- Вам следует хранить токен и использовать его до истечения срока действия.
- Мы убедительно просим вас не получать новый токен перед каждой транзакцией, так как это дорогостоящая операция.
- По истечении срока действия токена вы получите ошибку `HTTP 401`. Вам следует повторно выполнить login для получения нового токена.
- Возможно, ваш токен станет неактивным до истечения срока действия. В этом случае вы получите `HTTP 406` с `messageCode: LOGOUT`. Вам следует повторно выполнить login для получения нового токена.
