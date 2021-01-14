const targetProfileController = require("../controllers/targetProfileController");

module.exports = (app) => {
  app
    .route("/targetProfiles")
    //Can be used to get all target profiles from service.
    .get(targetProfileController.getAllTargetProfiles)
    .post(targetProfileController.createTargetProfile);

  app
    .route("/targetProfiles/location/?")
    .get(targetProfileController.findTargetProfilesByLocation);
};
