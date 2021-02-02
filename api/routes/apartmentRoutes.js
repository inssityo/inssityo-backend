const apartmentController = require("../controllers/apartmentController");
const helper = require("../../helpers");
module.exports = (app) => {
  app
    //Can be used to get all apartments from service.
    .route("/apartments")
    .all(helper.authenticateJWT)
    .get(apartmentController.getApartments)
    .post(apartmentController.createApartment);

  app
    //Get apartments by their location values
    .route("/apartments/location/?")
    .all(helper.authenticateJWT)
    .get(apartmentController.findApartmentsByLocation);

  app
    //RUD
    .route("/apartments/:apartmentId")
    .all(helper.authenticateJWT)
    .get(apartmentController.findApartment)
    .put(apartmentController.updateApartment)
    .delete(apartmentController.deleteApartment);

  app
    //Get all apartments of a single landlord.
    .route("/landlordApts/:landLordId")
    .get(helper.authenticateJWT, apartmentController.findLandlordApts);
};
