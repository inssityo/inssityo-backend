const mongoose = require("mongoose");
const apartment = mongoose.model("apartment");
const landLord = mongoose.model("landLord");
const googleDriveService = require("../../google-images/index.js");
const helper = require("../../helpers.js");

//Gets ALL apartments from database
exports.getApartments = async (req, res) => {
  apartment.find({}, (err, apartments) => {
    if (err) res.status(404).send(err);
    let aptDocs = JSON.parse(JSON.stringify(apartments));
    aptDocs.forEach((apt) => {
      if (apt.images) {
        apt.imageDisplayUrls = helper.createImgURLS(apt.images);
      }
    });
    res.json(aptDocs);
  });
};

//Find apartments by their id
exports.findApartment = (req, res) => {
  apartment
    .findById(req.params.apartmentId)
    .populate("landLord")
    .exec(function (err, apartment) {
      if (apartment) {
        let aptDoc = JSON.parse(JSON.stringify(apartment));
        if (aptDoc.images) {
          aptDoc.imageDisplayUrls = helper.createImgURLS(aptDoc.images);
          res.json(aptDoc);
        }
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
  let resultDocs = JSON.parse(JSON.stringify(result));
  resultDocs.forEach((doc) => {
    if (doc.images) {
      doc.imageDisplayUrls = helper.createImgURLS;
    }
  });
  res.json(resultDocs);
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
  let resultDocs = JSON.parse(JSON.stringify(result));
  resultDocs.forEach((doc) => {
    if (doc.images) {
      doc.imageDisplayUrls = helper.createImgURLS;
    }
  });
  res.json(resultDocs);
};

// Creates new apartment and saves it to the specified landlord's apartment array.
exports.createApartment = async (req, res) => {
  console.log("MAIN DATA: ", JSON.parse(req.body.mainData));
  console.log(req.body);

  console.log("ADDITIONAL FILES: ", req.files);
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
      for (const [i, item] of imgArr.entries()) {
        console.log("ITEM", item);
        console.log("I", i);
        let photoName = `${newApartment.location.address.streetName} - ${
          newApartment.location.address.houseNumber
        } - photo-${i + 1}`;
        const imageName = await googleDriveService.uploadToFolder(
          imgFolder,
          photoName,
          item
        );
        newApartment.images.push(imageName.data.id);
        console.log(imageName.data.id);
      }

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
  const foundApt = await apartment.findOne({ _id: req.params.apartmentId });

  await apartment.deleteOne({ _id: req.params.apartmentId }, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (foundApt.images) {
        googleDriveService.deleteParentFolder(foundApt.images[0]);
      }
      res.json({ message: "apartment deleted", _id: req.params.apartmentId });
    }
  });
};
