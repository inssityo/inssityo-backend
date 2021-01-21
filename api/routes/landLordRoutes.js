const landLordController = require("../controllers/landLordController");

module.exports = (app) => {
  app
    .route("/landlords")
    .get(landLordController.getAllLandLords)
    .post(landLordController.createLandLord);

  app
    .route("/landlords/:landLordId")
    .get(landLordController.getLandlordById)
    .put(landLordController.updateLandLord)
    .delete(landLordController.deleteLandLord);
};
