const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const decryptPassword = async (passwordToComparate, correctPassword) => {
  return await bcrypt.compare(passwordToComparate, correctPassword);
};

module.exports = { encryptPassword, decryptPassword };
