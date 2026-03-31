---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# EFT İade Listesini Al

Alıcı banka tarafından iade edilen EFT transferlerinin listesini alın.

<ApiEndpoint method="POST" url="/eft-api/V2/transfer/get-refund-transfer-list" />

**İstek Parametreleri**

<Tabs>
  <TabItem value="table" label="Parametreler" default>

| Parametre | Zorunlu | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| startDate | Evet | string | Arama için başlangıç tarihi (örn. `2026-03-01`). |
| endDate | Evet | string | Arama için bitiş tarihi (örn. `2026-03-06`). |

  </TabItem>
  <TabItem value="example" label="Örnek İstek">

```json
{
  "startDate": "2026-03-06T00:00:00.000Z",
  "endDate": "2026-03-06T23:59:59.000Z"
}
```

  </TabItem>
</Tabs>

**Yanıt**

<Tabs>
  <TabItem value="table" label="Yanıt Parametreleri" default>

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| eftRefundTransferList | array | İade ayrıntılarını içeren nesnelerin listesi. |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıt">

<ApiResponseSelector>

```json status="200" title="Başarılı"
{
  "body": {
    "responseObject": {
      "eftRefundTransferList": [
        {
          "transferOrderRefId": 47004907882,
          "senderExtFirmRefId": "TEST-13223234",
          "amount": 500,
          "currency": "TRY",
          "refundDate": "2026-03-06T14:30:00.000Z",
          "refundDescription": "Hesap kapalı",
          "status": {
            "statusCode": 50,
            "statusName": "Refund",
            "statusDescription": "Transfer is refunded by the receiver bank"
          }
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

:::tip Günlük Takip
İadeleri hızlı bir şekilde yönetmek için bu uç noktayı `SYSDATE` (bugün) parametresiyle günde birkaç kez izlemeniz şiddetle tavsiye edilir. Otomatik güncellemeler için [Webhook'larınızın](./eft-flow#best-practices) yapılandırıldığından emin olun.
:::
