---
sidebar_position: 6
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';

# Transfer Durumları

Para transferi işlemleri için durum kodları ve açıklamaları.

| Kod | Açıklama |
| :--- | :--- |
| `WAITING_APPROVAL` | Onay Bekliyor |
| `WAITING_FOR_PAYMENT` | Ödeme Bekliyor |
| `PAID_OUT` | Ödendi |
| `CANCELLED` | İptal Edildi |
| `REFUNDED` | İade Edildi |
| `EXPIRED` | Süresi Doldu |
| `ON_HOLD` | Beklemede (Uyum İncelemesi) |

---

:::info Uyum
`ON_HOLD` durumundaki işlemler, manuel inceleme gerektiren işlemlerdir. İnceleme tamamlandığında durum otomatik olarak güncellenir.
:::
