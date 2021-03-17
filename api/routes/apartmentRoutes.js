const apartmentController = require("../controllers/apartmentController");
const helper = require("../../helpers");
var multer = require("multer");
var upload = multer();
module.exports = (app) => {
  app
    //Can be used to get all apartments from service.
    .route("/apartments")
    .get(apartmentController.getApartments)
    .post(
      helper.authenticateJWT,
      upload.array("files"),
      apartmentController.createApartment
    );

  app
    //Get apartments by their location values
    .route("/apartments/location/?")
    //.all(helper.authenticateJWT)
    .get(apartmentController.findApartmentsByLocation);

  app
    //RUD
    .route("/apartments/:apartmentId")
    .get(apartmentController.findApartment)
    .put(helper.authenticateJWT, apartmentController.updateApartment)
    .delete(helper.authenticateJWT, apartmentController.deleteApartment);

  app
    //Get all apartments of a single landlord.
    .route("/landlordApts/:landLordId")
    .get(helper.authenticateJWT, apartmentController.findLandlordApts);
};
