const userController = require("../controllers/userController");

module.exports = (app) => {
  app
    //Read all, CREATE
    .route("/users")
    .get(userController.getAllUsers)
    .post(userController.createUser);

  app
    //Get users by their location values
    .route("/users/location/?")
    .get(userController.findUsersByLocation);

  app
    //RUD
    .route("/users/:userId")
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
};
