---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# EFT Transferi Oluştur

Bir Türk banka hesabına yeni bir EFT transferi başlatın.

<ApiEndpoint method="POST" url="/send-eft" />

**İstek Parametreleri**

<Tabs>
  <TabItem value="table" label="Parametreler" default>
    | Parametre | Zorunlu | Tip   | Açıklama |
    |-----------|---------|-------|----------|
    | amount | Evet | number | Transfer tutarı |
    | comment | Hayır | string | Havale açıklaması / Yorum |
    | currency | Evet | string | Para birimi kodu (örn. TRY) |
    | receiverAccount | Evet | string | Alıcının IBAN veya Hesap Numarası |
    | receiverInfo | Evet | object | Alıcı bilgileri (EftPersonInfo) |
    | senderExtFirmRefId | Evet | string | Dahili benzersiz referans numaranız |
    | senderInfo | Evet | object | Gönderici bilgileri (EftPersonInfo) |
    | transferReason | Evet | string | Transfer nedeni |
    | transferType | Evet | string | Transfer tipi (örn. TO_IBAN) |
    | exchangeId | Hayır | string | Döviz değişimi için isteğe bağlı referans ID |
  </TabItem>
  <TabItem value="request_example" label="Örnek İstek">
    ```json
    {
      "amount": 500,
      "comment": "Mart Ayı Kirası",
      "currency": "TRY",
      "receiverAccount": "TR123456789012345678901234",
      "receiverInfo": {
        "name": "Ahmet Yılmaz"
      },
      "senderExtFirmRefId": "AB3566AVC",
      "senderInfo": {
        "name": "Jane Doe"
      },
      "transferReason": "KİRA",
      "transferType": "TO_IBAN",
      "exchangeId": "EXC-123456"
    }
    ```
  </TabItem>
</Tabs>

**Yanıt (Response)**

<ApiResponseSelector>

```json status="200" title="Başarılı"
{
  "header": {
    "success": true,
    "code": "0",
    "message": "EFT transferi başlatıldı",
    "messageCode": "OPERATION_SUCCESS"
  },
  "responseObject": {
    "transactionId": "EFT-987654321",
    "status": "PROCESSING",
    "estimatedCompletion": "2026-03-06T18:00:00Z"
  }
}
```

```json status="406" title="Yetersiz Bakiye"
{
    "header": {
        "success": false,
        "code": "102",
        "message": "Bu işlem için bakiye yetersiz",
        "messageCode": "BALANCE_INSUFFICIENT"
    },
    "responseObject": null
}
```

</ApiResponseSelector>
