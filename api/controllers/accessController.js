const mongoose = require("mongoose");
const landLord = mongoose.model("landLord");
const user = mongoose.model("user");
const helper = require("../../helpers");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

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
        const accessToken = jwt.sign(
          { username: foundUser.email },
          process.env.TOKEN_SECRET,
          { expiresIn: "60m" }
        );
        const refreshToken = jwt.sign(
          { username: foundUser.email },
          process.env.REFRESH_SECRET
        );

        refreshTokens.push(refreshToken);

        res.status(200).json({ accessToken, refreshToken });
      } else {
        res.status(401).json({ error: "Wrong username or password" });
      }
    } catch (error) {
      res.status(401).json({ error: "Wrong username or password" });
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
        const accessToken = jwt.sign(
          { username: foundLandlord.email },
          process.env.TOKEN_SECRET,
          { expiresIn: "60m" }
        );
        const refreshToken = jwt.sign(
          { username: foundLandlord.email },
          process.env.REFRESH_SECRET
        );

        refreshTokens.push(refreshToken);

        res.status(200).json({ accessToken, refreshToken });
      } else {
        res.status(401).json({ error: "Wrong username or password" });
      }
    } catch (error) {
      res.status(401).json({ error: "Wrong username or password" });
    }
  }
};

exports.logout = (req, res) => {
  const token = req.body.refreshToken;
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.json({ message: "Logged out!" });
};

exports.refreshSession = (req, res) => {
  const token = req.body.refreshToken;
  if (!token) {
    return res.status(401).json({ error: "refreshtoken not found" });
  }

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ error: "bad refreshToken! Log in again!" });
  }

  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send(err);
    }

    const accessToken = jwt.sign(
      { username: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "60m" }
    );

    res.json({ accessToken });
  });
};
