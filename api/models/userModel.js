const mongoose = require("mongoose");
const petTypesSchema = require("../models/petTypesSchema");
const hobbiesSchema = require("../models/hobbiesSchema");

//User profile. Will contain data from users. Will be compared against targetProfiles of other users to find housemates that match.
const userSchema = new mongoose.Schema({
  //MINIMISSÄÄN TARVITTAVAT TIEDOT, AJANKOHDAT MÄÄRITTYVÄT KÄYTTÄJÄN TALLENTUESSA
  email: { type: String, required: true, unique: true },
  //Pitäisi salata jotenkin.
  password: { type: String, required: true },
  //SERVERI LISÄÄ LUONNIN YHTEYDESSÄ
  creationTime: { type: Date, required: true },
  lastActive: { type: Date, required: true },

  //SIVUSTOLLA PROFIILIA LUOTAESSA TÄYTETTÄVÄT TIEDOT
  name: { type: String },
  surname: { type: String },
  movingDate: { type: Date },
  //Profiilikuva
  // eslint-disable-next-line no-undef
  img: { data: Buffer, type: String },
  //Vanhempi on isompi numero.
  ageGroup: { type: Number, min: 1, max: 8 },
  //1-mies, 2-nainen, 3-muu.
  gender: { type: Number, min: 1, max: 3 },
  //toiveasuinpaikka/-paikat
  location: [{ type: String }],
  rentLimit: { type: Number },
  maxRoomMates: { type: Number },
  //1-työssäkäyvä, 2-työtön, 3-opiskelija, 4-eläkeläinen
  employmentStatus: { type: Number, min: 1, max: 4 },
  //1-päivätyö, 2-vuorotyö, 3-yötyö, 4-reissutyö - KYSY JA NÄYTÄ VAIN JOS employmentStatus = 1
  workType: { type: Number, min: 1, max: 4 },
  description: { type: String },
  //1-en lainkaan, 2-silloin tällöin, 3-usein, 4-todella paljon
  alcohol: { type: Number, min: 1, max: 4 },
  //1-en lainkaan, 2-silloin tällöin, 3-usein, 4-todella paljon
  smoking: { type: Number, min: 1, max: 4 },
  //1-en lainkaan, 2-silloin tällöin, 3-usein, 4-todella paljon
  drugs: { type: Number, min: 1, max: 4 },
  //Max. 7kpl, https://stackoverflow.com/questions/28514790/how-to-set-limit-for-array-size-in-mongoose-schema
  personalityTraits: {
    type: [{ type: String }],
    validate: [arrayLimit, "{PATH} exceeds the limit of 7 personality traits"],
  },
  //1-Yksineläjä ... 5-laumaeläin
  sociality: { type: Number, min: 1, max: 7 },
  pets: { type: Boolean },
  //Näytä vain jos Pets = true, https://stackoverflow.com/a/49940245{}
  petTypes: [petTypesSchema],
  hobbies: [hobbiesSchema],
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  //KÄYTTÄJÄN "UNELMAKÄMPPIS JONKA POHJALTA ETSITÄÄN SOPIVIA KÄYTTÄJIÄ"
  targetProfile: {
    max: 1,
    type: mongoose.Schema.Types.ObjectId,
    ref: "targetProfile",
  },
});
function arrayLimit(val) {
  return val.length <= 7;
}

//User deletion middleware to delete ref targetProfile on user deletion
//https://stackoverflow.com/a/55338337
userSchema.pre("deleteOne", function (next) {
  var query = this;
  mongoose
    .model("targetProfile")
    .deleteOne({ user: query._conditions._id }, function (err) {
      if (err) {
        console.log(err);
      } else {
        return next();
      }
    });
});

// - - TESTAA - - Middleware to handle deletion of user reference in interestedUsers arrays of apartments upon user deletion.
userSchema.pre("deleteOne", function (next) {
  var query = this;
  mongoose
    .model("apartment")
    .updateMany(
      {},
      { $pull: { interestedUsers: query._conditions._id } },
      next
    );
});

module.exports = mongoose.model("user", userSchema);
