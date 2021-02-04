const mongoose = require("mongoose");

const petTypesSchema = require("../models/petTypesSchema");
const hobbiesSchema = require("../models/hobbiesSchema");

//Mongoose model for preferred housemate profile. This will be compared to other User profiles to find matching housemates.
const targetProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  //Server adds these on creation.
  creationTime: { type: Date, required: true },
  lastActive: { type: Date, required: true },

  //Bigger means older
  ageGroup: { type: Number, min: 1, max: 8, required: true },
  //1-male, 2-female, 3-other. multiple can be chosen.
  gender: [{ type: Number, min: 1, max: 3, required: true }],
  // Locations preferred to move into
  location: [{ type: String, required: true }],
  rentLimit: { type: Number },
  maxRoomMates: { type: Number },
  //1-employed, 2-unemployed, 3-student, 4-retiree
  employmentStatus: { type: Number, min: 1, max: 4 },
  //1-day job, 2-shift work, 3-night work, 4-travel work - ASK AND SHOW only if employmentStatus = 1
  workType: { type: Number, min: 1, max: 4 },
  //1-not at all, 2-sometimes, 3-often, 4-a lot
  alcohol: { type: Number, min: 1, max: 4 },
  //1-not at all, 2-sometimes, 3-often, 4-a lot
  smoking: { type: Number, min: 1, max: 4 },
  //1-not at all, 2-sometimes, 3-often, 4-a lot
  drugs: { type: Number, min: 1, max: 4 },
  //Max. 7, https://stackoverflow.com/questions/28514790/how-to-set-limit-for-array-size-in-mongoose-schema
  personalityTraits: {
    type: [{ type: String }],
    validate: [arrayLimit, "{PATH} exceeds the limit of 7 personality traits"],
  },
  //1-Loner ... 5-Social
  sociality: { type: Number, min: 1, max: 7 },
  pets: { type: Boolean },
  //Show only if Pets = true, https://stackoverflow.com/a/49940245{}
  petTypes: [petTypesSchema],
  hobbies: [hobbiesSchema],
});

//Middleware to handle deletion of targetprofile reference in parent user on targetprofile deletion.
targetProfileSchema.pre("deleteOne", function (next) {
  var query = this;
  mongoose
    .model("user")
    .updateOne(
      { targetProfile: query._conditions._id },
      { $unset: { targetProfile: 1 } },
      { multi: false },
      next
    );
});

function arrayLimit(val) {
  return val.length <= 7;
}

module.exports = mongoose.model("targetProfile", targetProfileSchema);
