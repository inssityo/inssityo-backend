const apartmentController = require("../controllers/apartmentController");
const targetProfileRoutes = require("./targetProfileRoutes");

module.exports = (app) => {
  app
    //Can be used to get all apartments from service.
    .route("/apartments/")
    .get(apartmentController.getApartments);

  app
    //Get apartments by their location values
    .route("/apartments/location/?")
    .get(apartmentController.findApartmentsByLocation);

  app
    .route("/apartments/:apartmentId")
    .get(apartmentController.findApartment)
    .put(apartmentController.updateApartment)
    .delete(apartmentController.deleteApartment);
};
