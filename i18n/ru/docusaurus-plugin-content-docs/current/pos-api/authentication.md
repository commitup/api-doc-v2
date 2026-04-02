---
sidebar_position: 1
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Аутентификация (Authentication)

Все запросы к API должны быть аутентифицированы с использованием заголовков API Key и API Secret.

### Заголовки запроса (Request Headers)

| Название заголовка | Описание |
| :--- | :--- |
| X-API-KEY | Ваш уникальный ключ API, предоставленный при регистрации. |
| X-API-SECRET | Ваш уникальный секретный ключ API. Храните его в безопасности. |

Эти учетные данные уникальны для каждого мерчанта и должны быть включены в каждый запрос к API. Запросы без действительных учетных данных получат ответ `401 Unauthorized`. Вы можете получить учетные данные на странице **Настройки** в нашей панели управления.

### Пример запроса

```bash
curl -X POST https://api.example.com/api/payment \
     -H "Content-Type: application/json" \
     -H "X-API-KEY: your_api_key_here" \
     -H "X-API-SECRET: your_api_secret_here" \
     -d '{"orderId": "ORD-12345", ...}'
```

:::warning Безопасность
Убедитесь, что ваши API Key и API Secret хранятся в безопасности и не передаются публично.
:::
