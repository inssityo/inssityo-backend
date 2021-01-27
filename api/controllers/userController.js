const mongoose = require("mongoose");
const user = mongoose.model("user");

//Gets all users from database and populates targetProfile.
exports.getAllUsers = (req, res) => {
  user
    .find({})
    .populate("targetProfile")
    .exec(function (err, users) {
      if (err) res.send(err);
      res.json(users);
    });
};

//Gets user by id from database and populates targetProfile.
exports.getUser = (req, res) => {
  user
    .findById(req.params.userId)
    .populate("targetProfile")
    .exec(function (err, user) {
      if (err) res.status(404).send(err);
      res.json(user);
    });
};

//Finds users by their location parameter. Query will be submitted as url parameters.
exports.findUsersByLocation = async (req, res) => {
  const allLocations = req.query.location.split(",");
  let result;
  try {
    result = await user.find({ location: { $in: allLocations } });
    if (result.length === 0) {
      throw {
        error: `No users found with ${allLocations} as location values!`,
      };
    }
  } catch (err) {
    return res.status(404).send(err);
  }
  res.json(result);
};

//Creates new user object and saves to database.
exports.createUser = (req, res) => {
  const userDetails = req.body;
  //Add lastactive field to delete expired users.
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
  if (userToUpdate.img) {
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
