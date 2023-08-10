const { UserChatGroup, MessageChatGroup } = require("../../db");

module.exports = async (groupId, content, userId, userType) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (userGroup || userType === "admin") {
    const message = await MessageChatGroup.create({ content });
    await message.setUser(userId);
    await message.setChatGroup(groupId);

    return message;
  }

  return {
    error: "You don't have authorization to send messages to this group",
  };
};
