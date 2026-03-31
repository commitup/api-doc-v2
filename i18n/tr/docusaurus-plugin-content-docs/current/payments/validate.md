---
sidebar_position: 4
---

# Ödeme Doğrula

Bu uç nokta, ödeme isteğini alıcı bilgileriyle doğrular.

> [!IMPORTANT]
> Bu isteğin yanıtı, başlıklarda (headers) bir `operation-id` içerir. Bu `operation-id`, sonraki **Ödeme Onayla** isteğinde kullanılmalıdır.

<ApiEndpoint method="POST" url="/mt-api/V2/moneypayment/validate" />

### İstek Başlıkları (Headers)

| Başlık | Gerekli | Değer |
| :--- | :--- | :--- |
| externalfirm-user-code | Evet | Benzersiz firma kullanıcı kodunuz. |
| Authorization | Evet | Bearer `{{auth_token}}` |
| Content-Type | Evet | `application/json` |

### İstek Parametreleri

<Tabs>
  <TabItem value="table" label="Parametreler" default>

| Parametre | Gerekli | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| receiver | Evet | object | Alıcı detayları. Bakınız [Person Object](../money-transfers/person-object). |
| apiAgentTxnRefNo | Evet | string | Benzersiz işlem referans numaranız. |
| searchUUID | Evet | string | **Ödeme Ara** yanıtından alınan UUID. |
| transactionAmount | Evet | number | Ödenecek tam tutar. |
| transactionAmountCurrency | Evet | string | Tutar için ISO para birimi kodu. |

  </TabItem>
  <TabItem value="example" label="Örnek İstek">

```json
{
  "receiver": { /* Person Object */ },
  "apiAgentTxnRefNo": "REF-123456",
  "searchUUID": "550e8400-e29b-41d4-a716-446655440000",
  "transactionAmount": 100.0,
  "transactionAmountCurrency": "USD"
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
| receiver | object | Doğrulanmış alıcı detayları. |
| sender | object | Doğrulanmış gönderici detayları. |
| incomingAmount | number | Gönderilen orijinal tutar. |
| incomingAmountCurrency | string | Orijinal para birimi. |
| incomingAmountLocal | number | Yerel para birimindeki tutar (varsa). |
| incomingAmountLocalExchangeRate | number | Kullanılan döviz kuru. |
| externalFirmReferenceNo | string | Firmanın referans numarası. |
| fromCountry | string | Gönderen ülke kodu. |
| fromCountryName | string | Gönderen ülke adı. |
| apiAgentCommissionAmount | number | Temsilci komisyon tutarı. |
| apiAgentCommissionAmountCurrency | string | Komisyon para birimi. |
| fromExternalFirmCode | number | Kaynak firma kodu. |
| fromExternalFirmName | string | Kaynak firma adı. |
| apiAgentTxnRefNo | string | İşlem referansınız. |
| searchUUID | string | Kullanılan arama UUID'si. |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıt">

```json status="200" title="Success"
{
  "body": {
    "responseObject": {
      "receiver": { /* Person Object */ },
      "sender": { /* Person Object */ },
      "incomingAmount": 100.0,
      "incomingAmountCurrency": "USD",
      "incomingAmountLocal": 1800.0,
      "incomingAmountLocalExchangeRate": 18.0,
      "externalFirmReferenceNo": "00275640117",
      "fromCountry": "USA",
      "fromCountryName": "United States",
      "apiAgentCommissionAmount": 5.0,
      "apiAgentCommissionAmountCurrency": "TRY",
      "fromExternalFirmCode": 1,
      "fromExternalFirmName": "MoneyGram",
      "apiAgentTxnRefNo": "REF-123456",
      "searchUUID": "550e8400-e29b-41d4-a716-446655440000"
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
