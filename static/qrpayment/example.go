package main

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"time"
)

// Java'daki WhitelabelSecureData karşılığı
type WhitelabelSecureData struct {
	DeviceId  string `json:"deviceId"`
	Timestamp string `json:"timestamp"`
}

func generateSecureDataJSON(walletId string) (string, error) {
	// Java format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
	// We use UTC to be safe with the 'Z' suffix
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
	// Public key (X.509 DER) base64 decode
	pubDer, err := base64.StdEncoding.DecodeString(publicKeyBase64)
	if err != nil {
		return "", fmt.Errorf("invalid public key base64: %w", err)
	}

	// Parse X.509 SubjectPublicKeyInfo
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
