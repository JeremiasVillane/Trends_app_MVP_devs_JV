const { Admin } = require("../../db");

module.exports = async (userData) => {
  if (await Admin.findOne({ where: { username: userData.username } }))
    throw new Error("This username already exists.");
  return await Admin.create(userData);
};
