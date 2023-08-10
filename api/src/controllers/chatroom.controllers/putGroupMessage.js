const { User, UserChatGroup, MessageChatGroup } = require("../../db");
const messageFormatter = require("../../helpers/messageFormatter");
const deleteGroupMessage = require("./deleteGroupMessage");

module.exports = async (
  groupId,
  messageId,
  userId,
  userType,
  content,
  messageStatus
) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return { error: "Chat group not found" };
  }

  const message = await MessageChatGroup.findOne({
    where: { id: messageId, chatGroupId: groupId },
    include: [
      {
        model: User,
        attributes: ["id", "username", "type", "profile_image"],
      },
    ],
  });

  if (!message) {
    return { error: "Message not found" };
  }

  if (message.userId === userId || userType === "admin") {
    message.content = content;

    if (messageStatus && !["sent", "read", "deleted"].includes(messageStatus)) {
      return { error: "Invalid message status" };
    }

    if (messageStatus === "sent") {
      message.messageStatus === message.messageStatus;
    } else {
      message.messageStatus = messageStatus || message.messageStatus;
    }

    if (messageStatus === "deleted") {
      message.content = "Este mensaje fue eliminado"
    }

    await message.save();

    return messageFormatter(message);
  }
  return {
    error: "Forbidden",
  };
};
