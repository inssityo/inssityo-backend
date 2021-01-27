const mongoose = require("mongoose");
const landLord = mongoose.model("landLord");

//Gets all landlords from database
exports.getAllLandLords = (req, res) => {
  landLord.find({}, (err, landLords) => {
    if (err) res.status(404).send(err);
    res.json(landLords);
  });
};

//Creates a new landlord user and saves it to database.
exports.createLandLord = (req, res) => {
  const newLandlord = new landLord(req.body);
  newLandlord.creationTime = new Date();
  newLandlord.lastActive = new Date();
  if (newLandlord.email) {
    newLandlord.email = newLandlord.email.toLowerCase();
  }
  if (newLandlord.img !== null) {
    newLandlord.img = new Buffer.from(newLandlord.img, "base64");
  }
  newLandlord.save((err, landLord) => {
    if (err) res.status(403).send(err);
    res.status(201).json(landLord);
  });
};

//Finds landlord by id given in request params.
exports.getLandlordById = (req, res) => {
  landLord
    .findById(req.params.landLordId)
    .populate("apartments")
    .exec(function (err, landlord) {
      if (err) res.status(404).send(err);
      res.json(landlord);
    });
};

//Updates landlord with given request params with specified request body data.
exports.updateLandLord = (req, res) => {
  let landlordToUpdate = req.body;
  if (landlordToUpdate.img) {
    landlordToUpdate.img = new Buffer.from(landlordToUpdate.img, "base64");
  }
  landlordToUpdate.lastActive = new Date();
  landLord.findByIdAndUpdate(
    { _id: req.params.landLordId },
    landlordToUpdate,
    { new: true },
    (err, landLord) => {
      if (err) res.status(403).send(err);
      res.json(landLord);
    }
  );
};

//Deletes a landlord with Id specified in request params. Pre delete hook to delete all child apartments of landlord in landlordModel.js
exports.deleteLandLord = async (req, res) => {
  await landLord.deleteOne({ _id: req.params.landLordId }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "landlord deleted", _id: req.params.landLordId });
    }
  });
};
