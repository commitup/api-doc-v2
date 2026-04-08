package com.payporter.webhook;

import com.fasterxml.jackson.databind.ObjectMapper;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.HashMap;
import java.util.Map;

/**
 * Example class to demonstrate how to generate HMAC-SHA256 signature for PayPorter webhooks.
 */
public class WebhookSignatureExample {

    public static void main(String[] args) {
        // The secret key provided by PayPorter
        String secret = "your-secret-key";
        
        // Example request body object (should match the JSON structure received in the webhook)
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("transactionId", "470023232");
        requestBody.put("tenantReferenceId", "08e6e4d3-7031-4f0a-bc90-3235aaa2600c");
        requestBody.put("tenantUserId", "364");
        requestBody.put("status", "COMPLETED");
        requestBody.put("amount", 11.50);

        try {
            String signature = encrypt(secret, requestBody);
            System.out.println("Generated Signature (request-sign): " + signature);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Generates HMAC-SHA256 signature for the given request object.
     * @param secret The secret key used for hashing.
     * @param request The request body object to be hashed.
     * @return Hexadecimal representation of the HMAC-SHA256 hash.
     */
    public static String encrypt(String secret, Object request) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            // Convert the request object to JSON string
            String json = mapper.writeValueAsString(request);
            
            String algo = "HmacSHA256";
            SecretKeySpec keySpec = new SecretKeySpec(secret.getBytes(), algo);
            Mac mac = Mac.getInstance(algo);
            mac.init(keySpec);
            
            // Generate the hash
            byte[] hash = mac.doFinal(json.getBytes());
            
            // Convert byte array to hex string
            return bytesToHex(hash);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate signature", e);
        }
    }

    /**
     * Converts a byte array to its hexadecimal string representation.
     */
    public static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xFF & b);
            if (hex.length() == 1) {
                sb.append('0');
            }
            sb.append(hex);
        }
        return sb.toString();
    }
}
