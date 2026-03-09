---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Webhook'lar

Webhook'lar, EFT transferlerinizdeki durum değişiklikleri hakkında gerçek zamanlı bildirimler almanızı sağlar. API'mizi sürekli sorgulamak (polling) yerine, bir olay gerçekleştiğinde bilgiyi sunucunuza "itiyoruz" (push).

## İş Akışı

1.  **Uç Nokta (Endpoint)**: Herkese açık bir HTTPS uç noktası sağlamalısınız (örn. `https://alan-adniniz.com/payporter/eft-api/notify-status`).
2.  **Bildirim**: Bir transfer durumu değiştiğinde (örn. `PENDING` durumundan `COMPLETED` veya `REJECTED` durumuna), PayPorter uç noktanıza bir `POST` isteği gönderir.
3.  **Doğrulama**: Bildirimin gerçek olduğundan emin olmak için istek başlıklarında yer alan imzayı doğrulamalısınız.
4.  **Onay**: Sunucunuz, bildirimin alındığını onaylamak için `success: true` içeren bir `200 OK` yanıtı döndürmelidir.

---

## Güvenli Uygulama

Bildirimlerin güvenliğini ve bütünlüğünü sağlamak için her webhook isteği dijital bir imza içerir.

### Karma (Hashing) Algoritması
**HmacSHA256** algoritmasını kullanıyoruz. Oluşturulan karma değerin çıktı formatı **onaltılık (hex)** sistemindedir.

### Gizli Anahtar (Secret Key)
PayPorter, entegrasyon aşamasında size bir **Gizli Değer (Secret Value)** sağlayacaktır. Bu gizli değer sunucunuzda güvenli bir şekilde saklanmalı ve asla istemci tarafı kodlarda paylaşılmamalı veya açığa çıkarılmamalıdır.

### Doğrulama Süreci
İsteği doğrulamak için:
1.  Tüm istek gövdesini (body) bir dize (string) olarak birleştirin.
2.  Bu dizeyi, size sağlanan **Gizli Değer** ile **HmacSHA256** algoritmasını kullanarak karma haline getirin.
3.  Elde edilen hex dizesini, `request-sign` başlığında sağlanan değerle karşılaştırın.

---

## İstek Ayrıntıları

Webhook verisi bir `POST` isteği olarak gönderilir.

### Başlıklar
| Başlık | Açıklama | Zorunlu |
| :--- | :--- | :--- |
| Content-Type | `application/json` | Evet |
| request-sign | Verinin HMAC-SHA256 imzası (hex formatında). | Evet |

### Parametreler
<Tabs>
  <TabItem value="table" label="İstek Parametreleri" default>

| Parametre | Tip | Açıklama | Örnek |
| :--- | :--- | :--- | :--- |
| senderExtFirmRefId | string | Gönderen harici firma referans ID | `P2P_1212121` |
| transferOrderRefId | number | EFT emir referans ID | `47000000000` |
| status | number | EFT durumu (20: TAMAMLANDI, 40: REDDEDİLDİ, 50: İADE) | `20` |
| messageCode | string | Red/iade neden kodu | `EFT_WRONG_FEC_FOR_ACCOUNT` |
| messageDescription | string | Varsa ek açıklama | `Gönderilen para birimi alıcı hesapla...` |

  </TabItem>
  <TabItem value="payload" label="Örnek Veri">

```json
{
  "senderExtFirmRefId": "P2P_1212121",
  "transferOrderRefId": 47000000000,
  "status": 20,
  "messageCode": "OPERATION_DONE_SUCCESSFUL",
  "messageDescription": "Başarılı"
}
```

  </TabItem>
</Tabs>

---

## Yanıt Beklentileri

Sunucunuz uygun bir HTTP durum kodu ve bir JSON yanıtı döndürmelidir.

<Tabs>
  <TabItem value="table" label="Yanıt Parametreleri" default>

| Parametre | Tip | Açıklama | Örnek |
| :--- | :--- | :--- | :--- |
| success | boolean | Bildirim işleme durumu | `true` |
| errorCode | string | Bildirim başarısızsa hata kodu | `SENDER_REF_NOT_FOUND` |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıtlar">

<ApiResponseSelector>

```json status="200" title="Başarılı"
{
  "success": true
}
```

```json status="404" title="Bulunamadı"
{
  "success": false,
  "errorCode": "SENDER_REF_NOT_FOUND"
}
```

```json status="400" title="Geçersiz Durum"
{
  "success": false,
  "errorCode": "STATUS_NOT_VALID"
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>

### HTTP Durum Kodu Eşleştirmesi

| Durum | Koşul |
| :--- | :--- |
| **200** | Her şey yolunda (`success=true`). |
| **404** | `SENDER_REF_NOT_FOUND` veya `ORDER_REF_NOT_FOUND` (`success=false`). |
| **400** | `STATUS_NOT_VALID` (`success=false`). |
| **500** | Diğer tüm hata durumları (`success=false`). |

:::important Idempotency
Webhook'un **idempotent** olması gerekir. PayPorter, bazı durumlarda (zaman aşımı, sistem hatası) aynı durumu birden fazla kez bildirebilir.
:::
