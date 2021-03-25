const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Apartment = mongoose.model("apartment");
const TargetProfile = mongoose.model("targetProfile");
const User = mongoose.model("user");
const Landlord = mongoose.model("landLord");

//bcrypt hash checker
exports.comparePassword = async (given, encrypted) => {
  const result = await bcrypt.compare(given, encrypted);
  return result;
};

exports.createImgURLS = (imgArr) => {
  let imageDisplayUrls = [];
  for (const img of imgArr) {
    let imgUrl = `https://drive.google.com/uc?id=${img}&amp;export=download`;
    imageDisplayUrls.push(imgUrl);
  }
  return imageDisplayUrls;
};

//JWT Authentication middleware
exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        //FRONTEND token refresh process on this 403.
        return res.status(403).send(err);
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).send();
  }
};

//Updates all lastActive dates for a landlord and their apartments
exports.UpdateAptDates = async (landlordId) => {
  await Landlord.updateOne(
    { _id: landlordId },
    { $set: { lastActive: new Date() } }
  );
  await Apartment.updateMany(
    { landLord: landlordId },
    { $set: { lastActive: new Date() } }
  );
};

//Updates all lastActive dates for an user and their targetprofile
exports.UpdateTargetProfileDate = async (userId) => {
  await User.updateOne({ _id: userId }, { $set: { lastActive: new Date() } });
  await TargetProfile.updateOne(
    { user: userId },
    { $set: { lastActive: new Date() } }
  );
};
