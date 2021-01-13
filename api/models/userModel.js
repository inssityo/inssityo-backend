const mongoose = require("mongoose");
const petTypesSchema = require("../models/petTypesSchema");
const hobbiesSchema = require("../models/hobbiesSchema");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  //Pitäisi salata jotenkin.
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  creationTime: { type: Date, required: true },
  lastActive: { type: Date, required: true },
  movingDate: { type: Date },
  //Vanhempi on isompi numero.
  ageGroup: { type: Number, min: 1, max: 8, required: true },
  //1-mies, 2-nainen, 3-muu.
  gender: { type: Number, min: 1, max: 3, required: true },
  //Onko tässä tarkoitus olla tämänhetkinen asuinkunta vai toiveasuinpaikka/-paikat?
  location: [{ type: String, required: true }],
  rentLimit: { type: Number },
  maxRoomMates: { type: Number },
  //1-työssäkäyvä, 2-työtön, 3-opiskelija, 4-eläkeläinen, 5-varusmies
  employmentStatus: { type: Number, min: 1, max: 5 },
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
  sociality: { type: Number, min: 1, max: 5 },
  pets: { type: Boolean },
  //Näytä vain jos Pets = true, https://stackoverflow.com/a/49940245{}
  petTypes: [petTypesSchema],
  hobbies: [hobbiesSchema],
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});
function arrayLimit(val) {
  return val.length <= 7;
}

module.exports = mongoose.model("user", userSchema);
