---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Giriş Yap (Login)

API'nin tüm uç noktalarına erişim, bir Bearer Token aracılığıyla kimlik doğrulaması gerektirir.

<ApiEndpoint method="POST" url="/oauth-login" />

**İstek (Request)**

Kullanıcı adı ve şifre size sağlanacaktır. Bunlara sahip değilseniz, lütfen hesap yöneticinizle iletişime geçin.

<Tabs>
  <TabItem value="table" label="Parametreler" default>
    | Parametre | Gerekli | Tip   | Açıklama |
    |-----------|---------|-------|----------|
    | username  | Evet    | string | Kullanıcı Adı |
    | password  | Evet    | string | Şifre |
  </TabItem>
  <TabItem value="request_example" label="Örnek İstek">
    ```shell
    curl -X POST https://api.example.com/oauth-login \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -d "username=john" \
        -d "password=secret"
    ```
  </TabItem>
</Tabs>

**Yanıt (Response)**

<Tabs>
  <TabItem value="response_table" label="Gövde Özellikleri" default>
    | Parametre     | Tip   | Açıklama |
    |---------------|-------|----------|
    | access_token  | string | Authorization başlığında kullanmanız gereken Erişim Token'ı |
    | token_type    | string | Bearer |
    | refresh_token | string | Kullanımdan kaldırıldı, kullanılmıyor |
    | expires_in    | number | Token'ın geçerlilik süresi (**saniye** cinsinden) |
    | scope         | string | Token'a atanan kapsam (scope) |
  </TabItem>
  <TabItem value="response_example" label="Örnek Yanıt">
    <ApiResponseSelector>

```json status="200" title="Başarılı Yanıt"
{
  "header": {
    "success": true,
    "code": "0",
    "message": "İşleminiz başarıyla gerçekleşmiştir",
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

```json status="406" title="İş Mantığı Hatası"
{
    "header": {
        "success": false,
        "code": "35",
        "message": "Giriş bilgileriniz hatalıdır",
        "messageCode": "LOGIN_FAILURE.BADCREDENTIALSEXCEPTION"
    },
    "responseObject": null
}
```

```json status="400" title="Geçersiz İstek"
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

```json status="500" title="Sunucu Hatası"
{
      "header": {
        "success": false,
        "code": "500",
        "message": "Internal Server Error",
        "messageCode": null
    },
    "responseObject": null
}
```

    </ApiResponseSelector>
  </TabItem>
</Tabs>

### Login Hakkında Önemli Notlar
- Token'ı saklamalı ve süresi dolana kadar aynı token'ı kullanmalısınız.
- Yüksek maliyetli bir işlem olduğu için her işlemden önce yeni bir token almaktan kaçınmanızı rica ederiz.
- Token süresi dolduğunda `HTTP 401` hatası alırsınız. Bu durumda tekrar login olup yeni bir token almalısınız.
- Token'ınız süresi dolmadan pasif hale gelebilir. Bu durumda `messageCode: LOGOUT` ile `HTTP 406` hatası alırsınız. Tekrar login olup yeni bir token almalısınız.
