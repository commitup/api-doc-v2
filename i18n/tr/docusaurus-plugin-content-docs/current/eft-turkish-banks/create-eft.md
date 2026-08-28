---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# EFT Transferi Oluştur

Bir Türk banka hesabına yeni bir EFT transferi başlatın.

<ApiEndpoint method="POST" url="/eft-api/V2/transfer/create" />

:::tip Çoklu Para Birimi Transferleri
İşlem hesabınızdan farklı bir para biriminde fon gönderiyorsanız (örn. USD hesabından TRY göndermek), önce **[Exchange (Döviz)](./exchange)** uç noktasından bir `exchangeId` almanız gerekir.
:::

**İstek Parametreleri**

<Tabs>
  <TabItem value="table" label="Parametreler" default>
### Transfer İstek Parametreleri

| Parametre          | Zorunlu | Tip   | Açıklama |
|--------------------|----------|--------|-------------|
| amount             | Evet      | number | Belirtilen para biriminde transfer edilecek tutar. |
| currency           | Evet      | string | Üç harfli ISO 4217 para birimi kodu (örn. TRY). |
| receiverAccount    | Evet      | string | Transfer tipine bağlı olarak alıcının IBAN veya hesap numarası. |
| receiverCardNumber | Hayır      | string | Transfer tipine bağlı olarak alıcının kredi kartı numarası. |
| fromCountry        | Evet      | string | Göndericinin üç harfli ISO 3166-1 alpha-3 ülke kodu. |  
| receiverInfo       | Evet      | object | Alıcı bilgileri. Bkz. [EftPersonInfo](#eftpersoninfo). |
| senderExtFirmRefId | Evet      | string | İstemci sistemi tarafından oluşturulan benzersiz referans kimliği. |
| senderInfo         | Evet      | object | Gönderici bilgileri. Bkz. [EftPersonInfo](#eftpersoninfo). |
| transferReason     | Evet      | string | Transfer nedeni. Bkz. [EftTransferReason](#efttransferreason). |
| transferType       | Evet      | string | Transfer yöntemi (`TO_IBAN` veya `TO_CREDIT_CARD`). |
| comment            | Hayır      | string | İsteğe bağlı havale açıklaması. |
| exchangeId         | Hayır      | string | Para birimi dönüşümü uygulanırsa döviz işlemi referans kimliği. Bkz. [Exchange (Döviz)](./exchange). |

  </TabItem>
  <TabItem value="request_example" label="Örnek İstek">
    ```json
    {
        "amount": 150.23,
        "comment": "Danışmanlık hizmetleri fatura ödemesi",
        "currency": "TRY",
        "receiverAccount": "TR330006100519786457841326",
        "senderExtFirmRefId": "b7e4c4c2-8a3f-4f42-b3c6-9e8f6f3d0a91",
        "transferDate": "2026-03-06",
        "transferReason": "COMMERCIAL_PAYMENTS",
        "transferType": "TO_IBAN",
        "fromCountry": "DEU",
        "exchangeId": "EXC-123456",
        "receiverInfo": {
          "birthDay": "1992-05-14",
          "birthPlace": "Istanbul",
          "middleName": "Mehmet",
          "firstName": "Ahmet",
          "lastName": "Yılmaz",
          "address": "Atatürk Mah. Ertuğrul Gazi Sk. No:12 D:4 Kadıköy Istanbul",
          "addressCountryCode": "TUR",
          "company": false,
          "countryPhoneCode": 90,
          "phoneNumber": 5324567890,
          "email": "ahmet.yilmaz@example.com",
          "identityNumber": "27894561234"
        },
        "senderInfo": {
          "birthDay": "1988-11-02",
          "birthPlace": "Berlin",
          "middleName": "Johann",
          "firstName": "Michael",
          "lastName": "Schneider",
          "address": "Alexanderplatz 7, 10178 Berlin",
          "addressCountryCode": "DEU",
          "company": false,
          "countryPhoneCode": 49,
          "phoneNumber": 1512345678,
          "email": "m.schneider@example.de",
          "identityNumber": "D123456789"
        }
}
```

  </TabItem>
</Tabs>

### EftPersonInfo

Transfer katılımcısının kimlik bilgilerini temsil eder.
Hem `senderInfo` hem de `receiverInfo` alanları için kullanılır.

| Parametre          | Zorunlu (Durum)       | Tip   | Açıklama |
|--------------------|----------------------|--------|-------------|
| firstName          | Gönderici ve Alıcı  | string | Birinci ad. |
| lastName           | Gönderici ve Alıcı  | string | Soyad. |
| middleName         | Hayır             | string | İkinci ad. |
| birthDay           | Gönderici               | string | Doğum tarihi (YYYY-MM-DD formatında). |
| birthPlace         | Gönderici               | string | Doğum yeri. |
| address            | Hayır             | string | Adres. |
| addressCountryCode | Hayır             | string | Üç harfli ISO 3166-1 alpha-3 ülke kodu. |
| company            | Hayır             | boolean | Alıcının bir şirket olup olmadığı. Varsayılan deper hayır. |
| countryPhoneCode   | Hayır             | number | Ülke telefon kodu. |
| phoneNumber        | Hayır             | number | Telefon numarası. |
| email              | Hayır             | string | E-posta adresi. |
| identityNumber     | Hayır             | string | Kimlik numarası (TCKN/Pasaport No). |

## EftTransferReason

Yaygın olarak kullanılan ödeme nedenleri (yasal uyum için gereklidir).

| Değer | Açıklama |
| :--- | :--- |
| `HOME_RENT` | Konut Kirası |
| `OFFICE_RENT` | İş Yeri Kirası |
| `OTHER_RENT` | Diğer Kira |
| `DUES` | Aidat |
| `EDUCATION` | Eğitim |
| `CREDIT_CARD_DEBT` | Kredi Kartı Borcu |
| `STAFF_PAYMENTS` | Personel Ödemeleri |
| `E_COMMERCE_PAYMENTS` | E-Ticaret Ödemeleri |
| `OTHER_PAYMENTS` | Diğer Ödemeler |
| `COMMERCIAL_PAYMENTS` | Ticari Ödemeler |
| `INDIVIDUAL_PAYMENTS` | Bireysel Ödemeler |
| `INVESTMENT` | Yatırım |
| `FINANCIAL` | Finansal |
| `REAL_ESTATE` | Gayrimenkul Alım Ödemesi |
| `MOTOR_VEHICLE_PURCHASE` | Motorlu Taşıt Alım Ödemesi |
| `LOAN_OR_DEBT_PAYMENT` | Borç Verme / Borç Ödeme |
| `GIFT_DONATION_AID` | Hediye / Bağış / Yardım |
| `TAX_DUTY_FEE` | Vergi / Resim / Harç Ödemesi |
| `INSURANCE_COMPENSATION` | Tazminat / Sigorta Ödemesi |
| `CONSULTANCY_LEGAL_SERVICES` | Avukatlık / Danışmanlık / Müşavirlik Ödemesi |
| `HEALTH_PAYMENTS` | Sağlık Ödemesi |
| `CRYPTO_DIGITAL_ASSETS` | Kripto / Dijital Varlık |
| `CHANCE_GAMES_BETTING` | Şans Oyunları / Bahis Ödemesi |
| `ENTERTAINMENT_SOCIAL_MEDIA` | Eğlence / Sosyal Medya Ödemesi |


**Yanıt (Response)**

<Tabs>
  <TabItem value="table" label="Yanıt Parametreleri" default>

### EFT Oluşturma Yanıtı

| Parametre          | Zorunlu | Tip   | Açıklama |
|--------------------|----------|--------|-------------|
| transferOrderRefId | Evet      | number | İstemci sistemi tarafından üretilen benzersiz referans ID. |
| status             | Evet      | object | Transferin durumu. Bkz. [EFT Akışı](./eft-flow). |
| senderExtFirmRefId | Evet      | string | Gönderilen benzersiz referans ID. |

  </TabItem>
  <TabItem value="response_example" label="Örnek Yanıt">
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
        "transferOrderRefId": 47004907882,
        "status": {
            "statusCode": 10,
            "statusName": "Yeni",
            "statusDescription": "NEW",
            "statusReasonMessageCode": null,
            "statusReasonMessageDetail": null
        },
        "senderExtFirmRefId": "TEST-13223234"
    }
}
```

```json status="406" title="senderExtFirmRefId benzersiz olmalıdır"
{
    "header": {
        "success": false,
        "code": "2012",
        "message": "EFT DEMAND FROM EXTERNAL REFERENCE CODE PREVIOUS DEMANDS SENDED",
        "messageCode": "EFT_DEMAND_FROM_EXT_REF_CODE_PREVIOUS_DEMANDS_SENDEND"
    },
    "responseObject": null
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
