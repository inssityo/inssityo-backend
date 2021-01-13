const mongoose = require("mongoose");
const user = mongoose.model("user");

exports.getAllUsers = (req, res) => {
  user.find({}, (err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

exports.getUser = (req, res) => {
  user.findById(req.params.userId, (err, user) => {
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
  const newUser = new user(userDetails);
  newUser.save((err, user) => {
    if (err) res.status(403).send(err);
    res.status(201).json(user);
  });
};

//Tämä vaatii, että pyynnön bodyssä lähetetään user-olio.
exports.updateUser = (req, res) => {
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

exports.deleteUser = (req, res) => {
  user.deleteOne({ _id: req.params.userId }, (err) => {
    if (err) res.status(404).send(err);
    res.json({
      message: "user deleted!",
      _id: req.params.userId,
    });
  });
};
