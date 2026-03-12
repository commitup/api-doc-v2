---
sidebar_position: 7
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# EFT Transferini İptal Et

Henüz alıcı banka tarafından işlenmemiş bir EFT transfer talebini iptal edin.

<ApiEndpoint method="GET" url="/eft-api/V2/transfer/cancel" />

## Genel Bakış

Yalnızca **NEW** (Yeni) durumundaki transferler iptal edilebilir. Bir transfer `PENDING` (Beklemede) veya `COMPLETED` (Tamamlandı) durumuna geçtiğinde, artık bu uç nokta üzerinden iptal edilemez.

---

## Yol Parametreleri

| Parametre | Zorunlu | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| transferOrderRefId | Evet | number | Transfer için PayPorter tarafından oluşturulan benzersiz referans ID. |

---

## Yanıt

<ApiResponseSelector>

```json status="200" title="Başarılı"
{
  "header": {
    "success": true,
    "code": "1",
    "message": "OPERATION_DONE_SUCCESSFUL",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "cancelledTransferInfo": {
      "transferOrderRefId": 47000594670,
      "transferDate": "2023-01-17T00:00:00.000+0300",
      "amount": 100,
      "currency": "TRY",
      "status": {
        "statusCode": 60,
        "statusName": "Cancel",
        "statusDescription": "Transfer is cancelled"
      },
      "senderExtFirmRefId": "TEST233",
      "cancellationDate": "2026-03-09T17:40:00.000Z"
    }
  }
}
```

```json status="400" title="İptal Edilemez"
{
  "header": {
    "success": false,
    "message": "ORDER_ALREADY_PROCESSED"
  }
}
```

</ApiResponseSelector>

:::info Sonuç
Başarılı olursa, transfer durumu **CANCEL** (Kod 60) olarak değişecektir. Bu işlem için güncelleme sorgulamayı bırakmalısınız.
:::
