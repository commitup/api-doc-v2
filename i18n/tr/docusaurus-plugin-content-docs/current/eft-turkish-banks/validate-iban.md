---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# IBAN Doğrulama

İade ve hataları en aza indirmek için bir transfer başlatmadan önce alıcı ayrıntılarını doğrulayın.

<ApiEndpoint method="POST" url="/eft-api/V2/validate-iban" />

## Genel Bakış

IBAN Doğrulama, sağlanan bir IBAN'ın, para biriminin ve hesap sahibi adının geçerli olup olmadığını ve banka kayıtlarıyla eşleşip eşleşmediğini kontrol eden premium bir özelliktir.

:::info Premium Özellik
Bu ekstra ücretli bir özelliktir. Hesap sahibi doğrulaması yalnızca Türkiye'deki belirli katılımcı bankalar için kullanılabilir. Bu hizmeti etkinleştirmek için lütfen müşteri yöneticinizle iletişime geçin.
:::

---

## İstek Formatı

<Tabs>
  <TabItem value="table" label="Parametreler" default>

| Parametre | Zorunlu | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| iban | Evet | string | Alıcının tam IBAN'ı (örn. `TR...`). |
| name | Evet | string | Hesap sahibinin tam adı. |
| currencyCode | Evet | string | Hesabın para birimi (örn. `TRY`). |

  </TabItem>
  <TabItem value="example" label="Örnek İstek">

```json
{
  "iban": "TR123456789012345678901234",
  "name": "John Doe",
  "currencyCode": "TRY"
}
```

  </TabItem>
</Tabs>

---

## Yanıt

<Tabs>
  <TabItem value="table" label="Yanıt Parametreleri" default>

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| name | string | Hesap sahibinin maskelenmiş adı. |

  </TabItem>
  <TabItem value="example" label="Örnek Yanıt">

<ApiResponseSelector>

```json status="200" title="Başarılı (Geçerli)"
{
    "header": {
        "success": true,
        "code": "1",
        "message": "OPERATION_DONE_SUCCESSFUL",
        "messageCode": "OPERATION_DONE_SUCCESSFUL"
    },
    "responseObject": {
        "name": "ZE*** AY*** DO***"
    }
}
```

```json status="406" title="İsim Uyuşmazlığı"
{
    "header": {
        "success": false,
        "code": "577",
        "message": "The receivers name does not match the IBAN",
        "messageCode": "EFT_IBAN_CHECK_NAME_NOT_MATCH"
    },
    "responseObject": null
}
```

</ApiResponseSelector>

  </TabItem>
</Tabs>
