# APARTMENT

Apartments are real life properties listed by their owners, landlords into the service. Non-landlord users can then contact the landlord to apply for the apartment to become tenants in it either by themselves or in a group. The apartment model holds important information about the property.

References to the apartment owner and interested tenants-to-be are also held in the model for future communication features.

## CREATE NEW APARTMENT

New apartment can be created. It requires a parent `landlord` and some other fields defined below. Apartment data can be updated later

**URL**: `/apartments`

**Method**: `POST`

**Data constraints**:
Required fields: `description(String)` `floorPlan(String)` `area(Number)` `location{ city(string), neighborhood(string), address(string), areacode(string)}` `monthlyRent(Number)` `apartmentType(string)` `isCellApartment(boolean)` `availableFrom(date)` `availableUntil(date)` `petsAllowed(boolean)` `smokingAllowed(boolean)`

**Data example**:
Apartment with all possible fields:

```json
{
  "location": {
    "city": "Helsinki",
    "neighborhood": "Ruskeasuo",
    "address": "Maskuntie 5 C 12",
    "areaCode": "00280"
  },
  "dataConnection": {
    "isIncluded": true,
    "speed": 5
  },
  "nearbyServices": {
    "publicTransport": [
      {
        "title": "Bussipysäkki Mannerheimintie",
        "distance": 250
      },
      {
        "title": "Raitiovaunupysäkki Ruskeasuo",
        "distance": 500
      }
    ],
    "healthCare": [
      {
        "title": "Tilkan sairaala",
        "distance": 750
      }
    ],
    "dayCare": [
      {
        "title": "Ruskeasuon päiväkoti",
        "distance": 200
      },
      {
        "title": "Länsi-Pasilan päiväkoti",
        "distance": 900
      }
    ],
    "education": [
      {
        "title": "Ruskeasuon peruskoulu",
        "distance": 350
      },
      {
        "title": "Hammaslääkäriopisto",
        "distance": 350
      }
    ],
    "excercise": [
      {
        "title": "Helsingin keskuspuisto",
        "distance": 200
      },
      {
        "title": "Tali Golf",
        "distance": 3000
      }
    ],
    "groceries": [
      {
        "title": "Mall of Tripla",
        "distance": 1000
      }
    ]
  },
  "images": ["Wwefhtrtbwtjagagrgaerg", "regwwergrehtrjyt"],
  "interestedUsers": ["6001689afab9d01794cdae60"],
  "landLord": "60097e501a4f694584b3d87b",
  "description": "Tunnelmallinen loft-asunto Helsingin Ruskeasuolla. Mukava naapurusto ja lähialueen kattavat palvelut tekevät tästä todellisen kaupunkiasujan unelman!",
  "floorPlan": "2h+k",
  "area": 58,
  "monthlyRent": 800,
  "guarantee": "Kahden kuukauden vuokra. Maksetaan muuton yhteydessä.",
  "buildYear": 1964,
  "apartmentType": "Kerrostalo",
  "isCellApartment": false,
  "floor": "5/5",
  "hasElevator": false,
  "parkingIncluded": false,
  "availableFrom": "1970-01-19T15:35:05.799Z",
  "availableUntil": "1999-12-31T22:00:00.000Z",
  "equipment": "Vuokrahintaan sisältyy 5 MBit/s verkkoyhteys, astianpesukone ja pyykkikone",
  "condition": 5,
  "petsAllowed": false,
  "smokingAllowed": false,
  "includesWater": true,
  "includesElectricity": false
}
```

## SUCCESS RESPONSE

**Condition**: Everything is OK.

**Code**: `201 CREATED `

**Content example**:
Response with apartment saved to server:

```json
{
  "location": {
    "city": "Helsinki",
    "neighborhood": "Ruskeasuo",
    "address": "Maskuntie 5 C 12",
    "areaCode": "00280"
  },
  "dataConnection": {
    "isIncluded": true,
    "speed": 5
  },
  "nearbyServices": {
    "publicTransport": [
      {
        "_id": "600a9347a9dede27fc51f4b2",
        "title": "Bussipysäkki Mannerheimintie",
        "distance": 250
      },
      {
        "_id": "600a9347a9dede27fc51f4b3",
        "title": "Raitiovaunupysäkki Ruskeasuo",
        "distance": 500
      }
    ],
    "healthCare": [
      {
        "_id": "600a9347a9dede27fc51f4b4",
        "title": "Tilkan sairaala",
        "distance": 750
      }
    ],
    "dayCare": [
      {
        "_id": "600a9347a9dede27fc51f4b5",
        "title": "Ruskeasuon päiväkoti",
        "distance": 200
      },
      {
        "_id": "600a9347a9dede27fc51f4b6",
        "title": "Länsi-Pasilan päiväkoti",
        "distance": 900
      }
    ],
    "education": [
      {
        "_id": "600a9347a9dede27fc51f4b7",
        "title": "Ruskeasuon peruskoulu",
        "distance": 350
      },
      {
        "_id": "600a9347a9dede27fc51f4b8",
        "title": "Hammaslääkäriopisto",
        "distance": 350
      }
    ],
    "excercise": [
      {
        "_id": "600a9347a9dede27fc51f4b9",
        "title": "Helsingin keskuspuisto",
        "distance": 200
      },
      {
        "_id": "600a9347a9dede27fc51f4ba",
        "title": "Tali Golf",
        "distance": 3000
      }
    ],
    "groceries": [
      {
        "_id": "600a9347a9dede27fc51f4bb",
        "title": "Mall of Tripla",
        "distance": 1000
      }
    ]
  },
  "images": ["Wwefhtrtbwtjagagrgaerg", "regwwergrehtrjyt"],
  "interestedUsers": [],
  "_id": "600a9347a9dede27fc51f4b1",
  "landLord": "60097e501a4f694584b3d87b",
  "description": "Tunnelmallinen loft-asunto Helsingin Ruskeasuolla. Mukava naapurusto ja lähialueen kattavat palvelut tekevät tästä todellisen kaupunkiasujan unelman!",
  "floorPlan": "2h+k",
  "area": 58,
  "monthlyRent": 800,
  "guarantee": "Kahden kuukauden vuokra. Maksetaan muuton yhteydessä.",
  "buildYear": 1964,
  "apartmentType": "Kerrostalo",
  "isCellApartment": false,
  "floor": "5/5",
  "hasElevator": false,
  "parkingIncluded": false,
  "availableFrom": "1970-01-19T15:35:05.799Z",
  "availableUntil": "1999-12-31T22:00:00.000Z",
  "equipment": "Vuokrahintaan sisältyy 5 MBit/s verkkoyhteys, astianpesukone ja pyykkikone",
  "condition": 5,
  "petsAllowed": false,
  "smokingAllowed": false,
  "includesWater": true,
  "includesElectricity": false,
  "__v": 0
}
```

## Error responses

**Condition**: If required fields are missing.

**Code**: `403 FORBIDDEN`

**Response example**:
Here, required field `description` and the required `location` object were intentionally left out.

```json
{
  "errors": {
    "location.areaCode": {
      "name": "ValidatorError",
      "message": "Path `location.areaCode` is required.",
      "properties": {
        "message": "Path `location.areaCode` is required.",
        "type": "required",
        "path": "location.areaCode"
      },
      "kind": "required",
      "path": "location.areaCode"
    },
    "location.address": {
      "name": "ValidatorError",
      "message": "Path `location.address` is required.",
      "properties": {
        "message": "Path `location.address` is required.",
        "type": "required",
        "path": "location.address"
      },
      "kind": "required",
      "path": "location.address"
    },
    "location.city": {
      "name": "ValidatorError",
      "message": "Path `location.city` is required.",
      "properties": {
        "message": "Path `location.city` is required.",
        "type": "required",
        "path": "location.city"
      },
      "kind": "required",
      "path": "location.city"
    },
    "description": {
      "name": "ValidatorError",
      "message": "Path `description` is required.",
      "properties": {
        "message": "Path `description` is required.",
        "type": "required",
        "path": "description"
      },
      "kind": "required",
      "path": "description"
    }
  },
  "_message": "apartment validation failed",
  "message": "apartment validation failed: location.areaCode: Path `location.areaCode` is required., location.address: Path `location.address` is required., location.city: Path `location.city` is required., description: Path `description` is required."
}
```

## GET APARTMENTS

Gets all apartments currently in the database.

**URL**: `/apartments`

**METHOD**: `GET`

## Success response

**Code**: `200 OK`

**Response example**:

```json
{
  "location": {
    "city": "Helsinki",
    "neighborhood": "Ruskeasuo",
    "address": "Maskuntie 5 A 1",
    "areaCode": "00280"
  },
  "dataConnection": {
    "isIncluded": true,
    "speed": 5
  },
  "nearbyServices": {
    "publicTransport": [
      {
        "_id": "600a9bc0713b7c3b5464f1e7",
        "title": "Bussipysäkki Mannerheimintie",
        "distance": 250
      },
      {
        "_id": "600a9bc0713b7c3b5464f1e8",
        "title": "Raitiovaunupysäkki Ruskeasuo",
        "distance": 500
      }
    ],
    "healthCare": [
      {
        "_id": "600a9bc0713b7c3b5464f1e9",
        "title": "Tilkan sairaala",
        "distance": 750
      }
    ],
    "dayCare": [
      {
        "_id": "600a9bc0713b7c3b5464f1ea",
        "title": "Ruskeasuon päiväkoti",
        "distance": 200
      },
      {
        "_id": "600a9bc0713b7c3b5464f1eb",
        "title": "Länsi-Pasilan päiväkoti",
        "distance": 900
      }
    ],
    "education": [
      {
        "_id": "600a9bc0713b7c3b5464f1ec",
        "title": "Ruskeasuon peruskoulu",
        "distance": 350
      },
      {
        "_id": "600a9bc0713b7c3b5464f1ed",
        "title": "Hammaslääkäriopisto",
        "distance": 350
      }
    ],
    "excercise": [
      {
        "_id": "600a9bc0713b7c3b5464f1ee",
        "title": "Helsingin keskuspuisto",
        "distance": 200
      },
      {
        "_id": "600a9bc0713b7c3b5464f1ef",
        "title": "Tali Golf",
        "distance": 3000
      }
    ],
    "groceries": []
  },
  "images": ["wdqwdwqghrtejdfyyjtyj", "mmmnmnbkjlhgkjh"],
  "interestedUsers": [],
  "_id": "600a9bc0713b7c3b5464f1e6",
  "landLord": "60097e501a4f694584b3d87b",
  "description": "Arkikämppä Helsingin Ruskeasuolla. Hyvät kulkuyhteydet mahdollistavat nopean työmatkan paikkaan jos toiseenkin!",
  "floorPlan": "1h+kk",
  "area": 32,
  "monthlyRent": 725,
  "guarantee": "Kahden kuukauden vuokra. Maksetaan muuton yhteydessä.",
  "buildYear": 1964,
  "apartmentType": "Kerrostalo",
  "isCellApartment": false,
  "floor": "2/5",
  "hasElevator": false,
  "parkingIncluded": false,
  "availableFrom": "1970-01-19T15:35:07.969Z",
  "availableUntil": "1999-12-31T22:00:00.000Z",
  "equipment": "Vuokrahintaan sisältyy 5 MBit/s verkkoyhteys, astianpesukone. Taloyhtiöstä löytyy yhteinen pyykkitupa",
  "condition": 3,
  "petsAllowed": false,
  "smokingAllowed": false,
  "includesWater": true,
  "includesElectricity": false,
  "__v": 0
} //Accompanied by the rest of the apartments in the database.
```

## GET SINGLE APARTMENT

Gets single apartment object matching given apartmentId

**URL**: `/apartments/:apartmentId`

**METHOD**: `GET`

## Success response

**URL**: `apartments/600a9bc0713b7c3b5464f1e6`

**Code**: `200 OK`

**Response example**:
Apartment matching given apartmentId.
Populated landLord for easy data access.

```json
{
  "location": {
    "city": "Helsinki",
    "neighborhood": "Ruskeasuo",
    "address": "Maskuntie 5 A 1",
    "areaCode": "00280"
  },
  "dataConnection": {
    "isIncluded": true,
    "speed": 5
  },
  "nearbyServices": {
    "publicTransport": [
      {
        "_id": "600a9bc0713b7c3b5464f1e7",
        "title": "Bussipysäkki Mannerheimintie",
        "distance": 250
      },
      {
        "_id": "600a9bc0713b7c3b5464f1e8",
        "title": "Raitiovaunupysäkki Ruskeasuo",
        "distance": 500
      }
    ],
    "healthCare": [
      {
        "_id": "600a9bc0713b7c3b5464f1e9",
        "title": "Tilkan sairaala",
        "distance": 750
      }
    ],
    "dayCare": [
      {
        "_id": "600a9bc0713b7c3b5464f1ea",
        "title": "Ruskeasuon päiväkoti",
        "distance": 200
      },
      {
        "_id": "600a9bc0713b7c3b5464f1eb",
        "title": "Länsi-Pasilan päiväkoti",
        "distance": 900
      }
    ],
    "education": [
      {
        "_id": "600a9bc0713b7c3b5464f1ec",
        "title": "Ruskeasuon peruskoulu",
        "distance": 350
      },
      {
        "_id": "600a9bc0713b7c3b5464f1ed",
        "title": "Hammaslääkäriopisto",
        "distance": 350
      }
    ],
    "excercise": [
      {
        "_id": "600a9bc0713b7c3b5464f1ee",
        "title": "Helsingin keskuspuisto",
        "distance": 200
      },
      {
        "_id": "600a9bc0713b7c3b5464f1ef",
        "title": "Tali Golf",
        "distance": 3000
      }
    ],
    "groceries": []
  },
  "images": ["wdqwdwqghrtejdfyyjtyj", "mmmnmnbkjlhgkjh"],
  "interestedUsers": [],
  "_id": "600a9bc0713b7c3b5464f1e6",
  "landLord": {
    "blockedUsers": [],
    "apartments": [
      "600a9059a9dede27fc51f493",
      "600a9259a9dede27fc51f49d",
      "600a92b9a9dede27fc51f4a7",
      "600a9347a9dede27fc51f4b1",
      "600a9a4f8073583df06c2108",
      "600a9bc0713b7c3b5464f1e6",
      "600aa0baf7533b1c3c853cf6"
    ],
    "_id": "60097e501a4f694584b3d87b",
    "email": "teppo@landlord.com",
    "password": "nicehouses",
    "name": "Teppo",
    "surname": "Talollinen",
    "img": "z�r�*)",
    "creationTime": "2021-01-21T13:14:56.953Z",
    "lastActive": "2021-01-21T13:14:56.953Z",
    "__v": 7
  },
  "description": "Arkikämppä Helsingin Ruskeasuolla. Hyvät kulkuyhteydet mahdollistavat nopean työmatkan paikkaan jos toiseenkin!",
  "floorPlan": "1h+kk",
  "area": 32,
  "monthlyRent": 725,
  "guarantee": "Kahden kuukauden vuokra. Maksetaan muuton yhteydessä.",
  "buildYear": 1964,
  "apartmentType": "Kerrostalo",
  "isCellApartment": false,
  "floor": "2/5",
  "hasElevator": false,
  "parkingIncluded": false,
  "availableFrom": "1970-01-19T15:35:07.969Z",
  "availableUntil": "1999-12-31T22:00:00.000Z",
  "equipment": "Vuokrahintaan sisältyy 5 MBit/s verkkoyhteys, astianpesukone. Taloyhtiöstä löytyy yhteinen pyykkitupa",
  "condition": 3,
  "petsAllowed": false,
  "smokingAllowed": false,
  "includesWater": true,
  "includesElectricity": false,
  "__v": 0
}
```

## Error responses

**Condition**: If searched with non-existing userId.

**URL**: `/apartments/601005dc599cfb4664a03163`

**Code**: `404 NOT FOUND`

**Response example**:

```json
{
  "error": "No apartment found with given id"
}
```

## GET APARTMENTS OF A SINGLE LANDLORD

Gets all apartments that belong to a given landlord.
**URL**: `/landlordApts/:landlordId`
**Method**: `GET`

## Success response

**URL**: `/landlordApts/600ac5b474da8a103467f237`

**Code**: `200 OK`

**Response example**:
Found all two of a landlord's apartments:

```json
[
  {
    "location": {
      "city": "Rovaniemi",
      "neighborhood": "Keskusta",
      "address": "Maskuntie 5 A 1",
      "areaCode": "88888"
    },
    "dataConnection": {
      "isIncluded": true,
      "speed": 5
    },
    "nearbyServices": {
      "publicTransport": [
        {
          "_id": "600ac60374da8a103467f239",
          "title": "Bussipysäkki Mannerheimintie",
          "distance": 250
        },
        {
          "_id": "600ac60374da8a103467f23a",
          "title": "Raitiovaunupysäkki Ruskeasuo",
          "distance": 500
        }
      ],
      "healthCare": [
        {
          "_id": "600ac60374da8a103467f23b",
          "title": "Tilkan sairaala",
          "distance": 750
        }
      ],
      "dayCare": [
        {
          "_id": "600ac60374da8a103467f23c",
          "title": "Ruskeasuon päiväkoti",
          "distance": 200
        },
        {
          "_id": "600ac60374da8a103467f23d",
          "title": "Länsi-Pasilan päiväkoti",
          "distance": 900
        }
      ],
      "education": [
        {
          "_id": "600ac60374da8a103467f23e",
          "title": "Ruskeasuon peruskoulu",
          "distance": 350
        },
        {
          "_id": "600ac60374da8a103467f23f",
          "title": "Hammaslääkäriopisto",
          "distance": 350
        }
      ],
      "excercise": [
        {
          "_id": "600ac60374da8a103467f240",
          "title": "Helsingin keskuspuisto",
          "distance": 200
        },
        {
          "_id": "600ac60374da8a103467f241",
          "title": "Tali Golf",
          "distance": 3000
        }
      ],
      "groceries": []
    },
    "images": ["�ڰw\n���^����;r", "�i��v�X`�8"],
    "interestedUsers": [],
    "_id": "600ac60374da8a103467f238",
    "landLord": "600ac5b474da8a103467f237",
    "description": "2 Teuvon lomamökki Rovaniemellä. Hyvät kulkuyhteydet mahdollistavat nopean työmatkan paikkaan jos toiseenkin!",
    "floorPlan": "1h+kk",
    "area": 32,
    "monthlyRent": 725,
    "guarantee": "Kahden kuukauden vuokra. Maksetaan muuton yhteydessä.",
    "buildYear": 1964,
    "apartmentType": "Kerrostalo",
    "isCellApartment": false,
    "floor": "2/5",
    "hasElevator": false,
    "parkingIncluded": false,
    "availableFrom": "1970-01-19T15:35:18.787Z",
    "availableUntil": "1999-12-31T22:00:00.000Z",
    "equipment": "Vuokrahintaan sisältyy 5 MBit/s verkkoyhteys, astianpesukone. Taloyhtiöstä löytyy yhteinen pyykkitupa",
    "condition": 3,
    "petsAllowed": false,
    "smokingAllowed": false,
    "includesWater": true,
    "includesElectricity": false,
    "__v": 0
  },
  {
    "location": {
      "city": "Inari",
      "neighborhood": "Keskusta",
      "address": "Maskuntie 5 A 1",
      "areaCode": "99999"
    },
    "dataConnection": {
      "isIncluded": true,
      "speed": 5
    },
    "nearbyServices": {
      "publicTransport": [
        {
          "_id": "600ac61e74da8a103467f243",
          "title": "Bussipysäkki Mannerheimintie",
          "distance": 250
        },
        {
          "_id": "600ac61e74da8a103467f244",
          "title": "Raitiovaunupysäkki Ruskeasuo",
          "distance": 500
        }
      ],
      "healthCare": [
        {
          "_id": "600ac61e74da8a103467f245",
          "title": "Tilkan sairaala",
          "distance": 750
        }
      ],
      "dayCare": [
        {
          "_id": "600ac61e74da8a103467f246",
          "title": "Ruskeasuon päiväkoti",
          "distance": 200
        },
        {
          "_id": "600ac61e74da8a103467f247",
          "title": "Länsi-Pasilan päiväkoti",
          "distance": 900
        }
      ],
      "education": [
        {
          "_id": "600ac61e74da8a103467f248",
          "title": "Ruskeasuon peruskoulu",
          "distance": 350
        },
        {
          "_id": "600ac61e74da8a103467f249",
          "title": "Hammaslääkäriopisto",
          "distance": 350
        }
      ],
      "excercise": [
        {
          "_id": "600ac61e74da8a103467f24a",
          "title": "Helsingin keskuspuisto",
          "distance": 200
        },
        {
          "_id": "600ac61e74da8a103467f24b",
          "title": "Tali Golf",
          "distance": 3000
        }
      ],
      "groceries": []
    },
    "images": ["�ڰw\n���^����;r", "�i��v�X`�8"],
    "interestedUsers": [],
    "_id": "600ac61e74da8a103467f242",
    "landLord": "600ac5b474da8a103467f237",
    "description": "2 Teuvon lomamökki Inarissa. Hyvät kulkuyhteydet mahdollistavat nopean työmatkan paikkaan jos toiseenkin!",
    "floorPlan": "1h+kk",
    "area": 32,
    "monthlyRent": 725,
    "guarantee": "Kahden kuukauden vuokra. Maksetaan muuton yhteydessä.",
    "buildYear": 1964,
    "apartmentType": "Kerrostalo",
    "isCellApartment": false,
    "floor": "2/5",
    "hasElevator": false,
    "parkingIncluded": false,
    "availableFrom": "1970-01-19T15:35:18.814Z",
    "availableUntil": "1999-12-31T22:00:00.000Z",
    "equipment": "Vuokrahintaan sisältyy 5 MBit/s verkkoyhteys, astianpesukone. Taloyhtiöstä löytyy yhteinen pyykkitupa",
    "condition": 3,
    "petsAllowed": false,
    "smokingAllowed": false,
    "includesWater": true,
    "includesElectricity": false,
    "__v": 0
  }
]
```

## Error responses

Non-existing landlord given
**URL**: `/landlordApts/600ac5b474da8a103467f247`

**Code**: `404 NOT FOUND`

**Response**:

```json
{
  "error": "No apartments found for landlord with ID of 600ac5b474da8a103467f247"
}
```

## FIND APARTMENTS BY LOCATION

**URL**: `/apartments/location/?`

**Method**: `GET`

## Success response

Found all apartments from Rovaniemi and Inari
**URL**: `/apartments/location/?location=Rovaniemi,Inari`

**Code**: `200 OK`

```json
[
  {
    "location": {
      "city": "Rovaniemi",
      "neighborhood": "Keskusta",
      "address": "Maskuntie 5 A 1",
      "areaCode": "88888"
    },
    "dataConnection": {
      "isIncluded": true,
      "speed": 5
    },
    "nearbyServices": {
      "publicTransport": [
        {
          "_id": "600ac60374da8a103467f239",
          "title": "Bussipysäkki Mannerheimintie",
          "distance": 250
        },
        {
          "_id": "600ac60374da8a103467f23a",
          "title": "Raitiovaunupysäkki Ruskeasuo",
          "distance": 500
        }
      ],
      "healthCare": [
        {
          "_id": "600ac60374da8a103467f23b",
          "title": "Tilkan sairaala",
          "distance": 750
        }
      ],
      "dayCare": [
        {
          "_id": "600ac60374da8a103467f23c",
          "title": "Ruskeasuon päiväkoti",
          "distance": 200
        },
        {
          "_id": "600ac60374da8a103467f23d",
          "title": "Länsi-Pasilan päiväkoti",
          "distance": 900
        }
      ],
      "education": [
        {
          "_id": "600ac60374da8a103467f23e",
          "title": "Ruskeasuon peruskoulu",
          "distance": 350
        },
        {
          "_id": "600ac60374da8a103467f23f",
          "title": "Hammaslääkäriopisto",
          "distance": 350
        }
      ],
      "excercise": [
        {
          "_id": "600ac60374da8a103467f240",
          "title": "Helsingin keskuspuisto",
          "distance": 200
        },
        {
          "_id": "600ac60374da8a103467f241",
          "title": "Tali Golf",
          "distance": 3000
        }
      ],
      "groceries": []
    },
    "images": ["�ڰw\n���^����;r", "�i��v�X`�8"],
    "interestedUsers": [],
    "_id": "600ac60374da8a103467f238",
    "landLord": "600ac5b474da8a103467f237",
    "description": "2 Teuvon lomamökki Rovaniemellä. Hyvät kulkuyhteydet mahdollistavat nopean työmatkan paikkaan jos toiseenkin!",
    "floorPlan": "1h+kk",
    "area": 32,
    "monthlyRent": 725,
    "guarantee": "Kahden kuukauden vuokra. Maksetaan muuton yhteydessä.",
    "buildYear": 1964,
    "apartmentType": "Kerrostalo",
    "isCellApartment": false,
    "floor": "2/5",
    "hasElevator": false,
    "parkingIncluded": false,
    "availableFrom": "1970-01-19T15:35:18.787Z",
    "availableUntil": "1999-12-31T22:00:00.000Z",
    "equipment": "Vuokrahintaan sisältyy 5 MBit/s verkkoyhteys, astianpesukone. Taloyhtiöstä löytyy yhteinen pyykkitupa",
    "condition": 3,
    "petsAllowed": false,
    "smokingAllowed": false,
    "includesWater": true,
    "includesElectricity": false,
    "__v": 0
  },
  {
    "location": {
      "city": "Inari",
      "neighborhood": "Keskusta",
      "address": "Maskuntie 5 A 1",
      "areaCode": "99999"
    },
    "dataConnection": {
      "isIncluded": true,
      "speed": 5
    },
    "nearbyServices": {
      "publicTransport": [
        {
          "_id": "600ac61e74da8a103467f243",
          "title": "Bussipysäkki Mannerheimintie",
          "distance": 250
        },
        {
          "_id": "600ac61e74da8a103467f244",
          "title": "Raitiovaunupysäkki Ruskeasuo",
          "distance": 500
        }
      ],
      "healthCare": [
        {
          "_id": "600ac61e74da8a103467f245",
          "title": "Tilkan sairaala",
          "distance": 750
        }
      ],
      "dayCare": [
        {
          "_id": "600ac61e74da8a103467f246",
          "title": "Ruskeasuon päiväkoti",
          "distance": 200
        },
        {
          "_id": "600ac61e74da8a103467f247",
          "title": "Länsi-Pasilan päiväkoti",
          "distance": 900
        }
      ],
      "education": [
        {
          "_id": "600ac61e74da8a103467f248",
          "title": "Ruskeasuon peruskoulu",
          "distance": 350
        },
        {
          "_id": "600ac61e74da8a103467f249",
          "title": "Hammaslääkäriopisto",
          "distance": 350
        }
      ],
      "excercise": [
        {
          "_id": "600ac61e74da8a103467f24a",
          "title": "Helsingin keskuspuisto",
          "distance": 200
        },
        {
          "_id": "600ac61e74da8a103467f24b",
          "title": "Tali Golf",
          "distance": 3000
        }
      ],
      "groceries": []
    },
    "images": ["�ڰw\n���^����;r", "�i��v�X`�8"],
    "interestedUsers": [],
    "_id": "600ac61e74da8a103467f242",
    "landLord": "600ac5b474da8a103467f237",
    "description": "2 Teuvon lomamökki Inarissa. Hyvät kulkuyhteydet mahdollistavat nopean työmatkan paikkaan jos toiseenkin!",
    "floorPlan": "1h+kk",
    "area": 32,
    "monthlyRent": 725,
    "guarantee": "Kahden kuukauden vuokra. Maksetaan muuton yhteydessä.",
    "buildYear": 1964,
    "apartmentType": "Kerrostalo",
    "isCellApartment": false,
    "floor": "2/5",
    "hasElevator": false,
    "parkingIncluded": false,
    "availableFrom": "1970-01-19T15:35:18.814Z",
    "availableUntil": "1999-12-31T22:00:00.000Z",
    "equipment": "Vuokrahintaan sisältyy 5 MBit/s verkkoyhteys, astianpesukone. Taloyhtiöstä löytyy yhteinen pyykkitupa",
    "condition": 3,
    "petsAllowed": false,
    "smokingAllowed": false,
    "includesWater": true,
    "includesElectricity": false,
    "__v": 0
  }
]
```

## Error responses

Currently, no apartments are listed with the location `Heinola`.

**URL**: `/apartments/location/?location=Heinola`

**CODE**: `404 NOT FOUND`

```json
{
  "error": "No apartments found with Heinola as location values!"
}
```

## UPDATE EXISTING APARTMENT

**URL**: `/apartments/:apartmentId`

**Method**: `PUT`

**Data example**\_
Changing apartment 600a9bc0713b7c3b5464f1e6's rent from 725 to 800.

```json
{ "monthlyRent": 800 }
```

## Success response

**URL** `/apartments/600a9bc0713b7c3b5464f1e6`

**Code**: `200 OK`

```json
{
  "location": {
    "city": "Helsinki",
    "neighborhood": "Ruskeasuo",
    "address": "Maskuntie 5 A 1",
    "areaCode": "00280"
  },
  "dataConnection": {
    "isIncluded": true,
    "speed": 5
  },
  "nearbyServices": {
    "publicTransport": [
      {
        "_id": "600a9bc0713b7c3b5464f1e7",
        "title": "Bussipysäkki Mannerheimintie",
        "distance": 250
      },
      {
        "_id": "600a9bc0713b7c3b5464f1e8",
        "title": "Raitiovaunupysäkki Ruskeasuo",
        "distance": 500
      }
    ],
    "healthCare": [
      {
        "_id": "600a9bc0713b7c3b5464f1e9",
        "title": "Tilkan sairaala",
        "distance": 750
      }
    ],
    "dayCare": [
      {
        "_id": "600a9bc0713b7c3b5464f1ea",
        "title": "Ruskeasuon päiväkoti",
        "distance": 200
      },
      {
        "_id": "600a9bc0713b7c3b5464f1eb",
        "title": "Länsi-Pasilan päiväkoti",
        "distance": 900
      }
    ],
    "education": [
      {
        "_id": "600a9bc0713b7c3b5464f1ec",
        "title": "Ruskeasuon peruskoulu",
        "distance": 350
      },
      {
        "_id": "600a9bc0713b7c3b5464f1ed",
        "title": "Hammaslääkäriopisto",
        "distance": 350
      }
    ],
    "excercise": [
      {
        "_id": "600a9bc0713b7c3b5464f1ee",
        "title": "Helsingin keskuspuisto",
        "distance": 200
      },
      {
        "_id": "600a9bc0713b7c3b5464f1ef",
        "title": "Tali Golf",
        "distance": 3000
      }
    ],
    "groceries": []
  },
  "images": ["wdqwdwqghrtejdfyyjtyj", "mmmnmnbkjlhgkjh"],
  "interestedUsers": [],
  "_id": "600a9bc0713b7c3b5464f1e6",
  "landLord": "60097e501a4f694584b3d87b",
  "description": "Arkikämppä Helsingin Ruskeasuolla. Hyvät kulkuyhteydet mahdollistavat nopean työmatkan paikkaan jos toiseenkin!",
  "floorPlan": "1h+kk",
  "area": 32,
  "monthlyRent": 800,
  "guarantee": "Kahden kuukauden vuokra. Maksetaan muuton yhteydessä.",
  "buildYear": 1964,
  "apartmentType": "Kerrostalo",
  "isCellApartment": false,
  "floor": "2/5",
  "hasElevator": false,
  "parkingIncluded": false,
  "availableFrom": "1970-01-19T15:35:07.969Z",
  "availableUntil": "1999-12-31T22:00:00.000Z",
  "equipment": "Vuokrahintaan sisältyy 5 MBit/s verkkoyhteys, astianpesukone. Taloyhtiöstä löytyy yhteinen pyykkitupa",
  "condition": 3,
  "petsAllowed": false,
  "smokingAllowed": false,
  "includesWater": true,
  "includesElectricity": false,
  "__v": 0
}
```

`monthlyRent` has changed to 800.

## DELETE EXISTING APARTMENT

Deletes existing apartment (based on apartmentId) from database. For now, doesn't respond any different if there is no user corresponding the id specified.

Deleting the apartment also deletes the reference of the apartment from the apartment landlord's apartments array. This process is done by using mongoose's 'pre' hook middleware. The deletion process is defined in the `apartmentModel.js` file.
