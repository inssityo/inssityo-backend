const { json } = require("body-parser");
const mongoose = require("mongoose");
const targetProfile = mongoose.model("targetProfile");
const User = mongoose.model("user");

exports.getAllTargetProfiles = (req, res) => {
  targetProfile
    .find({})
    .populate("user")
    .exec(function (err, targetProfiles) {
      if (err) res.status(404).send();
      res.json(targetProfiles);
    });
};

exports.findTargetProfile = (req, res) => {
  targetProfile
    .findById(req.query.targetProfileId)
    .populate("user")
    .exec(function (err, targetProfile) {
      if (err) res.status(403).send();
      res.json(targetProfile);
    });
};

//KESKEN
exports.findTargetProfilesByLocation = async (req, res) => {
  const allLocations = req.query.location.split(",");
  console.log(allLocations);
  let result;
  try {
    result = await targetProfile
      .find({ location: { $in: allLocations } })
      .populate("user");
  } catch (err) {
    console.log(err);
    return res.status(404).send();
  }
  res.json(result);
};

exports.createTargetProfile = async (req, res) => {
  const newTargetProfile = new targetProfile(req.body);
  console.log(req.body);
  newTargetProfile.save((err, targetProfile) => {
    if (err) res.status(403).send();
    res.status(201).json(targetProfile);
  });
  const owner = await User.findById(req.body.user);
  owner.targetProfile = newTargetProfile._id;
  owner.save();
};

exports.updateTargetProfile = (req, res) => {
  targetProfile.findByIdAndUpdate(
    { _id: req.params.targetProfileId },
    req.body,
    { new: true },
    (err, targetProfile) => {
      if (err) res.status(403).send();
      res.json(targetProfile);
    }
  );
};

exports.deleteTargetProfile = (req, res) => {
  targetProfile.deleteOne({ _id: req.params.targetProfileId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "target profile deleted!",
      _id: req.params.targetProfileId,
    });
  });
};
