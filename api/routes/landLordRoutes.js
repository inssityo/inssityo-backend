const landLordController = require("../controllers/landLordController");
const helper = require("../../helpers");

module.exports = (app) => {
  app
    .route("/landlords")
    .get(helper.authenticateJWT, landLordController.getAllLandLords)
    .post(landLordController.createLandLord);

  app
    .route("/landlords/:landLordId")
    .all(helper.authenticateJWT)
    .get(landLordController.getLandlordById)
    .put(landLordController.updateLandLord)
    .delete(landLordController.deleteLandLord);
};
