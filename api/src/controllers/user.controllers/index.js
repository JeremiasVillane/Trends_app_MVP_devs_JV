const changeUserPassword = require("./changeUserPassword");
const deleteUserProfile = require("./deleteUserProfile");
const getUserFeed = require("./getUserFeed");
const getUserProfile = require("./getUserProfile");
const putUserProfile = require("./putUserProfile");

module.exports = {
  getUserProfile,
  changeUserPassword,
  putUserProfile,
  deleteUserProfile,
  getUserFeed,
};
