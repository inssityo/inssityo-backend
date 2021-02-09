# USER

The user model holds user data about them, their lifestyle and current situation. The data is used to connect people to make new roommates.

The mongoose schema for user is as follows:

```
const userSchema = new mongoose.Schema({

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  //Server adds dates on creation
  creationTime: { type: Date, required: true },
  lastActive: { type: Date, required: true },

  //Information given while creating profile
  name: { type: String },

  surname: { type: String },

  movingDate: { type: Date },

  //Profile picture
  img: { data: Buffer, type: String },

  //Older is bigger
  ageGroup: { type: Number, min: 1, max: 8 },

  //1-male, 2-female, 3-other.
  gender: { type: Number, min: 1, max: 3 },

  //preferred living places
  location: [{ type: String }],

  rentLimit: { type: Number },

  maxRoomMates: { type: Number },

  //1-employed, 2-unemployed, 3-student, 4-retiree
  employmentStatus: { type: Number, min: 1, max: 4 },

  //1-day job, 2-shift work, 3-night job, 4-travel job - ask and show only if employmentStatus = 1
  workType: { type: Number, min: 1, max: 4 },

  description: { type: String },

  //1-not at all, 2-sometimes, 3-often, 4-a lot
  alcohol: { type: Number, min: 1, max: 4 },

  //1-not at all, 2-sometimes, 3-often, 4-a lot
  smoking: { type: Number, min: 1, max: 4 },

  //1-not at all, 2-sometimes, 3-often, 4-a lot
  drugs: { type: Number, min: 1, max: 4 },

  //Max. 7
  personalityTraits: {
    type: [{ type: String }],
    validate: [arrayLimit, "{PATH} exceeds the limit of 7 personality traits"],
  },

  //1-Loner ... 5-Social
  sociality: { type: Number, min: 1, max: 7 },

  pets: { type: Boolean },

  //show only if Pets = true
  petTypes: [petTypesSchema],

  hobbies: [hobbiesSchema],

  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

  //The dream room mate for this user. Will be compared against other users"
  targetProfile: {
    max: 1,
    type: mongoose.Schema.Types.ObjectId,
    ref: "targetProfile",
  },
})

```

## CREATE NEW USER

New user can be created with only email and password information. Whenever an user completes their profile, it will be updated accordingly.

**URL**: `/users`

**Auth required** : NO

**Method**: `POST`

**Data constraints**:

Email must be unique to all other users in the database.
Required fields: `email(String)`, `password(String)`

**Data example**:
User with all possible fields:

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
Response with user saved to server:

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

## Error responses

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

**Condition** : If required fields are missing.

**Code** : `403 FORBIDDEN`

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

**Auth required** : YES

**Method** : `GET`

## Success response

**Code** : `200 OK`
**Response example** :

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

**Auth required** : YES

**Method** : `GET`

## Success response

**URL** : `/users/5ffed7f1d4d8da2c14dc3c4e`

**Code** : `200 OK`

**Response example** :

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

## Error responses

**Condition** : If searched with non-existing userId.

**URL**: `/users/4567456hrtg`

**Code**: `404 NOT FOUND`

**Response example**:

```json
{
  "error": "No user found with given id"
}
```

## GET USERS BY LOCATION

**URL**: `/users/location/?`

**Auth required** : YES

**Method**: `GET`

**QUERY CONSTRAINTS**: When querying multiple locations, separate each value with ','.

## SUCCESS RESPONSE

**URL**: `/users/location/?location=Jämsä`

**CODE**: `200 OK`

**RESPONSE EXAMPLE**:
Response contains all users that have Jämsä in their `location` values

```json
[
  {
    "location": ["Jyväskylä", "Jämsä"],
    "personalityTraits": ["social", "active", "happy"],
    "blockedUsers": ["6001689afab9d01794cdae60"],
    "_id": "6006e7377fe51546c8b654b2",
    "email": "everything@internet.org",
    "password": "allMostimportant",
    "name": "Eva",
    "surname": "Verything",
    "img": "��.�(��*g",
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
        "_id": "6006e7377fe51546c8b654b3"
      }
    ],
    "hobbies": [
      {
        "_id": "6006e7377fe51546c8b654b4",
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
    "lastActive": "2021-01-19T14:05:43.332Z",
    "creationTime": "2021-01-19T14:05:43.332Z",
    "__v": 0,
    "targetProfile": "600833a61f4c32414087e773"
  },
  {
    "location": ["Jyväskylä", "Jämsä"],
    "personalityTraits": ["social", "active", "happy"],
    "blockedUsers": ["6001689afab9d01794cdae60"],
    "_id": "600fdff8a5d0ab3898073d03",
    "email": "anything@internet.org",
    "password": "allMostimportant",
    "name": "Eva",
    "surname": "Verything",
    "movingDate": "1970-01-19T15:40:53.112Z",
    "img": "��.�x",
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
        "_id": "600fdff8a5d0ab3898073d04"
      }
    ],
    "hobbies": [
      {
        "_id": "600fdff8a5d0ab3898073d05",
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
    "lastActive": "2021-01-26T09:25:12.267Z",
    "creationTime": "2021-01-26T09:25:12.267Z",
    "__v": 0,
    "targetProfile": "600fef59bd6cc80168cadfac"
  }
]
```

## ERROR RESPONSES

Querying for a location that doesn't appear in any location fields in the users collection.

**URL**: `users/location/?location=Singapore`

**Code**: `404 NOT FOUND`

**RESPONSE EXAMPLE**:

```json
{
  "error": "No users found with Singapore as location values!"
}
```

## UPDATE EXISTING USER

**URL**: `/users/:userId`

**Auth required** : YES

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

## Success response

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

**Auth required** : YES

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

**Auth required** : YES

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
