---
sidebar_position: 11
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Manuel KYC

Kimlik belgesi gönderimi ve manuel incelemeyi içeren geleneksel doğrulama yöntemi.

<ApiEndpoint method="POST" url="/wallet/kyc" />

### İstek Parametreleri

<Tabs>
  <TabItem value="turkish" label="Türk Vatandaşları" default>

Türk vatandaşları, adres kimliklerini doldurmak için **Adres Servislerini** (`/cities`, `/districts`, `/neighborhoods`) kullanmalıdır.

```json
{
  "identityNo": "54052219200",
  "name": "SİNEM",
  "surname": "ÇOBANLI GÜRBÜZ",
  "nationality": "TUR",
  "birthDate": "08.05.1994",
  "idType": "NEW_ID",
  "idDocNumber": "A43V10622",
  "idIssueDate": "01.01.2020",
  "idExpireDate": "01.01.2030",
  "fatherName": "PAPA",
  "birthPlace": "ISTANBUL",
  "professionCode": "142",
  "idMedia": "base64EncodedImageOrPdfString",
  "addressDetail": {
    "country": "TUR",
    "city": "34",
    "district": "779",
    "neighborhood": "32344",
    "addressMedia": "base64EncodedImageOrPdfString"
    // ... sokak, kapıNumarası, binaNumarası
  }
}
```

  </TabItem>
  <TabItem value="non-turkish" label="Türk Olmayan Vatandaşlar">

```json
{
  "identityNo": "12345678901",
  "name": "John",
  "surname": "Doe",
  "nationality": "DEU",
  "idType": "PASSPORT",
  "idDocNumber": "A123456789",
  "addressDetail": {
    "country": "DEU",
    "city": "BERLIN",
    "district": "BERLIN"
    // ...
  }
}
```

  </TabItem>

</Tabs>

### Referans Tabloları

| Kategori | Açıklama |
|----------|-------------|
| **Hesap Amacı** | `MONEY_TRANSFER` (PARA_TRANSFERI), `DONATION` (BAGIS), `BILL` (FATURA), `COMMERCIAL` (TICARI) |
| **Gelir Kaynağı** | `SALARY` (MAAS), `RENT` (KIRA), `SELF_EMPLOYMENT` (SERBEST_MESLEK), `COMMERCIAL` (TICARI), `DONATION` (BAGIS) |
| **Parasal Limitler** | `0-5000`, `5001-10000`, `10001-20000`, `20001-50000`, `50000+` |
| **İşlem Sayısı** | `1-10`, `11-30`, `31-50`, `51-100`, `100+` |