const mongoose = require("mongoose");
const user = mongoose.model("user");

exports.getAllUsers = (req, res) => {
  user
    .find({})
    .populate("targetProfile")
    .exec(function (err, users) {
      if (err) res.send(err);
      res.json(users);
    });
};

exports.getUser = (req, res) => {
  user
    .findById(req.params.userId)
    .populate("targetProfile")
    .exec(function (err, user) {
      if (err) res.status(404).send(err);
      res.json(user);
    });
};

//Tämä vaatii, että pyynnön bodyssä lähetetään user-olio.
exports.createUser = (req, res) => {
  const userDetails = req.body;
  //Lisätään luonnin yhteydessä lastActive-kenttä, jotta voidaan poistaa inaktiiviset käyttäjät.
  userDetails.lastActive = new Date();
  userDetails.creationTime = new Date();
  if (userDetails.email) {
    userDetails.email = userDetails.email.toLowerCase();
  }
  if (userDetails.img !== null) {
    // eslint-disable-next-line no-undef
    userDetails.img = new Buffer.from(req.body.img, "base64");
  }
  const newUser = new user(userDetails);
  newUser.save((err, user) => {
    if (err) res.status(403).send(err);
    res.status(201).json(user);
  });
};

//Tämä vaatii, että pyynnön bodyssä lähetetään user-olio.
exports.updateUser = (req, res) => {
  let userToUpdate = req.body;
  userToUpdate.lastActive = new Date();
  if (userToUpdate.img !== null) {
    // eslint-disable-next-line no-undef
    userToUpdate.img = new Buffer.from(req.body.img, "base64");
  }
  user.findByIdAndUpdate(
    { _id: req.params.userId },
    userToUpdate,
    { new: true },
    (err, user) => {
      if (err) res.status(403).send(err);
      res.json(user);
    }
  );
};

//Middleware in userModel.js handles deletion of ref targetProfiles with mongoose 'pre' hook.
exports.deleteUser = async (req, res) => {
  await user.deleteOne({ _id: req.params.userId }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: "user deleted!",
        _id: req.params.userId,
      });
    }
  });
};
