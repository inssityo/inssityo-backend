const apartmentController = require("../controllers/apartmentController");

module.exports = (app) => {
  app
    //Can be used to get all apartments from service.
    .route("/apartments/")
    .get(apartmentController.getApartments)
    .post(apartmentController.createApartment);

  app
    //Get apartments by their location values
    .route("/apartments/location/?")
    .get(apartmentController.findApartmentsByLocation);

  app
    //RUD
    .route("/apartments/:apartmentId")
    .get(apartmentController.findApartment)
    .put(apartmentController.updateApartment)
    .delete(apartmentController.deleteApartment);

  app
    //Get all apartments of a single landlord.
    .route("landlordApts/:landlordId")
    .get(apartmentController.findLandlordApts);
};
