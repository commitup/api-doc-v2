---
sidebar_position: 1
slug: /
---

# Giriş

Bu API, PayPorter platformu üzerinden para transferlerini kolaylaştırmak için ana ağ geçidi görevi görür.
Para Transferi API'si, [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) ilkelerine göre düzenlenmiştir.

**Base URL:**
```
https://online-mig.payporter.com.tr:8586/online
```

[Postman Koleksiyonumuzu buradan indirin](https://apilist.payporter.com.tr:81/online/doc/payporter-postman.json)

## Genel API Bilgileri

### Erişim Token'ı (Access Token)
Tüm uç noktalar, Authorization başlığında bir Bearer token gerektirir. Token'ı, kimlik bilgilerinizle `/login` uç noktasını çağırarak alabilirsiniz. Bu token'ı süresi dolana kadar saklamalısınız. Token'ın süresi dolduğunda yeni bir tane oluşturmanız gerekecektir.

:::caution **Önemli**
Lütfen her istekten önce login çağırmayın. Aksi takdirde, `HTTP 429 Too Many Requests` yanıtı alırsınız.
:::

### Yanıt ve Hatalar
- **Başarı:** Bir istek başarılı olursa, `HTTP 200 OK` yanıtı alırsınız.
- **İstemci Hataları:** Geçersiz parametreler veya yapı nedeniyle bir istek başarısız olursa, `HTTP 4XX` yanıtı alırsınız.
- **İş Mantığı Hataları:** İş mantığı hataları için, yanıt gövdesinde `success` alanı `false` olarak ayarlanmış bir `HTTP 406` yanıtı alırsınız. `messageCode` alanı bir hata kodu ile doldurulacaktır. Benzersiz olan `messageCode` alanını kontrol etmeniz gerekir.
- **Sunucu Hataları:** Bir `HTTP 500 Internal Server Error` yanıtı, sunucuda bir sorun olduğu anlamına gelir. Lütfen isteği tekrar denemeden önce transfer veya ödeme durumunuzu kontrol edin.

Herhangi bir uç noktadan `messageCode` alanında `LOGOUT` alırsanız, yeni bir token almak için login uç noktasını tekrar çağırmalısınız. `LOGOUT` işlemi için `HTTP 401 Unauthorized` veya `HTTP 406` yanıtı alabilirsiniz.

### Yanıt Yapısı
Bu API'de yanıt yapısı kesinlikle şu formata uygundur:
```json
{
  "body": {
    "responseObject": { 
      // ... 
    },
    "restHeader": {
      "code": "string",
      "message": "string",
      "success": true,
      "messageCode": "string"
    }
  }
}
```

### Hız Sınırlayıcı (Rate Limiter)
Bu API'nin bir hız sınırlayıcısı vardır. Limitleri aşarsanız, `HTTP 429 Too Many Requests` yanıtı alırsınız.
