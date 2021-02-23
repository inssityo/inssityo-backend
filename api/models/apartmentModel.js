const mongoose = require("mongoose");

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
    // eslint-disable-next-line no-undef
    images: [{ data: Buffer, type: String }],
    //Sale or rent?
    isForSale: { type: Boolean, required: true },
    //name of housing association
    housingAssociation: { type: String },
    buildingManager: { type: String },
    //Upkeep by tenants or maintenance company?
    maintainer: { type: String },
    yard: { type: String },
    allowedBuildArea: { type: Number },
    zoning: { type: String },
    //text description
    description: { type: String, required: true },
    isFurnished: { type: Boolean },
    viewCount: { type: Number },
    //Floor plan
    floorPlan: {
      regular: {
        title: { type: String, default: "regular" },
        amount: { type: Number },
      },
      kitchen: {
        title: { type: String, default: "kitchen" },
        amount: { type: Number },
      },
      kitchenette: {
        title: { type: String, default: "kitchenette" },
        amount: { type: Number },
      },
      diningRoom: {
        title: { type: String, default: "diningRoom" },
        amount: { type: Number },
      },
      bathRoom: {
        title: { type: String, default: "bathRoom" },
        amount: { type: Number },
      },
      toilet: {
        title: { type: String, default: "toilet" },
        amount: { type: Number },
      },
      sauna: {
        title: { type: String, default: "sauna" },
        amount: { type: Number },
      },
      wardrobe: {
        title: { type: String, default: "wardrobe" },
        amount: { type: Number },
      },
      utilityRoom: {
        title: { type: String, default: "utility room" },
        amount: { type: Number },
      },
    },
    balcony: { exists: { type: Boolean }, description: { type: String } },
    patio: { exists: { type: Boolean }, description: { type: String } },
    //Total area of the household
    totalArea: { type: Number, required: true },
    //liveable area in square meteres 66m^2
    livingArea: { type: Number, required: true },
    //Area of single cell room for ex. 12m^2
    cellArea: { type: Number },
    //Area of possible included land property m^2
    propertyArea: { type: Number },
    location: {
      //Helsinki
      city: { type: String, required: true },
      //Kontula
      neighborhood: { type: String },
      //Mannerheimintie 15 C 4
      address: {
        streetName: { type: String, required: true },
        houseNumber: { type: String },
      },
      //44100
      areaCode: { type: String, required: true },
    },
    //Property has garage
    hasGarage: { type: Boolean },
    //Hot tub
    hasHotTub: { type: Boolean },
    //Swimming pool
    hasPool: { type: Boolean },
    //Monthly rent for rental apartments
    monthlyRent: { type: Number },
    //Monthly rent for possible land property
    property: {
      rented: { type: Boolean },
      owner: { type: String },
      propertyRent: { type: Number },
      contractExpiresAt: { type: Date },
    },
    //Sale price incl and excl debt.
    price: { salePrice: { type: Number }, debtFreePrice: { type: Number } },
    // if the housing company is in debt, there may be associated financing costs.
    maintenanceCosts: { upkeep: { type: Number }, financing: { type: Number } },
    propertyTax: { type: Number },
    //Rent quarantee and possible commitment rules.
    guarantee: { type: String },
    buildYear: { type: Number },
    //1-block of flats 2-terraced house 3-semi-detached house 4-detached house 5-chain house 6-Luhtitalo 7-wooden house share 8-other
    apartmentType: { type: Number, required: true },
    //Property is a cell apartment room
    isCellApartment: { type: Boolean, required: true },
    //floor number for ex. 2/4
    floor: { type: String },
    //Number of floors in property
    propertyFloors: { type: String },
    //views from the apartment windows.
    sights: { type: String },
    hasElevator: { type: Boolean },
    availableFrom: { type: Date, required: true },
    //"For now" option given with timestamp value of 0 in front end.
    availableUntil: { type: Date, required: true },
    //Text field about the equipment of the house. For example, ovens and washing machines can be included here.
    equipment: {
      //Kitchen, stove, machines etc.
      kitchen: { type: String },
      // # of sinks etc.
      bathroom: { type: String },
      //Wardrobes, cabinets
      storage: { type: String },
      //Oil, wood, electric, geothermic, and other information
      heating: { type: String },
      //Property sewage tanks or drain pipes
      plumbing: { type: String },
      //Well or local water
      water: { type: String },
      //garbage disposal
      garbage: { type: String },
      //Geothermic, electronic, free-flow
      airConditioning: { type: String },
      //Shared equipment, playgrounds, terraces etc.
      common: { type: String },
      //miscellaneous important information
      other: { type: String },
    },
    //Information about detached buildings, forest and fields on the property.
    propertyDescription: { type: String },
    totalAmountOfAptsOnProperty: { type: Number },
    businessesOnProperty: { type: String },
    buildMaterial: { type: String },
    roofType: { type: String },
    //is the roof made from brick, metal or something else?
    roofLining: { type: String },
    //Information about past and possible upcoming renovations.
    renovationDescription: { type: String },
    //Energy efficiency class.
    energyClass: { type: String },
    //Condition evaluation.
    condition: { type: Number },
    //Limitations set by housing company. Is smoking allowed? Is airbnb-style short term renting allowed?
    limitations: { type: String },
    petsAllowed: { type: Boolean, required: true },
    smokingAllowed: { type: Boolean, required: true },
    utilities: {
      utilityDescription: { type: String },
      insurancePlan: {
        mustHave: { type: Boolean },
        monthlyPrice: { type: Number },
      },
      //Does the property include parking? types: 1-outdoor 2-open garage 3-closed garage 4-common parking garage
      parking: {
        exists: { type: Boolean },
        description: { type: String },
        supportsElectric: { type: Boolean },
        type: { type: Number },
      },
      water: {
        mustHave: { type: Boolean },
        monthlyPrice: { type: Number },
      },
      includesElectricity: {
        mustHave: { type: Boolean },
        monthlyPrice: { type: Number },
      },
      dataConnection: {
        isIncluded: { type: Boolean },
        speed: { type: Number },
      },
    },
    //Listing of nearest different services {title:Name, for example Kurkimäki bus stop, distance:distance in meters, for example 400}
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

//Middleware to handle deletion of apartment ref from landlord upon apartment deletion
apartmentSchema.pre("deleteOne", function (next) {
  let query = this;
  mongoose
    .model("landLord")
    .updateOne({}, { $pull: { apartments: query._conditions._id } }, next);
});

module.exports = mongoose.model("apartment", apartmentSchema);
