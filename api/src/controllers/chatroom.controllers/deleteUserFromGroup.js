const { User, UserChatGroup } = require("../../db");

module.exports = async (group, groupId, userId, ownerId, currentUserType) => {
  const user = await User.findByPk(userId);

  if (!user) {
    return { error: "User not found" };
  }

  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return { error: "That user doesn't belong to the chat group" };
  }

  const plainGroup = group.toJSON();
  const userToRemove = plainGroup.users.filter((user) => user.id === userId);

  if (!userToRemove || !userToRemove.length) {
    return res.status(404).json({ error: "User not found in chat group" });
  }

  const userToRemoveRole = userToRemove[0].userChatGroup.role;

  if (
    (userId === ownerId || userToRemoveRole === "moderator") &&
    currentUserType !== "admin"
  ) {
    return { error: "Not authorized" };
  }

  await group.removeUser(user);

  return {
    message: "User deleted from chat group successfully",
  };
};
