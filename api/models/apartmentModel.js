const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema(
  {
    //Vuokranantajakäyttäjä
    landLord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "landLord",
      required: true,
    },
    //Kuvat
    // eslint-disable-next-line no-undef
    images: [{ data: Buffer, type: String }],
    //Vapaamuotoinen kuvaus
    description: { type: String, required: true },
    viewCount: { type: Number },
    //Huoneet & tilat, esim 2H+kk, sauna
    floorPlan: { type: String, required: true },
    //Asuinpinta-ala esim 66m^2
    area: { type: Number, required: true },
    //Yksittäisen soluhuoneen pinta-ala esim 12m^2
    cellArea: { type: Number },
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
    //Kuukausivuokra
    monthlyRent: { type: Number, required: true },
    //Vuokravakuus, esim 2kk vuokra tai tietty summa. Myös mahd. sitoutumisvaatimus.
    guarantee: { type: String },
    buildYear: { type: Number },
    //1-kerrostalo 2-rivitalo 3-paritalo 4-omakotitalo 5-ketjutalo 6-Luhtitalo 7-Puutalo-osake 8-muu?
    apartmentType: { type: Number, required: true },
    //Onko soluasunto tai sen yksi huone?
    isCellApartment: { type: Boolean, required: true },
    //Kerrosluku esim 2/4.
    floor: { type: "String" },
    hasElevator: { type: Boolean },
    //Muutettavissa alk. pvm.
    availableFrom: { type: Date, required: true },
    //Sopimus voimassa. Kokeillaan laittaa timestamp arvolla 0 frontendissä klikkaamalla valinta "toistaiseksi".
    availableUntil: { type: Date, required: true },
    //Vapaamuotoinen tekstikenttä asunnon varusteluista. Onko pyykkikonetta vai yhteinen pesutupa? Valmiiksi kalustettu vai ei?
    equipment: { type: String },
    //Jonkinlainen kuntoluokittelu.
    condition: { type: Number },
    // TEE TÄHÄN TERMS - OLIO, LISÄÄ KOTIVAKUUTUKSEN PAKOLLISUUS
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
    //Listaus lähimpiä palveluita. Ilmoitusmuoto {title:Nimike, esim bussipysäkki Kurkimäki, distance:Etäisyys metreinä, esim 400}
    nearbyServices: {
      // Julkinen liikenne: bussi- ja raitiopysäkit, juna- ja metroasemat, lentokenttä.
      publicTransport: [
        { title: { type: String }, distance: { type: Number } },
      ],
      // Ruokakaupat
      groceries: [{ title: { type: String }, distance: { type: Number } }],
      // Terveysasemat, sairaalat, hammashoitolat ym.
      healthCare: [{ title: { type: String }, distance: { type: Number } }],
      //Päiväkodit
      dayCare: [{ title: { type: String }, distance: { type: Number } }],
      //Koulut ja opistot
      education: [{ title: { type: String }, distance: { type: Number } }],
      //Merkittävimmät liikuntapaikat
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
