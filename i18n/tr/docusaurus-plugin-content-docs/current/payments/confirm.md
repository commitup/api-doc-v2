---
sidebar_position: 5
---

# Ödeme Onayla

Bu uç nokta, ödeme isteğini kesinleştirir. **Ödeme Doğrula** yanıt başlığından (header) alınan `operation-id`'yi sağlamanız gerekir.

<ApiEndpoint method="GET" url="/mt-api/V2/moneypayment/confirm" />

### İstek Başlıkları (Headers)

| Başlık | Gerekli | Değer |
| :--- | :--- | :--- |
| externalfirm-user-code | Evet | Benzersiz firma kullanıcı kodunuz. |
| operation-id | Evet | **Doğrulama** yanıt başlığından alınan kimlik. |
| Authorization | Evet | Bearer `{{auth_token}}` |

## Yanıt

<ApiResponseSelector>
<Tabs>
  <TabItem value="fields" label="Yanıt Alanları" default>

| Alan | Tip | Açıklama |
| :--- | :--- | :--- |
| apiAgentTxnRefNo | string | İşlem referans numaranız. |
| processReferenceNo | number | PayPorter'ın dahili işlem referans numarası. |
| externalFirmReferenceNo | string | Firmanın referans numarası. |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıt">

```json status="200" title="Success"
{
  "header": {
    "success": true,
    "code": "1",
    "message": "OPERATION_DONE_SUCCESSFUL",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "apiAgentTxnRefNo": "REF-123456",
    "processReferenceNo": 47000902951,
    "externalFirmReferenceNo": "47000756804"
  }
}
```

  </TabItem>
</Tabs>
</ApiResponseSelector>
