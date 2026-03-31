---
sidebar_position: 2
---

import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

# Аутентификация

Все запросы к API требуют аутентификации через заголовки API-ключей.

### Аутентификация по API-ключу (Server-to-Server)

Включайте эти заголовки в каждый запрос:

```http
X-Api-Key: <ваш_api_key>
X-Api-Secret: <ваш_api_secret>
```

---

## Аутентификация для конкретного кошелька

:::important
**Все конечные точки кошелька требуют аутентификации кошелька.** Нет ни одной конечной точки, которую можно было бы вызвать без учетных данных кошелька.
- **Индивидуальные кошельки**: Используйте `walletId` и `accessKey`, полученные от конечной точки `/wallet/register`.
- **Корпоративные кошельки**: Используйте `walletId` и `accessKey`, предоставленные вам PayPorter во время подключения (onboarding).
:::

Корпоративные кошельки функционируют идентично индивидуальным. Вы можете использовать `GET /wallet` для просмотра баланса вашего корпоративного кошелька и выполнения операций (переводы, EFT, дебет, кредит), используя те же конечные точки с аутентификацией корпоративного кошелька.

Для операций, привязанных к кошельку, требуются дополнительные заголовки:

| Заголовок | Описание | Пример |
|--------|-------------|---------|
| `X-Wallet-Id` | Идентификатор целевого кошелька | `1234567890` |
| `X-Security-Key` | Зашифрованный токен безопасных данных | Строка Base64 |
| `X-Device-Info` | Бренд и модель устройства | `Samsung-S21`, `iPhone-12 Pro` |
| `X-Device-Id` | Уникальный идентификатор устройства | UUID |
| `X-Access-Ip` | IP-адрес клиента | `192.168.1.1` |
| `X-Access-Port` | Порт клиента | `443` |

---

## Генерация заголовка безопасных данных

Вам необходимо иметь `walletId` и соответствующий ему открытый ключ RSA (`accessKey`) для генерации заголовка `X-Security-Key` для аутентифицированных запросов. Заголовок `X-Security-Key` содержит зашифрованные данные аутентификации кошелька.

### 1. Структура данных

Создайте JSON-объект со следующими полями:

| Поле | Тип | Описание |
|-------|------|-------------|
| `deviceId` | String | ID кошелька |
| `timestamp` | String | Формат ISO 8601: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'` |

**Пример:**

```json
{
  "deviceId": "16250953",
  "timestamp": "2023-10-27T10:00:00.123Z"
}
```

### 2. Шифрование

Зашифруйте строку JSON с помощью RSA:

| Параметр | Значение |
|-----------|-------|
| Алгоритм | RSA |
| Режим | ECB |
| Заполнение (Padding) | PKCS1Padding (PKCS#1 v1.5) |
| Ключ | Открытый RSA-ключ кошелька (кодировка X.509) |

### 3. Кодирование

Закодируйте зашифрованный массив байтов в Base64.

### Справочные реализации

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```javascript
const publicKeyPEM = "RSA PUBLIC KEY of walletId 1234567890";
const payload = {
  walletId: "1234567890",
  timestamp: "2026-01-07T09:40:16.524Z"
};
const secureData = await RSA.encrypt(JSON.stringify(payload), publicKeyPEM);
```

  </TabItem>
  <TabItem value="java" label="Java">

```java 

package commitup.pf;

class WalletSecureDataTest {
    record WhitelabelSecureData(
            String deviceId,
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") Date timestamp) {
    }

    @Test
    void testWalletSecureData() throws JsonProcessingException {
        var walletId = "16250953";
        var publicKeyString = "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAoRVM4ZYsAvTlPO+DAA7klpiuWauIVwsa50YqojEptD56vUrd0niepStPw2dtWDevogjCj3q6fN8fnaTabGl16gRc3QJc6/euf3G++wJjDHGAnnkNpG1RIsEOvC/lhFfmuJ7DxW2suCpZObQ12Fr++F8KgHT0rHfvqX4YqtJirJABOlUumc9CK5B6SGzyHGDNjFXyUgWdt1lfpnFo6Hxhyb3rY9Ivl4wX6F5sdIpkJYiamS0I3dKVd/qLtGiv5WlVprqwZgMcFC7wLEODh5A7NWIXrLoihluJYh98pdwrNir0VmluJ4i8tcrhAWg9p8980yo3/HKw3rQgg57CYUCY1plQuRrGUhUI7JOtHZbpnZiKXe/8+lMAVhlGfmNhWiudS0KFwFC65RM64sQf4e1l6w5F0EfAlbbV2pwWTJChXe6LsfxmIpfdblal/rrXQXkyCYy1MroaLAHUBwvRd3DxGUjjyEXC0lO3+xwrD2hNL9bXmSYm4QZ35t6BS5oudk6LfTD3JD4ZWuD1uoOHI1cs4t0E5uwzxk5iHP22cBqFIMI/+HawbQT6ubpz0OeVxLrwNKiPxh6/C7Ags7Yw7K5YxMHCArj1XaxMDXtparJkNACJ42YTseSZ7Mxw5Ov+GDiW3d9MD4sM5h5cVVJ/xuWKBMS3oi+r0zpXq0+xTXCS9s0CAwEAAQ==";

        var secureDataJson = generateSecureDataJson(walletId);
        System.out.println("Secure : " + secureDataJson);
        System.out.println("Encrypted secure data: " + encryptSecureDataJson(secureDataJson, publicKeyString));
    }

    public String generateSecureDataJson(String walletId) throws JsonProcessingException {
        var secureData = new WhitelabelSecureData(walletId, new Date());
        var om = new ObjectMapper();
        return om.writeValueAsString(secureData);
    }

    public String encryptSecureDataJson(String secureDataJson, String publicKeyString) throws JsonProcessingException {
        String encryptedData = "";
        Cipher cipher = null;
        try {
            byte[] publicKeyBytes = Base64.getDecoder().decode(publicKeyString);
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicKeyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PublicKey publicKey = keyFactory.generatePublic(keySpec);

            cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);

            byte[] encrypted = cipher.doFinal(secureDataJson.getBytes());

            encryptedData = Base64.getEncoder().encodeToString(encrypted);

        } catch (Exception e) {
            throw new IllegalArgumentException();

        }
        return encryptedData;
    }
}

```

  </TabItem>
  <TabItem value="go" label="Go">

```go
package main

	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"time"
)

// WhitelabelSecureData Соответствие Java
type WhitelabelSecureData struct {
	DeviceId  string `json:"deviceId"`
	Timestamp string `json:"timestamp"`
}

func generateSecureDataJSON(walletId string) (string, error) {
	// Формат Java: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
	// Мы используем UTC для безопасности с суффиксом 'Z'
	timestamp := time.Now().UTC().Format("2006-01-02T15:04:05.000Z")

	secureData := WhitelabelSecureData{
		DeviceId:  walletId,
		Timestamp: timestamp,
	}
	b, err := json.Marshal(secureData)
	if err != nil {
		return "", err
	}
	return string(b), nil
}

// Java: RSA/ECB/PKCS1Padding == Go: rsa.EncryptPKCS1v15
func encryptSecureDataJSON(secureDataJSON string, publicKeyBase64 string) (string, error) {
	// Декодирование из base64 открытого ключа (X.509 DER)
	pubDer, err := base64.StdEncoding.DecodeString(publicKeyBase64)
	if err != nil {
		return "", fmt.Errorf("invalid public key base64: %w", err)
	}

	// Парсинг X.509 SubjectPublicKeyInfo
	pubAny, err := x509.ParsePKIXPublicKey(pubDer)
	if err != nil {
		return "", fmt.Errorf("invalid public key DER (PKIX): %w", err)
	}

	pub, ok := pubAny.(*rsa.PublicKey)
	if !ok {
		return "", fmt.Errorf("public key is not RSA")
	}

	encryptedBytes, err := rsa.EncryptPKCS1v15(rand.Reader, pub, []byte(secureDataJSON))
	if err != nil {
		return "", fmt.Errorf("rsa encrypt failed: %w", err)
	}

	return base64.StdEncoding.EncodeToString(encryptedBytes), nil
}

func main() {
	walletId := "16250953"
	publicKeyString := "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAoRVM4ZYsAvTlPO+DAA7klpiuWauIVwsa50YqojEptD56vUrd0niepStPw2dtWDevogjCj3q6fN8fnaTabGl16gRc3QJc6/euf3G++wJjDHGAnnkNpG1RIsEOvC/lhFfmuJ7DxW2suCpZObQ12Fr++F8KgHT0rHfvqX4YqtJirJABOlUumc9CK5B6SGzyHGDNjFXyUgWdt1lfpnFo6Hxhyb3rY9Ivl4wX6F5sdIpkJYiamS0I3dKVd/qLtGiv5WlVprqwZgMcFC7wLEODh5A7NWIXrLoihluJYh98pdwrNir0VmluJ4i8tcrhAWg9p8980yo3/HKw3rQgg57CYUCY1plQuRrGUhUI7JOtHZbpnZiKXe/8+lMAVhlGfmNhWiudS0KFwFC65RM64sQf4e1l6w5F0EfAlbbV2pwWTJChXe6LsfxmIpfdblal/rrXQXkyCYy1MroaLAHUBwvRd3DxGUjjyEXC0lO3+xwrD2hNL9bXmSYm4QZ35t6BS5oudk6LfTD3JD4ZWuD1uoOHI1cs4t0E5uwzxk5iHP22cBqFIMI/+HawbQT6ubpz0OeVxLrwNKiPxh6/C7Ags7Yw7K5YxMHCArj1XaxMDXtparJkNACJ42YTseSZ7Mxw5Ov+GDiW3d9MD4sM5h5cVVJ/xuWKBMS3oi+r0zpXq0+xTXCS9s0CAwEAAQ=="

	secureJSON, err := generateSecureDataJSON(walletId)
	if err != nil {
		panic(err)
	}

	fmt.Println("Secure :", secureJSON)

	encrypted, err := encryptSecureDataJSON(secureJSON, publicKeyString)
	if err != nil {
		panic(err)
	}

	fmt.Println("Encrypted secure data:", encrypted)
}

```

  </TabItem>
  <TabItem value="php" label="PHP">

```php
<?php

function generateSecureDataJson(string $walletId): string
{
    $secureData = [
        "deviceId" => $walletId,
        // Java pattern: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        // v = миллисекунды
        "timestamp" => (new DateTimeImmutable("now", new DateTimeZone("UTC")))->format("Y-m-d\TH:i:s.v\Z"),
    ];

    $json = json_encode($secureData, JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        throw new RuntimeException("json_encode failed: " . json_last_error_msg());
    }
    return $json;
}

/**
 * Java: RSA/ECB/PKCS1Padding == OpenSSL: OPENSSL_PKCS1_PADDING
 * $publicKeyBase64: Строка base64 X.509 SubjectPublicKeyInfo (DER)
 */
function encryptSecureDataJson(string $secureDataJson, string $publicKeyBase64): string
{
    // DER bytes -> PEM
    $der = base64_decode($publicKeyBase64, true);
    if ($der === false) {
        throw new InvalidArgumentException("Invalid publicKeyBase64");
    }

    $pem = "-----BEGIN PUBLIC KEY-----\n"
        . chunk_split(base64_encode($der), 64, "\n")
        . "-----END PUBLIC KEY-----\n";

    $pubKey = openssl_pkey_get_public($pem);
    if ($pubKey === false) {
        throw new RuntimeException("openssl_pkey_get_public failed");
    }

    $encrypted = "";
    $ok = openssl_public_encrypt($secureDataJson, $encrypted, $pubKey, OPENSSL_PKCS1_PADDING);
    // openssl_free_key($pubKey); // Устарело в PHP 8.0+

    if (!$ok) {
        throw new RuntimeException("openssl_public_encrypt failed");
    }

    return base64_encode($encrypted);
}

// ---- Пример использования ----
$walletId = "16250953";
$publicKeyString = "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAoRVM4ZYsAvTlPO+DAA7klpiuWauIVwsa50YqojEptD56vUrd0niepStPw2dtWDevogjCj3q6fN8fnaTabGl16gRc3QJc6/euf3G++wJjDHGAnnkNpG1RIsEOvC/lhFfmuJ7DxW2suCpZObQ12Fr++F8KgHT0rHfvqX4YqtJirJABOlUumc9CK5B6SGzyHGDNjFXyUgWdt1lfpnFo6Hxhyb3rY9Ivl4wX6F5sdIpkJYiamS0I3dKVd/qLtGiv5WlVprqwZgMcFC7wLEODh5A7NWIXrLoihluJYh98pdwrNir0VmluJ4i8tcrhAWg9p8980yo3/HKw3rQgg57CYUCY1plQuRrGUhUI7JOtHZbpnZiKXe/8+lMAVhlGfmNhWiudS0KFwFC65RM64sQf4e1l6w5F0EfAlbbV2pwWTJChXe6LsfxmIpfdblal/rrXQXkyCYy1MroaLAHUBwvRd3DxGUjjyEXC0lO3+xwrD2hNL9bXmSYm4QZ35t6BS5oudk6LfTD3JD4ZWuD1uoOHI1cs4t0E5uwzxk5iHP22cBqFIMI/+HawbQT6ubpz0OeVxLrwNKiPxh6/C7Ags7Yw7K5YxMHCArj1XaxMDXtparJkNACJ42YTseSZ7Mxw5Ov+GDiW3d9MD4sM5h5cVVJ/xuWKBMS3oi+r0zpXq0+xTXCS9s0CAwEAAQ==";

$secureDataJson = generateSecureDataJson($walletId);
echo "Secure : " . $secureDataJson . PHP_EOL;

$encrypted = encryptSecureDataJson($secureDataJson, $publicKeyString);
echo "Encrypted secure data: " . $encrypted . PHP_EOL;

```

  </TabItem>

</Tabs>
Tabs>