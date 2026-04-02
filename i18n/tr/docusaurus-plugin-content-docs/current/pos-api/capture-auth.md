---
sidebar_position: 4
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Ön Provizyon Kapama (Capture Pre-Authorization)

Daha önce yetkilendirilmiş bir ödemeyi kapatın (capture). Tutarın tamamını veya bir kısmını kapatabilirsiniz.

<ApiEndpoint method="POST" url="/api/pre-authorization/{paymentId}/capture" />

### Yol Parametreleri (Path Parameters)

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| paymentId | string | Ön provizyon işleminin benzersiz kimliği (UUID). |

### İstek Parametreleri (Request Parameters)

<Tabs>
  <TabItem value="table" label="Parametreler" default>

| Parametre | Zorunlu | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| amount | Evet | number | Kapatılacak tutar (ön provizyon tutarına eşit veya daha az olabilir) (örneğin, 90.00). |
| currency | Evet | string | Para birimi kodu (örneğin, TRY). |

  </TabItem>
  <TabItem value="example" label="Örnek İstek">

```json
{
  "amount": 90.00,
  "currency": "TRY"
}
```

  </TabItem>
</Tabs>

## Yanıt (Response)

Kapatma ayrıntılarını içeren bir `ApiPaymentResponse` nesnesi döner.

<Tabs>
  <TabItem value="fields" label="Yanıt Alanları" default>

| Alan | Tip | Açıklama |
| :--- | :--- | :--- |
| paymentId | string | Ödeme işlemi için benzersiz kimlik (UUID). |
| orderId | string | Orijinal takip numaranız. |
| amount | number | İşlem tutarı. |
| installmentCount | number | Taksit sayısı. |
| currency | string | Para birimi kodu. |
| merchantCommission | number | Üye işyerinden alınan komisyon. |
| status | string | Ödeme durumu (örneğin, SUCCESS, FAILED, ENROLLED). |
| paymentDate | string | Ödeme tarihi ve saati (ISO formatı, örneğin, 2023-05-01T14:30:00Z). |
| cardHolderName | string | Kart sahibinin adı. |
| pan | string | Maskelenmiş kart numarası (örneğin, 411111******1111). |
| domInt | string | Yurt içi veya Yurt dışı işlem (DOM/INT). |
| cardScheme | string | Kart şeması (örneğin, VISA, MASTERCARD). |
| cardType | string | Kart tipi (örneğin, CREDIT, DEBIT). |
| loyaltyCode | string | Sadakat programı kodu (varsa). |
| externalTransactionId | string | Ödeme sağlayıcısından gelen işlem kimliği. |
| authCode | string | Ödeme sağlayıcısından gelen onay kodu. |
| resultCode | string | Ödeme sağlayıcısından gelen sonuç kodu. |
| resultMessage | string | Ödeme sağlayıcısından gelen sonuç mesajı. |
| customerId | string | Müşteri için benzersiz tanımlayıcı (sağlanmışsa). |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıt">

<ApiResponseSelector>

```json status="200" title="Başarılı"
{
  "paymentId": "123e4567-e89b-12d3-a456-426614174000",
  "orderId": "ORD-12345",
  "amount": 100.50,
  "installmentCount": 3,
  "currency": "TRY",
  "merchantCommission": 2.50,
  "status": "SUCCESS",
  "paymentDate": "2023-05-01T14:30:00Z",
  "cardHolderName": "John Doe",
  "pan": "411111******1111",
  "domInt": "DOM",
  "cardScheme": "VISA",
  "cardType": "CREDIT",
  "loyaltyCode": "GOLD123",
  "externalTransactionId": "EXT123456789",
  "authCode": "AUTH987654",
  "resultCode": "SUCCESS",
  "resultMessage": "Successful",
  "customerId": "CUST-12345"
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
