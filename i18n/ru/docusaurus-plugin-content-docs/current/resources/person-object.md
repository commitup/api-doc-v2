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

| Parameter | Type | Description |
| :--- | :--- | :--- |
| firstName | string | First name. |
| lastName | string | Last name. |
| middleName | string | Middle name. |
| fatherName | string | Father's name. |
| mobileNo | string | Phone number without country code. |
| mobileCountryCode | string | Mobile country code (ISO 3166-1 alpha-3, e.g., `TUR`). |
| mobileOperatorNo | string | Mobile operator number. |
| address | string | Full address. |
| addressCountryCode | string | Address country code (ISO 3166-1 alpha-3). |
| districtName | string | District name. |
| provinceName | string | Province name. |
| zipCode | string | Postal / ZIP code. |
| nationalCountryCode | string | Nationality country code (ISO 3166-1 alpha-3). |
| birthCountryCode | string | Birth country code (ISO 3166-1 alpha-3). |
| birthDateStr | string | Date of birth (`dd.MM.yyyy`). |
| identityNumber | string | Identity document number. |
| identityTypeId | number | Identity type. See [Identity Type List](./commons/identity-type-list). |
| identityIssueCountryCode | string | Country that issued the identity (ISO 3166-1 alpha-3). |
| identityIssueDateStr | string | Identity issue date (`dd.MM.yyyy`). |
| identityValidThruDateStr | string | Identity expiry date (`dd.MM.yyyy`). |
| jobCode | number | Job code. See [Job List](./commons/job-list). |
| ssnId | string | Social security number. |

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
