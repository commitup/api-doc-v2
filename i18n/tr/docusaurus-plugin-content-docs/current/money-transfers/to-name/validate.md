---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Doğrula - İsme

Alıcının fonları nakit olarak çektiği (Nakit Çekim) bir para transferi talebini doğrulayın.

<ApiEndpoint method="POST" url="/mt-api/V2/moneysend/to-name/validate" />

## Genel Bakış

Nihai onaydan önce transfer detaylarını doğrulamak için bu uç noktayı kullanın. Bu adım, zorunlu alanları, geçerli hedef ülkeleri ve tutar limitlerini kontrol eder.

---

## İstek Parametreleri

<Tabs>
  <TabItem value="table" label="Parametreler" default>

| Parametre | Zorunlu | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| sender | Evet | object | Göndericiyi tanımlar. Bkz. [Kişi Nesnesi](#kişi-nesnesi). |
| receiver | Evet | object | Alıcıyı tanımlar. |
| amount | Evet | number | Gönderilecek tutar. |
| currency | Evet | string | Üç harfli ISO 4217 para birimi kodu (örn. USD). |
| payoutCurrency | Evet | string | Alıcının alacağı para birimi (örn. TRY). |
| toCountryCode | Evet | string | Hedef ülke (ISO 3166-1 alpha-3). |

  </TabItem>
</Tabs>

## Yanıt

İşlem başarılı olursa API `200 OK` döndürür. **Önemli: Onaylama için gereken `operation-id`, yanıt başlığında (header) gönderilir.**

---

## Kişi Nesnesi

| Parametre | Zorunlu | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| firstName | Evet | string | Ad. |
| lastName | Evet | string | Soyad. |
| mobileNo | Evet | string | Ülke kodu olmadan telefon numarası. |
| addressCountryCode | Evet | string | ISO ülke kodu. |
