---
sidebar_position: 6
---

# Ödeme Detayları

`processReferenceNo` kullanarak tamamlanmış bir ödemenin ayrıntılarını sorgulayın.

<ApiEndpoint method="GET" url="/mt-api/V2/moneypayment/getdetail?processReferenceNo={processReferenceNo}" />

### İstek Başlıkları (Headers)

| Başlık | Gerekli | Değer |
| :--- | :--- | :--- |
| Authorization | Evet | Bearer `{{auth_token}}` |

### Sorgu Parametreleri

| Parametre | Gerekli | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| processReferenceNo | Evet | number | **Onaylama** isteği tarafından döndürülen dahili referans numarası. |

## Yanıt

<ApiResponseSelector>
<Tabs>
  <TabItem value="fields" label="Yanıt Alanları" default>

| Alan | Tip | Açıklama |
| :--- | :--- | :--- |
| agentCommisionAmount | number | Temsilci komisyon tutarı. |
| agentCommisionAmountCurrency | string | Komisyon para birimi. |
| externalFirmReferenceNo | string | Ana referans numarası. |
| externalFirmReferenceNo2 | string | İkincil referans numarası (varsa). |
| fromCountryName | string | Kaynak ülke. |
| fromExternalFirmName | string | Kaynak firma. |
| incomingAmount | number | Ödenen tutar. |
| incomingAmountCurrency | string | Ödenen para birimi. |
| paymentDate | string | Ödeme tarihi. |
| paymentStatusName | string | Ödemenin mevcut durumu. |
| payoutCountryName | string | Ödeme yapılan ülke. |
| payoutExternalFirmName | string | Ödeme yapan firma. |
| processReferenceNo | number | PayPorter referans numarası. |
| receiver | object | Alıcı detayları. Bakınız [Person Object](../money-transfers/person-object). |
| sender | object | Gönderen detayları. Bakınız [Person Object](../money-transfers/person-object). |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıt">

```json status="200" title="Success"
{
  "body": {
    "responseObject": {
      "agentCommisionAmount": 5.0,
      "agentCommisionAmountCurrency": "TRY",
      "externalFirmReferenceNo": "00275640117",
      "externalFirmReferenceNo2": "47000756804",
      "fromCountryName": "United States",
      "fromExternalFirmName": "MoneyGram",
      "incomingAmount": 1800.0,
      "incomingAmountCurrency": "TRY",
      "paymentDate": "2022-12-28T12:00:36.633Z",
      "paymentStatusName": "COMPLETED",
      "payoutCountryName": "Turkey",
      "payoutExternalFirmName": "PayPorter",
      "processReferenceNo": 47000902951,
      "receiver": { /* Person Object */ },
      "sender": { /* Person Object */ }
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
