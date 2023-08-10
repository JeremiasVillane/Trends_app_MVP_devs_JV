const { User, UserChatGroup } = require("../../db");

module.exports = async (
  group,
  groupId,
  userId,
  ownerId,
  role,
  currentUserId,
  currentUserType
) => {
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
  const userToEdit = plainGroup.users.filter((user) => user.id === userId);

  if (!userToEdit || !userToEdit.length) {
    return res.status(404).json({ error: "User not found in chat group" });
  }

  // const userToEditRole = userToEdit[0].userChatGroup.role;

  if (currentUserId === ownerId || currentUserType === "admin") {
    await userGroup.update({ role });
    return {
      message: "User role updated successfully",
    };
  }
  return { error: "Not authorized" };
};
