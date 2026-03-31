---
sidebar_position: 9
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Kart İşlemleri

Cüzdana bağlı sanal ve fiziksel (isimsiz) kartlar için kapsamlı yönetim.

## Kart Envanteri
<ApiEndpoint method="GET" url="/wallet/cards" />

Cüzdanla ilişkili tüm kartları döndürür.

---

## Oluşturma ve Aktivasyon

### Sanal Kart Oluştur
<ApiEndpoint method="POST" url="/wallet/cards/virtual" />

### İsimsiz Kartı Kişiselleştir
<ApiEndpoint method="POST" url="/wallet/cards/no-name" />

---

## Güvenlik ve Erişim

### Güvenlik Verilerini Al (CVV/Son Kullanma)
<ApiEndpoint method="GET" url="/wallet/cards/{cardId}/security-data" />

### Kart PIN Belirle/Değiştir
<ApiEndpoint method="POST" url="/wallet/cards/{cardId}/set-pin" />

---

## Limitler ve Kontroller

### Yönetim Yetkilendirmesi
<ApiEndpoint method="POST" url="/wallet/cards/{cardId}/auth-info" />

`moto`, `temassız`, `nakit`, `yurt dışı` ve `e-ticaret` gibi özellikleri kontrol eder.

### İşlem Limitleri
<ApiEndpoint method="POST" url="/wallet/cards/{cardId}/limit-info" />

`günlükLimit`, `haftalıkLimit` ve `aylıkLimit` belirleyin.

---

## Durum Yönetimi

### Geçici Kapat/Aç
<ApiEndpoint method="POST" url="/wallet/cards/{cardId}/temporally-close/{isClose}" />

### Kartı İptal Et (Kalıcı)
<ApiEndpoint method="POST" url="/wallet/cards/{cardId}/cancel" />

---

## Referans Listeleri

<Tabs>
  <TabItem value="type" label="Kart Tipleri" default>

| Kod | Açıklama |
|------|-------------|
| `VIRTUAL` | Sadece dijital kart |
| `NO_NAME` | Üzerinde isim yazılı olmayan fiziksel kart |

  </TabItem>
  <TabItem value="status" label="Kart Durumları">

| Kod | Açıklama |
|------|-------------|
| `ACTIVE` | Kullanıma hazır |
| `TEMPORARY_CLOSED` | Kullanıcı tarafından kilitlendi |
| `CANCELLED` | Kalıcı olarak devre dışı bırakıldı |
| `LOST_STOLEN` | Kayıp/Çalıntı ihbarı yapıldı |

  </TabItem>

</Tabs>