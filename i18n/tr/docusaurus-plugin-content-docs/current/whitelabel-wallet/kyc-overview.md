---
sidebar_position: 10
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# KYC Genel Bakış

Cüzdanları `UN_CONFIRMED` (ONAYLANMAMIŞ) seviyesinden `CONFIRMED` (ONAYLANMIŞ) seviyesine yükseltmek için KYC (Müşterini Tanı) doğrulaması gereklidir. Mevcut iki yöntem vardır:

### Manuel KYC
Kullanıcıların kimlik belgelerini ve kişisel bilgilerini sunduğu geleneksel doğrulama yöntemi. Gönderimden sonra:
1. Belgeler PayPorter'ın uyum ekibi tarafından manuel olarak incelenir
2. Kullanıcının sözleşme imzalaması için fiziksel bir noktayı ziyaret etmesi gerekir
3. Durum şu sırayla ilerler: `WAITING_TO_PHYSICAL_LOCATION` (FIZIKSEL_LOKASYON_BEKLENIYOR) → `WAITING_APPROVAL` (ONAY_BEKLENIYOR) → `APPROVED` (ONAYLANDI)/`REJECTED` (REDDEDILDI)

### Dijital KYC (Önerilen)
Mobil cihaz özelliklerini kullanan SDK tabanlı otomatik doğrulama:
1. Gerçek zamanlı kimlik belgesi yakalama ve doğrulama
2. Artırılmış güvenlik için NFC çip okuma
3. Dolandırıcılığı önlemek için canlılık tespiti (liveness)
4. Minimum manuel müdahale ile daha hızlı onay

:::tip Öneri
Dijital KYC daha hızlı işlem süreleri ve daha iyi kullanıcı deneyimi sağlar. Manuel KYC'yi yalnızca kullanıcının cihazında dijital doğrulama mevcut olmadığında kullanın.
:::