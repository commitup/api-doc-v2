---
sidebar_position: 1
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kimlik Doğrulama (Authentication)

Tüm API istekleri, API Anahtarı (API Key) ve API Şifresi (API Secret) başlıkları kullanılarak doğrulanmalıdır.

### İstek Başlıkları (Request Headers)

| Başlık Adı | Açıklama |
| :--- | :--- |
| X-API-KEY | Kayıt sırasında size sağlanan benzersiz API Anahtarınız. |
| X-API-SECRET | Benzersiz API Şifreniz. Bunu güvenli tutun. |

Bu kimlik bilgileri her üye işyerine özeldir ve her API isteğine dahil edilmelidir. Geçerli kimlik bilgileri içermeyen istekler `401 Unauthorized` yanıtı alacaktır. Kimlik bilgilerini panelimizdeki **Ayarlar** sayfasından alabilirsiniz.

### Örnek İstek

```bash
curl -X POST https://api.example.com/api/payment \
     -H "Content-Type: application/json" \
     -H "X-API-KEY: your_api_key_here" \
     -H "X-API-SECRET: your_api_secret_here" \
     -d '{"orderId": "ORD-12345", ...}'
```

:::warning Güvenlik
API Anahtarınızın ve API Şifrenizin güvenli tutulduğundan ve herkese açık olarak paylaşılmadığından emin olun.
:::
