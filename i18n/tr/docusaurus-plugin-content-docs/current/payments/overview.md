---
sidebar_position: 1
---

# Ödemeler Genel Bakış

Ödeme, bir referans numarası kullanarak alıcıya gelen bir transferin ödenmesi işlemidir. Bu genellikle nakit çekme (Cash Pick Up) transferleri için kullanılır.

Ödeme akışı üç ana adımdan oluşur:
1.  **Arama (Search)**: Gönderici tarafından sağlanan referans numarasını kullanarak ödeme ayrıntılarını bulun.
2.  **Doğrulama (Validate)**: Alıcı bilgilerini doğrulayın ve ödeme için hazırlanın.
3.  **Onaylama (Confirm)**: Ödemeyi kesinleştirin.

```mermaid
sequenceDiagram
    participant App as API İstemcisi
    participant API as PayPorter API
    
    Note over App,API: Adım 1: Ödeme Ara (Search)
    App->>API: POST /search (Ref No, Firma Kodu)
    API-->>App: searchUUID ve Ödeme Detayları
    
    Note over App,API: Adım 2: Ödeme Doğrula (Validate)
    App->>API: POST /validate (searchUUID, Alıcı Bilgileri)
    API-->>App: operation-id (Header'da) ve Doğrulanmış Bilgiler
    
    Note over App,API: Adım 3: Ödeme Onayla (Confirm)
    App->>API: GET /confirm (Header'da operation-id)
    API-->>App: Başarılı (İşlem Ref No, Firma Ref No)
```

### Önemli Noktalar
- Ödeme, harici bir firmadan alınan referans numarası kullanılarak işlenir.
- `confirm` methodundan önce `validate` methodu çağrılmalıdır.
- **Doğrulama (Validate)** yönteminin yanıt başlığında (header) bir `operation-id` alacaksınız. Bu kimlik, **Onaylama (Confirm)** isteği için gereklidir.
- Tahsilat için desteklenen firmaların listesini almak için **Ödeme Firma Listesi**'ni kullanın.

:::info
Ödeme "gelen" bir işlemdir (ödeme), oysa ortak para transferi uç noktaları "giden" işlemler (gönderme) içindir.
:::
