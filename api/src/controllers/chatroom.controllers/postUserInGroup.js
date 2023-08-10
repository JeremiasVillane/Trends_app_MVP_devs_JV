const { User } = require("../../db");

module.exports = async (group, userId, role) => {
  const user = await User.findByPk(userId);

  if (!user) {
    return { error: "User not found" };
  }

  await group.addUser(user, { through: { role } });

  return { message: "User added to chat group successfully" };
};
