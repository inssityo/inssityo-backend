const mongoose = require("mongoose");
const user = mongoose.model("user");
const bcrypt = require("bcrypt");
const googleDriveService = require("../../google-images/index.js");

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
      if (user) {
        res.json(user);
      } else {
        err = { error: "No user found with given id" };
        res.status(404).send(err);
      }
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
exports.createUser = async (req, res) => {
  const userDetails = req.body;
  //Add lastactive field to delete expired users.
  userDetails.lastActive = new Date();
  userDetails.creationTime = new Date();
  userDetails.email = userDetails.email.toLowerCase();

  if (userDetails.img) {
    const imageName = await googleDriveService.uploadToFolder(
      process.env.GOOGLE_USER_PARENT,
      `${userDetails.email} - userPhoto`,
      req.files[0]
    );
    userDetails.img = imageName.data.id;
  }

  const newUser = new user(userDetails);
  //Hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;

      newUser.password = hash;
      newUser.save((err, user) => {
        if (err) res.status(403).send(err);
        res.status(201).json(user);
      });
    });
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
  const foundUser = await user.findOne({ _id: req.params.userId });

  await user.deleteOne({ _id: req.params.userId }, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (foundUser.img) {
        googleDriveService.deleteFile(foundUser.img);
      }
      res.json({
        message: "user deleted!",
        _id: req.params.userId,
      });
    }
  });
};
