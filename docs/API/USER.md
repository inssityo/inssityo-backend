# USER

The user model holds user data about them, their lifestyle and current situation. The data is used to connect people to make new roommates.

## CREATE NEW USER

New user can be created with only email and password information. Whenever an user completes their profile, it will be updated accordingly.

**URL**: `/users`

**Method**: `POST`

**Data constraints**:

Email must be unique to all other users in the database.
Required fields: `email(String)`, `password(String)`

**Data example**:
User with all possible fields

```json
{
  "location": ["Jyväskylä", "Jämsä"],
  "personalityTraits": ["social", "active", "happy"],
  "blockedUsers": ["6001689afab9d01794cdae60"],
  "_id": "6006b7fccab9a41344bb8fc7",
  "email": "everything@internet.org",
  "password": "allMostimportant",
  "name": "Eva",
  "surname": "Verything",
  "img": "\ufffd\ufffd.\ufffd(\ufffd\ufffd*g",
  "ageGroup": 3,
  "gender": 2,
  "rentLimit": 700,
  "maxRoomMates": 2,
  "employmentStatus": 1,
  "workType": 1,
  "description": "Kaiken kaikkiaan kunnollinen",
  "alcohol": 1,
  "smoking": 1,
  "drugs": 1,
  "sociality": 5,
  "pets": true,
  "petTypes": [
    {
      "dogs": true,
      "cats": true,
      "rodents": false,
      "birds": false,
      "fishes": false,
      "terrarium": false,
      "other": false,
      "_id": "6006b7fccab9a41344bb8fc8"
    }
  ],
  "hobbies": [
    {
      "_id": "6006b7fccab9a41344bb8fc9",
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
  "lastActive": "2021-01-19T10:44:12.312Z",
  "creationTime": "2021-01-19T10:44:12.312Z",
  "__v": 0,
  "targetProfile": {
    "location": ["Jyväskylä, Jämsä"],
    "personalityTraits": ["Viileä"],
    "_id": "6006b8b6cab9a41344bb8fca",
    "user": "6006b7fccab9a41344bb8fc7",
    "ageGroup": 3,
    "gender": 1,
    "rentLimit": 700,
    "maxRoomMates": 2,
    "employmentStatus": 1,
    "workType": 1,
    "alcohol": 2,
    "smoking": 1,
    "drugs": 1,
    "petTypes": [],
    "hobbies": [],
    "__v": 0
  }
}
```

## Success Response

**Condition** : Everything is OK and an account didn't exist for this email address.

**Code** : `201 CREATED`

**Content example**:
Response with user saved to server

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

**Condition** : If given email is already related to a user in the Database. The email addresses given to the server are converted to lower case to avoid duplication with case mismatch.

**Code** : `403 FORBIDDEN`

**Response example**:

```json
{
  "driver": true,
  "name": "MongoError",
  "index": 0,
  "code": 11000,
  "keyPattern": { "email": 1 },
  "keyValue": { "email": "example@internet.com" }
}
```

### Or

**Condition** : If fields are missing.

**Code** : `403 FORBIDDEN`

**Response example**
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

**Response example**:

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

**Response example**:

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
Required fields: `email(String)`, `password(String)`

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

**Condition** : Trying to update into an email address that's already taken.

**URL**: `/users/5ffed7f1d4d8da2c14dc3c4e`

**Code**: `403 FORBIDDEN `

**Response example**:

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

Deleting the user also deletes the referenced targetProfile document for the user, if one exists. This process is done by using mongoose's 'pre' hook middleware. The deletion process is defined in the `usermodel.js` file.

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
