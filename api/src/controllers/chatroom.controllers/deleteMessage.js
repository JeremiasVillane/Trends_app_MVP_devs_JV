const { Op } = require("sequelize");
const { Chat, Message } = require("../../db");

module.exports = async (chatId, messageId, userId, userType) => {
  const user = await Chat.findOne({
    where: {
      chat_id: chatId,
      [Op.or]: [
        { user1_id: userId },
        { user2_id: userId }
      ]
    }
  });

  if (!user) {
    return { error: "Chat not found" };
  }

  const message = await Message.findOne({
    where: { message_id: messageId, chat_id: chatId },
  });

  if (!message) {
    return { error: "Message not found" };
  }

  if (message.sender_id === userId || userType === "admin") {
    await message.destroy();

    return { message: "Message deleted from database" };
  }

  return {
    error: "Forbidden",
  };
};
