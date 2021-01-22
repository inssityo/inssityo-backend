const mongoose = require("mongoose");
const apartment = mongoose.model("apartment");
const landLord = mongoose.model("landLord");

//Gets ALL apartments from database
exports.getApartments = (req, res) => {
  apartment.find({}, (err, apartments) => {
    if (err) res.status(404).send(err);
    res.json(apartments);
  });
};

//Find apartments by their id
exports.findApartment = (req, res) => {
  apartment
    .findById(req.params.apartmentId)
    .populate("landLord")
    .exec(function (err, apartment) {
      if (err) res.status(404).send(err);
      res.json(apartment);
    });
};

//Find a landlord's apartments by landlord ID
exports.findLandlordApts = async (req, res) => {
  let result;
  try {
    result = await apartment.find({ landLord: req.params.landLordId });
    if (result.length === 0) {
      throw {
        error: `No apartments found for landlord with ID of ${req.params.landLordId}`,
      };
    }
  } catch (err) {
    return res.status(404).send(err);
  }
  res.json(result);
};

//Find apartments by their location value.
exports.findApartmentsByLocation = async (req, res) => {
  const allLocations = req.query.location.split(",");
  let result;
  try {
    result = await apartment.find({ "location.city": { $in: allLocations } });
    if (result.length === 0) {
      throw {
        error: `No apartments found with ${allLocations} as location values!`,
      };
    }
  } catch (err) {
    return res.status(404).send(err);
  }
  res.json(result);
};

// Creates new apartment and saves it to the specified landlord's apartment array.
exports.createApartment = async (req, res) => {
  try {
    const owner = await landLord.findById(req.body.landLord);

    if (!owner) throw "Parent landlord not found or defined in request body";

    const newApartment = new apartment(req.body);
    if (newApartment.images !== null) {
      let imgArr = newApartment.images;
      imgArr.forEach(
        (element, index) => (imgArr[index] = new Buffer.from(element, "base64"))
      );
      newApartment.images = imgArr;
    }
    newApartment.save((err, apartment) => {
      if (err) res.status(403).send(err);
      res.status(201).json(apartment);
    });
    //Save to landlord's apartment array
    owner.apartments.push(newApartment._id);
    owner.save();
  } catch (error) {
    res.status(403).json({ error });
  }
};

//Updates apartment data from request body
exports.updateApartment = (req, res) => {
  apartment.findByIdAndUpdate(
    { _id: req.params.apartmentId },
    req.body,
    { new: true },
    (err, apartment) => {
      if (err) res.send(err);
      res.json(apartment);
    }
  );
};

//Deletes apartment. Pre delete hook for landlord ref deletion in apartmentModel.js
exports.deleteApartment = async (req, res) => {
  await apartment.deleteOne({ _id: req.params.apartmentId }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "apartment deleted", _id: req.params.apartmentId });
    }
  });
};
