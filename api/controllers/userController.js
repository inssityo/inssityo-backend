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
  if (userDetails.img !== null) {
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
  const userToUpdate = req.body;
  if (userToUpdate.img !== null) {
    userToUpdate.img = new Buffer.from(req.body.img, "base64");
  }
  user.findByIdAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.status(403).send(err);
      res.json(user);
    }
  );
};
//POISTA TÄSSÄ YHTEYDESSÄ MYÖS KÄYTTÄJÄN TARGETPROFILE!
exports.deleteUser = (req, res) => {
  user.deleteOne({ _id: req.params.userId }, (err) => {
    if (err) res.status(404).send(err);
    res.json({
      message: "user deleted!",
      _id: req.params.userId,
    });
  });
};
