const { UserChatGroup, MessageChatGroup } = require("../../db");

module.exports = async (groupId, messageId, userId, userType) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return { error: "Chat group not found" };
  }

  const message = await MessageChatGroup.findOne({
    where: { id: messageId, chatGroupId: groupId },
  });

  if (!message) {
    return { error: "Message not found" };
  }

  if (message.userId === userId || userType === "admin") {
    await message.destroy();

    return { message: "Message deleted from database" };
  }

  return {
    error: "Forbidden",
  };
};
