---
sidebar_position: 10
---

# EFT Veri Modelleri

EFT API setinde kullanılan ortak veri modelleri için referans kılavuzu.

## EftPersonInfo

Hem Gönderen hem de Alıcı için kişisel bilgileri temsil etmek için kullanılır.

| Özellik | Tip | Açıklama | Örnek |
| :--- | :--- | :--- | :--- |
| firstName | string | İsim(ler) | `John` |
| lastName | string | Soyadı | `Doe` |
| identityNo | string | Kimlik No veya Pasaport Numarası | `12345678901` |
| identityType | string | Kimlik Türü (örn. `TC_IDENTITY`, `PASSPORT`) | `TC_IDENTITY` |
| birthDate | string | ISO Tarih dizisi | `1985-05-15` |
| nationality | string | ISO 3166-1 alpha-3 kodu | `TUR` |
| address | string | Tam fiziksel adres | `Atatürk Cad. No:1...` |
| city | string | İkamet edilen şehir | `İstanbul` |
| phone | string | İletişim numarası | `+905551234567` |

---

## EftAccountInfo

Hesap veya kart bilgilerini saklamak için kullanılır.

| Özellik | Tip | Açıklama | Örnek |
| :--- | :--- | :--- | :--- |
| accountNickName| string | Hesap için kullanıcı dostu ad | `Tasarruf Hesabım` |
| accountNo | string | IBAN veya Kart Numarası | `TR1234...` |
| branchCode | number | Banka şube kodu | `123` |
| suffixNo | number | Hesap eki (varsa) | `5001` |

---

## EftTransferType

Para transferinin hedefini tanımlar.

| Değer | Açıklama |
| :--- | :--- |
| `TO_IBAN` | IBAN aracılığıyla bir banka hesabına transfer. |
| `TO_CREDIT_CARD`| Doğrudan bir kredi kartı numarasına transfer. |

---

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
