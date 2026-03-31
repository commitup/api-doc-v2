---
sidebar_position: 6
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Dahili Transferler

Aynı whitelabel sistemi içindeki cüzdanlar arasında para gönderin.

## 1. Transferi Doğrula
<ApiEndpoint method="POST" url="/wallet/transfer/validate" />

Hedef cüzdanın mevcut olup olmadığını ve kaynağın yeterli bakiyesi olup olmadığını kontrol eder.

**İstek Örneği:**
```json
{
  "toWalletId": 13359415,
  "amount": 12.25,
  "currency": "TRY",
  "comment": "Test transferi"
}
```

## 2. Transferi Onayla
<ApiEndpoint method="POST" url="/wallet/transfer/confirm" />

Doğrulama adımından elde edilen `transactionId`'yi kullanarak transferi gerçekleştirir.

**İstek Örneği:**
```json
{
  "transactionId": "f66ef144-85cf-43a6-a3cd-bc4e1f858fd1"
}
```

### Response
<ApiResponseSelector>

```json status="200" title="Success"
{
  "transferReference": "47004897230",
  "transactionId": "f66ef144-85cf-43a6-a3cd-bc4e1f858fd1",
  "amount": 12.25,
  "feeAmount": 0.25
}
```

</ApiResponseSelector>