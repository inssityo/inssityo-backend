const mongoose = require("mongoose");
const apartment = mongoose.model("apartment");
const landLord = mongoose.model("landLord");
const googleDriveService = require("../../google-images/index.js");

async function generateImgURL(imgID) {
  console.log("genrating", imgID);
  console.log("generating img url for", imgID);
  let imgDataUrl = await googleDriveService.getFileUrl(imgID);
  console.log("DATAURL", imgDataUrl);
  return imgDataUrl;
}

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
      if (apartment) {
        res.json(apartment);
      } else {
        err = { error: "No apartment found with given id" };
        res.status(404).send(err);
      }
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
  console.log(JSON.parse(req.body.mainData));
  console.log(req.body);

  console.log("GLE0", req.files);
  try {
    const owner = await landLord.findById(req.body.landLord);

    if (!owner) throw "Parent landlord not found or defined in request body";

    const newApartment = new apartment(JSON.parse(req.body.mainData));
    newApartment.images = [];
    //TTL INDEX
    newApartment.lastActive = new Date();
    newApartment.creationTime = new Date();
    if (req.files !== null) {
      let imgArr = req.files;
      const folderTitle = `${newApartment.location.city} - ${newApartment.location.address.streetName} - ${newApartment.location.address.houseNumber} - ${owner._id}`;
      const imgFolder = await googleDriveService.createFolder(folderTitle);

      imgArr.forEach(async (item, i) => {
        console.log(item);
        let photoName = `${newApartment.location.address.streetName} - ${newApartment.location.address.houseNumber} - photo-${i}`;
        const imageName = await googleDriveService.uploadToFolder(
          imgFolder,
          photoName,
          item
        );
        newApartment.images.push(imageName.data.id);
        console.log(imageName.data.id);
      });

      console.log("NewaptIMGS", newApartment.images);
    }
    //initialize view counter
    newApartment.viewCount = 0;
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
  let apartmentToUpdate = req.body;
  apartmentToUpdate.lastActive = new Date();
  apartment.findByIdAndUpdate(
    { _id: req.params.apartmentId },
    apartmentToUpdate,
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
