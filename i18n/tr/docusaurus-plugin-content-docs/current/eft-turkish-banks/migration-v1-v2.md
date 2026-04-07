---
sidebar_position: 1.5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# EFT API Geçiş Kılavuzu: V1 -> V2

Bu belge, **EFT API Versiyon 1**'den **EFT API Versiyon 2**'ye geçiş için kapsamlı bir kılavuz sunar.

## 1. Base URL Değişiklikleri

Base URL öneki sürüm bilgisini içerecek şekilde güncellendi.

| Versiyon | Base URL Yolu |
| :--- | :--- |
| **V1** | `eft-api/` |
| **V2** | `eft-api/V2/` |

---

## 2. Endpoint Eşleşmeleri ve Yeniden Adlandırmalar

V2'de birkaç endpoint yeniden adlandırıldı veya basitleştirildi.

| Metot | V1 Endpoint | V2 Endpoint | Durum |
| :--- | :--- | :--- | :--- |
| **Transfer Oluştur** | `/transfer/create-money-transfer` | `/transfer/create` | **Yeniden Adlandırıldı** |
| **Durum Sorgula (Ext Ref)** | `/transfer/check-transfer-status-by-ext-firm-id/{id}` | `/transfer/check-status-by-ext-firm-id/{id}` | **Basitleştirildi** |
| **Durum Sorgula (Order Ref)** | `/transfer/check-transfer-status-by-transfer-order-ref/{id}` | `/transfer/check-status-by-transfer-order-ref/{id}` | **Basitleştirildi** |
| **Transfer İptal Et** | `/transfer/cancel-transfer` | `/transfer/cancel` | **Yeniden Adlandırıldı** |
| **Transfer Listesi** | `/transfer/get-transfer-list` | `/transfer/get-transfer-list` | Yol aynı (Base değişti) |
| **İade Listesi** | `/transfer/get-refund-transfer-list` | `/transfer/get-refund-transfer-list` | Yol aynı (Base değişti) |
| **Döviz Kuru** | N/A | `/exchange` | **YENİ** |

---

## 3. İstek Gövdesi (Request Body) Değişiklikleri

:::info
**EFT V2 API**, temel olarak **istek (request)** yapısında (özellikle `create` metodunda) değişiklikler sunar. Tüm endpoint'lerin **yanıt (response)** yapıları, mevcut ayrıştırma mantığınızın sorunsuz çalışmaya devam etmesi için Versiyon 1 ile tutarlı tutulmuştur.
:::

İstek yapısı daha özlü ve standart hale getirilmiştir.

### Üst Seviye Alan Değişiklikleri

| V1 Alanı | V2 Alanı | Kategori | Not |
| :--- | :--- | :--- | :--- |
| `transferDate` | **Kaldırıldı** | Kaldırma | V2'de dahili olarak işlenir. |
| `fec` | **`currency`** | **Nesne -> Dize** | V1 `{"fecId": 1}` kullanıyordu; V2 `"TRY"` kullanır. |
| `receiverAccount` | `receiverAccount` | **Nesne -> Dize** | V1 `{"accountNo": "..."}` kullanıyordu; V2 `transferType`'a bağlı olarak `receiverAccount` (IBAN için) veya `receiverCardNumber` (Kredi Kartı için) kullanır. |
| `transferType` | `transferType` | **Nesne -> Enum** | V1 `{"transferTypeId": 4}` kullanıyordu; V2 `TO_IBAN` veya `TO_CREDIT_CARD` kullanır. |
| `transferReason` | `transferReason` | **Nesne -> Enum** | V1 `{"reasonTypeId": 99}` kullanıyordu; V2 `FAMILY_SUPPORT` gibi enum'lar kullanır. Bkz. **[EftTransferReason](./create-eft#efttransferreason)** |
| N/A | `fromCountry` | **Yeni Alan** | ISO alpha-3 kodu (örn. "TUR"). |

### Kişi Bilgisi Değişiklikleri (`senderInfo`, `receiverInfo`)

| V1 Alanı | V2 Alanı | Detay |
| :--- | :--- | :--- |
| `name` | **`firstName`** | Yeniden Adlandırıldı |
| `midName` | **`middleName`** | Yeniden Adlandırıldı |
| `surName` | **`lastName`** | Yeniden Adlandırıldı |
| `nationalCountryCode`| `nationalCountryCode`| **Tam Sayı -> Dize** (örn. `152` -> `"TUR"`) |

### Örnek JSON Karşılaştırması

<div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
  <div style={{ flex: '1 1 400px', minWidth: '400px' }}>
    <h4>VERSİYON 1 (Eski)</h4>

```json
{
  "amount": 1000.0,
  "comment": "Aile desteği, AHMET CAN YILMAZ",
  "fec": {
    "fecId": 1
  },
  "receiverAccount": {
    "accountNo": "TR840013400002108617000001"
  },
  "receiverInfo": {
    "countryPhoneCode": 90,
    "fullName": "AYŞE DEMİR",
    "name": "AYŞE",
    "phoneNumber": "5551234567",
    "surName": "DEMİR"
  },
  "senderExtFirmRefId": "EX-REF-123456",
  "senderInfo": {
    "address": "TÜRKİYE, İSTANBUL, ŞİŞLİ, MERKEZ MAH. 123 SK. NO:1",
    "birthDay": "1985-05-15T00:00:00Z",
    "birthPlace": "İSTANBUL",
    "countryPhoneCode": 90,
    "fullName": "AHMET CAN YILMAZ",
    "identityNumber": "12345678901",
    "midName": "CAN",
    "name": "AHMET",
    "nationalCountryCode": "TUR",
    "phoneNumber": "5557654321",
    "surName": "YILMAZ"
  },
  "transferDate": "2026-04-07T07:55:47.912639Z",
  "transferReason": {
    "reasonTypeId": 99
  },
  "transferType": {
    "transferTypeId": 4
  }
}
```

  </div>
  <div style={{ flex: '1 1 400px', minWidth: '400px' }}>
    <h4>VERSİYON 2 (Yeni)</h4>

```json
{
  "amount": 1000.00,
  "comment": "Aile desteği, AHMET YILMAZ",
  "currency": "TRY",
  "receiverAccount": "TR840013400002108617000001",
  "senderExtFirmRefId": "NEW-REF-7890",
  "transferReason": "FAMILY_SUPPORT",
  "transferType": "TO_IBAN",
  "fromCountry": "TUR",
  "receiverInfo": {
    "firstName": "AYŞE",
    "lastName": "DEMİR",
    "nationalCountryCode": "TUR",
    "countryPhoneCode": 90,
    "phoneNumber": "5551234567"
  },
  "senderInfo": {
    "firstName": "AHMET",
    "middleName": "CAN",
    "lastName": "YILMAZ",
    "nationalCountryCode": "TUR",
    "countryPhoneCode": 90,
    "phoneNumber": "5557654321",
    "address": "TÜRKİYE, İSTANBUL, ŞİŞLİ, MERKEZ MAH. 123 SK. NO:1",
    "birthDay": "1985-05-15",
    "birthPlace": "İSTANBUL",
    "company": false,
    "email": "ahmet.yilmaz@email.com",
    "identityNumber": "12345678901"
  }
}
```

  </div>
</div>

### Örnek Yanıt (Response)

Yanıt yapısı V1 ile aynıdır. Değişiklik yoktur.

```json
{
    "responseObject": {
        "transferOrderRefId": 47004813026,
        "status": {
            "statusCode": 10,
            "statusName": "New",
            "statusDescription": "New",
            "statusReasonMessageCode": null,
            "statusReasonMessageDetail": null
        },
        "senderExtFirmRefId": "TEST-135542"
    }
}
```

---

## 4. V2'deki Yeni Özellikler

### Webhooklar
**Amaç:** Durum sorgulamak için `check-status` endpoint'ini sürekli çağırmak yerine, bir transfer durumu değiştiğinde gerçek zamanlı push bildirimleri alın.
**Detaylar:** Bkz. **[Webhook Dokümantasyonu](./webhooks)**.

### IBAN Doğrulama
**Endpoint:** `POST /validate-iban`
**Amaç:** Hataları önlemek için transfer denemesinden önce IBAN formatını ve hesap varlığını doğrulayın. Bkz. **[IBAN Doğrulama Dokümantasyonu](./validate-iban)**.
