---
sidebar_position: 3
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Cüzdan Kaydı

### Kaydol ve Erişim Anahtarını Al

Yeni bir cüzdan oluşturur ve güvenli veri üretimi için erişim anahtarını döndürür.

<ApiEndpoint method="POST" url="/wallet/register" />

:::info Kimlik Doğrulama
**API Anahtarı** başlıklarını gerektirir. Bireysel cüzdanları kaydetmek için `X-Wallet-Id` ve `X-Security-Key` başlıklarında kurumsal cüzdan kimlik bilgilerini kullanın.
:::

**İstek Parametreleri:**

<Tabs>
  <TabItem value="fields" label="İstek Alanları" default>

| Alan | Tip | Zorunlu | Açıklama |
|-------|------|----------|-------------|
| tenantUserId | String | Evet | Sisteminizdeki kullanıcı için benzersiz tanımlayıcı. |
| firstName | String | Evet | Kullanıcının adı. |
| lastName | String | Evet | Kullanıcının soyadı. |
| mail | String | Evet | Kullanıcının e-posta adresi. |
| phoneCountryCode | String | Evet | ISO ülke kodu (örn. `TUR`). |
| phoneNumber | String | Evet | Kullanıcının cep telefonu numarası. |

  </TabItem>
  <TabItem value="example" label="Örnek İstek">

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

### Yanıt

<ApiResponseSelector>

```json status="200" title="Başarılı"
{
  "tenantUserId": "ABC123XYZ",
  "walletId": "1234567890",
  "accessKey": "RSA PUBLIC KEY"
}
```

</ApiResponseSelector>

:::warning Önemli
`accessKey`'i güvenli bir şekilde saklayın. Sonraki cüzdan bağlantılı istekler için (`X-Security-Key` başlığı olarak) yükleri şifrelemek için gereklidir.
:::