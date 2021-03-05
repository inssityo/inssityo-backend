# APARTMENT

Apartments are real life properties listed by their owners, landlords into the service. Non-landlord users can then contact the landlord to apply for the apartment to become tenants in it either by themselves or in a group. The apartment model holds important information about the property.

References to the apartment owner and interested tenants-to-be are also held in the model for future communication features.

The mongoose schema for apartment is as follows:

```
const apartmentSchema = new mongoose.Schema(
  {
    //Landlord user
    landLord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "landLord",
      required: true,
    },

    //Server adds dates on creation
    creationTime: { type: Date, required: true },

    lastActive: { type: Date, required: true },

    images: [{ data: Buffer, type: String }],

    //Sale or rent?
    isForSale:{type:Boolean, required:true},

    //name of housing association
    housingAssociation:{type:String},

    //text description
    description: { type: String, required: true },

    isFurnished: { type: Boolean },

    viewCount: { type: Number },

    //Floor plan
    floorPlan:{ regular:{ title:{type:String, default:"regular"}, amount:{ type:Number } },
     kitchen:{ title:{type:String, default:"kitchen"}, amount:{ type:Number } },
     kitchenette:{ title:{type:String, default:"kitchenette"}, amount:{ type:Number } },
     diningRoom: { title:{type:String, default:"diningRoom"}, amount:{ type:Number } },
     bathRoom:{ title:{type:String, default:"bathRoom"}, amount:{ type:Number } },
     toilet: { title:{type:String, default:"toilet"}, amount:{ type:Number } },
     sauna:{ title:{type:String, default:"sauna" }, amount:{ type:Number } },
     wardrobe:{ title:{type:String, default:"wardrobe"}, amount:{ type:Number } },
     utilityRoom:{ title:{type:String, default:"utility room"}, amount:{ type:Number } },
     patio:{ title:{type:String, default:"patio"}, amount:{ type:Number } },
     balcony:{ title:{type:String, default:"balcony"}, amount:{ type:Number } } },

    //Total area of the household
    totalArea: {type: Number, required:true},

    //liveable area in square meteres 66m^2
    livingArea: { type: Number, required: true },

    //Area of single cell room for ex. 12m^2
    cellArea: { type: Number },

    //Area of possible included land property m^2
    propertyArea: {type:Number},

    location: {
      //Helsinki
      city: { type: String, required: true },
      //Kontula
      neighborhood: { type: String },
      //Mannerheimintie 15 C 4
      address: { type: String, required: true },
      //44100
      areaCode: { type: String, required: true },
    },

    //Property has garage
    hasGarage:{ type:Boolean },

    //Hot tub
    hasHotTub:{ type:Boolean },

    //Swimming pool
    hasPool:{ type:Boolean },

    //Monthly rent for rental apartments
    monthlyRent: { type: Number },

    //Monthly rent for possible land property
    propertyRent: { type: Number },

    //Sale price incl and excl debt.
    price: { salePrice:{type:Number}, debtFreePrice:{type:Number} },

    maintenanceCosts: { type: Number },
    //Rent quarantee and possible commitment rules.

    guarantee: { type: String },

    buildYear: { type: Number },

    //1-block of flats 2-terraced house 3-semi-detached house 4-detached house 5-chain house
    6-Luhtitalo 7-wooden house share 8-other
    apartmentType: { type: Number, required: true },

    //Property is a cell apartment room
    isCellApartment: { type: Boolean, required: true },

    //floor number for ex. 2/4
    floor: { type: String },

    hasElevator: { type: Boolean },

    availableFrom: { type: Date, required: true },

    //"For now" option given with timestamp value of 0 in front end.
    availableUntil: { type: Date, required: true },

    //Text field about the utilities of the house and possible renovations of future and past
    equipment: { type: String },

    //Condition evaluation
    condition: { type: Number },

    petsAllowed: { type: Boolean, required: true },

    smokingAllowed: { type: Boolean, required: true },

    utilities: {
      insurancePlan: {
        mustHave: { type: Boolean },
        monthlyPrice: { type: Number },
      },
      parkingIncluded: { type: Boolean },
      water: { mustHave: { type: Boolean }, monthlyPrice: { type: Number } },
      includesElectricity: {
        mustHave: { type: Boolean },
        monthlyPrice: { type: Number },
      },
      dataConnection: {
        isIncluded: { type: Boolean },
        speed: { type: Number },
      },
    },

    //Listing of nearest different services {title:Name, for example Kurkimäki bus stop
    distance:distance in meters, for example 400}
    nearbyServices: {
      // Public transport: bus stops, railway stations, etc.
      publicTransport: [
        { title: { type: String }, distance: { type: Number } },
      ],
      // Grocery stores
      groceries: [{ title: { type: String }, distance: { type: Number } }],
      // Hospitals, dentists, etch
      healthCare: [{ title: { type: String }, distance: { type: Number } }],
      //Day cares
      dayCare: [{ title: { type: String }, distance: { type: Number } }],
      //Schools and institutions
      education: [{ title: { type: String }, distance: { type: Number } }],
      //Notable excercise locations
      excercise: [{ title: { type: String }, distance: { type: Number } }],
    },
    interestedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { collection: "apartments" }
);
```

Please note, that filling out every field of this schema on document creation is neither necessary or sensible. Complete only the required fields and then fill what you need to make a truthful listing.

## CREATE NEW APARTMENT

New apartment can be created. It requires a parent `landlord` and some other fields defined below. Apartment data can be updated later.

**URL**: `/apartments`

**Auth required** : YES

**Method**: `POST`

**Data constraints**:
Required fields: `description(String)` `isForSale(Boolean)` `floorPlan(String)` `totalArea(Number)` `livingArea(Number)` `area(Number)` `location{ city(string), neighborhood(string), address.streetName(string), areacode(string)}` `monthlyRent(Number)` `apartmentType(string)` `isCellApartment(boolean)` `availableFrom(date)` `availableUntil(date)` `petsAllowed(boolean)` `smokingAllowed(boolean)`

**Data example**:

```json
{
  "landLord": "601a831929bf5f228cfcd4cb",
  "isForSale": true,
  "images": ["wdqwdwqghfwefwrtejdfyyjtyj", "mmmnmwewewwnbkjlhgkjh"],
  "description": "Maalaiskartano Orimattilassa",
  "floorPlan": {
    "regular": { "amount": 5 },
    "bathRoom": { "amount": 2 },
    "utilityRoom": { "amount": 2 }
  },
  "totalArea": 200,
  "livingArea": 180,
  "location": {
    "city": "Orimattila",
    "neighborhood": "Töhnö",
    "address": { "streetName": "Töhnönraitti", "houseNumber": "5 A 1" },
    "areaCode": "16300"
  },
  "price": { "salePrice": 250000, "debtFreePrice": 250000 },
  "guarantee": "Kahden kuukauden vuokra. Maksetaan muuton yhteydessä.",
  "buildYear": 1964,
  "apartmentType": 1,
  "isCellApartment": false,
  "hasElevator": false,
  "availableFrom": "{{$timestamp}}",
  "availableUntil": "0",
  "equipment": "Kevyt pyöräkuormaaja tilusten ja pihan hoitoon",
  "condition": 3,
  "petsAllowed": false,
  "smokingAllowed": false,
  "utilities": {
    "insurancePlan": { "mustHave": true, "monthlyPrice": 30 },
    "parkingIncluded": true,
    "water": { "mustHave": true, "monthlyPrice": 70 },
    "includesElectricity": { "mustHave": true, "monthlyPrice": 40 },
    "dataConnection": { "isIncluded": false, "speed": 5 }
  },
  "nearbyServices": {
    "publicTransport": [
      { "title": "Bussipysäkki Orimattila", "distance": 250 }
    ],
    "groceries": [
      { "title": "Sale Orimattila", "distance": 600 },
      { "title": "S-market Orimattila", "distance": 950 }
    ],
    "healthCare": [{ "title": "Terveyskeskus", "distance": 750 }],
    "dayCare": [{ "title": "Orimattilan päiväkoti", "distance": 200 }],
    "education": [{ "title": "Orimattilan peruskoulu", "distance": 350 }],
    "excercise": [{ "title": "Liikuntapuisto", "distance": 200 }]
  }
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

**Auth required** : YES

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

**Auth required** : YES

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

**Auth required** : YES

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

**Auth required** : YES

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

**Auth required** : YES

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

**URL**: `/apartments/:apartmentId`

**Auth required** : YES

**Method**: `DELETE`

## Success Response

Deleting an apartment.

**URL**: `/apartments/6006e56798c464818a0bqcgt`

**Content example** :
Apartment is now removed from the database.

```json
{
  "message": "target profile deleted!",
  "_id": "6006e56798c464818a0bqcgt"
}
```
