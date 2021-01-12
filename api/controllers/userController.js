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
    if (err) res.send(err);
    res.json(user);
  });
};

//Tämä vaatii, että pyynnön bodyssä lähetetään user-olio.
exports.createUser = (req, res) => {
  const newUser = new user(req.body);
  newUser.save((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

//Tämä vaatii, että pyynnön bodyssä lähetetään user-olio.
exports.updateUser = (req, res) => {
  user.findByIdAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.deleteUser = (req, res) => {
  user.deleteOne({ _id: req.params.userId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "user deleted!",
      _id: req.params.userId,
    });
  });
};
