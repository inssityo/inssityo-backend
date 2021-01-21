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
  newLandlord.save((err, landLord) => {
    if (err) res.send(err);
    res.json(landLord);
  });
};

//Finds landlord by id given in request params.
exports.getLandlordById = (req, res) => {
  landLord.findById(req.params.landLordId, (err, landLord) => {
    if (err) res.status(404).send(err);
    res.json(landLord);
  });
};

//Updates landlord with given request params with specified request body data.
exports.updateLandLord = (req, res) => {
  landLord.findByIdAndUpdate(
    { _id: req.params.landLordId },
    req.body,
    { new: true },
    (err, landLord) => {
      if (err) res.status(403).send(err);
      res.json(landLord);
    }
  );
};

//Deletes a landlord with Id specified in request params. Pre delete hook to delete all child apartments of landlord in landlordModel.js
exports.deleteLandLord = (req, res) => {
  landLord.deleteOne({ _id: req.params.landLordId }, (err) => {
    if (err) res.status(404).send(err);
    res.json({ message: "landlord deleted", _id: req.params.landLordId });
  });
};
