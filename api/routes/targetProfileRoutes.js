const targetProfileController = require("../controllers/targetProfileController");
const helper = require("../../helpers");

module.exports = (app) => {
  app
    .route("/targetProfiles")
    .all(helper.authenticateJWT)
    //Can be used to get all target profiles from service.
    .get(targetProfileController.getAllTargetProfiles)
    .post(targetProfileController.createTargetProfile);

  app
    //Get targetprofiles by their location values
    .route("/targetProfiles/location/?")
    .get(
      helper.authenticateJWT,
      targetProfileController.findTargetProfilesByLocation
    );

  app
    //RUD
    .route("/targetProfiles/:targetProfileId")
    .all(helper.authenticateJWT)
    .get(targetProfileController.findTargetProfile)
    .put(targetProfileController.updateTargetProfile)
    .delete(targetProfileController.deleteTargetProfile);
};
