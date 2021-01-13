# USER

## CREATE NEW USER

**URL**: `/users`

**Method**: `POST`

**Data constraints**:

Email must be unique to all other users in the database.
Required fields: `email(String)` `password(String)` `name(String)` `surname(String)` `gender(Number min: 1, max: 3)` `ageGroup(Number min: 1, max: 8)` `location(String[])`

**Data example**:

```json
{
  "email": "example@internet.com",
  "password": "secret",
  "name": "Edwin",
  "surname": "Xample",
  "ageGroup": 3,
  "gender": 1,
  "location": ["Helsinki", "Espoo", "Vantaa"],
  "rentLimit": 900,
  "maxRoomMates": 3,
  "employmentStatus": 3,
  "description": "A perfect example to live with",
  "alcohol": 2,
  "smoking": 1,
  "drugs": 1,
  "personalityTraits": ["Harkitseva", "Sopeutuvainen", "Määrätietoinen"],
  "sociality": 2,
  "pets": false,
  "hobbies": {
    "collecting": 1,
    "crafts": 3,
    "informationTech": 5,
    "sports": 4,
    "music": 1,
    "games": 5,
    "reading": 2,
    "art": 3,
    "culture": 1,
    "cooking": 4,
    "travelling": 1,
    "voluntaryWork": 1
  }
}
```

## Success Response

**Condition** : Everything is OK and an account didn't exist for this email address.

**Code** : `201 CREATED`

**Content example**:

```json
{
  "location": ["Helsinki", "Espoo", "Vantaa"],
  "personalityTraits": ["Harkitseva", "Sopeutuvainen", "Määrätietoinen"],
  "_id": "5ffed7f1d4d8da2c14dc3c4e",
  "email": "example@internet.com",
  "password": "secret",
  "name": "Edwin",
  "surname": "Xample",
  "ageGroup": 3,
  "gender": 1,
  "rentLimit": 900,
  "maxRoomMates": 3,
  "employmentStatus": 3,
  "description": "A perfect example to live with",
  "alcohol": 2,
  "smoking": 1,
  "drugs": 1,
  "sociality": 2,
  "pets": false,
  "hobbies": [
    {
      "_id": "5ffed7f1d4d8da2c14dc3c4f",
      "collecting": 1,
      "crafts": 3,
      "informationTech": 5,
      "sports": 4,
      "music": 1,
      "games": 5,
      "reading": 2,
      "art": 3,
      "culture": 1,
      "cooking": 4,
      "travelling": 1,
      "voluntaryWork": 1
    }
  ],
  "lastActive": "2021-01-13T11:22:25.855Z",
  "petTypes": [],
  "__v": 0
}
```

## Error Responses

**Condition** : If given email is already related to a user in the Database.

**Code** : `403 FORBIDDEN`

**Content example** : `{ "driver": true, "name": "MongoError", "index": 0, "code": 11000, "keyPattern": { "email": 1 }, "keyValue": { "email": "example@internet.com" }}`

### Or

**Condition** : If fields are missing.

**Code** : `403 FORBIDDEN`

**Content example**
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
  "_message": "user validation failed",
  "message": "user validation failed: email: Path `email` is required."
}
```

### Or

**Condition** : Too many `personalityTraits` are given.

**Code** : `403 FORBIDDEN`

**Content example**:

```json
{
  "errors": {
    "personalityTraits": {
      "name": "ValidatorError",
      "message": "personalityTraits exceeds the limit of 7 personality traits",
      "properties": {
        "message": "personalityTraits exceeds the limit of 7 personality traits",
        "type": "user defined",
        "path": "personalityTraits",
        "value": [
          "Harkitseva",
          "Sopeutuvainen",
          "Määrätietoinen",
          "Harkitseva",
          "Sopeutuvainen",
          "Määrätietoinen",
          "Harkitseva",
          "Sopeutuvainen",
          "Määrätietoinen"
        ]
      },
      "kind": "user defined",
      "path": "personalityTraits",
      "value": [
        "Harkitseva",
        "Sopeutuvainen",
        "Määrätietoinen",
        "Harkitseva",
        "Sopeutuvainen",
        "Määrätietoinen",
        "Harkitseva",
        "Sopeutuvainen",
        "Määrätietoinen"
      ]
    }
  },
  "_message": "user validation failed",
  "message": "user validation failed: personalityTraits: personalityTraits exceeds the limit of 7 personality traits"
}
```

## GET USERS

Gets all users currently in the database.

**URL** : `/users`

**Method** : `GET`

## Success Response

**Code** : `200 OK`
**Content example** :

```json
[
  {
    "location": ["Helsinki", "Espoo", "Vantaa"],
    "personalityTraits": ["Harkitseva", "Sopeutuvainen", "Määrätietoinen"],
    "_id": "5ffed7f1d4d8da2c14dc3c4e",
    "email": "example@internet.com",
    "password": "secret",
    "name": "Edwin",
    "surname": "Xample",
    "ageGroup": 3,
    "gender": 1,
    "rentLimit": 900,
    "maxRoomMates": 3,
    "employmentStatus": 3,
    "description": "A perfect example to live with",
    "alcohol": 2,
    "smoking": 1,
    "drugs": 1,
    "sociality": 2,
    "pets": false,
    "hobbies": [
      {
        "_id": "5ffed7f1d4d8da2c14dc3c4f",
        "collecting": 1,
        "crafts": 3,
        "informationTech": 5,
        "sports": 4,
        "music": 1,
        "games": 5,
        "reading": 2,
        "art": 3,
        "culture": 1,
        "cooking": 4,
        "travelling": 1,
        "voluntaryWork": 1
      }
    ],
    "lastActive": "2021-01-13T11:22:25.855Z",
    "petTypes": [],
    "__v": 0
  } //...followed by all other users in the database.
]
```

## GET SINGLE USER

Gets single user object matching given userId.
**URL** : `/users/:userId`

**Method** : `GET`

## Success Response

**URL** : `/users/5ffed7f1d4d8da2c14dc3c4e`

**Code** : `200 OK`

**Content example** :

```json
{
  "location": ["Helsinki", "Espoo", "Vantaa"],
  "personalityTraits": ["Harkitseva", "Sopeutuvainen", "Määrätietoinen"],
  "_id": "5ffed7f1d4d8da2c14dc3c4e",
  "email": "example@internet.com",
  "password": "secret",
  "name": "Edwin",
  "surname": "Xample",
  "ageGroup": 3,
  "gender": 1,
  "rentLimit": 900,
  "maxRoomMates": 3,
  "employmentStatus": 3,
  "description": "A perfect example to live with",
  "alcohol": 2,
  "smoking": 1,
  "drugs": 1,
  "sociality": 2,
  "pets": false,
  "hobbies": [
    {
      "_id": "5ffed7f1d4d8da2c14dc3c4f",
      "collecting": 1,
      "crafts": 3,
      "informationTech": 5,
      "sports": 4,
      "music": 1,
      "games": 5,
      "reading": 2,
      "art": 3,
      "culture": 1,
      "cooking": 4,
      "travelling": 1,
      "voluntaryWork": 1
    }
  ],
  "lastActive": "2021-01-13T11:22:25.855Z",
  "petTypes": [],
  "__v": 0
}
```

## Error Responses

**Condition** : If searched with non-existing userId.

**URL**: `/users/4567456hrtg`

**Code**: `404 NOT FOUND`

**Content example**:

```json
{    "stringValue": "\"4567456hrtg\"",
    "kind": "ObjectId",
    "value": "4567456hrtg",
    "path": "_id",
    "reason": {}}
    }
```

## UPDATE EXISTING USER

**URL**: `/users/:userId`

**Method**: `PUT`

**Data constraints**:

Email must be unique to all other users in the database.
Required fields: `email(String)` `password(String)` `name(String)` `surname(String)` `gender(Number min: 1, max: 3)` `ageGroup(Number min: 1, max: 8)` `location(String[])`

**Data example**:
Changing Edwin's preferred locations to only Helsinki from Helsinki, Espoo and Vantaa.

```json
{
  "email": "example@internet.com",
  "password": "secret",
  "name": "Edwin",
  "surname": "Xample",
  "ageGroup": 3,
  "gender": 1,
  "location": ["Helsinki"],
  "rentLimit": 900,
  "maxRoomMates": 3,
  "employmentStatus": 3,
  "description": "A perfect example to live with",
  "alcohol": 2,
  "smoking": 1,
  "drugs": 1,
  "personalityTraits": ["Harkitseva", "Sopeutuvainen", "Määrätietoinen"],
  "sociality": 2,
  "pets": false,
  "hobbies": {
    "collecting": 1,
    "crafts": 3,
    "informationTech": 5,
    "sports": 4,
    "music": 1,
    "games": 5,
    "reading": 2,
    "art": 3,
    "culture": 1,
    "cooking": 4,
    "travelling": 1,
    "voluntaryWork": 1
  }
}
```

## Success Response

**URL** : `/users/5ffed7f1d4d8da2c14dc3c4e`

**Code** : `200 OK`

**Content example** :

```json
{
  "location": ["Helsinki"],
  "personalityTraits": ["Harkitseva", "Sopeutuvainen", "Määrätietoinen"],
  "_id": "5ffed7f1d4d8da2c14dc3c4e",
  "email": "example@internet.com",
  "password": "secret",
  "name": "Edwin",
  "surname": "Xample",
  "ageGroup": 3,
  "gender": 1,
  "rentLimit": 900,
  "maxRoomMates": 3,
  "employmentStatus": 3,
  "description": "A perfect example to live with",
  "alcohol": 2,
  "smoking": 1,
  "drugs": 1,
  "sociality": 2,
  "pets": false,
  "hobbies": [
    {
      "_id": "5ffee394e5be670f348c9fa5",
      "collecting": 1,
      "crafts": 3,
      "informationTech": 5,
      "sports": 4,
      "music": 1,
      "games": 5,
      "reading": 2,
      "art": 3,
      "culture": 1,
      "cooking": 4,
      "travelling": 1,
      "voluntaryWork": 1
    }
  ],
  "lastActive": "2021-01-13T11:22:25.855Z",
  "petTypes": [],
  "__v": 0
}
```

## Error Responses

**Condition** : Trying to update into a email address that's already taken.

**URL**: `localhost:3000/users/5ffed7f1d4d8da2c14dc3c4e`

**Code**: `403 FORBIDDEN `

**Content example**:

```json
{
  "operationTime": "6917218037649113098",
  "ok": 0,
  "code": 11000,
  "codeName": "DuplicateKey",
  "keyPattern": {
    "email": 1
  },
  "keyValue": {
    "email": "Topi@huuhaa.com"
  },
  "$clusterTime": {
    "clusterTime": "6917218037649113098",
    "signature": {
      "hash": "pV2dFol0azw/cnCzDhCnW1lDFUw=",
      "keyId": "6870551525760958467"
    }
  },
  "name": "MongoError"
}
```

## DELETE EXISTING USER

Deletes existing user (based on userId) from database. For now, doesn't respond any different if there is no user corresponding the Id specified.

**URL**: `/users/:userId`

**Method**: `DELETE`

## Success Response

Deleting Edwin's user.

**URL**: `/users/5ffed7f1d4d8da2c14dc3c4e`

**Content example** :
Edwin's user is now removed from the database.

```json
{
  "message": "user deleted!",
  "_id": "5ffed7f1d4d8da2c14dc3c4e"
}
```
