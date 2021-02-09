const mongoose = require("mongoose");

//Landlord profile. Will contain data from landlord users.
const landLordSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //Server adds these on creation.
    creationTime: { type: Date, required: true },
    lastActive: { type: Date, required: true },

    //Profile creation data.
    name: { type: String },
    surname: { type: String },
    //Profile picture
    // eslint-disable-next-line no-undef
    img: { data: Buffer, type: String },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    apartments: [{ type: mongoose.Schema.Types.ObjectId, ref: "apartment" }],
  },
  { collection: "landlords" }
);

//Deletion of all child apartments on landlord deletion.
landLordSchema.pre("deleteOne", function (next) {
  let query = this;
  mongoose
    .model("apartment")
    .deleteOne({ landLord: query._conditions._id }, next);
});

module.exports = mongoose.model("landLord", landLordSchema);
