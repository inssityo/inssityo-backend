const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//bcrypt hash checker
exports.comparePassword = async (given, encrypted) => {
  const result = await bcrypt.compare(given, encrypted);
  return result;
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
