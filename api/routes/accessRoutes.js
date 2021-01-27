const accessController = require("../controllers/accessController");

module.exports = (app) => {
  app.route("/login").post(accessController.login);

  app.route("/logout").post(accessController.logout);
};
