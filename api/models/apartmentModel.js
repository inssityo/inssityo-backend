const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema(
  {
    //Vuokranantajakäyttäjä
    landLord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "landLord",
    },
    //Kuvat
    images: [{ data: Buffer, type: String }],
    //Vapaamuotoinen kuvaus
    description: { type: String, required: true },
    //Huoneet & tilat, esim 2H+kk, sauna
    floorPlan: { type: String, required: true },
    //Asuinpinta-ala esim 66m^2
    area: { type: Number, required: true },
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
    //Vuokravakuus, esim 2kk vuokra tai tietty summa.
    guarantee: { type: String },
    buildYear: { type: Number },
    //Kerrostalo, paritalo, rivitalo, OKT jne. Tehdäänkö tästä numero?
    apartmentType: { type: String, required: true },
    //Onko soluasunto tai sen yksi huone?
    isCellApartment: { type: Boolean, required: true },
    //Kerrosluku esim 2/4.
    floor: { type: "String" },
    //Muutettavissa alk. pvm.
    availableFrom: { type: Date, required: true },
    //Sopimus voimassa. Miten ilmaistaan toistaiseksi?
    availableUntil: { type: Date, required: true },
    //Vapaamuotoinen tekstikenttä asunnon varusteluista. Onko pyykkikonetta vai yhteinen pesutupa? Valmiiksi kalustettu vai ei?
    equipment: { type: String },
    //Jonkinlainen kuntoluokittelu.
    condition: { type: Number },
    petsAllowed: { type: Boolean, required: true },
    smokingAllowed: { type: Boolean, required: true },
    includesWater: { type: Boolean },
    includesElectricity: { type: Boolean },
    dataConnection: {
      isIncluded: { type: Boolean },
      speed: { type: Number },
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

//TESTAA TOIMIIKO, JOS MONTA ASUNTOA JA VAIN YKSI POISTETAAN!
apartmentSchema.pre("deleteOne", function (next) {
  let query = this;
  mongoose
    .model("landLord")
    .updateOne(
      { apartment: query.conditions._id },
      { $unset: { apartment: 1 } },
      { multi: false },
      next
    );
});

module.exports = mongoose.model("apartment", apartmentSchema);
