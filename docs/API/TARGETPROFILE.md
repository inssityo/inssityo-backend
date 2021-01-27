# TARGET PROFILE

Target profiles are arrays of properties representing the ideal room-/housemate for the users who make them. They are then compared to other users' profiles to find suitable roommates.

## CREATE NEW TARGET PROFILE

Target profiles require at least the preferred gender, ageGroup and location options. A target profile must also always be connected to the user who created it.

**URL**: `/targetprofile`

**Method**: `POST`

**Data constraints**:

Required fields: `user(ObjectId)`, `gender(Number)`, `ageGroup(Number)`, `location([String])`

**Data example**:
targetProfile with all possible fields

```json
{
  "gender": [1, 2],
  "location": ["Jyväskylä, Jämsä"],
  "personalityTraits": [
    "trustworthy",
    "humorous",
    "social",
    "calm",
    "caring",
    "understanding",
    "brave"
  ],
  "user": "6006b7fccab9a41344bb8fc7",
  "ageGroup": 3,
  "rentLimit": 700,
  "maxRoomMates": 2,
  "employmentStatus": 1,
  "workType": 1,
  "alcohol": 2,
  "smoking": 1,
  "drugs": 1,
  "sociality": 7,
  "pets": true,
  "petTypes": [
    {
      "dogs": false,
      "cats": true,
      "rodents": false,
      "birds": true,
      "fishes": false,
      "terrarium": false,
      "other": true
    }
  ],
  "hobbies": [
    {
      "collecting": 1,
      "crafts": 1,
      "informationTech": 2,
      "sports": 5,
      "music": 7,
      "games": 2,
      "reading": 6,
      "art": 2,
      "culture": 4,
      "cooking": 2,
      "travelling": 7,
      "voluntaryWork": 1
    }
  ]
}
```

## Success Response

**Condition** : Everything is OK.

**Code** : `201 CREATED`

**Content example**:
Response with Target profile saved to server.

```json
{
  "gender": [1, 2],
  "location": ["Jyväskylä, Jämsä"],
  "personalityTraits": [
    "trustworthy",
    "humorous",
    "social",
    "calm",
    "caring",
    "understanding",
    "brave"
  ],
  "_id": "6006c967a5549743bcbf7cc8",
  "user": "6006b7fccab9a41344bb8fc7",
  "ageGroup": 3,
  "rentLimit": 700,
  "maxRoomMates": 2,
  "employmentStatus": 1,
  "workType": 1,
  "alcohol": 2,
  "smoking": 1,
  "drugs": 1,
  "sociality": 7,
  "pets": true,
  "petTypes": [
    {
      "dogs": false,
      "cats": true,
      "rodents": false,
      "birds": true,
      "fishes": false,
      "terrarium": false,
      "other": true,
      "_id": "6006c967a5549743bcbf7cc9"
    }
  ],
  "hobbies": [
    {
      "_id": "6006c967a5549743bcbf7cca",
      "collecting": 1,
      "crafts": 1,
      "informationTech": 2,
      "sports": 5,
      "music": 7,
      "games": 2,
      "reading": 6,
      "art": 2,
      "culture": 4,
      "cooking": 2,
      "travelling": 7,
      "voluntaryWork": 1
    }
  ],
  "__v": 0
}
```

## Error Responses

**Condition** : Missing user field.

**Code** : `403 FORBIDDEN`

**Content example** : `{ "ageGroup":3, "gender":[1,2], "location":["Jyväskylä, Jämsä"], "rentLimit":700, "maxRoomMates":2, "employmentStatus":1, "workType":1, "alcohol":2, "smoking":1, "drugs":1, "personalityTraits": ["trustworthy", "humorous", "social", "calm", "caring", "understanding", "brave" ], "sociality":7, "pets":true, "petTypes":{"dogs":false, "cats":true, "rodents":false, "birds":true, "fishes":false, "terrarium": false, "other":true}, "hobbies":{"collecting":1, "crafts":1, "informationTech":2, "sports":5, "music":7, "games":2, "reading":6, "art":2, "culture":4, "cooking":2, "travelling":7, "voluntaryWork":1} }`

**Example response**

Here, field `user` was intentionally left out.

```json
{
  "error": "Parent user not found or defined in request body"
}
```

### Or

**Condition** : User already has a target profile.

**Code** : `403 FORBIDDEN`

**Content example**:

```json
{
  "error": "Parent user already has target profile"
}
```

## GET TARGET PROFILES

Gets all target profiles currently in the database. Populates `user` field.

**URL** : `/targetProfiles`

**Method** : `GET`

## Success Response

**Code** : `200 OK`
**Content example** :

```json
[
  {
    "gender": [1],
    "location": ["Helsinki", "Honolulu"],
    "personalityTraits": ["Sosiaalinen", "Villi", "Aurinkoinen"],
    "_id": "60016952fab9d01794cdae65",
    "user": {
      "location": ["Helsinki"],
      "personalityTraits": ["Harkitseva", "Sopeutuvainen", "Määrätietoinen"],
      "blockedUsers": [],
      "_id": "60016903fab9d01794cdae63",
      "email": "hawai@internet1.org",
      "password": "salainen",
      "name": "Makke",
      "surname": "Mallikas",
      "img": "\u0087\ufffd~7\ufffd\ufffd'\ufffd{\n\u001e~",
      "ageGroup": 3,
      "gender": 1,
      "rentLimit": 900,
      "maxRoomMates": 9,
      "employmentStatus": 3,
      "description": "Mallikelpoinen",
      "alcohol": 2,
      "smoking": 1,
      "drugs": 1,
      "sociality": 2,
      "pets": false,
      "hobbies": [
        {
          "_id": "60016903fab9d01794cdae64",
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
      "lastActive": "2021-01-15T10:05:55.183Z",
      "creationTime": "2021-01-15T10:05:55.183Z",
      "petTypes": [],
      "__v": 0,
      "targetProfile": "60016952fab9d01794cdae65"
    },
    "ageGroup": 3,
    "rentLimit": 900,
    "maxRoomMates": 2,
    "employmentStatus": 3,
    "alcohol": 2,
    "smoking": 1,
    "drugs": 1,
    "petTypes": [],
    "hobbies": [],
    "__v": 0
  } //...followed by all other target profiles in the database.
]
```

## GET SINGLE TARGET PROFILE

Gets single target profile object matching given targetprofileId. Populates `user` field.

**URL** : `/targetProfiles/:userId`

**Method** : `GET`

## Success Response

**URL** : `/users/60016952fab9d01794cdae65`

**Code** : `200 OK`

**Content example** :

```json
    {
    "gender": [
        1
    ],
    "location": [
        "Helsinki",
        "Honolulu"
    ],
    "personalityTraits": [
        "Sosiaalinen",
        "Villi",
        "Aurinkoinen"
    ],
    "_id": "60016952fab9d01794cdae65",
    "user": {
        "location": [
            "Helsinki"
        ],
        "personalityTraits": [
            "Harkitseva",
            "Sopeutuvainen",
            "Määrätietoinen"
        ],
        "blockedUsers": [],
        "_id": "60016903fab9d01794cdae63",
        "email": "hawai@internet1.org",
        "password": "salainen",
        "name": "Makke",
        "surname": "Mallikas",
        "img": "\u0087\ufffd~7\ufffd\ufffd'\ufffd{\n\u001e~",
        "ageGroup": 3,
        "gender": 1,
        "rentLimit": 900,
        "maxRoomMates": 9,
        "employmentStatus": 3,
        "description": "Mallikelpoinen",
        "alcohol": 2,
        "smoking": 1,
        "drugs": 1,
        "sociality": 2,
        "pets": false,
        "hobbies": [
            {
                "_id": "60016903fab9d01794cdae64",
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
        "lastActive": "2021-01-15T10:05:55.183Z",
        "creationTime": "2021-01-15T10:05:55.183Z",
        "petTypes": [],
        "__v": 0,
        "targetProfile": "60016952fab9d01794cdae65"
    },
    "ageGroup": 3,
    "rentLimit": 900,
    "maxRoomMates": 2,
    "employmentStatus": 3,
    "alcohol": 2,
    "smoking": 1,
    "drugs": 1,
    "petTypes": [],
    "hobbies": [],
    "__v": 0
```

## Error Responses

**Condition** : If searched with non-existing userId.

**URL**: `/targetProfiles/234gferf24r`

**Code**: `404 NOT FOUND`

**Content example**:

```json
{
  "stringValue": "\"234gferf24r\"",
  "kind": "ObjectId",
  "value": "234gferf24r",
  "path": "_id",
  "reason": {}
}
```

## GET TARGET PROFILES BY LOCATION

**URL**: `/targetProfiles/location/?`

**Method**: `GET`

**QUERY CONSTRAINTS**: When querying multiple locations, separate each value with ','.

## SUCCESS RESPONSE

**URL**: `/targetProfiles/location/?location=Honolulu,Reykjavik`

**CODE** `200 OK`

**RESPONSE EXAMPLE**
Response contains all target profiles that have Honolulu or Reykjavik in their `location` values.

```json
[
  {
    "gender": [1],
    "location": ["Helsinki", "Honolulu"],
    "personalityTraits": ["Sosiaalinen", "Villi", "Aurinkoinen"],
    "_id": "60016952fab9d01794cdae65",
    "user": {
      "location": ["Helsinki"],
      "personalityTraits": ["Harkitseva", "Sopeutuvainen", "Määrätietoinen"],
      "blockedUsers": [],
      "_id": "60016903fab9d01794cdae63",
      "email": "hawai@internet1.org",
      "password": "salainen",
      "name": "Makke",
      "surname": "Mallikas",
      "img": "\u0087\ufffd~7\ufffd\ufffd'\ufffd{\n\u001e~",
      "ageGroup": 3,
      "gender": 1,
      "rentLimit": 900,
      "maxRoomMates": 9,
      "employmentStatus": 3,
      "description": "Mallikelpoinen",
      "alcohol": 2,
      "smoking": 1,
      "drugs": 1,
      "sociality": 2,
      "pets": false,
      "hobbies": [
        {
          "_id": "60016903fab9d01794cdae64",
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
      "lastActive": "2021-01-15T10:05:55.183Z",
      "creationTime": "2021-01-15T10:05:55.183Z",
      "petTypes": [],
      "__v": 0,
      "targetProfile": "60016952fab9d01794cdae65"
    },
    "ageGroup": 3,
    "rentLimit": 900,
    "maxRoomMates": 2,
    "employmentStatus": 3,
    "alcohol": 2,
    "smoking": 1,
    "drugs": 1,
    "petTypes": [],
    "hobbies": [],
    "__v": 0
  },
  {
    "gender": [1],
    "location": ["Reykjavik"],
    "personalityTraits": ["Viileä"],
    "_id": "60016a0ffab9d01794cdae68",
    "user": {
      "location": ["Helsinki", "Reykjavik"],
      "personalityTraits": ["Harkitseva", "Sopeutuvainen", "Määrätietoinen"],
      "blockedUsers": [],
      "_id": "600169d4fab9d01794cdae66",
      "email": "iceland@internet1.org",
      "password": "salainen",
      "name": "Maija",
      "surname": "Mallikas",
      "img": "\u0087\ufffd~7\ufffd\u007f\u0007\ufffd\ufffd\ufffd\"~7\ufffd\ufffd\ufffd\ufffd",
      "ageGroup": 3,
      "gender": 1,
      "rentLimit": 900,
      "maxRoomMates": 9,
      "employmentStatus": 3,
      "description": "Mallikelpoinen",
      "alcohol": 2,
      "smoking": 1,
      "drugs": 1,
      "sociality": 2,
      "pets": false,
      "hobbies": [
        {
          "_id": "600169d4fab9d01794cdae67",
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
      "lastActive": "2021-01-15T10:09:24.771Z",
      "creationTime": "2021-01-15T10:09:24.771Z",
      "petTypes": [],
      "__v": 0,
      "targetProfile": "60016a0ffab9d01794cdae68"
    },
    "ageGroup": 3,
    "rentLimit": 900,
    "maxRoomMates": 2,
    "employmentStatus": 3,
    "alcohol": 2,
    "smoking": 1,
    "drugs": 1,
    "petTypes": [],
    "hobbies": [],
    "__v": 0
  }
]
```

## ERROR RESPONSES

Querying for a location that doesn't appear in any location fields in the targetProfiles collection.

**URL**: `/targetProfiles/location/?location=Quebec`

**Code**: `404 NOT FOUND`

**RESPONSE EXAMPLE**:

```json
{
  "error": "No profiles found with Quebec as location values!"
}
```

## UPDATE EXISTING TARGET PROFILE

**URL**: `/targetProfiles/:targetProfileId`

**Method**: `PUT`

**Data constraints**:

**Data example**:
Changing Eva's target profile's preferred roommate's gender to only woman.

```json
{
  "user": "6006e7377fe51546c8b654b2",
  "ageGroup": 3,
  "gender": [2],
  "location": ["Jyväskylä", "Jämsä"],
  "rentLimit": 700,
  "maxRoomMates": 2,
  "employmentStatus": 1,
  "workType": 1,
  "alcohol": 2,
  "smoking": 1,
  "drugs": 1,
  "personalityTraits": [
    "trustworthy",
    "humorous",
    "social",
    "calm",
    "caring",
    "understanding",
    "brave"
  ],
  "sociality": 7,
  "pets": true,
  "petTypes": {
    "dogs": false,
    "cats": true,
    "rodents": false,
    "birds": true,
    "fishes": false,
    "terrarium": false,
    "other": true
  },
  "hobbies": {
    "collecting": 1,
    "crafts": 1,
    "informationTech": 2,
    "sports": 5,
    "music": 7,
    "games": 2,
    "reading": 6,
    "art": 2,
    "culture": 4,
    "cooking": 2,
    "travelling": 7,
    "voluntaryWork": 1
  }
}
```

## Success Response

**URL** : `/targetProfiles/6006e798c4444418a0b8012e`

**Code** : `200 OK`

**Content example** :

```json
{
    "gender": [
        2
    ],
    "location": [
        "Jyväskylä",
        "Jämsä"
    ],
    "personalityTraits": [
        "trustworthy",
        "humorous",
        "social",
        "calm",
        "caring",
        "understanding",
        "brave"
    ],
    "_id": "6006e798c4444418a0b8012e",
    "user": "6006e7377fe51546c8b654b2",
    "ageGroup": 3,
    "rentLimit": 700,
    "maxRoomMates": 2,
    "employmentStatus": 1,
    "workType": 1,
    "alcohol": 2,
    "smoking": 1,
    "drugs": 1,
    "sociality": 7,
    "pets": true,
    "petTypes": [
        {
            "dogs": false,
            "cats": true,
            "rodents": false,
            "birds": true,
            "fishes": false,
            "terrarium": false,
            "other": true,
            "_id": "6006ec857486754b3493edd8"
        }
    ],
    "hobbies": [
        {
            "_id": "6006ec857486754b3493edd9",
            "collecting": 1,
            "crafts": 1,
            "informationTech": 2,
            "sports": 5,
            "music": 7,
            "games": 2,
            "reading": 6,
            "art": 2,
            "culture": 4,
            "cooking": 2,
            "travelling": 7,
            "voluntaryWork": 1
        }
    ],
    "__v": 0
}
}
```

## DELETE TARGET PROFILE

Deletes existing target profile (based on targetProfileId) from database. For now, doesn't respond any different if there is no user corresponding the Id specified.

Deleting the the target profile also deletes the reference from the user document, if one exists. This process is done by using mongoose's 'pre' hook middleware. The deletion process is defined in the `targetProfileModel.js` file.

**URL**: `/targetProfiles/:targetProfileId`

**Method**: `DELETE`

## Success Response

Deleting Eva's target profile.

**URL**: `/targetProfiles/6006e798c4444418a0b8012e`

**Content example** :
Edwin's user is now removed from the database.

```json
{
  "message": "target profile deleted!",
  "_id": "6006e798c4444418a0b8012e"
}
```
