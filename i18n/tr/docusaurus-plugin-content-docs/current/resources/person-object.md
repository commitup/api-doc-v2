---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kişi Nesnesi (Person Object)

Kişi nesnesi, tüm para transferi türlerinde (İsme, Hesaba, Cüzdana, Karta) gönderen veya alıcıyı temsil eder.

---

## Alanlar

<Tabs>
  <TabItem value="table" label="Alanlar" default>

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| firstName | string | Ad. |
| lastName | string | Soyad. |
| middleName | string | İkinci ad. |
| fatherName | string | Baba adı. |
| mobileNo | string | Ülke kodu olmadan telefon numarası. |
| mobileCountryCode | string | Mobil ülke kodu (ISO 3166-1 alpha-3, örn. `TUR`). |
| mobileOperatorNo | string | Mobil operatör numarası. |
| address | string | Tam adres. |
| addressCountryCode | string | Adres ülke kodu (ISO 3166-1 alpha-3). |
| districtName | string | İlçe adı. |
| provinceName | string | İl adı. |
| zipCode | string | Posta kodu. |
| nationalCountryCode | string | Uyruk ülke kodu (ISO 3166-1 alpha-3). |
| birthCountryCode | string | Doğum yeri ülke kodu (ISO 3166-1 alpha-3). |
| birthDateStr | string | Doğum tarihi (`gg.AA.yyyy`). |
| identityNumber | string | Kimlik belgesi numarası. |
| identityTypeId | number | Kimlik türü. Bkz. [Kimlik Türü Listesi](./commons/identity-type-list). |
| identityIssueCountryCode | string | Kimliği düzenleyen ülke (ISO 3166-1 alpha-3). |
| identityIssueDateStr | string | Kimlik düzenlenme tarihi (`gg.AA.yyyy`). |
| identityValidThruDateStr | string | Kimlik son geçerlilik tarihi (`gg.AA.yyyy`). |
| jobCode | number | Meslek kodu. Bkz. [Meslek Listesi](./commons/job-list). |
| ssnId | string | Sosyal güvenlik numarası. |

  </TabItem>
  <TabItem value="json" label="JSON Örneği">

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "middleName": "",
  "fatherName": "",
  "mobileNo": "5320000000",
  "mobileCountryCode": "TUR",
  "mobileOperatorNo": "",
  "address": "Atatürk Mah. No:1",
  "addressCountryCode": "TUR",
  "districtName": "Kadıköy",
  "provinceName": "İstanbul",
  "zipCode": "34000",
  "nationalCountryCode": "TUR",
  "birthCountryCode": "TUR",
  "birthDateStr": "01.01.1990",
  "identityNumber": "12345678901",
  "identityTypeId": 1,
  "identityIssueCountryCode": "TUR",
  "identityIssueDateStr": "15.06.2015",
  "identityValidThruDateStr": "15.06.2025",
  "jobCode": 5,
  "ssnId": ""
}
```

  </TabItem>
</Tabs>

:::tip Alanlar API'si
Her transfer türü için tüm alanlar gerekli değildir. Gereksinimler bölgeye göre değiştiğinden, hedef ülke ve ödeme yöntemi için tam zorunlu alanları almak üzere **[Alanlar API'sini](../money-transfers/fields-api.md)** kullanın.
:::
