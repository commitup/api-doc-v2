package commitup.pf;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import javax.crypto.Cipher;
import org.junit.jupiter.api.Test;

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
