---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Login

Access to all endpoints of the API requires authentication through a Bearer Token.

<ApiEndpoint method="POST" url="/oauth-login" />

**Request**

Username and password will be provided. If you don't have them, please contact your account manager.

<Tabs>
  <TabItem value="table" label="Parameters" default>
    | Parameter | Required | Type   | Description |
    |-----------|----------|--------|-------------|
    | username  | True     | string | Username    |
    | password  | True     | string | Password    |
  </TabItem>
  <TabItem value="request_example" label="Example Request">
    ```shell
    curl -X POST https://api.example.com/oauth-login \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -d "username=john" \
        -d "password=secret"
    ```
  </TabItem>
</Tabs>

**Response**

<Tabs>
  <TabItem value="response_table" label="Body Properties" default>
    | Parameter     | Type   | Description |
    |---------------|--------|-------------|
    | access_token  | string | Access Token that you should use in the Authorization header |
    | token_type    | string | Bearer |
    | refresh_token | string | Deprecated, not used |
    | expires_in    | number | Token expires in  **seconds** |
    | scope         | string | Scope assigned to the token |
  </TabItem>
  <TabItem value="response_example" label="Example Response">
    <ApiResponseSelector>

```json status="200" title="Success Response"
{
  "header": {
    "success": true,
    "code": "0",
    "message": "İşleminiz başarıyla gerçekleşmiştir",
    "messageCode": "OPERATION_DONE_SUCCESSFUL"
  },
  "responseObject": {
    "access_token": "578628e9-3b10-4a31-bfc7-56f148e68fee",
    "token_type": "bearer",
    "refresh_token": "7702dd57-9ef4-4892-9dd3-557ab6d7c25c",
    "expires_in": 3599,
    "scope": "read write"
  }
}
```

```json status="406" title="Business Error"
{
    "header": {
        "success": false,
        "code": "35",
        "message": "Giriş bilgileriniz hatalıdır",
        "messageCode": "LOGIN_FAILURE.BADCREDENTIALSEXCEPTION"
    },
    "responseObject": null
}
```

```json status="400" title="Bad Request"
{
    "header": {
        "success": true,
        "code": null,
        "message": null,
        "messageCode": null
    },
    "responseObject": null
}
```

```json status="500" title="Internal Server Error"
{
      "header": {
        "success": false,
        "code": "500",
        "message": "Internal Server Error",
        "messageCode": null
    },
    "responseObject": null
}
```

    </ApiResponseSelector>
  </TabItem>
</Tabs>

### Important Notes About Login
- You should keep the token and use the same token until it expires. 
- We kindly ask you to avoid getting a new token before each transaction, as it’s a high-cost operation. 
- When the token is expired, you will receive an `HTTP 401` error. You should call login and get a new token. 
- It’s possible that your token may be inactive before it expires. In that case, you will receive an `HTTP 406` with `messageCode: LOGOUT`. You should call login and get a new token.
