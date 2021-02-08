const mongoose = require("mongoose");

//Landlord profile. Will contain data from landlord users.
const landLordSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    //Pitäisi salata jotenkin.
    password: { type: String, required: true },
    //Serveri lisää luonnin yhteydessä.
    creationTime: { type: Date, required: true },
    lastActive: { type: Date, required: true },

    //Sivustolla profiilia luotaessa täytettävät tiedot
    name: { type: String },
    surname: { type: String },
    //Profiilikuva
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
