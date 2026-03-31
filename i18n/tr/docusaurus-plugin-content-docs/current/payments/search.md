---
sidebar_position: 3
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Ödeme Ara

Bu uç nokta, bir referans numarası kullanarak bir ödeme hakkında bilgi alır. Yanıtta döndürülen `searchUUID`, doğrulama adımı için gereklidir.

<ApiEndpoint method="POST" url="/mt-api/V2/moneypayment/search" />

### İstek Başlıkları (Headers)

| Başlık | Gerekli | Değer |
| :--- | :--- | :--- |
| externalfirm-user-code | Evet | Benzersiz firma kullanıcı kodunuz. |
| invoker | Evet | `API` |
| Authorization | Evet | Bearer `{{auth_token}}` |
| Content-Type | Evet | `application/json` |

### İstek Parametreleri

<Tabs>
  <TabItem value="table" label="Parametreler" default>

| Parametre | Gerekli | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| externalFirmCode | Evet | number | Firmanın ID'si (Ödeme Firma Listesi'nden). |
| externalFirmReferenceNo | Evet | string | Gönderici tarafından sağlanan referans numarası. |

  </TabItem>
  <TabItem value="example" label="Örnek İstek">

```json
{
  "externalFirmCode": 1,
  "externalFirmReferenceNo": "00275640117"
}
```

  </TabItem>

</Tabs>

## Yanıt

<ApiResponseSelector>

<Tabs>
  <TabItem value="fields" label="Yanıt Alanları" default>

| Alan | Tip | Açıklama |
| :--- | :--- | :--- |
| amount | number | İşlem tutarı. |
| currency | string | Para birimi adı. |
| currencyCode | number | ISO para birimi kodu. |
| externalFirmCode | number | Firma kodu. |
| externalFirmName | string | Firma adı. |
| externalFirmReferenceNo | string | Orijinal referans numarası. |
| receiver | object | Alıcı detayları. Bakınız [Person Object](../resources/person-object). |
| searchUUID | string | Doğrulama için gereken benzersiz arama kimliği. |
| sendDate | string | Transferin gönderildiği tarih. |
| sender | object | Gönderen detayları. Bakınız [Person Object](../resources/person-object). |
| senderCountryCode | string | Gönderenin ISO ülke kodu. |
| senderCountryName | string | Gönderenin ülke adı. |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıt">

```json status="200" title="Success"
{
  "body": {
    "responseObject": {
      "amount": 100.0,
      "currency": "USD",
      "currencyCode": 840,
      "externalFirmCode": 1,
      "externalFirmName": "MoneyGram",
      "externalFirmReferenceNo": "00275640117",
      "receiver": { /* Person Object */ },
      "searchUUID": "550e8400-e29b-41d4-a716-446655440000",
      "sendDate": "2022-12-28T06:46:22.714Z",
      "sender": { /* Person Object */ },
      "senderCountryCode": "USA",
      "senderCountryName": "United States"
    },
    "restHeader": {
      "code": "1",
      "message": "Success",
      "success": true
    }
  },
  "statusCode": "OK",
  "statusCodeValue": 200
}
```

  </TabItem>

</Tabs>

</ApiResponseSelector>