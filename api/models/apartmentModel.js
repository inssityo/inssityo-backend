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
      patio: {
        title: { type: String, default: "patio" },
        amount: { type: Number },
      },
      balcony: {
        title: { type: String, default: "balcony" },
        amount: { type: Number },
      },
    },
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
      address: { type: String, required: true },
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
    propertyRent: { type: Number },
    //Sale price incl and excl debt.
    price: { salePrice: { type: Number }, debtFreePrice: { type: Number } },
    maintenanceCosts: { type: Number },
    //Rent quarantee and possible commitment rules.
    guarantee: { type: String },
    buildYear: { type: Number },
    //1-block of flats 2-terraced house 3-semi-detached house 4-detached house 5-chain house 6-Luhtitalo 7-wooden house share 8-other
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
