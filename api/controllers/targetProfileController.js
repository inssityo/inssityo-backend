const mongoose = require("mongoose");
const targetProfile = mongoose.model("targetProfile");
const User = mongoose.model("user");

//Gets ALL target profiles from database
exports.getAllTargetProfiles = (req, res) => {
  targetProfile
    .find({})
    .populate("user")
    .exec(function (err, targetProfiles) {
      if (err) res.status(404).send();
      res.json(targetProfiles);
    });
};

//Find target profile by its id
exports.findTargetProfile = (req, res) => {
  targetProfile
    .findById(req.params.targetProfileId)
    .populate("user")
    .exec(function (err, targetProfile) {
      if (targetProfile) {
        res.json(targetProfile);
      } else {
        err = { error: "No target profile found with given id" };
        res.status(404).send(err);
      }
    });
};

//Finds targetProfiles by their location parameter. Query will be submitted as url parameters.
exports.findTargetProfilesByLocation = async (req, res) => {
  const allLocations = req.query.location.split(",");
  let result;
  try {
    result = await targetProfile
      .find({ location: { $in: allLocations } })
      .populate("user");
    if (result.length === 0) {
      throw {
        error: `No profiles found with ${allLocations} as location values!`,
      };
    }
  } catch (err) {
    return res.status(404).send(err);
  }
  res.json(result);
};

//Creates a target profile and saves it to database. If a user id is given, also creates a reference to the user.
exports.createTargetProfile = async (req, res) => {
  try {
    const owner = await User.findById(req.body.user);

    if (!owner) throw "Parent user not found or defined in request body";
    if (owner.targetProfile) throw "Parent user already has target profile";

    const newTargetProfile = new targetProfile(req.body);
    //Add lastactive field to delete expired users.
    newTargetProfile.lastActive = new Date();
    newTargetProfile.creationTime = new Date();
    newTargetProfile.save((err, targetProfile) => {
      if (err) res.status(403).send(err);
      res.status(201).json(targetProfile);
    });
    owner.targetProfile = newTargetProfile._id;
    owner.save();
  } catch (error) {
    res.status(403).json({ error });
  }
};

//Updates saved profile
exports.updateTargetProfile = (req, res) => {
  let targetProfileToUpdate = req.body;
  targetProfileToUpdate.lastActive = new Date();
  targetProfile.findByIdAndUpdate(
    { _id: req.params.targetProfileId },
    targetProfileToUpdate,
    { new: true },
    (err, targetProfile) => {
      if (err) res.status(403).send(err);
      res.json(targetProfile);
    }
  );
};

//Deletes saved profile.
exports.deleteTargetProfile = async (req, res) => {
  targetProfile.deleteOne({ _id: req.params.targetProfileId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "target profile deleted!",
      _id: req.params.targetProfileId,
    });
  });
};
