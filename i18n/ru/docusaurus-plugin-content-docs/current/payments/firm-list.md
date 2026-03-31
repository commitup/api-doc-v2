---
sidebar_position: 2
---

# Список платежных фирм

Эта конечная точка возвращает список внешних/денежных фирм, доступных для получения платежей.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/money-payment-external-firm-list" />

### Заголовки запроса

| Заголовок | Обязательно | Значение |
| :--- | :--- | :--- |
| Authorization | Да | Bearer `{{auth_token}}` |

### Примеры ответов

<ApiResponseSelector>
<Tabs>
  <TabItem value="fields" label="Поля ответа" default>

| Поле | Тип | Описание |
| :--- | :--- | :--- |
| id | number | Уникальный ID фирмы. |
| name | string | Название фирмы. |
| active | string | Статус фирмы (например, "Active"). |

  </TabItem>
  <TabItem value="example" label="Пример ответа">

```json status="200" title="Success"
[
  {
    "active": "Active",
    "id": 1,
    "name": "MoneyGram"
  },
  {
    "active": "Active",
    "id": 4,
    "name": "PayPorter"
  }
]
```

  </TabItem>
</Tabs>
</ApiResponseSelector>
