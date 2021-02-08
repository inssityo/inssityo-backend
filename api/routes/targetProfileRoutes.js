const targetProfileController = require("../controllers/targetProfileController");

module.exports = (app) => {
  app
    .route("/targetProfiles")
    //Can be used to get all target profiles from service.
    .get(targetProfileController.getAllTargetProfiles)
    .post(targetProfileController.createTargetProfile);

  app
    //Get targetprofiles by their location values
    .route("/targetProfiles/location/?")
    .get(targetProfileController.findTargetProfilesByLocation);

  app
    //RUD
    .route("/targetProfiles/:targetProfileId")
    .get(targetProfileController.findTargetProfile)
    .put(targetProfileController.updateTargetProfile)
    .delete(targetProfileController.deleteTargetProfile);
};
