---
sidebar_position: 8
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Yatırma ve Çekme

Nakit veya ana hesap işlemleri yoluyla cüzdana giren ve çıkan fonları yönetin.

## Nakit Girişi (Para Yatırma)
Desteklenen bir gönderim firmasından alınan PIN kodunu kullanarak cüzdana nakit yatırmak için kullanılır.

### 1. Ödemeyi Doğrula
<ApiEndpoint method="POST" url="/wallet/payment/validate" />

**İstek Örneği:**
```json
{
  "externalFirmCode": 47,
  "referenceNo": 47004897230
}
```

### 2. Ödemeyi Onayla
<ApiEndpoint method="POST" url="/wallet/payment/confirm" />

---

## Borç (Cüzdandan Ana Hesaba)
Cüzdanınızdaki fonları ana hesabınıza çekin.

### 1. Borç İşlemini Doğrula
<ApiEndpoint method="POST" url="/wallet/debit/validate" />

**İstek Örneği:**
```json
{
  "amount": 170.50,
  "currency": "TRY",
  "reason": "CUSTOM_DEBIT_REASON"
}
```

### 2. Borç İşlemini Onayla
<ApiEndpoint method="POST" url="/wallet/debit/confirm" />

---

## Alacak (Ana Hesaptan Cüzdana)
Ana hesabınızdaki fonları belirli bir cüzdana yatırın.

### 1. Alacak İşlemini Doğrula
<ApiEndpoint method="POST" url="/wallet/credit/validate" />

### 2. Alacak İşlemini Onayla
<ApiEndpoint method="POST" url="/wallet/credit/confirm" />