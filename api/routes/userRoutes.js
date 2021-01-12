const userController = require("../controllers/userController");

module.exports = (app) => {
  app
    .route("/users")
    .get(userController.getAllUsers)
    .post(userController.createUser);

  app
    .route("/users/:userId")
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
};
