---
sidebar_position: 4
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Cüzdan Bilgisi ve Bakiye

Cüzdanın mevcut bakiyesini, durumunu ve KYC seviyesini sorgulayın.

<ApiEndpoint method="GET" url="/wallet" />

### Yanıt

<Tabs>
  <TabItem value="fields" label="Yanıt Alanları" default>

| Alan | Tip | Açıklama |
|-------|------|-------------|
| tenantUserId | String | Kullanıcının tenant sistemindeki kimliği. |
| walletId | number | Benzersiz cüzdan tanımlayıcısı. |
| totalBalance | number | Nakit ve diğer bakiyelerin toplamı. |
| cashBalance | number | Kullanılabilir nakit bakiyesi. |
| currencyCode | String | ISO para birimi kodu (örn. `TRY`). |
| walletStatus | String | Cüzdanın mevcut durumu. Aşağıya bakın. |
| walletLevel | String | Doğrulama seviyesi. Aşağıya bakın. |
| kycStatus | String | KYC ilerleme durumu. Aşağıya bakın. |
| kycFailureCode | String | Varsa, KYC başarısızlık nedeni. |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıt">

<ApiResponseSelector>

```json status="200" title="Başarılı"
{
  "tenantUserId": "TESTTENANT0014",
  "walletId": 18341595,
  "totalBalance": 0,
  "cashBalance": 0,
  "currencyCode": "TRY",
  "walletStatus": "ACTIVE",
  "walletLevel": "UN_CONFIRMED",
  "kycStatus": "ANONYMOUS",
  "kycFailureCode": null
}
```

</ApiResponseSelector>

  </TabItem>

</Tabs>

---

## Referans Listeleri

### Cüzdan Durumu
| Kod     | Açıklama   |
|----------|---------------|
| ACTIVE   | Aktif        |
| PASSIVE  | Pasif       |
| BLOCKED  | Bloke       |

### Cüzdan Seviyesi
| Kod         | Açıklama  |
|--------------|--------------|
| UN_CONFIRMED | Kyc yapılmadı |
| CONFIRMED    | Kyc onaylandı |

### KYC Durumu
| Kod                         | Açıklama                               |
|-----------------------------|-------------------------------------------|
| ANONYMOUS                   | KYC Yok - Anonim                        |
| WAITING_TO_PHYSICAL_LOCATION| Sözleşmenin Fiziksel Olarak Teslimi Bekleniyor |
| WAITING_APPROVAL            | Onay Bekleniyor                      |
| APPROVED                    | KYC Onaylandı                              |
| REJECTED                    | KYC Reddedildi                              |
| EXPIRED                     | KYC Süresi Doldu                               |

### KYC Başarısızlık Kodu 
| Kod              | Açıklama                                      |
|-------------------|--------------------------------------------------|
| KPS_ERROR         | Türk vatandaşları için kimlik bilgileri eşleşmiyor |
| AML_REJECTED      | AML nedenleriyle reddedildi                      |
| APPROVAL_REJECTED | Gereksinimler karşılanmadığı için reddedildi             |
| APPROVAL_EXPIRED  | Gereksinimler zamanında karşılanmadı                     |