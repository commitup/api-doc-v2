---
sidebar_position: 2
---

# Ödeme Firma Listesi

Bu uç nokta, ödeme tahsilatı için mevcut olan harici/havale firmalarının bir listesini döndürür.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/money-payment-external-firm-list" />

### İstek Başlıkları (Headers)

| Başlık | Gerekli | Değer |
| :--- | :--- | :--- |
| Authorization | Evet | Bearer `{{auth_token}}` |

### Yanıt Örnekleri

<ApiResponseSelector>
<Tabs>
  <TabItem value="fields" label="Yanıt Alanları" default>

| Alan | Tip | Açıklama |
| :--- | :--- | :--- |
| id | number | Firmanın benzersiz kimliği. |
| name | string | Firmanın adı. |
| active | string | Firmanın durumu (örneğin, "Active"). |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıt">

```json status="200" title="Success"
[
  {
    "active": "Active",
    "id": 1,
    "name": "MoneyGram"
  },
  {
    "active": "Active",
    "id": 4,
    "name": "PayPorter"
  }
]
```

  </TabItem>
</Tabs>
</ApiResponseSelector>
