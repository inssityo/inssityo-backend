const mongoose = require("mongoose");
const apartment = mongoose.model("apartment");

//Gets ALL target profiles from database
exports.getApartments = (req, res) => {
  apartment.find({}, (err, apartments) => {
    if (err) res.send(err);
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

exports.findApartmentsByLocation = async (req, res) => {
  const allLocations = req.query.location.split(",");
  let result;
  try {
    result = await apartment.find({ location: { $in: allLocations } });
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

exports.createApartment = async (req, res) => {
  try {
    const owner = await landLord.findById(req.body.landLord);

    if (!owner) throw "Parent landlord not found or defined in request body";

    const newApartment = new apartment(req.body);
    newApartment.save((err, apartment) => {
      if (err) res.status(403).send(err);
      res.status(201).json(apartment);
    });
    owner.apartments.push(newApartment._id);
    owner.save();
  } catch (error) {
    res.status(403).json({ error });
  }
};

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

exports.deleteApartment = (req, res) => {
  apartment.deleteOne({ _id: req.params.apartmentId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "apartment successfully deleted",
      _id: req.params.apartmentId,
    });
  });
};
