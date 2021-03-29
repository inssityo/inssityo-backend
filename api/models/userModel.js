const mongoose = require("mongoose");
const petTypesSchema = require("../models/petTypesSchema");
const hobbiesSchema = require("../models/hobbiesSchema");

//User profile. Will contain data from users. Will be compared against targetProfiles of other users to find housemates that match.
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //Server adds dates on creation
  creationTime: { type: Date, required: true },
  lastActive: { type: Date, required: true },
  //Information given while creating profile
  name: { type: String },
  surname: { type: String },
  movingDate: { type: Date },
  //Profile picture
  img: { type: String },
  //Older is bigger
  ageGroup: { type: Number, min: 1, max: 8 },
  //1-male, 2-female, 3-other.
  gender: { type: Number, min: 1, max: 3 },
  //preferred living places
  location: [{ type: String }],
  rentLimit: { type: Number },
  maxRoomMates: { type: Number },
  //1-employed, 2-unemployed, 3-student, 4-retiree
  employmentStatus: { type: Number, min: 1, max: 4 },
  //1-day job, 2-shift work, 3-night job, 4-travel job - ask and show only if employmentStatus = 1
  workType: { type: Number, min: 1, max: 4 },
  description: { type: String },
  //1-not at all, 2-sometimes, 3-often
  alcohol: { type: Number, min: 1, max: 3 },
  //1-not at all, 2-sometimes, 3-often
  smoking: { type: Number, min: 1, max: 3 },
  //1-not at all, 2-sometimes, 3-often
  drugs: { type: Number, min: 1, max: 3 },
  //Max. 7, https://stackoverflow.com/questions/28514790/how-to-set-limit-for-array-size-in-mongoose-schema
  personalityTraits: {
    type: [{ type: String }],
    validate: [arrayLimit, "{PATH} exceeds the limit of 7 personality traits"],
  },
  //1-Loner ... 5-Social
  sociality: { type: Number, min: 1, max: 7 },
  pets: { type: Boolean },
  //show only if Pets = true, https://stackoverflow.com/a/49940245{}
  petTypes: petTypesSchema,
  hobbies: hobbiesSchema,
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  //The dream room mate for this user. Will be compared against other users"
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

//Middleware to handle deletion of user reference in interestedUsers arrays of apartments upon user deletion.
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

//Middleware to handle deletion of user reference in blockedUsers arrays of other users upon user deletion.
userSchema.pre("deleteOne", function (next) {
  var query = this;
  mongoose
    .model("user")
    .updateMany({}, { $pull: { blockedUsers: query._conditions._id } }, next);
});

//Middleware to handle deletion of user reference in blockedUsers arrays of landlords upon user deletion.
userSchema.pre("deleteOne", function (next) {
  var query = this;
  mongoose
    .model("landLord")
    .updateMany({}, { $pull: { blockedUsers: query._conditions._id } }, next);
});

module.exports = mongoose.model("user", userSchema);
