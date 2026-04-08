package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
)

/**
 * Example to demonstrate how to generate HMAC-SHA256 signature for PayPorter webhooks in Go.
 */

func main() {
	// The secret key provided by PayPorter
	secret := "your-secret-key"

	// Example request body object (should match the JSON structure received in the webhook)
	requestBody := map[string]interface{}{
		"transactionId":     "470023232",
		"tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
		"tenantUserId":      "364",
		"status":            "COMPLETED",
		"amount":            11.50,
	}

	signature, err := encrypt(secret, requestBody)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Generated Signature (request-sign):", signature)
}

/**
 * Generates HMAC-SHA256 signature for the given request object.
 */
func encrypt(secret string, request interface{}) (string, error) {
	// Convert the request object to JSON string
	jsonData, err := json.Marshal(request)
	if err != nil {
		return "", err
	}

	// Create a new HMAC-SHA256 hasher with the secret key
	h := hmac.New(sha256.New, []byte(secret))
	
	// Write the JSON data to the hasher
	h.Write(jsonData)
	
	// Return the hexadecimal representation of the hash
	return hex.EncodeToString(h.Sum(nil)), nil
}
