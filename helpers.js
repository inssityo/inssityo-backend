const bcrypt = require("bcrypt");

exports.comparePassword = async (given, encrypted) => {
  const result = await bcrypt.compare(given, encrypted);
  return result;
};
