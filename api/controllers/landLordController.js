const mongoose = require("mongoose");
const landLord = mongoose.model("landLord");
const bcrypt = require("bcrypt");
const googleDriveService = require("../../google-images/index.js");

//Gets all landlords from database
exports.getAllLandLords = (req, res) => {
  landLord.find({}, (err, landLords) => {
    if (err) res.status(404).send(err);
    res.json(landLords);
  });
};

//Creates a new landlord user and saves it to database.
exports.createLandLord = async (req, res) => {
  const newLandlord = new landLord(req.body);
  //Hash password
  newLandlord.creationTime = new Date();
  newLandlord.lastActive = new Date();
  newLandlord.email = newLandlord.email.toLowerCase();

  if (newLandlord.img) {
    const imageName = await googleDriveService.uploadToFolder(
      process.env.GOOGLE_LANDLORD_PARENT,
      `${newLandlord.email} - landlordPhoto`,
      req.files[0]
    );
    newLandlord.img = imageName.data.id;
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newLandlord.password, salt, (err, hash) => {
      if (err) throw err;
      newLandlord.password = hash;

      newLandlord.save((err, landLord) => {
        if (err) res.status(403).send(err);
        res.status(201).json(landLord);
      });
    });
  });
};

//Finds landlord by id given in request params.
exports.getLandlordById = (req, res) => {
  landLord
    .findById(req.params.landLordId)
    .populate("apartments")
    .exec(function (err, landlord) {
      if (landlord) {
        res.json(landlord);
      } else {
        err = { error: "No landlord found with given id" };
        res.status(404).send(err);
      }
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
  const foundLandlord = await landLord.findOne({ _id: req.params.landLordId });

  await landLord.deleteOne({ _id: req.params.landLordId }, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (foundLandlord.img) {
        googleDriveService.deleteFile(foundLandlord.img);
      }
      res.json({ message: "landlord deleted", _id: req.params.landLordId });
    }
  });
};
