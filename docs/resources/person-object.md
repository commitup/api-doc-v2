---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Person Object

The Person object represents a sender or receiver in all money transfer types (To Name, To Account, To Wallet, To Card).

---

## Fields

<Tabs>
  <TabItem value="table" label="Fields" default>

| Parameter | Type | Max Length | Description |
| :--- | :--- | ---: | :--- |
| firstName | string | 50 | First name. Latin/alphanumeric characters only. |
| lastName | string | 50 | Last name. Latin/alphanumeric characters only. |
| middleName | string | 50 | Middle name. Latin/alphanumeric characters only. |
| fatherName | string | 50 | Father's name. Latin/alphanumeric characters only. |
| mobileNo | string | 20 | Phone number without country code. |
| mobileCountryCode | string | 5 | Mobile country code. |
| mobileOperatorNo | string | 5 | Mobile operator number. |
| address | string | 250 | Full address. Latin/alphanumeric characters only. |
| addressCountryCode | string | 3 | Address country code (ISO 3166-1 alpha-3). |
| districtName | string | 50 | District name. Latin/alphanumeric characters only. |
| provinceName | string | 50 | Province name. Latin/alphanumeric characters only. |
| zipCode | string | - | Postal / ZIP code. |
| nationalCountryCode | string | 3 | Nationality country code (ISO 3166-1 alpha-3). |
| birthCountryCode | string | 3 | Birth country code (ISO 3166-1 alpha-3). |
| birthDateStr | string | 10 | Date of birth (`dd.MM.yyyy`). |
| identityNumber | string | 25 | Identity document number. |
| identityTypeId | number | - | Identity type. See [Identity Type List](./commons/identity-type-list). |
| identityIssueCountryCode | string | 3 | Country that issued the identity (ISO 3166-1 alpha-3). |
| identityIssueDateStr | string | 10 | Identity issue date (`dd.MM.yyyy`). |
| identityValidThruDateStr | string | 10 | Identity expiry date (`dd.MM.yyyy`). |
| jobCode | number | - | Job code. See [Job List](./commons/job-list). |
| ssnId | string | - | Social security number. |

  </TabItem>
  <TabItem value="json" label="JSON Example">

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
Not all fields are required for every transfer. Use the **[Fields API](../money-transfers/fields-api.md)** to get the exact mandatory fields for the destination country and payout method, as requirements change by region.
:::
