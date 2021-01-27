const mongoose = require("mongoose");
const landLord = mongoose.model("landLord");
const user = mongoose.model("user");
const helper = require("../../helpers");

//Login function. Pass either 'user' or 'landlord' in request body 'type' parameter to get correct access.
exports.login = async (req, res) => {
  if (req.body.type === "user") {
    try {
      const foundUser = await user.findOne({ email: req.body.email });
      let userLoginOk = await helper.comparePassword(
        req.body.password,
        foundUser.password
      );
      if (userLoginOk) {
        //Handle auth here
        res.status(200).json({ message: "LOGIN SUCCESS" });
      } else {
        res.status(403).json({ error: "Wrong username or password" });
      }
    } catch (error) {
      res.status(403).json({ error: "Wrong username or password" });
    }
  }
  if (req.body.type === "landlord") {
    try {
      const foundLandlord = await landLord.findOne({ email: req.body.email });
      let landlordLoginOk = await helper.comparePassword(
        req.body.password,
        foundLandlord.password
      );
      if (landlordLoginOk) {
        //Handle auth here
        res.status(200).json({ message: "LOGIN SUCCESS" });
      } else {
        res.status(403).json({ error: "Wrong username or password" });
      }
    } catch (error) {
      res.status(403).json({ error: "Wrong username or password" });
    }
  }
};

exports.logout = (req, res) => {
  console.log("logout");
  res.status(200).send();
};
