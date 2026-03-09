---
sidebar_position: 1
---

# Türk Bankalarına EFT

EFT hizmeti, Türkiye'deki herhangi bir banka hesabına doğrudan para göndermenize olanak tanır. 
Bu hizmet, yüksek hacimli işlemler için optimize edilmiştir ve API'lerimiz aracılığıyla gerçek zamanlı durum güncellemeleri sağlar.

## Genel Bakış

EFT (Elektronik Fon Transferi), Türkiye'deki farklı bankalar arasındaki yerel para transferleri için standart yöntemdir. Payporter'ın EFT API'si, bu transferleri sorunsuz bir şekilde başlatmak için programlı bir yol sunar.

### Temel Özellikler

*   **Döviz Kurları**: İşlem hesabınızdan farklı bir para biriminde fon gönderiyorsanız, gerçek zamanlı dönüşüm kurlarını alın.
*   **Gerçek Zamanlı Durum Kontrolü**: Özel durum uç noktalarını kullanarak transferinizin "İşleniyor"dan "Tamamlandı" veya "İptal Edildi"ye kadar olan yaşam döngüsünü izleyin.
*   **Transfer Yönetimi**: İşlem geçmişinizde arama yapın veya henüz banka tarafından işlenmemiş bekleyen transferleri iptal edin.
*   **İade Takibi**: Alıcı banka tarafından iade edilen işlemleri otomatik olarak takip edin ve iade nedenini görün.
*   **Webhooklar (YENİ)**: Durum için sürekli sorgulama yapmak yerine, bir transfer durumu değiştiğinde anlık POST bildirimleri almak için güvenli Webhook sistemimizi kullanın.

### Premium Ücretli Özellikler

*   **IBAN Doğrulama**: Transferi başlatmadan önce, alıcının IBAN'ının geçerli olup olmadığını ve sağlanan isim ve para birimiyle eşleşip eşleşmediğini doğrulayabilirsiniz. Bu özellik ek ücrete tabidir. Daha fazla bilgi için lütfen müşteri temsilcinizle iletişime geçin.

## Başlamadan Önce

Şunlara sahip olduğunuzdan emin olun:
1. Geçerli bir **Erişim Token'ı** (`/login` uç noktasından alınan).
2. Operasyon hesabınızda yeterli bakiye.
3. Alıcının **IBAN** numarası ve Tam Adı.
