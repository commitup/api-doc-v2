---
sidebar_position: 11
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Ручной KYC (Manual KYC)

Традиционный метод верификации, включающий подачу документов, удостоверяющих личность, и ручную проверку.

<ApiEndpoint method="POST" url="/wallet/kyc" />

### Параметры запроса

<Tabs>
  <TabItem value="turkish" label="Граждане Турции" default>

Граждане Турции должны использовать **Адресные службы** (`/cities`, `/districts`, `/neighborhoods`) для заполнения идентификаторов адресов.

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
    // ... street, doorNumber, buildingNumber
  }
}
```

  </TabItem>
  <TabItem value="non-turkish" label="Иностранные граждане">

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

### Справочные таблицы

| Категория | Описание |
|----------|-------------|
| **Цель открытия счета** | `MONEY_TRANSFER`, `DONATION`, `BILL`, `COMMERCIAL` |
| **Источник дохода** | `SALARY`, `RENT`, `SELF_EMPLOYMENT`, `COMMERCIAL`, `DONATION` |
| **Денежные лимиты** | `0-5000`, `5001-10000`, `10001-20000`, `20001-50000`, `50000+` |
| **Количество транзакций** | `1-10`, `11-30`, `31-50`, `51-100`, `100+` |