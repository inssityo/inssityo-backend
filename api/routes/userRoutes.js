const userController = require("../controllers/userController");
const helper = require("../../helpers");

module.exports = (app) => {
  app
    //Read all, CREATE
    .route("/users")
    .get(helper.authenticateJWT, userController.getAllUsers)
    .post(userController.createUser);

  app
    //Get users by their location values
    .route("/users/location/?")
    .get(helper.authenticateJWT, userController.findUsersByLocation);

  app
    //RUD
    .route("/users/:userId")
    .all(helper.authenticateJWT)
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
};
