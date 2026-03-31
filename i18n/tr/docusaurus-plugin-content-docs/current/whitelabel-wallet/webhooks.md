---
sidebar_position: 13
---

import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Webhook'lar

İşlem olayları, KYC durum değişiklikleri ve kart yetkilendirmeleri için gerçek zamanlı bildirimler.

## İşlem Bildirimi
PayPorter, her finansal olay için yapılandırılmış webhook URL'nize bir `POST` isteği gönderir.

**Yük (Payload) Örneği:**
```json
{
  "walletId": 13920918,
  "transactionType": "CARD_SALE",
  "amount": 100.1,
  "currency": "TRY",
  "debtCredit": "D",
  "merchantName": "eBay S* San Jose USA"
}
```

---

## Kart Yetkilendirmesi
Kart işlemleri için gerçek zamanlı yetkilendirme isteği.

:::important
**300ms** içinde `200 OK` ile yanıt verin. Yanıt alınmazsa, işlem **varsayılan olarak onaylanır**.
:::

**Yük (Payload) Örneği:**
```json
{
  "ref_number": "47004583620",
  "amount": 100.10,
  "currency_code": "TRY"
}
```

---

## KYC Durum Değişikliği
Bir cüzdanın KYC durumu güncellendiğinde gelen bildirim.

**Onaylandı Örneği:**
<ApiResponseSelector>

```json title="KYC Onaylandı"
{
  "walletLevel": "CONFIRMED",
  "kycStatus": "APPROVED"
}
```

</ApiResponseSelector>

**Reddedildi Örneği:**
<ApiResponseSelector>

```json title="KYC Reddedildi"
{
  "walletLevel": "UN_CONFIRMED",
  "kycStatus": "REJECTED",
  "kycFailureCode": "AML_REJECTED"
}
```

</ApiResponseSelector>