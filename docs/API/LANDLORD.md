# LANDLORD

Landlords are the owners of real-world apartments. The `landLord` model holds credentials, contact information and the listed apartments of the landlord.

## CREATE NEW LANDLORD

New landlord can be created with only email and password information. Whenever a landlord further completes their profile, it will be updated accordingly.

**URL**: `/landlords`

**Method**: `POST`

**Data constraints**:

Email must be unique to all other landlords in the database.
Required fields: `email(String)`, `password(String)`

**Data example**:

```json
{
  "email": "rent@landlord.com",
  "password": "nicehouse",
  "name": "Ossi",
  "surname": "Omistaja",
  "img": "z�r�*)"
}
```

## Success response

**Condition**: Everything is OK and a landlord account didn't exist for this email address.
**Code**: `201 CREATED`

**Content example**:
Response with user saved to server

```json
{
  "blockedUsers": [],
  "apartments": [],
  "_id": "6009705863e4433e88b7f846",
  "email": "rent@landlord.com",
  "password": "nicehouse",
  "name": "Ossi",
  "surname": "Omistaja",
  "img": "z�r�*)",
  "creationTime": "2021-01-21T12:15:20.125Z",
  "lastActive": "2021-01-21T12:15:20.125Z",
  "__v": 0
}
```

## Error Responses

**Condition**: If given email is already related to a landlord in the database. The email addresses given to the server are converted to lower case to avoid dupliavtion with case mismatch.

**Code**: `403 FORBIDDEN`

**Response example**:

```json
{
  "driver": true,
  "name": "MongoError",
  "index": 0,
  "code": 11000,
  "keyPattern": {
    "email": 1
  },
  "keyValue": {
    "email": "rent@landlord.com"
  }
}
```

### Or

**Condition** : If required fields are missing.

**Code** `403 FORBIDDEN`

**Response example**:
Here, field `email` was intentionally left out.

```json
{
  "errors": {
    "email": {
      "name": "ValidatorError",
      "message": "Path `email` is required.",
      "properties": {
        "message": "Path `email` is required.",
        "type": "required",
        "path": "email"
      },
      "kind": "required",
      "path": "email"
    }
  },
  "_message": "landLord validation failed",
  "message": "landLord validation failed: email: Path `email` is required."
}
```

## GET LANDLORDS

Gets all landlords currently in the database.

**URL**: `/landlords`

**Method**: `GET`

## Success Response

**Code**: `200 OK`
**Content example** :

```json
[
  {
    "blockedUsers": [],
    "apartments": [],
    "_id": "6009705863e4433e88b7f846",
    "email": "rent@landlord.com",
    "password": "nicehouse",
    "name": "Ossi",
    "surname": "Omistaja",
    "img": "z�r�*)",
    "creationTime": "2021-01-21T12:15:20.125Z",
    "lastActive": "2021-01-21T12:15:20.125Z",
    "__v": 0
  } //...followed by all other landlords in the database.
]
```

## GET SINGLE LANDLORD

Gets single landlord object matching given landLordId.
**URL**: `/landlords/:landLordId`

**Method**: `GET`

## Success Response

**URL**: `/landlords/6009705863e4433e88b7f846`

**Code**: `200 OK`

**Content example** :

```json
{
  "blockedUsers": [],
  "apartments": [],
  "_id": "6009705863e4433e88b7f846",
  "email": "rent@landlord.com",
  "password": "nicehouse",
  "name": "Ossi",
  "surname": "Omistaja",
  "img": "z�r�*)",
  "creationTime": "2021-01-21T12:15:20.125Z",
  "lastActive": "2021-01-21T12:15:20.125Z",
  "__v": 0
}
```

## Error responses

**Condition** : If searched with non-existing landLordId.

**URL**: `/landlords/3wefgeyh53tg3gf23r`

**Code**: `404 NOT FOUND`

**Response example**:

```json
{
  "stringValue": "\"3wefgeyh53tg3gf23r\"",
  "kind": "ObjectId",
  "value": "3wefgeyh53tg3gf23r",
  "path": "_id",
  "reason": {}
}
```

## UPDATE EXISTING LANDLORD

**URL**: `landlords/:landLordId`

**Method**: `PUT`

**Data constraints**:
Email must be unique to all other landlords in the database.
Required fields: `email(String)`, `password(String)`

**Data example**:
Changing Ossi's email to 'houses@landlord.com'

```json
{
  "email": "houses@landlord.com",
  "password": "nicehouse",
  "name": "Ossi",
  "surname": "Omistaja",
  "img": "ertyuiop"
}
```

## SUCCESS RESPONSE

**URL** : `/landlords/6009705863e4433e88b7f846`

**Code** : `200 OK`

**Response example**:

```json
{
  "blockedUsers": [],
  "apartments": [],
  "_id": "6009705863e4433e88b7f846",
  "email": "houses@landlord.com",
  "password": "nicehouse",
  "name": "Ossi",
  "surname": "Omistaja",
  "img": "ertyuiop",
  "creationTime": "2021-01-21T12:15:20.125Z",
  "lastActive": "2021-01-21T13:02:38.498Z",
  "__v": 0
}
```

## Error responses

**Condition**: Trying to update into an email address that's already taken.

**URL**: `/landlords/6009705863e4433e88b7f846`

**Code** `403 FORBIDDEN`

**Response example**:

```json
{
  "operationTime": "6920201781494415364",
  "ok": 0,
  "code": 11000,
  "codeName": "DuplicateKey",
  "keyPattern": {
    "email": 1
  },
  "keyValue": {
    "email": "teppo@landlord.com"
  },
  "$clusterTime": {
    "clusterTime": "6920201781494415364",
    "signature": {
      "hash": "gtmgp9UvYH77iT6JGM52JRjoPf8=",
      "keyId": "6870551525760958467"
    }
  },
  "name": "MongoError"
}
```

## DELETE EXISTING LANDLORD

Deletes existing landlord (based on landLordId) from database. For now, doesn't respond any different if there is no landlord corresponding the Id specified.

**URL**: `/landlords/:landLordId`

**Method**: `DELETE`

## Success response

Deleting Ossi's landlord account.

**URL**: `/landlords/6009705863e4433e88b7f846`

**Content example**:
Ossi's user is now removed from the database.

```json
{
  "message": "landlord deleted",
  "_id": "6009705863e4433e88b7f846"
}
```
