---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# EFT Durumunu Kontrol Et

Dahili referans ID'nizi veya PayPorter referans ID'nizi kullanarak bir EFT transferinin mevcut durumunu kontrol edin.

## Harici Firma Ref ID ile Kontrol Et

Kendi benzersiz referans ID'nizi kullanarak durumu sorgulamak istiyorsanız bu uç noktayı kullanın.

<ApiEndpoint method="GET" url="/eft-api/V2/transfer/check-status-by-ext-firm-id/{senderExtFirmRefId}" />

### Yol Parametreleri

| Parametre | Zorunlu | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| senderExtFirmRefId | Evet | string | Sisteminiz tarafından oluşturulan benzersiz referans ID. |

---

## Transfer Emir Ref ID ile Kontrol Et

PayPorter referans ID'sini kullanarak durumu sorgulamak istiyorsanız bu uç noktayı kullanın.

<ApiEndpoint method="GET" url="/eft-api/V2/transfer/check-status-by-transfer-order-ref/{transferOrderRefId}" />

### Yol Parametreleri

| Parametre | Zorunlu | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| transferOrderRefId | Evet | number | PayPorter tarafından oluşturulan benzersiz referans ID. |

---

## Yanıt

Yanıt formatı her iki uç nokta için de aynıdır.

<Tabs>
  <TabItem value="table" label="Yanıt Parametreleri" default>

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| transferStatus | object | Detaylı durum bilgisi. |
| transferStatus.statusCode | number | Sayısal durum kodu. Bkz. [EFT Durum Kodları](./eft-flow#eft-durum-kodları). |
| transferStatus.statusName | string | Durumun kısa adı (örn. "Pending"). |
| transferStatus.statusDescription | string | Durumun insan tarafından okunabilir açıklaması. |

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
    "transferStatus": {
      "statusCode": 30,
      "statusName": "Pending",
      "statusDescription": "Pending",
      "statusReasonMessageCode": null,
      "statusReasonMessageDetail": null
    }
  }
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>

:::info Nihai Durum
Bir transfer **Nihai Duruma** (TAMAMLANDI, REDDEDİLDİ, İADE veya İPTAL) ulaştığında, bu uç noktayı sorgulamayı bırakmanız önerilir. Sorgulama yapmadan gerçek zamanlı güncellemeler için [Webhook sistemimizi](./eft-flow#best-practices) uygulamayı düşünün.
:::

:::warning Hız Sınırlayıcı
Bireysel durum sorgulamaları dakikada **60 sorgu** hız sınırına tabidir. Yüksek hacimli işlem takibi için [EFT Transfer Listesini Al](./get-eft-list) uç noktasını kullanın.
:::
