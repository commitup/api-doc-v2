---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# EFT Transfer Listesini Al

Belirli bir tarih aralığındaki EFT transferlerinizin geçmişini alın.

<ApiEndpoint method="POST" url="/eft-api/V2/transfer/get-transfer-list" />

**İstek Parametreleri**

<Tabs>
  <TabItem value="table" label="Parametreler" default>

| Parametre | Zorunlu | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| startDate | Evet | string | Arama için başlangıç tarihi (örn. `2026-03-01T00:00:00.000Z`). |
| endDate | Evet | string | Arama için bitiş tarihi (örn. `2026-03-06T23:59:59.000Z`). |
| statusCode | Hayır | number | Sonuçları belirli bir [EFT Durum Kodu](./eft-flow#eft-durum-kodları) ile filtreleyin. |

  </TabItem>
  <TabItem value="example" label="Örnek İstek">

```json
{
  "startDate": "2026-03-01T00:00:00.000Z",
  "endDate": "2026-03-06T23:59:59.000Z",
  "statusCode": 20
}
```

  </TabItem>
</Tabs>

**Yanıt**

<Tabs>
  <TabItem value="table" label="Yanıt Parametreleri" default>

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| eftTransferList | array | Transfer ayrıntılarını içeren nesnelerin listesi. |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıt">

<ApiResponseSelector>

```json status="200" title="Başarılı"
{
  "body": {
    "responseObject": {
      "eftTransferList": [
        {
          "transferOrderRefId": 47004907882,
          "senderExtFirmRefId": "TEST-13223234",
          "amount": 500,
          "currency": "TRY",
          "status": {
            "statusCode": 20,
            "statusName": "Completed",
            "statusDescription": "Transfer order is successfully sended receiver bank"
          },
          "transferDate": "2026-03-06T10:00:00.000Z"
        }
      ]
    },
    "restHeader": {
      "code": "1",
      "message": "OPERATION_DONE_SUCCESSFUL",
      "success": true,
      "messageCode": "OPERATION_DONE_SUCCESSFUL"
    }
  }
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
