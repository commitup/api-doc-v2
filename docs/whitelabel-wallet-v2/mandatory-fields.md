---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Mandatory Fields

Dynamically retrieve the list of mandatory `ReceiverInfo` fields required for a specific destination country, transfer type, and configuration. This allows partners to build dynamic user interfaces without relying on validation errors to discover required fields.

<ApiEndpoint method="GET" url="/wallet/p2p/card/mandatory-fields" />

## Request

<Tabs>
  <TabItem value="fields" label="Query Parameters" default>

| Parameter | Type | Required | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `destinationCountry` | String | **Yes** | ISO 3166-1 alpha-3 | The destination country code. Example: `IDN`. |
| `transferType` | String | No | Enum | Defaults to `CARD`. Can be specified if querying other transfer routes. |

  </TabItem>
  <TabItem value="headers" label="Headers">

```http
GET /wallet/p2p/card/mandatory-fields?destinationCountry=IDN HTTP/1.1
Accept: application/json
X-Api-Key: your_api_key
X-Api-Secret: your_api_secret
X-Wallet-Id: your_wallet_id
```

  </TabItem>
  <TabItem value="curl" label="cURL">

```bash
curl -G "https://whitelabelwallet-mig.payporter.com.tr:8590/wallet/p2p/card/mandatory-fields" \
     -d "destinationCountry=IDN" \
     -H "Accept: application/json" \
     -H "X-Api-Key: your_api_key" \
     -H "X-Api-Secret: your_api_secret" \
     -H "X-Wallet-Id: your_wallet_id"
```

  </TabItem>
</Tabs>

## Response

The response returns a list of required and optional fields for the requested route. 

<Tabs>
  <TabItem value="success" label="Success" default>
<ApiResponseSelector>

```json status="200" title="Success"
{
  "destinationCountry": "IDN",
  "mandatoryFields": [
    "firstName",
    "lastName",
    "receiverType",
    "nationality",
    "phoneCountryCode",
    "phoneNumber"
  ],
  "optionalFields": [
    "fatherName",
    "birthDate",
    "birthPlace",
    "birthCountry",
    "identityNo",
    "identityType",
    "identityIssueCountry",
    "identityValidThru",
    "identityIssueDate",
    "addressCountry",
    "address",
    "province",
    "district",
    "zipCode",
    "job",
    "email"
  ]
}
```

</ApiResponseSelector>
  </TabItem>
</Tabs>
