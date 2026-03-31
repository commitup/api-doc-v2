---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Объект "Лицо" (Person)

Объект "Лицо" представляет собой отправителя или получателя во всех типах денежных переводов (По имени, На счет, На кошелек, На карту).

---

## Поля

<Tabs>
  <TabItem value="table" label="Поля" default>

| Параметр | Тип | Описание |
| :--- | :--- | :--- |
| firstName | string | Имя. |
| lastName | string | Фамилия. |
| middleName | string | Отчество. |
| fatherName | string | Имя отца. |
| mobileNo | string | Номер телефона без кода страны. |
| mobileCountryCode | string | Код страны мобильного телефона (ISO 3166-1 alpha-3, например, `TUR`). |
| mobileOperatorNo | string | Номер мобильного оператора. |
| address | string | Полный адрес. |
| addressCountryCode | string | Код страны адреса (ISO 3166-1 alpha-3). |
| districtName | string | Название района. |
| provinceName | string | Название провинции. |
| zipCode | string | Почтовый индекс. |
| nationalCountryCode | string | Код страны гражданства (ISO 3166-1 alpha-3). |
| birthCountryCode | string | Код страны рождения (ISO 3166-1 alpha-3). |
| birthDateStr | string | Дата рождения (`dd.MM.yyyy`). |
| identityNumber | string | Номер документа, удостоверяющего личность. |
| identityTypeId | number | Тип документа. См. [Список типов идентификации](./commons/identity-type-list). |
| identityIssueCountryCode | string | Страна, выдавшая документ (ISO 3166-1 alpha-3). |
| identityIssueDateStr | string | Дата выдачи документа (`dd.MM.yyyy`). |
| identityValidThruDateStr | string | Дата окончания срока действия документа (`dd.MM.yyyy`). |
| jobCode | number | Код профессии. См. [Список профессий](./commons/job-list). |
| ssnId | string | Номер социального страхования. |

  </TabItem>
  <TabItem value="json" label="Пример JSON">

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

:::tip Fields API
Не все поля обязательны для каждого перевода. Используйте **[Fields API](../money-transfers/fields-api.md)**, чтобы получить точный список обязательных полей для страны назначения и способа выплаты, так как требования меняются в зависимости от региона.
:::
