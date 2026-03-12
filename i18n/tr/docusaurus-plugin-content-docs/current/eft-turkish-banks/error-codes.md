---
sidebar_position: 11
---

# EFT Hata Kodları

Bu sayfa, Türk bankalarına yapılan EFT transferleri sırasında oluşabilecek özel hata kodlarını listeler. Her hata, API tarafından döndürülen `messageCode` değerini ve bir açıklama veya önerilen eylemi içerir.

import ErrorCodesTable from '@site/src/components/ErrorCodesTable';

export const codes = [
  { code: "COMMAND_EXCEPTION", description: "Sistem Komut Hatası", action: "Sipariş durumunu kontrol edin. PayPorter tarafından zaten alınmışsa, tekrar göndermeyin. Bulunamazsa, aynı referansla tekrar gönderebilirsiniz." },
  { code: "UNEXPECTED_SYSTEM_ERROR", description: "Beklenmedik Sistem Hatası", action: "Sorgulama yaparak sipariş durumunu kontrol edin. PayPorter tarafından alınmışsa, tekrar göndermeyin. Eksikse, aynı referansla tekrar gönderin." },
  { code: "EFT_DEMAND_FROM_EXT_REF_CODE_PREVIOUS_DEMANDS_SENDEND", description: "Mükerrer İşlem Referansı", action: "Sipariş zaten alınmış. En son durumu sorgulayın ve talep referans numaranızın benzersiz olduğundan emin olun." },
  { code: "OPERATION_DONE_SUCCESSFUL", description: "Başarılı", action: "İşlem başarıyla tamamlandı." },
  { code: "CONCURRENCY_LOGOUT", description: "Oturum Çatışması", action: "Başka bir giriş etkinleştirildi ve önceki oturum kapatıldı. Tekrar giriş yapmayı deneyin." },
  { code: "DATE_RANGE_EXCEEDED", description: "Tarih Aralığı Aşımı", action: "İstenen tarih aralığı sorgu için çok geniş." },
  { code: "INVALID_IP_LOGOUT", description: "IP Güvenlik İhlali", action: "Mevcut yapılandırma tarafından birden fazla IP'den girişe izin verilmiyor." },
  { code: "LOGOUT", description: "Oturum Devre Dışı", action: "Oturumun süresi doldu veya aktif değil. Giriş yaparak yeni bir belirteç alın." },
  { code: "EFT_EXCHANGE_ID_NOT_ALLOWED", description: "TRY Transfer Kısıtlaması", action: "TRY (Türk Lirası) transferleri için ExchangeId kullanımına izin verilmez." },
  { code: "EFT_EXCHANGE_ID_REQUIRED", description: "ExchangeId Eksik", action: "Yabancı para transferleri için ExchangeId gereklidir." },
  { code: "EFT_EXCHANGE_NOT_FOUND", description: "Geçersiz ExchangeId", action: "Sağlanan ExchangeId hatalı veya süresi dolmuş." },
  { code: "EFT_EXCHANGE_TYPE_NOT_MATCH", description: "Değer Uyuşmazlığı", action: "ExchangeId ve transfer ticari değeri aynı olmalıdır." },
  { code: "EFT_EXCHANGE_AMOUNT_NOT_MATCH", description: "Tutar Uyuşmazlığı", action: "Döviz tutarı ile transfer tutarı aynı olmalıdır." },
  { code: "EFT_EXCHANGE_FEC_CODE_NOT_MATCH", description: "Para Birimi Uyuşmazlığı", action: "Döviz para birimi ile transfer para birimi aynı olmalıdır." },
  { code: "QUERY_DATE_RANGE_EXCEEDED", description: "Sorgu Aralığı Hatası", action: "Tarih aralığı bu özel sorgu için çok geniş." },
  { code: "RECEIVER_OR_SENDER_BIRTH_PLACE_TOO_LONG", description: "Alan Uzunluğu Hatası", action: "Doğum Yeri dizesi izin verilen uzunluğu aşıyor." },
  { code: "RECEIVER_OR_SENDER_NAME_TOO_LONG", description: "Alan Uzunluğu Hatası", action: "Alıcı veya gönderici adı çok uzun." },
  { code: "TRN_ID_NOT_FOUND", description: "İşlem Bulunamadı", action: "Sorgulanan işlem kimliği mevcut değil." },
  { code: "UNAUTHORIZED_QUERY_FOR_ACCOUNT_NUMBER", description: "Yetki Reddedildi", action: "Hesap, mevcut belirteç sahibi tarafından sorgulanamaz." },
  { code: "EFT_API_FEC_INFO_MUST_HAVE_VALUE", description: "Para Birimi Eksik", action: "Para birimi kodu boş olamaz." },
  { code: "EFT_API_RECEIVER_FIRST_NAME_MUST_HAVE_VALUE", description: "Alıcı Adı Eksik", action: "Alıcı adı boş olamaz veya çok kısa olamaz." },
  { code: "EFT_API_RECEIVER_INFO_MUST_HAVE_VALUE", description: "Alıcı Bilgisi Eksik", action: "Alıcı adı ve soyadı minimum uzunluk gereksinimlerini karşılamalıdır." },
  { code: "EFT_API_RECEIVER_LASTNAME_MUST_HAVE_VALUE", description: "Alıcı Soyadı Eksik", action: "Alıcı soyadı boş olamaz veya çok kısa olamaz." },
  { code: "EFT_API_RECEIVER_NAME_MUST_HAVE_VALUE", description: "Alıcı Adı Eksik", action: "Alıcı adı boş olamaz veya çok kısa olamaz." },
  { code: "EFT_API_SENDER_BIRTH_PLACE_MUST_HAVE_VALUE", description: "Gönderici Doğum Yeri Eksik", action: "Gönderici doğum yeri boş olamaz." },
  { code: "EFT_API_SENDER_FIRST_NAME_MUST_HAVE_VALUE", description: "Gönderici Adı Eksik", action: "Gönderici adı boş olamaz veya çok kısa olamaz." },
  { code: "EFT_API_SENDER_LAST_NAME_MUST_HAVE_VALUE", description: "Gönderici Soyadı Eksik", action: "Gönderici soyadı boş olamaz veya çok kısa olamaz." },
  { code: "EFT_API_SENDER_NAME_MUST_HAVE_VALUE", description: "Gönderici Bilgisi Eksik", action: "Gönderici adı ve soyadı boş olamaz veya çok kısa olamaz." },
  { code: "EFT_API_TRANSFER_TYPE_MUST_HAVE_VALUE", description: "Transfer Türü Eksik", action: "Transfer Türü boş olamaz." },
  { code: "IBAN_BANK_EFT_AMOUNT_EXCEEDED", description: "Limit Aşıldı", action: "Transfer tutarı limiti aşıldı." },
  { code: "IBAN_BANK_IS_NOT_SUPPORTED", description: "Desteklenmeyen Banka", action: "Alıcı banka EFT Sisteminde desteklenmiyor." },
  { code: "EFT_SEND_BASE_CREDIT_CARD_NO_NOT_VALID", description: "Geçersiz Kart Numarası", action: "Alıcı kredi kartı numarası geçersiz." },
  { code: "EFT_DEMAND_NOT_FOUND_WITH_FROM_EXT_FIRM_REFERANCE", description: "Referans Bulunamadı", action: "Sağlanan harici firma referansına sahip işlem mevcut değil." },
  { code: "EFT_SEND_BASE_SOURCE_OF_FUND_NULL", description: "Kaynak Eksik", action: "Fon kaynağı alanı boş olamaz." },
  { code: "EFT_SEND_BASE_EFT_EFT_AMOUNT_EMPTY_OR_ZERO", description: "Geçersiz Tutar", action: "Transfer tutarı sıfırdan büyük olmalıdır." },
  { code: "EFT_SEND_BASE_EFT_REASON_NULL", description: "Neden Eksik", action: "Transfer Nedeni alanı boş olamaz." },
  { code: "EFT_SEND_BASE_RECEIVER_ACCOUNT_INFO_NULL", description: "Alıcı Eksik", action: "Alıcı hesap numarası veya kredi kartı bilgisi boş olamaz." },
  { code: "EFT_SEND_BASE_RECEIVER_ACCOUNT_NO_NULL", description: "Hesap Numarası Eksik", action: "Alıcı hesap numarası boş olamaz." },
  { code: "EFT_SEND_BASE_SENDER_PERSON_NULL", description: "Geçersiz Gönderici", action: "Gönderici bilgileri geçerli değil." },
  { code: "EFT_SEND_BASE_SENDER_PERSON_BIRTH_DAY_NULL", description: "Doğum Günü Eksik", action: "Gönderici doğum tarihi boş olamaz." },
  { code: "EFT_EXTERNAL_FIRM_REASON_NOT_FOUND", description: "Geçersiz Neden", action: "Sağlanan transfer nedeni geçerli değil." },
  { code: "EFT_NOT_FOUND_CREDIT_CARD_BANK_INFO", description: "Geçersiz Kart Bankası", action: "Kredi kartının veren bankası geçerli değil veya tanınmıyor." },
  { code: "EFT_SEND_WRONG_FEE_FEC_CODE", description: "Para Birimi/Hesap Hatası", action: "Para birimi kodu bu alıcı hesap için uygun değil." },
  { code: "EFT_SEND_FEE_DEBT_AMOUNT_NOT_ENOUGH", description: "Yetersiz Bakiye", action: "Bakiye, transferi ve komisyonu karşılamak için yetersiz." },
  { code: "EFT_WRONG_IBAN_FORMAT", description: "IBAN Hatası", action: "IBAN formatı yanlış." },
  { code: "EFT_TRANSACTION_DATE_CANNOT_BE_PAST", description: "Tarih Hatası", action: "İşlem tarihi geçmişte olamaz." },
  { code: "EFT_WRONG_FEC_FOR_ACCOUNT", description: "Para Birimi Hatası", action: "Para birimi alıcı hesabı için uygun değil." },
  { code: "EFT_NOT_FIND_BANK_CODE_FROM_IBAN", description: "Bilinmeyen Banka", action: "IBAN ile ilişkili banka tanımlı değil." },
  { code: "EFT_IBAN_CHECK_IBAN_LENGHT", description: "IBAN Uzunluk Hatası", action: "IBAN 26 karakter olmalıdır (TR için)." },
  { code: "EFT_IBAN_CHECK_IBAN_NOT_VALID", description: "IBAN Rakam Hatası", action: "IBAN Format Hatası (Doğrulama/Check Digit başarısız)." },
  { code: "EFT_RECEIVER_FULL_NAME_MUST_HAVE_VALUE", description: "İsim Eksik", action: "Alıcı adı ve soyadı boş olamaz." },
  { code: "EFT_SENDER_BIRTH_DATE_MUST_HAVE_VALUE", description: "Doğum Günü Eksik", action: "Gönderici doğum tarihi boş olamaz." },
  { code: "EFT_SENDER_BIRTH_PALACE_MUST_HAVE_VALUE", description: "Doğum Yeri Eksik", action: "Gönderici doğum yeri boş olamaz." },
  { code: "EFT_SENDER_FULL_NAME_MUST_HAVE_VALUE", description: "İsim Eksik", action: "Gönderici adı ve soyadı boş olamaz." },
  { code: "EFT_SENDER_IDENTY_NO_MUST_HAVE_VALUE", description: "Kimlik Eksik", action: "Gönderici kimlik numarası boş olamaz." },
  { code: "EFT_SENDER_PHONE_NO_MUST_HAVE_VALUE", description: "Telefon Eksik", action: "Gönderici telefon numarası boş olamaz." },
];

export const labels = {
  searchPlaceholder: "Koda, açıklamaya veya eyleme göre ara...",
  code: "Kod",
  description: "Açıklama",
  action: "Eylem / Not",
  noResults: "Eşleşen hata kodu bulunamadı."
};

# EFT Hata Kodları

Bu sayfa, Türk bankalarına yapılan EFT transferleri sırasında oluşabilecek özel hata kodlarını listeler. Bir hata kodunu hızlıca bulmak için aşağıdaki arama çubuğunu kullanın.

:::danger Kritik Hata Yönetimi
Aşağıdaki hata kodları için, herhangi bir takip işlemi yapmadan önce işlemin durumunu doğrulamak **zorunludur**:

- **COMMAND_EXCEPTION** & **UNEXPECTED_SYSTEM_ERROR**: Sipariş durumu tüketici tarafından kontrol edilmelidir. Siparişi sorgulayın; PayPorter tarafından alınmışsa, yanıt listesinde göreceksiniz. Bu durumda **tekrar göndermeyin**. PayPorter sisteminde mevcut değilse, aynı referans numarasıyla güvenle tekrar gönderebilirsiniz.
- **EFT_DEMAND_FROM_EXT_REF_CODE_PREVIOUS_DEMANDS_SENDEND**: Bu sipariş zaten PayPorter tarafından alınmış. Güncel durumu almak için siparişi sorgulayın. Yeni talepler için talep referans numaranızın benzersiz olduğundan emin olun.
:::

<ErrorCodesTable codes={codes} labels={labels} />
