# AUTHENTICATION

## LOGIN

User or landlord sign in process. Returns an `accessToken` and a `refreshToken`

**URL** : `/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
  "username": "[valid email address]",
  "password": "[password in plain text]",
  "type": "either 'user' or 'landlord' depending on user type"
}
```

**Data example**

```json
{
  "username": "somebody@example.com",
  "password": "pa5sW0rD"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "accessToken": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d",
  "refreshToken": "93144b2wefowhugyoi32qiu2o2341a51766ecd3d"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `403 BAD REQUEST`

**Content** :

```json
{
  "error": "Wrong username or password"
}
```

## TOKEN REFRESH

Refresh token gained from server is sent to renew access token.

**URL**: `/token`

**Auth required**: NO

**Method**: `POST`

**Data example**:

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbWVzdGFtcHRlc3RlckBpbnRlcm5ldC5vcmciLCJpYXQiOjE2MTIzNTgxOTN9.BRJ_52aVNS14sZwqeyQ4TylOzl37m-oiwN3YSIAUvkU"
}
```

### Success response

**Code**: `200 OK`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzNTgzMDUsImV4cCI6MTYxMjM2MTkwNX0.1ZAQ09MUteQ9chIbusZmfxtw5k-aUvN8vRJHgZvWoxA"
}
```

### Error response

**Condition**: Bad token.

**Code**: `403 FORBIDDEN`

**Content**:

```json
{ "error": "bad refreshToken! Log in again!" }
```

#### Or

**Condition**: Token missing from request body.

**Code**: `401 UNAUTHORIZED`

**Content**:

```json
{
  "error": "refreshtoken not found!"
}
```

## LOGOUT

A logged in user's refresh token is sent to be revoked by the server when the user decides to log out.

**URL**: `/logout`

**Auth required**: NO

**Method**: `POST`

**Data example**:

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbWVzdGFtcHRlc3RlckBpbnRlcm5ldC5vcmciLCJpYXQiOjE2MTIzNTg4NzJ9.btJXuL2T_3R7ggNtA4z5IBDfmLaGrV5H1ezUA3_cwA8"
}
```

### Success response

**Code**: `200 OK`

**Content**:

```json
{ "message": "Logged out!" }
```
