# ### QR Code API Documentation

## Version History

| Version | Date | Changes |
| :--- | :--- | :--- |
| 1.0.1 | 2026-04-08 | Updated field requirements and refined length constraints for Read and Confirm APIs. |
| 1.0.0 | 2026-03-20 | Initial version. |

---


> Complete API reference for integrating wallet functionality into your application.

---

## Table of Contents

- [Version History](#version-history)
- [Authentication](#authentication)
- [QR Code Transaction Types](#qr-code-transaction-types)
- [QR Code Statuses](#qr-code-statuses)
- [QR Code Info (READ)](#qrcode-info)
- [QR Code Confirm](#qrcode-confirm)
- [QR Transaction Find by Transaction ID](#find-by-transaction-id)
- [QR Transaction Webhook](#webhook)
- [Reconciliation Search](#reconciliation-search)
- [Mock APIs](#mock-apis)


---

## Authentication

All API requests require authentication via API key/secret and a security key.
Security key is constructed from walletId and public RSA key provided by us.


### API Key Authentication (Server-to-Server)

Include these headers in every request:

| Header | Description                | Example                                |
|--------|----------------------------|----------------------------------------|
| `X-Api-Key:` | Provided api key           | `a208c005-17a2-441a-b3e9-58b6e0d6c082` |
| `X-Api-Secret` | Provided api secret       | `3208c005-17a6-441a-b3e9-58b6e0d6c082` |
| `X-Wallet-Id` | Target wallet identifier   | `1234567890`                           |
| `X-Security-Key` | Encrypted secure data token | Base64 string                          |

---

### X-Security-Key Header Generation

You need to have a `walletId` and its corresponding RSA public key (`accessKey`) stored in previous step to generate the `X-Security-Key` header for authenticated requests.
The `X-Security-Key` header contains encrypted wallet authentication data.

#### 1. Data Structure

Create a JSON payload with the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `deviceId` | String | The wallet ID |
| `timestamp` | String | ISO 8601 format: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'` |

**Example:**

```json
{
  "deviceId": "16250953",
  "timestamp": "2023-10-27T10:00:00.123Z"
}
```

#### 2. Encryption

Encrypt the JSON string using RSA:

| Parameter | Value |
|-----------|-------|
| Algorithm | RSA |
| Mode | ECB |
| Padding | PKCS1Padding (PKCS#1 v1.5) |
| Key | Wallet's RSA Public Key (X.509 encoded) |

#### 3. Encoding

Base64 encode the encrypted byte array.

#### Example (JavaScript)

```javascript
const publicKeyPEM = "RSA PUBLIC KEY of walletId 1234567890";
const payload = {
  walletId: "1234567890",
  timestamp: "2026-01-07T09:40:16.524Z"
};
const secureData = await RSA.encrypt(JSON.stringify(payload), publicKeyPEM);
```

#### Reference Implementations

Complete examples are available in the `secure-data-generation/` folder:

- [Java](./example.java)
- [Go](./example.go)
- [PHP](./example.php)


---


### QR CODE TRANSACTION TYPES
| Code           | Description |
|----------------|-------------|
| PAYMENT        | PAYMENT     |
| REFUND         | REFUND      |



### QR CODE STATUSES
| Code        | Description             |
|-------------|-------------------------|
| READ_QR     | called payment info api |
| IN_PROGRESS | qrcode completed        |      
| FAILED      | transaction failed      |
| COMPLETED   | transaction completed   |




### QR Code Flow

## QR Code Info (READ)
`POST /wallet/qrcode/payment/read`

-This is the transaction detail of the QR code scanned by the camera. From here, transactionType returns PAYMENT or REFUND.
### Read Request Body
| Field | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `qrCode` | String | Yes | 500 | The QR code string scanned by the camera. |

```json 
{
  "qrCode": "999998261035605117b00490089854ce1ed71c8898da336966E827"
}
```

### Read Response - Payment
> [!WARNING]
> If the returned `amount` is `null`, the partner presents an amount entry UI to the user before proceeding.

```json
{
  "transactionId": "470023232",
  "transactionType": "PAYMENT",
  "status": "READ_QR",
  "amount": 11.50,
  "qrGenerationDate": "2025-07-14T15:53:21.000+0300",
  "qrExpireDate": "2026-07-14T15:53:21.000+0300",
  "currency": "TRY",
  "merchantId": 98765433210,
  "mcc": 5411,
  "merchantName": "Lezzet Lokantası",
  "countryCode": "TR",
  "merchantCity": "ANTALYA",
  "terminalType": "STATIC_QRCODE",
  "terminalId": "12345678901234567890ABC"
}
```

### Read Response - Refund
```json
{
  "transactionId": "470023233",
  "parentTransactionId": "470023232",
  "transactionType": "REFUND",
  "status": "READ_QR",
  "amount": 11.50,
  "currency": "TRY",
  "merchantId": 98765433210,
  "mcc": 5411,
  "merchantName": "Lezzet Lokantası",
  "countryCode": "TR",
  "merchantCity": "ANTALYA",
  "terminalType": "STATIC_QRCODE",
  "terminalId": "12345678901234567890ABC"
}
```

## Confirm QR Payment
`POST /wallet/qrcode/payment/confirm`

- For payments, partner debits the resolved amount from the customer's account. This happens **before** calling confirm.
- For refunds, partner must wait for the webhook to credit the amount to the customer's account.
- If the payment status is `IN_PROGRESS`, the result will be notified asynchronously via the following webhook.


### Confirm Request Body
| Field | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `transactionId` | String | Yes | 255 | The unique identifier of the transaction. |
| `tenantReferenceId` | String | Yes | 100 | Tenant's unique reference ID for this transaction. |
| `amount` | BigDecimal | Yes | - | The transaction amount. |
| `tenantUserId` | String | Yes | 50 | The unique identifier of the tenant's user/customer. |
| `tenantName` | String | No | 50 | The name of the tenant user. |
| `tenantSurname` | String | No | 50 | The surname of the tenant user. |
| `tenantNationality` | String | No | 50 | The nationality of the tenant user. |
| `tenantBirthDate` | String | No | 10 | The birth date of the tenant user. |

```json
{
  "transactionId": "470023232",
  "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
  "amount": 11.50,
  "tenantUserId": "364",
  "tenantName": "Tahir",
  "tenantSurname": "incedere",
  "tenantNationality": "türkiye",
  "tenantBirthDate": "28-12-1996"
}
```

### Confirm Response - Payment
```json
{
  "transactionId": "470023232",
  "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
  "tenantUserId": "364",
  "transactionType": "PAYMENT",
  "status": "IN_PROGRESS",
  "amount": 11.50,
  "qrGenerationDate": "2025-07-14T15:53:21.000+0300",
  "qrExpireDate": "2026-07-14T15:53:21.000+0300",
  "currency": "TRY",
  "merchantId": 98765433210,
  "mcc": 5411,
  "merchantName": "Lezzet Lokantası",
  "countryCode": "TR",
  "merchantCity": "ANTALYA",
  "terminalType": "STATIC_QRCODE",
  "terminalId": "12345678901234567890ABC"
}
```

### Confirm Response - Refund
```json
{
  "transactionId": "470023233",
  "parentTransactionId": "470023232",
  "tenantReferenceId": "18f7e5d4-8142-5g1b-cd01-4346bbb3701d",
  "tenantUserId": "364",
  "transactionType": "REFUND",
  "status": "IN_PROGRESS",
  "amount": 11.50,
  "currency": "TRY",
  "merchantId": 98765433210,
  "mcc": 5411,
  "merchantName": "Lezzet Lokantası",
  "countryCode": "TR",
  "merchantCity": "ANTALYA",
  "terminalType": "STATIC_QRCODE",
  "terminalId": "12345678901234567890ABC"
}
```


## QR Code Find Transactions
`GET /wallet/qrcode/transactions`

- Finds and returns the details of a QR transaction by its `transactionId xor tenantReferenceId`.

Query Parameters:
| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `transactionId` | String | If `tenantReferenceId` empty | 255 | Original PayPorter transaction ID. |
| `tenantReferenceId` | String | If `transactionId` empty | 100 | Partner's unique reference ID. |

Response:
```json
{
  "transactionId": "470023232",
  "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
  "tenantUserId": "364",
  "transactionType": "PAYMENT",
  "status": "IN_PROGRESS",
  "amount": 84,
  "qrGenerationDate": "2025-07-14T15:53:21.000+0300",
  "qrExpireDate": "2026-07-14T15:53:21.000+0300",
  "currency": "TRY",
  "merchantId": 98765433210,
  "mcc": 5411,
  "merchantName": "Lezzet Lokantası",
  "countryCode": "TR",
  "merchantCity": "ANTALYA",
  "terminalType": "STATIC_QRCODE",
  "terminalId": "12345678901234567890ABC"
}
```


## QR TRANSACTION WEBHOOK {#webhook}


PayPorter sends a `POST` request to the Partner webhook at `/partner/qrcode/webhook` whenever a transaction occurs. Once finalized, the result of `IN_PROGRESS` operations will be sent as `COMPLETED` or `FAILED`.


**Retry Policy:**
- Expect `200 OK` response
- Retry up to 3 times with 10-second delay
- Then retry every hour for up to 48 hours

### Headers

| Header | Description | Example |
|--------|-------------|---------|
| `request-sign` | HmacSHA256 hash of the request body using your secret key | `5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8` |


### Webhook Signature Verification

To ensure the security and integrity of the webhook, PayPorter signs the request body using a secret value.

**Secret Value**
A secret value, which we will provide, is used during the hashing process. This secret value ensures the security and integrity of the webhook.

**Signature Generation**
The signature is generated using the HMAC-SHA256 algorithm. The entire JSON request body is hashed using your secret key.

**Request Header**
The resulting hashed value is included in the request under the `request-sign` header.

#### Reference Implementations

Complete examples for generating the webhook signature are available:

- [Java](./webhook-example.java)
- [Go](./webhook-example.go)
- [PHP](./webhook-example.php)



### Example Request - Payment

Example Request:
```json
{
  "transactionId": "470023232",
  "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
  "tenantUserId": "364",
  "transactionType": "PAYMENT",
  "status": "COMPLETED",
  "amount": 11.50,
  "qrGenerationDate": "2025-07-14T15:53:21.000+0300",
  "qrExpireDate": "2026-07-14T15:53:21.000+0300",
  "currency": "TRY",
  "merchantId": 98765433210,
  "mcc": 5411,
  "merchantName": "Lezzet Lokantası",
  "countryCode": "TR",
  "merchantCity": "ANTALYA",
  "terminalType": "STATIC_QRCODE",
  "terminalId": "12345678901234567890ABC"
}
```
### Example Request - Refund

Example Request:
```json
{
  "transactionId": "470023233",
  "parentTransactionId": "470023232",
  "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
  "tenantUserId": "364",
  "transactionType": "REFUND",
  "status": "COMPLETED",
  "amount": 11.50,
  "qrGenerationDate": "2025-07-14T15:53:21.000+0300",
  "qrExpireDate": "2026-07-14T15:53:21.000+0300",
  "currency": "TRY",
  "merchantId": 98765433210,
  "mcc": 5411,
  "merchantName": "Lezzet Lokantası",
  "countryCode": "TR"
}
```


**Approved Response:**

```json
{
  "response": {
    "status": "true"
  }
}
```


### RECONCILIATION SEARCH
`GET /external/whitelabel/qrcode/reconciliation`

- Returns only COMPLETED transaction records within the given UTC date range for reconciliation purposes.

Query Parameters:
| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `startDate` | String | Yes | - | UTC starting date (ISO 8601). |
| `endDate` | String | Yes | - | UTC ending date (ISO 8601). |

Response:
```json
{
  "count": 3,
  "paymentCount": 2,
  "paymentTotalAmount": 204.50,
  "refundCount": 1,
  "refundTotalAmount": 84.00,
  "data": [
    {
      "transactionId": "470023232",
      "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
      "tenantUserId": "364",
      "transactionType": "PAYMENT",
      "status": "COMPLETED",
      "settlementAmount": 84.00,
      "settlementCurrency": "TRY",
      "transactionDate": "2025-07-14T15:53:21Z"
    },
    {
      "transactionId": "470023235",
      "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
      "tenantUserId": "364",
      "transactionType": "PAYMENT",
      "status": "COMPLETED",
      "settlementAmount": 120.50,
      "settlementCurrency": "TRY",
      "transactionDate": "2025-07-14T16:15:00Z"
    },
    {
      "transactionId": "470023255",
      "tenantReferenceId": "08e6e4d3-7031-4f0a-bc90-3235aaa2600c",
      "tenantUserId": "364",
      "parentTransactionId": "470023232",
      "transactionType": "REFUND",
      "status": "COMPLETED",
      "settlementAmount": 84.00,
      "settlementCurrency": "TRY",
      "transactionDate": "2025-07-15T10:11:00Z"
    }
  ]
}
```




## MOCK APIs (ExternalQrCodeController)

### GENERATE MOCK QR CODE
`GET /external/whitelabel/qrcode/generate-mock-qr-code`

- Generates a mock QR code string to be used in read/confirm flows.

Query Parameters:
| Parameter | Type | Required | Length | Description |
| :--- | :--- | :--- | :--- | :--- |
| `qrCodeTransactionType` | String | Yes | - | e.g., PAYMENT, REFUND. |
| `amount` | BigDecimal | Yes | - | Transaction amount. |
| `parentTransactionId` | String | No | 255 | Original transaction ID (for refunds). |
| `errorCode` | String | No | - | e.g., QR_CODE_USED, etc. |

Response:
```text
"00020101021226800010TR.COM.BKM06011083219a632ee403e49b1c5505258311606280910TDVMAUJ0001001N110200491000234156725195000210020499980312843904678755040202052312345678901234567890ABC0612260225142423071226022514292352045661530394954120000000025005802TR5914Faruk Eczanesi6007ANTALYA6105070006304AA55"
```


### START MOCK AUTHORIZATION
`GET /external/whitelabel/qrcode/start-mock-authorization`

- Starts authorization and pushes message to Queue for an IN_PROGRESS transaction.

Query Parameters:
- `transactionId` (String) - Required

Response:
`200 OK` (No Content)

