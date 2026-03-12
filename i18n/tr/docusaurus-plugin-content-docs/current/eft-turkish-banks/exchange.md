---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Döviz İşlemleri (Exchange)

Yabancı para birimleri ile TRY arasında döviz dönüşümü yapmak için bu uç noktayı kullanın. Bu işlem, işletme hesabınızdan farklı bir para biriminde fon gönderirken yararlıdır.

<ApiEndpoint method="POST" url="/eft-api/V2/exchange" />

## Genel Bakış

Döviz hizmeti şunları yapmanıza olanak tanır:
- Yabancı para birimini TRY'ye dönüştürme.
- TRY'yi yabancı para birimine dönüştürme.
- Çoklu para birimli bir EFT transferi başlatmak için gerekli olan geçerli bir `exchangeId` alma.

:::important Geçerlilik Süresi
Oluşturulan `exchangeId` **1 dakika** boyunca geçerlidir. Transferi bu süre zarfında başlatmazsanız, yeni bir `exchangeId` talep etmeniz gerekir.
:::

---

## İstek Formatı

<Tabs>
  <TabItem value="table" label="Parametreler" default>

| Parametre | Zorunlu | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| amountForeign | Hayır | number | Yabancı para tutarı. |
| currencyForeign | Evet | string | Yabancı para birimi kodu (örn. `USD`, `EUR`). |
| amountTRY | Hayır | number | TRY tutarı. |
| commercial | Hayır | boolean | Ticari işlemler için `true` olarak ayarlayın. |

  </TabItem>
  <TabItem value="example" label="Örnek İstek">

```json
{
  "amountForeign": 100,
  "currencyForeign": "USD",
  "amountTRY": null,
  "commercial": false
}
```

  </TabItem>
</Tabs>

---

## Yanıt

<Tabs>
  <TabItem value="table" label="Yanıt Parametreleri" default>

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| exchangeId | string | Döviz oturumu için benzersiz ID. 60 saniye boyunca geçerlidir. |
| rate | number | İşleme uygulanan döviz kuru. |
| convertedAmount | number | Dönüşüm sonrası oluşan tutar. |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıt">

<ApiResponseSelector>

```json status="200" title="Başarılı"
{
  "header": {
    "success": true,
    "code": "1",
    "message": "OPERATION_DONE_SUCCESSFUL",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "exchangeId": "EX-88234-9912",
    "rate": 31.45,
    "amountForeign": 100,
    "currencyForeign": "USD",
    "amountTRY": 3145,
    "validUntil": "2026-03-09T17:45:00.000Z"
  }
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
