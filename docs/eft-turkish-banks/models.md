---
sidebar_position: 10
---

# EFT Data Models

Reference guide for common data models used across the EFT API suite.

## EftPersonInfo

Used to represent personal information for both Sender and Receiver.

| Property | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| firstName | string | Given name(s) | `John` |
| lastName | string | Family name | `Doe` |
| identityNo | string | National ID or Passport Number | `12345678901` |
| identityType | string | Type of ID (e.g., `TC_IDENTITY`, `PASSPORT`) | `TC_IDENTITY` |
| birthDate | string | ISO Date string | `1985-05-15` |
| nationality | string | ISO 3166-1 alpha-3 code | `TUR` |
| address | string | Full physical address | `Ataturk Cad. No:1...` |
| city | string | City of residence | `Istanbul` |
| phone | string | Contact number | `+905551234567` |

---

## EftAccountInfo

Used to store account or card information.

| Property | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| accountNickName| string | User-friendly name for account | `My Savings` |
| accountNo | string | IBAN or Card Number | `TR1234...` |
| branchCode | number | Bank branch code | `123` |
| suffixNo | number | Account suffix (if applicable) | `5001` |

---

## EftTransferType

Defines the destination of the money transfer.

| Value | Description |
| :--- | :--- |
| `TO_IBAN` | Transfer to a bank account via IBAN. |
| `TO_CREDIT_CARD`| Transfer directly to a credit card number. |

---

## EftTransferReason

Commonly used payment reasons (required for regulatory compliance).

| Value | Description |
| :--- | :--- |
| `HOME_RENT` | Home Rent |
| `OFFICE_RENT` | Office Rent |
| `OTHER_RENT` | Other Rent |
| `DUES` | Dues |
| `EDUCATION` | Education |
| `CREDIT_CARD_DEBT` | Credit Card Debt |
| `STAFF_PAYMENTS` | Staff Payments |
| `E_COMMERCE_PAYMENTS` | E-Commerce Payments |
| `OTHER_PAYMENTS` | Other Payments |
| `COMMERCIAL_PAYMENTS` | Commercial Payments |
| `INDIVIDUAL_PAYMENTS` | Individual Payments |
| `INVESTMENT` | Investment |
| `FINANCIAL` | Financial |
