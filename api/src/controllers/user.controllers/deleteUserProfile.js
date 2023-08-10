const { User } = require("../../db");

module.exports = async (id) => {
  const deletedProfile = await User.destroy({ where: { id } });

  return deletedProfile;
};
