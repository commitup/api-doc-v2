# QR Kodu Oku

Bir satıcının QR kodunu tarayın ve işlem detaylarını (satıcı adı, tutar vb.) alın.

<ApiEndpoint method="POST" url="/qrcode/payment/read" />

## Genel Bakış

Bu uç nokta, ham QR verisini işler ve ödeme işlemini başlatmak için gereken detaylı bilgileri döndürür. Desteklenen işlem türleri arasında standart ödemeler ve iade talepleri bulunur.

---

## İstek Parametreleri

| Parametre | Zorunlu | Tip | Açıklama |
| :--- | :--- | :--- | :--- |
| qrData | Evet | string | Taranan ham QR kodu verisi. |
